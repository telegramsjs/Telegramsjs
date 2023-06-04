To use the `Collection` class, you would first need to import it into your JavaScript file. Assuming the code is in a file called `collection.js`, you can import it like this:

```javascript
const { Collection } = require('./collection');
```

Here's an example of how you can use the `Collection` class:

```javascript
// Create a new collection
const collection = new Collection();

// Set key-value pairs
collection.set('key1', 'value1');
collection.set('key2', 'value2');
collection.set('key3', 'value3');

// Retrieve a value by key
const value1 = collection.get('key1');
console.log(value1); // Output: value1

// Check if the collection contains a key
const hasKey = collection.has('key2');
console.log(hasKey); // Output: true

// Remove a key-value pair
const deleted = collection.delete('key3');
console.log(deleted); // Output: true

// Iterate over each key-value pair
collection.forEach((value, key) => {
  console.log(`Key: ${key}, Value: ${value}`);
});

// Create a new collection with filtered key-value pairs
const filteredCollection = collection.filter((value, key) => key.startsWith('k'));
console.log(filteredCollection.toArray()); // Output: [ ['key1', 'value1'], ['key2', 'value2'] ]

// Create a new collection with mapped values
const mappedCollection = collection.mapValues((value, key) => value.toUpperCase());
console.log(mappedCollection.toArray()); // Output: [ ['key1', 'VALUE1'], ['key2', 'VALUE2'] ]

// Perform an operation on each value in the collection
collection.tap(value => console.log(value));

// Retrieve a random value from the collection
const randomValue = collection.random();
console.log(randomValue);

// Retrieve the value at a specified index
const valueAtIndex = collection.at(1);
console.log(valueAtIndex);

// Retrieve the last key and value in the collection
const lastKey = collection.lastKey();
const lastValue = collection.last();
console.log(lastKey, lastValue);

// Ensure a key exists in the collection
collection.ensure('key4', 'value4');
console.log(collection.get('key4')); // Output: value4
```

This is just a basic example, and there are many more methods available in the `Collection` class. You can refer to the class documentation for more details on each method and how to use them.