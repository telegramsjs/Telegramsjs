import { BaseClient } from "./BaseClient";
import { UpdateProcessor } from "./helpers/UpdateProcessor";
/**
 * A class representing a Telegram Bot client.
 * @extends BaseClient
 */
export declare class TelegramBot extends BaseClient {
    token: string;
    intents: string[] | number[] | null;
    parseMode?: string;
    chatId?: string | number;
    queryString?: string;
    offSetType?: any;
    baseUrl: string;
    countCollector?: number;
    updatesProcess?: UpdateProcessor;
    /**
     * Creates a new TelegramBot client.
     * @param {string} token - The Telegram Bot API token.
     * @param {Object} [options] - The client options.
     * @param {string | array | number} [options.intents] - The client intents.
     * @param {string} [options.parseMode] - The parse mode for message formatting.
     * @param {string | number} [options.chatId] - The default chat ID for sending messages.
     * @param {string} [options.queryString] - The default query string for API requests.
     * @param {string | object} [options.offSetType] - The type of offset to use for updates.
     */
    constructor(token: string, options?: {
        intents?: readonly string[] | number[] | null;
        parseMode?: string;
        chatId?: string | number;
        queryString?: string;
        offSetType?: any;
    });
    /**
     * Defines a command handler.
     * @param {string | string[]} command - The command string or an array of command strings.
     * @param {Function} callback - The callback function to handle the command.
     */
    command(command: string | string[], callback: (message: object, args?: string[]) => void): void;
    /**
     * The function that starts the whole process.
     */
    login(): Promise<void>;
}
