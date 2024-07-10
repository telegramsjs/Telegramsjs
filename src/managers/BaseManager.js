const { Collection } = require("@telegram.ts/collection");

let cacheWarningEmitted;

class BaseManager {
  constructor(client, holds, cacheSize = -1) {
    Object.defineProperty(this, "client", { value: client });

    Object.defineProperty(this, "holds", { value: holds });

    this.cacheSize = cacheSize;

    this.cache = new Collection();
  }

  _add(data, cache = true, { id, extras = [] } = {}) {
    if (this.cacheSize !== -1 && this.cacheSize < this.cache.size) {
      if (!cacheWarningEmitted) {
        cacheWarningEmitted = true;
        process.emitWarning(
          `Overriding the cache handling for ${this.constructor.name} is unsupported and breaks functionality`,
        );
      }
      return new this.holds(this.client, data);
    }

    const existing = this.cache.get(id ?? data.id);
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
    if (cache) this.cache.set(id ?? entry.id, entry);
    return entry;
  }

  remove(id) {
    return this.cache.delete(id);
  }

  resolve(idOrInstance) {
    if (idOrInstance instanceof this.holds) return idOrInstance;
    if (typeof idOrInstance === "string") {
      return this.cache.get(idOrInstance) || null;
    }
    return null;
  }

  resolveId(idOrInstance) {
    if (idOrInstance instanceof this.holds) return idOrInstance.id;
    if (typeof idOrInstance === "string") return idOrInstance;
    return null;
  }
}

module.exports = { BaseManager };
