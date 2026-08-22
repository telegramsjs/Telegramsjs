import { PermissionManager } from "./PermissionManager";

/**
 * Type representing the string literals for chat permissions.
 */
type ChatPermissionString =
  | "isAnonymous"
  | "editTag"
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
  | "manageTopics"
  | "manageTags"
  | "reactToMessages"
  | "manageDirectMessages";

/**
 * Interface representing the chat permission flags.
 */
interface ChatPermissionFlags {
  isAnonymous?: boolean;
  editTag?: boolean;
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
  manageTags?: boolean;
  reactToMessages?: boolean;
  manageDirectMessages?: boolean;
}

/**
 * Represents a set of chat permissions and provides methods to manage them.
 */
class ChatPermissions extends PermissionManager<
  ChatPermissionString,
  ChatPermissionFlags
> {
  /**
   * Constructs a new instance of ChatPermissions with optional initial data.
   * @param data - An object containing the initial permissions.
   */
  constructor(data: ChatPermissionFlags = {}) {
    super(data);
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
    manageTags: 15,
    reactToMessages: 16,
    manageDirectMessages: 17,
    isAnonymous: 18,
    editTag: 19,
  };
}

/**
 * Type representing a value that can be resolved to chat permissions.
 */
type ChatPermissionResolvable =
  ChatPermissionString | ChatPermissionFlags | ChatPermissions;

export {
  ChatPermissions,
  type ChatPermissionString,
  type ChatPermissionFlags,
  type ChatPermissionResolvable,
};
