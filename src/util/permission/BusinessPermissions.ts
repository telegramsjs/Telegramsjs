/**
 * Type representing the string literals for user permissions.
 */
type BusinessPermissionString =
  | "canReply"
  | "readMessages"
  | "deleteOutgoingMessages"
  | "deleteAllMessages"
  | "editName"
  | "editBio"
  | "editProfilePhoto"
  | "editUsername"
  | "editStories"
  | "changeGiftSettings"
  | "viewGiftsAndStars"
  | "postMessages"
  | "convertGiftsToStars"
  | "transferAndUpgradeGifts"
  | "transferStars"
  | "manageStories";

/**
 * Interface representing the user permission flags.
 */
interface BusinessPermissionFlags {
  canReply?: boolean;
  readMessages?: boolean;
  deleteOutgoingMessages?: boolean;
  deleteAllMessages?: boolean;
  editName?: boolean;
  editBio?: boolean;
  editProfilePhoto?: boolean;
  editUsername?: boolean;
  editStories?: boolean;
  changeGiftSettings?: boolean;
  viewGiftsAndStars?: boolean;
  postMessages?: boolean;
  convertGiftsToStars?: boolean;
  transferAndUpgradeGifts?: boolean;
  transferStars?: boolean;
  manageStories?: boolean;
}

/**
 * Represents a set of user permissions and provides methods to manage them.
 */
class BusinessPermissions {
  private allowed: Set<BusinessPermissionString>;
  private denied: Set<BusinessPermissionString>;

  /**
   * Constructs a new instance of BusinessPermissions with optional initial data.
   * @param data - An object containing the initial permissions.
   */
  constructor(data: BusinessPermissionFlags = {}) {
    this.allowed = new Set<BusinessPermissionString>();
    this.denied = new Set<BusinessPermissionString>();
    this._patch(data);
  }

  /**
   * Grants the specified permissions.
   * @param permissions - The permissions to grant.
   * @returns The updated BusinessPermissions instance.
   */
  allow(permissions: BusinessPermissionResolvable): BusinessPermissions {
    if (!permissions) return this;

    if (permissions instanceof BusinessPermissions) {
      permissions = permissions.toObject();
    } else if (typeof permissions === "string") {
      permissions = { [permissions]: true };
    }

    for (const [key, value] of Object.entries(permissions)) {
      const perm = key as BusinessPermissionString;
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
   * @returns The updated BusinessPermissions instance.
   */
  deny(permissions: BusinessPermissionResolvable): BusinessPermissions {
    if (!permissions) return this;

    if (permissions instanceof BusinessPermissions) {
      permissions = permissions.toObject();
    } else if (typeof permissions === "string") {
      permissions = { [permissions]: true };
    }

    for (const [key, value] of Object.entries(permissions)) {
      const perm = key as BusinessPermissionString;
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
  has(permission: BusinessPermissionString): boolean {
    return this.allowed.has(permission);
  }

  /**
   * Converts the permissions to a plain object representation.
   * @returns An object with permissions and their status.
   */
  toObject(): BusinessPermissionFlags {
    const flags: BusinessPermissionFlags = {};
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
   * Checks if this instance is equal to another BusinessPermissions instance.
   * @param other - The other instance to compare.
   * @returns `true` if both instances are equal, otherwise `false`.
   */
  equals(other: BusinessPermissions): boolean {
    if (!other || !(other instanceof BusinessPermissions)) return false;

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
  private _patch(data: BusinessPermissionFlags): void {
    for (const [key, value] of Object.entries(data)) {
      if (value) {
        this.allowed.add(key as BusinessPermissionString);
      } else {
        this.denied.add(key as BusinessPermissionString);
      }
    }
  }

  /**
   * Checks if the provided permission is valid.
   * @param permission - The permission to validate.
   * @returns `true` if the permission is valid, otherwise `false`.
   */
  static isValid(permission: string): boolean {
    return Object.keys(BusinessPermissions.Flags).includes(permission);
  }

  /**
   * A mapping of user permission strings to their numeric equivalents.
   */
  static Flags: Record<BusinessPermissionString, number> = {
    canReply: 1,
    readMessages: 2,
    deleteOutgoingMessages: 3,
    deleteAllMessages: 4,
    editName: 5,
    editBio: 6,
    editProfilePhoto: 7,
    editUsername: 8,
    editStories: 9,
    changeGiftSettings: 10,
    viewGiftsAndStars: 11,
    postMessages: 12,
    convertGiftsToStars: 13,
    transferAndUpgradeGifts: 14,
    transferStars: 15,
    manageStories: 16,
  };
}

/**
 * Type representing a value that can be resolved to user permissions.
 */
type BusinessPermissionResolvable =
  | BusinessPermissionString
  | BusinessPermissionFlags
  | BusinessPermissions;

export {
  BusinessPermissions,
  type BusinessPermissionString,
  type BusinessPermissionFlags,
  type BusinessPermissionResolvable,
};
