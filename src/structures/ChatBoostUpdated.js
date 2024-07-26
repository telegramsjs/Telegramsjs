const { Base } = require("./Base");
const { Chat } = require("./chat/Chat");
const { ChatBoost } = require("./boots/ChatBoost");

class ChatBoostUpdated extends Base {
  constructor(client, data) {
    super(client);

    this._patch(data);
  }

  _patch(data) {
    /**
     * Chat which was boosted
     * @type {Chat}
     */
    this.chat = new Chat(this.client, data.chat);

    /**
     * Information about the chat boost
     * @type {ChatBoost}
     */
    this.boost = new ChatBoost(this.client, data.boost);

    return data;
  }
}

module.exports = { ChatBoostUpdated };
