// @ts-check
const { Base } = require("../Base");
const {
  BusinessPermissions,
} = require("../../util/permission/BusinessPermissions");

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

    if (data.rights) {
      /** @type {any} */
      const permissions = {};

      if ("can_reply" in data.rights) {
        permissions.canReply = data.rights.can_reply;
      }

      if ("can_read_messages" in data.rights) {
        permissions.readMessages = data.rights.can_read_messages;
      }

      if ("can_delete_outgoing_messages" in data.rights) {
        permissions.deleteOutgoingMessages =
          data.rights.can_delete_outgoing_messages;
      }

      if ("can_delete_all_messages" in data.rights) {
        permissions.deleteAllMessages = data.rights.can_delete_all_messages;
      }

      if ("can_edit_name" in data.rights) {
        permissions.editName = data.rights.can_edit_name;
      }

      if ("can_edit_bio" in data.rights) {
        permissions.editBio = data.rights.can_edit_bio;
      }

      if ("can_edit_profile_photo" in data.rights) {
        permissions.editProfilePhoto = data.rights.can_edit_profile_photo;
      }

      if ("can_edit_username" in data.rights) {
        permissions.editUsername = data.rights.can_edit_username;
      }

      if ("can_change_gift_settings" in data.rights) {
        permissions.changeGiftSettings = data.rights.can_change_gift_settings;
      }

      if ("can_view_gifts_and_stars" in data.rights) {
        permissions.viewGiftsAndStars = data.rights.can_view_gifts_and_stars;
      }

      if ("can_convert_gifts_to_stars" in data.rights) {
        permissions.convertGiftsToStars =
          data.rights.can_convert_gifts_to_stars;
      }

      if ("can_transfer_and_upgrade_gifts" in data.rights) {
        permissions.transferAndUpgradeGifts =
          data.rights.can_transfer_and_upgrade_gifts;
      }

      if ("can_transfer_stars" in data.rights) {
        permissions.transferStars = data.rights.can_transfer_stars;
      }

      if ("can_manage_stories" in data.rights) {
        permissions.manageStories = data.rights.can_manage_stories;
      }

      /** Permissions of the business bot */
      this.permissions = new BusinessPermissions(permissions);
    }

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
   * Marks incoming message as read on behalf of a business account. Requires the can_read_messages business bot right.
   * @param {string | number} messageId - Unique identifier of the message to mark as read.
   * @param {string | number} [chatId] - Unique identifier of the chat in which the message was received. The chat must have been active in the last 24 hours.
   * @returns {Promise<true>} - Returns True on success.
   */
  readMessage(messageId, chatId = this.user.id) {
    return this.client.readBusinessMessage({
      businessConnectionId: this.id,
      messageId,
      chatId,
    });
  }

  /**
   * Posts a story on behalf of a managed business account. Requires the can_manage_stories business bot right.
   * @param {import("@telegram.ts/types").InputStoryContent} content - Content of the story.
   * @param {number} activePeriod - Period after which the story is moved to the archive, in seconds; must be one of 6 * 3600, 12 * 3600, 86400, or 2 * 86400.
   * @param {Omit<MethodParameters["postStory"], "businessConnectionId" | "content" | "activePeriod">} [options={}] - out parameters.
   * @returns {Promise<import("../story/Story").Story>} - Returns Story on success.
   */
  postStory(content, activePeriod, options = {}) {
    return this.client.postStory({
      ...options,
      businessConnectionId: this.id,
      content,
      activePeriod,
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
      userId: this.userChatId,
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
   * Changes the first and last name of a managed business account. Requires the can_change_name business bot right. Returns True on success.
   * @param {string} firstName - The new value of the first name for the business account; 1-64 characters.
   * @param {string} [lastName] - The new value of the last name for the business account; 0-64 characters.
   * @returns {Promise<true>} - Returns True on success.
   */
  setAccountName(firstName, lastName) {
    return this.client.setBusinessAccountName({
      businessConnectionId: this.id,
      firstName,
      ...(lastName && { lastName }),
    });
  }

  /**
   * Changes the username of a managed business account. Requires the can_change_username business bot right. Returns True on success.
   * @param {string} [username] - The new value of the username for the business account; 0-32 characters.
   * @returns {Promise<true>} - Returns True on success.
   */
  setAccountUsername(username) {
    return this.client.setBusinessAccountUsername(this.id, username);
  }

  /**
   * Changes the bio of a managed business account. Requires the can_change_bio business bot right.
   * @param {string} [bio] - The new value of the bio for the business account; 0-140 characters.
   * @returns {Promise<true>} - Returns True on success.
   */
  setAccountBio(bio) {
    return this.client.setBusinessAccountBio(this.id, bio);
  }

  /**
   * Changes the profile photo of a managed business account. Requires the can_edit_profile_photo business bot right.
   * @param {MethodParameters["setBusinessAccountProfilePhoto"]["photo"]} photo - The new profile photo to set.
   * @param {boolean} [isPublic] - Pass True to set the public photo, which will be visible even if the main photo is hidden by the business account's privacy settings. An account can have only one public photo.
   * @returns {Promise<true>} - Returns True on success.
   */
  setAccountProfilePhoto(photo, isPublic) {
    return this.client.setBusinessAccountProfilePhoto({
      businessConnectionId: this.id,
      photo,
      ...(typeof isPublic !== "undefined" && { isPublic }),
    });
  }

  /**
   * Removes the current profile photo of a managed business account. Requires the can_edit_profile_photo business bot right.
   * @param {boolean} [isPublic] - Pass True to remove the public photo, which is visible even if the main photo is hidden by the business account's privacy settings. After the main photo is removed, the previous profile photo (if present) becomes the main photo.
   * @returns {Promise<true>} - Returns True on success.
   */
  deleteAccountProfilePhoto(isPublic) {
    return this.client.removeBusinessAccountProfilePhoto(this.id, isPublic);
  }

  /**
   * Changes the privacy settings pertaining to incoming gifts in a managed business account. Requires the can_change_gift_settings business bot right.
   * @param {boolean} showGiftButton - Pass True, if a button for sending a gift to the user or by the business account must always be shown in the input field.
   * @param {MethodParameters["setBusinessAccountGiftSettings"]["acceptedGiftTypes"]} acceptedGiftTypes - Types of gifts accepted by the business account
   *  Returns True on success.
   */
  setAccountGiftSettings(showGiftButton, acceptedGiftTypes) {
    return this.client.setBusinessAccountGiftSettings({
      businessConnectionId: this.id,
      showGiftButton,
      acceptedGiftTypes,
    });
  }

  /**
   * Returns the amount of Telegram Stars owned by a managed business account. Requires the can_view_gifts_and_stars business bot right.
   * @returns {Promise<import("../misc/StarAmount").StarAmount>} - Returns StarAmount on success.
   */
  fetchAccountStarBalance() {
    return this.client.getBusinessAccountStarBalance(this.id);
  }

  /**
   * Returns the gifts received and owned by a managed business account. Requires the can_view_gifts_and_stars business bot right.
   * @param {Omit<MethodParameters["getBusinessAccountGifts"], "businessConnectionId">} [options={}] - out parameters.
   * @returns {Promise<import("../gift/OwnedGifts").OwnedGifts>} - Returns OwnedGifts on success.
   */
  fetchAccountGifts(options = {}) {
    return this.client.getBusinessAccountGifts({
      ...options,
      businessConnectionId: this.id,
    });
  }

  /**
   * Converts a given regular gift to Telegram Stars. Requires the can_convert_gifts_to_stars business bot right.
   * @param {string} ownedGiftId - Unique identifier of the regular gift that should be converted to Telegram Stars.
   * @returns {Promise<true>} - Returns True on success.
   */
  convertGiftsToStars(ownedGiftId) {
    return this.client.convertGiftToStars(this.id, ownedGiftId);
  }

  /**
   * Upgrades a given regular gift to a unique gift. Requires the can_transfer_and_upgrade_gifts business bot right. Additionally requires the can_transfer_stars business bot right if the upgrade is paid.
   * @param {string} ownedGiftId - Unique identifier of the regular gift that should be upgraded to a unique one.
   * @param {Omit<MethodParameters["upgradeGift"], "businessConnectionId" | "ownedGiftId">} [options={}] - out parameters.
   * @returns {Promise<true>} - Returns True on success.
   */
  upgradeGift(ownedGiftId, options = {}) {
    return this.client.upgradeGift({
      ...options,
      ownedGiftId,
      businessConnectionId: this.id,
    });
  }

  /**
   * Transfers an owned unique gift to another user. Requires the can_transfer_and_upgrade_gifts business bot right. Requires can_transfer_stars business bot right if the transfer is paid.
   * @param {Omit<MethodParameters["transferGift"], "businessConnectionId">} options - out parameters.
   * @returns {Promise<true>} - Returns True on success.
   */
  transferGift(options) {
    return this.client.transferGift({
      ...options,
      businessConnectionId: this.id,
    });
  }

  /**
   * Transfers Telegram Stars from the business account balance to the bot's balance. Requires the can_transfer_stars business bot right.
   * @param {number} starCount - Number of Telegram Stars to transfer; 1-10000.
   * @returns {Promise<true>} - Returns True on success.
   */
  transferAccountStars(starCount) {
    return this.client.transferBusinessAccountStars(this.id, starCount);
  }

  /**
   * Delete messages on behalf of a business account. Requires the can_delete_outgoing_messages business bot right to delete messages sent by the bot itself, or the can_delete_all_messages business bot right to delete any message.
   * @param {(string | number)[]} messageIds - A list of 1-100 identifiers of messages to delete. All messages must be from the same chat. See deleteMessage for limitations on which messages can be deleted.
   * @returns {Promise<true>} - Returns True on success.
   */
  deleteMessages(messageIds) {
    return this.client.deleteBusinessMessages(this.id, messageIds);
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
