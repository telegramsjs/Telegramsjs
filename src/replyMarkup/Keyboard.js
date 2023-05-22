class Keyboard {
  /**
   * Creates a new Keyboard object.
   * @param {Array} buttons - A 2-dimensional array of Button objects representing the buttons on the keyboard.
   * @param {Object} [options={}] - Additional options for the keyboard.
   * @param {boolean} [options.inline=false] - Whether the keyboard is an inline keyboard.
   * @param {boolean} [options.resize=false] - Whether the keyboard should be resized to fit the user's screen.
   * @param {boolean} [options.oneTime=false] - Whether the keyboard should disappear after the user presses a button.
   * @param {boolean} [options.selective=false] - Whether the keyboard should be shown only to specific users.
   */
  constructor(buttons, options = {}) {
    this.buttons = buttons ?? [];
    this.inline = options.inline ?? false;
    this.resize = options.resize ?? false;
    this.oneTime = options.oneTime ?? false;
    this.selective = options.selective ?? false;
    return this;
  }

  /**
   * Returns the keyboard object in the format expected by Telegram Bot API.
   * @returns {object} Returns the keyboard object in the format expected by Telegram Bot API.
   */
  toJSON() {
    const keyboard = JSON.stringify({
      keyboard: this.buttons,
      resize_keyboard: this.resize,
      one_time_keyboard: this.oneTime,
      selective: this.selective,
    });
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
   * Sets whether the keyboard should disappear after the user presses a button.
   * @param {boolean} oneTime - Whether the keyboard should disappear after the user presses a button.
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
   * Adds buttons to the keyboard buttons array.
   * @param  {...any} buttonRows - One or more button rows to add to the keyboard.
   * @returns {Keyboard} Returns the updated `Keyboard` object.
   */
  addKeyboard(buttonRows, defaults = false) {
    for (let i = 0; i < buttonRows.length; i++) {
      if (defaults)
      this.buttons = buttonRows;
      else if (defaults === false) {
        const row = Array.isArray(buttonRows[i]) ? buttonRows[i] : [buttonRows[i]];
        this.buttons.push(row);
      }
    }
    return this;
  }
}

module.exports = Keyboard;