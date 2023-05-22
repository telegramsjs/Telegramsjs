export = Request;
/**
 * Represents a request to the Telegram Bot API.
 * @class
 * @param {string} token - The API token for the bot.
 * @param {Array.<string>} intents - The types of updates the bot is interested in.
 */
declare class Request {
    constructor(token: any, intents: any);
    token: any;
    baseUrl: string;
    startTime: number;
    offset: number;
    intents: any;
    /**
     * Gets the updates from the Telegram Bot API.
     * @async
     * @returns {Promise.<Array.<Object>>} An array of updates.
     * @throws {TelegramTokenError} When the token is invalid.
     * @throws {TelegramApiError} When an error occurs with the Telegram Bot API.
     */
    getUpdates(): Promise<Array<any>>;
    /**
     * Makes a request to the Telegram Bot API.
     * @async
     * @param {string} method - The API method to call.
     * @param {Object} params - The parameters to include in the API call.
     * @returns {Promise.<Object>} The response from the API call.
     */
    request(method: string, params: any): Promise<any>;
    get uptime(): number;
    get ping(): Promise<number>;
}
