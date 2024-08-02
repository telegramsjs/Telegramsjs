/**
 * Type representing the string literals for chat permissions.
 */
type ChatPermissionString =
  | "isAnonymous"
  | "sendMessages"
  | "sendAudios"
  | "sendDocuments"
  | "sendPhotos"
  | "sendVideos"
  | "sendVideoNotes"
  | "sendVoiceNotes"
  | "sendPolls"
  | "sendOtherMessages"
  | "addWebPagePreviews"
  | "changeInfo"
  | "inviteUsers"
  | "pinMessages"
  | "manageTopics";

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
class ChatPermissions {
  private allowed: Set<ChatPermissionString>;
  private denied: Set<ChatPermissionString>;

  /**
   * Constructs a new instance of ChatPermissions with optional initial data.
   * @param data - An object containing the initial permissions.
   */
  constructor(data: ChatPermissionFlags = {}) {
    this.allowed = new Set<ChatPermissionString>();
    this.denied = new Set<ChatPermissionString>();
    this._patch(data);
  }

  /**
   * Grants the specified permissions.
   * @param permissions - The permissions to grant.
   * @returns The updated ChatPermissions instance.
   */
  allow(permissions: ChatPermissionResolvable): ChatPermissions {
    if (!permissions) return this;

    if (permissions instanceof ChatPermissions) {
      permissions = permissions.toObject();
    } else if (typeof permissions === "string") {
      permissions = { [permissions]: true };
    }

    for (const [key, value] of Object.entries(permissions)) {
      const perm = key as ChatPermissionString;
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
   * @returns The updated ChatPermissions instance.
   */
  deny(permissions: ChatPermissionResolvable): ChatPermissions {
    if (!permissions) return this;

    if (permissions instanceof ChatPermissions) {
      permissions = permissions.toObject();
    } else if (typeof permissions === "string") {
      permissions = { [permissions]: true };
    }

    for (const [key, value] of Object.entries(permissions)) {
      const perm = key as ChatPermissionString;
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
  has(permission: ChatPermissionString): boolean {
    return this.allowed.has(permission);
  }

  /**
   * Converts the permissions to a plain object representation.
   * @returns An object with permissions and their status.
   */
  toObject(): ChatPermissionFlags {
    const flags: ChatPermissionFlags = {};
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
   * Updates the permissions based on the provided data.
   * @param data - An object containing permission states.
   */
  private _patch(data: ChatPermissionFlags): void {
    for (const [key, value] of Object.entries(data)) {
      if (value) {
        this.allowed.add(key as ChatPermissionString);
      } else {
        this.denied.add(key as ChatPermissionString);
      }
    }
  }

  /**
   * Checks if the provided permission is valid.
   * @param permission - The permission to validate.
   * @returns `true` if the permission is valid, otherwise `false`.
   */
  static isValid(permission: string): boolean {
    return Object.keys(ChatPermissions.Flags).includes(permission);
  }

  /**
   * A mapping of chat permission strings to their numeric equivalents.
   */
  static Flags: Record<ChatPermissionString, number> = {
    sendMessages: 1,
    sendAudios: 2,
    sendDocuments: 3,
    sendPhotos: 4,
    sendVideos: 5,
    sendVideoNotes: 6,
    sendVoiceNotes: 7,
    sendPolls: 8,
    sendOtherMessages: 9,
    addWebPagePreviews: 10,
    changeInfo: 11,
    inviteUsers: 12,
    pinMessages: 13,
    manageTopics: 14,
    isAnonymous: 15,
  };
}

/**
 * Type representing a value that can be resolved to chat permissions.
 */
type ChatPermissionResolvable =
  | ChatPermissionString
  | ChatPermissionFlags
  | ChatPermissions;

export {
  ChatPermissions,
  type ChatPermissionString,
  type ChatPermissionFlags,
  type ChatPermissionResolvable,
};
