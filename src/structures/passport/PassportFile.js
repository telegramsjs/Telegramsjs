const { InputFile } = require("../misc/InputFile");

class PassportFile extends InputFile {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").PassportFile} data - Data about the represents a file uploaded to Telegram Passport. Currently, all Telegram Passport files are in JPEG format when decrypted and do not exceed 10MB
   */
  constructor(client, data) {
    super(client, data);

    /** Unix time when the file was uploaded */
    this.createdUnixTime = data.file_date;
  }

  /**
   * Return the timestamp file was uploaded, in milliseconds
   */
  get createdTimestamp() {
    return this.createdUnixTime * 1000;
  }

  /**
   * Date when the file was uploaded
   * @type {Date}
   */
  get createdAt() {
    return new Date(this.createdTimestamp);
  }
}

module.exports = { PassportFile };
