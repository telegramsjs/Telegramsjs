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

class WebhookClient {
  webhookServer?: http.Server | https.Server;

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

  constructor(public readonly client: TelegramClient) {}

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

      await this.client.worket.processUpdate(update);
    };

    return requestCallback
      ? (
          request: IncomingMessage & { body?: Update },
          response: ServerResponse,
        ) => callback(request, response)
      : callback;
  }

  close() {
    this.webhookServer?.close();
  }
}

export { WebhookClient };
