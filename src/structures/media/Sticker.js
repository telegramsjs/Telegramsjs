const { Photo } = require("./Photo");
const { InputFile } = require("../InputFile");

class Sticker extends InputFile {
  constructor(client, data) {
    super(client, data);

    this.type = data.type;

    this.width = data.width;

    this.height = data.height;

    this.animated = data.is_animated;

    this.video = data.is_video;

    if ("thumbnail" in data) {
      this.thumbnail = new Photo(client, data.thumbnail);
    }

    if ("emoji" in data) {
      this.emoji = data.emoji;
    }

    if ("set_name" in data) {
      this.setName = data.set_name;
    }

    if ("premium_animation" in data) {
      this.animation = new InputFile(client, data.premium_animation);
    }

    if ("mask_position" in data) {
      this.mask = data.mask_position;
    }

    if ("custom_emoji_id" in data) {
      this.emojiId = data.custom_emoji_id;
    }
  }
}

module.exports = { Sticker };
