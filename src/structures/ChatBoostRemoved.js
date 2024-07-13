const { Base } = require("./Base");
const { Chat } = require("./Chat");
const { ChatBoostSource } = require("./boots/ChatBoostSource");

class ChatBoostRemoved extends Base {
  constructor(client, data) {
    super(client, data);

    this.id = data.boost_id;

    this._patch(data);
  }

  _patch(data) {
    this.chat = new Chat(this.client, data.chat);

    this.source = new ChatBoostSource(this.client, data.source);

    this.removedTimestamp = data.remove_date;
  }

  get removedAt() {
    return new Date(this.removedTimestamp);
  }
}

module.exports = { ChatBoostRemoved };
