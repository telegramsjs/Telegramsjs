/**
 * Class representing a markup in the Telegram Bot API.
 * @class
 */
export class Markup {
  private text: string | undefined;
  private action: string | undefined;
  private type: string | undefined;
  private remove_keyboard: boolean | undefined;
  private web_app: string | object | boolean | undefined;
  private force_reply: boolean | undefined;
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
  constructor(options: {
    text?: string,
    action?: string,
    type?: string,
    removeKeyboard?: boolean,
    webApp?: string | object | boolean,
    forceReply?: boolean
  } = {}) {
    this.text = options.text;
    this.action = options.action;
    this.type = options.type ?? 'callback_data';
    this.remove_keyboard = options.removeKeyboard ?? false;
    this.web_app = options.webApp;
    this.force_reply = options.forceReply;
    return this;
  }

  /**
   * Sets the markup action type.
   * @param {string} type - Button action type.
   * @returns {Markup} Returns an instance of the Markup object for method chaining.
   */
  setType(type: string): Markup {
    this.type = type;
    return this;
  }

  /**
   * Sets the markup action.
   * @param {string} action - Button action to be passed to the event handler.
   * @returns {Markup} Returns an instance of the Markup object for method chaining.
   */
  setAction(action: string): Markup {
    this.action = action;
    return this;
  }

  /**
   * Sets the text on the markup.
   * @param {string} text - Text on the markup.
   * @returns {Markup} Returns an instance of the Markup object for method chaining.
   */
  setText(text: string): Markup {
    this.text = text;
    return this;
  }

  /**
   * Set the `remove_keyboard` option to remove the keyboard after the user presses a markup.
   * @param {boolean} [remove=false] - Whether the keyboard should be removed after the user presses a markup.
   * @returns {string} Returns a JSON string with the `remove_keyboard` option set to `true`.
   */
  static setRemove(
    remove: boolean = false
    ): string {
    return JSON.stringify({
      remove_keyboard: remove,
    });
  }

  /**
   * Sets the URL for the web app.
   * @param {object | string | boolean} url - The URL of the web app.
   * @returns {Markup} Returns the current object instance for chaining.
   */
  setWebApp(
    url: string | object | boolean
    ): Markup {
    if (typeof url === 'string') {
      this.web_app = {
        url: url
      };
    } else {
      this.web_app = url;
    }
    return this;
  }

  /**
   * Sets the `force_reply` option for the reply keyboard.
   * @param {boolean} forceReply - Indicates whether to enable the force reply feature.
   * @returns {Markup} Returns the modified instance of the object.
   */
  setForceReply(forceReply: boolean): Markup {
    this.force_reply = forceReply;
    return this;
  }

  /**
   * Creates a new Button object from a markup object in the format expected by Telegram Bot API.
   * @param {object} markupObj - Button object in the format expected by Telegram Bot API.
   * @returns {Markup} Returns an instance of the Markup object.
   */
  static fromJSON(
    markupObj: {
      text: string;
      action: string;
      type: string;
    }
    ): Markup {
    const markup = new Markup()
      .setText(markupObj.text)
      .setAction(markupObj.action)
      .setType(markupObj.type);
    return markup;
  }

  /**
   * Returns the inline keyboard string in the format expected by Telegram Bot API.
   * @param {Array} markups - A 2-dimensional array of Markup objects representing the markups on the keyboard.
   * @returns {string} Returns the inline keyboard string in the format expected by Telegram Bot API.
   */
  static inlineKeyboard(markups: Markup[][]): string {
    const inlineKeyboard = markups.map((row) => {
      return row.map((markup) => {
        return markup.toJSON();
      });
    });

    return JSON.stringify({
      inline_keyboard: inlineKeyboard,
    });
  }

  /**
   * Generates a JSON string representing a reply markup object with an inline keyboard.
   * @param {Array} arrayMarkup - An array containing elements of the markup.
   * @param {number} [arrayLength=10] - The desired length of the markup array. Defaults to 10.
   * @returns {string} Returns a JSON string representing the reply markup object.
   */
  static addMarkupArray(
    arrayMarkup: any[], 
    arrayLength: number = 10
    ): string  {
    let markup = [];
    for (let i = 0; i < arrayMarkup.length; i++) {
      markup.push(arrayMarkup[i]);
      if (markup.length === arrayLength) {
        break;
      }
    }
    return JSON.stringify({
      inline_keyboard: markup,
    });
  }

  /**
   * Returns the markup object in the format expected by Telegram Bot API.
   * @returns {object} Returns the markup object in the format expected by Telegram Bot API.
   */
  toJSON(): object {
    const markup: {
      text?: string;
      remove_keyboard?: boolean;
      web_app?: string | boolean | object;
      force_reply?: boolean;
      [key: string]: any;
    } = {
      text: this.text,
      remove_keyboard: this.remove_keyboard,
      web_app: this.web_app,
      force_reply: this.force_reply,
    };
    markup[this.type as string] = this.action;
    return markup;
  }

  /**
   * Returns the text representation of the markup object in the format expected by Telegram Bot API.
   * @returns {string} Returns the text representation of the markup object in the format expected by Telegram Bot API.
   */
  toString(): string {
    return JSON.stringify(this.toJSON());
  }
};