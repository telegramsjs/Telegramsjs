import { PermissionManager } from "./PermissionManager";

/**
 * Type representing the string literals for user permissions.
 */
type UserPermissionString =
  | "manageChat"
  | "deleteMessages"
  | "manageVideoChats"
  | "restrictMembers"
  | "promoteMembers"
  | "changeInfo"
  | "inviteUsers"
  | "postStories"
  | "editStories"
  | "deleteStories"
  | "postMessages"
  | "editMessages"
  | "pinMessages"
  | "manageTopics"
  | "manageTags"
  | "manageDirectMessages";

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
  manageTags?: boolean;
  manageDirectMessages?: boolean;
}

/**
 * Represents a set of user permissions and provides methods to manage them.
 */
class UserPermissions extends PermissionManager<
  UserPermissionString,
  UserPermissionFlags
> {
  /**
   * Constructs a new instance of UserPermissions with optional initial data.
   * @param data - An object containing the initial permissions.
   */
  constructor(data: UserPermissionFlags = {}) {
    super(data);
  }

  /**
   * Checks if the provided permission is valid.
   * @param permission - The permission to validate.
   * @returns `true` if the permission is valid, otherwise `false`.
   */
  static isValid(permission: string): boolean {
    return Object.keys(UserPermissions.Flags).includes(permission);
  }

  /**
   * A mapping of user permission strings to their numeric equivalents.
   */
  static Flags: Record<UserPermissionString, number> = {
    manageChat: 1,
    deleteMessages: 2,
    manageVideoChats: 3,
    restrictMembers: 4,
    promoteMembers: 5,
    changeInfo: 6,
    inviteUsers: 7,
    postStories: 8,
    editStories: 9,
    deleteStories: 10,
    postMessages: 11,
    editMessages: 12,
    pinMessages: 13,
    manageTopics: 14,
    manageTags: 15,
    manageDirectMessages: 16,
  };
}

/**
 * Type representing a value that can be resolved to user permissions.
 */
type UserPermissionResolvable =
  | UserPermissionString
  | UserPermissionFlags
  | UserPermissions;

export {
  UserPermissions,
  type UserPermissionString,
  type UserPermissionFlags,
  type UserPermissionResolvable,
};
