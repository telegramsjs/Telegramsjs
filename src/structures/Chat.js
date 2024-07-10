const { Base } = require("./Base");

const SymbolType = Symbol("SymbolType");

class Chat extends Base {
  constructor(client, data) {
    super(client, data);

    this.id = data.id;

    Object.defineProperty(this, SymbolType, {
      value: data.type,
      writable: true,
    });

    if (!this.isPrivate()) {
      const { ChatMemberManager } = require("../managers/ChatMemberManager");
      this.members = new ChatMemberManager(
        client,
        this.id,
        client.options?.memberCacheMaxSize,
      );
    }

    const { MessageManager } = require("../managers/MessageManager");
    this.messages = new MessageManager(
      client,
      client.options?.messageCacheMaxSize,
    );

    this._patch(data);
  }

  _patch(data) {
    if ("title" in data) {
      this.title = data.title;
    }

    if ("username" in data) {
      this.username = data.username;
    }

    if ("first_name" in data) {
      this.firstName = data.first_name;
    }

    if ("last_name" in data) {
      this.lastName = data.last_name;
    }

    if ("is_forum" in data) {
      this.forum = data.is_forum;
    }
  }

  isChannel() {
    return this[SymbolType] === "channel";
  }

  isSupergroup() {
    return this[SymbolType] === "supergroup";
  }

  isGroup() {
    return this[SymbolType] === "group";
  }

  isPrivate() {
    return this[SymbolType] === "private";
  }

  me() {
    return this.client.getChatMember(this.id, this.client.user.id);
  }

  fetch() {
    return this.client.getChat(this.id);
  }

  send(text, options = {}) {
    return this.client.sendMessage({
      text,
      chat_id: this.id,
      message_thread_id: this.threadId,
      ...options,
    });
  }

  kick(userId, options = {}) {
    return this.client.kickChatMember({
      user_id: userId,
      chat_id: this.id,
      ...options,
    });
  }

  ban(userId, options = {}) {
    return this.client.banChatMember({
      user_id: userId,
      chat_id: this.id,
      ...options,
    });
  }

  unban(userId, onlyIfBanned) {
    return this.client.banChatMember({
      user_id: userId,
      chat_id: this.id,
      only_if_banned: onlyIfBanned,
    });
  }

  leave() {
    return this.client.leaveChat(this.id);
  }

  getAdmins() {
    return this.client.getChatAdministrators(this.id);
  }

  membersCount() {
    return this.client.getChatMemberCount(this.id);
  }

  setStickerSet(name) {
    return this.client.setChatStickerSet(this.id, name);
  }

  deleteStickerSet() {
    return this.client.deleteChatStickerSet(this.id);
  }

  setMenuButton(menuButton) {
    return this.client.deleteChatStickerSet(this.id, menuButton);
  }

  createForumTopic(name, options = {}) {
    return this.client.createForumTopic({
      name,
      chat_id: this.id,
      ...options,
    });
  }

  editGeneralForumTopic(name) {
    return this.client.editGeneralForumTopic(this.id, name);
  }

  closeGeneralForumTopic() {
    return this.client.closeGeneralForumTopic(this.id);
  }

  reopenGeneralForumTopic() {
    return this.client.reopenGeneralForumTopic(this.id);
  }

  hideGeneralForumTopic() {
    return this.client.hideGeneralForumTopic(this.id);
  }

  unhideGeneralForumTopic() {
    return this.client.unhideGeneralForumTopic(this.id);
  }

  unpinAllGeneralForumTopicMessages() {
    return this.client.unpinAllGeneralForumTopicMessages(this.id);
  }

  setPermissions(perms, useIndependentChatPermissions) {
    const permissions = new Permissions(perms);

    return thsi.client.setChatPermissions({
      chat_id: this.id,
      permissions: permissions.toApiFormat(permissions.toObject()),
      use_independent_chat_permissions: useIndependentChatPermissions,
    });
  }

  createInvite(options = {}) {
    return this.client.exportChatInviteLink({
      chat_id: this.id,
      ...options,
    });
  }

  editInvite(inviteLink, options = {}) {
    return this.client.editChatInviteLink({
      chat_id: this.id,
      invite_link: inviteLink,
      ...options,
    });
  }

  revokeInvite(inviteLink) {
    return this.client.revokeChatInviteLink(this.id, inviteLink);
  }

  setPhoto(photo) {
    return this.client.setChatPhoto(this.id, photo);
  }

  deletePhoto() {
    return this.client.deleteChatPhoto(this.id);
  }

  setTitle(title) {
    return this.client.setChatTitle(this.id, title);
  }

  setDescription(description) {
    return this.client.setChatDescription(this.id, description);
  }

  pinMessage(messageId, disableNotification) {
    return this.client.pinChatMessage({
      chat_id: this.id,
      message_id: messageId,
      disable_notification: disableNotification,
    });
  }

  unpinMessage(messageId) {
    return this.client.unpinChatMessage(this.id, messageId);
  }

  unpinAllMessages(messageId) {
    return this.client.unpinAllChatMessages(this.id);
  }

  sendPhoto(photo, options = {}) {
    return this.client.sendPhoto({
      photo,
      chat_id: this.id,
      message_thread_id: this.threadId,
      ...options,
    });
  }

  sendAudio(audio, options = {}) {
    return this.client.sendAudio({
      audio,
      chat_id: this.id,
      message_thread_id: this.threadId,
      ...options,
    });
  }

  sendDocument(document, options = {}) {
    return this.client.sendDocument({
      document,
      chat_id: this.id,
      message_thread_id: this.threadId,
      ...options,
    });
  }

  sendVideo(video, options = {}) {
    return this.client.sendVideo({
      video,
      chat_id: this.id,
      message_thread_id: this.threadId,
      ...options,
    });
  }

  sendAnimation(animation, options = {}) {
    return this.client.sendAnimation({
      animation,
      chat_id: this.id,
      message_thread_id: this.threadId,
      ...options,
    });
  }

  sendVoice(voice, options = {}) {
    return this.client.sendVoice({
      voice,
      chat_id: this.id,
      message_thread_id: this.threadId,
      ...options,
    });
  }

  sendVideoNote(videoNote, options = {}) {
    return this.client.sendVideoNote({
      video_note: videoNote,
      chat_id: this.id,
      message_thread_id: this.threadId,
      ...options,
    });
  }

  sendMediaGroup(media, options = {}) {
    return this.client.sendMediaGroup({
      media,
      chat_id: this.id,
      message_thread_id: this.threadId,
      ...options,
    });
  }

  sendLocation(latitude, longitude, options = {}) {
    return this.client.sendLocation({
      latitude,
      longitude,
      chat_id: this.id,
      message_thread_id: this.threadId,
      ...options,
    });
  }

  sendVenue(latitude, longitude, options = {}) {
    return this.client.sendVenue({
      latitude,
      longitude,
      chat_id: this.id,
      message_thread_id: this.threadId,
      ...options,
    });
  }

  sendContact(phoneNumber, firstName, options = {}) {
    return this.client.sendContact({
      phone_number: phoneNumber,
      first_name: firstName,
      chat_id: this.id,
      message_thread_id: this.threadId,
      ...options,
    });
  }

  sendPoll(question, options, other = {}) {
    return this.client.sendPoll({
      question,
      options,
      chat_id: this.id,
      message_thread_id: this.threadId,
      ...other,
    });
  }

  sendDice(emoji, options = {}) {
    return this.client.sendDice({
      emoji,
      chat_id: this.id,
      message_thread_id: this.threadId,
      ...options,
    });
  }

  sendAction(action = "typing") {
    return this.client.sendChatAction({
      action,
      chat_id: this.id,
      message_thread_id: this.threadId,
    });
  }

  sendSticker(sticker, options = {}) {
    return this.client.sendSticker({
      sticker,
      chat_id: this.id,
      message_thread_id: this.threadId,
      ...options,
    });
  }

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

  sendGame(gameShortName, options = {}) {
    return this.client.sendAudio({
      game_short_name: gameShortName,
      chat_id: this.id,
      message_thread_id: this.threadId,
      ...options,
    });
  }
}

module.exports = { Chat };
