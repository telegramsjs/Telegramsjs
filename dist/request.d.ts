/// <reference types="node" />
import { EventEmitter } from "events";
import type { Update } from "@telegram.ts/types";
type TelegramApiResponse = {
    error_code?: number;
    description?: string;
    ok?: boolean;
    result?: any;
};
/**
 * Represents a request object for making requests to the Telegram Bot API.
 * @extends EventEmitter
 */
export declare class Request extends EventEmitter {
    token: string;
    baseUrl: string;
    offset: number;
    offSetType?: any;
    intents?: readonly string[] | number[] | null;
    startTime: number;
    update_id?: number;
    last_object?: Update;
    /**
     * Constructs a new Request object.
     * @param {string} [token] - The API token for the bot.
     * @param {string[] | number[] | null} [intents] - The types of updates the bot is interested in.
     * @param {string} [queryString] - The type of query string to use for requests.
     * @param {string | boolean | object} [offSetType] - The type of offset to use for updates.
     * @param {string} [options.parseMode] - The parse mode for message formatting.
     */
    constructor(token: string, intents?: readonly string[] | number[] | null);
    /**
     * Gets the updates from the Telegram Bot API.
     * @async
     * @returns {Promise.<Array.<object>>} An array of updates.
     * @throws {TelegramTokenError} When the token is invalid.
     * @throws {TelegramApiError} When an error occurs with the Telegram Bot API.
     */
    getUpdates(): Promise<Update[]>;
    /**
     * Makes a request to the Telegram Bot API.
     * @async
     * @param {string} method - The API method to call.
     * @param {object} params - The parameters to include in the API call.
     * @returns {Promise.<Update>} The response from the API call.
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
     * @returns {number | undefined} The ping latency in milliseconds.
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
    /**
     * Set the token for the bot.
     * @param {string} token - The token to set.
     * @returns {boolean} - Returns true if the token was set successfully.
     */
    setToken(token: string): boolean;
    /**
     * Set the intents for the bot.
     * @param {string[] | number[] | null} intents - The intents to set.
     * @returns {boolean} - Returns true if the intents were set successfully.
     */
    setIntents(intents: string[] | number[]): boolean;
    /**
     * Set the offset type for the bot.
     * @param {any} offSetType - The offset type to set.
     * @returns {any} - Returns the offset type that was set.
     */
    setOffSetType(offSetType: any): any;
}
export {};
//# sourceMappingURL=request.d.ts.map