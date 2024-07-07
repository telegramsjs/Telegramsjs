import type { Buffer } from "node:buffer";
import type { ReadStream } from "node:fs";
import type { TlsOptions } from "node:tls";
import type { RequestInit } from "node-fetch";
import type { ServerResponse, RequestListener } from "node:http";
import type { Update } from "@telegram.ts/types";
import { BaseClient } from "./BaseClient";
import { PollingClient } from "./PollingClient";
import { WebhookClient } from "./WebhookClient";
import { WorketClient } from "./WorkerClient";
import { TelegramError } from "../errors/TelegramError";
import { DefaultParameters } from "../util/Constants";
import type { ClientUser } from "../structures/ClientUser";
import { ApiRequest } from "../rest/ApiRequest";

interface ILoginOptions {
  polling?: {
    offset?: number;
    limit?: number;
    timeout?: number;
    allowed_updates?: ReadonlyArray<Exclude<keyof Update, "update_id">>;
    drop_pending_updates?: boolean;
  };
  webhook?: {
    url: string;
    port?: number;
    host?: string;
    path?: string;
    certificate?: Buffer | ReadStream | string;
    ip_address?: string;
    max_connections?: number;
    tlsOptions?: TlsOptions;
    requestCallback?: RequestListener;
    allowed_updates?: ReadonlyArray<Exclude<keyof Update, "update_id">>;
    drop_pending_updates?: boolean;
    secret_token?: string;
  };
}

class TelegramClient extends BaseClient {
  public readonly polling: PollingClient;
  public readonly webhook: WebhookClient;
  public readonly worket: WorketClient;
  public user!: ClientUser;

  constructor(
    public readonly authToken: string,
    requestOptions: RequestInit,
  ) {
    super(authToken, requestOptions);

    if (!authToken) {
      throw new TelegramError(
        "Specify a token to receive updates from Telegram",
      );
    }

    this.polling = new PollingClient(this);
    this.webhook = new WebhookClient(this);
    this.worket = new WorketClient(this);
  }

  async login(options: ILoginOptions = { polling: DefaultParameters }) {
    if ("polling" in options) {
      await this.polling.startPolling(options.polling);
      return;
    }

    if ("webhook" in options) {
      await this.webhook.startWebhook(options.webhook);
      return;
    }

    throw new TelegramError("Invalid options");
  }

  destroy() {
    this.polling.close();
    this.webhook.close();
  }
}

export { TelegramClient, ILoginOptions };
