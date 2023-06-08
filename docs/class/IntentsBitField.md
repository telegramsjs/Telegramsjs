# Telegramsjs

This is a module that provides a `IntentsBitField` class for handling bit fields representing Telegram intents. It also includes a function `decodeIntents` for decoding a bit field instance and returning an array of intent strings.

## Installation

Install the `telegramsjs` module using npm:

```shell
npm install telegramsjs
```

## Usage

### Importing the module

```javascript
const { IntentsBitField, decodeIntents } = require('telegramsjs');
```

### Creating an instance of IntentsBitField

```javascript
const intents = new IntentsBitField();
```

### Adding bits to the bit field

```javascript
intents.add(bit1, bit2, ...);
```

Adds one or more bits to the bit field.

- `bit1, bit2, ...` (number): The bits to add to the bit field.

Returns the updated `IntentsBitField` instance.

Throws a `BitFieldError` if a specified bit is not a number.

### Removing bits from the bit field

```javascript
intents.remove(bit1, bit2, ...);
```

Removes one or more Telegram intents from the bit field.

- `bit1, bit2, ...` (number): The bits that represent the Telegram intents to be removed.

Returns the `IntentsBitField` instance.

Throws a `BitFieldError` if an invalid argument is passed.

### Serializing the bit field

```javascript
const serializedBits = intents.serialize();
```

Returns the bit field as a number.

### Converting the bit field to an array of intent strings

```javascript
const intentArray = intents.toArray();
```

Returns an array of intent strings based on the current bit value.

### Checking if a specific bit is set

```javascript
const isBitSet = intents.has(bit);
```

Checks if the bit field has a specific bit set.

- `bit` (number): Bit to check.

Returns `true` if the bit is set, `false` otherwise.

### Decoding a bit field instance

```javascript
const intentsArray = decodeIntents(intentsBitField);
```

Decodes a bit field instance and returns an array of intent strings.

- `intentsBitField` (IntentsBitField): Bit field instance to decode.

Returns an array of intent strings.

## Example

```javascript
const { IntentsBitField, decodeIntents } = require('TelegramBot');

const intents = new IntentsBitField();

intents.add(1, 2, 4);
console.log(intents.toArray()); // Output: ['message', 'edited_message', 'callback_query']

intents.remove(2);
console.log(intents.toArray()); // Output: ['message', 'callback_query']

console.log(intents.has(4)); // Output: true

const serializedBits = intents.serialize();
console.log(serializedBits); // Output: 5

const decodedIntents = decodeIntents(intents);
console.log(decodedIntents); // Output: ['message', 'callback_query']
```