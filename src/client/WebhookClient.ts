import https from "node:https";
// @ts-ignore
import safeCompare from "safe-compare";
import type { TlsOptions } from "node:tls";
import { Events } from "../util/Constants";
import type { Update } from "@telegram.ts/types";
import type { TelegramClient } from "./TelegramClient";
import { TelegramError } from "../errors/TelegramError";
import { ErrorCodes } from "../errors/ErrorCodes";
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
  public offset: number = 0;

  /**
   * Indicates whether the webhook client is closed.
   */
  public isClosed: boolean = false;

  /**
   * The HTTP or HTTPS server for handling webhook requests.
   */
  public webhookServer: http.Server | https.Server | null = null;

  /**
   * Filters incoming webhook requests to verify their authenticity.
   * @param request - The incoming request.
   * @param options - The options for filtering the request.
   * @returns Whether the request is valid.
   */
  public webhookFilter = (
    request: IncomingMessage & { body?: Update },
    options: { path: string; token: string; secretToken?: string },
  ): boolean => {
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
  constructor(public readonly client: TelegramClient) {}

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
  ): Promise<void> {
    try {
      await this.client.getMe().then((me) => {
        this.client.user = me;
        this.client.readyTimestamp = Date.now();
        this.client.emit(Events.Ready, this.client);
      });

      const { tlsOptions, port, host, requestCallback } = options;
      const webhookCallback = await this.createWebhookCallback(
        requestCallback,
        {
          path,
          secretToken,
        },
      );
      const serverOptions = tlsOptions != null ? tlsOptions : {};
      this.webhookServer =
        tlsOptions != null
          ? https.createServer(serverOptions, webhookCallback)
          : http.createServer(webhookCallback);

      if (!this.webhookServer) {
        throw new TelegramError(ErrorCodes.WebhookServerCreationFailed);
      }

      this.webhookServer.listen(port, host, () => {
        this.client.emit(Events.Ready, this.client);
      });

      this.webhookServer.on("error", (err) => {
        if (
          this.handlerError(err) &&
          this.client.eventNames().indexOf(Events.Error) === -1
        ) {
          console.error(err);
        }
        this.client.emit(Events.Disconnect);
      });
    } catch (err) {
      if (
        this.handlerError(err) &&
        this.client.eventNames().indexOf(Events.Error) === -1
      ) {
        console.log(err);
      }
      this.client.emit(Events.Disconnect);
    }
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
  ): Promise<
    | http.RequestListener
    | ((
        request: IncomingMessage & {
          body?: Update;
        },
        response: ServerResponse,
      ) => void)
  > {
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
   * Handles errors that occur during webhook processing.
   * @param err - The error object.
   */
  private handlerError(err: unknown): boolean {
    if (
      this.client.options?.errorHandler &&
      this.client.eventNames().indexOf(Events.Error) !== -1
    ) {
      this.client.emit(Events.Error, [this.offset, err]);
      return true;
    }

    this.isClosed = true;
    return false;
  }

  /**
   * Closes the webhook server.
   * @returns The closed state of the webhook client.
   */
  close(): boolean {
    if (this.webhookServer && !this.isClosed) {
      this.webhookServer.close(() => {
        this.isClosed = true;
      });
    }
    return this.isClosed;
  }
}

export { WebhookClient };
