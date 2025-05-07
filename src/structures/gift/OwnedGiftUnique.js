// @ts-check
const { Base } = require("../Base");
const { UniqueGift } = require("./UniqueGift");

class OwnedGiftUnique extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").OwnedGiftUnique} data - Data about the unique gift received and owned by a user or a chat.
   */
  constructor(client, data) {
    super(client);

    /** Type of the gift, always “unique” */
    this.type = data.type;

    /** Information about the unique gift */
    this.gift = new UniqueGift(client, data.gift);

    if ("owned_gift_id" in data) {
      /** Unique identifier of the gift for the bot; for gifts received on behalf of business accounts only */
      this.ownedGiftId = data.owned_gift_id;
    }

    if ("sender_user" in data) {
      /**
       * Sender of the gift if it is a known user
       * @type {import("../misc/User").User}
       */
      this.senderUser = client.users._add(data.sender_user);
    }

    /** Date the gift was sent in Unix time */
    this.senderUnixTime = data.send_date;

    if ("is_saved" in data) {
      /** True, if the gift is displayed on the account's profile page; for gifts received on behalf of business accounts only */
      this.isSaved = data.is_saved;
    }

    if ("can_be_transferred" in data) {
      /** True, if the gift can be transferred to another owner; for gifts received on behalf of business accounts only */
      this.beTransferred = data.can_be_transferred;
    }

    if ("transfer_star_count" in data) {
      /** Number of Telegram Stars that must be paid to transfer the gift; omitted if the bot cannot transfer the gift */
      this.transferStarCount = data.transfer_star_count;
    }
  }

  /**
   * Return the timestamp message was sent, in milliseconds
   */
  get senderTimestamp() {
    return this.senderUnixTime * 1000;
  }

  /**
   * Date the message was sent. It is always a positive number, representing a valid date
   * @type {Date}
   */
  get senderAt() {
    return new Date(this.senderUnixTime);
  }
}

module.exports = { OwnedGiftUnique };
