export = Markup;
/**
 * Class representing a button in the Telegram Bot API.
 * @class
 */
declare class Markup {
    /**
     * Set the `remove_keyboard` option to remove the keyboard after the user presses a button.
     * @param {boolean} [remove=false] - Whether the keyboard should be removed after the user presses a button.
     * @returns {string} Returns a JSON string with the `remove_keyboard` option set to `true`.
     */
    static setRemove(remove?: boolean): string;
    /**
     * Creates a new Button object from a button object in the format expected by Telegram Bot API.
     * @param {Object} buttonObj - Button object in the format expected by Telegram Bot API.
     * @returns {Markup} Returns an instance of the Markup object.
     */
    static fromJSON(buttonObj: any): Markup;
    /**
     * Returns the inline keyboard object in the format expected by Telegram Bot API.
     * @param {Array} buttons - A 2-dimensional array of Markup objects representing the buttons on the keyboard.
     * @returns {Object} Returns the inline keyboard object in the format expected by Telegram Bot API.
     */
    static inlineKeyboard(buttons: any[]): any;
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
     * @param {string} [options.text] - Text on the button.
     * @param {string} [options.action] - Button action to be passed to the event handler.
     * @param {string} [options.type='callback_data'] - Button action type. The default is 'callback_data'.
     * @param {boolean} [options.remove_keyboard=false] - Flag indicating whether to remove the inline markup.
     * @param {boolean} [options.web_app] - Flag indicating whether the button is for a web app.
     * @param {boolean} [options.force_reply] - Flag indicating whether to force a reply from the user.
     */
    constructor(options?: {
        text?: string;
        action?: string;
        type?: string;
        remove_keyboard?: boolean;
        web_app?: boolean;
        force_reply?: boolean;
    });
    text: string;
    action: string;
    type: string;
    remove_keyboard: any;
    web_app: any;
    force_reply: any;
    /**
     * Sets the button action type.
     * @param {string} type - Button action type.
     * @returns {Markup} Returns an instance of the Markup object for method chaining.
     */
    setType(type: string): Markup;
    /**
     * Sets the button action.
     * @param {string} action - Button action to be passed to the event handler.
     * @returns {Markup} Returns an instance of the Markup object for method chaining.
     */
    setAction(action: string): Markup;
    /**
     * Sets the text on the button.
     * @param {string} text - Text on the button.
     * @returns {Markup} Returns an instance of the Markup object for method chaining.
     */
    setText(text: string): Markup;
    /**
     * Sets the URL for the web app.
     * @param {string} url - The URL of the web app.
     * @returns {Markup} Returns the current object instance for chaining.
     */
    setWebApp(url: string): Markup;
    /**
     * Sets the `force_reply` option for the reply keyboard.
     * @param {boolean} forceReply - Indicates whether to enable the force reply feature.
     * @returns {Markup} Returns the modified instance of the object.
     */
    setForceReply(forceReply: boolean): Markup;
    /**
     * Returns the button object in the format expected by Telegram Bot API.
     * @returns {Object} Returns the button object in the format expected by Telegram Bot API.
     */
    toJSON(): any;
    /**
     * Returns the text representation of the button object in the format expected by Telegram Bot API.
     * @returns {string} Returns the text representation of the button object in the format expected by Telegram Bot API.
     */
    toString(): string;
}
