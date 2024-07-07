type PermissionResolvable =
  | string
  | number
  | Permissions
  | Array<string | number | Permissions>;

function toSnakeCase(str: string) {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

function convertKeysToSnakeCase(obj: Record<string, boolean>) {
  const newObj: Record<string, boolean> = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const snakeCaseKey = toSnakeCase(key);
      newObj[snakeCaseKey] = obj[key];
    }
  }
  return newObj;
}

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

  toObject(permission?: Record<string, boolean>): Record<string, boolean> {
    const flags: Record<string, boolean> = {};

    if (!permission) {
      for (const flag of Array.from(this.allowed).map((flag) =>
        toSnakeCase(flag),
      )) {
        flags[flag] = true;
      }
      for (const flag of Array.from(this.denied).map((flag) =>
        toSnakeCase(flag),
      )) {
        flags[flag] = false;
      }
      return flags;
    }

    return convertKeysToSnakeCase(flags);
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
    canPostMessages: 1,
    canSendMessages: 2,
    canSendMediaMessages: 3,
    canSendPolls: 4,
    canSendOtherMessages: 5,
    canAddWebPagePreviews: 6,
    canInviteUsers: 7,
    canPinMessages: 8,
    canEditMessages: 9,
    canDeleteMessages: 10,
    canRestrictMembers: 11,
    canPromoteMembers: 12,
    canChangeInfo: 13,
  };
}

export { Permissions, PermissionResolvable };
