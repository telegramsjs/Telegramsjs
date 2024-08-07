"use strict";
const { Base } = require("./Base");
const { Chat } = require("./chat/Chat");
const { ChatBoost } = require("./boots/ChatBoost");
class ChatBoostUpdated extends Base {
    /**
     * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").ChatBoostUpdated} data - Data about the represents a boost added to a chat or changed
     */
    constructor(client, data) {
        super(client);
        /** Chat which was boosted  */
        this.chat = new Chat(client, data.chat);
        /** Information about the chat boost */
        this.boost = new ChatBoost(client, data.boost);
    }
}
module.exports = { ChatBoostUpdated };
//# sourceMappingURL=ChatBoostUpdated.js.map