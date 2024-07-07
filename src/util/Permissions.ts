type PermissionResolvable =
  | string
  | number
  | Permissions
  | Array<string | number | Permissions>;

class Permissions {
  private allowed: Set<string>;
  private denied: Set<string>;

  constructor(data: Record<string, boolean> = {}) {
    this.allowed = new Set<string>();
    this.denied = new Set<string>();
    this._patch(data);
  }

  allow(permissions: PermissionResolvable): Permissions {
    if (!permissions) return this;
    if (permissions instanceof Permissions) {
      this._patch(permissions.toObject());
      return this;
    }
    if (typeof permissions === "string") permissions = [permissions];

    for (const perm of permissions as (string | number)[]) {
      const flag = this.resolve(perm);
      this.allowed.add(flag);
      this.denied.delete(flag);
    }
    return this;
  }

  deny(permissions: PermissionResolvable): Permissions {
    if (!permissions) return this;
    if (permissions instanceof Permissions) {
      this._patch(permissions.toObject());
      return this;
    }
    if (typeof permissions === "string") permissions = [permissions];

    for (const perm of permissions as (string | number)[]) {
      const flag = this.resolve(perm);
      this.denied.add(flag);
      this.allowed.delete(flag);
    }
    return this;
  }

  has(permission: string | number): boolean {
    const flag = this.resolve(permission);
    return this.allowed.has(flag);
  }

  static isValid(permission: string | number): boolean {
    return (
      Object.keys(Permissions.Flags).includes(permission as string) ||
      Object.values(Permissions.Flags).includes(permission as number)
    );
  }

  resolve(permission: string | number): string {
    if (!Permissions.isValid(permission))
      throw new Error(`Invalid Permission Flag: ${permission}`);
    if (isNaN(permission as number)) return permission as string;
    return Object.keys(Permissions.Flags).find(
      (key) => Permissions.Flags[key] === permission,
    ) as string;
  }

  toApiFormat() {}

  toObject(): Record<string, boolean> {
    const flags: Record<string, boolean> = {};

    for (const flag of Array.from(this.allowed)) {
      flags[flag] = true;
    }
    for (const flag of Array.from(this.denied)) {
      flags[flag] = false;
    }
    return flags;
  }

  private _patch(data: Record<string, boolean>): void {
    for (const flag of Object.keys(Permissions.Flags)) {
      if (data.hasOwnProperty(flag)) {
        if (data[flag] === true) {
          this.allowed.add(flag);
        } else {
          this.denied.add(flag);
        }
      }
    }
  }

  static Flags: Record<string, number> = {
    changeInfo: 1,
    postMessages: 2,
    editMessages: 3,
    deleteMessages: 4,
    inviteUsers: 5,
    restrictMembers: 6,
    pinMessages: 7,
    promoteMembers: 8,
    sendMessages: 9,
    sendMediaMessages: 10,
    sendPolls: 11,
    sendOtherMessages: 12,
    addWebPagePreviews: 13,
    manageVoiceChats: 14,
    beEdited: 15,
    manageChat: 16,
    postStories: 17,
    editStories: 18,
    deleteStories: 19,
    manageTopics: 20,
  };
}

export { Permissions, PermissionResolvable };
