import { type ChatPermissionFlags } from "./ChatPermissions";
import { type UserPermissionFlags } from "./UserPermissions";
/**
 * A map of API flags and their corresponding values.
 */
declare const ApiPermissionsFlags: {
    readonly changeInfo: "can_change_info";
    readonly postMessages: "can_post_messages";
    readonly editMessages: "can_edit_messages";
    readonly deleteMessages: "can_delete_messages";
    readonly inviteUsers: "can_invite_users";
    readonly restrictMembers: "can_restrict_members";
    readonly pinMessages: "can_pin_messages";
    readonly promoteMembers: "can_promote_members";
    readonly sendMessages: "can_send_messages";
    readonly sendMediaMessages: "can_send_media_messages";
    readonly sendPolls: "can_send_polls";
    readonly sendOtherMessages: "can_send_other_messages";
    readonly addWebPagePreviews: "can_add_web_page_previews";
    readonly manageVoiceChats: "can_manage_voice_chats";
    readonly beEdited: "can_be_edited";
    readonly manageChat: "can_manage_chat";
    readonly postStories: "can_post_stories";
    readonly editStories: "can_edit_stories";
    readonly deleteStories: "can_delete_stories";
    readonly manageTopics: "can_manage_topics";
};
/**
 * Converts the permission object to the API format.
 * @param permission - The permission object to convert.
 * @returns The API-compatible permission object.
 * @throws {TelegramError} If the permission flags are invalid.
 */
declare function toApiFormat(permission: ChatPermissionFlags | UserPermissionFlags | Record<string, boolean>): Record<(typeof ApiPermissionsFlags)[keyof typeof ApiPermissionsFlags], boolean>;
export { ApiPermissionsFlags, toApiFormat };
//# sourceMappingURL=ApiPermissions.d.ts.map