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

    /** The sticker that represents the gift */
    this.sticker = new Sticker(client, data.sticker);

    /** The number of Telegram Stars that must be paid to send the sticker */
    this.startCount = data.star_count;

    if ("total_count" in data) {
      /** The total number of the gifts of this type that can be sent; for limited gifts only */
      this.totalCount = data.total_count;
    }

    if ("remaining_count" in data) {
      /** The number of remaining gifts of this type that can be sent; for limited gifts only */
      this.remainingCount = data.remaining_count;
    }
  }

  /** Sends a gift to the given user. The gift can't be converted to Telegram Stars by the user.
   * @param {string | number} userId - Unique identifier of the target user that will receive the gift.
   * @param {Omit<MethodParameters["sendGift"], "giftId" | "userId"> } options - out parameters.
   * @returns {Promise<true>} - Returns True on success.
   */
  sendGift(userId, options = {}) {
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
      this.startCount === other.startCount &&
      this.totalCount === other.totalCount &&
      this.remainingCount === other.remainingCount
    );
  }
}

module.exports = { Gift };
