import { type InlineKeyboardButton } from '@grammyjs/types';

type InlineKeyboard = {
  resize_keyboard?: boolean;
  one_time_keyboard: boolean;
  selective: boolean;
  keyboard: InlineKeyboardButton[][]
}

export class Keyboard {
  private keyboard: InlineKeyboardButton[][] = [];
  private inline: boolean;
  private resize: boolean;
  private oneTime: boolean;
  private selective: boolean;

  constructor(
    markups: InlineKeyboardButton[][] = [],
    options: {
      inline?: boolean;
      resize?: boolean;
      oneTime?: boolean;
      selective?: boolean;
    } = {}
  ) {
    this.keyboard = markups;
    this.inline = options.inline ?? false;
    this.resize = options.resize ?? false;
    this.oneTime = options.oneTime ?? false;
    this.selective = options.selective ?? false;
    return this;
  }

  /**
   * Returns the keyboard object in the format expected by Telegram Bot API.
   * @returns {InlineKeyboard} Returns the keyboard object in the format expected by Telegram Bot API.
   */
  toJSON(): InlineKeyboard {
    let keyboard: InlineKeyboard = {
      resize_keyboard: this.resize,
      one_time_keyboard: this.oneTime,
      selective: this.selective,
      keyboard: this.keyboard
    };
    return keyboard;
  }

  /**
   * Sets the inline option of the keyboard.
   * @param {boolean} inline - Whether the keyboard should be displayed inline with the message.
   * @returns {Keyboard} Returns the updated Keyboard object.
   */
  setInline(inline: boolean): Keyboard {
    this.inline = inline;
    return this;
  }

  /**
   * Sets the `resize` option for the keyboard.
   * @param {boolean} resize - Whether the keyboard should be resized to fit the user's screen.
   * @returns {Keyboard} Returns the current `Keyboard` object for chaining.
   */
  setResize(resize: boolean): Keyboard {
    this.resize = resize;
    return this;
  }

  /**
   * Sets whether the keyboard should disappear after the user presses a markup.
   * @param {boolean} oneTime - Whether the keyboard should disappear after the user presses a markup.
   * @returns {Keyboard} Returns the Keyboard object.
   */
  setOneTime(oneTime: boolean): Keyboard {
    this.oneTime = oneTime;
    return this;
  }

  /**
   * Set the `selective` option for the keyboard.
   * @param {boolean} selective - Whether the keyboard should be shown only to specific users.
   * @returns {Keyboard} Returns the `Keyboard` object with the `selective` option set.
   */
  setSelective(selective: boolean): Keyboard {
    this.selective = selective;
    return this;
  }

  /**
   * Adds markups to the keyboard markups array.
   * @param  {...InlineKeyboardButton[]} markupRows - One or more markup rows to add to the keyboard.
   * @param {boolean} [defaults] - Specifies whether to use default values for the markups.
   * @returns {Keyboard} Returns the updated `Keyboard` object.
   */
  addKeyboard(
    markupRows: (InlineKeyboardButton | InlineKeyboardButton[])[],
    defaults: boolean = false
  ): Keyboard {
    for (let i = 0; i < markupRows.length; i++) {
      if (defaults) {
        this.keyboard = markupRows as InlineKeyboardButton[][];
      } else if (defaults === false) {
        const row: InlineKeyboardButton[] = Array.isArray(markupRows[i])
          ? markupRows[i] as InlineKeyboardButton[]
          : [markupRows[i] as InlineKeyboardButton];
        this.keyboard.push(row);
      }
    }
    return this;
  }
}
