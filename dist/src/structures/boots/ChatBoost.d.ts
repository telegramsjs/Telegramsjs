export class ChatBoost {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").ChatBoost} data - Data about the boost
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").ChatBoost);
    /** Unique identifier of the boost */
    id: string;
    /** Point in time (Unix timestamp) when the chat was boosted */
    createdTimestamp: number;
    /** Point in time (Unix timestamp) when the boost will automatically expire, unless the booster's Telegram Premium subscription is prolonged */
    expirationedTimestamp: number;
    /** Source of the added boost */
    source: ChatBoostSource;
    /**
     * Point in time when the chat was boosted
     * @type {Date}
     */
    get createdAt(): Date;
    /**
     * Point in time (Unix timestamp) when the boost will automatically expire, unless the booster's Telegram Premium subscription is prolonged
     * @type {Date}
     */
    get expirationedAt(): Date;
}
import { ChatBoostSource } from "./ChatBoostSource";
//# sourceMappingURL=ChatBoost.d.ts.map