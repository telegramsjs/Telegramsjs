// @ts-check
const { Base } = require("../Base");
const { OwnedGiftUnique } = require("./OwnedGiftUnique");
const { OwnedGiftRegular } = require("./OwnedGiftRegular");

class OwnedGifts extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").OwnedGifts} data - Data about the list of gifts received and owned by a user or a chat.
   */
  constructor(client, data) {
    super(client);

    /** The total number of gifts owned by the user or the chat */
    this.totalCount = data.total_count;

    if ("gifts" in data) {
      /** The list of gifts */
      this.gifts = data.gifts.map((gift) =>
        gift.type === "regular"
          ? new OwnedGiftRegular(client, gift)
          : new OwnedGiftUnique(client, gift),
      );
    }

    if ("next_offset" in data) {
      /** Offset for the next request. If empty, then there are no more results */
      this.nextOffset = data.next_offset;
    }
  }
}

module.exports = { OwnedGifts };
