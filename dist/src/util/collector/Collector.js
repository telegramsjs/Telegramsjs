"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collector = void 0;
const node_events_1 = require("node:events");
const TelegramError_1 = require("../../errors/TelegramError");
const collection_1 = require("@telegram.ts/collection");
const node_timers_1 = require("node:timers");
/**
 * Abstract class representing a generic collector.
 */
class Collector extends node_events_1.EventEmitter {
    /**
     * Creates an instance of Collector.
     * @param options - The options for the collector.
     */
    constructor(options) {
        super();
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
        /**
         * Indicates whether the collector has ended.
         */
        Object.defineProperty(this, "isEnded", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**
         * Filter function to determine if data should be collected.
         */
        Object.defineProperty(this, "filter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Collection of collected data.
         */
        Object.defineProperty(this, "collected", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new collection_1.Collection()
        });
        /**
         * Timestamp of the last collected item.
         */
        Object.defineProperty(this, "lastCollectedTimestamp", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "_timeout", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "_idleTimeout", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "_endReason", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        this.handleCollect = this.handleCollect.bind(this);
        this.handleDispose = this.handleDispose.bind(this);
        options.max = options.max || 10;
        options.time = options.time || 60000;
        if (typeof options.filter !== "function" && options.filter !== undefined) {
            throw new TelegramError_1.TelegramError("Supplied options.filter is not a Function");
        }
        this.filter = options.filter || (() => true);
        if (options.time) {
            this._timeout = (0, node_timers_1.setTimeout)(() => this.stop("time"), options.time).unref();
        }
        if (options.idle) {
            this._idleTimeout = (0, node_timers_1.setTimeout)(() => this.stop("idle"), options.idle).unref();
        }
    }
    on(event, listener) {
        super.on(event, listener);
        return this;
    }
    once(event, listener) {
        super.once(event, listener);
        return this;
    }
    /**
     * Gets the timestamp of the last collected item.
     */
    get lastCollectedAt() {
        return this.lastCollectedTimestamp && new Date(this.lastCollectedTimestamp);
    }
    /**
     * Handles the collection of a new item.
     * @param msg - The item to collect.
     */
    async handleCollect(msg) {
        const collectedId = await this.collect(msg);
        if (collectedId) {
            const filterResult = await this.filter(msg, this.collected);
            if (filterResult) {
                this.collected.set(collectedId, msg);
                this.emit("collect", msg, this.collected);
                this.lastCollectedTimestamp = Date.now();
                if (this._idleTimeout) {
                    (0, node_timers_1.clearTimeout)(this._idleTimeout);
                    this._idleTimeout = (0, node_timers_1.setTimeout)(() => this.stop("idle"), this.options.idle).unref();
                }
            }
            else {
                this.emit("ignore", msg);
            }
        }
        this.checkEnd();
    }
    /**
     * Handles the disposal of an item.
     * @param msg - The item to dispose.
     */
    async handleDispose(msg) {
        if (!this.options.dispose)
            return;
        const dispose = this.dispose(msg);
        if (!dispose ||
            !(await this.filter(msg, this.collected)) ||
            !this.collected.has(dispose))
            return;
        this.collected.delete(dispose);
        this.emit("dispose", msg, this.collected);
        this.checkEnd();
    }
    /**
     * Returns a promise that resolves with the next collected item.
     */
    get next() {
        return new Promise((resolve, reject) => {
            if (this.isEnded) {
                reject(this.collected);
                return;
            }
            const cleanup = () => {
                this.off("collect", onCollect);
                this.off("end", onEnd);
            };
            const onCollect = (item) => {
                cleanup();
                resolve(item);
            };
            const onEnd = () => {
                cleanup();
                reject(this.collected);
            };
            this.on("collect", onCollect);
            this.on("end", onEnd);
        });
    }
    /**
     * Stops the collector.
     * @param reason - The reason for stopping the collector.
     */
    stop(reason = "user") {
        if (this.isEnded)
            return;
        if (this._timeout) {
            (0, node_timers_1.clearTimeout)(this._timeout);
            this._timeout = null;
        }
        if (this._idleTimeout) {
            (0, node_timers_1.clearTimeout)(this._idleTimeout);
            this._idleTimeout = null;
        }
        this._endReason = reason;
        this.isEnded = true;
        this.emit("end", this.collected, reason);
    }
    /**
     * Resets the timer for the collector.
     * @param param0 - An object containing new time and idle values.
     */
    resetTimer({ time, idle } = {}) {
        if (this._timeout) {
            (0, node_timers_1.clearTimeout)(this._timeout);
            this._timeout = (0, node_timers_1.setTimeout)(() => this.stop("time"), time || this.options.time).unref();
        }
        if (this._idleTimeout) {
            (0, node_timers_1.clearTimeout)(this._idleTimeout);
            this._idleTimeout = (0, node_timers_1.setTimeout)(() => this.stop("idle"), idle || this.options.idle).unref();
        }
    }
    /**
     * Checks if the collector should end based on the options.
     * @returns True if the collector should end, false otherwise.
     */
    checkEnd() {
        const reason = this.endReason;
        if (reason)
            this.stop(reason);
        return Boolean(reason);
    }
    /**
     * Async generator for iterating over collected items.
     */
    async *[Symbol.asyncIterator]() {
        const queue = [];
        const onCollect = (data, collected) => queue.push(data, collected);
        this.on("collect", onCollect);
        try {
            while (queue.length || !this.isEnded) {
                if (queue.length) {
                    yield queue.shift();
                }
                else {
                    await new Promise((resolve) => {
                        const tick = () => {
                            this.off("collect", tick);
                            this.off("end", tick);
                            return resolve(true);
                        };
                        this.on("collect", tick);
                        this.on("end", tick);
                    });
                }
            }
        }
        finally {
            this.off("collect", onCollect);
        }
    }
    /**
     * Gets the reason for ending the collector.
     */
    get endReason() {
        return this._endReason;
    }
}
exports.Collector = Collector;
//# sourceMappingURL=Collector.js.map