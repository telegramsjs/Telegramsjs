// @ts-check
const { Gift } = require("./Gift");

/**
 * @typedef {import("../../types").MethodParameters} MethodParameters
 */

class Gifts {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").Gifts} data - Data about the list of gifts.
   */
  constructor(client, data) {
    /** The list of gifts */
    this.gifts = data.gifts.map((gift) => new Gift(client, gift));
  }

  /**
   * Checks if this gifts is equal to another gifts.
   * @param {Gifts} other - The other object to compare with.
   * @returns {boolean} True if both objects are instances of Gifts and are equal based on key properties, otherwise false.
   */
  equals(other) {
    if (!other || !(other instanceof Gifts)) return false;

    return (
      this.gifts.length === other.gifts.length &&
      this.gifts.every((gift, i) => other.gifts[i]?.equals(gift))
    );
  }

  /**
   * Makes the class iterable, returning each `Gift` object.
   * @returns {IterableIterator<Gift>}
   */
  *[Symbol.iterator]() {
    for (const gift of this.gifts) {
      yield gift;
    }
  }
}

module.exports = { Gifts };
