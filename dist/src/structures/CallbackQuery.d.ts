export type MethodParameters = import("../types").MethodParameters;
/**
 * @typedef {import("../types").MethodParameters} MethodParameters
 */
export class CallbackQuery extends Base {
    /**
     * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").CallbackQuery} data - Data about the represents an incoming callback query from a callback button in an inline keyboard. If the button that originated the query was attached to a message sent by the bot, the field message will be present. If the button was attached to a message sent via the bot (in inline mode), the field inline_message_id will be present. Exactly one of the fields data or game_short_name will be present
     */
    constructor(client: import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient, data: import("@telegram.ts/types").CallbackQuery);
    /** Unique identifier for this query */
    id: string;
    /** Sender */
    author: User;
    /** Message sent by the bot with the callback button that originated the query */
    message: Message | undefined;
    /** Identifier of the message sent via the bot in inline mode, that originated the query */
    inlineMessageId: string | undefined;
    /** Global identifier, uniquely corresponding to the chat to which the message with the callback button was sent. Useful for high scores in games */
    chatInstance: string;
    /** Data associated with the callback button. Be aware that the message originated the query can contain no callback buttons with this data */
    data: string | undefined;
    /** Short name of a Game to be returned, serves as the unique identifier for the game */
    gameShortName: string | undefined;
    /**
     * Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen
     * @param {string} text - Text of the notification. If not specified, nothing will be shown to the user, 0-200 characters
     * @param {Omit<MethodParameters["answerCallbackQuery"], "callbackQueryId" | "text">} [options={}] - out parameters
     * @return {Promise<true>} - On success, True is returned.
     */
    send(text: string, options?: Omit<{
        callbackQueryId: string;
        text?: string;
        showAlert?: boolean;
        url?: string;
        cacheTime?: number;
    }, "text" | "callbackQueryId"> | undefined): Promise<true>;
    /**
     * Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat as an alert
     * @param {string} text - Text of the notification. If not specified, nothing will be shown to the user, 0-200 characters
     * @param {string} [url] - URL that will be opened by the user's client. If you have created a Game and accepted the conditions via @BotFather, specify the URL that opens your game - note that this will only work if the query comes from a callback_game button. Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter
     * @param {number} [cacheTime] - The maximum amount of time in seconds that the result of the callback query may be cached client-side. Telegram apps will support caching starting in version 3.14. Defaults to 0
     * @return {Promise<true>} - On success, True is returned.
     */
    showAlert(text: string, url?: string | undefined, cacheTime?: number | undefined): Promise<true>;
}
import { Base } from "./Base";
import { User } from "./misc/User";
import { Message } from "./message/Message";
//# sourceMappingURL=CallbackQuery.d.ts.map