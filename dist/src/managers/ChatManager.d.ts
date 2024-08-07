/**
 * Manages chat-related data.
 * @extends {BaseManager<Chat>}
 */
export class ChatManager extends BaseManager<Chat> {
    /**
     * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client instance.
     * @param {number} [cacheSize=-1] - The maximum size of the cache. Default is unlimited.
     */
    constructor(client: import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient, cacheSize?: number | undefined);
    /**
     * Resolves a chat object.
     * @param {Chat|ChatMember|Message|string|number} chat - The chat instance, chat member, message, or ID.
     * @returns {Chat|null} - The resolved chat object or null if not found.
     */
    resolve(chat: Chat | ChatMember | Message | string | number): Chat | null;
    /**
     * Fetches a chat object from the API.
     * @param {Chat|string|number} chat - The chat instance or ID.
     * @param {Object} [options={}] - Additional options.
     * @param {boolean} [options.cache=true] - Whether to cache the fetched chat.
     * @param {boolean} [options.force=false] - Whether to force fetch from the API instead of using the cache.
     * @returns {Promise<import("../structures/chat/ChatFullInfo").ChatFullInfo>} - The fetched chat object.
     */
    fetch(chat: Chat | string | number, { cache, force }?: {
        cache?: boolean | undefined;
        force?: boolean | undefined;
    } | undefined): Promise<import("../structures/chat/ChatFullInfo").ChatFullInfo>;
}
import { Chat } from "../structures/chat/Chat";
import { BaseManager } from "./BaseManager";
import { ChatMember } from "../structures/chat/ChatMember";
import { Message } from "../structures/message/Message";
//# sourceMappingURL=ChatManager.d.ts.map