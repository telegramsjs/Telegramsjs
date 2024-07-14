const { PaidMedia } = require("./PaidMedia");

class PaidMediaInfo {
  constructor(client, data) {
    this.starCount = data.star_count;

    this.media = data.paid_media.map((media) => new PaidMedia(client, media));
  }
}

module.exports = { PaidMediaInfo };
