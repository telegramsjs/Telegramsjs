"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPermissions = void 0;
/**
 * Represents a set of user permissions and provides methods to manage them.
 */
class UserPermissions {
    /**
     * Constructs a new instance of UserPermissions with optional initial data.
     * @param data - An object containing the initial permissions.
     */
    constructor(data = {}) {
        Object.defineProperty(this, "allowed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "denied", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.allowed = new Set();
        this.denied = new Set();
        this._patch(data);
    }
    /**
     * Grants the specified permissions.
     * @param permissions - The permissions to grant.
     * @returns The updated UserPermissions instance.
     */
    allow(permissions) {
        if (!permissions)
            return this;
        if (permissions instanceof UserPermissions) {
            permissions = permissions.toObject();
        }
        else if (typeof permissions === "string") {
            permissions = { [permissions]: true };
        }
        for (const [key, value] of Object.entries(permissions)) {
            const perm = key;
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
    deny(permissions) {
        if (!permissions)
            return this;
        if (permissions instanceof UserPermissions) {
            permissions = permissions.toObject();
        }
        else if (typeof permissions === "string") {
            permissions = { [permissions]: true };
        }
        for (const [key, value] of Object.entries(permissions)) {
            const perm = key;
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
    has(permission) {
        return this.allowed.has(permission);
    }
    /**
     * Converts the permissions to a plain object representation.
     * @returns An object with permissions and their status.
     */
    toObject() {
        const flags = {};
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
    _patch(data) {
        for (const [key, value] of Object.entries(data)) {
            if (value) {
                this.allowed.add(key);
            }
            else {
                this.denied.add(key);
            }
        }
    }
    /**
     * Checks if the provided permission is valid.
     * @param permission - The permission to validate.
     * @returns `true` if the permission is valid, otherwise `false`.
     */
    static isValid(permission) {
        return Object.keys(UserPermissions.Flags).includes(permission);
    }
}
exports.UserPermissions = UserPermissions;
/**
 * A mapping of user permission strings to their numeric equivalents.
 */
Object.defineProperty(UserPermissions, "Flags", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: {
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
    }
});
//# sourceMappingURL=UserPermissions.js.map