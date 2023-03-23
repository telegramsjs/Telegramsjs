class Collection {
  constructor(entries = []) {
    this._items = new Map(entries);
    this.size = this._items.size;
  }

  get(key) {
    return this._items.get(key);
  }

  set(key, value) {
    this._items.set(key, value);
    this.size = this._items.size;
    return this;
  }

  has(key) {
    return this._items.has(key);
  }

  delete(key) {
    const deleted = this._items.delete(key);
    if (deleted) {
      this.size = this._items.size;
    }
    return deleted;
  }

  clear() {
    this._items.clear();
    this.size = 0;
  }

  forEach(callbackFn, thisArg) {
    for (const [key, value] of this._items) {
      callbackFn.call(thisArg, value, key, this);
    }
  }

  filter(callbackFn, thisArg) {
    const result = new Collection();
    for (const [key, value] of this._items) {
      if (callbackFn.call(thisArg, value, key, this)) {
        result.set(key, value);
      }
    }
    return result;
  }

  map(callbackFn, thisArg) {
    const result = new Collection();
    for (const [key, value] of this._items) {
      result.set(key, callbackFn.call(thisArg, value, key, this));
    }
    return result;
  }

  some(callbackFn, thisArg) {
    for (const [key, value] of this._items) {
      if (callbackFn.call(thisArg, value, key, this)) {
        return true;
      }
    }
    return false;
  }

  every(callbackFn, thisArg) {
    for (const [key, value] of this._items) {
      if (!callbackFn.call(thisArg, value, key, this)) {
        return false;
      }
    }
    return true;
  }

  reduce(callbackFn, initialValue) {
    let accumulator = initialValue;
    for (const [key, value] of this._items) {
      accumulator = callbackFn(accumulator, value, key, this);
    }
    return accumulator;
  }

  find(callbackFn, thisArg) {
    for (const [key, value] of this._items) {
      if (callbackFn.call(thisArg, value, key, this)) {
        return value;
      }
    }
  }

  findKey(callbackFn, thisArg) {
    for (const [key, value] of this._items) {
      if (callbackFn.call(thisArg, value, key, this)) {
        return key;
      }
    }
  }

  toArray() {
    return [...this._items.values()];
  }

  keyArray() {
    return [...this._items.keys()];
  }

  entries() {
    return this._items.entries();
  }

  [Symbol.iterator]() {
    return this._items.entries();
  }
}

module.exports = Collection;