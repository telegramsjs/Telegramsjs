const { Photo } = require("./Photo");
const { InputFile } = require("../misc/InputFile");

class VideoNote extends InputFile {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").VideoNote} data - Data about the represents a video message (available in Telegram apps as of v.4.0)
   */
  constructor(client, data) {
    super(client, data);

    /** Video width and height (diameter of the video message) as defined by sender */
    this.length = data.length;

    /** Duration of the video in seconds as defined by sender */
    this.duration = data.duration;

    if ("thumbnail" in data) {
      /** Video thumbnail */
      this.thumbnail = new Photo(client, data.thumbnail);
    }
  }
}

module.exports = { VideoNote };
