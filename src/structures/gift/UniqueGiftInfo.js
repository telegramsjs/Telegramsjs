// @ts-check
const { Base } = require("../Base");
const { UniqueGift } = require("./UniqueGift");

class UniqueGiftInfo extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").UniqueGiftInfo} data - Data about the message about a unique gift that was sent or received.
   */
  constructor(client, data) {
    super(client);

    /** Information about the gift */
    this.gift = new UniqueGift(client, data.gift);

    /** Origin of the gift. Currently, either “upgrade” or “transfer” */
    this.origin = data.origin;

    if ("owned_gift_id" in data) {
      /** Unique identifier of the received gift for the bot; only present for gifts received on behalf of business accounts */
      this.ownedGiftId = data.owned_gift_id;
    }

    if ("transfer_star_count" in data) {
      /** Number of Telegram Stars that must be paid to transfer the gift; omitted if the bot cannot transfer the gift */
      this.transferStarCount = data.transfer_star_count;
    }
  }
}

module.exports = { UniqueGiftInfo };
