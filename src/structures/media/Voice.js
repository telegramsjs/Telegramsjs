const { InputFile } = require("../misc/InputFile");

class Voice extends InputFile {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").Voice} data - Data about the represents a voice note
   */
  constructor(client, data) {
    super(client, data);

    /** Duration of the audio in seconds as defined by sender */
    this.duration = data.duration;

    if ("mime_type" in data) {
      /** MIME type of the file as defined by sender */
      this.mimeType = data.mime_type;
    }
  }
}

module.exports = { Voice };
