const { BaseManager } = require("./BaseManager");
const { Chat } = require("../structures/chat/Chat");
const { Message } = require("../structures/message/Message");
const { ChatMember } = require("../structures/chat/ChatMember");

/**
 * Manages chat-related data.
 * @extends {BaseManager<Chat>}
 */
class ChatManager extends BaseManager {
  /**
   * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client instance.
   * @param {Array<unknown>} [iterable] - data iterable
   * @param {number} [cacheSize=-1] - The maximum size of the cache. Default is unlimited.
   */
  constructor(client, iterable, cacheSize) {
    super(client, Chat, iterable, cacheSize);
  }

  /**
   * Resolves a chat object.
   * @param {Chat|ChatMember|Message|string} chat - The chat instance, chat member, message, or ID.
   * @returns {Chat|null} - The resolved chat object or null if not found.
   * @override
   */
  resolve(chat) {
    if (chat instanceof ChatMember) return super.resolve(chat.chatId);
    if (chat instanceof Message && chat.chat) return chat.chat;
    return super.resolve(chat);
  }

  /**
   * Fetches a chat object from the API.
   * @param {Chat|string} chat - The chat instance or ID.
   * @param {Object} [options={}] - Additional options.
   * @param {boolean} [options.cache=true] - Whether to cache the fetched chat.
   * @param {boolean} [options.force=false] - Whether to force fetch from the API instead of using the cache.
   * @returns {Promise<Chat>} - The fetched chat object.
   */
  async fetch(chat, { cache = true, force = false } = {}) {
    const id = this.resolveId(chat);

    if (!force) {
      const existing = this.cache.get(String(id));
      if (existing) return existing;
    }

    const data = await this.client.getChat(String(id));
    return this._add(data, cache);
  }
}

module.exports = { ChatManager };
