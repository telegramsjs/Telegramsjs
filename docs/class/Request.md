## Request

Represents a request object for making requests to the Telegram Bot API.

### Constructor

#### Request(token, intents, queryString, offSetType, parseMode)

Constructs a new Request object.

- `token` (string, optional): The API token for the bot.
- `intents` (string | array | number, optional): The types of updates the bot is interested in.
- `queryString` (string, optional): The type of query string to use for requests.
- `offSetType` (string | boolean | object, optional): The type of offset to use for updates.
- `parseMode` (string, optional): The parse mode for message formatting.

### Properties

#### token

The API token for the bot.

#### baseUrl

The base URL for API requests.

#### offset

The current offset for updates.

#### queryString

The type of query string to use for requests.

#### offSetType

The type of offset to use for updates.

#### parseMode

The parse mode for message formatting.

#### intents

The types of updates the bot is interested in.

#### lastTimeMap

A map object for storing the last update time.

#### startTime

The start time of the bot.

#### update_id

The last update ID received.

#### last_object

The last received object.

### Methods

#### getUpdates()

Gets the updates from the Telegram Bot API.

- Returns: `Promise.<Array.<object>>` An array of updates.

#### request(method, params)

Makes a request to the Telegram Bot API.

- `method` (string): The API method to call.
- `params` (Object): The parameters to include in the API call.
- Returns: `Promise.<object>` The response from the API call.

#### uptime

Gets the uptime of the bot.

- Returns: `number` The uptime in milliseconds.

#### ping

Gets the ping latency of the bot.

- Returns: `Promise.<number>` The ping latency in milliseconds.

#### updateId

Gets the last update ID received.

- Returns: `number|null` The last update ID, or null if not available.

#### lastObject

Gets the last object received.

- Returns: `object` The last received object.

#### setToken(token)

Set the token for the bot.

- `token` (string): The token to set.
- Returns: `boolean` Returns true if the token was set successfully.

#### setIntents(intents)

Set the intents for the bot.

- `intents` (string | array | number): The intents to set.
- Returns: `boolean` Returns true if the intents were set successfully.

#### setParseMode(parseMode)

Set the parse mode for the bot.

- `parseMode` (string): The parse mode to set.
- Returns: `boolean` Returns true if the parse mode was set successfully.

#### setChatId(chatId)

Set the chat ID for the bot.

- `chatId` (string | number): The chat ID to set.
- Returns: `string | number` Returns the chat ID that was set.

#### setQueryString(queryString)

Set the query string for the bot.

- `queryString` (string): The query string to set.
- Returns: `boolean` Returns true if the query string was set successfully.

#### setOffSetType(offSetType)

Set the offset type for the bot.

- `offSetType` (string): The offset type to set.
- Returns: `string` Returns the offset type that was set.