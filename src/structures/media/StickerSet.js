// @ts-check
const { Photo } = require("./Photo");
const { Sticker } = require("./Sticker");

class StickerSet {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").StickerSet} data - Data about the represents a sticker
   */
  constructor(client, data) {
    /** Sticker set name */
    this.name = data.name;

    /** Sticker set title */
    this.title = data.title;

    /** Type of stickers in the set, currently one of “regular”, “mask”, “custom_emoji” */
    this.stickerType = data.sticker_type;

    /** List of all set stickers */
    this.stickers = data.stickers.map(
      (sticker) => new Sticker(client, sticker),
    );

    if ("thumbnail" in data) {
      /** Sticker set thumbnail in the .WEBP, .TGS, or .WEBM format */
      this.thumbnail = new Photo(client, data.thumbnail);
    }
  }
}

module.exports = { StickerSet };
