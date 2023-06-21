import { BaseClient } from "../BaseClient";
import { TelegramBot } from "../TelegramBot";
/**
 * Represents the response API object.
 */
type ResponseApi = {
    update_id?: number;
    message_id?: number;
    message?: object;
    chat?: object;
    from?: object;
    edited_message?: object;
    channel_post?: object;
    edited_channel_post?: object;
    inline_query?: object;
    chosen_inline_result?: object;
    callback_query?: object;
    shipping_query?: object;
    pre_checkout_query?: object;
    poll?: object;
    poll_answer?: object;
    my_chat_member?: object;
    chat_member?: object;
    chat_join_request?: object;
    pinned_message?: object;
};
/**
 * Represents the options for sending a message.
 */
type SendOptions = {
    chatId?: number | string;
    messageId?: number;
    text?: string;
    replyMarkup?: string;
    allowReply?: boolean;
    notification?: boolean;
    replyToMessageId?: number;
    content?: boolean;
    threadId?: number;
    parseMode?: string;
};
/**
 * Represents the default options for sending a message.
 */
type Defaults = {
    text?: string;
    chatId?: number | string;
    messageId?: number;
    replyMarkup?: string;
    allowReply?: boolean;
    notification?: boolean;
    replyToMessageId?: number;
    content?: boolean;
    threadId?: number;
    parseMode?: string;
};
/**
 * Represents the UpdateProcessor class.
 */
export declare class UpdateProcessor {
    /**
     * The TelegramBot instance.
     */
    bot: TelegramBot;
    /**
     * The response updates object.
     */
    updates: ResponseApi;
    /**
     * The BaseClient instance.
     */
    functions: BaseClient;
    /**
     * Creates an instance of UpdateProcessor.
     * @param {TelegramBot} bot - The TelegramBot instance.
     */
    constructor(bot: TelegramBot);
    /**
     * Processes the updates.
     * @param {ResponseApi} [updates] - The updates object.
     * @returns {Promise<void>}
     */
    processUpdate(updates?: ResponseApi): Promise<void>;
    /**
     * Sends a reply message.
     * @param {SendOptions} options - The options for sending a message.
     * @param {Defaults} [defaults] - The default options for sending a message.
     * @returns {Promise<object | undefined>}
     */
    reply(options: SendOptions, defaults?: Defaults): Promise<object | undefined>;
    /**
     * Sends a message.
     * @param {SendOptions} options - The options for sending a message.
     * @param {Defaults} [defaults] - The default options for sending a message.
     * @returns {Promise<object | undefined>}
     */
    send(options: SendOptions, defaults?: Defaults): Promise<object | undefined>;
    /**
     * Leaves a chat.
     * @param {number | string} [chatId] - The ID of the chat to leave.
     * @returns {Promise<object | undefined>}
     */
    leave(chatId?: number | string): Promise<object | undefined>;
    /**
     * Checks if the update contains a command.
     * @param {boolean} [checkAllEntities] - Whether to check all entities in the update.
     * @returns {boolean} - Indicates whether a command is found in the update.
     */
    isCommand(checkAllEntities?: boolean): boolean;
}
export {};
//# sourceMappingURL=UpdateProcessor.d.ts.map