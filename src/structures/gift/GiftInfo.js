// @ts-check
const { Base } = require("../Base");
const { Gift } = require("./Gift");
const { MessageEntities } = require("../message/MessageEntities");

class GiftInfo extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").GiftInfo} data - Data about the message about a regular gift that was sent or received.
   */
  constructor(client, data) {
    super(client);

    /** Information about the regular gift */
    this.gift = new Gift(client, data.gift);

    if ("owned_gift_id" in data) {
      /** Unique identifier of the gift for the bot; for gifts received on behalf of business accounts only */
      this.ownedGiftId = data.owned_gift_id;
    }

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

    if ("can_be_upgraded" in data) {
      /** True, if the gift can be upgraded to a unique gift; for gifts received on behalf of business accounts only */
      this.beUpgraded = data.can_be_upgraded;
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
}

module.exports = { GiftInfo };
