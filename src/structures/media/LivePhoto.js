// @ts-check
const { InputFile } = require("../misc/InputFile");
const { Photo } = require("../media/Photo");

class LivePhoto extends InputFile {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").LivePhoto} data - Data about the represents a live photo.
   */
  constructor(client, data) {
    super(client, data);

    if ("photo" in data) {
      /**
       * Available sizes of the corresponding static photo
       * @type {Photo[] | undefined}
       */
      this.photo = data.photo.map((photo) => new Photo(client, photo));
    }

    /** Video width as defined by the sender */
    this.width = data.width;

    /** Video height as defined by the sender */
    this.height = data.height;

    /** Duration of the video in seconds as defined by the sender */
    this.duration = data.duration;

    if ("mime_type" in data) {
      /**
       * MIME type of the file as defined by the sender
       * @type {string | undefined}
       */
      this.mimeType = data.mime_type;
    }
  }
}

module.exports = { LivePhoto };
