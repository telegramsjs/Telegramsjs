/**
 * Manages users in the cache.
 * @extends {BaseManager<User>}
 */
export class UserManager extends BaseManager<User> {
    /**
     * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client instance.
     * @param {number} [cacheSize=-1] - The maximum size of the cache. Default is unlimited.
     */
    constructor(client: import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient, cacheSize?: number | undefined);
    /**
     * Resolves a user from a ChatMember, Message, or user ID.
     * @param {ChatMember|Message|number|string} user - The ChatMember, Message, or user ID to resolve.
     * @returns {User|null} The resolved User instance or null if not found.
     */
    resolve(user: ChatMember | Message | number | string): User | null;
    /**
     * Resolves the user ID from a ChatMember, Message, or user ID.
     * @param {ChatMember|Message|number|string} user - The ChatMember, Message, or user ID to resolve.
     * @returns {string|null} The resolved user ID or null if not found.
     */
    resolveId(user: ChatMember | Message | number | string): string | null;
    /**
     * Fetches a user by ID, optionally caching the result.
     * @param {ChatMember|Message|number|string} user - The ChatMember, Message, or user ID to fetch.
     * @param {Object} [options] - Options for fetching.
     * @param {boolean} [options.cache=true] - Whether to cache the fetched user.
     * @param {boolean} [options.force=false] - Whether to force fetching from the API.
     * @returns {Promise<User>} The fetched User instance.
     */
    fetch(user: ChatMember | Message | number | string, { cache, force }?: {
        cache?: boolean | undefined;
        force?: boolean | undefined;
    } | undefined): Promise<User>;
}
import { User } from "../structures/misc/User";
import { BaseManager } from "./BaseManager";
import { ChatMember } from "../structures/chat/ChatMember";
import { Message } from "../structures/message/Message";
//# sourceMappingURL=UserManager.d.ts.map