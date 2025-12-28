// @ts-check
const { PaidMedia } = require("./PaidMedia");
const { Collection } = require("@telegram.ts/collection");

class PaidMediaInfo {
  /**
   * @param {import("../../../client/TelegramClient").TelegramClient | import("../../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").PaidMediaInfo} data - Data about the describes the paid media added to a message
   */
  constructor(client, data) {
    /** The number of Telegram Stars that must be paid to buy access to the media */
    this.starCount = data.star_count;

    /**
     * Information about the paid media
     * @type {import("@telegram.ts/collection").ReadonlyCollection<number, PaidMedia>}
     */
    this.media = new Collection(
      data.paid_media.map((media, index) => [
        index,
        new PaidMedia(client, media),
      ]),
    );
  }

  /**
   * Makes the class iterable, returning each `PaidMedia` object.
   * @returns {IterableIterator<PaidMedia>}
   */
  *[Symbol.iterator]() {
    for (const media of this.media.values()) {
      yield media;
    }
  }
}

module.exports = { PaidMediaInfo };
