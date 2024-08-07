"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatPermissions = void 0;
/**
 * Represents a set of chat permissions and provides methods to manage them.
 */
class ChatPermissions {
    /**
     * Constructs a new instance of ChatPermissions with optional initial data.
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
     * @returns The updated ChatPermissions instance.
     */
    allow(permissions) {
        if (!permissions)
            return this;
        if (permissions instanceof ChatPermissions) {
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
     * @returns The updated ChatPermissions instance.
     */
    deny(permissions) {
        if (!permissions)
            return this;
        if (permissions instanceof ChatPermissions) {
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
        return Object.keys(ChatPermissions.Flags).includes(permission);
    }
}
exports.ChatPermissions = ChatPermissions;
/**
 * A mapping of chat permission strings to their numeric equivalents.
 */
Object.defineProperty(ChatPermissions, "Flags", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: {
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
    }
});
//# sourceMappingURL=ChatPermissions.js.map