/**
 * Type representing the string literals for user permissions.
 */
type UserPermissionString = "manageChat" | "deleteMessages" | "manageVideoChats" | "restrictMembers" | "promoteMembers" | "changeInfo" | "inviteUsers" | "postStories" | "editStories" | "deleteStories" | "postMessages" | "editMessages" | "pinMessages" | "manageTopics";
/**
 * Interface representing the user permission flags.
 */
interface UserPermissionFlags {
    manageChat?: boolean;
    deleteMessages?: boolean;
    manageVideoChats?: boolean;
    restrictMembers?: boolean;
    promoteMembers?: boolean;
    changeInfo?: boolean;
    inviteUsers?: boolean;
    postStories?: boolean;
    editStories?: boolean;
    deleteStories?: boolean;
    postMessages?: boolean;
    editMessages?: boolean;
    pinMessages?: boolean;
    manageTopics?: boolean;
}
/**
 * Represents a set of user permissions and provides methods to manage them.
 */
declare class UserPermissions {
    private allowed;
    private denied;
    /**
     * Constructs a new instance of UserPermissions with optional initial data.
     * @param data - An object containing the initial permissions.
     */
    constructor(data?: UserPermissionFlags);
    /**
     * Grants the specified permissions.
     * @param permissions - The permissions to grant.
     * @returns The updated UserPermissions instance.
     */
    allow(permissions: UserPermissionResolvable): UserPermissions;
    /**
     * Denies the specified permissions.
     * @param permissions - The permissions to deny.
     * @returns The updated UserPermissions instance.
     */
    deny(permissions: UserPermissionResolvable): UserPermissions;
    /**
     * Checks if the specified permission is granted.
     * @param permission - The permission to check.
     * @returns `true` if the permission is granted, otherwise `false`.
     */
    has(permission: UserPermissionString): boolean;
    /**
     * Converts the permissions to a plain object representation.
     * @returns An object with permissions and their status.
     */
    toObject(): UserPermissionFlags;
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
     * A mapping of user permission strings to their numeric equivalents.
     */
    static Flags: Record<UserPermissionString, number>;
}
/**
 * Type representing a value that can be resolved to user permissions.
 */
type UserPermissionResolvable = UserPermissionString | UserPermissionFlags | UserPermissions;
export { UserPermissions, type UserPermissionString, type UserPermissionFlags, type UserPermissionResolvable, };
//# sourceMappingURL=UserPermissions.d.ts.map