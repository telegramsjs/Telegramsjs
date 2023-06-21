/**
 * A collection data structure that maps unique keys to values.
 * @class
 */
type Entry<K, V> = [K, V];
type GroupedValues<K, V> = {
    key: K;
    values: V[];
};
export declare class Collection<K, V> {
    /**
     * The underlying map that stores the key-value pairs.
     */
    private _items;
    /**
     * The number of key-value pairs in the collection.
     */
    size: number;
    /**
     * Create a new Collection instance.
     * @param entries - An optional array of [key, value] pairs to add to the collection.
     */
    constructor(entries?: readonly Entry<K, V>[]);
    /**
     * Retrieve the value associated with the given key.
     * @param {*} key - The key to look up.
     * @returns {*} - The value associated with the key, or undefined if the key is not in the collection.
     */
    get(key: K): V | undefined;
    /**
     * Associate the given value with the given key.
     * @param {*} key - The key to set.
     * @param {*} value - The value to associate with the key.
     * @returns {Collection} - The collection instance (for chaining).
     */
    set(key: K, value: V): Collection<K, V>;
    /**
     * Check whether the collection contains a given key.
     * @param {*} key - The key to look for.
     * @returns {boolean} - True if the collection contains the key, false otherwise.
     */
    has(key: K): boolean;
    /**
     * Remove the key-value pair associated with the given key.
     * @param {*} key - The key to remove.
     * @returns {boolean} - True if the key-value pair was removed, false if the key was not in the collection.
     */
    delete(key: K): boolean;
    /**
     * Remove all key-value pairs from the collection.
     */
    clear(): void;
    /**
     * Call a given function for each key-value pair in the collection.
     * @param {Function} callbackFn - The function to call for each pair. It should take three arguments: the value, the key, and the collection instance.
     * @param {*} [thisArg] - An optional value to use as `this` when calling the function.
     */
    forEach(callbackFn: (value: V, key: K, collection: Collection<K, V>) => void, thisArg?: any): void;
    /**
     * Create a new collection that includes only the key-value pairs that satisfy a given condition.
     * @param {Function} callbackFn - The condition to test each pair against. It should take three arguments: the value, the key, and the collection instance. Return true to include the pair, false to exclude it.
     * @param {*} [thisArg] - An optional value to use as `this` when calling the function.
     * @returns {Collection} - A new Collection instance containing the filtered key-value pairs.
     */
    filter(callbackFn: (value: V, key: K, collection: Collection<K, V>) => boolean, thisArg?: any): Collection<K, V>;
    /**
     * Creates a new collection with the results of calling a provided function
     * on every element in the calling collection.
     *
     * @param {function} callbackFn - Function that produces an element of the new collection
     * @param {object} thisArg - Object to use as 'this' when executing the callback
     * @returns {Collection} - A new collection with the results of calling the callback on each element
     */
    map<U>(callbackFn: (value: V, key: K, collection: Collection<K, V>) => U, thisArg?: any): Collection<K, U>;
    /**
     * Tests whether at least one element in the collection passes the test implemented by the provided function.
     *
     * @param {function} callbackFn - Function to test for each element
     * @param {object} thisArg - Object to use as 'this' when executing the callback
     * @returns {boolean} - True if at least one element passes the test, false otherwise
     */
    some(callbackFn: (value: V, key: K, collection: Collection<K, V>) => boolean, thisArg?: any): boolean;
    /**
     * Tests whether all elements in the collection pass the test implemented by the provided function.
     *
     * @param {function} callbackFn - Function to test for each element
     * @param {object} thisArg - Object to use as 'this' when executing the callback
     * @returns {boolean} - True if all elements pass the test, false otherwise
     */
    every(callbackFn: (value: V, key: K, collection: Collection<K, V>) => boolean, thisArg?: any): boolean;
    /**
     * Applies a function against an accumulator and each element in the collection to reduce it to a single value.
     * @param {function} callbackFn - Function to execute on each element in the collection
     * @param {*} initialValue - Value to use as the first argument to the first call of the callback
     * @returns {*} - The reduced value
     */
    reduce(callbackFn: (accumulator: any, value: V, key: K, collection: Collection<K, V>) => any, initialValue?: any): any;
    /**
     * Returns the value of the first element in the collection that satisfies the provided testing function.
     *
     * @param {function} callbackFn - Function to test for each element
     * @param {object} thisArg - Object to use as 'this' when executing the callback
     * @returns {*} - The value of the first element that passes the test, or undefined if no element passes the test
     */
    find(callbackFn: (value: V, key: K, collection: Collection<K, V>) => boolean, thisArg?: any): V | undefined;
    /**
     * Applies a function against an accumulator and each element in the collection (from right to left)
     * to reduce it to a single value.
     * @param {function} callbackFn - Function to execute on each element in the collection
     * @param {*} initialValue - Value to use as the first argument to the first call of the callback
     * @returns {*} - The reduced value
     */
    reduceRight(callbackFn: (accumulator: any, value: V, key: K, collection: Collection<K, V>) => any, initialValue?: any): any;
    /**
     * Applies a mapping function to each value in the collection and flattens the result.
     * @param {Function} callbackFn - The mapping function to apply. It should take three arguments: the value, the key, and the collection instance.
     * @param {*} [thisArg] - An optional value to use as `this` when calling the function.
     * @returns {Collection} - A new Collection instance with the flattened mapped values.
     */
    flat<U>(callbackFn: (value: V, key: K, collection: Collection<K, V>) => U[], thisArg?: any): Collection<K, U>;
    /**
     * @returns an iterator that contains all the keys of the collection's elements.
     */
    keys(): IterableIterator<K>;
    /**
     * @returns an iterator that contains all the values of the elements in the collection.
     */
    values(): IterableIterator<V>;
    /**
     * Returns the key of the first element in the collection that satisfies the provided testing function.
     *
     * @param {function} callbackFn - Function to test for each element
     * @param {object} thisArg - Object to use as 'this' when executing the callback
     * @returns {*} - The key of the first element that passes the test, or undefined if no element passes the test
     */
    findKey(callbackFn: (value: V, key: K, collection: Collection<K, V>) => boolean, thisArg?: any): K | undefined;
    /**
     * Returns an array containing all the values of the collection in insertion order.
     * @returns {Array} - An array containing all the values of the collection in insertion order
     */
    toArray(): V[];
    /**
     * Returns an array containing all the keys of the collection in insertion order.
     *
     * @returns {Array} - An array containing all the keys of the collection in insertion order
     */
    keyArray(): K[];
    /**
     * Applies a mapping function to each value in the collection and flattens the result.
     * @param {Function} callbackFn - The mapping function to apply. It should take three arguments: the value, the key, and the collection instance.
     * @param {*} [thisArg] - An optional value to use as `this` when calling the function.
     * @returns {Collection} - A new Collection instance with the flattened mapped values.
     */
    flatMap<U>(callbackFn: (value: V, key: K, collection: Collection<K, V>) => U[], thisArg?: any): Collection<K, U>;
    /**
     * Applies a mapping function to each value in the collection and creates a new collection with the mapped values.
     * @param {Function} callbackFn - The mapping function to apply. It should take three arguments: the value, the key, and the collection instance.
     * @param {*} [thisArg] - An optional value to use as `this` when calling the function.
     * @returns {Collection} - A new Collection instance with the mapped values.
     */
    mapValues<U>(callbackFn: (value: V, key: K, collection: Collection<K, V>) => U, thisArg?: any): Collection<K, U>;
    /**
     * Sorts the collection by keys in ascending order.
     * @returns {Collection} - A new sorted Collection instance.
     */
    defaultSort(): Collection<K, V>;
    /**
     * Sorts the collection by keys using a custom sorting function.
     * @param {Function} compareFn - The comparison function to use for sorting.
     * @returns {Collection} - A new sorted Collection instance.
     */
    sorted(compareFn: (a: K, b: K) => number): Collection<K, V>;
    /**
     * Combines the entries of two collections into a new collection.
     * @param {Collection} collection - The collection to combine with.
     * @returns {Collection} - A new combined Collection instance.
     */
    combineEntries(collection: Collection<K, V>): Collection<K, V>;
    /**
     * Returns the difference between two collections (elements in this collection but not in the other collection).
     * @param {Collection} collection - The collection to subtract.
     * @returns {Collection} - A new Collection instance containing the difference.
     */
    difference(collection: Collection<K, V>): Collection<K, V>;
    /**
     * Subtracts the elements of the given collection from this collection.
     * @param {Collection} collection - The collection to subtract.
     * @returns {Collection} - The modified Collection instance (for chaining).
     */
    subtract(collection: Collection<K, V>): Collection<K, V>;
    /**
     * Creates a new Collection that contains a subset of items based on the provided keys.
     * @param {K[]} keys - An array of keys to include in the subset.
     * @returns {Collection<K, V>} - A new Collection instance containing the subset of items.
     */
    subset(keys: K[]): Collection<K, V>;
    /**
     * Returns the intersection of two collections (elements that exist in both collections).
     * @param {Collection} collection - The collection to intersect.
     * @returns {Collection} - A new Collection instance containing the intersection.
     */
    intersect(collection: Collection<K, V>): Collection<K, V>;
    /**
     * Check if the current collection is equal to another collection.
     * @param {Collection} collection - The collection to compare.
     * @returns {boolean} - True if the collections are equal, false otherwise.
     */
    equals(collection: Collection<K, V>): boolean;
    /**
     * Perform an operation on each value in the collection and return the collection.
     * @param {Function} callbackFn - The function to perform on each value.
     * @returns {Collection} - The collection instance (for chaining).
     */
    tap(callbackFn: (value: V, key: K, collection: Collection<K, V>) => void): Collection<K, V>;
    /**
     * Retrieve a random value from the collection.
     * @returns {V | undefined} - A random value from the collection, or undefined if the collection is empty.
     */
    random(): V | undefined;
    /**
     * Retrieve the value at the specified index in the collection.
     * @param {number} index - The index of the value to retrieve.
     * @returns {V | undefined} - The value at the specified index, or undefined if the index is out of range.
     */
    at(index: number): V | undefined;
    /**
     * Retrieve the last key in the collection.
     * @returns {K | undefined} - The last key in the collection, or undefined if the collection is empty.
     */
    lastKey(): K | undefined;
    /**
     * Retrieve the last value in the collection.
     * @returns {V | undefined} - The last value in the collection, or undefined if the collection is empty.
     */
    last(): V | undefined;
    /**
     * Ensure that a key exists in the collection. If the key does not exist, it will be associated with the given value.
     * @param {K} key - The key to ensure.
     * @param {V} value - The value to associate with the key if it does not exist.
     * @returns {Collection} - The collection instance (for chaining).
     */
    ensure(key: K, value: V): Collection<K, V>;
    /**
     * Retrieve the key at the specified index in the collection.
     * @param {number} index - The index of the key to retrieve.
     * @returns {K | undefined} - The key at the specified index, or undefined if the index is out of range.
     */
    keyAt(index: number): K | undefined;
    /**
     * Retrieve a random key from the collection.
     * @returns {K | undefined} - A random key from the collection, or undefined if the collection is empty.
     */
    randomKey(): K | undefined;
    /**
     * Create a new collection with the key-value pairs reversed.
     * @returns {Collection<V, K>} - A new Collection instance with the key-value pairs reversed.
     */
    reverse(): Collection<V, K>;
    /**
     * Create a new collection with all duplicate values removed.
     * @returns {Collection<K, V>} - A new Collection instance with all duplicate values removed.
     */
    sweep(): Collection<K, V>;
    /**
     * Create a new collection by partitioning the elements into two groups based on a condition.
     * @param {Function} callbackFn - The condition to test each element against. It should take three arguments: the value, the key, and the collection instance. Return true to include the element in the first group, false to include it in the second group.
     * @param {*} [thisArg] - An optional value to use as `this` when calling the function.
     * @returns {GroupedValues<K, V>[]} - An array of two `GroupedValues` objects representing the partitioned groups.
     */
    partition(callbackFn: (value: V, key: K, collection: Collection<K, V>) => boolean, thisArg?: any): GroupedValues<K, V>[];
    /**
     * Returns a new Iterator object that contains the [key, value] pairs for each element in the collection.
     * @returns {Iterator} - A new Iterator object containing the [key, value] pairs for each element in the collection
     */
    entries(): IterableIterator<[K, V]>;
    /**
     * @returns - an array that contains all the values of the elements of the collection, grouped by keys
     */
    toArrayByKey(): GroupedValues<K, V>[];
    /**
     * concatenates the given collection with another collection
     * @returns {this} - returns class (this)
     */
    merge(collection: Collection<K, V>): this;
    /**
     * Creates a copy of this collection.
     */
    clone(): Collection<K, V>;
    /**
     * chunk - splits the collection into subcollections of the given size and returns an array with new collections
     * @param {number} size - the amount by which this class will be divided
     * @return {array} - returns an array with new collections
     */
    chunk(size: number): any[];
    /**
     * keyOf - returns the first key corresponding to the specified value in the collection
     * @param {V} value - what to look for in the collection
     * @return {K | undefined} - returns the first key corresponding to the specified value in the collection
     */
    keyOf(value: V): K | undefined;
    /**
     * Returns a new Collection with the value at the specified index replaced.
     * @template K, V
     * @param {number} index - The index of the element to replace.
     * @param {V} value - The new value to assign.
     * @returns {Collection<K, V>} A new Collection with the updated value.
     */
    with(index: number, value: V): Collection<K, V>;
    /**
     * @returns an instance of the Map class that contains all the elements of the given collection
     */
    toMap(): Map<K, V>;
    /**
     * Returns a new Collection instance with the key-value pairs in reversed order.
     * @returns {Collection} - A new Collection instance with the reversed key-value pairs.
     */
    toReversed(): Collection<K, V>;
    /**
     * Returns a new Collection instance containing a subset of key-value pairs starting from the specified start index (inclusive) to the specified end index (exclusive).
     * @param {number} start - The start index.
     * @param {number} end - The end index.
     * @returns {Collection} - A new Collection instance with the specified subset of key-value pairs.
     */
    toSplised(start: number, end: number): Collection<K, V>;
    /**
     * Returns an object that contains all the elements of the collection as properties of the keys.
     * @returns An object containing the elements of the collection.
     */
    toJSON(): {
        [key: string]: V;
    };
    /**
     * Returns a new Iterator object that contains the [key, value] pairs for each element in the collection.
     * @returns {IterableIterator<Array>} An iterator object that can be used to iterate over the key-value pairs of the Collection.
     */
    [Symbol.iterator](): IterableIterator<[K, V]>;
}
export {};
//# sourceMappingURL=Collection.d.ts.map