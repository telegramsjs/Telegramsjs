// @ts-check
const { Base } = require("../Base");

class PreparedKeyboardButton extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client
   * @param {any} data
   */
  constructor(client, data) {
    super(client);

    /** Unique identifier of the prepared button */
    this.id = data.id;

    /** Expiration date of the prepared button, in Unix time */
    this.expiresUnixTime = data.expiration_date;
  }

  get expiresTimestamp() {
    return this.expiresUnixTime * 1000;
  }

  get expiresAt() {
    return new Date(this.expiresTimestamp);
  }
}

module.exports = { PreparedKeyboardButton };
