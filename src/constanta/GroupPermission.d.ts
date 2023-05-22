export = GroupPermission;
declare namespace GroupPermission {
    export { GroupPermission };
}
/**
 * An object containing group permissions.
 */
type GroupPermission = {
    /**
     * - Specifies if users can manage the group.
     */
    CanManageChat: string;
    /**
     * - Specifies if users can change group information.
     */
    CanChangeInfo: string;
    /**
     * - Specifies if users can delete messages.
     */
    CanDeleteMessages: string;
    /**
     * - Specifies if users can invite other users to the group.
     */
    CanInviteUsers: string;
    /**
     * - Specifies if users can restrict group members.
     */
    CanRestrictMembers: string;
    /**
     * - Specifies if users can pin messages.
     */
    CanPinMessages: string;
    /**
     * - Specifies if users can manage group topics.
     */
    CanManageTopics: string;
    /**
     * - Specifies if users can promote members.
     */
    CanPromoteMembers: string;
    /**
     * - Specifies if users can manage video groups.
     */
    CanManageVideoChats: string;
    /**
     * - Specifies if users can manage voice groups.
     */
    CanManageVoiceChats: string;
};
