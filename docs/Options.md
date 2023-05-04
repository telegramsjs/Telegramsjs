# Collection

A collection data structure that maps unique keys to values.

### Constructor

`constructor(entries = [])`

Create a new Collection instance.

- `entries` (Array): An optional array of [key, value] pairs to add to the collection.

# IntentsBitField

Represents a bit field for Telegram intents.

### Constructor

`constructor(bits = 0)`

Create a new IntentsBitField instance.

- `bits` (number): An optional number to initialize the bit field.

# TelegramBot

A class representing a Telegram Bot client.

### Constructor

`constructor(token, options)`

Creates a new TelegramBot client.

- `token` (string): The Telegram Bot API token.
- `options` (Object): The client options.
  - `options.intents` (Object): The client intents.
  - `options.parseMode` (string): The default parse mode for sending messages.
  - `options.chatId` (number): The default chat ID for sending messages.