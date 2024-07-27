const { PaidMedia } = require("./PaidMedia");

class PaidMediaInfo {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").PaidMediaInfo} data - Data about the describes the paid media added to a message
   */
  constructor(client, data) {
    /** The number of Telegram Stars that must be paid to buy access to the media */
    this.starCount = data.star_count;

    /** Information about the paid media */
    this.media = data.paid_media.map((media) => new PaidMedia(client, media));
  }
}

module.exports = { PaidMediaInfo };
