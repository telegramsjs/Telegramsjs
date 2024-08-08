const { BaseManager } = require("./BaseManager");
const { User } = require("../structures/misc/User");
const { Message } = require("../structures/message/Message");
const { ChatMember } = require("../structures/chat/ChatMember");

/**
 * Manages users in the cache.
 * @extends {BaseManager<User>}
 */
class UserManager extends BaseManager {
  /**
   * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client instance.
   * @param {number} [cacheSize=-1] - The maximum size of the cache. Default is unlimited.
   */
  constructor(client, cacheSize) {
    super(client, User, cacheSize);
  }

  /**
   * Resolves a user from a ChatMember, Message, or user ID.
   * @param {ChatMember|Message|string} user - The ChatMember, Message, or user ID to resolve.
   * @returns {User|null} The resolved User instance or null if not found.
   */
  resolve(user) {
    if (user instanceof ChatMember) return user.user;
    if (user instanceof Message) return user.author;
    return super.resolve(user);
  }

  /**
   * Resolves the user ID from a ChatMember, Message, or user ID.
   * @param {ChatMember|Message|string} user - The ChatMember, Message, or user ID to resolve.
   * @returns {string|null} The resolved user ID or null if not found.
   */
  resolveId(user) {
    if (user instanceof ChatMember) return user.user.id;
    if (user instanceof Message) return user.author.id;
    return super.resolveId(user);
  }

  /**
   * Fetches a user by ID, optionally caching the result.
   * @param {ChatMember|Message|string} user - The ChatMember, Message, or user ID to fetch.
   * @param {Object} [options] - Options for fetching.
   * @param {boolean} [options.cache=true] - Whether to cache the fetched user.
   * @param {boolean} [options.force=false] - Whether to force fetching from the API.
   * @returns {Promise<User>} The fetched User instance.
   */
  async fetch(user, { cache = true, force = false } = {}) {
    const id = this.resolveId(user);

    if (!force) {
      const existing = this.cache.get(id);
      if (existing) return existing;
    }

    const data = await this.client.getChat(id);
    return this._add(data, cache);
  }
}

module.exports = { UserManager };
