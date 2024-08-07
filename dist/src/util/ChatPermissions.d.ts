/**
 * Type representing the string literals for chat permissions.
 */
type ChatPermissionString = "isAnonymous" | "sendMessages" | "sendAudios" | "sendDocuments" | "sendPhotos" | "sendVideos" | "sendVideoNotes" | "sendVoiceNotes" | "sendPolls" | "sendOtherMessages" | "addWebPagePreviews" | "changeInfo" | "inviteUsers" | "pinMessages" | "manageTopics";
/**
 * Interface representing the chat permission flags.
 */
interface ChatPermissionFlags {
    isAnonymous?: boolean;
    sendMessages?: boolean;
    sendAudios?: boolean;
    sendDocuments?: boolean;
    sendPhotos?: boolean;
    sendVideos?: boolean;
    sendVideoNotes?: boolean;
    sendVoiceNotes?: boolean;
    sendPolls?: boolean;
    sendOtherMessages?: boolean;
    addWebPagePreviews?: boolean;
    changeInfo?: boolean;
    inviteUsers?: boolean;
    pinMessages?: boolean;
    manageTopics?: boolean;
}
/**
 * Represents a set of chat permissions and provides methods to manage them.
 */
declare class ChatPermissions {
    private allowed;
    private denied;
    /**
     * Constructs a new instance of ChatPermissions with optional initial data.
     * @param data - An object containing the initial permissions.
     */
    constructor(data?: ChatPermissionFlags);
    /**
     * Grants the specified permissions.
     * @param permissions - The permissions to grant.
     * @returns The updated ChatPermissions instance.
     */
    allow(permissions: ChatPermissionResolvable): ChatPermissions;
    /**
     * Denies the specified permissions.
     * @param permissions - The permissions to deny.
     * @returns The updated ChatPermissions instance.
     */
    deny(permissions: ChatPermissionResolvable): ChatPermissions;
    /**
     * Checks if the specified permission is granted.
     * @param permission - The permission to check.
     * @returns `true` if the permission is granted, otherwise `false`.
     */
    has(permission: ChatPermissionString): boolean;
    /**
     * Converts the permissions to a plain object representation.
     * @returns An object with permissions and their status.
     */
    toObject(): ChatPermissionFlags;
    /**
     * Updates the permissions based on the provided data.
     * @param data - An object containing permission states.
     */
    private _patch;
    /**
     * Checks if the provided permission is valid.
     * @param permission - The permission to validate.
     * @returns `true` if the permission is valid, otherwise `false`.
     */
    static isValid(permission: string): boolean;
    /**
     * A mapping of chat permission strings to their numeric equivalents.
     */
    static Flags: Record<ChatPermissionString, number>;
}
/**
 * Type representing a value that can be resolved to chat permissions.
 */
type ChatPermissionResolvable = ChatPermissionString | ChatPermissionFlags | ChatPermissions;
export { ChatPermissions, type ChatPermissionString, type ChatPermissionFlags, type ChatPermissionResolvable, };
//# sourceMappingURL=ChatPermissions.d.ts.map