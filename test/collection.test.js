const { Collection } = require("../dist/src/collection/Collection.js");
const { expect } = require("jest");

test("Testing the `toSplised` method - returns a new Collection instance containing a subset of key-value pairs, starting from the specified start index (inclusive) and ending at the specified end index (exclusive)", () => {
  const collection = new Collection();
  collection.set("key1", "value1");
  collection.set("key2", "value2");
  collection.set("key3", "value3");

  const res = collection.toSplised(1, 3);
  console.log(res);
  console.log(collection);
});

test("Testing the `with` method - returns a new collection with the replaced value at the specified index", () => {
  const collection = new Collection();
  collection.set("key1", "value1");
  collection.set("key2", "value2");
  collection.set("key3", "value3");

  const res = collection.with(1, "new ♥");
  console.log(res);
  console.log(collection);
});

test("Testing the `toReversed` method - returns a new Collection instance with key-value pairs in reverse order", () => {
  const collection = new Collection();
  collection.set("key1", "value1");
  collection.set("key2", "value2");
  collection.set("key3", "value3");

  const res = collection.toReversed();
  console.log(res);
  console.log(collection);
});

test("Testing the `chunk` - splits the collection into subcollections of the given size and returns an array with new collections", () => {
  const collection = new Collection();
  collection.set("key1", "value1");
  collection.set("key2", "value2");
  collection.set("key3", "value3");

  const res = collection.chunk(1);
  console.log(res);
  console.log(collection);
});

test("Testing the `keyOf` - returns the first key corresponding to the specified value in the collection", () => {
  const collection = new Collection();
  collection.set("key1", "value1");
  collection.set("key2", "value2");
  collection.set("key3", "value3");

  const res = collection.keyOf("value3");
  console.log(res);
  console.log(collection);
});
