// @ts-check
const { Base } = require("../Base");
const { Sticker } = require("../media/Sticker");
const { isDeepStrictEqual } = require("../../util/Utils");

/**
 * @typedef {import("../../types").MethodParameters} MethodParameters
 */

class Gift extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").Gift} data - Data about the gift that can be sent by the bot.
   */
  constructor(client, data) {
    super(client);

    /** Unique identifier of the gift */
    this.id = data.id;

    if ("publisher_chat" in data) {
      /**
       * Information about the chat that published the gift
       * @type {import("../chat/Chat").Chat | undefined}
       */
      this.publisherChat = this.client.chats._add(data.publisher_chat);
    }

    /** The sticker that represents the gift */
    this.sticker = new Sticker(client, data.sticker);

    if ("background" in data) {
      /**
       * Background of the gift
       * @typedef {Object} BackgroundColor
       * @property {number} center - Center color of the background in RGB format.
       * @property {number} edge - Edge color of the background in RGB format.
       * @property {number} text - Text color of the background in RGB format.
       */

      /**
       * Background of the gift
       * @type {BackgroundColor | undefined}
       */
      this.backgroundColor = {
        center: data.background.center_color,
        edge: data.background.edge_color,
        text: data.background.text_color,
      };
    }

    if ("is_premium" in data) {
      /** True, if the gift can only be purchased by Telegram Premium subscribers */
      this.isPremium = data.is_premium;
    }

    if ("has_colors" in data) {
      /** True, if the gift can be used (after being upgraded) to customize a user's appearance */
      this.hasColors = data.has_colors;
    }

    /** The number of Telegram Stars that must be paid to send the sticker */
    this.startCount = data.star_count;

    if ("upgrade_star_count" in data) {
      /** The number of Telegram Stars that must be paid to upgrade the gift to a unique one */
      this.upgradeStarCount = data.upgrade_star_count;
    }

    if ("unique_gift_variant_count" in data) {
      /** The total number of different unique gifts that can be obtained by upgrading the gift */
      this.uniqueGiftVariantCount = data.unique_gift_variant_count;
    }

    if ("total_count" in data) {
      /** The total number of the gifts of this type that can be sent; for limited gifts only */
      this.totalCount = data.total_count;
    }

    if ("remaining_count" in data) {
      /** The number of remaining gifts of this type that can be sent by all users; for limited gifts only */
      this.remainingCount = data.remaining_count;
    }

    if ("personal_total_count" in data) {
      /** The total number of gifts of this type that can be sent by the bot; for limited gifts only */
      this.personalTotalCount = data.personal_total_count;
    }

    if ("personal_remaining_count" in data) {
      /** The number of remaining gifts of this type that can be sent by the bot; for limited gifts only */
      this.personalRemainingCount = data.personal_remaining_count;
    }
  }

  /** Sends a gift to the given user or channel chat. The gift can't be converted to Telegram Stars by the receive.
   * @param {string | number} userId - Unique identifier of the target user that will receive the gift.
   * @param {Omit<MethodParameters["sendGift"], "giftId" | "userId"> } options - out parameters.
   * @returns {Promise<true>} - Returns True on success.
   */
  send(userId, options = {}) {
    return this.client.sendGift({
      userId,
      giftId: this.id,
      ...options,
    });
  }

  /**
   * Checks if this gift is equal to another gift.
   * @param {Gift} other - The other object to compare with.
   * @returns {boolean} True if both objects are instances of Gift and are equal based on key properties, otherwise false.
   */
  equals(other) {
    if (!other || !(other instanceof Gift)) return false;

    return (
      this.id === other.id &&
      isDeepStrictEqual(this.sticker, other.sticker) &&
      isDeepStrictEqual(this.backgroundColor, other.backgroundColor) &&
      this.isPremium === other.isPremium &&
      this.hasColors === other.hasColors &&
      this.startCount === other.startCount &&
      this.totalCount === other.totalCount &&
      this.uniqueGiftVariantCount === other.uniqueGiftVariantCount &&
      this.upgradeStarCount === other.upgradeStarCount &&
      this.remainingCount === other.remainingCount &&
      this.personalTotalCount === other.personalTotalCount &&
      this.personalRemainingCount === other.personalRemainingCount
    );
  }
}

module.exports = { Gift };
