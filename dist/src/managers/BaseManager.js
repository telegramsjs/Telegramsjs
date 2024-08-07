"use strict";
const process = require("node:process");
const { Collection } = require("@telegram.ts/collection");
let cacheWarningEmitted;
const ClientSymbol = Symbol("Client");
/**
 * @template T
 * Base class for managing a collection of data objects.
 */
class BaseManager {
    /**
     * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client instance.
     * @param {T} holds - The class or function that the manager holds.
     * @param {number} [cacheSize=-1] - The maximum size of the cache. Default is unlimited.
     */
    constructor(client, holds, cacheSize = -1) {
        Object.defineProperty(this, ClientSymbol, { value: client });
        Object.defineProperty(this, "holds", { value: holds });
        this.cacheSize = cacheSize;
        /**
         * The collection used for caching data objects.
         * @type {Collection<number | string, T>}
         */
        this.cache = new Collection();
    }
    /**
     * The client that instantiated this
     * @type {import("../client/TelegramClient").TelegramClient}
     */
    get client() {
        return this[ClientSymbol];
    }
    /**
     * Adds or updates an entry in the cache.
     * @param {any} data - The data to be added or updated in the cache.
     * @param {boolean} [cache=true] - Whether to cache the data.
     * @param {Object} [options={}] - Additional options.
     * @param {string|number} [options.id] - The ID of the data.
     * @param {Array} [options.extras=[]] - Additional arguments to pass to the constructor.
     * @returns {T} - The cached or newly created entry.
     */
    _add(data, cache = true, { id, extras = [] } = {}) {
        if (this.cacheSize !== -1 && this.cacheSize < this.cache.size) {
            if (!cacheWarningEmitted) {
                cacheWarningEmitted = true;
                process.emitWarning(`Overriding the cache handling for ${this.constructor.name} is unsupported and breaks functionality`);
            }
            return new this.holds(this.client, data);
        }
        const existing = this.cache.get(id !== null && id !== void 0 ? id : data.id);
        if (existing) {
            if (cache) {
                existing._patch(data);
                return existing;
            }
            const clone = existing._clone();
            clone._patch(data);
            return clone;
        }
        const entry = this.holds
            ? new this.holds(this.client, data, ...extras)
            : data;
        if (cache)
            this.cache.set(id !== null && id !== void 0 ? id : entry.id, entry);
        return entry;
    }
    /**
     * Removes an entry from the cache.
     * @param {string|number} id - The ID of the entry to remove.
     * @returns {boolean} - Whether the entry was successfully removed.
     */
    remove(id) {
        return this.cache.delete(id);
    }
    /**
     * Resolves an entry from the cache.
     * @param {string|number|T} idOrInstance - The ID or instance to resolve.
     * @returns {T|null} - The resolved entry or null if not found.
     */
    resolve(idOrInstance) {
        if (idOrInstance instanceof this.holds)
            return idOrInstance;
        if (typeof idOrInstance === "string" || typeof idOrInstance === "number") {
            return this.cache.get(idOrInstance) || null;
        }
        return null;
    }
    /**
     * Resolves the ID of an entry from the cache.
     * @param {string|number|T} idOrInstance - The ID or instance to resolve.
     * @returns {string|number|null} - The resolved ID or null if not found.
     */
    resolveId(idOrInstance) {
        if (idOrInstance instanceof this.holds)
            return idOrInstance.id;
        if (typeof idOrInstance === "string")
            return idOrInstance;
        if (typeof idOrInstance === "number")
            return idOrInstance;
        return null;
    }
}
module.exports = { BaseManager };
//# sourceMappingURL=BaseManager.js.map