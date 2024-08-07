"use strict";
const { ChatBoost } = require("./ChatBoost");
class UserChatBoosts {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").UserChatBoosts} data - Data about the user chat boosts
     */
    constructor(client, data) {
        /**
         * The list of boosts added to the chat by the user
         * @type {ChatBoost[]}
         */
        this.boosts = data.boosts.map((boost) => new ChatBoost(client, data));
        /**
         * The boost count added to the chat by the user
         * @type {number}
         */
        this.count = data.boosts.length;
    }
}
module.exports = { UserChatBoosts };
//# sourceMappingURL=UserChatBoosts.js.map