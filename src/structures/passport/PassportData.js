// @ts-check
const { Base } = require("../Base");
const { EncryptedPassportElement } = require("./EncryptedPassportElement");
const { Collection } = require("@telegram.ts/collection");

class PassportData extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").PassportData} data - Data about the describes the user's Telegram Passport data shared with the bot
   */
  constructor(client, data) {
    super(client);

    /**
     * Collection containing information about documents and other Telegram Passport elements shared with the bot.
     * @type {import("@telegram.ts/collection").ReadonlyCollection<number, EncryptedPassportElement>}
     */
    this.data = new Collection(
      data.data.map((data, index) => [
        index,
        new EncryptedPassportElement(client, data),
      ]),
    );

    /** Encrypted credentials required to decrypt the data. */
    this.credentials = {
      data: data.credentials.data,
      hash: data.credentials.hash,
      secret: data.credentials.secret,
    };
  }

  /**
   * Informs a user that some of the Telegram Passport elements they provided contains errors. The user will not be able to re-submit their Passport to you until the errors are fixed (the contents of the field for which you returned the error must change).
   * @param {string | number} userId - User identifier
   * @param {readonly import("../../client/interfaces/Passport").PassportElementError[]} errors - An array describing the errors
   * @returns {Promise<true>} - Returns True on success.
   */
  setDataErrors(userId, errors) {
    return this.client.setPassportDataErrors(userId, errors);
  }
}

module.exports = { PassportData };
