// @ts-check
const { Base } = require("../Base");
const { MessageCollector } = require("../../util/collector/MessageCollector");
const { ReactionCollector } = require("../../util/collector/ReactionCollector");
const {
  InlineKeyboardCollector,
} = require("../../util/collector/InlineKeyboardCollector");
const {
  CollectorEvents,
  ReactionCollectorEvents,
} = require("../../util/Constants");
const { UserPermissions } = require("../../util/permission/UserPermissions");
const { TelegramError } = require("../../errors/TelegramError");
const { ErrorCodes } = require("../../errors/ErrorCodes");

/**
 * @typedef {import("node:fs").ReadStream} ReadStream
 */

/**
 * @typedef {import("../../types").MethodParameters} MethodParameters
 */

class Chat extends Base {
  /** @type {import("@telegram.ts/types").Chat["type"]} */
  #chatType;

  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").Chat & { threadId?: string; inTopic?: boolean }} data - Data about the represents a chat
   */
  constructor(client, data) {
    super(client);

    /** Unique identifier for this chat */
    this.id = String(data.id);

    this.#chatType = data.type;

    this._patch(data);
  }

  /**
   * @param {import("@telegram.ts/types").Chat & { threadId?: string; inTopic?: boolean }} data - Data about the represents a chat
   * @override
   */
  _patch(data) {
    if ("title" in data) {
      /**
       * Title, for supergroups, channels and group chats
       * @type {string | undefined}
       */
      this.title = data.title;
    }

    if ("username" in data) {
      /**
       * Username, for private chats, supergroups and channels if available
       * @type {string | undefined}
       */
      this.username = data.username;
    }

    if ("first_name" in data) {
      /**
       * First name of the other party in a private chat
       * @type {string | undefined}
       */
      this.firstName = data.first_name;
    }

    if ("last_name" in data) {
      /**
       * Last name of the other party in a private chat
       * @type {string | undefined}
       */
      this.lastName = data.last_name;
    }

    if ("is_forum" in data) {
      /**
       * True, if the supergroup chat is a forum (has topics enabled)
       * @type {boolean | undefined}
       */
      this.forum = data.is_forum;
      if ("threadId" in data && data.threadId) {
        /**
         * Unique identifier of a message thread or forum topic to which the message belongs; for supergroups and private chats only
         * @type {string | undefined}
         */
        this.threadId = data.threadId;
      }

      if ("inTopic" in data) {
        /**
         * True, if the message is sent to a topic in a forum supergroup or a private chat with the bot
         * @type {boolean | undefined}
         */
        this.inTopic = data.inTopic;
      }

      /**
       * True, if the chat is the direct messages chat of a channel
       * @type {boolean}
       */
      this.isDirectMessage = Boolean(data.is_direct_messages);
    }

    return data;
  }

  /**
   * @returns {this is this & {  title: string;  username?: string;  firstName?: undefined;  lastName?: undefined;  forum?: undefined;  threadId?: undefined; inTopic?: undefined; isDirectMessage: false }}
   */
  isChannel() {
    return this.#chatType === "channel";
  }

  /**
   * @returns {this is this & {  title: string;  username?: string;  firstName?: undefined;  lastName?: undefined;  forum?: true;  threadId?: string; inTopic?: boolean; isDirectMessage: false }}
   */
  isSupergroup() {
    return this.#chatType === "supergroup";
  }

  /**
   * @returns {this is this & {  title: string;  username?: undefined;  firstName?: undefined;  lastName?: undefined;  forum?: undefined;  threadId?: undefined; inTopic?: undefined; isDirectMessage: boolean }}
   */
  isGroup() {
    return this.#chatType === "group";
  }

  /**
   * @returns {this is this & {  title?: undefined;  username?: string;  firstName: string;  lastName?: string;  forum?: undefined;  threadId?: undefined; inTopic?: undefined; isDirectMessage: false }}
   */
  isPrivate() {
    return this.#chatType === "private";
  }

  /**
   * @returns {Promise<import("./ChatMember").ChatMember>}
   */
  me() {
    if (!this.client.user) {
      throw new TelegramError(ErrorCodes.InvalidClientId);
    }
    return this.client.getChatMember(this.id, this.client.user.id);
  }

  /**
   * Fetches this chat
   * @param {Omit<import("../../managers/BaseManager").IFetchOptions, "cache">} [options] - options for fetch chat
   * @returns {Promise<Chat | import("./ChatFullInfo").ChatFullInfo>}
   */
  fetch({ force = true, fullInfo = false } = {}) {
    return this.client.chats.fetch(this.id, { force, fullInfo });
  }

  /**
   * Retrieves the permissions of a specific member in the chat.
   * @param {import("./ChatMember").ChatMember|string} member - The member object to check permissions for.
   * @param {boolean} [checkAdmin] - A flag to check if the member is an admin or creator.
   * @returns {Promise<UserPermissions|null>} The permissions object of the member or null if not available.
   */
  async memberPermissions(member, checkAdmin) {
    if (this.isPrivate()) return null;

    if (
      checkAdmin &&
      typeof member !== "string" &&
      member.status === "creator"
    ) {
      const permissions = Object.fromEntries(
        Object.entries(UserPermissions.Flags).map(([key]) => [key, true]),
      );
      return new UserPermissions(permissions);
    }

    const memberId = typeof member === "string" ? member : member.id;
    if (!memberId) return null;

    const fetchMember = await this.client
      .getChatMember(this.id, memberId)
      .catch(() => null);

    if (fetchMember && fetchMember.permissions) {
      if (Object.keys(fetchMember.permissions).length === 0) {
        return this.memberPermissions(fetchMember, checkAdmin);
      }
      return fetchMember.permissions;
    }

    return null;
  }

  /**
   * @param {import("../../util/collector/Collector").ICollectorOptions<string, import("../message/Message").Message>} [options={}] - message collector options
   * @returns {import("../../util/collector/MessageCollector").MessageCollector}
   */
  createMessageCollector(options = {}) {
    return new MessageCollector(this.client, this, options);
  }

  /**
   * @param {import("../../util/collector/Collector").ICollectorOptions<string, import("../message/Message").Message> & { errors?: string[] }} [options={}] - message collector options
   * @returns {Promise<import("@telegram.ts/collection").Collection<string, import("../message/Message").Message>>}
   */
  awaitMessages(options = {}) {
    return new Promise((resolve, reject) => {
      const collector = this.createMessageCollector(options);
      collector.once(CollectorEvents.End, (collection, reason) => {
        if (options.errors?.includes(reason)) {
          reject(collection);
        } else {
          resolve(collection);
        }
      });
    });
  }

  /**
   * @param {import("../../util/collector/Collector").ICollectorOptions<string, import("../MessageReactionUpdated").MessageReactionUpdated>} [options={}] - reaction collector options
   * @returns {import("../../util/collector/ReactionCollector").ReactionCollector}
   */
  createReactionCollector(options = {}) {
    return new ReactionCollector(this.client, this, options);
  }

  /**
   * @param {import("../../util/collector/Collector").ICollectorOptions<string, import("../MessageReactionUpdated").MessageReactionUpdated> & { errors?: string[] }} [options={}] - reaction collector options
   * @returns {Promise<import("@telegram.ts/collection").Collection<string, import("../MessageReactionUpdated").MessageReactionUpdated>>}
   */
  awaitReactions(options = {}) {
    return new Promise((resolve, reject) => {
      const collect = this.createReactionCollector(options);
      collect.on(ReactionCollectorEvents.End, (collections, reason) => {
        if (options.errors?.includes(reason)) {
          reject(collections);
        } else {
          resolve(collections);
        }
      });
    });
  }

  /**
   * @param {import("../../util/collector/Collector").ICollectorOptions<string, import("../CallbackQuery").CallbackQuery>} [options={}] - inline keyboard collector options
   * @returns {InlineKeyboardCollector}
   */
  createMessageComponentCollector(options = {}) {
    return new InlineKeyboardCollector(this.client, options);
  }

  /**
   * Use this method to send text messages.
   * @param {string | Omit<MethodParameters["sendMediaGroup"], "chatId" | "messageThreadId">} text - Text of the message to be sent, 1-4096 characters after entities parsing
   * @param {Omit<MethodParameters["sendMessage"], "text" | "chatId">} [options={}] - out parameters
   * @returns {Promise<import("../message/Message").Message & { content: string } | Array<import("../message/Message").Message & { audio: import("../media/Audio").Audio; } | import("../message/Message").Message & { document: import("../media/Document").Document; } | import("../message/Message").Message & { photo: import("../media/Photo").Photo; } | import("../message/Message").Message & { video: import("../media/Video").Video}>>} - On success, the sent Message is returned.
   */
  send(text, options = {}) {
    if (typeof text === "object") {
      return this.client.sendMediaGroup({
        chatId: this.id,
        ...(this.threadId &&
          this.inTopic && { messageThreadId: this.threadId }),
        ...text,
      });
    }
    return this.client.sendMessage({
      text,
      chatId: this.id,
      ...(this.threadId && this.inTopic && { messageThreadId: this.threadId }),
      ...options,
    });
  }

  /**
   * Verifies a chat on behalf of the organization which is represented by the bot.
   * @param {string} [description] - Custom description for the verification; 0-70 characters. Must be empty if the organization isn't allowed to provide a custom verification description.
   * @returns {Promise<true>} - Returns True on success.
   */
  verify(description) {
    return this.client.verifyChat(this.id, description);
  }

  /**
   * Removes verification from a chat that is currently verified on behalf of the organization represented by the bot. Returns True on success.
   * @returns {Promise<true>} - Returns True on success.
   */
  removeVerification() {
    return this.client.removeChatVerification(this.id);
  }

  /**
   * Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   * @param {string | number} userId - Unique identifier of the target user
   * @param {Omit<MethodParameters["banChatMember"], "userId" | "chatId">} [options={}]
   * @returns {Promise<true>} - Returns True on success.
   */
  ban(userId, options = {}) {
    return this.client.banChatMember({
      userId,
      chatId: this.id,
      ...options,
    });
  }

  /**
   * Use this method to unban a previously banned user in a supergroup or channel. The user will not return to the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator for this to work. By default, this method guarantees that after the call the user is not a member of the chat, but will be able to join it. So if the user is a member of the chat they will also be removed from the chat. If you don't want this, use the parameter only_if_banned.
   * @param {string | number} userId - Unique identifier of the target user
   * @param {boolean} [onlyIfBanned] - Do nothing if the user is not banned
   * @returns {Promise<true>} - Returns True on success.
   */
  unban(userId, onlyIfBanned) {
    return this.client.banChatMember({
      userId,
      chatId: this.id,
      ...(onlyIfBanned && { onlyIfBanned }),
    });
  }

  /**
   * Use this method to ban a channel chat in a supergroup or a channel. Until the chat is unbanned, the owner of the banned chat won't be able to send messages on behalf of any of their channels. The bot must be an administrator in the supergroup or channel for this to work and must have the appropriate administrator rights.
   * @param {string | number} senderChatId - Unique identifier of the target sender chat
   * @returns {Promise<true>} - Returns True on success.
   */
  banSenderChat(senderChatId) {
    return this.client.banChatSenderChat(this.id, senderChatId);
  }

  /**
   * Use this method to unban a previously banned channel chat in a supergroup or channel. The bot must be an administrator for this to work and must have the appropriate administrator rights.
   * @param {string | number} senderChatId - Unique identifier of the target sender chat
   * @returns {Promise<true>} - Returns True on success.
   */
  unbanSenderChat(senderChatId) {
    return this.client.unbanChatSenderChat(this.id, senderChatId);
  }

  /**
   * Use this method for your bot to leave this group, supergroup or channel.
   * @returns {Promise<true>} - Returns True on success.
   */
  leave() {
    return this.client.leaveChat(this.id);
  }

  /**
   * Use this method to get a list of administrators in a chat, which aren't bots.
   * @returns {Promise<import("./ChatAdministratorRights").ChatAdministratorRights[]>} - Returns an Array of ChatAdministratorRights objects.
   */
  fetchAdmins() {
    return this.client.getChatAdministrators(this.id);
  }

  /**
   * Use this method to get the number of members in a chat.
   * @returns {Promise<number>} - Returns Int on success.
   */
  membersCount() {
    return this.client.getChatMemberCount(this.id);
  }

  /**
   * Use this method to get the list of boosts added to a chat by a user. Requires administrator rights in the chat.
   * @param {string | number} userId - Unique identifier of the target user.
   * @returns {Promise<import("../boost/UserChatBoosts").UserChatBoosts>} - Returns a UserChatBoosts object.
   */
  fetchUserBoosts(userId) {
    return this.client.getUserChatBoosts(this.id, userId);
  }

  /**
   * Returns the gifts owned and hosted by a chat.
   * @param {Omit<MethodParameters["getChatGifts"], "chatId">} [options={}] - out parameters.
   * @returns {Promise<import("../gift/OwnedGifts").OwnedGifts>} - Returns OwnedGifts on success.
   */
  fetchChatGifts(options = {}) {
    return this.client.getChatGifts({
      chatId: this.id,
      ...options,
    });
  }

  /**
   * Use this method to set a new group sticker set for a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set ly returned in getChat requests to check if the bot can use this method
   * @param {string} name - Name of the sticker set to be set as the group sticker set.
   * @returns {Promise<true>} - Returns True on success.
   */
  setStickerSet(name) {
    return this.client.setChatStickerSet(this.id, name);
  }

  /**
   * Use this method to delete a group sticker set from a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set ly returned in getChat requests to check if the bot can use this method.
   * @returns {Promise<true>} - Returns True on success.
   */
  deleteStickerSet() {
    return this.client.deleteChatStickerSet(this.id);
  }

  /**
   * Use this method to forward multiple messages of any kind. If some of the specified messages can't be found or forwarded, they are skipped. Service messages and messages with protected content can't be forwarded. Album grouping is kept for forwarded messages.
   * @param {(number | string)[]} messageIds - A list of 1-100 identifiers of messages in the chat fromChatId to forward. The identifiers must be specified in a strictly increasing order
   * @param {number | string} chatId - Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param {Omit<MethodParameters["forwardMessages"], "chatId" | "fromChatId" | "messageIds">} [options={}] - out parameters
   * @returns {Promise<number[]>} - On success, an array of MessageId of the sent messages is returned.
   */
  forwardMessages(messageIds, chatId, options = {}) {
    return this.client.forwardMessages({
      chatId,
      fromChatId: this.id,
      messageIds,
      ...options,
    });
  }

  /**
   * Use this method to copy messages of any kind. If some of the specified messages can't be found or copied, they are skipped. Service messages, paid media messages, giveaway messages, giveaway winners messages,  and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correctOptionId is known to the bot. The method is analogous to the method forwardMessages, but the copied messages don't have a link to the original message. Album grouping is kept for copied messages.
   * @param {(number | string)[]} messageIds - A list of 1-100 identifiers of messages in the chat fromChatId to copy. The identifiers must be specified in a strictly increasing order
   * @param {number | string} chatId - Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param {Omit<MethodParameters["copyMessages"], "chatId" | "fromChatId" | "messageIds">} [options={}] - out parameters
   * @returns {Promise<number[]>} - On success, an array of MessageId of the sent messages is returned.
   */
  copyMessages(messageIds, chatId, options = {}) {
    return this.client.copyMessages({
      chatId,
      fromChatId: this.id,
      messageIds,
      ...options,
    });
  }

  /**
   * Use this method to delete a message, including service messages, with the following limitations:
  - A message can only be deleted if it was sent less than 48 hours ago.
  - Service messages about a supergroup, channel, or forum topic creation can't be deleted.
  - A dice message in a private chat can only be deleted if it was sent more than 24 hours ago.
  - Bots can delete outgoing messages in private chats, groups, and supergroups.
  - Bots can delete incoming messages in private chats.
  - Bots granted can_post_messages permissions can delete outgoing messages in channels.
  - If the bot is an administrator of a group, it can delete any message there.
  - If the bot has can_delete_messages permission in a supergroup or a channel, it can delete any message there.
   * @param {number | string} id - Identifier of the message to delete 
   * @returns {Promise<true>} - Returns True on success.
   */
  deleteMessage(id) {
    return this.client.deleteMessage(this.id, id);
  }

  /**
   * Use this method to approve a suggested post in a direct messages chat. The bot must have the 'can_post_messages' administrator right in the corresponding channel chat.
   * @param {number | string} id - Unique identifier for the target direct messages chat.
   * @param {number} [sendDate] - Point in time (Unix timestamp) when the post is expected to be published; omit if the date has already been specified when the suggested post was created. If specified, then the date must be not more than 2678400 seconds (30 days) in the future.
   * @retutns {Promise<true>} - Returns True on success.
   */
  approveSuggestedPost(id, sendDate) {
    return this.client.approveSuggestedPost({
      messageId: id,
      chatId: this.id,
      ...(sendDate && { sendDate }),
    });
  }

  /**
   * Use this method to decline a suggested post in a direct messages chat. The bot must have the 'can_manage_direct_messages' administrator right in the corresponding channel chat.
   * @param {number | string} id - Identifier of a suggested post message to decline.
   * @param {string} [comment] - Comment for the creator of the suggested post; 0-128 characters.
   * @returns {Promise<true>} - Returns True on success.
   */
  declineSuggestedPost(id, comment) {
    return this.client.declineSuggestedPost({
      messageId: id,
      chatId: this.id,
      ...(comment && { comment }),
    });
  }

  /**
   * Use this method to delete multiple messages simultaneously.
   * @param {(number | string)[]} ids - A list of 1-100 identifiers of messages to delete. See deleteMessage for limitations on which messages can be deleted
   * @returns {Promise<true>} - Returns True on success.
   */
  deleteMessages(ids) {
    return this.client.deleteMessages(this.id, ids);
  }

  /**
   * Use this method to change the bot's menu button in a private chat, or the default menu button.
   * @param {import("../../client/interfaces/Bot").MenuButton} [menuButton] - An object for the bot's new menu button. Defaults to MenuButtonDefault
   * @returns {Promise<true>} - Returns True on success.
   */
  setMenuButton(menuButton) {
    return this.client.setChatMenuButton(this.id, menuButton);
  }

  /**
   * Use this method to create a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights.
   * @param {string} name - Topic name, 1-128 characters
   * @param {Omit<MethodParameters["createForumTopic"], "name" | "chatId">} [options={}] - out parameters
   * @returns {Promise<import("../forum/ForumTopic").ForumTopic>} - Returns information about the created topic as a ForumTopic object.
   */
  createForumTopic(name, options = {}) {
    return this.client.createForumTopic({
      name,
      chatId: this.id,
      ...options,
    });
  }

  /**
   * Use this method to edit the name of the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have can_manage_topics administrator rights.
   * @param {string} name - New topic name, 1-128 characters
   * @returns {Promise<true>} - Returns True on success.
   */
  editGeneralForumTopic(name) {
    return this.client.editGeneralForumTopic(this.id, name);
  }

  /**
   * Use this method to close an open 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights.
   * @returns {Promise<true>} - Returns True on success.
   */
  closeGeneralForumTopic() {
    return this.client.closeGeneralForumTopic(this.id);
  }

  /**
   * Use this method to reopen a closed 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically unhidden if it was hidden.
   * @returns {Promise<true>} - Returns True on success.
   */
  reopenGeneralForumTopic() {
    return this.client.reopenGeneralForumTopic(this.id);
  }

  /**
   * Use this method to hide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically closed if it was open.
   * @returns {Promise<true>} - Returns True on success.
   */
  hideGeneralForumTopic() {
    return this.client.hideGeneralForumTopic(this.id);
  }

  /**
   * Use this method to unhide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights.
   * @returns {Promise<true>} - Returns True on success.
   */
  unhideGeneralForumTopic() {
    return this.client.unhideGeneralForumTopic(this.id);
  }

  /**
   * Use this method to clear the list of pinned messages in a General forum topic. The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup.
   * @returns {Promise<true>} - Returns True on success.
   */
  unpinAllGeneralForumTopicMessages() {
    return this.client.unpinAllGeneralForumTopicMessages(this.id);
  }

  /**
   * Use this method to set default chat permissions for all members. The bot must be an administrator in the group or a supergroup for this to work and must have the can_restrict_members administrator rights.
   * @param {import("../../util/permission/ChatPermissions").ChatPermissionFlags} perms - An object for new default chat permissions
   * @param {boolean} [useIndependentChatPermissions] - Pass True if chat permissions are set independently. Otherwise, the can_send_other_messages and can_add_web_page_previews permissions will imply the can_send_messages, can_send_audios, can_send_documents, can_send_photos, can_send_videos, can_send_video_notes, and can_send_voice_notes permissions; the can_send_polls permission will imply the can_send_messages permission
   * @returns {Promise<true>} - Returns True on success.
   */
  setPermissions(perms, useIndependentChatPermissions) {
    return this.client.setChatPermissions({
      chatId: this.id,
      permissions: perms,
      ...(useIndependentChatPermissions && { useIndependentChatPermissions }),
    });
  }

  /**
   * Use this method to create a subscription invite link for a channel chat. The bot must have the can_invite_users administrator rights. The link can be edited using the method editChatSubscriptionInviteLink or revoked using the method revokeChatInviteLink.
   * @param {number} subscriptionPeriod - The number of seconds the subscription will be active for before the next payment. Currently, it must always be 2592000 (30 days)
   * @param {number} subscriptionPrice - The amount of Telegram Stars a user must pay initially and after each subsequent subscription period to be a member of the chat; 1-2500
   * @param {string} [name] - Invite link name; 0-32 characters
   * @returns {Promise<import("./ChatInviteLink").ChatInviteLink>} - Returns the new invite link as a ChatInviteLink object.
   */
  createSubscriptionInvite(subscriptionPeriod, subscriptionPrice, name) {
    return this.client.createChatSubscriptionInviteLink({
      chatId: this.id,
      subscriptionPeriod,
      subscriptionPrice,
      ...(name && { name }),
    });
  }

  /**
   * Use this method to edit a subscription invite link created by the bot. The bot must have the can_invite_users administrator rights.
   * @param {string} inviteLink - The invite link to edit
   * @param {string} [name] - Invite link name; 0-32 characters
   * @returns {Promise<import("./ChatInviteLink").ChatInviteLink>} - Returns the edited invite link as a ChatInviteLink object.
   */
  editSubscriptionInvite(inviteLink, name) {
    return this.client.editChatSubscriptionInviteLink({
      chatId: this.id,
      inviteLink,
      ...(name && { name }),
    });
  }

  /**
   * Use this method to create an additional invite link for a chat. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. The link can be revoked using the method revokeChatInviteLink.
   * @param {Omit<MethodParameters["createChatInviteLink"], "chatId">} [options] - out parameters
   * @returns {Promise<import("./ChatInviteLink").ChatInviteLink>} - Returns the new invite link as ChatInviteLink object.
   */
  createInvite(options = {}) {
    return this.client.createChatInviteLink({
      chatId: this.id,
      ...options,
    });
  }

  /**
   * Use this method to edit a non-primary invite link created by the bot. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   * @param {string} inviteLink - The invite link to edit
   * @param {Omit<MethodParameters["editChatInviteLink"], "inviteLink" | "chatId">} [options={}] - out parameters
   * @returns {Promise<import("./ChatInviteLink").ChatInviteLink>} - Returns the edited invite link as a ChatInviteLink object.
   */
  editInvite(inviteLink, options = {}) {
    return this.client.editChatInviteLink({
      chatId: this.id,
      inviteLink,
      ...options,
    });
  }

  /**
   * Use this method to revoke an invite link created by the bot. If the primary link is revoked, a new link is automatically generated. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   * @param {string} inviteLink - The invite link to revoke
   *  @returns {Promise<import("./ChatInviteLink").ChatInviteLink>} - Returns the revoked invite link as ChatInviteLink object.
   */
  revokeInvite(inviteLink) {
    return this.client.revokeChatInviteLink(this.id, inviteLink);
  }

  /**
   * Use this method to set a new profile photo for the chat. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   * @param {Buffer | ReadStream | Blob | FormData | DataView | ArrayBuffer | Uint8Array | string} photo - New chat photo, uploaded using multipart/form-data
   * @returns {Promise<true>} - Returns True on success.
   */
  setPhoto(photo) {
    return this.client.setChatPhoto(this.id, photo);
  }

  /**
   * Use this method to delete a chat photo. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   * @returns {Promise<true>} - Returns True on success.
   */
  deletePhoto() {
    return this.client.deleteChatPhoto(this.id);
  }

  /**
   * Use this method to change the title of a chat. Titles can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   * @param {string} title - New chat title, 1-128 characters
   * @returns {Promise<true>} - Returns True on success.
   */
  setTitle(title) {
    return this.client.setChatTitle(this.id, title);
  }

  /**
   * Use this method to change the description of a group, a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   * @param {string} [description] - New chat description, 0-255 characters
   * @returns {Promise<true>} - Returns True on success.
   */
  setDescription(description) {
    return this.client.setChatDescription(this.id, description);
  }

  /**
   * @typedef {Object} PinMessage
   * @property {boolean} [notification] - Pass True if it is not necessary to send a notification to all chat members about the new pinned message. Notifications are always disabled in channels and private chats
   * @property {string} [businessConnectionId] - Unique identifier of the business connection on behalf of which the message will be pinned
   */

  /**
   * Use this method to add a message to the list of pinned messages in a chat. In private chats and channel direct messages chats, all non-service messages can be pinned. Conversely, the bot must be an administrator with the 'can_pin_messages' right or the 'can_edit_messages' right to pin messages in groups and channels respectively.
   * @param {string | number} messageId - Identifier of a message to pin
   * @param {PinMessage} [options] - Options for pinned message
   * @returns {Promise<true>} - Returns True on success.
   */
  pinMessage(messageId, { notification, businessConnectionId } = {}) {
    return this.client.pinChatMessage({
      chatId: this.id,
      messageId,
      ...(notification && { disableNotification: notification }),
      ...(businessConnectionId && { businessConnectionId }),
    });
  }

  /**
   * @typedef {Object} UnpinMessage
   * @property {string | number} [messageId] - Identifier of the message to unpin. Required if business_connection_id is specified. If not specified, the most recent pinned message (by sending date) will be pinned
   * @property {string} [businessConnectionId] - Unique identifier of the business connection on behalf of which the message will be unpinned
   */

  /**
   * Use this method to remove a message from the list of pinned messages in a chat. In private chats and channel direct messages chats, all messages can be unpinned. Conversely, the bot must be an administrator with the 'can_pin_messages' right or the 'can_edit_messages' right to unpin messages in groups and channels respectively.
   * @param {UnpinMessage} [options] - Options for unpinned message
   * @returns {Promise<true>} - Returns True on success.
   */
  unpinMessage({ messageId, businessConnectionId } = {}) {
    return this.client.unpinChatMessage({
      chatId: this.id,
      ...(messageId && { messageId }),
      ...(businessConnectionId && { businessConnectionId }),
    });
  }

  /**
   * Use this method to clear the list of pinned messages in a chat. In private chats and channel direct messages chats, no additional rights are required to unpin all pinned messages. Conversely, the bot must be an administrator with the 'can_pin_messages' right or the 'can_edit_messages' right to unpin all pinned messages in groups and channels respectively.
   * @returns {Promise<true>} - Returns True on success.
   */
  unpinAllMessages() {
    return this.client.unpinAllChatMessages(this.id);
  }

  /**
   * Use this method to send photos.
   * @param {Buffer | ReadStream | Blob | FormData | DataView | ArrayBuffer | Uint8Array | string} photo - Photo to send. Pass a file_id as String to send a photo that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the Internet, or upload a new photo using multipart/form-data. The photo must be at most 10 MB in size. The photo's width and height must not exceed 10000 in total. Width and height ratio must be at most 20
   * @param {Omit<MethodParameters["sendPhoto"], "photo" | "chatId" | "messageThreadId">} [options={}] - out parameters
   * @returns {Promise<import("../message/Message").Message & { photo: import("../media/Photo").Photo[] }>} - On success, the sent Message is returned.
   */
  sendPhoto(photo, options = {}) {
    return this.client.sendPhoto({
      photo,
      chatId: this.id,
      ...(this.threadId && this.inTopic && { messageThreadId: this.threadId }),
      ...options,
    });
  }

  /**
   * Use this method to send audio files, if you want Telegram clients to display them in the music player. Your audio must be in the .MP3 or .M4A format. On success, the sent Message is returned. Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.
   * @param {Buffer | ReadStream | Blob | FormData | DataView | ArrayBuffer | Uint8Array | string} audio - Audio file to send. Pass a file_id as String to send an audio file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an audio file from the Internet, or upload a new one using multipart/form-data
   * @param {Omit<MethodParameters["sendAudio"], "audio" | "chatId" | "messageThreadId">} [options={}] - out parameters
   * @returns {Promise<import("../message/Message").Message & { audio: import("../media/Audio").Audio }>} - On success, the sent Message is returned.
   */
  sendAudio(audio, options = {}) {
    return this.client.sendAudio({
      audio,
      chatId: this.id,
      ...(this.threadId && this.inTopic && { messageThreadId: this.threadId }),
      ...options,
    });
  }

  /**
   * Use this method to send paid media to channel chats.
   * @param {MethodParameters["sendPaidMedia"]["media"]} media - An array describing the media to be sent; up to 10 items
   * @param {number} starCount - The number of Telegram Stars that must be paid to buy access to the media
   * @param {Omit<MethodParameters["sendPaidMedia"], "media" | "starCount" | "chatId">} [options={}] - out parameters
   * @returns {Promise<import("../message/Message").Message & { paidMedia: import("../media/paid/PaidMediaInfo").PaidMediaInfo }>} - On success, the sent Message is returned.
   */
  sendPaidMedia(media, starCount, options = {}) {
    return this.client.sendPaidMedia({
      media,
      starCount,
      chatId: this.id,
      ...options,
    });
  }

  /**
   * Use this method to send general files.
   * @param {Buffer | ReadStream | Blob | FormData | DataView | ArrayBuffer | Uint8Array | string} document - File to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data
   * @param {Omit<MethodParameters["sendDocument"], "document" | "chatId" | "messageThreadId">} [options={}] - out parameters
   * @returns {Promise<import("../message/Message").Message & { document: import("../media/Document").Document }>} - On success, the sent Message is returned. Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future.
   */
  sendDocument(document, options = {}) {
    return this.client.sendDocument({
      document,
      chatId: this.id,
      ...(this.threadId && this.inTopic && { messageThreadId: this.threadId }),
      ...options,
    });
  }

  /**
   * Use this method to send video files, Telegram clients support MPEG4 videos (other formats may be sent as Document).
   * @param {Buffer | ReadStream | Blob | FormData | DataView | ArrayBuffer | Uint8Array | string} video - Video to send. Pass a file_id as String to send a video that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a video from the Internet, or upload a new video using multipart/form-data.
   * @param {Omit<MethodParameters["sendVideo"], "video" | "chatId" | "messageThreadId">} [options={}] - out parameters
   * @returns {Promise<import("../message/Message").Message & { video: import("../media/Video").Video }>} - On success, the sent Message is returned. Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future.
   */
  sendVideo(video, options = {}) {
    return this.client.sendVideo({
      video,
      chatId: this.id,
      ...(this.threadId && this.inTopic && { messageThreadId: this.threadId }),
      ...options,
    });
  }

  /**
   * Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound).
   * @param {Buffer | ReadStream | Blob | FormData | DataView | ArrayBuffer | Uint8Array | string} animation - Animation to send. Pass a file_id as String to send an animation that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an animation from the Internet, or upload a new animation using multipart/form-data
   * @param {Omit<MethodParameters["sendAnimation"], "animation" | "chatId" | "messageThreadId">} [options={}] - out parameters
   * @returns {Promise<import("../message/Message").Message & { animation: import("../media/Animation").Animation }>} - On success, the sent Message is returned. Bots can currently send animation files of up to 50 MB in size, this limit may be changed in the future.
   */
  sendAnimation(animation, options = {}) {
    return this.client.sendAnimation({
      animation,
      chatId: this.id,
      ...(this.threadId && this.inTopic && { messageThreadId: this.threadId }),
      ...options,
    });
  }

  /**
   * Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .OGG file encoded with OPUS, or in .MP3 format, or in .M4A format (other formats may be sent as Audio or Document).
   * @param {Buffer | ReadStream | Blob | FormData | DataView | ArrayBuffer | Uint8Array | string} voice - Audio file to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data
   * @param {Omit<MethodParameters["sendVoice"], "voice" | "chatId" | "messageThreadId">} [options={}] - out parameters
   * @returns {Promise<import("../message/Message").Message & { voice: import("../media/Voice").Voice }>} - On success, the sent Message is returned. Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future.
   */
  sendVoice(voice, options = {}) {
    return this.client.sendVoice({
      voice,
      chatId: this.id,
      ...(this.threadId && this.inTopic && { messageThreadId: this.threadId }),
      ...options,
    });
  }

  /**
   * Use this method to send video messages.
   * @param {Buffer | ReadStream | Blob | FormData | DataView | ArrayBuffer | Uint8Array | string} videoNote - Video note to send. Pass a file_id as String to send a video note that exists on the Telegram servers (recommended) or upload a new video using multipart/form-data.. Sending video notes by a URL is currently unsupported
   * @param {Omit<MethodParameters["sendVideoNote"], "videoNote" | "chatId" | "messageThreadId">} [options={}] - out parameters
   * @returns {Promise<import("../message/Message").Message & { videoNote: import("../media/VideoNote").VideoNote }>} - On success, the sent Message is returned.
   */
  sendVideoNote(videoNote, options = {}) {
    return this.client.sendVideoNote({
      videoNote,
      chatId: this.id,
      ...(this.threadId && this.inTopic && { messageThreadId: this.threadId }),
      ...options,
    });
  }

  /**
   * Use this method to send a group of photos, videos, documents or audios as an album. Documents and audio files can be only grouped in an album with messages of the same type.
   * @param {MethodParameters["sendMediaGroup"]["media"]} media - media
   * @param {Omit<MethodParameters["sendMediaGroup"], "media" | "chatId" | "messageThreadId">} [options={}] - out parameters
   * @returns {Promise<Array<import("../message/Message").Message & { audio: import("../media/Audio").Audio; } | import("../message/Message").Message & { document: import("../media/Document").Document; } | import("../message/Message").Message & { photo: import("../media/Photo").Photo; } | import("../message/Message").Message & { video: import("../media/Video").Video}>>} - On success, an array of Messages that were sent is returned.
   */
  sendMediaGroup(media, options = {}) {
    return this.client.sendMediaGroup({
      media,
      chatId: this.id,
      ...(this.threadId && this.inTopic && { messageThreadId: this.threadId }),
      ...options,
    });
  }

  /**
   * Use this method to send point on the map.
   * @param {number} latitude - Latitude of the location
   * @param {number} longitude - Longitude of the location
   * @param {Omit<MethodParameters["sendLocation"], "latitude" | "longitude" | "chatId" | "messageThreadId">} [options={}] - out parameters
   * @returns {Promise<import("../message/Message").Message & { location: import("../misc/Location").Location }>} - On success, the sent Message is returned.
   */
  sendLocation(latitude, longitude, options = {}) {
    return this.client.sendLocation({
      latitude,
      longitude,
      chatId: this.id,
      ...(this.threadId && this.inTopic && { messageThreadId: this.threadId }),
      ...options,
    });
  }

  /**
   * Use this method to send information about a venue.
   * @param {number} latitude - Latitude of the location
   * @param {number} longitude - Longitude of the location
   * @param {Omit<MethodParameters["sendVenue"], "latitude" | "longitude" | "chatId" | "messageThreadId">} options - out parameters
   * @returns {Promise<import("../message/Message").Message & { venue: import("../misc/Venue").Venue }>} - On success, the sent Message is returned.
   */
  sendVenue(latitude, longitude, options) {
    return this.client.sendVenue({
      latitude,
      longitude,
      chatId: this.id,
      ...(this.threadId && this.inTopic && { messageThreadId: this.threadId }),
      ...options,
    });
  }

  /**
   * Use this method to send phone contacts.
   * @param {string} phoneNumber - Contact's phone number
   * @param {string} firstName - Contact's first name
   * @param {Omit<MethodParameters["sendContact"], "phoneNumber" | "firstName" | "chatId">} [options={}] - out parameters
   * @returns {Promise<import("../message/Message").Message & { contact: import("../media/Contact").Contact }>} - On success, the sent Message is returned.
   */
  sendContact(phoneNumber, firstName, options = {}) {
    return this.client.sendContact({
      phoneNumber,
      firstName,
      chatId: this.id,
      ...(this.threadId && this.inTopic && { messageThreadId: this.threadId }),
      ...options,
    });
  }

  /**
   * Use this method to send a native poll.
   * @param {string} question - Poll question, 1-300 characters
   * @param {import("../../client/interfaces/Message").InputPollOption[]} options - A list of 2-10 answer options
   * @param {Omit<MethodParameters["sendPoll"], "question" | "options" | "chatId" | "messageThreadId">} [other={}] - out parameters
   * @returns {Promise<import("../message/Message").Message & { poll: import("../media/Poll").Poll }>} - On success, the sent Message is returned.
   */
  sendPoll(question, options, other = {}) {
    return this.client.sendPoll({
      question,
      options,
      chatId: this.id,
      ...(this.threadId && this.inTopic && { messageThreadId: this.threadId }),
      ...other,
    });
  }

  /**
   * Use this method to send a checklist on behalf of a connected business account.
   * @param {string} businessConnectionId - Unique identifier of the business connection on behalf of which the message will be sent.
   * @param {import("../../client/interfaces/Checklist").InputChecklist} checklist - An object for the new checklist.
   * @param {Omit<MethodParameters["sendChecklist"], "chatId" | "checklist" | "businessConnectionId">} [options] - out parameters.
   * @returns {Promise<import("../message/Message").Message & { checklist: import("../checklist/Checklist").Checklist }>} - On success, the sent Message is returned.
   */
  sendChecklist(businessConnectionId, checklist, options = {}) {
    return this.client.sendChecklist({
      chatId: this.id,
      checklist,
      businessConnectionId,
      ...options,
    });
  }

  /**
   * Use this method to send an animated emoji that will display a random value.
   * @param {string} emoji - Emoji on which the dice throw animation is based. Currently, must be one of "🎲", "🎯", "🏀", "⚽", "🎳", or "🎰". Dice can have values 1-6 for "🎲", "🎯" and "🎳", values 1-5 for "🏀" and "⚽", and values 1-64 for "🎰".
   * @param {Omit<MethodParameters["sendDice"], "emoji" | "chatId" | "messageThreadId">} [options={}] - out parameters
   * @returns {Promise<import("../message/Message").Message & { dice: import("../media/Dice").Dice }>} - On success, the sent Message is returned.
   */
  sendDice(emoji, options = {}) {
    return this.client.sendDice({
      emoji,
      chatId: this.id,
      ...(this.threadId && this.inTopic && { messageThreadId: this.threadId }),
      ...options,
    });
  }

  /**
   * Use this method when you need to tell the user that something is happening on the bot's side. The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status).
   * @param {"typing"| "upload_photo"| "record_video"| "upload_video"| "record_voice" | "upload_voice" | "upload_document" | "choose_sticker"  | "find_location" | "record_video_note" | "upload_video_note"} action - Type of action to broadcast. Choose one, depending on what the user is about to receive: typing for text messages, upload_photo for photos, record_video or upload_video for videos, record_voice or upload_voice for voice notes, upload_document for general files, choose_sticker for stickers, find_location for location data, record_video_note or upload_video_note for video notes
   * @returns {Promise<true>} - Returns True on success.
   */
  sendAction(action = "typing") {
    return this.client.sendChatAction({
      action,
      chatId: this.id,
      ...(this.threadId && this.inTopic && { messageThreadId: this.threadId }),
    });
  }

  /**
   * Use this method to send static .WEBP, animated .TGS, or video .WEBM stickers.
   * @param {Buffer | ReadStream | Blob | FormData | DataView | ArrayBuffer | Uint8Array | string} sticker - Sticker to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a .WEBP sticker from the Internet, or upload a new .WEBP, .TGS, or .WEBM sticker using multipart/form-data. Video and animated stickers can't be sent via an HTTP URL
   * @param {Omit<MethodParameters["sendSticker"], "sticker" | "chatId" | "messageThreadId">} [options={}] - out parameters
   * @returns {Promise<import("../message/Message").Message & { sticker: import("../media/Sticker").Sticker }>} - On success, the sent Message is returned.
   */
  sendSticker(sticker, options = {}) {
    return this.client.sendSticker({
      sticker,
      chatId: this.id,
      ...(this.threadId && this.inTopic && { messageThreadId: this.threadId }),
      ...options,
    });
  }

  /**
   * Use this method to send invoices.
   * @param {string} title - Product name, 1-32 characters
   * @param {string} description - Product description, 1-255 characters
   * @param {string} payload - Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use for your internal processes
   * @param {string} currency - Three-letter ISO 4217 currency code, see more on currencies. Pass “XTR” for payments in Telegram Stars
   * @param {import("@telegram.ts/types").LabeledPrice[]} prices - Price breakdown, a JSON-serialized list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.). Must contain exactly one item for payments in Telegram Stars
   * @param {Omit<MethodParameters["sendInvoice"], "title" | "description" | "payload" | "currency" | "prices" | "chatId" | "messageThreadId">} [options={}] - out parameters
   * @returns {Promise<import("../message/Message").Message & { invoice: import("../invoice/Invoice").Invoice }>} - On success, the sent Message is returned.
   */
  sendInvoice(title, description, payload, currency, prices, options = {}) {
    return this.client.sendInvoice({
      title,
      description,
      payload,
      currency,
      prices,
      chatId: this.id,
      ...(this.threadId && this.inTopic && { messageThreadId: this.threadId }),
      ...options,
    });
  }

  /**
   * Use this method to send a game.
   * @param {string} gameShortName - Short name of the game, serves as the unique identifier for the game. Set up your games via BotFather.
   * @param {Omit<MethodParameters["sendGame"], "gameShortName" | "chatId" | "messageThreadId">} [options={}] - out parameters
   * @returns {Promise<import("../message/Message").Message & { game: import("../game/Game").Game }>} - On success, the sent Message is returned.
   */
  sendGame(gameShortName, options = {}) {
    return this.client.sendGame({
      gameShortName,
      chatId: this.id,
      ...(this.threadId && this.inTopic && { messageThreadId: this.threadId }),
      ...options,
    });
  }

  /**
   * Checks if this chat is equal to another chat.
   * @param {Chat} other - The other chat to compare with.
   * @returns {boolean} True if both chats are equal based on key properties, otherwise false.
   */
  equals(other) {
    if (!other || !(other instanceof Chat)) return false;

    return (
      this.id === other.id &&
      this.title === other.title &&
      this.username === other.username &&
      this.firstName === other.firstName &&
      this.lastName === other.lastName &&
      this.forum === other.forum &&
      this.threadId === other.threadId
    );
  }
}

module.exports = { Chat };
