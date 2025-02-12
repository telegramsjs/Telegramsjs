// @ts-check
const { Base } = require("../Base");

/**
 * @typedef {import("../../types").MethodParameters} MethodParameters
 */

class BusinessConnection extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").BusinessConnection} data - Data about the connection of the bot with a business account
   */
  constructor(client, data) {
    super(client);

    /**
     * Unique identifier of the business connection
     * @type {string}
     */
    this.id = data.id;

    /**
     * Business account user that created the business connection
     * @type {import("../misc/User").User}
     */
    this.user = this.client.users._add(data.user);

    /**
     * Identifier of a private chat with the user who created the business connection
     * @type {string}
     */
    this.userChatId = String(data.user_chat_id);

    /**
     * Date the connection was established in Unix time
     * @type {number}
     */
    this.createdUnixTime = data.date;

    /**
     * True, if the bot can act on behalf of the business account in chats that were active in the last 24 hours
     * @type {boolean}
     */
    this.replyed = data.can_reply;

    /**
     * True, if the connection is active
     * @type {boolean}
     */
    this.enabled = data.is_enabled;
  }

  /**
   * Return the timestamp connection was established, in milliseconds
   */
  get createdTimestamp() {
    return this.createdUnixTime * 1000;
  }

  /**
   * Date the connection was established
   * @type {Date}
   */
  get createdAt() {
    return new Date(this.createdTimestamp);
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
        chatId: this.userChatId,
        ...text,
      });
    }
    return this.client.sendMessage({
      text,
      chatId: this.userChatId,
      ...options,
    });
  }

  /**
   * Sends a gift to the given user or channel chat. The gift can't be converted to Telegram Stars by the receive.
   * @param {string} giftId - Identifier of the gift.
   * @param {Omit<MethodParameters["sendGift"], "giftId" | "userId">} [options] - out parameters.
   * @returns {Promise<true>} - Returns True on success.
   */
  sendGift(giftId, options = {}) {
    return this.client.sendGift({
      giftId,
      userId: this.userChatId,
      ...options,
    });
  }

  /**
   * Stores a message that can be sent by a user of a Mini App.
   * @param {import("../../client/interfaces/Inline").InlineQueryResult} result - An object describing the message to be sent.
   * @param {Omit<MethodParameters["savePreparedInlineMessage"], "userId" | "result">} [options] - out parameters.
   * @returns {Promise<import("../misc/PreparedInlineMessage").PreparedInlineMessage>} - Returns a PreparedInlineMessage object.
   */
  saveInlineMessage(result, options = {}) {
    return this.client.savePreparedInlineMessage({
      result,
      userId: this.userChatId,
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
      userId: this.userChatId,
      telegramPaymentChargeId,
      isCanceled,
    });
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
      userId: this.userChatId,
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
    return this.client.verifyUser(this.userChatId, description);
  }

  /**
   * Removes verification from a user who is currently verified on behalf of the organization represented by the bot.
   * @returns {Promise<true>} - Returns True on success.
   */
  removeVerification() {
    return this.client.removeUserVerification(this.userChatId);
  }
}

module.exports = { BusinessConnection };
