import { Base } from "../structures/Base";
import { Collection } from "@telegram.ts/collection";
import type { BaseClient } from "../client/BaseClient";
import type { TelegramClient } from "../client/TelegramClient";

type Constructable<Entity> = new (...args: any[]) => Entity;

class BaseManager<T extends Base, ApiObject extends { id: number }> {
  #holds: Constructable<T>;
  #apiClient: TelegramClient | BaseClient;
  cache: Collection<string, T>;
  cacheSize: number;
  #cacheWarningEmitted: boolean = false;

  /**
   * @param client - The client instance.
   * @param holds - The class or function that the manager holds.
   * @param iterable - Data iterable.
   * @param cacheSize - The maximum size of the cache. Default is unlimited.
   */
  constructor(
    client: TelegramClient | BaseClient,
    holds: Constructable<T>,
    iterable?: ApiObject[],
    cacheSize: number = -1,
  ) {
    this.#holds = holds;
    this.#apiClient = client;
    this.cacheSize = cacheSize;

    /** The collection used for caching data objects. */
    this.cache = new Collection<string, T>();

    if (iterable) {
      for (const item of iterable) {
        this._add(item);
      }
    }
  }

  /**
   * The client that instantiated this
   */
  get client(): TelegramClient | BaseClient {
    return this.#apiClient;
  }

  /**
   * Adds or updates an entry in the cache.
   * @param data - The data to be added or updated in the cache.
   * @param options - Additional options.
   * @returns The cached or newly created entry.
   */
  _add(
    data: ApiObject,
    cache: boolean = true,
    { id, extras = [] }: { id?: string; extras?: unknown[] } = {},
  ): T {
    if (this.cacheSize !== -1 && this.cacheSize < this.cache.size) {
      if (!this.#cacheWarningEmitted) {
        this.#cacheWarningEmitted = true;
        process.emitWarning(
          `Overriding the cache handling for ${this.constructor.name} is unsupported and breaks functionality`,
        );
      }
      return new this.#holds(this.client, data);
    }

    const existing = this.cache.get(String(id ?? data.id));
    if (existing) {
      if (cache) {
        existing._patch(data);
        return existing;
      }
      const clone = existing._clone();
      clone._patch(data);
      return clone;
    }

    const entry = new this.#holds(this.client, data, ...extras);
    if (cache) this.cache.set(String(id ?? entry.valueOf()), entry);
    return entry;
  }

  /**
   * Removes an entry from the cache.
   * @param id - The ID of the entry to remove.
   * @returns Whether the entry was successfully removed.
   */
  remove(id: string): boolean {
    return this.cache.delete(id);
  }

  /**
   * Resolves an entry from the cache.
   * @param idOrInstance - The ID or instance to resolve.
   * @returns The resolved entry or null if not found.
   */
  resolve(idOrInstance: any): T | null {
    if (!idOrInstance) return null;
    if (idOrInstance instanceof this.#holds) return idOrInstance;
    if (typeof idOrInstance === "string") {
      return this.cache.get(idOrInstance) || null;
    }
    return null;
  }

  /**
   * Resolves the ID of an entry from the cache.
   * @param idOrInstance - The ID or instance to resolve.
   * @returns The resolved ID or null if not found.
   */
  resolveId(idOrInstance: any): string | null {
    if (!idOrInstance) return null;
    if (idOrInstance instanceof this.#holds) return idOrInstance.valueOf();
    if (typeof idOrInstance === "string") return idOrInstance;
    return null;
  }
}

export { BaseManager };
