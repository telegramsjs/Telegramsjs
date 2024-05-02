import https from "node:https";
// @ts-ignore
import safeCompare from "safe-compare";
import type { TlsOptions } from "node:tls";
import type { TelegramBot } from "../../client";
import type { Update } from "@telegram.ts/types";
import { handleUpdate, TelegramError } from "../util";
import http, {
  type IncomingMessage,
  type ServerResponse,
  type RequestListener,
} from "node:http";

class Webhook {
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
        if (safeCompare(options.secretToken, options.token)) {
          return true;
        }
      }
    }
    return false;
  };

  constructor(
    public readonly telegram: TelegramBot,
    public readonly path: string = "/",
    public readonly secretToken: string = "",
  ) {}

  async startWebhook(
    options: {
      tlsOptions?: TlsOptions;
      port?: number;
      host?: string;
      requestCallback?: RequestListener;
    } = {},
  ) {
    const { tlsOptions, port, host, requestCallback } = options;
    const webhookCallback = await this.createWebhookCallback(requestCallback);
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

  async createWebhookCallback(requestCallback?: RequestListener) {
    const callback: RequestListener = async (
      request: IncomingMessage & { body?: Update },
      response: ServerResponse,
    ) => {
      if (
        !this.webhookFilter(request, {
          path: this.path,
          token: this.telegram.authToken,
          secretToken: this.secretToken,
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

      await handleUpdate(this.telegram, [update], response);
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

export { Webhook };
