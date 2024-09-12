const { Base } = require("../Base");

class User extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").User | import("@telegram.ts/types").UserFromGetMe} data - represents a Telegram user or bot
   */
  constructor(client, data) {
    super(client);

    /** Unique identifier for this user or bot. */
    this.id = String(data.id);

    /** True, if this user is a bot */
    this.isBot = Boolean(data.is_bot);

    /** User's or bot's first name */
    this.firstName = data.first_name;

    this._patch(data);
  }

  /**
   * @param {import("@telegram.ts/types").User | import("@telegram.ts/types").UserFromGetMe} data - represents a Telegram user or bot
   * @override
   */
  _patch(data) {
    if ("last_name" in data) {
      /**
       * User's or bot's last name
       * @type {string | undefined}
       */
      this.lastName = data.last_name;
    }

    if ("username" in data) {
      /**
       * User's or bot's username
       * @type {string | undefined}
       */
      this.username = data.username;
    }

    if ("language_code" in data) {
      /**
       * IETF language tag of the user's language
       * @type {string | undefined}
       */
      this.language = data.language_code;
    }

    /**
     * True, if this user is a Telegram Premium user
     * @type {boolean}
     */
    this.premium = Boolean(data.is_premium);

    /**
     * True, if this user added the bot to the attachment menu
     * @type {boolean}
     */
    this.inAttachmentMenu = Boolean(data.added_to_attachment_menu);

    return data;
  }

  /**
   * Fetches this user
   * @param {boolean} [force=true] - Whether to skip the cache check and request the API
   * @returns {Promise<User>}
   */
  fetch(force = false) {
    return this.client.users.fetch(this.id, { force });
  }

  /**
   * Refunds a successful payment in Telegram Stars.
   * @param {string} telegramPaymentId - Telegram payment identifier
   * @returns {Promise<true>} - Returns True on success.
   */
  refundStarPayment(telegramPaymentId) {
    return this.client.refundStarPayment(this.id, telegramPaymentId);
  }

  /**
   * Informs a user that some of the Telegram Passport elements they provided contains errors. The user will not be able to re-submit their Passport to you until the errors are fixed (the contents of the field for which you returned the error must change).
   * @param {readonly import("../../client/interfaces/Passport").PassportElementError[]} errors - An array describing the errors
   * @returns {Promise<true>} - Returns True on success.
   */
  setPassportErrors(errors) {
    return this.client.setPassportDataErrors(this.id, errors);
  }

  /**
   * Use this method to get a list of profile pictures for a user.
   * @param {number} [offset=0] - Sequential number of the first photo to be returned. By default, all photos are returned
   * @param {number} [limit=100] - Limits the number of photos to be retrieved. Values between 1-100 are accepted. Defaults to 100
   * @returns {Promise<import("./UserProfilePhotos").UserProfilePhotos>} - Returns a UserProfilePhotos object.
   */
  getProfilePhotos(offset = 0, limit = 100) {
    return this.client.getUserProfilePhotos({
      userId: this.id,
      limit,
      offset,
    });
  }

  /**
   * Return this user username, otherwise just an empty string
   * @override
   */
  toString() {
    return this.username ?? "";
  }
}

module.exports = { User };
