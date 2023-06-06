export = Markup;
/**
 * Class representing a markup in the Telegram Bot API.
 * @class
 */
declare class Markup {
    /**
     * Set the `remove_keyboard` option to remove the keyboard after the user presses a markup.
     * @param {boolean} [remove=false] - Whether the keyboard should be removed after the user presses a markup.
     * @returns {string} Returns a JSON string with the `remove_keyboard` option set to `true`.
     */
    static setRemove(remove?: boolean): string;
    /**
     * Creates a new Button object from a markup object in the format expected by Telegram Bot API.
     * @param {object} markupObj - Button object in the format expected by Telegram Bot API.
     * @returns {Markup} Returns an instance of the Markup object.
     */
    static fromJSON(markupObj: object): Markup;
    /**
     * Returns the inline keyboard object in the format expected by Telegram Bot API.
     * @param {Array} markups - A 2-dimensional array of Markup objects representing the markups on the keyboard.
     * @returns {object} Returns the inline keyboard object in the format expected by Telegram Bot API.
     */
    static inlineKeyboard(markups: any[]): object;
    /**
     * Generates a JSON string representing a reply markup object with an inline keyboard.
     * @param {Array} arrayMarkup - An array containing elements of the markup.
     * @param {number} [arrayLength=10] - The desired length of the markup array. Defaults to 10.
     * @returns {string} Returns a JSON string representing the reply markup object.
     */
    static addMarkupArray(arrayMarkup: any[], arrayLength?: number): string;
    /**
     * Creates a new instance of the Markup class.
     * @param {Object} [options={}] - Button settings.
     * @param {string} [options.text] - Text on the markup.
     * @param {string} [options.action] - Button action to be passed to the event handler.
     * @param {string} [options.type='callback_data'] - Button action type. The default is 'callback_data'.
     * @param {boolean} [options.remove_keyboard=false] - Flag indicating whether to remove the inline markup.
     * @param {object | string | boolean} [options.web_app] - Flag indicating whether the markup is for a web app.
     * @param {boolean} [options.force_reply] - Flag indicating whether to force a reply from the user.
     */
    constructor(options?: {
        text?: string;
        action?: string;
        type?: string;
        remove_keyboard?: boolean;
        web_app?: object | string | boolean;
        force_reply?: boolean;
    });
    text: string;
    action: string;
    type: string;
    remove_keyboard: any;
    web_app: any;
    force_reply: any;
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
     * Sets the URL for the web app.
     * @param {object | string | boolean} url - The URL of the web app.
     * @returns {Markup} Returns the current object instance for chaining.
     */
    setWebApp(url: object | string | boolean): Markup;
    /**
     * Sets the `force_reply` option for the reply keyboard.
     * @param {boolean} forceReply - Indicates whether to enable the force reply feature.
     * @returns {Markup} Returns the modified instance of the object.
     */
    setForceReply(forceReply: boolean): Markup;
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
