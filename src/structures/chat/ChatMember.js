const { Base } = require("../Base");
const { User } = require("../misc/User");
const { ChatInviteLink } = require("./ChatInviteLink");
const { UserPermissions } = require("../../util/UserPermissions");

/**
 * @typedef {import("../../types").MethodParameters} MethodParameters
 */

class ChatMember extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {string | number} chatId - Identifier of the chat
   * @param {import("@telegram.ts/types").ChatMember} data - Data about the contains information about one member of a chat
   */
  constructor(client, chatId, data) {
    super(client);

    /** Identifier of the chat */
    this.chatId = String(chatId);

    /** The member's status in the chat */
    this.status = data.status || null;

    const permissions = {};

    if ("can_be_edited" in data) {
      permissions.beEdited = data.can_be_edited;
    }

    if ("can_manage_chat" in data) {
      permissions.manageChat = data.can_manage_chat;
    }

    if ("can_delete_messages" in data) {
      permissions.deleteMessages = data.can_delete_messages;
    }

    if ("can_manage_video_chats" in data) {
      permissions.manageVideoChats = data.can_manage_video_chats;
    }

    if ("can_restrict_members" in data) {
      permissions.restrictMembers = data.can_restrict_members;
    }

    if ("can_promote_members" in data) {
      permissions.promoteMembers = data.can_promote_members;
    }

    if ("can_change_info" in data) {
      permissions.changeInfo = data.can_change_info;
    }

    if ("can_invite_users" in data) {
      permissions.inviteUsers = data.can_invite_users;
    }

    if ("can_post_stories" in data) {
      permissions.postStories = data.can_post_stories;
    }

    if ("can_edit_stories" in data) {
      permissions.editStories = data.can_edit_stories;
    }

    if ("can_delete_stories" in data) {
      permissions.deleteStories = data.can_delete_stories;
    }

    if ("can_post_messages" in data) {
      permissions.postMessages = data.can_post_messages;
    }

    if ("can_edit_messages" in data) {
      permissions.editMessages = data.can_edit_messages;
    }

    if ("can_pin_messages" in data) {
      permissions.pinMessages = data.can_pin_messages;
    }

    if ("can_manage_topics" in data) {
      permissions.manageTopics = data.can_manage_topics;
    }

    if ("can_send_messages" in data) {
      permissions.sendMessages = data.can_send_messages;
    }

    if ("can_send_audios" in data) {
      permissions.sendAudios = data.can_send_audios;
    }

    if ("can_send_documents" in data) {
      permissions.sendDocuments = data.can_send_documents;
    }

    if ("can_send_photos" in data) {
      permissions.sendPhotos = data.can_send_photos;
    }

    if ("can_send_videos" in data) {
      permissions.sendVideos = data.can_send_videos;
    }

    if ("can_send_video_notes" in data) {
      permissions.sendVideoNotes = data.can_send_video_notes;
    }

    if ("can_send_voice_notes" in data) {
      permissions.sendVoiceNotes = data.can_send_voice_notes;
    }

    if ("can_send_polls" in data) {
      permissions.sendPolls = data.can_send_polls;
    }

    if ("can_send_other_messages" in data) {
      permissions.sendOtherMessages = data.can_send_other_messages;
    }

    if ("can_add_web_page_previews" in data) {
      permissions.addWebPagePreviews = data.can_add_web_page_previews;
    }

    /** Represents the rights of an administrator in a chat */
    this.permissions = new UserPermissions(
      this.status === "creator" ? UserPermissions.Flags : permissions,
    );

    this._patch(data);
  }

  _patch(data) {
    if ("user" in data) {
      /**
       * Information about the user
       * @type {User | undefined}
       */
      this.user = new User(this.client, data.user);
    }

    /**
     * True, if the user's presence in the chat is hidden
     * @type {boolean}
     */
    this.anonymous = Boolean(data.is_anonymous);

    if ("custom_title" in data) {
      /**
       * Custom title for this user
       * @type {string | undefined}
       */
      this.nickName = data.custom_title;
    }

    if ("is_member" in data) {
      /**
       * True, if the user is a member of the chat at the moment of the request
       * @type {boolean | undefined}
       */
      this.isMember = data.is_member;
    }

    if ("chat" in data) {
      /**
       * @typedef {import("./Chat").Chat} Chat
      /**
       
       * Chat to which the request was sent
       * @type {Chat | undefined}
       */
      this.chat = this.client.chats._add(data.chat);
    }

    if ("from" in data) {
      /**
       * User that sent the join request
       * @type {User | undefined}
       */
      this.author = new User(this.client, data.from);
    }

    if ("bio" in data) {
      /**
       * Bio of the user
       * @type {string | undefined}
       */
      this.bio = data.bio;
    }

    if ("invite_link" in data) {
      /**
       * Chat invite link that was used by the user to send the join request
       * @type {ChatInviteLink | undefined}
       */
      this.link = new ChatInviteLink(this.client, data.invite_link);
    }

    if ("date" in data) {
      /**
       * Date the request was sent in Unix time
       * @type {number | undefined}
       */
      this.requestedUnixTime = data.date;
    }

    if ("user_chatId" in data) {
      /**
       * Identifier of a private chat with the user who sent the join request. The bot can use this identifier for 5 minutes to send messages until the join request is processed, assuming no other administrator contacted the user
       * @type {string | undefined}
       */
      this.userChatId = String(data.user_chatId);
    }

    if ("until_date" in data) {
      /**
       * Date when restrictions will be lifted for this user; Unix time. If 0, then the user is restricted forever
       * @type {number | undefined}
       */
      this.restrictedUnixTime = data.until_date;
    }

    return data;
  }

  /**
   * Return the member id
   */
  get id() {
    return this.user?.id ?? null;
  }

  /**
   * Return the timestamp restrictions will be lifted for this user,  in milliseconds
   */
  get restrictedTimestamp() {
    return this.restrictedUnixTime ? this.restrictedUnixTime * 1000 : null;
  }

  /**
   * Date when restrictions will be lifted for this user
   * @type {null | Date}
   */
  get restrictedAt() {
    return this.restrictedTimestamp ? new Date(this.restrictedTimestamp) : null;
  }

  /**
   * Return the timestamp request was sent, in milliseconds, in milliseconds
   */
  get requestedTimestamp() {
    return this.requestedUnixTime ? this.requestedUnixTime * 1000 : null;
  }

  /**
   * Date the request was sent
   * @type {null | Date}
   */
  get requestedAt() {
    return this.requestedTimestamp ? new Date(this.requestedTimestamp) : null;
  }

  /**
   * Fetches this ChatMember
   * @param {boolean} [force=true] - whether to skip the cache check and request the API
   * @return {Promise<ChatMember | null>}
   */
  fetch(force = true) {
    return (
      this.client.chats
        .resolve(this.chatId)
        ?.members?.fetch({ id: this.id }, { force }) ?? null
    );
  }

  /**
   * Retrieves the permissions of the current member in a specific chat.
   * @param {ChatMember|string} channel - The identifier of the chat channel.
   * @returns {UserPermissions|null} The permissions object of the user in the chat or null if not available.
   */
  permissionsIn(channel) {
    const chat = this.client.chats.resolve(channel);

    if (!chat || chat.isPrivate() || !chat.members) {
      return null;
    }

    return chat.members.resolve(this)?.permissions || null;
  }

  /**
   * Use this method to kick a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   * @param {Omit<MethodParameters["kickChatMember"], "userId" | "chatId">} [options={}]
   * @return {Promise<true>} - Returns True on success.
   */
  kick(options = {}) {
    if (!this.user) {
      throw new TelegramError(
        "Could not find the user where this message came from in the cache!",
      );
    }

    return this.client.kickChatMember({
      userId: this.user.id,
      chatId: this.chatId,
      ...options,
    });
  }

  /**
   * Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   * @param {Omit<MethodParameters["banChatMember"], "userId" | "chatId">} [options={}]
   * @return {Promise<true>} - Returns True on success.
   */
  ban(options = {}) {
    if (!this.user) {
      throw new TelegramError(
        "Could not find the user where this message came from in the cache!",
      );
    }

    return this.client.banChatMember({
      userId: this.user.id,
      chatId: this.chatId,
      ...options,
    });
  }

  /**
   * Use this method to unban a previously banned user in a supergroup or channel. The user will not return to the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator for this to work. By default, this method guarantees that after the call the user is not a member of the chat, but will be able to join it. So if the user is a member of the chat they will also be removed from the chat. If you don't want this, use the parameter only_if_banned.
   * @param {boolean} [onlyIfBanned] - Do nothing if the user is not banned
   * @return {Promise<true>} - Returns True on success.
   */
  unban(onlyIfBanned) {
    if (!this.user) {
      throw new TelegramError(
        "Could not find the user where this message came from in the cache!",
      );
    }

    return this.client.banChatMember({
      userId: this.user.id,
      chatId: this.chatId,
      onlyIfBanned,
    });
  }

  /**
   * Use this method to ban a channel chat in a supergroup or a channel. Until the chat is unbanned, the owner of the banned chat won't be able to send messages on behalf of any of their channels. The bot must be an administrator in the supergroup or channel for this to work and must have the appropriate administrator rights.
   * @param {string | number} senderChatId - Unique identifier of the target sender chat
   * @return {Promise<true>} - Returns True on success.
   */
  banSenderChat(senderChatId) {
    return this.client.banChatSenderChat(this.chatId, senderChatId);
  }

  /**
   * Use this method to unban a previously banned channel chat in a supergroup or channel. The bot must be an administrator for this to work and must have the appropriate administrator rights.
   * @param {string | number} senderChatId - Unique identifier of the target sender chat
   * @return {Promise<true>} - Returns True on success.
   */
  unbanSenderChat(senderChatId) {
    return this.client.unbanChatSenderChat(this.chatId, senderChatId);
  }

  /**
   * Use this method to restrict a user in a supergroup. The bot must be an administrator in the supergroup for this to work and must have the appropriate administrator rights. Pass True for all permissions to lift restrictions from a user. Returns True on success.
   * @param {import("../../util/ChatPermissions").ChatPermissionFlags} perms - An object for new user permissions
   * @param {Omit<MethodParameters["restrictChatMember"], "userId" | "permissions">} [options={}] - out parameters
   * @return {Promise<true>} - Returns True on success.
   */
  restrict(perms, options = {}) {
    return this.client.restrictChatMember({
      userId: this.user.id,
      permissions: perms,
      ...options,
    });
  }

  /**
   * Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Pass False for all boolean parameters to demote a user.
   * @param {import("../../util/ChatPermissions").ChatPermissionFlags} persm - An object for new user permissions
   * @param {boolean} [isAnonymous] - Pass True if the administrator's presence in the chat is hidden
   * @return {Promise<true>} - Returns True on success.
   */
  promote(persm, isAnonymous) {
    return this.client.promoteChatMember({
      chatId: this.chatId,
      userId: this.user.id,
      is_anonymous: isAnonymous,
      permissions: persm,
    });
  }

  /**
   * Use this method to set a custom title for an administrator in a supergroup promoted by the bot.
   * @param {string} name - New custom title for the administrator; 0-16 characters, emoji are not allowed
   * @return {Promise<true>} - Returns True on success.
   */
  setNikeName(name) {
    return this.client.setChatAdministratorCustomTitle({
      chatId: this.chatId,
      userId: this.user.id,
      customTitle: name,
    });
  }

  /**
   * Return this member username, otherwise just an empty string
   */
  toString() {
    return this.user?.toString() ?? "";
  }
}

module.exports = { ChatMember };
