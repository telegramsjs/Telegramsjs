const { Base } = require("./Base");
const { User } = require("./misc/User");
const { Message } = require("./message/Message");

/**
 * @typedef {import("../types").MethodParameters} MethodParameters
 */

class CallbackQuery extends Base {
  /**
   * @param {import("../client/TelegramClient").TelegramClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").CallbackQuery} data - Data about the represents an incoming callback query from a callback button in an inline keyboard. If the button that originated the query was attached to a message sent by the bot, the field message will be present. If the button was attached to a message sent via the bot (in inline mode), the field inline_message_id will be present. Exactly one of the fields data or game_short_name will be present
   */
  constructor(client, data) {
    super(client);

    /** Unique identifier for this query */
    this.id = data.id;

    /** Sender */
    this.author = new User(client, data.from);

    if ("message" in data) {
      /** Message sent by the bot with the callback button that originated the query */
      this.message = new Message(client, data.message);
    }

    if ("inline_message_id" in data) {
      /** Identifier of the message sent via the bot in inline mode, that originated the query */
      this.inlineMessageId = data.inline_message_id;
    }

    /** Global identifier, uniquely corresponding to the chat to which the message with the callback button was sent. Useful for high scores in games */
    this.chatInstance = data.chat_instance;

    if ("data" in data) {
      /** Data associated with the callback button. Be aware that the message originated the query can contain no callback buttons with this data */
      this.data = data.data;
    }

    if ("game_short_name" in data) {
      /** Short name of a Game to be returned, serves as the unique identifier for the game */
      this.gameShortName = data.game_short_name;
    }
  }

  /**
   * Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen
   * @param {string} text - Text of the notification. If not specified, nothing will be shown to the user, 0-200 characters
   * @param {Omit<MethodParameters["answerCallbackQuery"], "callback_query_id" | "text">} [options={}] - out parameters
   * @return {Promise<true>} - On success, True is returned.
   */
  send(text, options = {}) {
    return this.client.answerCallbackQuery({
      callback_query_id: this.id,
      text,
      ...options,
    });
  }

  /**
   * Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat as an alert
   * @param {string} text - Text of the notification. If not specified, nothing will be shown to the user, 0-200 characters
   * @param {string} [url] - URL that will be opened by the user's client. If you have created a Game and accepted the conditions via @BotFather, specify the URL that opens your game - note that this will only work if the query comes from a callback_game button. Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter
   * @param {number} [cacheTime] - The maximum amount of time in seconds that the result of the callback query may be cached client-side. Telegram apps will support caching starting in version 3.14. Defaults to 0
   * @return {Promise<true>} - On success, True is returned.
   */
  showAlert(text, url, cacheTime) {
    return this.client.answerCallbackQuery({
      callback_query_id: this.id,
      show_alert: true,
      text,
      url,
      cache_time: cacheTime,
    });
  }
}

module.exports = { CallbackQuery };
