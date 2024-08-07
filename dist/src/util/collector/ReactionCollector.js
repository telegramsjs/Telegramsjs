"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollector = void 0;
const Constants_1 = require("../Constants");
const collection_1 = require("@telegram.ts/collection");
const Collector_1 = require("./Collector");
/**
 * Collector class for handling message reactions in a specific chat.
 */
class ReactionCollector extends Collector_1.Collector {
    /**
     * Creates an instance of ReactionCollector.
     * @param client - The TelegramClient instance.
     * @param reaction - The initial message context.
     * @param options - The options for the collector.
     */
    constructor(client, reaction, options = {}) {
        super(options);
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: client
        });
        Object.defineProperty(this, "reaction", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: reaction
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
        /**
         * The chat in which reactions are being collected.
         */
        Object.defineProperty(this, "chat", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The number of received reactions.
         */
        Object.defineProperty(this, "received", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        /**
         * Collection of users and their reactions.
         */
        Object.defineProperty(this, "users", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new collection_1.Collection()
        });
        this.chat = reaction.chat;
        client.incrementMaxListeners();
        client.on(Constants_1.Events.MessageReaction, this.handleCollect);
        this.once("end", () => {
            client.off(Constants_1.Events.MessageReaction, this.handleCollect);
            client.decrementMaxListeners();
        });
    }
    /**
     * Registers an event listener for reaction events.
     * @param event - The event name.
     * @param listener - The event listener.
     * @returns The current instance of ReactionCollector.
     */
    on(event, listener) {
        super.on(event, listener);
        return this;
    }
    /**
     * Registers a one-time event listener for reaction events.
     * @param event - The event name.
     * @param listener - The event listener.
     * @returns The current instance of ReactionCollector.
     */
    once(event, listener) {
        super.once(event, listener);
        return this;
    }
    /**
     * Collects a reaction.
     * @param reaction - The reaction context.
     * @returns The key of the reaction or null.
     */
    collect(reaction) {
        const { chat, added, removed } = reaction;
        const isReactionInCorrectChat = this.chat.id === chat.id;
        const hasNewOrOldReaction = (added === null || added === void 0 ? void 0 : added.length) > 0 || (removed === null || removed === void 0 ? void 0 : removed.length) > 0;
        if (!isReactionInCorrectChat || !hasNewOrOldReaction) {
            return null;
        }
        this.received++;
        this.handleUsers(reaction);
        return ReactionCollector.getKeyFromReaction(added.shift() || removed.shift());
    }
    /**
     * Disposes of a reaction.
     * @param reaction - The reaction context.
     * @returns The key of the reaction or null.
     */
    dispose(reaction) {
        const { chat, added, removed } = reaction;
        const isReactionInCorrectChat = this.chat.id === chat.id;
        const hasNewOrOldReaction = (added === null || added === void 0 ? void 0 : added.length) > 0 || (removed === null || removed === void 0 ? void 0 : removed.length) > 0;
        if (isReactionInCorrectChat && hasNewOrOldReaction) {
            return ReactionCollector.getKeyFromReaction(added.shift() || removed.shift());
        }
        else {
            return null;
        }
    }
    /**
     * Handles users' reactions.
     * @param reaction - The reaction context.
     */
    handleUsers(reaction) {
        var _a;
        if (!((_a = reaction.user) === null || _a === void 0 ? void 0 : _a.id))
            return;
        if (!this.users.has(reaction.user.id)) {
            if (this.users.size === 0) {
                this.emit("create", reaction);
            }
            this.users.set(reaction.user.id, reaction);
            return;
        }
        const getUser = this.users.get(reaction.user.id) || {};
        const setUser = Array.isArray(getUser) ? [...getUser] : [getUser];
        this.emit("user", new collection_1.Collection([[reaction.user.id, [...setUser, reaction]]]));
        this.users.set(reaction.user.id, [...setUser, reaction]);
        return;
    }
    /**
     * Gets the reason for ending the collector.
     * @returns The reason for ending the collector or null.
     */
    get endReason() {
        const { max, maxProcessed } = this.options;
        if (max && this.collected.size >= max) {
            return "limit";
        }
        if (maxProcessed && this.received === maxProcessed) {
            return "processedLimit";
        }
        return super.endReason;
    }
    /**
     * Gets the key from a reaction.
     * @param reaction - The reaction types.
     * @returns The key of the reaction or null.
     */
    static getKeyFromReaction(reaction) {
        if (!reaction) {
            return null;
        }
        if (reaction.isEmoji()) {
            return reaction.emoji || null;
        }
        else if (reaction.isCustomEmoji()) {
            return reaction.customEmoji || null;
        }
        else {
            return null;
        }
    }
}
exports.ReactionCollector = ReactionCollector;
//# sourceMappingURL=ReactionCollector.js.map