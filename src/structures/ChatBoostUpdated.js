const { Base } = require("./Base");
const { Chat } = require("./chat/Chat");
const { ChatBoost } = require("./boots/ChatBoost");

class ChatBoostUpdated extends Base {
  constructor(client, data) {
    super(client, data);

    this._patch(data);
  }

  _patch(data) {
    this.chat = new Chat(this.client, data.chat);

    this.boost = new ChatBoost(this.client, data.boost);
  }
}

module.exports = { ChatBoostUpdated };
