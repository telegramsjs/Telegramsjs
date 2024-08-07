"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiPermissionsFlags = void 0;
exports.toApiFormat = toApiFormat;
/**
 * A map of API flags and their corresponding values.
 */
const ApiPermissionsFlags = {
    changeInfo: "can_change_info",
    postMessages: "can_post_messages",
    editMessages: "can_edit_messages",
    deleteMessages: "can_delete_messages",
    inviteUsers: "can_invite_users",
    restrictMembers: "can_restrict_members",
    pinMessages: "can_pin_messages",
    promoteMembers: "can_promote_members",
    sendMessages: "can_send_messages",
    sendMediaMessages: "can_send_media_messages",
    sendPolls: "can_send_polls",
    sendOtherMessages: "can_send_other_messages",
    addWebPagePreviews: "can_add_web_page_previews",
    manageVoiceChats: "can_manage_voice_chats",
    beEdited: "can_be_edited",
    manageChat: "can_manage_chat",
    postStories: "can_post_stories",
    editStories: "can_edit_stories",
    deleteStories: "can_delete_stories",
    manageTopics: "can_manage_topics",
};
exports.ApiPermissionsFlags = ApiPermissionsFlags;
/**
 * Converts the permission object to the API format.
 * @param permission - The permission object to convert.
 * @returns The API-compatible permission object.
 * @throws {TelegramError} If the permission flags are invalid.
 */
function toApiFormat(permission) {
    const flags = {};
    for (const [key, value] of Object.entries(permission)) {
        const apiFlags = ApiPermissionsFlags[key];
        if (apiFlags) {
            flags[apiFlags] = value;
        }
    }
    return flags;
}
//# sourceMappingURL=ApiPermissions.js.map