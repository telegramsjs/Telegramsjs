/**
 * A collection data structure that maps unique keys to values.
 * @class
 */
type Entry<K, V> = [K, V];

type GroupedValues<K, V> = {
  key: K;
  values: V[];
};

export class Collection<K, V> {
  /**
   * The underlying map that stores the key-value pairs.
  */
  private _items: Map<K, V>;

  /**
   * The number of key-value pairs in the collection.
   */
  public size: number;

  /**
   * Create a new Collection instance.
   * @param entries - An optional array of [key, value] pairs to add to the collection.
   */
  constructor(entries: readonly Entry<K, V>[] = []) {
    this._items = new Map(entries);
    this.size = this._items.size;
  }

  /**
   * Retrieve the value associated with the given key.
   * @param {*} key - The key to look up.
   * @returns {*} - The value associated with the key, or undefined if the key is not in the collection.
   */
  public get(key: K): V | undefined {
    return this._items.get(key);
  }

  /**
   * Associate the given value with the given key.
   * @param {*} key - The key to set.
   * @param {*} value - The value to associate with the key.
   * @returns {Collection} - The collection instance (for chaining).
   */
  public set(
    key: K,
    value: V
    ): Collection<K, V> {
    this._items.set(key, value);
    this.size = this._items.size;
    return this;
  }

  /**
   * Check whether the collection contains a given key.
   * @param {*} key - The key to look for.
   * @returns {boolean} - True if the collection contains the key, false otherwise.
   */
  public has(key: K): boolean {
    return this._items.has(key);
  }

  /**
   * Remove the key-value pair associated with the given key.
   * @param {*} key - The key to remove.
   * @returns {boolean} - True if the key-value pair was removed, false if the key was not in the collection.
   */
  public delete(key: K): boolean {
    const deleted: boolean = this._items.delete(key);
    if (deleted) {
      this.size = this._items.size;
    }
    return deleted;
  }

  /**
   * Remove all key-value pairs from the collection.
   */
  public clear(): void {
    this._items.clear();
    this.size = 0;
  }

  /**
   * Call a given function for each key-value pair in the collection.
   * @param {Function} callbackFn - The function to call for each pair. It should take three arguments: the value, the key, and the collection instance.
   * @param {*} [thisArg] - An optional value to use as `this` when calling the function.
   */
  public forEach(
    callbackFn: (value: V, key: K, collection: Collection<K, V>) => void,
    thisArg?: any
    ): void {
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

  public filter(
    callbackFn: (value: V, key: K, collection: Collection<K, V>) => boolean,
    thisArg?: any
    ): Collection<K, V> {
    const result = new Collection<K, V>();
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
   public map<U>(
     callbackFn: (value: V, key: K, collection: Collection<K, V>) => U,
     thisArg?: any
     ): Collection<K, U> {
    const result = new Collection<K, U>();
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
   public some(
     callbackFn: (value: V, key: K, collection: Collection<K, V>) => boolean,
     thisArg?: any
     ): boolean {
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
  public every(
    callbackFn: (value: V, key: K, collection: Collection<K, V>) => boolean,
    thisArg?: any
    ): boolean {
    for (const [key, value] of this._items) {
      if (!callbackFn.call(thisArg, value, key, this)) {
        return false;
      }
    }
    return true;
  }
  /**
   * Applies a function against an accumulator and each element in the collection to reduce it to a single value.
   * @param {function} callbackFn - Function to execute on each element in the collection
   * @param {*} initialValue - Value to use as the first argument to the first call of the callback
   * @returns {*} - The reduced value
   */
   public reduce(
     callbackFn: (accumulator: any, value: V, key: K, collection: Collection<K, V>) => any,
     initialValue?: any
     ): any {
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
  public find(
    callbackFn: (value: V, key: K, collection: Collection<K, V>) => boolean, 
    thisArg?: any
    ): V | undefined {
    for (const [key, value] of this._items) {
      if (callbackFn.call(thisArg, value, key, this)) {
        return value;
      }
    }
  }
  
  /**
   * Applies a function against an accumulator and each element in the collection (from right to left)
   * to reduce it to a single value.
   * @param {function} callbackFn - Function to execute on each element in the collection
   * @param {*} initialValue - Value to use as the first argument to the first call of the callback
   * @returns {*} - The reduced value
   */
   public reduceRight(
     callbackFn: (accumulator: any, value: V, key: K, collection: Collection<K, V>) => any,
     initialValue?: any
     ): any {
       const keys = Array.from(this._items.keys()).reverse();
       let accumulator = initialValue;
       
       for (const key of keys) {
         const value = this._items.get(key);
         if (value !== undefined) {
           accumulator = callbackFn(accumulator, value, key, this);
         }
       }
     return accumulator;
     }
     
  /**
  * Applies a mapping function to each value in the collection and flattens the result.
  * @param {Function} callbackFn - The mapping function to apply. It should take three arguments: the value, the key, and the collection instance.
 * @param {*} [thisArg] - An optional value to use as `this` when calling the function.
 * @returns {Collection} - A new Collection instance with the flattened mapped values.
 */
 public flat<U>(
   callbackFn: (value: V, key: K, collection: Collection<K, V>) => U[],
   thisArg?: any
   ): Collection<K, U> {
     const result = new Collection<K, U>();
     for (const [key, value] of this._items) {
       const mappedValues = callbackFn.call(thisArg, value, key, this);
       for (const mappedValue of mappedValues) {
         result.set(key, mappedValue);
       }
     }
    return result;
   }

  /**
   * @returns an iterator that contains all the keys of the collection's elements.
  */
  public keys(): IterableIterator<K> {
    return this._items.keys();
  }
  
  /**
   * @returns an iterator that contains all the values of the elements in the collection. 
  */
  
  public values(): IterableIterator<V> {
    return this._items.values();
  }

/**
 * Returns the key of the first element in the collection that satisfies the provided testing function.
 *
 * @param {function} callbackFn - Function to test for each element
 * @param {object} thisArg - Object to use as 'this' when executing the callback
 * @returns {*} - The key of the first element that passes the test, or undefined if no element passes the test
 */
  public findKey(
    callbackFn: (value: V, key: K, collection: Collection<K, V>) => boolean,
    thisArg?: any
    ): K | undefined {
    for (const [key, value] of this._items) {
      if (callbackFn.call(thisArg, value, key, this)) {
        return key;
      }
    }
  }

/**
 * Returns an array containing all the values of the collection in insertion order.
 * @returns {Array} - An array containing all the values of the collection in insertion order
 */
  public toArray(): V[] {
    return [...this._items.values()];
  }

/**
 * Returns an array containing all the keys of the collection in insertion order.
 *
 * @returns {Array} - An array containing all the keys of the collection in insertion order
 */
  public keyArray(): K[] {
    return [...this._items.keys()];
  }
  
  /**
   * Applies a mapping function to each value in the collection and flattens the result.
   * @param {Function} callbackFn - The mapping function to apply. It should take three arguments: the value, the key, and the collection instance.
   * @param {*} [thisArg] - An optional value to use as `this` when calling the function.
   * @returns {Collection} - A new Collection instance with the flattened mapped values.
   */
  public flatMap<U>(
    callbackFn: (value: V, key: K, collection: Collection<K, V>) => U[],
    thisArg?: any
    ): Collection<K, U> {
    const result = new Collection<K, U>();
    for (const [key, value] of this._items) {
      const mappedValues = callbackFn.call(thisArg, value, key, this);
      for (const mappedValue of mappedValues) {
        result.set(key, mappedValue);
      }
    }
    return result;
  }

  /**
   * Applies a mapping function to each value in the collection and creates a new collection with the mapped values.
   * @param {Function} callbackFn - The mapping function to apply. It should take three arguments: the value, the key, and the collection instance.
   * @param {*} [thisArg] - An optional value to use as `this` when calling the function.
   * @returns {Collection} - A new Collection instance with the mapped values.
   */
  public mapValues<U>(
    callbackFn: (value: V, key: K, collection: Collection<K, V>) => U, 
    thisArg?: any
    ): Collection<K, U> {
    const result = new Collection<K, U>();
    for (const [key, value] of this._items) {
      const mappedValue = callbackFn.call(thisArg, value, key, this);
      result.set(key, mappedValue);
    }
    return result;
  }
  
  /**
   * Sorts the collection by keys in ascending order.
   * @returns {Collection} - A new sorted Collection instance.
   */
  public defaultSort(): Collection<K, V> {
    const sortedEntries: Entry<K, V>[] = Array.from(this.entries()).sort((a, b) =>
      String(a[0]).localeCompare(String(b[0]))
    );
    return new Collection(sortedEntries);
  }

  /**
   * Sorts the collection by keys using a custom sorting function.
   * @param {Function} compareFn - The comparison function to use for sorting.
   * @returns {Collection} - A new sorted Collection instance.
   */
  public sorted(compareFn: (a: K, b: K) => number): Collection<K, V> {
    const sortedEntries: Entry<K, V>[] = Array.from(this.entries()).sort((a, b) => compareFn(a[0], b[0]));
    return new Collection(sortedEntries);
  }

  /**
   * Combines the entries of two collections into a new collection.
   * @param {Collection} collection - The collection to combine with.
   * @returns {Collection} - A new combined Collection instance.
   */
  public combineEntries(collection: Collection<K, V>): Collection<K, V> {
    const combinedEntries: Entry<K, V>[] = [...this.entries(), ...collection.entries()];
    return new Collection(combinedEntries);
  }

  /**
   * Returns the difference between two collections (elements in this collection but not in the other collection).
   * @param {Collection} collection - The collection to subtract.
   * @returns {Collection} - A new Collection instance containing the difference.
   */
   public difference(collection: Collection<K, V>): Collection<K, V> {
     const diffEntries: Entry<K, V>[] = Array.from(this.entries()).filter(([key]) => !collection.has(key));
     return new Collection(diffEntries);
   }

  /**
   * Subtracts the elements of the given collection from this collection.
   * @param {Collection} collection - The collection to subtract.
   * @returns {Collection} - The modified Collection instance (for chaining).
   */
  public subtract(collection: Collection<K, V>): Collection<K, V> {
    for (const [key] of collection.entries()) {
      this.delete(key);
    }
    return this;
  }
  
  /**
   * Creates a new Collection that contains a subset of items based on the provided keys.
   * @param {K[]} keys - An array of keys to include in the subset.
   * @returns {Collection<K, V>} - A new Collection instance containing the subset of items.
   */
  public subset(keys: K[]): Collection<K, V> {
    const subsetCollection = new Collection<K, V>();
    for (const key of keys) {
      const value = this.get(key);
      if (value !== undefined) {
        subsetCollection.set(key, value);
      }
    }
    return subsetCollection;
  }

  /**
   * Returns the intersection of two collections (elements that exist in both collections).
   * @param {Collection} collection - The collection to intersect.
   * @returns {Collection} - A new Collection instance containing the intersection.
   */
   public intersect(collection: Collection<K, V>): Collection<K, V> {
     const intersectEntries: Entry<K, V>[] = Array.from(this.entries()).filter(([key]) => collection.has(key));
     return new Collection(intersectEntries);
   }
   
   /**
   * Check if the current collection is equal to another collection.
   * @param {Collection} collection - The collection to compare.
   * @returns {boolean} - True if the collections are equal, false otherwise.
   */
  public equals(collection: Collection<K, V>): boolean {
    if (this.size !== collection.size) {
      return false;
    }

    for (const [key, value] of this._items) {
      if (!collection.has(key) || !Object.is(value, collection.get(key))) {
        return false;
      }
    }

    return true;
  }

  /**
   * Perform an operation on each value in the collection and return the collection.
   * @param {Function} callbackFn - The function to perform on each value.
   * @returns {Collection} - The collection instance (for chaining).
   */
  public tap(callbackFn: (value: V, key: K, collection: Collection<K, V>) => void): Collection<K, V> {
    for (const [key, value] of this._items) {
      callbackFn(value, key, this);
    }

    return this;
  }

  /**
   * Retrieve a random value from the collection.
   * @returns {V | undefined} - A random value from the collection, or undefined if the collection is empty.
   */
  public random(): V | undefined {
    const values = this.toArray();
    if (values.length === 0) {
      return undefined;
    }
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex];
  }

  /**
   * Retrieve the value at the specified index in the collection.
   * @param {number} index - The index of the value to retrieve.
   * @returns {V | undefined} - The value at the specified index, or undefined if the index is out of range.
   */
  public at(index: number): V | undefined {
    const values = this.toArray();
    return values[index];
  }

  /**
   * Retrieve the last key in the collection.
   * @returns {K | undefined} - The last key in the collection, or undefined if the collection is empty.
   */
  public lastKey(): K | undefined {
    const keys = this.keyArray();
    return keys[keys.length - 1];
  }

  /**
   * Retrieve the last value in the collection.
   * @returns {V | undefined} - The last value in the collection, or undefined if the collection is empty.
   */
  public last(): V | undefined {
    const values = this.toArray();
    return values[values.length - 1];
  }

  /**
   * Ensure that a key exists in the collection. If the key does not exist, it will be associated with the given value.
   * @param {K} key - The key to ensure.
   * @param {V} value - The value to associate with the key if it does not exist.
   * @returns {Collection} - The collection instance (for chaining).
   */
  public ensure(
    key: K, 
    value: V
    ): Collection<K, V> {
    if (!this.has(key)) {
      this.set(key, value);
    }
    return this;
  }
  
  /**
   * Retrieve the key at the specified index in the collection.
   * @param {number} index - The index of the key to retrieve.
   * @returns {K | undefined} - The key at the specified index, or undefined if the index is out of range.
   */
   public keyAt(index: number): K | undefined {
     const keys = this.keyArray();
     return keys[index];
   }
   
   /**
    * Retrieve a random key from the collection.
    * @returns {K | undefined} - A random key from the collection, or undefined if the collection is empty.
    */
    
    public randomKey(): K | undefined {
      const keys = this.keyArray();
      if (keys.length === 0) return undefined;
      const randomIndex = Math.floor(Math.random() * keys.length);
      return keys[randomIndex];
    }
  
  /**
   * Create a new collection with the key-value pairs reversed.
   * @returns {Collection<V, K>} - A new Collection instance with the key-value pairs reversed.
   */
   public reverse(): Collection<V, K> {
     const reversedCollection = new Collection<V, K>();
     for (const [key, value] of this.entries()) {
       reversedCollection.set(value, key);
     }
     return reversedCollection;
   }
     
   /**
    * Create a new collection with all duplicate values removed.
    * @returns {Collection<K, V>} - A new Collection instance with all duplicate values removed.
    */
    public sweep(): Collection<K, V> {
      const uniqueValues = new Set<V>();
      const sweptCollection = new Collection<K, V>();
      
      for (const [key, value] of this.entries()) {
        if (!uniqueValues.has(value)) {
          uniqueValues.add(value);
          sweptCollection.set(key, value);
        }
      }
      
      return sweptCollection;
    }
    
   /**
   * Create a new collection by partitioning the elements into two groups based on a condition.
   * @param {Function} callbackFn - The condition to test each element against. It should take three arguments: the value, the key, and the collection instance. Return true to include the element in the first group, false to include it in the second group.
    * @param {*} [thisArg] - An optional value to use as `this` when calling the function.
    * @returns {GroupedValues<K, V>[]} - An array of two `GroupedValues` objects representing the partitioned groups.
    */
  public partition(
    callbackFn: (value: V, key: K, collection: Collection<K, V>) => boolean,
    thisArg?: any
    ): GroupedValues<K, V>[] {
      const group1: GroupedValues<K, V> = { key: null as any, values: [] };
      const group2: GroupedValues<K, V> = { key: null as any, values: [] };
      for (const [key, value] of this.entries()) {
        const group = callbackFn.call(thisArg, value, key, this) ? group1 : group2;
        group.key = key;
        group.values.push(value);
      }
      
      return [group1, group2];
    }
    
   /**
    * Returns a new Iterator object that contains the [key, value] pairs for each element in the collection.
    * @returns {Iterator} - A new Iterator object containing the [key, value] pairs for each element in the collection
    */
    public entries(): IterableIterator<[K, V]> {
      return this._items.entries();
    }
  
  /**
   * @returns - an array that contains all the values of the elements of the collection, grouped by keys 
  */
  
  public toArrayByKey(): GroupedValues<K, V>[] {
    const result: GroupedValues<K, V>[] = [];

    for (const key of this.keys()) {
      const values = Array.from(this.filter((value, k) => k === key).values());
      result.push({ key, values });
    }
    return result;
  }

  
  /**
  * concatenates the given collection with another collection 
  * @returns {this} - returns class (this)
  */
  
  public merge(collection: Collection<K, V>): this {
    for (const [key, value] of collection.entries()) {
      this.set(key, value);
    }
    return this;
  }

  
  /**
  * Creates a copy of this collection. 
  */
  public clone(): Collection<K, V> {
    return new Collection(Array.from(this.entries()));
  }
  
  /**
   * chunk - splits the collection into subcollections of the given size and returns an array with new collections 
   * @param {number} size - the amount by which this class will be divided
   * @return {array} - returns an array with new collections 
   */
   chunk(size: number): any[] {
     const chunks = [];
     const values = this.toArray();
     for (let i = 0; i < values.length; i += size) {
       const chunkValues = values.slice(i, i + size);
       const chunk = new Collection(chunkValues.map((value, index) => [index, value]));
       chunks.push(chunk);
     }
     return chunks;
   }


  /**
   * Returns a new Collection with the value at the specified index replaced.
   * @template K, V
   * @param {number} index - The index of the element to replace.
   * @param {V} value - The new value to assign.
   * @returns {Collection<K, V>} A new Collection with the updated value.
   */
   
   public with(
     index: number, 
     value: V
     ): Collection<K, V> {
       const entries: Entry<K, V>[] = Array.from(this._items.entries());
       if (index >= 0 && index < entries.length) {
         entries[index][1] = value;
       }
       return new Collection(entries);
     }
  
  /**
   * @returns an instance of the Map class that contains all the elements of the given collection 
  */
  
  public toMap(): Map<K, V> {
    return new Map(this.entries());
  }
  
  /**
   * Returns a new Collection instance with the key-value pairs in reversed order.
   * @returns {Collection} - A new Collection instance with the reversed key-value pairs.
   */
   public toReversed(): Collection<K, V> {
     const entries = Array.from(this.entries()).reverse();
     return new Collection(entries);
   }
   
   /**
    * Returns a new Collection instance containing a subset of key-value pairs starting from the specified start index (inclusive) to the specified end index (exclusive).
    * @param {number} start - The start index.
    * @param {number} end - The end index.
    * @returns {Collection} - A new Collection instance with the specified subset of key-value pairs.
    */
    public toSplised(
      start: number, 
      end: number
      ): Collection<K, V> {
        const entries = Array.from(this.entries()).slice(start, end);
        return new Collection(entries);
      }
  /**
   * Returns an object that contains all the elements of the collection as properties of the keys.
   * @returns An object containing the elements of the collection.
   */
  
  public toJSON(): {
    [key: string]: V
    } {
    const json: { [key: string]: V } = {};
    for (const [key, value] of this._items) {
      json[key as any] = value;
    }
    return json;
  }

/**
 * Returns a new Iterator object that contains the [key, value] pairs for each element in the collection.
 * @returns {IterableIterator<Array>} An iterator object that can be used to iterate over the key-value pairs of the Collection.
 */
 public *[Symbol.iterator](): IterableIterator<[K, V]> {
    yield* this._items.entries();
  }
}