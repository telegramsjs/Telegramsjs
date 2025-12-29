// @ts-check
const { Gift } = require("./Gift");
const { Collection } = require("@telegram.ts/collection");

/**
 * @typedef {import("../../types").MethodParameters} MethodParameters
 */

class Gifts {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").Gifts} data - Data about the list of gifts.
   */
  constructor(client, data) {
    /**
     * The list of gifts
     * @type {Collection<string, Gift>}
     */
    this.gifts = new Collection(
      data.gifts.map((gift) => [gift.id, new Gift(client, gift)]),
    );
  }

  /**
   * Checks if this gifts is equal to another gifts.
   * @param {Gifts} other - The other object to compare with.
   * @returns {boolean} True if both objects are instances of Gifts and are equal based on key properties, otherwise false.
   */
  equals(other) {
    if (!other || !(other instanceof Gifts)) return false;

    const thisGifts = Array.from(this.gifts).map(([_, gift]) => gift);
    const otherGifts = Array.from(other.gifts).map(([_, gift]) => gift);

    return (
      thisGifts.length === otherGifts.length &&
      thisGifts.every((gift, i) => otherGifts[i]?.equals(gift))
    );
  }

  /**
   * Makes the class iterable, returning each `Gift` object.
   * @returns {IterableIterator<Gift>}
   */
  *[Symbol.iterator]() {
    yield* this.gifts.values();
  }
}

module.exports = { Gifts };
