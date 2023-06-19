"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Keyboard = void 0;
class Keyboard {
    /**
     * Creates a new Keyboard object.
     * @param {Array} markups - A 2-dimensional array of Button objects representing the markups on the keyboard.
     * @param {Object} [options={}] - Additional options for the keyboard.
     * @param {boolean} [options.inline=false] - Whether the keyboard is an inline keyboard.
     * @param {boolean} [options.resize=false] - Whether the keyboard should be resized to fit the user's screen.
     * @param {boolean} [options.oneTime=false] - Whether the keyboard should disappear after the user presses a markup.
     * @param {boolean} [options.selective=false] - Whether the keyboard should be shown only to specific users.
     */
    constructor(markups, options = {}) {
        var _a, _b, _c, _d;
        this.markups = markups !== null && markups !== void 0 ? markups : [];
        this.inline = (_a = options.inline) !== null && _a !== void 0 ? _a : false;
        this.resize = (_b = options.resize) !== null && _b !== void 0 ? _b : false;
        this.oneTime = (_c = options.oneTime) !== null && _c !== void 0 ? _c : false;
        this.selective = (_d = options.selective) !== null && _d !== void 0 ? _d : false;
        return this;
    }
    /**
     * Returns the keyboard object in the format expected by Telegram Bot API.
     * @returns {object} Returns the keyboard object in the format expected by Telegram Bot API.
     */
    toJSON() {
        const keyboard = {
            keyboard: this.markups,
            resize_keyboard: this.resize,
            one_time_keyboard: this.oneTime,
            selective: this.selective,
        };
        return keyboard;
    }
    /**
     * Sets the inline option of the keyboard.
     * @param {boolean} inline - Whether the keyboard should be displayed inline with the message.
     * @returns {Keyboard} Returns the updated Keyboard object.
     */
    setInline(inline) {
        this.inline = inline;
        return this;
    }
    /**
     * Sets the `resize` option for the keyboard.
     * @param {boolean} resize - Whether the keyboard should be resized to fit the user's screen.
     * @returns {Keyboard} Returns the current `Keyboard` object for chaining.
     */
    setResize(resize) {
        this.resize = resize;
        return this;
    }
    /**
     * Sets whether the keyboard should disappear after the user presses a markup.
     * @param {boolean} oneTime - Whether the keyboard should disappear after the user presses a markup.
     * @returns {Keyboard} Returns the Keyboard object.
     */
    setOneTime(oneTime) {
        this.oneTime = oneTime;
        return this;
    }
    /**
     * Set the `selective` option for the keyboard.
     * @param {boolean} selective - Whether the keyboard should be shown only to specific users.
     * @returns {Keyboard} Returns the `Keyboard` object with the `selective` option set.
     */
    setSelective(selective) {
        this.selective = selective;
        return this;
    }
    /**
     * Adds markups to the keyboard markups array.
     * @param  {...any} markupRows - One or more markup rows to add to the keyboard.
     * @param {boolean} [defaults] - Specifies whether to use default values for the markups.
     * @returns {Keyboard} Returns the updated `Keyboard` object.
     */
    addKeyboard(markupRows, defaults = false) {
        for (let i = 0; i < markupRows.length; i++) {
            if (defaults)
                this.markups = markupRows;
            else if (defaults === false) {
                const row = Array.isArray(markupRows[i])
                    ? markupRows[i]
                    : [markupRows[i]];
                this.markups.push(row);
            }
        }
        return this;
    }
}
exports.Keyboard = Keyboard;
