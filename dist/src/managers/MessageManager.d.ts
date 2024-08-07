/**
 * Manages messages in the cache.
 * @extends {BaseManager<Message>}
 */
export class MessageManager extends BaseManager<Message> {
    /**
     * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client instance.
     * @param {number} [cacheSize=-1] - The maximum size of the cache. Default is unlimited.
     */
    constructor(client: import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient, cacheSize?: number | undefined);
}
import { Message } from "../structures/message/Message";
import { BaseManager } from "./BaseManager";
//# sourceMappingURL=MessageManager.d.ts.map