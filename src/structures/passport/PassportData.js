const { EncryptedPassportElement } = require("./EncryptedPassportElement");

class PassportData {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").PassportData} data - Data about the describes the user's Telegram Passport data shared with the bot
   */
  constructor(client, data) {
    /** Array containing information about documents and other Telegram Passport elements shared with the bot. */
    this.data = data.data.map(
      (data) => new EncryptedPassportElement(client, data),
    );

    /** Encrypted credentials required to decrypt the data. */
    this.credentials = {
      data: data.credentials.data,
      hash: data.credentials.hash,
      secret: data.credentials.secret,
    };
  }
}

module.exports = { PassportData };
