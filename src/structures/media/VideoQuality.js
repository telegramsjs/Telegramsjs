// @ts-check
const { InputFile } = require("../misc/InputFile");

class VideoQuality extends InputFile {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").VideoQuality} data - Data about the represents video file of a specific quality
   */
  constructor(client, data) {
    super(client, data);

    /** Photo width */
    this.width = data.width;

    /** Photo height */
    this.height = data.height;

    /** Codec that was used to encode the video, for example, “h264”, “h265”, or “av01” */
    this.codec = data.codec;
  }
}

module.exports = { VideoQuality };
