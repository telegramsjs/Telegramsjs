const { Base } = require("../Base");
const { PassportFile } = require("./PassportFile");
const { InputFile } = require("../misc/InputFile");

class EncryptedPassportElement extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").EncryptedPassportElement} data - Data about the describes documents or other Telegram Passport elements shared with the bot by the user
   */
  constructor(client, data) {
    super(client);
    /** Element type. Possible values are "personal_details", "passport", "driver_license", "identity_card", "internal_passport", "address", "utility_bill", "bank_statement", "rental_agreement", "passport_registration", "temporary_registration", "phone_number", and "email". */
    this.type = data.type;

    /** Base64-encoded element hash for use in PassportElementErrorUnspecified. */
    this.hash = data.hash;

    this._patch(data);
  }

  /**
   * @param {import("@telegram.ts/types").EncryptedPassportElement} data - Data about the describes documents or other Telegram Passport elements shared with the bot by the user
   * @override
   */
  _patch(data) {
    if ("data" in data) {
      /**
       * Base64-encoded encrypted Telegram Passport element data provided by the user; available only for “personal_details”, “passport”, “driver_license”, “identity_card”, “internal_passport” and “address” types. Can be decrypted and verified using the accompanying EncryptedCredentials
       * @type {string | undefined}
       */
      this.data = data.data;
    }

    if ("phone_number" in data) {
      /**
       *  User's verified phone number; available only for type "phone_number"
       * @type {string | undefined}
       */
      this.phoneNumber = data.phone_number;
    }

    if ("email" in data) {
      /**
       * User's verified email address; available only for type "email"
       * @type {string | undefined}
       */
      this.email = data.email;
    }

    if ("files" in data) {
      /**
       * Array of encrypted files with documents provided by the user; This array is available only for types "utility_bill", "bank_statement", "rental_agreement", "passport_registration", and "temporary_registration". The files can be decrypted and verified using the accompanying EncryptedCredentials
       * @type {InputFile[] | undefined}
       */
      this.files = data.files.map(
        (file) => new PassportFile(this.client, file),
      );
    }

    if ("front_side" in data) {
      /**
       * Encrypted file with the front side of the document, provided by the user; This file is available only for types "passport", "driver_license", "identity_card", and "internal_passport". It can be decrypted and verified using the accompanying EncryptedCredentials
       * @type {PassportFile | undefined}
       */
      this.frontSide = new PassportFile(this.client, data.front_side);
    }

    if ("reverse_side" in data) {
      /**
       * Encrypted file with the reverse side of the document, provided by the user; This file is available only for types "driver_license" and "identity_card". It can be decrypted and verified using the accompanying EncryptedCredentials
       * @type {PassportFile | undefined}
       */
      this.reverseSide = new PassportFile(this.client, data.reverse_side);
    }

    if ("selfie" in data) {
      /**
       * Encrypted file with the selfie of the user holding a document, provided by the user. This file is available if requested for types "passport", "driver_license", "identity_card", and "internal_passport". It can be decrypted and verified using the accompanying EncryptedCredentials
       * @type {PassportFile | undefined}
       */
      this.selfie = new PassportFile(this.client, data.selfie);
    }

    if ("translation" in data) {
      /**
       * Array of encrypted files with translated versions of documents provided by the user; This array is available only for types "passport", "driver_license", "identity_card", "internal_passport", "utility_bill", "bank_statement", "rental_agreement", "passport_registration", and "temporary_registration".
       * The files can be decrypted and verified using the accompanying EncryptedCredentials
       * @type {PassportFile[] | undefined}
       */
      this.translation = data.translation.map(
        (translated) => new PassportFile(this.client, translated),
      );
    }

    return data;
  }
}

module.exports = { EncryptedPassportElement };
