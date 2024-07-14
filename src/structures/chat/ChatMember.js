const { Base } = require("../Base");
const { User } = require("../misc/User");
const { ChatInviteLink } = require("./ChatInviteLink");
const { Permissions } = require("../../util/Permissions");

class ChatMember extends Base {
  constructor(client, chatId, data) {
    super(client, data);

    this.chatId = chatId;

    this.status = data.status || null;

    this._patch(data);
  }

  _patch(data) {
    if ("user" in data) {
      this.user = new User(this.client, data.user);
    }

    if ("is_anonymous" in data) {
      this.anonymous = data.is_anonymous;
    }

    if ("custom_title" in data) {
      this.nickName = data.custom_title;
    }

    if ("is_member" in data) {
      this.isMember = data.is_member;
    }

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

    this.permissions = new Permissions(permissions);

    if ("chat" in data) {
      this.chat = this.client.chats._add(data.chat);
    }

    if ("from" in data) {
      this.author = new User(this.client, data.from);
    }

    if ("bio" in data) {
      this.bio = data.bio;
    }

    if ("invite_link" in data) {
      this.link = new ChatInviteLink(this.client, data.invite_link);
    }

    if ("date" in data) {
      this.requestedTimestamp = data.date;
    }

    if ("user_chat_id" in data) {
      this.userChatId = data.user_chat_id;
    }

    if ("until_date" in data) {
      this.restrictedTimestamp = data.until_date;
    }
  }

  get restrictedAt() {
    return new Date(this.restrictedTimestamp);
  }

  get requestedAt() {
    return new Date(this.requestedTimestamp);
  }

  restrict(perms, options = {}) {
    const permissions = new Permissions();

    return this.client.restrictChatMember({
      user_id: this.user.id,
      permissions: permissions.toApiFormat(permissions.toObject()),
      ...options,
    });
  }

  promote(persm, isAnonymous) {
    const permissions = new Permissions();

    return this.client.promoteChatMember({
      chat_id: this.chatId,
      userId: this.user.id,
      is_anonymous: isAnonymous,
      ...permissions.toApiFormat(permissions.toObject()),
    });
  }

  setNikeName(name) {
    return this.client.setChatAdministratorCustomTitle({
      chat_id: this.chatId,
      user_id: this.user.id,
      custom_title: name,
    });
  }
}

module.exports = { ChatMember };
