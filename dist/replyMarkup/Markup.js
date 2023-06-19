"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Markup = void 0;
/**
 * Class representing a markup in the Telegram Bot API.
 * @class
 */
class Markup {
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
  constructor(options = {}) {
    var _a, _b;
    this.text = options.text;
    this.action = options.action;
    this.type =
      (_a = options.type) !== null && _a !== void 0 ? _a : "callback_data";
    this.remove_keyboard =
      (_b = options.removeKeyboard) !== null && _b !== void 0 ? _b : false;
    this.web_app = options.webApp;
    this.login_url = options.loginUrl;
    this.switch_inline_query = options.switchInlineQuery;
    this.switch_inline_query_current_chat =
      options.switchInlineQueryCurrentChat;
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
  setType(type) {
    this.type = type;
    return this;
  }
  /**
   * Sets the markup action.
   * @param {string} action - Button action to be passed to the event handler.
   * @returns {Markup} Returns an instance of the Markup object for method chaining.
   */
  setAction(action) {
    this.action = action;
    return this;
  }
  /**
   * Sets the text on the markup.
   * @param {string} text - Text on the markup.
   * @returns {Markup} Returns an instance of the Markup object for method chaining.
   */
  setText(text) {
    this.text = text;
    return this;
  }
  /**
   * Set the `remove_keyboard` option to remove the keyboard after the user presses a markup.
   * @param {boolean} [remove=false] - Whether the keyboard should be removed after the user presses a markup.
   * @returns {string} Returns a JSON string with the `remove_keyboard` option set to `true`.
   */
  static setRemove(remove = false) {
    return JSON.stringify({
      remove_keyboard: remove,
    });
  }
  /**
   * Sets the URL for the web app.
   * @param {object} url - The URL of the web app.
   * @returns {Markup} Returns the current object instance for chaining.
   */
  setWebApp(webApp = { url: "" }) {
    this.web_app = webApp;
    return this;
  }
  /**
   * Sets the login URL for the markup.
   * @param {object} loginUrl - Object representing the login URL for the markup.
   * @returns {Markup} Returns the current object for method chaining.
   */
  setLoginUrl(loginUrl = { url: "" }) {
    this.login_url = loginUrl;
    return this;
  }
  /**
   * Sets the switch inline query for the markup.
   * @param {string} switchInlineQuery - Inline query string for the markup.
   * @returns {Markup} Returns the current object for method chaining.
   */
  setSwitchInlineQuery(switchInlineQuery) {
    this.switch_inline_query = switchInlineQuery;
    return this;
  }
  /**
   * Sets the switch inline query for the current chat.
   * @param {string} switchInlineQueryCurrentChat - Inline query string for the current chat.
   * @returns {Markup} Returns the current object for method chaining.
   */
  setSwitchInlineQueryCurrentChat(switchInlineQueryCurrentChat) {
    this.switch_inline_query_current_chat = switchInlineQueryCurrentChat;
    return this;
  }
  /**
   * Sets the chosen inline query chat for the markup.
   * @param {object} switchInlineQueryChosenChat - Object representing the chosen inline query chat.
   * @returns {Markup} Returns the current object for method chaining.
   */
  setSwitchInlineQueryChosenChat(switchInlineQueryChosenChat) {
    this.switch_inline_query_chosen_chat = switchInlineQueryChosenChat;
    return this;
  }
  /**
   * Sets the callback game for the markup.
   * @param {object} callbackGame - Object representing the callback game for the markup.
   * @returns {Markup} Returns the current object for method chaining.
   */
  setCallbackGame(callbackGame = { user_id: 0, score: 0 }) {
    this.callback_game = callbackGame;
    return this;
  }
  /**
   * Sets the `pay` option for the markup.
   * @param {boolean} pay - Indicates whether the markup is for a payment.
   * @returns {Markup} Returns an instance of the Markup object for method chaining.
   */
  setPay(pay) {
    this.pay = pay;
    return this;
  }
  /**
   * Sets the `force_reply` option for the reply keyboard.
   * @param {boolean} forceReply - Indicates whether to enable the force reply feature.
   * @returns {Markup} Returns the modified instance of the object.
   */
  setForceReply(forceReply) {
    this.force_reply = forceReply;
    return this;
  }
  /**
   * Creates a new Button object from a markup object in the format expected by Telegram Bot API.
   * @param {object} markupObj - Button object in the format expected by Telegram Bot API.
   * @returns {Markup} Returns an instance of the Markup object.
   */
  static fromJSON(markupObj) {
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
  static inlineKeyboard(markups) {
    const inlineKeyboard = markups.map(row => {
      return row.map(markup => {
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
  static addMarkupArray(arrayMarkup, arrayLength = 10) {
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
  toJSON() {
    const markup = {
      text: this.text,
      remove_keyboard: this.remove_keyboard,
      login_url: this.login_url,
      web_app: this.web_app,
      switch_inline_query: this.switch_inline_query,
      switch_inline_query_current_chat: this.switch_inline_query_current_chat,
      switch_inline_query_chosen_chat: this.switch_inline_query_chosen_chat,
      callback_game: this.callback_game,
      pay: this.pay,
      force_reply: this.force_reply,
    };
    markup[this.type] = this.action;
    return markup;
  }
  /**
   * Returns the text representation of the markup object in the format expected by Telegram Bot API.
   * @returns {string} Returns the text representation of the markup object in the format expected by Telegram Bot API.
   */
  toString() {
    return JSON.stringify(this.toJSON());
  }
}
exports.Markup = Markup;