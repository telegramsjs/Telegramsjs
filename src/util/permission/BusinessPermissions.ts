import { PermissionManager } from "./PermissionManager";

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
class BusinessPermissions extends PermissionManager<
  BusinessPermissionString,
  BusinessPermissionFlags
> {
  /**
   * Constructs a new instance of BusinessPermissions with optional initial data.
   * @param data - An object containing the initial permissions.
   */
  constructor(data: BusinessPermissionFlags = {}) {
    super(data);
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
