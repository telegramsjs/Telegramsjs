const { Base } = require("./Base");
const { User } = require("./misc/User");
const { Message } = require("./message/Message");

class CallbackQuery extends Base {
  constructor(client, data) {
    super(client, data);

    this.id = data.id;

    this._patch(data);
  }

  _patch(data) {
    this.author = new User(this.client, data.from);

    if ("message" in data) {
      this.message = new Message(this.client, data.message);
    }

    if ("inline_message_id" in data) {
      this.inlineMessageId = data.inline_message_id;
    }

    this.chatInstance = data.chat_instance;

    if ("data" in data) {
      this.data = data.data;
    }

    if ("game_short_name" in data) {
      this.gameShortName = data.game_short_name;
    }
  }

  send(text, options = {}) {
    return this.client.answerCallbackQuery({
      callback_query_id: this.id,
      text,
      ...options,
    });
  }

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
