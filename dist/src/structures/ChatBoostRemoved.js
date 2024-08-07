"use strict";
const { Base } = require("./Base");
const { Chat } = require("./chat/Chat");
const { ChatBoostSource } = require("./boots/ChatBoostSource");
class ChatBoostRemoved extends Base {
    /**
     * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").ChatBoostRemoved} data - Data about the represents a boost removed from a chat
     */
    constructor(client, data) {
        super(client);
        /** Unique identifier of the boost */
        this.id = data.boost_id;
        /** Chat which was boosted */
        this.chat = new Chat(client, data.chat);
        /** Source of the removed boost */
        this.source = new ChatBoostSource(client, data.source);
        /** Point in time (Unix timestamp) when the boost was removed */
        this.removedTimestamp = data.remove_date;
    }
    /**
     * Point in time when the boost was removed
     * @type {Date}
     */
    get removedAt() {
        return new Date(this.removedTimestamp);
    }
}
module.exports = { ChatBoostRemoved };
//# sourceMappingURL=ChatBoostRemoved.js.map