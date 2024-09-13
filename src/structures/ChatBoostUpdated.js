// @ts-check
const { Base } = require("./Base");
const { ChatBoost } = require("./boost/ChatBoost");

class ChatBoostUpdated extends Base {
  /**
   * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").ChatBoostUpdated} data - Data about the represents a boost added to a chat or changed
   */
  constructor(client, data) {
    super(client);

    /**
     * Chat which was boosted
     * @type {import("./chat/Chat").Chat}
     */
    this.chat = this.client.chats._add(data.chat);

    /** Information about the chat boost */
    this.boost = new ChatBoost(client, data.boost);
  }
}

module.exports = { ChatBoostUpdated };
