import url from "node:url";
import type { Buffer } from "node:buffer";
import type { ReadStream } from "node:fs";
import type { TlsOptions } from "node:tls";
import type { RequestListener } from "node:http";
import type { Update } from "@telegram.ts/types";
import type { IRestOptions } from "../rest/Rest";
import { BaseClient } from "./BaseClient";
import { PollingClient } from "./PollingClient";
import { WebhookClient } from "./WebhookClient";
import { WorketClient } from "./WorkerClient";
import { TelegramError } from "../errors/TelegramError";
import { ErrorCodes } from "../errors/ErrorCodes";
import type { ClientUser } from "../structures/misc/ClientUser";
import type { User } from "../structures/misc/User";
import type { Chat } from "../structures/chat/Chat";
import {
  Events,
  DefaultPollingParameters,
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
    allowedUpdates?: ReadonlyArray<Exclude<keyof Update, "update_id">>;
    dropPendingUpdates?: boolean;
  };
  webhook?: {
    url: string;
    port?: number;
    host?: string;
    path?: string;
    certificate?: Buffer | ReadStream | string;
    ipAddress?: string;
    maxConnections?: number;
    tlsOptions?: TlsOptions;
    requestCallback?: RequestListener;
    allowedUpdates?: ReadonlyArray<Exclude<keyof Update, "update_id">>;
    dropPendingUpdates?: boolean;
    secretToken?: string;
  };
}

/**
 * Interface representing client options.
 */
interface ClientOptions {
  offset?: number;
  restOptions?: IRestOptions;
  chatCacheMaxSize?: number;
  userCacheMaxSize?: number;
  userCacheFilter?: (user: User) => boolean;
  chatCacheFilter?: (chat: Chat) => boolean;
  pollingTimeout?: number;
}

/**
 * Represents a Telegram client for interacting with the Telegram API.
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
  public user: ClientUser | null = null;

  /**
   * Creates an instance of TelegramClient.
   * @param authToken - The authentication token for the Telegram bot.
   * @param options - Optional client parameters.
   * @throws {TelegramError} If the authentication token is not specified.
   */
  constructor(
    public readonly authToken: string,
    public readonly options: ClientOptions = DefaultClientParameters,
  ) {
    super(authToken, { ...DefaultClientParameters, ...options });

    Object.assign(this.options, { ...DefaultClientParameters, ...options });

    if (!authToken) {
      throw new TelegramError(ErrorCodes.MissingToken);
    }

    this.polling = new PollingClient(this, options?.offset);
    this.webhook = new WebhookClient(this);
    this.worket = new WorketClient(this);
  }

  /**
   * Gets the client's uptime in milliseconds.
   * @returns The uptime in milliseconds, or null if the client is not ready.
   */
  get uptime(): number | null {
    return this.readyTimestamp && Date.now() - this.readyTimestamp;
  }

  /**
   * Fetch about the client/bot
   */
  async fetchApplication(): Promise<ClientUser> {
    const client = await this.getMe();
    this.user = client;
    return client;
  }

  /**
   * Logs in to the Telegram API using the specified options.
   * @param options - The login options.
   * @throws {TelegramError} If invalid options are provided.
   */
  async login(
    options: ILoginOptions = { polling: DefaultPollingParameters },
  ): Promise<void> {
    if ("polling" in options) {
      await this.deleteWebhook(options.polling?.dropPendingUpdates);
      await this.polling.startPolling({
        ...DefaultPollingParameters,
        ...options.polling,
      });
      return;
    }

    if ("webhook" in options) {
      if (typeof options.webhook?.url !== "string") {
        throw new TelegramError(ErrorCodes.MissingUrlParameter);
      }

      const parsedUrl = url.parse(options.webhook.url);

      options.webhook.path ??= parsedUrl.path ?? "/";
      if (parsedUrl.port) {
        options.webhook.port ??= Number(parsedUrl.port);
      }
      if (parsedUrl.host) {
        options.webhook.host ??= parsedUrl.host;
      }

      await this.setWebhook({
        allowedUpdates: DefaultPollingParameters.allowedUpdates,
        ...options.webhook,
      });
      await this.webhook.startWebhook(
        options.webhook.path,
        options.webhook.secretToken,
        options.webhook,
      );
      return;
    }

    throw new TelegramError(ErrorCodes.InvalidOptions);
  }

  /**
   * Destroys the client, closing all connections.
   */
  destroy(): void {
    this.polling.close();
    this.webhook.close();
    this.emit(Events.Disconnect, this);
  }

  /**
   * Asynchronously disposes of the client, closing all connections.
   * Implements `Symbol.asyncDispose` by calling `destroy()`.
   */
  async [Symbol.asyncDispose](): Promise<void> {
    await this.destroy();
  }
}

export { TelegramClient, type ClientOptions, type ILoginOptions };
