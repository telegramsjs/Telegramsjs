const { Base } = require("./Base");
const { Chat } = require("./chat/Chat");
const { ChatBoostSource } = require("./boots/ChatBoostSource");

class ChatBoostRemoved extends Base {
  /**
   * @param {import("../client/TelegramClient").TelegramClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").ChatBoostRemoved} data - Data about the represents a boost removed from a chat
   */
  constructor(client, data) {
    super(client);

    /** Unique identifier of the boost */
    this.id = data.boost_id;

    this._patch(data);
  }

  _patch(data) {
    /**
     * Chat which was boosted
     * @type {Chat}
     */
    this.chat = new Chat(this.client, data.chat);

    /**
     * Source of the removed boost
     * @type {ChatBoostSource}
     */
    this.source = new ChatBoostSource(this.client, data.source);

    /**
     * Point in time (Unix timestamp) when the boost was removed
     * @type {number}
     */
    this.removedTimestamp = data.remove_date;

    return data;
  }

  /**
   * Point in time when the boost was removed
   * @type {Date}
   */
  get removedAt() {
    return new Date(this.removedTimestamp);
  }
}

module.exports = { ChatBoostRemoved };
