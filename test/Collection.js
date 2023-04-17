const { Collection } = require("../src/index.js");

const col = new Collection([["a", 1], ["b", 2], ["c", 3], ["d", 4]]);

// function usage get
console.log(col.get("a")); // 1

// function usage set
col.set("e", 5);
console.log(col.get("e")); // 5

// function usage has
console.log(col.has("b")); // true

// function usage delete
console.log(col.delete("c")); // true
console.log(col.has("c")); // false

// function usage clear
col.clear();
console.log(col.size); // 0

// function usage forEach
const logEntry = (value, key, collection) => {
  console.log(`key: ${key}, value: ${value}`);
};
col.set("a", 1);
col.set("b", 2);
col.forEach(logEntry);

// function usage filter
const filteredCol = col.filter((value) => value > 1);
console.log(filteredCol.size); // 1

// function usage map
const mappedCol = col.map((value) => value * 2);
console.log(mappedCol.get("a")); // 2
console.log(mappedCol.get("b")); // 4

// function usage some
const hasEvenNumber = col.some((value) => value % 2 === 0);
console.log(hasEvenNumber); // true

// function usage every
const allNumbersAreEven = col.every((value) => value % 2 === 0);
console.log(allNumbersAreEven); // false


const coll = new Collection([
  ['foo', 1],
  ['bar', 2],
  ['baz', 3]
]);

// Example with reduce
const sum = coll.reduce((acc, value) => acc + value, 0); // 6


// Example with find
const value = coll.find(value => value === 2); // 2

// Example with findKey
const key = coll.findKey(key => key === 'foo'); // 'foo'

// Example with toArray
const arr = coll.toArray(); // [['foo', 1], ['bar', 2], ['baz', 3]]

// Example with keyArray
const keys = coll.keyArray(); // ['foo', 'bar', 'baz']

// Example with entries
const entries = coll.entries(); // an iterator yielding ['foo', 1], ['bar', 2], ['baz', 3]

// Example with toArrayByKey
const arrByKeys = coll.toArrayByKey(); // [1, 2, 3]

// Example with merge
const coll2 = new Collection([['qux', 4]]);
const mergedColl = coll.merge(coll2); // Collection { _items: Map { 'foo' => 1, 'bar' => 2, 'baz' => 3, 'qux' => 4 }, size: 4 }

// Example with clone
const clonedColl = coll.clone(); // Collection { _items: Map { 'foo' => 1, 'bar' => 2, 'baz' => 3 }, size: 3 }

const toMap = coll.toMap();
console.log(toMap); // Map(4) { 'foo' => 1, 'bar' => 2, 'baz' => 3, 'qux' => 4 }

// Example with toJSON
const json = coll.toJSON(); // '{"foo":1,"bar":2,"baz":3}'

// Example with [Symbol.iterator]
for (const [key, value] of coll) {
  console.log(`${key}: ${value}`);
}
// Output:
// foo: 1
// bar: 2
// baz: 3