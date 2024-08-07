"use strict";
const { Base } = require("../Base");
const { User } = require("../misc/User");
class ChatBoostSource extends Base {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").ChatBoostSource} data - Data about the boost source
     */
    constructor(client, data) {
        super(client);
        this._patch(data);
    }
    _patch(data) {
        if ("user" in data) {
            /**
             * User that boosted the chat
             * @type {User}
             */
            this.user = new User(this.client, data.user);
        }
        if ("giveaway_message_id" in data) {
            /**
             * Identifier of a message in the chat with the giveaway; the message could have been deleted already
             * @type {number}
             */
            this.giveawayId = data.giveaway_message_id;
        }
        if ("is_unclaimed" in data) {
            /**
             * True, if the giveaway was completed, but there was no user to win the prize
             * @type {true}
             */
            this.unclaimed = data.is_unclaimed;
        }
        return data;
    }
    /**
     * @return {this is this & { giveawayId: number }}
     */
    isGiveaway() {
        return Boolean("giveawayId" in this && this.giveawayId);
    }
    /**
     * @return {this is this & { readonly user: User; readonly giveawayId: number } }
     */
    isPremiumAndGift() {
        return Boolean("user" in this && this.user && !("giveawayId" in this));
    }
}
module.exports = { ChatBoostSource };
//# sourceMappingURL=ChatBoostSource.js.map