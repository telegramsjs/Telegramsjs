# TelegramBot

A class representing a Telegram Bot client.

## Constructor

### `TelegramBot(token, options)`

Creates a new TelegramBot client.

- `token` (string): The Telegram Bot API token.
- `options` (Object): The client options.
  - `intents` (string | array | number): The client intents.
  - `parseMode` (string): The parse mode for message formatting.
  - `chatId` (string | number): The default chat ID for sending messages.
  - `queryString` (string): The default query string for API requests.
  - `offSetType` (string | object): The type of offset to use for updates.

## Properties

- `token` (string): The Telegram Bot API token.
- `baseUrl` (string): The base URL for the Telegram Bot API.

## Methods

### `login()`

Starts the client and logs in the bot.

- Returns: A Promise that resolves to the client object.

### `on(eventName, listener)`

Registers a listener for the specified event.

- `eventName` (string): The name of the event.
- `listener` (Function): The listener function.

### `off(eventName, listener)`

Removes the specified listener for the given event.

- `eventName` (string): The name of the event.
- `listener` (Function): The listener function to remove.

### `once(eventName, listener)`

Registers a one-time listener for the specified event. The listener is automatically removed after it's invoked.

- `eventName` (string): The name of the event.
- `listener` (Function): The listener function.

### `setCommands()`

Sets the commands for the bot.

- Returns: A Promise that resolves when the commands are set.

### `getCommands()`

Gets the currently set commands for the bot.

- Returns: A Promise that resolves with the list of commands.

### `deleteCommands()`

Deletes the currently set commands for the bot.

- Returns: A Promise that resolves when the commands are deleted.

### `setDescription()`

Sets the description of the bot.

- Returns: A Promise that resolves when the description is set.

### `getDescription()`

Gets the currently set description of the bot.

- Returns: A Promise that resolves with the description.

### `setShortDescription()`

Sets the short description of the bot.

- Returns: A Promise that resolves when the short description is set.

### `getShortDescription()`

Gets the currently set short description of the bot.

- Returns: A Promise that resolves with the short description.

### `getName()`

Gets the name of the bot.

- Returns: A Promise that resolves with the bot's name.

### `setName()`

Sets the name of the bot.

- Returns: A Promise that resolves when the name is set.
