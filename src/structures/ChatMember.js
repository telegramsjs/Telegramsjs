const { Base } = require("./Base");
const { User } = require("./User");
const { Chat } = require("./Chat");
const { ChatInviteLink } = require("./chat/ChatInviteLink");
const { Permissions } = require("../util/Permissions");

class ChatMember extends Base {
  constructor(client, chatId, data) {
    super(client, data);

    this.chatId = chatId;

    this.status = data.status;

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

    if ("can_be_edited" in data) {
      this.canBeEdited = data.can_be_edited;
    }

    if ("can_manage_chat" in data) {
      this.canManageChat = data.can_manage_chat;
    }

    if ("can_delete_messages" in data) {
      this.canDeleteMessages = data.can_delete_messages;
    }

    if ("can_manage_video_chats" in data) {
      this.canManageVideoChats = data.can_manage_video_chats;
    }

    if ("can_restrict_members" in data) {
      this.canRestrictMembers = data.can_restrict_members;
    }

    if ("can_promote_members" in data) {
      this.canPromoteMembers = data.can_promote_members;
    }

    if ("can_change_info" in data) {
      this.canChangeInfo = data.can_change_info;
    }

    if ("can_invite_users" in data) {
      this.canInviteUsers = data.can_invite_users;
    }

    if ("can_post_stories" in data) {
      this.canPostStories = data.can_post_stories;
    }

    if ("can_edit_stories" in data) {
      this.canEditStories = data.can_edit_stories;
    }

    if ("can_delete_stories" in data) {
      this.canDeleteStories = data.can_delete_stories;
    }

    if ("can_post_messages" in data) {
      this.canPostMessages = data.can_post_messages;
    }

    if ("can_edit_messages" in data) {
      this.canEditMessages = data.can_edit_messages;
    }

    if ("can_pin_messages" in data) {
      this.canPinMessages = data.can_pin_messages;
    }

    if ("can_manage_topics" in data) {
      this.canManageTopics = data.can_manage_topics;
    }

    if ("can_send_messages" in data) {
      this.canSendMessages = data.can_send_messages;
    }

    if ("can_send_audios" in data) {
      this.canSendAudios = data.can_send_audios;
    }

    if ("can_send_documents" in data) {
      this.canSendDocuments = data.can_send_documents;
    }

    if ("can_send_photos" in data) {
      this.canSendPhotos = data.can_send_photos;
    }

    if ("can_send_videos" in data) {
      this.canSendVideos = data.can_send_videos;
    }

    if ("can_send_video_notes" in data) {
      this.canSendVideoNotes = data.can_send_video_notes;
    }

    if ("can_send_voice_notes" in data) {
      this.canSendVoiceNotes = data.can_send_voice_notes;
    }

    if ("can_send_polls" in data) {
      this.canSendPolls = data.can_send_polls;
    }

    if ("can_send_other_messages" in data) {
      this.canSendOtherMessages = data.can_send_other_messages;
    }

    if ("can_add_web_page_previews" in data) {
      this.canAddWebPagePreviews = data.can_add_web_page_previews;
    }

    if ("chat" in data) {
      this.chat = new Chat(this.client, data.chat);
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
      permissions: permissions.toObject(persm),
      ...options,
    });
  }

  promote(persm, isAnonymous) {
    const permissions = new Permissions();

    return this.client.promoteChatMember({
      chat_id: this.chatId,
      userId: this.user.id,
      is_anonymous: isAnonymous,
      ...permissions.toObject(perms),
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
