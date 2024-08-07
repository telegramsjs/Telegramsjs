"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageCollector = void 0;
const Constants_1 = require("../Constants");
const TelegramError_1 = require("../../errors/TelegramError");
const Collector_1 = require("./Collector");
/**
 * Collector class for handling messages in a specific chat.
 */
class MessageCollector extends Collector_1.Collector {
    /**
     * Creates an instance of MessageCollector.
     * @param client - The TelegramClient instance.
     * @param message - The initial message context.
     * @param options - The options for the collector.
     */
    constructor(client, message, options = {}) {
        super(options);
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: client
        });
        Object.defineProperty(this, "message", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: message
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
        /**
         * The chat in which messages are being collected.
         */
        Object.defineProperty(this, "chat", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The number of received messages.
         */
        Object.defineProperty(this, "received", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        if (!message.chat) {
            throw new TelegramError_1.TelegramError("Could not find the chat where this message came from in the cache!");
        }
        this.chat = message.chat;
        client.incrementMaxListeners();
        client.on(Constants_1.Events.Message, this.handleCollect);
        this.once("end", () => {
            client.off(Constants_1.Events.Message, this.handleCollect);
            client.decrementMaxListeners();
        });
    }
    /**
     * Collects a message.
     * @param message - The message context.
     * @returns The ID of the message or null.
     */
    collect(message) {
        var _a;
        if (((_a = message.chat) === null || _a === void 0 ? void 0 : _a.id) !== this.chat.id)
            return null;
        this.received++;
        return message.id;
    }
    /**
     * Disposes of a message.
     * @param message - The message context.
     * @returns The ID of the message or null.
     */
    dispose(message) {
        var _a;
        return ((_a = message.chat) === null || _a === void 0 ? void 0 : _a.id) === this.chat.id ? message.id : null;
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
}
exports.MessageCollector = MessageCollector;
//# sourceMappingURL=MessageCollector.js.map