export = Keyboard;
declare class Keyboard {
    /**
     * Creates a new Keyboard object.
     * @param {Array} buttons - A 2-dimensional array of Button objects representing the buttons on the keyboard.
     * @param {Object} [options={}] - Additional options for the keyboard.
     * @param {boolean} [options.inline=false] - Whether the keyboard is an inline keyboard.
     * @param {boolean} [options.resize=false] - Whether the keyboard should be resized to fit the user's screen.
     * @param {boolean} [options.oneTime=false] - Whether the keyboard should disappear after the user presses a button.
     * @param {boolean} [options.selective=false] - Whether the keyboard should be shown only to specific users.
     */
    constructor(buttons: any[], options?: {
        inline?: boolean;
        resize?: boolean;
        oneTime?: boolean;
        selective?: boolean;
    });
    buttons: any[];
    inline: boolean;
    resize: boolean;
    oneTime: boolean;
    selective: boolean;
    /**
     * Returns the keyboard object in the format expected by Telegram Bot API.
     * @returns {Object} Returns the keyboard object in the format expected by Telegram Bot API.
     */
    toJSON(): any;
    /**
     * Sets the inline option of the keyboard.
     * @param {boolean} inline - Whether the keyboard should be displayed inline with the message.
     * @returns {Keyboard} Returns the updated Keyboard object.
     */
    setInline(inline: boolean): Keyboard;
    /**
     * Sets the `resize` option for the keyboard.
     * @param {boolean} resize - Whether the keyboard should be resized to fit the user's screen.
     * @returns {Keyboard} Returns the current `Keyboard` object for chaining.
     */
    setResize(resize: boolean): Keyboard;
    /**
     * Sets whether the keyboard should disappear after the user presses a button.
     * @param {boolean} oneTime - Whether the keyboard should disappear after the user presses a button.
     * @returns {Keyboard} Returns the Keyboard object.
     */
    setOneTime(oneTime: boolean): Keyboard;
    /**
     * Set the `selective` option for the keyboard.
     * @param {boolean} selective - Whether the keyboard should be shown only to specific users.
     * @returns {Keyboard} Returns the `Keyboard` object with the `selective` option set.
     */
    setSelective(selective: boolean): Keyboard;
    /**
     * Adds buttons to the keyboard buttons array.
     * @param  {...any} buttonRows - One or more button rows to add to the keyboard.
     * @returns {Keyboard} Returns the updated `Keyboard` object.
     */
    addKeyboard(buttonRows: any[], defaults?: boolean): Keyboard;
}
