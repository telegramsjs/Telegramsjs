import https from "node:https";
import type { TlsOptions } from "node:tls";
import type { Update } from "@telegram.ts/types";
import type { TelegramClient } from "./TelegramClient";
import http, { type IncomingMessage, type ServerResponse, type RequestListener } from "node:http";
/**
 * Represents a client for handling Telegram updates using webhooks.
 */
declare class WebhookClient {
    readonly client: TelegramClient;
    /**
     * The offset used to keep track of the latest updates.
     */
    offset: number;
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
    webhookFilter: (request: IncomingMessage & {
        body?: Update;
    }, options: {
        path: string;
        token: string;
        secretToken?: string;
    }) => boolean;
    /**
     * Creates an instance of WebhookClient.
     * @param client - The Telegram client instance.
     */
    constructor(client: TelegramClient);
    /**
     * Starts the webhook server to receive updates from Telegram.
     * @param path - The path for the webhook endpoint.
     * @param secretToken - The secret token for verifying webhook requests.
     * @param options - The options for the webhook server.
     */
    startWebhook(path?: string, secretToken?: string, options?: {
        tlsOptions?: TlsOptions;
        port?: number;
        host?: string;
        requestCallback?: RequestListener;
    }): Promise<void>;
    /**
     * Creates a callback function for handling webhook requests.
     * @param requestCallback - The callback function to handle requests.
     * @param {{ path?: string; secretToken?: string }} [options={}] - The options for creating the webhook callback.
     * @returns The created callback function.
     */
    createWebhookCallback(requestCallback?: RequestListener, { path, secretToken }?: {
        path?: string;
        secretToken?: string;
    }): Promise<http.RequestListener | ((request: IncomingMessage & {
        body?: Update;
    }, response: ServerResponse) => void)>;
    /**
     * Closes the webhook server.
     */
    close(): void;
}
export { WebhookClient };
//# sourceMappingURL=WebhookClient.d.ts.map