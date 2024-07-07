const { Permissions } = require("../../util/Permissions");

class ChatAdministratorRights {
  constructor(data) {
    this.anonymous = data.is_anonymous;

    const permissions = {};

    permissions.manageChat = data.can_manage_chat;

    permissions.deleteMessages = data.can_delete_messages;

    permissions.manageVideoChats = data.can_manage_video_chats;

    permissions.restrictMembers = data.can_restrict_members;

    permissions.promoteMembers = data.can_promote_members;

    permissions.changeInfo = data.can_change_info;

    permissions.inviteUsers = data.can_invite_users;

    permissions.postStories = data.can_post_stories;

    permissions.editStories = data.can_edit_stories;

    permissions.deleteStories = data.can_delete_stories;

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

    this.permissions = new Permissions(permissions);
  }
}

module.exports = { ChatAdministratorRights };