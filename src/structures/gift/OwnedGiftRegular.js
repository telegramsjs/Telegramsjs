// @ts-check
const { Base } = require("../Base");
const { Gift } = require("./Gift");
const { MessageEntities } = require("../message/MessageEntities");

class OwnedGiftRegular extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").OwnedGiftRegular} data - Data about the regular gift owned by a user or a chat.
   */
  constructor(client, data) {
    super(client);

    /** Type of the gift, always “regular” */
    this.type = data.type;

    /** Information about the regular gift */
    this.gift = new Gift(client, data.gift);

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

    if ("text" in data) {
      /** Text of the message that was added to the gift */
      this.content = data.text;

      if ("entities" in data) {
        /** Special entities that appear in the text */
        this.entities = new MessageEntities(client, data.text, data.entities);
      }
    }

    if ("is_private" in data) {
      /** True, if the sender and gift text are shown only to the gift receiver; otherwise, everyone will be able to see them */
      this.isPrivate = data.is_private;
    }

    if ("is_saved" in data) {
      /** True, if the gift is displayed on the account's profile page; for gifts received on behalf of business accounts only */
      this.isSaved = data.is_saved;
    }

    if ("can_be_upgraded" in data) {
      /** True, if the gift can be upgraded to a unique gift; for gifts received on behalf of business accounts only */
      this.beUpgraded = data.can_be_upgraded;
    }

    if ("was_refunded" in data) {
      /** True, if the gift was refunded and isn't available anymore */
      this.wasRefunded = data.was_refunded;
    }

    if ("convert_star_count" in data) {
      /** Number of Telegram Stars that can be claimed by the receiver instead of the gift; omitted if the gift cannot be converted to Telegram Stars */
      this.convertStarCount = data.convert_star_count;
    }

    if ("prepaid_upgrade_star_count" in data) {
      /** Number of Telegram Stars that were paid by the sender for the ability to upgrade the gift */
      this.prepaidUpgradeStarCount = data.prepaid_upgrade_star_count;
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

module.exports = { OwnedGiftRegular };
