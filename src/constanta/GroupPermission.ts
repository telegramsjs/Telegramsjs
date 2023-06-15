type GroupPermission = {
  CanManageChat: string;
  CanChangeInfo: string;
  CanDeleteMessages: string;
  CanInviteUsers: string;
  CanRestrictMembers: string;
  CanPinMessages: string;
  CanManageTopics: string;
  CanPromoteMembers: string;
  CanManageVideoChats: string;
  CanManageVoiceChats: string;
};

export const GroupPermission: GroupPermission = {
  CanManageChat: "can_manage_chat",
  CanChangeInfo: "can_change_info",
  CanDeleteMessages: "can_delete_messages",
  CanInviteUsers: "can_invite_users",
  CanRestrictMembers: "can_restrict_members",
  CanPinMessages: "can_pin_messages",
  CanManageTopics: "can_manage_topics",
  CanPromoteMembers: "can_promote_members",
  CanManageVideoChats: "can_manage_video_chats",
  CanManageVoiceChats: "can_manage_voice_chats",
};
