"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InlineKeyboardCollector = void 0;
const Constants_1 = require("../Constants");
const Collector_1 = require("./Collector");
/**
 * Collector class for handling inline keyboard callback queries.
 */
class InlineKeyboardCollector extends Collector_1.Collector {
    /**
     * Creates an instance of InlineKeyboardCollector.
     * @param client - The TelegramClient instance.
     * @param options - The options for the collector.
     */
    constructor(client, options = {}) {
        super(options);
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: client
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
        /**
         * The number of received callback queries.
         */
        Object.defineProperty(this, "received", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        client.incrementMaxListeners();
        client.on(Constants_1.Events.CallbackQuery, this.handleCollect);
        this.once("end", () => {
            client.off(Constants_1.Events.CallbackQuery, this.handleCollect);
            client.decrementMaxListeners();
        });
    }
    /**
     * Collects the callback query.
     * @param callbackQuery - The callback query context.
     * @returns The ID of the callback query or null.
     */
    collect(callbackQuery) {
        this.received++;
        return callbackQuery.id || null;
    }
    /**
     * Disposes of the callback query.
     * @param callbackQuery - The callback query context.
     * @returns The ID of the callback query or null.
     */
    dispose(callbackQuery) {
        return callbackQuery.id || null;
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
exports.InlineKeyboardCollector = InlineKeyboardCollector;
//# sourceMappingURL=InlineKeyboardCollector.js.map