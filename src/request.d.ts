export = Request;
/**
 * Represents a request object for making requests to the Telegram Bot API.
 * @extends EventEmitter
 */
declare class Request {
    /**
     * Constructs a new Request object.
     * @param {string} [token] - The API token for the bot.
     * @param {string | array | number} [intents] - The types of updates the bot is interested in.
     * @param {string} [queryString] - The type of query string to use for requests.
     * @param {string | boolean | object} [offSetType] - The type of offset to use for updates.
     * @param {string} [options.parseMode] - The parse mode for message formatting.
     */
    constructor(token?: string, intents?: string | any[] | number, queryString?: string, offSetType?: string | boolean | object, parseMode: any);
    token: string;
    baseUrl: string;
    offset: number;
    queryString: string;
    offSetType: any;
    parseMode: any;
    lastTimeMap: any;
    intents: any[];
    /**
     * Gets the updates from the Telegram Bot API.
     * @async
     * @returns {Promise.<Array.<object>>} An array of updates.
     * @throws {TelegramTokenError} When the token is invalid.
     * @throws {TelegramApiError} When an error occurs with the Telegram Bot API.
     */
    getUpdates(): Promise<Array<object>>;
    startTime: number;
    update_id: any;
    last_object: any;
    /**
     * Makes a request to the Telegram Bot API.
     * @async
     * @param {string} method - The API method to call.
     * @param {Object} params - The parameters to include in the API call.
     * @returns {Promise.<object>} The response from the API call.
     */
    request(method: string, params: any): Promise<object>;
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
    get ping(): Promise<number>;
    /**
     * Gets the last update ID received.
     * @returns {number|null} The last update ID, or null if not available.
     */
    get updateId(): number;
    /**
     * Gets the last object received.
     * @returns {object} The last received object.
     */
    get lastObject(): any;
    /**
     * Set the token for the bot.
     * @param {string} token - The token to set.
     * @returns {boolean} - Returns true if the token was set successfully.
     */
    setToken(token: string): boolean;
    /**
     * Set the intents for the bot.
     * @param {string | array | number} intents - The intents to set.
     * @returns {boolean} - Returns true if the intents were set successfully.
     */
    setIntents(intents: string | any[] | number): boolean;
    /**
     * Set the parse mode for the bot.
     * @param {string} parseMode - The parse mode to set.
     * @returns {boolean} - Returns true if the parse mode was set successfully.
     */
    setParseMode(parseMode: string): boolean;
    /**
     * Set the chat ID for the bot.
     * @param {string | number } chatId - The chat ID to set.
     * @returns {string | number} - Returns the chat ID that was set.
     */
    setChatId(chatId: string | number): string | number;
    chatId: string | number;
    /**
     * Set the query string for the bot.
     * @param {string} queryString - The query string to set.
     * @returns {boolean} - Returns true if the query string was set successfully.
     */
    setQueryString(queryString: string): boolean;
    /**
     * Set the offset type for the bot.
     * @param {string} offSetType - The offset type to set.
     * @returns {string} - Returns the offset type that was set.
     */
    setOffSetType(offSetType: string): string;
}
