const { Base } = require("./Base");
const { ChatBoostSource } = require("./boost/ChatBoostSource");

class ChatBoostRemoved extends Base {
  /**
   * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").ChatBoostRemoved} data - Data about the represents a boost removed from a chat
   */
  constructor(client, data) {
    super(client);

    /** Unique identifier of the boost */
    this.id = data.boost_id;

    /**
     * Chat which was boosted
     * @type {import("./chat/Chat").Chat}
     */
    this.chat = this.client.chats._add(data.chat);

    /** Source of the removed boost */
    this.source = new ChatBoostSource(client, data.source);

    /** Point in time (Unix timestamp) when the boost was removed */
    this.removedUnixTime = data.remove_date;
  }

  /**
   * Return the timestamp boost was removed, in milliseconds
   */
  get removedTimestamp() {
    return this.removedUnixTime * 1000;
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
