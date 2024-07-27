import https from "node:https";
// @ts-ignore
import safeCompare from "safe-compare";
import type { TlsOptions } from "node:tls";
import { Events } from "../util/Constants";
import type { Update } from "@telegram.ts/types";
import type { TelegramClient } from "./TelegramClient";
import { TelegramError } from "../errors/TelegramError";
import http, {
  type IncomingMessage,
  type ServerResponse,
  type RequestListener,
} from "node:http";

/**
 * Represents a client for handling Telegram updates using webhooks.
 */
class WebhookClient {
  /**
   * The offset used to keep track of the latest updates.
   */
  public offset: number;

  /**
   * The HTTP or HTTPS server for handling webhook requests.
   */
  webhookServer?: http.Server | https.Server;

  /**
   * Filters incoming webhook requests to verify their authenticity.
   * @param request - The incoming request.
   * @param options - The options for filtering the request.
   * @returns Whether the request is valid.
   */
  webhookFilter = (
    request: IncomingMessage & { body?: Update },
    options: { path: string; token: string; secretToken?: string },
  ) => {
    if (safeCompare(options.path, request.url)) {
      if (!options.secretToken) {
        return true;
      } else {
        const token = request.headers["x-telegram-bot-api-secret-token"];
        if (safeCompare(options.secretToken, token as string)) {
          return true;
        }
      }
    }
    return false;
  };

  /**
   * Creates an instance of WebhookClient.
   * @param client - The Telegram client instance.
   */
  constructor(public readonly client: TelegramClient) {
    this.offset = 0;
  }

  /**
   * Starts the webhook server to receive updates from Telegram.
   * @param path - The path for the webhook endpoint.
   * @param secretToken - The secret token for verifying webhook requests.
   * @param options - The options for the webhook server.
   */
  async startWebhook(
    path: string = "/",
    secretToken: string = "",
    options: {
      tlsOptions?: TlsOptions;
      port?: number;
      host?: string;
      requestCallback?: RequestListener;
    } = {},
  ) {
    await this.client.getMe().then((me) => {
      this.client.user = me;
      this.client.readyTimestamp = Date.now();
      this.client.emit(Events.Ready, me);
    });

    const { tlsOptions, port, host, requestCallback } = options;
    const webhookCallback = await this.createWebhookCallback(requestCallback, {
      path,
      secretToken,
    });
    const serverOptions = tlsOptions != null ? tlsOptions : {};
    this.webhookServer =
      tlsOptions != null
        ? https.createServer(serverOptions, webhookCallback)
        : http.createServer(webhookCallback);

    if (!this.webhookServer) {
      throw new TelegramError("Failed to create webhook server");
    }
    this.webhookServer.listen(port, host);
  }

  /**
   * Creates a callback function for handling webhook requests.
   * @param requestCallback - The callback function to handle requests.
   * @param {{ path?: string; secretToken?: string }} [options={}] - The options for creating the webhook callback.
   * @returns The created callback function.
   */
  async createWebhookCallback(
    requestCallback?: RequestListener,
    { path, secretToken }: { path?: string; secretToken?: string } = {},
  ) {
    const callback: RequestListener = async (
      request: IncomingMessage & { body?: Update },
      response: ServerResponse,
    ) => {
      if (
        !this.webhookFilter(request, {
          path: path || "/",
          secretToken: secretToken || "",
          token: this.client.authToken,
        })
      ) {
        response.statusCode = 403;
        response.end();
        return;
      }

      let update: Update;

      try {
        if (request.body != null) {
          let body: any = request.body;
          if (body instanceof Buffer) body = String(request.body);
          if (typeof body === "string") body = JSON.parse(body);
          update = body;
        } else {
          let body = "";
          for await (const chunk of request) body += String(chunk);
          update = JSON.parse(body);
        }
      } catch (err) {
        response.writeHead(415).end();
        return;
      }

      if (update) {
        this.offset = update.update_id + 1;
      }

      const res = await this.client.worket.processUpdate(update);
      if (res) {
        this.client.updates.set(this.offset, res);
      }
    };

    return requestCallback
      ? (
          request: IncomingMessage & { body?: Update },
          response: ServerResponse,
        ) => callback(request, response)
      : callback;
  }

  /**
   * Closes the webhook server.
   */
  close() {
    this.webhookServer?.close();
  }
}

export { WebhookClient };
