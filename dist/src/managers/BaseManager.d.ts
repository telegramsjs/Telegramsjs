/**
 * @template T
 * Base class for managing a collection of data objects.
 */
export class BaseManager<T> {
    /**
     * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client instance.
     * @param {T} holds - The class or function that the manager holds.
     * @param {number} [cacheSize=-1] - The maximum size of the cache. Default is unlimited.
     */
    constructor(client: import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient, holds: T, cacheSize?: number | undefined);
    cacheSize: number;
    /**
     * The collection used for caching data objects.
     * @type {Collection<number | string, T>}
     */
    cache: Collection<number | string, T>;
    /**
     * The client that instantiated this
     * @type {import("../client/TelegramClient").TelegramClient}
     */
    get client(): import("../client/TelegramClient").TelegramClient;
    /**
     * Adds or updates an entry in the cache.
     * @param {any} data - The data to be added or updated in the cache.
     * @param {boolean} [cache=true] - Whether to cache the data.
     * @param {Object} [options={}] - Additional options.
     * @param {string|number} [options.id] - The ID of the data.
     * @param {Array} [options.extras=[]] - Additional arguments to pass to the constructor.
     * @returns {T} - The cached or newly created entry.
     */
    _add(data: any, cache?: boolean | undefined, { id, extras }?: {
        id?: string | number | undefined;
        extras?: any[] | undefined;
    } | undefined): T;
    /**
     * Removes an entry from the cache.
     * @param {string|number} id - The ID of the entry to remove.
     * @returns {boolean} - Whether the entry was successfully removed.
     */
    remove(id: string | number): boolean;
    /**
     * Resolves an entry from the cache.
     * @param {string|number|T} idOrInstance - The ID or instance to resolve.
     * @returns {T|null} - The resolved entry or null if not found.
     */
    resolve(idOrInstance: string | number | T): T | null;
    /**
     * Resolves the ID of an entry from the cache.
     * @param {string|number|T} idOrInstance - The ID or instance to resolve.
     * @returns {string|number|null} - The resolved ID or null if not found.
     */
    resolveId(idOrInstance: string | number | T): string | number | null;
}
import { Collection } from "@telegram.ts/collection";
//# sourceMappingURL=BaseManager.d.ts.map