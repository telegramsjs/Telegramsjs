/**
 * Abstract base class for managing permissions/capabilities.
 * Provides common functionality for allow/deny operations and equality checks.
 * @template T - The string literal type representing permission/capability names
 * @template F - The flags interface type
 */
abstract class PermissionManager<
  T extends string,
  F extends Partial<Record<T, boolean>>,
> {
  protected allowed: Set<T>;
  protected denied: Set<T>;

  /**
   * Constructs a new instance of PermissionManager with optional initial data.
   * @param data - An object containing the initial permissions/capabilities.
   */
  constructor(data: F = {} as F) {
    this.allowed = new Set<T>();

    this.denied = new Set<T>();

    this._patch(data);
  }

  /**
   * Grants the specified permissions/capabilities.
   * @param items - The permissions/capabilities to grant.
   * @returns The updated instance.
   */
  allow(items: T | F | this): this {
    if (!items) return this;

    let itemsObj: F;

    if (items instanceof PermissionManager) {
      itemsObj = items.toObject();
    } else if (typeof items === "string") {
      itemsObj = { [items]: true } as F;
    } else {
      itemsObj = items as F;
    }

    for (const [key, value] of Object.entries(itemsObj)) {
      const item = key as T;
      if (value) {
        this.allowed.add(item);
        this.denied.delete(item);
      }
    }
    return this;
  }

  /**
   * Denies the specified permissions/capabilities.
   * @param items - The permissions/capabilities to deny.
   * @returns The updated instance.
   */
  deny(items: T | F | this): this {
    if (!items) return this;

    let itemsObj: F;

    if (items instanceof PermissionManager) {
      itemsObj = items.toObject();
    } else if (typeof items === "string") {
      itemsObj = { [items]: true } as F;
    } else {
      itemsObj = items as F;
    }

    for (const [key, value] of Object.entries(itemsObj)) {
      const item = key as T;
      if (value) {
        this.denied.add(item);
        this.allowed.delete(item);
      }
    }
    return this;
  }

  /**
   * Checks if the specified permission/capability is granted.
   * @param item - The permission/capability to check.
   * @returns `true` if the permission/capability is granted, otherwise `false`.
   */
  has(item: T): boolean {
    return this.allowed.has(item);
  }

  /**
   * Converts the permissions/capabilities to a plain object representation.
   * @returns An object with permissions/capabilities and their status.
   */
  toObject(): F {
    const flags = {} as F;
    for (const item of this.allowed) {
      flags[item as keyof F] = true as F[keyof F];
    }
    for (const item of this.denied) {
      if (!flags[item as keyof F]) {
        flags[item as keyof F] = false as F[keyof F];
      }
    }
    return flags;
  }

  /**
   * Checks if this instance is equal to another PermissionManager instance.
   * @param other - The other instance to compare.
   * @returns `true` if both instances are equal, otherwise `false`.
   */
  equals(other: this): boolean {
    if (!other || !(other instanceof PermissionManager)) return false;

    const thisAllowed = Array.from(this.allowed).sort();
    const otherAllowed = Array.from(other.allowed).sort();
    const thisDenied = Array.from(this.denied).sort();
    const otherDenied = Array.from(other.denied).sort();

    return (
      thisAllowed.length === otherAllowed.length &&
      thisDenied.length === otherDenied.length &&
      thisAllowed.every((item, index) => item === otherAllowed[index]) &&
      thisDenied.every((item, index) => item === otherDenied[index])
    );
  }

  /**
   * Updates the permissions/capabilities based on the provided data.
   * @param data - An object containing permission/capability states.
   */
  protected _patch(data: F): void {
    for (const [key, value] of Object.entries(data)) {
      if (value) {
        this.allowed.add(key as T);
      } else {
        this.denied.add(key as T);
      }
    }
  }
}

export { PermissionManager };
