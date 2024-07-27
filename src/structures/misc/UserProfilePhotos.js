const { Base } = require("../Base");
const { Photo } = require("../media/Photo");

class UserProfilePhotos extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").UserProfilePhotos} data - Data about the represent a user's profile pictures
   */
  constructor(client, data) {
    super(client);
    /** Total number of profile pictures the target user has */
    this.count = data.total_count;

    /** Requested profile pictures (in up to 4 sizes each) */
    this.photos = data.photos.map((photo) =>
      photo.map((photo) => new Photo(client, photo)),
    );
  }
}

module.exports = { UserProfilePhotos };
