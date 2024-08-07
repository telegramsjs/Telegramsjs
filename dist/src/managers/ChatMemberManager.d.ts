/**
 * Manages chat members for a specific chat.
 * @extends {BaseManager<ChatMember>}
 */
export class ChatMemberManager extends BaseManager<ChatMember> {
    /**
     * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client instance.
     * @param {number} chatId - The ID of the chat.
     * @param {number} [cacheSize=-1] - The maximum size of the cache. Default is unlimited.
     */
    constructor(client: import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient, chatId: number, cacheSize?: number | undefined);
    /**
     * Adds data to the cache or updates an existing entry.
     * @param {import("@telegram.ts/types").ChatMember} data - The data to add or update.
     * @param {boolean} [cache=true] - Whether to cache the data.
     * @param {Object} [options={}] - Additional options.
     * @param {string|number} [options.id] - The ID of the entry.
     * @param {Array} [options.extras=[]] - Extra data to patch the entry.
     * @returns {ChatMember} - The added or updated chat member.
     */
    _add(data: import("@telegram.ts/types").ChatMember, cache?: boolean | undefined, { id, extras }?: {
        id?: string | number | undefined;
        extras?: any[] | undefined;
    } | undefined): ChatMember;
    /**
     * Fetches a chat member from the API.
     * @param {ChatMember|string|number} user - The chat member instance or ID.
     * @param {Object} [options={}] - Additional options.
     * @param {boolean} [options.cache=true] - Whether to cache the fetched chat member.
     * @param {boolean} [options.force=false] - Whether to force fetch from the API instead of using the cache.
     * @returns {Promise<ChatMember>} - The fetched chat member.
     */
    fetch(user: ChatMember | string | number, { cache, force }?: {
        cache?: boolean | undefined;
        force?: boolean | undefined;
    } | undefined): Promise<ChatMember>;
}
import { ChatMember } from "../structures/chat/ChatMember";
import { BaseManager } from "./BaseManager";
//# sourceMappingURL=ChatMemberManager.d.ts.map