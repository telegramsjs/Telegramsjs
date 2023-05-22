/**
 * An object containing group permissions.
 * @typedef {Object} GroupPermission
 * @property {string} CanManageChat - Specifies if users can manage the group.
 * @property {string} CanChangeInfo - Specifies if users can change group information.
 * @property {string} CanDeleteMessages - Specifies if users can delete messages.
 * @property {string} CanInviteUsers - Specifies if users can invite other users to the group.
 * @property {string} CanRestrictMembers - Specifies if users can restrict group members.
 * @property {string} CanPinMessages - Specifies if users can pin messages.
 * @property {string} CanManageTopics - Specifies if users can manage group topics.
 * @property {string} CanPromoteMembers - Specifies if users can promote members.
 * @property {string} CanManageVideoChats - Specifies if users can manage video groups.
 * @property {string} CanManageVoiceChats - Specifies if users can manage voice groups.
 */

const GroupPermission = {
  CanManageChat: 'can_manage_chat',
  CanChangeInfo: 'can_change_info',
  CanDeleteMessages: 'can_delete_messages',
  CanInviteUsers: 'can_invite_users',
  CanRestrictMembers: 'can_restrict_members',
  CanPinMessages: 'can_pin_messages',
  CanManageTopics: 'can_manage_topics',
  CanPromoteMembers: 'can_promote_members',
  CanManageVideoChats: 'can_manage_video_chats',
  CanManageVoiceChats: 'can_manage_voice_chats',
};

module.exports = GroupPermission;