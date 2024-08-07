import type { TelegramClient, ILoginOptions } from "./TelegramClient";
/**
 * Represents a client for handling Telegram updates using long polling.
 */
declare class PollingClient {
    #private;
    readonly client: TelegramClient;
    /**
     * The offset used to keep track of the latest updates.
     */
    offset: number;
    /**
     * Creates an instance of PollingClient.
     * @param client - The Telegram client instance.
     * @param offset - The initial offset for polling.
     */
    constructor(client: TelegramClient, offset?: number);
    /**
     * Starts the polling process to receive updates from Telegram.
     * @param options - The polling options.
     */
    startPolling(options?: ILoginOptions["polling"]): Promise<void>;
    /**
     * Polls for new updates from Telegram.
     * @param options - The polling options.
     */
    poll(options: ILoginOptions["polling"]): Promise<void>;
    /**
     * Closes the polling client, stopping further updates.
     * @returns The closed state of the polling client.
     */
    close(): boolean;
}
export { PollingClient };
//# sourceMappingURL=PollingClient.d.ts.map