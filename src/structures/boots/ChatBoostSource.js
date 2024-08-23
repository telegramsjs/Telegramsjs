const { Base } = require("../Base");

class ChatBoostSource extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").ChatBoostSource} data - Data about the boost source
   */
  constructor(client, data) {
    super(client);

    this._patch(data);
  }

  /**
   * @param {import("@telegram.ts/types").ChatBoostSource} data - Data about the boost source
   * @override
   */
  _patch(data) {
    if ("user" in data) {
      /**
       * User that boosted the chat
       * @type {import("../misc/User").User | undefined}
       */
      this.user = this.client.users._add(data.user);
    }

    if ("giveaway_message_id" in data) {
      /**
       * Identifier of a message in the chat with the giveaway; the message could have been deleted already
       * @type {string | undefined}
       */
      this.giveawayId = String(data.giveaway_message_id);
    }

    /**
     * True, if the giveaway was completed, but there was no user to win the prize
     * @type {boolean}
     */
    this.unclaimed = Boolean("is_unclaimed" in data && data.is_unclaimed);

    return data;
  }

  /**
   * @returns {this is this & { giveawayId: string }}
   */
  isGiveaway() {
    return Boolean("giveawayId" in this && this.giveawayId);
  }

  /**
   * @returns {this is this & { user: import("../misc/User").User; giveawayId: string } }
   */
  isPremiumAndGift() {
    return Boolean("user" in this && this.user && !("giveawayId" in this));
  }
}

module.exports = { ChatBoostSource };
