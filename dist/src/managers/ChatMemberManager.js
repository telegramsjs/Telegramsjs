"use strict";
const { Events } = require("../util/Constants");
const { BaseManager } = require("./BaseManager");
const { ChatMember } = require("../structures/chat/ChatMember");
let cacheWarningEmitted;
/**
 * Manages chat members for a specific chat.
 * @extends {BaseManager<ChatMember>}
 */
class ChatMemberManager extends BaseManager {
    /**
     * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client instance.
     * @param {number} chatId - The ID of the chat.
     * @param {number} [cacheSize=-1] - The maximum size of the cache. Default is unlimited.
     */
    constructor(client, chatId, cacheSize) {
        super(client, ChatMember, cacheSize);
        client.on(Events.ChatMember, (ctx) => {
            var _a, _b;
            if (ctx.chat.id !== chatId)
                return;
            if (!((_b = (_a = ctx.newMember) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id))
                return;
            if (cacheSize !== -1 && cacheSize < this.cache.size) {
                if (this.cache.has(`${ctx.newMember.user.id}`)) {
                    this.cache.set(ctx.newMember.user.id, ctx.newMember);
                }
                return;
            }
            this.cache.set(ctx.newMember.user.id, ctx.newMember);
        });
        Object.defineProperty(this, "chatId", { value: chatId });
    }
    /**
     * Adds data to the cache or updates an existing entry.
     * @param {import("@telegram.ts/types").ChatMember} data - The data to add or update.
     * @param {boolean} [cache=true] - Whether to cache the data.
     * @param {Object} [options={}] - Additional options.
     * @param {string|number} [options.id] - The ID of the entry.
     * @param {Array} [options.extras=[]] - Extra data to patch the entry.
     * @returns {ChatMember} - The added or updated chat member.
     */
    _add(data, cache = true, { id, extras = [] } = {}) {
        if (this.cacheSize !== -1 && this.cacheSize < this.cache.size) {
            if (!cacheWarningEmitted) {
                cacheWarningEmitted = true;
                process.emitWarning(`Overriding the cache handling for ${this.constructor.name} is unsupported and breaks functionality`);
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
            }
            else {
                this.cache.set(id, new this.holds(this.client, this.chatId, extra));
            }
        }
        return this.cache.get(id);
    }
    /**
     * Fetches a chat member from the API.
     * @param {ChatMember|string|number} user - The chat member instance or ID.
     * @param {Object} [options={}] - Additional options.
     * @param {boolean} [options.cache=true] - Whether to cache the fetched chat member.
     * @param {boolean} [options.force=false] - Whether to force fetch from the API instead of using the cache.
     * @returns {Promise<ChatMember>} - The fetched chat member.
     */
    async fetch(user, { cache = true, force = false } = {}) {
        const id = this.resolveId(user);
        if (!force) {
            const existing = this.cache.get(id);
            if (existing)
                return existing;
        }
        const data = await this.client.getChatMember(this.chatId, id);
        if (cache)
            this.cache.set(id, data);
        return data;
    }
}
module.exports = { ChatMemberManager };
//# sourceMappingURL=ChatMemberManager.js.map