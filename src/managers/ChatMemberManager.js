const { BaseManager } = require("./BaseManager");
const { ChatMember } = require("../structures/ChatMember");

let cacheWarningEmitted;

class ChatMemberManager extends BaseManager {
  constructor(client, chatId, cacheSize) {
    super(client, ChatMember, cacheSize);

    Object.defineProperty(this, "chatId", { value: chatId });
  }

  _add(data, cache = true, { id, extras = [] } = {}) {
    if (this.cacheSize !== -1 && this.cacheSize < this.cache.size) {
      if (!cacheWarningEmitted) {
        cacheWarningEmitted = true;
        process.emitWarning(
          `Overriding the cache handling for ${this.constructor.name} is unsupported and breaks functionality`,
        );
      }
      return new this.holds(this.client, data);
    }

    for (const extra of extras) {
      const existing = this.cache.get(id);
      if (existing) {
        if (cache) {
          existing._patch(extra);
          if (cache) {
            this.cache.set(id, existing);
          }
          return existing;
        }
        const clone = existing._clone();
        clone._patch(extra);
        return clone;
      } else
        this.cache.set(id, new this.holds(this.client, this.chatId, extra));
    }

    return this.cache.get(id);
  }

  async fetch(user, { cache = true, force = false } = {}) {
    const id = this.resolveId(user);

    if (!force) {
      const existing = this.cache.get(id);
      if (existing) return existing;
    }

    const data = await this.client.getChatMember(this.chatId, id);

    if (cache) this.cache.set(id, data);

    return data;
  }
}

module.exports = { ChatMemberManager };
