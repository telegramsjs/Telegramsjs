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
import { ApiRequest } from "../rest/ApiRequest";
import { TelegramError } from "../errors/TelegramError";
import type { ClientUser } from "../structures/misc/ClientUser";
import {
  Events,
  DefaultParameters,
  DefaultClientParameters,
} from "../util/Constants";

/**
 * Interface representing options for logging in.
 */
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

/**
 * Interface representing client options.
 */
interface ClientOptions {
  offset?: number;
  requestOptions?: RequestInit;
  messageCacheMaxSize?: number;
  chatCacheMaxSize?: number;
  memberCacheMaxSize?: number;
  userCacheMaxSize?: number;
}

/**
 * Represents a Telegram client for interacting with the Telegram API.
 * @extends {BaseClient}
 */
class TelegramClient extends BaseClient {
  /**
   * The polling client for handling updates via long polling.
   */
  public readonly polling: PollingClient;

  /**
   * The webhook client for handling updates via webhooks.
   */
  public readonly webhook: WebhookClient;

  /**
   * The worket client for handling updates.
   */
  public readonly worket: WorketClient;

  /**
   * The timestamp when the client became ready.
   */
  public readyTimestamp: number | null = null;

  /**
   * The authenticated user associated with the client.
   */
  public user!: ClientUser;

  /**
   * Creates an instance of TelegramClient.
   * @param {string} authToken - The authentication token for the Telegram bot.
   * @param {ClientOptions} [options={}] - Optional client parameters.
   * @throws {TelegramError} If the authentication token is not specified.
   */
  constructor(
    public readonly authToken: string,
    public readonly options: ClientOptions = {},
  ) {
    super(authToken, { ...DefaultClientParameters, ...options });

    if (!authToken) {
      throw new TelegramError(
        "Specify a token to receive updates from Telegram",
      );
    }

    this.polling = new PollingClient(this, options?.offset);
    this.webhook = new WebhookClient(this);
    this.worket = new WorketClient(this);
  }

  /**
   * Gets the client's uptime in milliseconds.
   * @returns {number | null} The uptime in milliseconds, or null if the client is not ready.
   */
  get uptime() {
    return this.readyTimestamp && Date.now() - this.readyTimestamp;
  }

  /**
   * Logs in to the Telegram API using the specified options.
   * @param {ILoginOptions} [options={ polling: DefaultParameters }] - The login options.
   * @throws {TelegramError} If invalid options are provided.
   */
  async login(options: ILoginOptions = { polling: DefaultParameters }) {
    if ("polling" in options) {
      await this.polling.startPolling(options.polling);
      return;
    }

    if ("webhook" in options) {
      if (typeof options.webhook?.url !== "string") {
        throw new TelegramError("You did not specify the 'url' parameter");
      }

      await this.setWebhook(options.webhook);
      await this.webhook.startWebhook(
        options.webhook?.path,
        options.webhook?.secret_token,
        options.webhook,
      );
      return;
    }

    throw new TelegramError("Invalid options");
  }

  /**
   * Destroys the client, closing all connections.
   */
  destroy() {
    this.polling.close();
    this.webhook.close();
    this.emit(Events.Disconnect, this);
  }
}

export { TelegramClient, ClientOptions, ILoginOptions };
