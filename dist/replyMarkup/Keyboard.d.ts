export declare class Keyboard {
  private markups;
  private inline;
  private resize;
  private oneTime;
  private selective;
  /**
   * Creates a new Keyboard object.
   * @param {Array} markups - A 2-dimensional array of Button objects representing the markups on the keyboard.
   * @param {Object} [options={}] - Additional options for the keyboard.
   * @param {boolean} [options.inline=false] - Whether the keyboard is an inline keyboard.
   * @param {boolean} [options.resize=false] - Whether the keyboard should be resized to fit the user's screen.
   * @param {boolean} [options.oneTime=false] - Whether the keyboard should disappear after the user presses a markup.
   * @param {boolean} [options.selective=false] - Whether the keyboard should be shown only to specific users.
   */
  constructor(
    markups: any[][],
    options?: {
      inline?: boolean;
      resize?: boolean;
      oneTime?: boolean;
      selective?: boolean;
    },
  );
  /**
   * Returns the keyboard object in the format expected by Telegram Bot API.
   * @returns {object} Returns the keyboard object in the format expected by Telegram Bot API.
   */
  toJSON(): object;
  /**
   * Sets the inline option of the keyboard.
   * @param {boolean} inline - Whether the keyboard should be displayed inline with the message.
   * @returns {Keyboard} Returns the updated Keyboard object.
   */
  setInline(inline: boolean): this;
  /**
   * Sets the `resize` option for the keyboard.
   * @param {boolean} resize - Whether the keyboard should be resized to fit the user's screen.
   * @returns {Keyboard} Returns the current `Keyboard` object for chaining.
   */
  setResize(resize: boolean): this;
  /**
   * Sets whether the keyboard should disappear after the user presses a markup.
   * @param {boolean} oneTime - Whether the keyboard should disappear after the user presses a markup.
   * @returns {Keyboard} Returns the Keyboard object.
   */
  setOneTime(oneTime: boolean): this;
  /**
   * Set the `selective` option for the keyboard.
   * @param {boolean} selective - Whether the keyboard should be shown only to specific users.
   * @returns {Keyboard} Returns the `Keyboard` object with the `selective` option set.
   */
  setSelective(selective: boolean): this;
  /**
   * Adds markups to the keyboard markups array.
   * @param  {...any} markupRows - One or more markup rows to add to the keyboard.
   * @param {boolean} [defaults] - Specifies whether to use default values for the markups.
   * @returns {Keyboard} Returns the updated `Keyboard` object.
   */
  addKeyboard(markupRows: any[], defaults?: boolean): this;
}
