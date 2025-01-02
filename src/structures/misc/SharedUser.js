// @ts-check
const { Base } = require("../Base");
const { Photo } = require("../media/Photo");
const { isDeepStrictEqual } = require("../../util/Utils");

/**
 * @typedef {import("../../types").MethodParameters} MethodParameters
 */

class SharedUser extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").SharedUser} data - Data about the contains information about a user that was shared with the bot using a KeyboardButtonRequestUser button
   */
  constructor(client, data) {
    super(client);

    /** Identifier of the shared user. The bot may not have access to the user and could be unable to use this identifier, unless the user is already known to the bot by some other means. */
    this.userId = String(data.user_id);

    this._patch(data);
  }

  /**
   * @param {import("@telegram.ts/types").SharedUser} data - Data about the contains information about a user that was shared with the bot using a KeyboardButtonRequestUser button
   * @override
   */
  _patch(data) {
    if ("first_name" in data) {
      /**
       * First name of the user, if the name was requested by the bot
       * @type {string | undefined}
       */
      this.firstName = data.first_name;
    }

    if ("last_name" in data) {
      /**
       * Last name of the user, if the name was requested by the bot
       * @type {string | undefined}
       */
      this.lastName = data.last_name;
    }

    if ("username" in data) {
      /**
       * Username of the user, if the username was requested by the bot
       * @type {string | undefined}
       */
      this.username = data.username;
    }

    if ("photo" in data) {
      /**
       * Available sizes of the chat photo, if the photo was requested by the bot
       * @type {Photo[] | undefined}
       */
      this.photo = data.photo.map((photo) => new Photo(this.client, photo));
    }

    return data;
  }

  /**
   * Fetches this user
   * @param {Omit<import("../../managers/BaseManager").IFetchOptions, "cache">} [options] - options for fetch user
   * @returns {Promise<import("./User").User | import("../chat/ChatFullInfo").ChatFullInfo>}
   */
  fetch({ force = true, fullInfo = false } = {}) {
    return this.client.users.fetch(this.userId, { force, fullInfo });
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
        chatId: this.userId,
        ...text,
      });
    }
    return this.client.sendMessage({
      text,
      chatId: this.userId,
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
      userId: this.userId,
      ...options,
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
      userId: this.userId,
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
      userId: this.userId,
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
    return this.client.refundStarPayment(this.userId, telegramPaymentId);
  }

  /**
   * Informs a user that some of the Telegram Passport elements they provided contains errors. The user will not be able to re-submit their Passport to you until the errors are fixed (the contents of the field for which you returned the error must change).
   * @param {readonly import("../../client/interfaces/Passport").PassportElementError[]} errors - An array describing the errors
   * @returns {Promise<true>} - Returns True on success.
   */
  setPassportErrors(errors) {
    return this.client.setPassportDataErrors(this.userId, errors);
  }

  /**
   * Use this method to get a list of profile pictures for a user.
   * @param {number} [offset=0] - Sequential number of the first photo to be returned. By default, all photos are returned
   * @param {number} [limit=100] - Limits the number of photos to be retrieved. Values between 1-100 are accepted. Defaults to 100
   * @returns {Promise<import("./UserProfilePhotos").UserProfilePhotos>} - Returns a UserProfilePhotos object.
   */
  fetchProfilePhotos(offset = 0, limit = 100) {
    return this.client.getUserProfilePhotos({
      userId: this.userId,
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
    return this.client.getUserChatBoosts(chatId, this.userId);
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
      userId: this.userId,
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
    return this.client.verifyUser(this.userId, description);
  }

  /**
   * Removes verification from a user who is currently verified on behalf of the organization represented by the bot.
   * @returns {Promise<true>} - Returns True on success.
   */
  removeVerification() {
    return this.client.removeUserVerification(this.userId);
  }

  /**
   * Checks if this user is equal to another user.
   * @param {SharedUser} other - The other object to compare with.
   * @returns {boolean} True if both objects are instances of SharedUser and are equal based on key properties, otherwise false.
   */
  equals(other) {
    if (!other || !(other instanceof SharedUser)) return false;

    return (
      this.userId === other.userId &&
      this.firstName === other.firstName &&
      this.lastName === other.lastName &&
      this.username === other.username &&
      isDeepStrictEqual(this.photo, other.photo)
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

module.exports = { SharedUser };
