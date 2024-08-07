"use strict";
const { Base } = require("../Base");
class GiveawayCompleted extends Base {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").GiveawayCompleted} data - Data about the represents a service message about the completion of a giveaway without public winners
     */
    constructor(client, data) {
        super(client);
        /** Number of winners in the giveaway */
        this.count = data.winner_count;
        /** Number of undistributed prizes */
        this.unclaimedPrizeCount = data.unclaimed_prize_count;
        const { Message } = require("../message/Message");
        /** Message with the giveaway that was completed, if it wasn't deleted */
        this.message = new Message(client, data.message);
    }
}
module.exports = { GiveawayCompleted };
//# sourceMappingURL=GiveawayCompleted.js.map