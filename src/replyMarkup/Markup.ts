/**
 * Class representing a markup in the Telegram Bot API.
 * @class
 */
export class Markup {
  private text: string | undefined;
  private action: string | undefined;
  private type: string | undefined;
  private remove_keyboard: boolean | undefined;
  private web_app: object | undefined;
  private login_url: object | undefined;
  private switch_inline_query: string | undefined;
  private switch_inline_query_current_chat: string | undefined;
  private switch_inline_query_chosen_chat: object | undefined;
  private callback_game: object | undefined;
  private pay: boolean | undefined;
  private force_reply: boolean | undefined;
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
  constructor(options: {
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
  } = {}) {
    this.text = options.text;
    this.action = options.action;
    this.type = options.type ?? 'callback_data';
    this.remove_keyboard = options.removeKeyboard ?? false;
    this.web_app = options.webApp;
    this.login_url = options.loginUrl;
    this.switch_inline_query = options.switchInlineQuery;
    this.switch_inline_query_current_chat = options.switchInlineQueryCurrentChat;
    this.switch_inline_query_chosen_chat = options.switchInlineQueryChosenChat;
    this.callback_game = options.callbackGame;
    this.pay = options.pay;
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
   * @param {object} url - The URL of the web app.
   * @returns {Markup} Returns the current object instance for chaining.
   */
  setWebApp(webApp: {
    url: string;
  } = {url: ''}): Markup {
    this.web_app = webApp;
    return this;
  }
  
  /**
   * Sets the login URL for the markup.
   * @param {object} loginUrl - Object representing the login URL for the markup.
   * @returns {Markup} Returns the current object for method chaining.
   */
  setLoginUrl(loginUrl: {
    url: string;
    forward_text?: string;
    bot_username?: string;
    request_write_access?: boolean;
  } = {url: ''}): Markup {
    this.login_url = loginUrl;
    return this;
  }
  
  /**
   * Sets the switch inline query for the markup.
   * @param {string} switchInlineQuery - Inline query string for the markup.
   * @returns {Markup} Returns the current object for method chaining.
   */
  setSwitchInlineQuery(switchInlineQuery: string): Markup {
    this.switch_inline_query = switchInlineQuery;
    return this;
  }
  
  /**
   * Sets the switch inline query for the current chat.
   * @param {string} switchInlineQueryCurrentChat - Inline query string for the current chat.
   * @returns {Markup} Returns the current object for method chaining.
   */
  setSwitchInlineQueryCurrentChat(switchInlineQueryCurrentChat: string): Markup {
    this.switch_inline_query_current_chat = switchInlineQueryCurrentChat;
    return this;
  }
  
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
  }): Markup {
    this.switch_inline_query_chosen_chat = switchInlineQueryChosenChat;
    return this;
  }
  
  /**
   * Sets the callback game for the markup.
   * @param {object} callbackGame - Object representing the callback game for the markup.
   * @returns {Markup} Returns the current object for method chaining.
   */
  setCallbackGame(callbackGame: {
    user_id: number;
    score: number;
    force?: boolean;
    disable_edit_message?: boolean;
    chat_id?: number;
    message_id?: number;
    inline_message_id?: number;
    } = {user_id: 0, score: 0}) : Markup {
    this.callback_game = callbackGame;
    return this;
  }
  
  /**
   * Sets the `pay` option for the markup.
   * @param {boolean} pay - Indicates whether the markup is for a payment.
   * @returns {Markup} Returns an instance of the Markup object for method chaining.
   */
  setPay(pay: boolean): Markup {
    this.pay = pay;
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
    }): Markup {
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
      web_app?: object;
      force_reply?: boolean;
      login_url?: object;
      switch_inline_query?: string;
      switch_inline_query_current_chat?: string;
      switch_inline_query_chosen_chat?: object;
      callback_game?: object;
      pay?: boolean;
      [key: string]: any;
    } = {
      text: this.text,
      remove_keyboard: this.remove_keyboard,
      login_url: this.login_url,
      web_app: this.web_app,
      switch_inline_query: this.switch_inline_query,
      switch_inline_query_current_chat: this.switch_inline_query_current_chat,
      switch_inline_query_chosen_chat: this.switch_inline_query_chosen_chat,
      callback_game: this.callback_game,
      pay: this.pay,
      force_reply: this.force_reply
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