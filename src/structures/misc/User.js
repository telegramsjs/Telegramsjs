// @ts-check
const { Base } = require("../Base");

/**
 * @typedef {import("../../client/interfaces/Language").LanguageCode} LanguageCode
 */

/**
 * @typedef {import("../../types").MethodParameters} MethodParameters
 */

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
    this.isBot = Boolean(
      data.id == ("user" in client ? client.user?.id : 0) ? true : data.is_bot,
    );

    this._patch(data);
  }

  /**
   * @param {import("@telegram.ts/types").User | import("@telegram.ts/types").UserFromGetMe} data - represents a Telegram user or bot
   * @override
   */
  _patch(data) {
    /** User's or bot's first name */
    this.firstName = data.first_name;

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
       * @type {LanguageCode | undefined}
       */
      this.language = data.language_code;
    }

    /**
     * True, if this user is a Telegram Premium user
     * @type {boolean}
     */
    this.isPremium = Boolean(data.is_premium);

    /**
     * True, if this user added the bot to the attachment menu
     * @type {boolean}
     */
    this.inAttachmentMenu = Boolean(data.added_to_attachment_menu);

    return data;
  }

  /**
   * Fetches this user
   * @param {Omit<import("../../managers/BaseManager").IFetchOptions, "cache">} [options] - options for fetch user
   * @returns {Promise<User | import("../chat/ChatFullInfo").ChatFullInfo>}
   */
  fetch({ force = true, fullInfo = false } = {}) {
    return this.client.users.fetch(this.id, { force, fullInfo });
  }

  /**
   * Use this method to send text messages.
   * @param {string | Omit<MethodParameters["sendMediaGroup"], "chatId">} text - Text of the message to be sent, 1-4096 characters after entities parsing
   * @param {Omit<MethodParameters["sendMessage"], "text" | "chatId">} [options={}] - out parameters
   * @returns {Promise<import("../message/Message").Message & { content: string } | Array<import("../message/Message").Message & { audio: import("../media/Audio").Audio; } | import("../message/Message").Message & { document: import("../media/Document").Document; } | import("../message/Message").Message & { photo: import("../media/Photo").Photo; } | import("../message/Message").Message & { video: import("../media/Video").Video}>>} - On success, the sent Message is returned.
   */
  send(text, options = {}) {
    if (typeof text === "object") {
      return this.client.sendMediaGroup({
        chatId: this.id,
        ...text,
      });
    }
    return this.client.sendMessage({
      text,
      chatId: this.id,
      ...options,
    });
  }

  /**
   * Sends a gift to the given user. The gift can't be converted to Telegram Stars by the user.
   * @param {string} giftId - Identifier of the gift.
   * @param {Omit<MethodParameters["sendGift"], "giftId" | "userId">} [options] - out parameters.
   * @returns {Promise<true>} - Returns True on success.
   */
  sendGift(giftId, options = {}) {
    return this.client.sendGift({
      giftId,
      userId: this.id,
      ...options,
    });
  }

  /**
   * Gifts a Telegram Premium subscription to the given user.
   * @param {3 | 6 | 12} monthCount - Number of months the Telegram Premium subscription will be active for the user; must be one of 3, 6, or 12.
   * @param {1000 | 1500 | 2500} starCount - Number of Telegram Stars to pay for the Telegram Premium subscription; must be 1000 for 3 months, 1500 for 6 months, and 2500 for 12 months.
   * @param {Omit<MethodParameters["giftPremiumSubscription"], "monthCount" | "starCount" | "userId">} [options={}] - out parameters.
   * @returns {Promise<true>} - Returns True on success.
   */
  giftPremiumSubscription(monthCount, starCount, options = {}) {
    return this.client.giftPremiumSubscription({
      ...options,
      monthCount,
      starCount,
      userId: this.id,
    });
  }

  /**
   * Stores a message that can be sent by a user of a Mini App.
   * @param {import("../../client/interfaces/Inline").InlineQueryResult} result - An object describing the message to be sent.
   * @param {Omit<MethodParameters["savePreparedInlineMessage"], "userId" | "result">} [options] - out parameters.
   * @returns {Promise<import("./PreparedInlineMessage").PreparedInlineMessage>} - Returns a PreparedInlineMessage object.
   */
  saveInlineMessage(result, options = {}) {
    return this.client.savePreparedInlineMessage({
      result,
      userId: this.id,
      ...options,
    });
  }

  /**
   * Allows the bot to cancel or re-enable extension of a subscription paid in Telegram Stars.
   * @param {string} telegramPaymentChargeId - Telegram payment identifier for the subscription.
   * @param {boolean} isCanceled - Pass True to cancel extension of the user subscription; the subscription must be active up to the end of the current subscription period. Pass False to allow the user to re-enable a subscription that was previously canceled by the bot.
   * @returns {Promise<true>} - Returns True on success.
   */
  setStarSubscription(telegramPaymentChargeId, isCanceled) {
    return this.client.editUserStarSubscription({
      userId: this.id,
      telegramPaymentChargeId,
      isCanceled,
    });
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
  fetchProfilePhotos(offset = 0, limit = 100) {
    return this.client.getUserProfilePhotos({
      userId: this.id,
      limit,
      offset,
    });
  }

  /**
   * Use this method to get the list of boosts added to a chat by a user. Requires administrator rights in the chat.
   * @param {string | number} chatId - Unique identifier for the chat or username of the channel (in the format @channelusername).
   * @returns {Promise<import("../boost/UserChatBoosts").UserChatBoosts>} - Returns a UserChatBoosts object.
   */
  fetchChatBoosts(chatId) {
    return this.client.getUserChatBoosts(chatId, this.id);
  }

  /**
   * @typedef {Object} EmojiStatus
   * @property {string} [emojiStatusCustomEmojiId] - Custom emoji identifier of the emoji status to set. Pass an empty string to remove the status.
   * @property {number} [emojiStatusExpirationDate] - Expiration date of the emoji status, if any.
   */

  /** Changes the emoji status for a given user that previously allowed the bot to manage their emoji status via the Mini App method requestEmojiStatusAccess.
   * @param {EmojiStatus} [options] - out parameters.
   * @returns {Promise<true>} - Returns True on success.
   */
  setEmojiStatus({ emojiStatusCustomEmojiId, emojiStatusExpirationDate } = {}) {
    return this.client.setUserEmojiStatus({
      userId: this.id,
      ...(emojiStatusCustomEmojiId && { emojiStatusCustomEmojiId }),
      ...(emojiStatusExpirationDate && { emojiStatusExpirationDate }),
    });
  }

  /**
   * Verifies a user on behalf of the organization which is represented by the bot.
   * @param {string} [description] - Custom description for the verification; 0-70 characters. Must be empty if the organization isn't allowed to provide a custom verification description.
   * @returns {Promise<true>} - Returns True on success.
   */
  verify(description) {
    return this.client.verifyUser(this.id, description);
  }

  /**
   * Removes verification from a user who is currently verified on behalf of the organization represented by the bot.
   * @returns {Promise<true>} - Returns True on success.
   */
  removeVerification() {
    return this.client.removeUserVerification(this.id);
  }

  /**
   * Checks if this user is equal to another user.
   * @param {User | import("./ClientUser").ClientUser} other - The other object to compare with.
   * @returns {boolean} True if both objects are instances of User and are equal based on key properties, otherwise false.
   */
  equals(other) {
    if (!other || !(other instanceof User)) return false;

    return (
      this.id === other.id &&
      this.isBot === other.isBot &&
      this.firstName === other.firstName &&
      this.lastName === other.lastName &&
      this.username === other.username &&
      this.language === other.language &&
      this.isPremium === other.isPremium &&
      this.inAttachmentMenu === other.inAttachmentMenu
    );
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
