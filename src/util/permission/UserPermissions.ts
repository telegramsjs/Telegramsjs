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
  manageDirectMessages?: boolean;
}

/**
 * Represents a set of user permissions and provides methods to manage them.
 */
class UserPermissions {
  private allowed: Set<UserPermissionString>;
  private denied: Set<UserPermissionString>;

  /**
   * Constructs a new instance of UserPermissions with optional initial data.
   * @param data - An object containing the initial permissions.
   */
  constructor(data: UserPermissionFlags = {}) {
    this.allowed = new Set<UserPermissionString>();
    this.denied = new Set<UserPermissionString>();
    this._patch(data);
  }

  /**
   * Grants the specified permissions.
   * @param permissions - The permissions to grant.
   * @returns The updated UserPermissions instance.
   */
  allow(permissions: UserPermissionResolvable): UserPermissions {
    if (!permissions) return this;

    if (permissions instanceof UserPermissions) {
      permissions = permissions.toObject();
    } else if (typeof permissions === "string") {
      permissions = { [permissions]: true };
    }

    for (const [key, value] of Object.entries(permissions)) {
      const perm = key as UserPermissionString;
      if (value) {
        this.allowed.add(perm);
        this.denied.delete(perm);
      }
    }
    return this;
  }

  /**
   * Denies the specified permissions.
   * @param permissions - The permissions to deny.
   * @returns The updated UserPermissions instance.
   */
  deny(permissions: UserPermissionResolvable): UserPermissions {
    if (!permissions) return this;

    if (permissions instanceof UserPermissions) {
      permissions = permissions.toObject();
    } else if (typeof permissions === "string") {
      permissions = { [permissions]: true };
    }

    for (const [key, value] of Object.entries(permissions)) {
      const perm = key as UserPermissionString;
      if (value) {
        this.denied.add(perm);
        this.allowed.delete(perm);
      }
    }
    return this;
  }

  /**
   * Checks if the specified permission is granted.
   * @param permission - The permission to check.
   * @returns `true` if the permission is granted, otherwise `false`.
   */
  has(permission: UserPermissionString): boolean {
    return this.allowed.has(permission);
  }

  /**
   * Converts the permissions to a plain object representation.
   * @returns An object with permissions and their status.
   */
  toObject(): UserPermissionFlags {
    const flags: UserPermissionFlags = {};
    for (const perm of this.allowed) {
      flags[perm] = true;
    }
    for (const perm of this.denied) {
      if (!flags[perm]) {
        flags[perm] = false;
      }
    }
    return flags;
  }

  /**
   * Checks if this instance is equal to another UserPermissions instance.
   * @param other - The other instance to compare.
   * @returns `true` if both instances are equal, otherwise `false`.
   */
  equals(other: UserPermissions): boolean {
    if (!other || !(other instanceof UserPermissions)) return false;

    const thisAllowed = Array.from(this.allowed).sort();
    const otherAllowed = Array.from(other.allowed).sort();
    const thisDenied = Array.from(this.denied).sort();
    const otherDenied = Array.from(other.denied).sort();

    return (
      thisAllowed.length === otherAllowed.length &&
      thisDenied.length === otherDenied.length &&
      thisAllowed.every((perm, index) => perm === otherAllowed[index]) &&
      thisDenied.every((perm, index) => perm === otherDenied[index])
    );
  }

  /**
   * Updates the permissions based on the provided data.
   * @param data - An object containing permission states.
   */
  private _patch(data: UserPermissionFlags): void {
    for (const [key, value] of Object.entries(data)) {
      if (value) {
        this.allowed.add(key as UserPermissionString);
      } else {
        this.denied.add(key as UserPermissionString);
      }
    }
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
    manageDirectMessages: 15,
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
