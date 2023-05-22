export = TelegramBot;
/**
 * A class representing a Telegram Bot client.
 * @extends BaseClient
 */
declare class TelegramBot extends BaseClient {
    /**
     * Creates a new TelegramBot client.
     * @param {string} token - The Telegram Bot API token.
     * @param {Object} [options] - The client options.
     * @param {Object} [options.intents] - The client intents.
     * @param {string} [options.parseMode] - The parse mode for message formatting.
     * @param {string | number} [options.chatId] - The default chat ID for sending messages.
     * @param {string} [options.queryString] - The default query string for API requests.
     * @param {string | object} [options.offSetType] - The type of offset to use for updates.
     */
    constructor(token: string, options?: {
        intents?: any;
        parseMode?: string;
        chatId?: string | number;
        queryString?: string;
        offSetType?: string | object;
    });
    /**
     * The Telegram Bot API token.
     * @type {string}
     */
    token: string;
    /**
     * Registers a listener for the specified event.
     * @param {string} eventName - The name of the event.
     * @param {Function} listener - The listener function.
     */
    on(eventName: string, listener: Function): any;
    /**
     * Removes the specified listener for the given event.
     * @param {string} eventName - The name of the event.
     * @param {Function} listener - The listener function to remove.
     */
    off(eventName: string, listener: Function): any;
    /**
     * Registers a one-time listener for the specified event.
     * The listener is automatically removed after it's invoked.
     * @param {string} eventName - The name of the event.
     * @param {Function} listener - The listener function.
     */
    once(eventName: string, listener: Function): any;
    /**
   * The function that starts the whole process
  */
    login(): Promise<void>;
}
import BaseClient = require("./BaseClient.js");
