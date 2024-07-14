const { BaseManager } = require("./BaseManager");
const { Chat } = require("../structures/chat/Chat");
const { Message } = require("../structures/message/Message");
const { ChatMember } = require("../structures/chat/ChatMember");

class ChatManager extends BaseManager {
  constructor(client, cacheSize) {
    super(client, Chat, cacheSize);
  }

  resolve(chat) {
    if (chat instanceof ChatMember) return super.resolve(chat.chatId);
    if (chat instanceof Message) return chat.chat;
    return super.resolve(chat);
  }

  async fetch(chat, { cache = true, force = false } = {}) {
    const id = this.resolveId(chat);

    if (!force) {
      const existing = this.cache.get(id);
      if (existing) return existing;
    }

    const data = await this.client.getChat(id);
    return this._add(data, cache);
  }
}

module.exports = { ChatManager };
