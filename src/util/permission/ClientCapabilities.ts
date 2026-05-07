import { PermissionManager } from "./PermissionManager";

/**
 * Type representing the string literals for bot capabilities.
 */
type ClientCapabilityString =
  | "joinGroups"
  | "readAllMessages"
  | "inlineQueries"
  | "connectBusiness"
  | "mainWebApp"
  | "topicsEnabled"
  | "userTopicCreation"
  | "manageBots";

/**
 * Interface representing the bot capability flags.
 */
interface ClientCapabilityFlags {
  joinGroups?: boolean;
  readAllMessages?: boolean;
  inlineQueries?: boolean;
  connectBusiness?: boolean;
  mainWebApp?: boolean;
  topicsEnabled?: boolean;
  userTopicCreation?: boolean;
  manageBots?: boolean;
}

/**
 * Represents a set of bot capabilities and provides methods to manage them.
 */
class ClientCapabilities extends PermissionManager<
  ClientCapabilityString,
  ClientCapabilityFlags
> {
  /**
   * Constructs a new instance of ClientCapabilities with optional initial data.
   * @param data - An object containing the initial capabilities.
   */
  constructor(data: ClientCapabilityFlags = {}) {
    super(data);
  }

  /**
   * Checks if the provided capability is valid.
   * @param capability - The capability to validate.
   * @returns `true` if the capability is valid, otherwise `false`.
   */
  static isValid(capability: string): boolean {
    return Object.keys(ClientCapabilities.Flags).includes(capability);
  }

  /**
   * A mapping of bot capability strings to their numeric equivalents.
   */
  static Flags: Record<ClientCapabilityString, number> = {
    joinGroups: 1,
    readAllMessages: 2,
    inlineQueries: 3,
    connectBusiness: 4,
    mainWebApp: 5,
    topicsEnabled: 6,
    userTopicCreation: 7,
    manageBots: 8,
  };
}

/**
 * Type representing a value that can be resolved to bot capabilities.
 */
type ClientCapabilityResolvable =
  | ClientCapabilityString
  | ClientCapabilityFlags
  | ClientCapabilities;

export {
  ClientCapabilities,
  type ClientCapabilityString,
  type ClientCapabilityFlags,
  type ClientCapabilityResolvable,
};
