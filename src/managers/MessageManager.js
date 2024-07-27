const { BaseManager } = require("./BaseManager");
const { Message } = require("../structures/message/Message");

/**
 * Manages messages in the cache.
 * @extends {BaseManager<Message>}
 */
class MessageManager extends BaseManager {
  /**
   * @param {import("../client/TelegramClient").TelegramClient} client - The client instance.
   * @param {number} [cacheSize=-1] - The maximum size of the cache. Default is unlimited.
   */
  constructor(client, cacheSize) {
    super(client, Message, cacheSize);
  }
}

module.exports = { MessageManager };
