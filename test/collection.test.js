const { Collection } = require("../dist/collection/Collection.js");


test("Testing the `get` method - retrieve the value associated with the given key", () => {
  const collection = new Collection();
  collection.set("key1", "value1");
  collection.set("key2", "value2");
  collection.set("key3", "value3");

  const res = collection.get("key3");
  expect(res).toBe("value3");
});

test("Testing the `set` method - associate the given value with the given key", () => {
  const collection = new Collection();
  collection.set("key1", "value1");
  collection.set("key2", "value2");
  collection.set("key3", "value3");
  collection.set("key2", "value");
  const res = collection.get("key2")
  expect(res).toBe("value")
});

test("Testing the `has` method - check whether the collection contains a given key", () => {
  const collection = new Collection();
  collection.set("key1", "value1");
  collection.set("key2", "value2");
  collection.set("key3", "value3");

  const res1 = collection.has("key3");
  const res2 = collection.has("key4");
  expect(res1).toBe(true);
  expect(res2).toBe(false);
});

test("Testing the `delete` method - remove the key-value pair associated with the given key", () => {
  const collection = new Collection();
  collection.set("key1", "value1");
  collection.set("key2", "value2");
  collection.set("key3", "value3");
  collection.delete("key3");
  const res = collection.get("key3");
  
  expect(res).toBe(undefined);
});

test("Testing the `clear` method - remove all key-value pairs from the collection", () => {
  const collection = new Collection();
  collection.set("key1", "value1");
  collection.set("key2", "value2");
  collection.set("key3", "value3");
  collection.delete("key2");
  
  expect(collection.size).toEqual(2);
});

test("Testing the `forEach` method - call a given function for each key-value pair in the collection", () => {
  const collection = new Collection();
  collection.set("key1", "value1");
  collection.set("key2", "value2");
  collection.set("key3", "value3");
  let res = [];
  collection.forEach((v, k, c) => {
    res.push(k);
  });
  
  expect(res).toEqual(["key1", "key2", "key3"]);
});

test("Testing the `filter` method - create a new collection that includes only the key-value pairs that satisfy a given condition", () => {
  const collection = new Collection();
  collection.set("key1", "value1");
  collection.set("key2", "value2");
  collection.set("key3", "value3");
  
  const res = collection.filter((v, k) => v !== "value2");
  
  expect(res.toArray()).toEqual(["value1", "value3"]);
});

test("Testing the `map` method - creates a new collection with the results of calling a provided function on every element in the calling collection", () => {
  const collection = new Collection();
  collection.set("key1", "value1");
  collection.set("key2", "value2");
  collection.set("key3", "value3");

  const res = collection.map((value, key, collection) => {
    return value.toUpperCase() + '-' + key;
  });
  
  expect(res.toArray()).toEqual(["VALUE1-key1", "VALUE2-key2", "VALUE3-key3"]);
});

test("Testing the `some` method - tests whether at least one element passes the test", () => {
  const collection = new Collection();
  collection.set("key1", 10);
  collection.set("key2", 20);
  collection.set("key3", 30);

  const result1 = collection.some((value) => value > 25);
  expect(result1).toBe(true);

  const result2 = collection.some((value) => value > 50);
  expect(result2).toBe(false);
});

test("Testing the `every` method - tests whether all elements pass the test", () => {
  const collection = new Collection();
  collection.set("key1", 10);
  collection.set("key2", 20);
  collection.set("key3", 30);

  const result1 = collection.every((value) => value > 5);
  expect(result1).toBe(true);

  const result2 = collection.every((value) => value > 15);
  expect(result2).toBe(false);
});

test("Testing the `reduce` method - reduces the collection to a single value", () => {
  const collection = new Collection();
  collection.set("key1", 10);
  collection.set("key2", 20);
  collection.set("key3", 30);

  const sum = collection.reduce((accumulator, value) => accumulator + value, 0);
  expect(sum).toBe(60);
});

test("Testing the `find` method - returns the value of the first element that passes the test", () => {
  const collection = new Collection();
  collection.set("key1", 10);
  collection.set("key2", 20);
  collection.set("key3", 30);

  const result1 = collection.find((value) => value > 15);
  expect(result1).toBe(20);

  const result2 = collection.find((value) => value > 50);
  expect(result2).toBeUndefined();
});

test("Testing the `reduceRight` method - reduces the collection from right to left", () => {
  const collection = new Collection();
  collection.set("key1", 10);
  collection.set("key2", 20);
  collection.set("key3", 30);

  const concatenated = collection.reduceRight(
    (accumulator, value) => accumulator + value,
    ""
  );
  expect(concatenated).toBe("302010");
});

test("Testing the `flat` method - applies a mapping function and flattens the result", () => {
  const collection = new Collection();
  collection.set("key1", [1, 2]);
  collection.set("key2", [3, 4]);
  collection.set("key3", [5, 6]);

  const flattened = collection.flat((value) => value.map((v) => v * 2));
  
  expect(flattened.toArray()).toEqual([4, 8, 12]);
});

test("Testing the `keys` method - returns an iterator of keys", () => {
  const collection = new Collection();
  collection.set("key1", 10);
  collection.set("key2", 20);
  collection.set("key3", 30);

  const keys = Array.from(collection.keys());
  expect(keys).toEqual(["key1", "key2", "key3"]);
});

test("Testing the `values` method - returns an iterator of values", () => {
  const collection = new Collection();
  collection.set("key1", 10);
  collection.set("key2", 20);
  collection.set("key3", 30);

  const values = Array.from(collection.values());
  expect(values).toEqual([10, 20, 30]);
});

test("Testing the `findKey` method - returns the key of the first element that passes the test", () => {
  const collection = new Collection();
  collection.set("key1", 10);
  collection.set("key2", 20);
  collection.set("key3", 30);

  const result1 = collection.findKey((value) => value > 15);
  expect(result1).toBe("key2");

  const result2 = collection.findKey((value) => value > 50);
  expect(result2).toBeUndefined();
});

test("Testing the `toArray` method - returns an array of values in insertion order", () => {
  const collection = new Collection();
  collection.set("key1", 10);
  collection.set("key2", 20);
  collection.set("key3", 30);

  const arr = collection.toArray();
  expect(arr).toEqual([10, 20, 30]);
});

test("Testing the `keyArray` method - returns an array containing all the keys in insertion order", () => {
  const collection = new Collection();
  collection.set("key1", 10);
  collection.set("key2", 20);
  collection.set("key3", 30);

  const keys = collection.keyArray();
  expect(keys).toEqual(["key1", "key2", "key3"]);
});

test("Testing the `flatMap` method - applies a mapping function and flattens the result", () => {
  const collection = new Collection();
  collection.set("key1", [1, 2]);
  collection.set("key2", [3, 4]);
  collection.set("key3", [5, 6]);

  const mapped = collection.flatMap((value) => value.map((v) => v * 2));
  expect(mapped.toArray()).toEqual([4, 8, 12]);
});

test("Testing the `mapValues` method - applies a mapping function to each value", () => {
  const collection = new Collection();
  collection.set("key1", 10);
  collection.set("key2", 20);
  collection.set("key3", 30);

  const mapped = collection.mapValues((value) => value * 2);
  expect(mapped.toArray()).toEqual([20, 40, 60]);
});

test("Testing the `defaultSort` method - sorts the collection by keys in ascending order", () => {
  const collection = new Collection();
  collection.set("key3", 30);
  collection.set("key1", 10);
  collection.set("key2", 20);

  const sorted = collection.defaultSort();
  expect(sorted.keyArray()).toEqual(["key1", "key2", "key3"]);
});

test("Testing the `sorted` method - sorts the collection by keys using a custom sorting function", () => {
  const collection = new Collection();
  collection.set("key3", 30);
  collection.set("key1", 10);
  collection.set("key2", 20);

  const sorted = collection.sorted((a, b) => b.localeCompare(a));
  expect(sorted.keyArray()).toEqual(["key3", "key2", "key1"]);
});

test("Testing the `combineEntries` method - combines the entries of two collections into a new collection", () => {
  const collection1 = new Collection();
  collection1.set("key1", 10);
  collection1.set("key2", 20);

  const collection2 = new Collection();
  collection2.set("key2", 30);
  collection2.set("key3", 40);

  const combined = collection1.combineEntries(collection2);

  expect(combined.toArray()).toEqual([10, 30, 40]);
});

test("Testing the `difference` method - returns the difference between two collections", () => {
  const collection1 = new Collection();
  collection1.set("key1", 10);
  collection1.set("key2", 20);

  const collection2 = new Collection();
  collection2.set("key2", 20);
  collection2.set("key3", 30);

  const diff = collection1.difference(collection2);
  expect(diff.toArray()).toEqual([10]);
});

test("Testing the `subtract` method - subtracts elements of a collection from another collection", () => {
  const collection1 = new Collection();
  collection1.set("key1", 10);
  collection1.set("key2", 20);
  collection1.set("key3", 30);

  const collection2 = new Collection();
  collection2.set("key2", 20);

  const subtracted = collection1.subtract(collection2);
  expect(subtracted.toArray()).toEqual([10, 30]);
});

test("Testing the `subset` method - creates a new collection with a subset of items based on the provided keys", () => {
  const collection = new Collection();
  collection.set("key1", 10);
  collection.set("key2", 20);
  collection.set("key3", 30);

  const subset = collection.subset(["key2", "key3"]);
  expect(subset.toArray()).toEqual([20, 30]);
});

test("Testing the `intersect` method - returns the intersection of two collections", () => {
  const collection1 = new Collection();
  collection1.set("key1", 10);
  collection1.set("key2", 20);

  const collection2 = new Collection();
  collection2.set("key2", 20);
  collection2.set("key3", 30);

  const intersect = collection1.intersect(collection2);
  expect(intersect.toArray()).toEqual([20]);
});

test("Testing the `equals` method - checks if two collections are equal", () => {
  const collection1 = new Collection();
  collection1.set("key1", 10);
  collection1.set("key2", 20);

  const collection2 = new Collection();
  collection2.set("key2", 20);
  collection2.set("key1", 10);

  expect(collection1.equals(collection2)).toBe(true);

  const collection3 = new Collection();
  collection3.set("key1", 10);
  collection3.set("key2", 30);

  expect(collection1.equals(collection3)).toBe(false);
});

test("Testing the `tap` method - performs an operation on each value in the collection", () => {
  const collection = new Collection();
  collection.set("key1", 10);
  collection.set("key2", 20);
  collection.set("key3", 30);

  let sum = 0;
  const callback = (value) => {
    sum += value;
  };

  collection.tap(callback);

  expect(sum).toBe(60);
});

test("Testing the `random` method - returns a random value from the collection", () => {
  const collection = new Collection();
  collection.set("key1", 10);
  collection.set("key2", 20);
  collection.set("key3", 30);

  const randomValue = collection.random();

  expect([10, 20, 30]).toContain(randomValue);
});

test("Testing the `at` method - retrieves the value at the specified index", () => {
  const collection = new Collection();
  collection.set("key1", 10);
  collection.set("key2", 20);
  collection.set("key3", 30);

  expect(collection.at(0)).toBe(10);
  expect(collection.at(1)).toBe(20);
  expect(collection.at(2)).toBe(30);
  expect(collection.at(3)).toBeUndefined();
});

test("Testing the `lastKey` method - retrieves the last key in the collection", () => {
  const collection = new Collection();
  collection.set("key1", 10);
  collection.set("key2", 20);
  collection.set("key3", 30);

  expect(collection.lastKey()).toBe("key3");
});

test("Testing the `last` method - retrieves the last value in the collection", () => {
  const collection = new Collection();
  collection.set("key1", 10);
  collection.set("key2", 20);
  collection.set("key3", 30);

  expect(collection.last()).toBe(30);
});

test("Testing the `ensure` method - ensures that a key exists in the collection", () => {
  const collection = new Collection();
  collection.set("key1", 10);
  collection.set("key2", 20);

  collection.ensure("key2", 30);
  collection.ensure("key3", 40);

  expect(collection.get("key2")).toBe(20);
  expect(collection.get("key3")).toBe(40);
});

test("Testing the `keyAt` method - retrieves the key at the specified index", () => {
  const collection = new Collection();
  collection.set("key1", 10);
  collection.set("key2", 20);
  collection.set("key3", 30);

  expect(collection.keyAt(0)).toBe("key1");
  expect(collection.keyAt(1)).toBe("key2");
  expect(collection.keyAt(2)).toBe("key3");
  expect(collection.keyAt(3)).toBeUndefined();
});

test("Testing the `randomKey` method - retrieves a random key from the collection", () => {
  const collection = new Collection();
  collection.set("key1", 10);
  collection.set("key2", 20);
  collection.set("key3", 30);

  const randomKey = collection.randomKey();

  expect(["key1", "key2", "key3"]).toContain(randomKey);
});

test("Testing the `reverse` method - creates a new collection with reversed key-value pairs", () => {
  const collection = new Collection();
  collection.set("key1", 10);
  collection.set("key2", 20);
  collection.set("key3", 30);

  const reversed = collection.reverse();

  expect(reversed.get(10)).toBe("key1");
  expect(reversed.get(20)).toBe("key2");
  expect(reversed.get(30)).toBe("key3");
});

test("Testing the `sweep` method - creates a new collection with duplicate values removed", () => {
  const collection = new Collection();
  collection.set("key1", 10);
  collection.set("key2", 20);
  collection.set("key3", 20);
  collection.set("key4", 30);

  const swept = collection.sweep();
  
  expect(swept.toArray()).toEqual([10, 20, 30]);
});

test("Testing the `partition` method - partitions the collection into two groups based on a condition", () => {
  const collection = new Collection();
  collection.set("key1", 10);
  collection.set("key2", 20);
  collection.set("key3", 30);
  collection.set("key4", 40);

  const partitioned = collection.partition((value) => value % 2 === 0);

  expect(partitioned).toHaveLength(2);

  const [group1, group2] = partitioned;
  
  expect(group1.values).toEqual([ 10, 20, 30, 40 ]);
  expect(group2.values).toEqual([]);
});

test("Testing the `entries` method - returns an iterator with [key, value] pairs", () => {
  const collection = new Collection();
  collection.set("key1", 10);
  collection.set("key2", 20);
  collection.set("key3", 30);

  const iterator = collection.entries();

  expect(Array.from(iterator)).toEqual([
    ["key1", 10],
    ["key2", 20],
    ["key3", 30],
  ]);
});

test("Testing the `toArrayByKey` method - returns an array of grouped values by keys", () => {
  const collection = new Collection();
  collection.set("key1", 10);
  collection.set("key2", 20);
  collection.set("key3", 20);
  collection.set("key4", 30);

  const arrayByKey = collection.toArrayByKey();
  
  expect(arrayByKey).toEqual([
  { key: 'key1', values: [ 10 ] },
  { key: 'key2', values: [ 20 ] },
  { key: 'key3', values: [ 20 ] },
  { key: 'key4', values: [ 30 ] }
  ]);
});

test("Testing the `merge` method - merges two collections", () => {
  const collection1 = new Collection();
  collection1.set("key1", 10);
  collection1.set("key2", 20);

  const collection2 = new Collection();
  collection2.set("key2", 30);
  collection2.set("key3", 40);

  collection1.merge(collection2);

  expect(collection1.toArray()).toEqual([10, 30, 40]);
});

test("Testing the `clone` method - creates a copy of the collection", () => {
  const collection1 = new Collection();
  collection1.set("key1", 10);
  collection1.set("key2", 20);

  const collection2 = collection1.clone();
  
  expect(collection2.toArray()).toEqual([10, 20]);
  
  expect(collection1 === collection2).toBe(false);
});

test("Testing the `toSplised` method - returns a new Collection instance containing a subset of key-value pairs, starting from the specified start index (inclusive) and ending at the specified end index (exclusive)", () => {
  const collection = new Collection();
  collection.set("key1", "value1");
  collection.set("key2", "value2");
  collection.set("key3", "value3");

  const res = collection.toSplised(1, 3);
  
  expect(res.toArray()).toEqual(["value2", "value3"]);
});

test("Testing the `with` method - returns a new collection with the replaced value at the specified index", () => {
  const collection = new Collection();
  collection.set("key1", "value1");
  collection.set("key2", "value2");
  collection.set("key3", "value3");

  const res = collection.with(1, "new ♥");
  
  expect(res.toArray()[1] === collection.toArray()[1]).toBe(false);
});

test("Testing the `toReversed` method - returns a new Collection instance with key-value pairs in reverse order", () => {
  const collection = new Collection();
  collection.set("key1", "value1");
  collection.set("key2", "value2");
  collection.set("key3", "value3");

  const res = collection.toReversed();
  
  expect(res.toArray()).toEqual(["value3", "value2", "value1"]);
});

test("Testing the `chunk` method - splits the collection into subcollections of the given size and returns an array with new collections", () => {
  const collection = new Collection();
  collection.set("key1", "value1");
  collection.set("key2", "value2");
  collection.set("key3", "value3");

  const result = collection.chunk(1);

  expect(result).toEqual([
    new Collection([[0, "value1"]]),
    new Collection([[0, "value2"]]),
    new Collection([[0, "value3"]])
  ]);
});

test("Testing the `keyOf` - returns the first key corresponding to the specified value in the collection", () => {
  const collection = new Collection();
  collection.set("key1", "value1");
  collection.set("key2", "value2");
  collection.set("key3", "value3");

  const res = collection.keyOf("value3");
  
  expect(res).toBe("key3");
});

test("Testing the `toJSON` method - converts the collection to JSON", () => {
  const collection = new Collection();
  collection.set("key1", 10);
  collection.set("key2", 20);
  collection.set("key3", 30);

  const json = collection.toJSON();
  expect(json).toEqual({
    key1: 10,
    key2: 20,
    key3: 30,
  });
});

