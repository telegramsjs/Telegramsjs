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

    /** Origin of the gift. Currently, either “upgrade” for gifts upgraded from regular gifts, “transfer” for gifts transferred from other users or channels, “resale” for gifts bought from other users, “gifted_upgrade” for upgrades purchased after the gift was sent, or “offer” for gifts bought or sold through gift purchase offers */
    this.origin = data.origin;

    if ("owned_gift_id" in data) {
      /** Unique identifier of the received gift for the bot; only present for gifts received on behalf of business accounts */
      this.ownedGiftId = data.owned_gift_id;
    }

    if ("transfer_star_count" in data) {
      /** Number of Telegram Stars that must be paid to transfer the gift; omitted if the bot cannot transfer the gift */
      this.transferStarCount = data.transfer_star_count;
    }

    if ("last_resale_currency" in data) {
      /** For gifts bought from other users, the currency in which the payment for the gift was done. Currently, one of “XTR” for Telegram Stars or “TON” for toncoins. */
      this.lastResaleCurrency = data.last_resale_currency;
    }

    if ("last_resale_amount" in data) {
      /** For gifts bought from other users, the price paid for the gift in either Telegram Stars or nanotoncoins */
      this.lastResaleAmount = data.last_resale_amount;
    }

    if ("next_transfer_date" in data) {
      /**
       * Point in time (Unix timestamp) when the gift can be transferred. If it is in the past, then the gift can be transferred now
       * @type {number | undefined}
       */
      this.nextTransferUnixTime = data.next_transfer_date;
    }
  }

  /**
   * Return the timestamp gift can be transferred. If it is in the past, then the gift can be transferred now
   */
  get nextTransferTimestamp() {
    return this.nextTransferUnixTime ? this.nextTransferUnixTime * 1000 : null;
  }

  /**
   * Date the gift can be transferred. If it is in the past, then the gift can be transferred now
   * @type {null | Date}
   */
  get nextTransferAt() {
    return this.nextTransferTimestamp
      ? new Date(this.nextTransferTimestamp)
      : null;
  }
}

module.exports = { UniqueGiftInfo };
