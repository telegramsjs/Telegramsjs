export class ChatBoostRemoved extends Base {
    /**
     * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").ChatBoostRemoved} data - Data about the represents a boost removed from a chat
     */
    constructor(client: import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient, data: import("@telegram.ts/types").ChatBoostRemoved);
    /** Unique identifier of the boost */
    id: string;
    /** Chat which was boosted */
    chat: Chat;
    /** Source of the removed boost */
    source: ChatBoostSource;
    /** Point in time (Unix timestamp) when the boost was removed */
    removedTimestamp: number;
    /**
     * Point in time when the boost was removed
     * @type {Date}
     */
    get removedAt(): Date;
}
import { Base } from "./Base";
import { Chat } from "./chat/Chat";
import { ChatBoostSource } from "./boots/ChatBoostSource";
//# sourceMappingURL=ChatBoostRemoved.d.ts.map