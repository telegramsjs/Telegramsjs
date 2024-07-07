class ChatAdministratorRights {
  constructor(data) {
    this.anonymous = data.is_anonymous;

    this.canManageChat = data.can_manage_chat;

    this.canDeleteMessages = data.can_delete_messages;

    this.canManageVideoChats = data.can_manage_video_chats;

    this.canRestrictMembers = data.can_restrict_members;

    this.canPromoteMembers = data.can_promote_members;

    this.canChangeInfo = data.can_change_info;

    this.canInviteUsers = data.can_invite_users;

    this.canPostStories = data.can_post_stories;

    this.canEditStories = data.can_edit_stories;

    this.canDeleteStories = data.can_delete_stories;

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
  }
}

module.exports = { ChatAdministratorRights };
