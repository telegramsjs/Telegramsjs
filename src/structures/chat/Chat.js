const { Base } = require("../Base");
const { MessageCollector } = require("../../util/collector/MessageCollector");
const {
  InlineKeyboardCollector,
} = require("../../util/collector/InlineKeyboardCollector");

/**
 * @typedef {import("node:fs").ReadStream} ReadStream
 */

/**
 * @typedef {import("../message/Message").Message} Message
 */

/**
 * @typedef {import("../../types").MethodParameters} MethodParameters
 */

const SymbolType = Symbol("SymbolType");

class Chat extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").Chat & { threadId?: number }} data - Data about the represents a chat
   */
  constructor(client, data) {
    super(client);

    /** Unique identifier for this chat */
    this.id = data.id;

    Object.defineProperty(this, SymbolType, {
      value: data.type,
      writable: true,
    });

    if (!this.isPrivate()) {
      const { ChatMemberManager } = require("../../managers/ChatMemberManager");

      /**
       * Manages API methods for ChatMember and stores their cache.
       * @type {ChatMemberManager | undefined}
       */
      this.members = new ChatMemberManager(
        client,
        this.id,
        client.options?.memberCacheMaxSize,
      );
    }

    const { MessageManager } = require("../../managers/MessageManager");

    /**
     * Manages API methods for Message and stores their cache.
     * @type {MessageManager}
     */
    this.messages = new MessageManager(
      client,
      client.options?.messageCacheMaxSize,
    );

    this._patch(data);
  }

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
         * Unique identifier of the forum topic
         * @type {number | undefined}
         */
        this.threadId = data.threadId;
      }
    }

    return data;
  }

  /**
   * @return {this is this & {  title: string;  username?: string;  firstName?: undefined;  lastName?: undefined;  forum?: undefined;  threadId?: undefined }}
   */
  isChannel() {
    return this[SymbolType] === "channel";
  }

  /**
   * @return {this is this & {  title: string;  username?: string;  firstName?: undefined;  lastName?: undefined;  forum?: true;  threadId?: number }}
   */
  isSupergroup() {
    return this[SymbolType] === "supergroup";
  }

  /**
   * @return {this is this & {  title: string;  username?: undefined;  firstName?: undefined;  lastName?: undefined;  forum?: undefined;  threadId?: undefined }}
   */
  isGroup() {
    return this[SymbolType] === "group";
  }

  /**
   * @return {this is this & {  title?: undefined;  username?: string;  firstName: string;  lastName?: string;  forum?: undefined;  threadId?: undefined }}
   */
  isPrivate() {
    return this[SymbolType] === "private";
  }

  /**
   * @return {Promise<import("./ChatMember").ChatMember>}
   */
  me() {
    return this.client.getChatMember(this.id, this.client.user.id);
  }

  /**
   * Fetches this chat
   * @param {boolean} [force=true] - Whether to skip the cache check and request the API
   * @return {Promise<import("./ChatFullInfo").ChatFullInfo>}
   */
  fetch(force = true) {
    return this.client.chats.fetch(this.id, { force });
  }

  /**
   * @param {import("../../util/collector/Collector").ICollectorOptions<number, Message>} [options={}] - message collector options
   * @return {import("../../util/collector/MessageCollector").MessageCollector}
   */
  createMessageCollector(options = {}) {
    return new MessageCollector(this.client, { chat: this }, options);
  }

  /**
   * @typedef {import("../../util/collector/Collector").ICollectorOptions<number, Message>} AwaitMessagesOptions
   * @property {string[]} [errors] Stop/end reasons that cause the promise to reject
   */

  /**
   * @param {AwaitMessagesOptions} [options={}] - message collector options
   * @return {Promise<import("@telegram.ts/collection").Collection<number, Message> | [import("@telegram.ts/collection").Collection<number, Message>, string]>}
   */
  awaitMessages(options = {}) {
    return new Promise((resolve, reject) => {
      const collector = this.createMessageCollector(options);
      collector.once("end", (collection, reason) => {
        if (options.errors?.includes(reason)) {
          reject([collection, reason]);
        } else {
          resolve(collection);
        }
      });
    });
  }

  /**
   * @param {import("../../util/collector/Collector").ICollectorOptions<number, import("../CallbackQuery").CallbackQuery>} [options={}] - inline keyboard collector options
   * @return {InlineKeyboardCollector}
   */
  createMessageComponentCollector(options = {}) {
    return new InlineKeyboardCollector(this.client, options);
  }

  /**
   * Use this method to send text messages.
   * @param {string} text - Text of the message to be sent, 1-4096 characters after entities parsing
   * @param {Omit<MethodParameters["sendMessage"], "text" | "chat_id">} [options={}] - out parameters
   * @return {Promise<Message & { content: string }>} - On success, the sent Message is returned.
   */
  send(text, options = {}) {
    return this.client.sendMessage({
      text,
      chat_id: this.id,
      message_thread_id: this.threadId,
      ...options,
    });
  }

  /**
   * Use this method to kick a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   * @param {number} userId - Unique identifier of the target user
   * @param {Omit<MethodParameters["kickChatMember"], "user_id" | "chat_id">} [options={}]
   * @return {Promise<true>} - Returns True on success.
   */
  kick(userId, options = {}) {
    return this.client.kickChatMember({
      user_id: userId,
      chat_id: this.id,
      ...options,
    });
  }

  /**
   * Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   * @param {number} userId - Unique identifier of the target user
   * @param {Omit<MethodParameters["banChatMember"], "user_id" | "chat_id">} [options={}]
   * @return {Promise<true>} - Returns True on success.
   */
  ban(userId, options = {}) {
    return this.client.banChatMember({
      user_id: userId,
      chat_id: this.id,
      ...options,
    });
  }

  /**
   * Use this method to unban a previously banned user in a supergroup or channel. The user will not return to the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator for this to work. By default, this method guarantees that after the call the user is not a member of the chat, but will be able to join it. So if the user is a member of the chat they will also be removed from the chat. If you don't want this, use the parameter only_if_banned.
   * @param {number} userId - Unique identifier of the target user
   * @param {boolean} [onlyIfBanned] - Do nothing if the user is not banned
   * @return {Promise<true>} - Returns True on success.
   */
  unban(userId, onlyIfBanned) {
    return this.client.banChatMember({
      user_id: userId,
      chat_id: this.id,
      only_if_banned: onlyIfBanned,
    });
  }

  /**
   * Use this method to ban a channel chat in a supergroup or a channel. Until the chat is unbanned, the owner of the banned chat won't be able to send messages on behalf of any of their channels. The bot must be an administrator in the supergroup or channel for this to work and must have the appropriate administrator rights.
   * @param {number} senderChatId - Unique identifier of the target sender chat
   * @return {Promise<true>} - Returns True on success.
   */
  banSenderChat(senderChatId) {
    return this.client.banChatSenderChat(this.id, senderChatId);
  }

  /**
   * Use this method to unban a previously banned channel chat in a supergroup or channel. The bot must be an administrator for this to work and must have the appropriate administrator rights.
   * @param {number} senderChatId - Unique identifier of the target sender chat
   * @return {Promise<true>} - Returns True on success.
   */
  unbanSenderChat(senderChatId) {
    return this.client.unbanChatSenderChat(this.id, senderChatId);
  }

  /**
   * Use this method for your bot to leave this group, supergroup or channel.
   * @return {Promise<true>} - Returns True on success.
   */
  leave() {
    return this.client.leaveChat(this.id);
  }

  /**
   * Use this method to get a list of administrators in a chat, which aren't bots.
   * @return {Promise<import("./ChatMember")[]>} - Returns an Array of ChatMember objects.
   */
  getAdmins() {
    return this.client.getChatAdministrators(this.id);
  }

  /**
   * Use this method to get the number of members in a chat.
   * @return {Promise<number>} - Returns Int on success.
   */
  membersCount() {
    return this.client.getChatMemberCount(this.id);
  }

  /**
   * Use this method to set a new group sticker set for a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set ly returned in getChat requests to check if the bot can use this method
   * @param {string} name - Name of the sticker set to be set as the group sticker set.
   * @return {Promise<true>} - Returns True on success.
   */
  setStickerSet(name) {
    return this.client.setChatStickerSet(this.id, name);
  }

  /**
   * Use this method to delete a group sticker set from a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set ly returned in getChat requests to check if the bot can use this method.
   * @return {Promise<true>} - Returns True on success.
   */
  deleteStickerSet() {
    return this.client.deleteChatStickerSet(this.id);
  }

  /**
   * Use this method to change the bot's menu button in a private chat, or the default menu button.
   * @param {import("@telegram.ts/types").MenuButton} [menuButton] - An object for the bot's new menu button. Defaults to MenuButtonDefault
   * @return {Promise<true>} - Returns True on success.
   */
  setMenuButton(menuButton) {
    return this.client.deleteChatStickerSet(this.id, menuButton);
  }

  /**
   * Use this method to create a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights.
   * @param {string} name - Topic name, 1-128 characters
   * @param {Omit<MethodParameters["createForumTopic"], "name" | "chat_id">} [options={}] - out parameters
   * @return {Promise<import("../forum/ForumTopic").ForumTopic>} - Returns information about the created topic as a ForumTopic object.
   */
  createForumTopic(name, options = {}) {
    return this.client.createForumTopic({
      name,
      chat_id: this.id,
      ...options,
    });
  }

  /**
   * Use this method to edit the name of the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have can_manage_topics administrator rights.
   * @param {string} name - New topic name, 1-128 characters
   * @return {Promise<true>} - Returns True on success.
   */
  editGeneralForumTopic(name) {
    return this.client.editGeneralForumTopic(this.id, name);
  }

  /**
   * Use this method to close an open 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights.
   * @return {Promise<true>} - Returns True on success.
   */
  closeGeneralForumTopic() {
    return this.client.closeGeneralForumTopic(this.id);
  }

  /**
   * Use this method to reopen a closed 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically unhidden if it was hidden.
   * @return {Promise<true>} - Returns True on success.
   */
  reopenGeneralForumTopic() {
    return this.client.reopenGeneralForumTopic(this.id);
  }

  /**
   * Use this method to hide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically closed if it was open.
   * @return {Promise<true>} - Returns True on success.
   */
  hideGeneralForumTopic() {
    return this.client.hideGeneralForumTopic(this.id);
  }

  /**
   * Use this method to unhide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights.
   * @return {Promise<true>} - Returns True on success.
   */
  unhideGeneralForumTopic() {
    return this.client.unhideGeneralForumTopic(this.id);
  }

  /**
   * Use this method to clear the list of pinned messages in a General forum topic. The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup.
   * @return {Promise<true>} - Returns True on success.
   */
  unpinAllGeneralForumTopicMessages() {
    return this.client.unpinAllGeneralForumTopicMessages(this.id);
  }

  /**
   * Use this method to set default chat permissions for all members. The bot must be an administrator in the group or a supergroup for this to work and must have the can_restrict_members administrator rights.
   * @param {import("@telegram.ts/types").ChatAdministratorRights} perms - An object for new default chat permissions
   * @param {boolean} [useIndependentChatPermissions] - Pass True if chat permissions are set independently. Otherwise, the can_send_other_messages and can_add_web_page_previews permissions will imply the can_send_messages, can_send_audios, can_send_documents, can_send_photos, can_send_videos, can_send_video_notes, and can_send_voice_notes permissions; the can_send_polls permission will imply the can_send_messages permission
   * @return {Promise<true>} - Returns True on success.
   */
  setPermissions(perms, useIndependentChatPermissions) {
    return this.client.setChatPermissions({
      chat_id: this.id,
      permissions: perms,
      use_independent_chat_permissions: useIndependentChatPermissions,
    });
  }

  /**
   * Use this method to create an additional invite link for a chat. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. The link can be revoked using the method revokeChatInviteLink.
   * @param {Omit<MethodParameters["createChatInviteLink"], "chat_id">} [options] - out parameters
   * @return {Promise<import("@telegram.ts/types").ChatInviteLink>} - Returns the new invite link as ChatInviteLink object.
   */
  createInvite(options = {}) {
    return this.client.createChatInviteLink({
      chat_id: this.id,
      ...options,
    });
  }

  /**
   * Use this method to edit a non-primary invite link created by the bot. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   * @param {string} inviteLink - The invite link to edit
   * @param {Omit<MethodParameters["editChatInviteLink"], "invite_link" | "chat_id">} - out parameters
   * @return {Promise<import("@telegram.ts/types").ChatInviteLink>} - Returns the edited invite link as a ChatInviteLink object.
   */
  editInvite(inviteLink, options = {}) {
    return this.client.editChatInviteLink({
      chat_id: this.id,
      invite_link: inviteLink,
      ...options,
    });
  }

  /**
   * Use this method to revoke an invite link created by the bot. If the primary link is revoked, a new link is automatically generated. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   * @param {string} inviteLink - The invite link to revoke
   *  @return {Promise<import("@telegram.ts/types").ChatInviteLink>} - Returns the revoked invite link as ChatInviteLink object.
   */
  revokeInvite(inviteLink) {
    return this.client.revokeChatInviteLink(this.id, inviteLink);
  }

  /**
   * Use this method to set a new profile photo for the chat. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   * @param {Buffer | ReadStream | string} photo - New chat photo, uploaded using multipart/form-data
   * @return {Promise<true>} - Returns True on success.
   */
  setPhoto(photo) {
    return this.client.setChatPhoto(this.id, photo);
  }

  /**
   * Use this method to delete a chat photo. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   * @return {Promise<true>} - Returns True on success.
   */
  deletePhoto() {
    return this.client.deleteChatPhoto(this.id);
  }

  /**
   * Use this method to change the title of a chat. Titles can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   * @param {string} title - New chat title, 1-128 characters
   * @return {Promise<true>} - Returns True on success.
   */
  setTitle(title) {
    return this.client.setChatTitle(this.id, title);
  }

  /**
   * Use this method to change the description of a group, a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   * @param {string} [description] - New chat description, 0-255 characters
   * @return {Promise<true>} - Returns True on success.
   */
  setDescription(description) {
    return this.client.setChatDescription(this.id, description);
  }

  /**
   * Use this method to add a message to the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel.
   * @param {number} messageId - Identifier of a message to pin
   * @param {boolean} [disableNotification] - Pass True if it is not necessary to send a notification to all chat members about the new pinned message. Notifications are always disabled in channels and private chats
   * @return {Promise<true>} - Returns True on success.
   */
  pinMessage(messageId, disableNotification) {
    return this.client.pinChatMessage({
      chat_id: this.id,
      message_id: messageId,
      disable_notification: disableNotification,
    });
  }

  /**
   * Use this method to remove a message from the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel.
   * @param {number} [messageId] - Identifier of a message to unpin. If not specified, the most recent pinned message (by sending date) will be unpinned
   * @return {Promise<true>} - Returns True on success.
   */
  unpinMessage(messageId) {
    return this.client.unpinChatMessage(this.id, messageId);
  }

  /**
   * Use this method to clear the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel.
   * @return {Promise<true>} - Returns True on success.
   */
  unpinAllMessages() {
    return this.client.unpinAllChatMessages(this.id);
  }

  /**
   * Use this method to send photos.
   * @param {Buffer | ReadStream | string} photo - Photo to send. Pass a file_id as String to send a photo that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the Internet, or upload a new photo using multipart/form-data. The photo must be at most 10 MB in size. The photo's width and height must not exceed 10000 in total. Width and height ratio must be at most 20
   * @param {Omit<MethodParameters["sendPhoto"], "photo" | "chat_id" | "message_thread_id">} [options={}] - out parameters
   * @return {Promise<Message & { photo: import("../media/Photo").Photo[] }>} - On success, the sent Message is returned.
   */
  sendPhoto(photo, options = {}) {
    return this.client.sendPhoto({
      photo,
      chat_id: this.id,
      message_thread_id: this.threadId,
      ...options,
    });
  }

  /**
   * Use this method to send audio files, if you want Telegram clients to display them in the music player. Your audio must be in the .MP3 or .M4A format. On success, the sent Message is returned. Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.
   * @param {Buffer | ReadStream | string} audio - Audio file to send. Pass a file_id as String to send an audio file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an audio file from the Internet, or upload a new one using multipart/form-data
   * @param {Omit<MethodParameters["sendAudio"], "audio" | "chat_id" | "message_thread_id">} [options={}] - out parameters
   * @return {Promise<Message & { audio: import("../media/Audio").Audio }>} - On success, the sent Message is returned.
   */
  sendAudio(audio, options = {}) {
    return this.client.sendAudio({
      audio,
      chat_id: this.id,
      message_thread_id: this.threadId,
      ...options,
    });
  }

  /**
   * Use this method to send paid media to channel chats.
   * @param {import("@telegram.ts/types").InputPaidMedia[]} media - An array describing the media to be sent; up to 10 items
   * @param {number} starCount - The number of Telegram Stars that must be paid to buy access to the media
   * @param {Omit<MethodParameters["sendPaidMedia"], "media" | "star_count" | "chat_id">} [options={}] - out parameters
   * @return {Promise<Message & { paidMedia: import("../media/paid/PaidMediaInfo").PaidMediaInfo }>} - On success, the sent Message is returned.
   */
  sendPaidMedia(media, starCount, options = {}) {
    return this.client.sendPaidMedia({
      media,
      star_count: starCount,
      chat_id: this.id,
      ...options,
    });
  }

  /**
   * Use this method to send general files.
   * @param {Buffer | ReadStream | string} document - File to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data
   * @param {Omit<MethodParameters["sendDocument"], "document" | "chat_id" | "message_thread_id">} [options={}] - out parameters
   * @return {Promise<Message & { document: import("../media/Document").Document }>} - On success, the sent Message is returned. Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future.
   */
  sendDocument(document, options = {}) {
    return this.client.sendDocument({
      document,
      chat_id: this.id,
      message_thread_id: this.threadId,
      ...options,
    });
  }

  /**
   * Use this method to send video files, Telegram clients support MPEG4 videos (other formats may be sent as Document).
   * @param {Buffer | ReadStream | string} audio - Video to send. Pass a file_id as String to send a video that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a video from the Internet, or upload a new video using multipart/form-data.
   * @param {Omit<MethodParameters["sendVideo"], "video" | "chat_id" | "message_thread_id">} [options={}] - out parameters
   * @return {Promise<Message & { video: import("../media/Video").Video }>} - On success, the sent Message is returned. Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future.
   */
  sendVideo(video, options = {}) {
    return this.client.sendVideo({
      video,
      chat_id: this.id,
      message_thread_id: this.threadId,
      ...options,
    });
  }

  /**
   * Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound).
   * @param {Buffer | ReadStream | string} animation - Animation to send. Pass a file_id as String to send an animation that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an animation from the Internet, or upload a new animation using multipart/form-data
   * @param {Omit<MethodParameters["sendAnimation"], "animation" | "chat_id" | "message_thread_id">} [options={}] - out parameters
   * @return {Promise<Message & { animation: import("../media/Animation").Animation }>} - On success, the sent Message is returned. Bots can currently send animation files of up to 50 MB in size, this limit may be changed in the future.
   */
  sendAnimation(animation, options = {}) {
    return this.client.sendAnimation({
      animation,
      chat_id: this.id,
      message_thread_id: this.threadId,
      ...options,
    });
  }

  /**
   * Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .OGG file encoded with OPUS, or in .MP3 format, or in .M4A format (other formats may be sent as Audio or Document).
   * @param {Buffer | ReadStream | string} voice - Audio file to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data
   * @param {Omit<MethodParameters["sendVoice"], "voice" | "chat_id" | "message_thread_id">} [options={}] - out parameters
   * @return {Promise<Message & { voice: import("../media/Voice").Voice }>} - On success, the sent Message is returned. Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future.
   */
  sendVoice(voice, options = {}) {
    return this.client.sendVoice({
      voice,
      chat_id: this.id,
      message_thread_id: this.threadId,
      ...options,
    });
  }

  /**
   * Use this method to send video messages.
   * @param {Buffer | ReadStream | string} videoNote - Video note to send. Pass a file_id as String to send a video note that exists on the Telegram servers (recommended) or upload a new video using multipart/form-data.. Sending video notes by a URL is currently unsupported
   * @param {Omit<MethodParameters["sendVideoNote"], "video_note" | "chat_id" | "message_thread_id">} [options={}] - out parameters
   * @return {Promise<Message & { videNote: import("../media/VideoNote").VideoNote }>} - On success, the sent Message is returned.
   */
  sendVideoNote(videoNote, options = {}) {
    return this.client.sendVideoNote({
      video_note: videoNote,
      chat_id: this.id,
      message_thread_id: this.threadId,
      ...options,
    });
  }

  /**
   * Use this method to send a group of photos, videos, documents or audios as an album. Documents and audio files can be only grouped in an album with messages of the same type.
   * @param {ReadonlyArray<import("@telegram.ts/types").InputMediaAudio | import("@telegram.ts/types").InputMediaDocument | import("@telegram.ts/types").InputMediaPhoto | import("@telegram.ts/types").InputMediaVideo>} media - media
   * @param {Omit<MethodParameters["sendMediaGroup"], "media" | "chat_id" | "message_thread_id">} [options={}] - out parameters
   * @return {Promise<Array<Message & { audio: import("../media/Audio").Audio; document: import("../media/Document").Document; photo: import("../media/Photo").Photo; video: import("../media/Video").Video}>>} - On success, an array of Messages that were sent is returned.
   */
  sendMediaGroup(media, options = {}) {
    return this.client.sendMediaGroup({
      media,
      chat_id: this.id,
      message_thread_id: this.threadId,
      ...options,
    });
  }

  /**
   * Use this method to send point on the map.
   * @param {number} latitude - Latitude of the location
   * @param {number} longitude - Longitude of the location
   * @param {Omit<MethodParameters["sendLocation"], "chat_id" | "message_thread_id">} [options={}] - out parameters
   * @return {Promise<Message & { location: import("../misc/Location").Location }>} - On success, the sent Message is returned.
   */
  sendLocation(latitude, longitude, options = {}) {
    return this.client.sendLocation({
      latitude,
      longitude,
      chat_id: this.id,
      message_thread_id: this.threadId,
      ...options,
    });
  }

  /**
   * Use this method to send information about a venue.
   * @param {number} latitude - Latitude of the location
   * @param {number} llongitude - Longitude of the location
   * @param {Omit<MethodParameters["sendVenue"], "latitude" | "longitude" | "chat_id" | "message_thread_id">} options- out parameters
   * @return {Promise<Message & { venue: import("../misc/Venue").Venue }>} - On success, the sent Message is returned.
   */
  sendVenue(latitude, longitude, options = {}) {
    return this.client.sendVenue({
      latitude,
      longitude,
      chat_id: this.id,
      message_thread_id: this.threadId,
      ...options,
    });
  }

  /**
   * Use this method to send phone contacts.
   * @param {string} phoneNumber - Contact's phone number
   * @param {string} firstName - Contact's first name
   * @param {Omit<MethodParameters["sendContact"], "phone_number" | "first_name" | "chat_id">} [options={}] - out parameters
   * @return {Promise<Message & { contact: import("../media/Contact").Contact }>} - On success, the sent Message is returned.
   */
  sendContact(phoneNumber, firstName, options = {}) {
    return this.client.sendContact({
      phone_number: phoneNumber,
      first_name: firstName,
      chat_id: this.id,
      message_thread_id: this.threadId,
      ...options,
    });
  }

  /**
   * Use this method to send a native poll.
   * @param {string} question - Poll question, 1-300 characters
   * @param {import("@telegram.ts/types").InputPollOption[]} options - A list of 2-10 answer options
   * @param {Omit<MethodParameters["sendPoll"], "question" | "options" | "chat_id" | "message_thread_id">} - out parameters
   * @return {Promise<Message & { poll: import("../media/Poll").Poll }>} - On success, the sent Message is returned.
   */
  sendPoll(question, options, other = {}) {
    return this.client.sendPoll({
      question,
      options,
      chat_id: this.id,
      message_thread_id: this.threadId,
      ...other,
    });
  }

  /**
   * Use this method to send an animated emoji that will display a random value.
   * @param {string} emoji - Emoji on which the dice throw animation is based. Currently, must be one of "🎲", "🎯", "🏀", "⚽", "🎳", or "🎰". Dice can have values 1-6 for "🎲", "🎯" and "🎳", values 1-5 for "🏀" and "⚽", and values 1-64 for "🎰".
   * @param {Omit<MethodParameters["sendDice"], "emoji" | "chat_id" | "message_thread_id">} - out parameters
   * @return {Promise<Message & { dice: import("../media/Dice").Dice }>} - On success, the sent Message is returned.
   */
  sendDice(emoji, options = {}) {
    return this.client.sendDice({
      emoji,
      chat_id: this.id,
      message_thread_id: this.threadId,
      ...options,
    });
  }

  /**
   * Use this method when you need to tell the user that something is happening on the bot's side. The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status).
   * @param {"typing"| "upload_photo"| "record_video"| "upload_video"| "record_voice" | "upload_voice" | "upload_document" | "choose_sticker"  | "find_location" | "record_video_note" | "upload_video_note"} action - Type of action to broadcast. Choose one, depending on what the user is about to receive: typing for text messages, upload_photo for photos, record_video or upload_video for videos, record_voice or upload_voice for voice notes, upload_document for general files, choose_sticker for stickers, find_location for location data, record_video_note or upload_video_note for video notes
   * @return {Promise<true>} - Returns True on success.
   */
  sendAction(action = "typing") {
    return this.client.sendChatAction({
      action,
      chat_id: this.id,
      message_thread_id: this.threadId,
    });
  }

  /**
   * Use this method to send static .WEBP, animated .TGS, or video .WEBM stickers.
   * @param {Buffer | ReadStream | string} sticker - Sticker to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a .WEBP sticker from the Internet, or upload a new .WEBP, .TGS, or .WEBM sticker using multipart/form-data. Video and animated stickers can't be sent via an HTTP URL
   * @param {Omit<MethodParameters["sendSticker"], "sticker" | "chat_id" | "message_thread_id">} [options={}] - out parameters
   * @return {Promise<Message & { sticker: import("../media/Sticker").Sticker }>} - On success, the sent Message is returned.
   */
  sendSticker(sticker, options = {}) {
    return this.client.sendSticker({
      sticker,
      chat_id: this.id,
      message_thread_id: this.threadId,
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
   * @param {Omit<MethodParameters["sendInvoice"], "title" | "description" | "payload" | "currency" | "prices" | "chat_id" | "message_thread_id">} [options={}] - out parameters
   * @return {Promise<Message & { invoice: import("../invoice/Invoice").Invoice }>} - On success, the sent Message is returned.
   */
  sendInvoice(title, description, payload, currency, prices, options = {}) {
    return this.client.sendInvoice({
      title,
      description,
      payload,
      currency,
      prices,
      chat_id: this.id,
      message_thread_id: this.threadId,
      ...options,
    });
  }

  /**
   * Use this method to send a game.
   * @param {string} gameShortName - Short name of the game, serves as the unique identifier for the game. Set up your games via BotFather.
   * @param {Omit<MethodParameters["sendGame"], "game_short_name" | "chat_id" | "message_thread_id">} [options={}] - out parameters
   * @return {Promise<Message & { game: import("../game/Game").Game }>} - On success, the sent Message is returned.
   */
  sendGame(gameShortName, options = {}) {
    return this.client.sendGame({
      game_short_name: gameShortName,
      chat_id: this.id,
      message_thread_id: this.threadId,
      ...options,
    });
  }
}

module.exports = { Chat };
