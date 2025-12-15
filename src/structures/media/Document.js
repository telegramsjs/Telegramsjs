// @ts-check
const { Photo } = require("./Photo");
const { InputFile } = require("../misc/InputFile");

class Document extends InputFile {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").Document} data - Data about the represents a general file (as opposed to photos, voice messages and audio files)
   */
  constructor(client, data) {
    super(client, data);

    if ("file_name" in data) {
      /** Original filename as defined by sender */
      this.name = data.file_name;
    }

    if ("thumbnail" in data) {
      /** Document thumbnail as defined by sender */
      this.thumbnail = new Photo(client, data.thumbnail);
    }

    if ("mime_type" in data) {
      /** MIME type of the file as defined by sender */
      this.mimeType = data.mime_type;
    }
  }
}

module.exports = { Document };
