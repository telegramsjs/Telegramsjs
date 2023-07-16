/// <reference types="node" />
import { EventEmitter } from "events";
import { Update, ResponseParameters } from "@telegram.ts/types";
type TelegramApiResponse = {
    ok?: boolean;
    error_code?: number;
    description?: string;
    result?: any;
    parameters?: ResponseParameters;
};
/**
 * Represents a request object for making requests to the Telegram Bot API.
 * @extends EventEmitter
 */
export declare class Request extends EventEmitter {
    token: string;
    baseUrl: string;
    offset: number;
    intents?: string[] | number[] | number | null;
    startTime: number;
    update_id?: number;
    last_object?: Update;
    /**
     * Constructs a new Request object.
     * @param {string} [token] - The API token for the bot.
     * @param {string[] | number[] | number | null} [intents] - The types of updates the bot is interested in.
     */
    constructor(token: string, intents?: string[] | number[] | number | null);
    /**
     * Gets the updates from the Telegram Bot API.
     * @async
     * @returns {Promise.<Array.<Update>>} An array of updates.
     * @throws {TelegramTokenError} When the token is invalid.
     * @throws {TelegramApiError} When an error occurs with the Telegram Bot API.
     */
    getUpdates(): Promise<Update[]>;
    /**
     * Makes a request to the Telegram Bot API.
     * @async
     * @param {string} method - The API method to call.
     * @param {object} params - The parameters to include in the API call.
     * @returns {Promise.<TelegramApiResponse>} The response from the API call.
     */
    request(method: string, params?: object): Promise<TelegramApiResponse>;
    /**
     * Gets the uptime of the bot.
     * @returns {number} The uptime in milliseconds.
     */
    get uptime(): number;
    /**
     * Gets the ping latency of the bot.
     * @async
     * @returns {Promise.<number>} The ping latency in milliseconds.
     */
    ping(): Promise<number>;
    /**
     * Gets the last update ID received.
     * @returns {number|null} The last update ID, or null if not available.
     */
    get updateId(): number | null;
    /**
     * Gets the last object received.
     * @returns {Update} The last received object.
     */
    get lastObject(): Update | undefined;
}
export {};
//# sourceMappingURL=request.d.ts.map