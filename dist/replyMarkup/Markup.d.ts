/**
 * Class representing a markup in the Telegram Bot API.
 * @class
 */
export declare class Markup {
    private text;
    private action;
    private type;
    private remove_keyboard;
    private web_app;
    private login_url;
    private switch_inline_query;
    private switch_inline_query_current_chat;
    private switch_inline_query_chosen_chat;
    private callback_game;
    private pay;
    private force_reply;
    /**
     * Creates a new instance of the Markup class.
     * @param {Object} [options={}] - Button settings.
     * @param {string} [options.text] - Text on the markup.
     * @param {string} [options.action] - Button action to be passed to the event handler.
     * @param {string} [options.type='callback_data'] - Button action type. The default is 'callback_data'.
     * @param {boolean} [options.removeKeyboard=false] - Flag indicating whether to remove the inline markup.
     * @param {object} [options.webApp] - Object representing the web app URL.
     * @param {object} [options.loginUrl] - Object representing the login URL.
     * @param {string} [options.switchInlineQuery] - Inline query string.
     * @param {string} [options.switchInlineQueryCurrentChat] - Inline query for the current chat.
     * @param {object} [options.switchInlineQueryChosenChat] - Object representing the chosen inline query chat.
     * @param {object} [options.callbackGame] - Object representing the callback game.
     * @param {boolean} [options.pay] - Flag indicating whether the markup is for a payment.
     * @param {boolean} [options.forceReply] - Flag indicating whether to force a reply from the user.
     */
    constructor(options?: {
        text?: string;
        action?: string;
        type?: string;
        removeKeyboard?: boolean;
        webApp?: object;
        loginUrl?: object;
        switchInlineQuery?: string;
        switchInlineQueryCurrentChat?: string;
        switchInlineQueryChosenChat?: object;
        callbackGame?: object;
        pay?: boolean;
        forceReply?: boolean;
    });
    /**
     * Sets the markup action type.
     * @param {string} type - Button action type.
     * @returns {Markup} Returns an instance of the Markup object for method chaining.
     */
    setType(type: string): Markup;
    /**
     * Sets the markup action.
     * @param {string} action - Button action to be passed to the event handler.
     * @returns {Markup} Returns an instance of the Markup object for method chaining.
     */
    setAction(action: string): Markup;
    /**
     * Sets the text on the markup.
     * @param {string} text - Text on the markup.
     * @returns {Markup} Returns an instance of the Markup object for method chaining.
     */
    setText(text: string): Markup;
    /**
     * Set the `remove_keyboard` option to remove the keyboard after the user presses a markup.
     * @param {boolean} [remove=false] - Whether the keyboard should be removed after the user presses a markup.
     * @returns {string} Returns a JSON string with the `remove_keyboard` option set to `true`.
     */
    static setRemove(remove?: boolean): string;
    /**
     * Sets the URL for the web app.
     * @param {object} url - The URL of the web app.
     * @returns {Markup} Returns the current object instance for chaining.
     */
    setWebApp(webApp?: {
        url: string;
    }): Markup;
    /**
     * Sets the login URL for the markup.
     * @param {object} loginUrl - Object representing the login URL for the markup.
     * @returns {Markup} Returns the current object for method chaining.
     */
    setLoginUrl(loginUrl?: {
        url: string;
        forward_text?: string;
        bot_username?: string;
        request_write_access?: boolean;
    }): Markup;
    /**
     * Sets the switch inline query for the markup.
     * @param {string} switchInlineQuery - Inline query string for the markup.
     * @returns {Markup} Returns the current object for method chaining.
     */
    setSwitchInlineQuery(switchInlineQuery: string): Markup;
    /**
     * Sets the switch inline query for the current chat.
     * @param {string} switchInlineQueryCurrentChat - Inline query string for the current chat.
     * @returns {Markup} Returns the current object for method chaining.
     */
    setSwitchInlineQueryCurrentChat(switchInlineQueryCurrentChat: string): Markup;
    /**
     * Sets the chosen inline query chat for the markup.
     * @param {object} switchInlineQueryChosenChat - Object representing the chosen inline query chat.
     * @returns {Markup} Returns the current object for method chaining.
     */
    setSwitchInlineQueryChosenChat(switchInlineQueryChosenChat: {
        query?: string;
        allow_user_chats?: boolean;
        allow_bot_chats?: boolean;
        allow_group_chats?: boolean;
        allow_channel_chats?: boolean;
    }): Markup;
    /**
     * Sets the callback game for the markup.
     * @param {object} callbackGame - Object representing the callback game for the markup.
     * @returns {Markup} Returns the current object for method chaining.
     */
    setCallbackGame(callbackGame?: {
        user_id: number;
        score: number;
        force?: boolean;
        disable_edit_message?: boolean;
        chat_id?: number;
        message_id?: number;
        inline_message_id?: number;
    }): Markup;
    /**
     * Sets the `pay` option for the markup.
     * @param {boolean} pay - Indicates whether the markup is for a payment.
     * @returns {Markup} Returns an instance of the Markup object for method chaining.
     */
    setPay(pay: boolean): Markup;
    /**
     * Sets the `force_reply` option for the reply keyboard.
     * @param {boolean} forceReply - Indicates whether to enable the force reply feature.
     * @returns {Markup} Returns the modified instance of the object.
     */
    setForceReply(forceReply: boolean): Markup;
    /**
     * Creates a new Button object from a markup object in the format expected by Telegram Bot API.
     * @param {object} markupObj - Button object in the format expected by Telegram Bot API.
     * @returns {Markup} Returns an instance of the Markup object.
     */
    static fromJSON(markupObj: {
        text: string;
        action: string;
        type: string;
    }): Markup;
    /**
     * Returns the inline keyboard string in the format expected by Telegram Bot API.
     * @param {Array} markups - A 2-dimensional array of Markup objects representing the markups on the keyboard.
     * @returns {string} Returns the inline keyboard string in the format expected by Telegram Bot API.
     */
    static inlineKeyboard(markups: Markup[][]): string;
    /**
     * Generates a JSON string representing a reply markup object with an inline keyboard.
     * @param {Array} arrayMarkup - An array containing elements of the markup.
     * @param {number} [arrayLength=10] - The desired length of the markup array. Defaults to 10.
     * @returns {string} Returns a JSON string representing the reply markup object.
     */
    static addMarkupArray(arrayMarkup: any[], arrayLength?: number): string;
    /**
     * Returns the markup object in the format expected by Telegram Bot API.
     * @returns {object} Returns the markup object in the format expected by Telegram Bot API.
     */
    toJSON(): object;
    /**
     * Returns the text representation of the markup object in the format expected by Telegram Bot API.
     * @returns {string} Returns the text representation of the markup object in the format expected by Telegram Bot API.
     */
    toString(): string;
}
//# sourceMappingURL=Markup.d.ts.map