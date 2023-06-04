# IntentsBitField Class

The `IntentsBitField` class represents a bit field for Telegram intents. It provides methods for manipulating and decoding the bit field.

## Constructor

### IntentsBitField(bits = 0)

Creates a new instance of the `IntentsBitField` class.

#### Parameters

- `bits` (number, optional): The initial value of the bit field. Default is 0.

#### Returns

- An instance of the `IntentsBitField` class.

## Methods

### add(...ints)

Adds one or more bits to the bit field.

#### Parameters

- `ints` (number): The bits to add to the bit field.

#### Returns

- The updated `IntentsBitField` instance.

#### Throws

- `BitFieldError` if a specified bit is not a number.

### remove(...ints)

Removes one or more Telegram intents from the bit field.

#### Parameters

- `ints` (number): The bits that represent the Telegram intents to be removed.

#### Returns

- The `IntentsBitField` instance.

#### Throws

- `BitFieldError` if an invalid argument is passed.

### serialize()

Returns the bit field as a number.

#### Returns

- The bit field as a number.

### toArray()

Returns an array of intent strings based on the current bit value.

#### Returns

- An array of intent strings.

### has(bit)

Checks if the bit field has a specific bit set.

#### Parameters

- `bit` (number): The bit to check.

#### Returns

- `true` if the bit is set, `false` otherwise.

## Static Methods

### decodeIntents(intentsBitField)

Decodes a bit field instance and returns an array of intent strings.

#### Parameters

- `intentsBitField` (IntentsBitField): The bit field instance to decode.

#### Returns

- An array of intent strings.

## Example Usage

```javascript
const { IntentsBitField, decodeIntents } = require('telegramsjs');
const { IntentsBitField, decodeIntents } = require('telegramsjs');
const { IntentsBitField, decodeIntents } = require('telegramsjs');

// Create a new IntentsBitField instance
const intents = new IntentsBitField();

// Add bits to the bit field
intents.add(1, 2, 4);

// Serialize the bit field
const serializedBits = intents.serialize();
console.log(serializedBits);
// Output: 7

// Check if the bit field has a specific bit set
const hasBit2 = intents.has(2);
console.log(hasBit2);
// Output: true

// Remove bits from the bit field
intents.remove(2);

// Get the updated array of intent strings
const intentStrings = intents.toArray();
console.log(intentStrings);
// Output: ["message", "edited_message"]

// Decode the bit field to intent strings using the static method
const decodedIntents = decodeIntents(intents);
console.log(decodedIntents);
// Output: ["message", "edited_message"]
```

This example demonstrates the usage of the `IntentsBitField` class for manipulating and decoding bit fields representing Telegram intents.