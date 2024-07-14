const { BaseManager } = require("./BaseManager");
const { User } = require("../structures/misc/User");
const { Message } = require("../structures/message/Message");
const { ChatMember } = require("../structures/chat/ChatMember");

class UserManager extends BaseManager {
  constructor(client, cacheSize) {
    super(client, User, cacheSize);
  }

  resolve(user) {
    if (user instanceof ChatMember) return user.user;
    if (user instanceof Message) return user.author;
    return super.resolve(user);
  }

  resolveId(user) {
    if (user instanceof ChatMember) return user.user.id;
    if (user instanceof Message) return user.author.id;
    return super.resolveId(user);
  }

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
