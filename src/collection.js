/**
 * A collection data structure that maps unique keys to values.
 * @class
 */
class Collection {
  /**
   * Create a new Collection instance.
   * @param {Array} [entries=[]] - An optional array of [key, value] pairs to add to the collection.
   */
  constructor(entries = []) {
    /**
     * The underlying map that stores the key-value pairs.
     * @type {Map}
     * @private
     */
    this._items = new Map(entries);

    /**
     * The number of key-value pairs in the collection.
     * @type {number}
     */
    this.size = this._items.size;
  }

  /**
   * Retrieve the value associated with the given key.
   * @param {*} key - The key to look up.
   * @returns {*} - The value associated with the key, or undefined if the key is not in the collection.
   */
  get(key) {
    return this._items.get(key);
  }

  /**
   * Associate the given value with the given key.
   * @param {*} key - The key to set.
   * @param {*} value - The value to associate with the key.
   * @returns {Collection} - The collection instance (for chaining).
   */
  set(key, value) {
    this._items.set(key, value);
    this.size = this._items.size;
    return this;
  }

  /**
   * Check whether the collection contains a given key.
   * @param {*} key - The key to look for.
   * @returns {boolean} - True if the collection contains the key, false otherwise.
   */
  has(key) {
    return this._items.has(key);
  }

  /**
   * Remove the key-value pair associated with the given key.
   * @param {*} key - The key to remove.
   * @returns {boolean} - True if the key-value pair was removed, false if the key was not in the collection.
   */
  delete(key) {
    const deleted = this._items.delete(key);
    if (deleted) {
      this.size = this._items.size;
    }
    return deleted;
  }

  /**
   * Remove all key-value pairs from the collection.
   */
  clear() {
    this._items.clear();
    this.size = 0;
  }

  /**
   * Call a given function for each key-value pair in the collection.
   * @param {Function} callbackFn - The function to call for each pair. It should take three arguments: the value, the key, and the collection instance.
   * @param {*} [thisArg] - An optional value to use as `this` when calling the function.
   */
  forEach(callbackFn, thisArg) {
    for (const [key, value] of this._items) {
      callbackFn.call(thisArg, value, key, this);
    }
  }

  /**
   * Create a new collection that includes only the key-value pairs that satisfy a given condition.
   * @param {Function} callbackFn - The condition to test each pair against. It should take three arguments: the value, the key, and the collection instance. Return true to include the pair, false to exclude it.
   * @param {*} [thisArg] - An optional value to use as `this` when calling the function.
   * @returns {Collection} - A new Collection instance containing the filtered key-value pairs.
   */

  filter(callbackFn, thisArg) {
    const result = new Collection();
    for (const [key, value] of this._items) {
      if (callbackFn.call(thisArg, value, key, this)) {
        result.set(key, value);
      }
    }
    return result;
  }
  
  /**
 * Creates a new collection with the results of calling a provided function
 * on every element in the calling collection.
 *
 * @param {function} callbackFn - Function that produces an element of the new collection
 * @param {object} thisArg - Object to use as 'this' when executing the callback
 * @returns {Collection} - A new collection with the results of calling the callback on each element
 */
   map(callbackFn, thisArg) {
    const result = new Collection();
    for (const [key, value] of this._items) {
      result.set(key, callbackFn.call(thisArg, value, key, this));
    }
    return result;
  }

/**
 * Tests whether at least one element in the collection passes the test implemented by the provided function.
 *
 * @param {function} callbackFn - Function to test for each element
 * @param {object} thisArg - Object to use as 'this' when executing the callback
 * @returns {boolean} - True if at least one element passes the test, false otherwise
 */ 
   some(callbackFn, thisArg) {
    for (const [key, value] of this._items) {
      if (callbackFn.call(thisArg, value, key, this)) {
        return true;
      }
    }
    return false;
  }

/**
 * Tests whether all elements in the collection pass the test implemented by the provided function.
 *
 * @param {function} callbackFn - Function to test for each element
 * @param {object} thisArg - Object to use as 'this' when executing the callback
 * @returns {boolean} - True if all elements pass the test, false otherwise
 */
  every(callbackFn, thisArg) {
    for (const [key, value] of this._items) {
      if (!callbackFn.call(thisArg, value, key, this)) {
        return false;
      }
    }
    return true;
  }
/**
 * Applies a function against an accumulator and each element in the collection to reduce it to a single value.
 *
 * @param {function} callbackFn - Function to execute on each element in the collection
 * @param {*} initialValue - Value to use as the first argument to the first call of the callback
 * @returns {*} - The reduced value
 */
   reduce(callbackFn, initialValue) {
    let accumulator = initialValue;
    for (const [key, value] of this._items) {
      accumulator = callbackFn(accumulator, value, key, this);
    }
    return accumulator;
  }

/**
 * Returns the value of the first element in the collection that satisfies the provided testing function.
 *
 * @param {function} callbackFn - Function to test for each element
 * @param {object} thisArg - Object to use as 'this' when executing the callback
 * @returns {*} - The value of the first element that passes the test, or undefined if no element passes the test
 */
  find(callbackFn, thisArg) {
    for (const [key, value] of this._items) {
      if (callbackFn.call(thisArg, value, key, this)) {
        return value;
      }
    }
  }

/**
 * Returns the key of the first element in the collection that satisfies the provided testing function.
 *
 * @param {function} callbackFn - Function to test for each element
 * @param {object} thisArg - Object to use as 'this' when executing the callback
 * @returns {*} - The key of the first element that passes the test, or undefined if no element passes the test
 */
  findKey(callbackFn, thisArg) {
    for (const [key, value] of this._items) {
      if (callbackFn.call(thisArg, value, key, this)) {
        return key;
      }
    }
  }

/**
 * Returns an array containing all the values of the collection in insertion order.
 *
 * @returns {Array} - An array containing all the values of the collection in insertion order
 */
  toArray() {
    return [...this._items.values()];
  }

/**
 * Returns an array containing all the keys of the collection in insertion order.
 *
 * @returns {Array} - An array containing all the keys of the collection in insertion order
 */
  keyArray() {
    return [...this._items.keys()];
  }

/**
 * Returns a new Iterator object that contains the [key, value] pairs for each element in the collection.
 *
 * @returns {Iterator} - A new Iterator object containing the [key, value] pairs for each element in the collection
 */
  entries() {
    return this._items.entries();
  }

/**
 * Returns a new Iterator object that contains the [key, value] pairs for each element in the collection.
 *
 * @returns {IterableIterator<Array>} An iterator object that can be used to iterate over the key-value pairs of the Collection.
 */
 [Symbol.iterator]() {
    return this._items.entries();
  }
}

module.exports = Collection;