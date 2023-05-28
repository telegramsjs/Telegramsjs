export = Request;
declare class Request {
    /**
     * Constructs a new Request object.
     * @param {string} [token] - The API token for the bot.
     * @param {string | array | number} [intents] - The types of updates the bot is interested in.
     * @param {string} [queryString] - The type of query string to use for requests.
     * @param {string | boolean | object} [offSetType] - The type of offset to use for updates.
     */
    constructor(token?: string, intents?: string | any[] | number, queryString?: string, offSetType?: string | boolean | object);
    token: string;
    baseUrl: string;
    offset: number;
    queryString: string;
    offSetType: any;
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
    /**
     * Makes a request to the Telegram Bot API.
     * @async
     * @param {string} method - The API method to call.
     * @param {Object} params - The parameters to include in the API call.
     * @returns {Promise.<object>} The response from the API call.
     */
    request(method: string, params: any): Promise<object>;
    get uptime(): number;
    get ping(): Promise<number>;
    get updateId(): number;
    get lastObject(): object;
}
