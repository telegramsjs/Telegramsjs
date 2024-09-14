// @ts-check
const { InputFile } = require("../misc/InputFile");

class Photo extends InputFile {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").PhotoSize} data - Data about the represents one size of a photo or a file / sticker thumbnail
   */
  constructor(client, data) {
    super(client, data);

    /** Photo width */
    this.width = data.width;

    /** Photo height */
    this.height = data.height;
  }
}

module.exports = { Photo };
