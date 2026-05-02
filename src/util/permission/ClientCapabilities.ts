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
class ClientCapabilities {
  private allowed: Set<ClientCapabilityString>;
  private denied: Set<ClientCapabilityString>;

  /**
   * Constructs a new instance of ClientCapabilities with optional initial data.
   * @param data - An object containing the initial capabilities.
   */
  constructor(data: ClientCapabilityFlags = {}) {
    this.allowed = new Set<ClientCapabilityString>();
    this.denied = new Set<ClientCapabilityString>();
    this._patch(data);
  }

  /**
   * Grants the specified capabilities.
   * @param capabilities - The capabilities to grant.
   * @returns The updated ClientCapabilities instance.
   */
  allow(capabilities: ClientCapabilityResolvable): ClientCapabilities {
    if (!capabilities) return this;

    if (capabilities instanceof ClientCapabilities) {
      capabilities = capabilities.toObject();
    } else if (typeof capabilities === "string") {
      capabilities = { [capabilities]: true };
    }

    for (const [key, value] of Object.entries(capabilities)) {
      const cap = key as ClientCapabilityString;
      if (value) {
        this.allowed.add(cap);
        this.denied.delete(cap);
      }
    }
    return this;
  }

  /**
   * Denies the specified capabilities.
   * @param capabilities - The capabilities to deny.
   * @returns The updated ClientCapabilities instance.
   */
  deny(capabilities: ClientCapabilityResolvable): ClientCapabilities {
    if (!capabilities) return this;

    if (capabilities instanceof ClientCapabilities) {
      capabilities = capabilities.toObject();
    } else if (typeof capabilities === "string") {
      capabilities = { [capabilities]: true };
    }

    for (const [key, value] of Object.entries(capabilities)) {
      const cap = key as ClientCapabilityString;
      if (value) {
        this.denied.add(cap);
        this.allowed.delete(cap);
      }
    }
    return this;
  }

  /**
   * Checks if the specified capability is granted.
   * @param capability - The capability to check.
   * @returns `true` if the capability is granted, otherwise `false`.
   */
  has(capability: ClientCapabilityString): boolean {
    return this.allowed.has(capability);
  }

  /**
   * Converts the capabilities to a plain object representation.
   * @returns An object with capabilities and their status.
   */
  toObject(): ClientCapabilityFlags {
    const flags: ClientCapabilityFlags = {};
    for (const cap of this.allowed) {
      flags[cap] = true;
    }
    for (const cap of this.denied) {
      if (!flags[cap]) {
        flags[cap] = false;
      }
    }
    return flags;
  }

  /**
   * Checks if this instance is equal to another ClientCapabilities instance.
   * @param other - The other instance to compare.
   * @returns `true` if both instances are equal, otherwise `false`.
   */
  equals(other: ClientCapabilities): boolean {
    if (!other || !(other instanceof ClientCapabilities)) return false;

    const thisAllowed = Array.from(this.allowed).sort();
    const otherAllowed = Array.from(other.allowed).sort();
    const thisDenied = Array.from(this.denied).sort();
    const otherDenied = Array.from(other.denied).sort();

    return (
      thisAllowed.length === otherAllowed.length &&
      thisDenied.length === otherDenied.length &&
      thisAllowed.every((cap, index) => cap === otherAllowed[index]) &&
      thisDenied.every((cap, index) => cap === otherDenied[index])
    );
  }

  /**
   * Updates the capabilities based on the provided data.
   * @param data - An object containing capability states.
   */
  private _patch(data: ClientCapabilityFlags): void {
    for (const [key, value] of Object.entries(data)) {
      if (value) {
        this.allowed.add(key as ClientCapabilityString);
      } else {
        this.denied.add(key as ClientCapabilityString);
      }
    }
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
