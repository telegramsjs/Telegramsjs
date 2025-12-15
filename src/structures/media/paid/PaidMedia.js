// @ts-check
const { Base } = require("../../Base");
const { Photo } = require("../Photo");
const { Video } = require("../Video");

class PaidMedia extends Base {
  /**
   * @param {import("../../../client/TelegramClient").TelegramClient | import("../../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").PaidMedia} data - Data about the describes paid media
   */
  constructor(client, data) {
    super(client);

    this._patch(data);
  }

  /**
   * @param {import("@telegram.ts/types").PaidMedia} data - Data about the describes paid media
   * @override
   */
  _patch(data) {
    if ("width" in data) {
      /**
       * Media width as defined by the sender
       * @type {number | undefined}
       */
      this.width = data.width;
    }

    if ("height" in data) {
      /**
       * Media height as defined by the sender
       * @type {number | undefined}
       */
      this.height = data.height;
    }

    if ("duration" in data) {
      /**
       * Duration of the media in seconds as defined by the sender
       * @type {number | undefined}
       */
      this.duration = data.duration;
    }

    if ("photo" in data) {
      /**
       * The photo
       * @type {Photo[] | undefined}
       */
      this.photo = data.photo.map((photo) => new Photo(this.client, photo));
    }

    if ("video" in data) {
      /**
       * The video
       * @type {Video | undefined}
       */
      this.video = new Video(this.client, data.video);
    }

    return data;
  }

  /**
   * @returns {this is this & { video?: undefined; photo?: undefined }}
   */
  isPreview() {
    return !this.isPhoto() && !this.isVideo();
  }

  /**
   * @returns {this is this & { photo: Photo[] }}
   */
  isPhoto() {
    return Boolean("photo" in this && this.photo);
  }

  /**
   * @returns {this is this & { video: Video }}
   */
  isVideo() {
    return Boolean("video" in this && this.video);
  }
}

module.exports = { PaidMedia };
