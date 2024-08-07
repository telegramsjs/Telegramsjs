import type { Buffer } from "node:buffer";
import type { ReadStream } from "node:fs";
import type { TlsOptions } from "node:tls";
import type { RequestInit } from "node-fetch";
import type { RequestListener } from "node:http";
import type { Update } from "@telegram.ts/types";
import { BaseClient } from "./BaseClient";
import { PollingClient } from "./PollingClient";
import { WebhookClient } from "./WebhookClient";
import { WorketClient } from "./WorkerClient";
import type { ClientUser } from "../structures/misc/ClientUser";
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
declare class TelegramClient extends BaseClient {
    readonly authToken: string;
    readonly options: ClientOptions;
    /**
     * The polling client for handling updates via long polling.
     */
    readonly polling: PollingClient;
    /**
     * The webhook client for handling updates via webhooks.
     */
    readonly webhook: WebhookClient;
    /**
     * The worket client for handling updates.
     */
    readonly worket: WorketClient;
    /**
     * The timestamp when the client became ready.
     */
    readyTimestamp: number | null;
    /**
     * The authenticated user associated with the client.
     */
    user: ClientUser;
    /**
     * Creates an instance of TelegramClient.
     * @param {string} authToken - The authentication token for the Telegram bot.
     * @param {ClientOptions} [options={}] - Optional client parameters.
     * @throws {TelegramError} If the authentication token is not specified.
     */
    constructor(authToken: string, options?: ClientOptions);
    /**
     * Gets the client's uptime in milliseconds.
     * @returns The uptime in milliseconds, or null if the client is not ready.
     */
    get uptime(): number | null;
    /**
     * Logs in to the Telegram API using the specified options.
     * @param {ILoginOptions} [options={ polling: DefaultParameters }] - The login options.
     * @throws {TelegramError} If invalid options are provided.
     */
    login(options?: ILoginOptions): Promise<void>;
    /**
     * Destroys the client, closing all connections.
     */
    destroy(): void;
}
export { TelegramClient, type ClientOptions, type ILoginOptions };
//# sourceMappingURL=TelegramClient.d.ts.map