const { Photo } = require("./Photo");
const { InputFile } = require("../misc/InputFile");

class Sticker extends InputFile {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").Sticker} data - Data about the represents a sticker
   */
  constructor(client, data) {
    super(client, data);

    /** Type of the sticker, currently one of “regular”, “mask”, “custom_emoji”. The type of the sticker is independent from its format, which is determined by the fields is_animated and is_video. */
    this.type = data.type;

    /** Sticker width */
    this.width = data.width;

    /** Sticker height */
    this.height = data.height;

    /** True, if the sticker is animated */
    this.animated = data.is_animated;

    /** True, if the sticker is a video sticker */
    this.video = data.is_video;

    if ("thumbnail" in data) {
      /** Sticker thumbnail in the .WEBP or .JPG format */
      this.thumbnail = new Photo(client, data.thumbnail);
    }

    if ("emoji" in data) {
      /** Emoji associated with the sticker */
      this.emoji = data.emoji;
    }

    if ("set_name" in data) {
      /** Name of the sticker set to which the sticker belongs */
      this.setName = data.set_name;
    }

    if ("premium_animation" in data) {
      /** For premium regular stickers, premium animation for the sticker */
      this.animation = new InputFile(client, data.premium_animation);
    }

    if ("mask_position" in data) {
      /** For mask stickers, the position where the mask should be placed */
      this.mask = data.mask_position;
    }

    if ("custom_emoji_id" in data) {
      /** For custom emoji stickers, unique identifier of the custom emoji */
      this.emojiId = data.custom_emoji_id;
    }
  }
}

module.exports = { Sticker };
