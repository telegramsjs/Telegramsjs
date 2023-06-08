## Methods

### `leave(chat_id)`

Leaves a chat.

- `chat_id` (optional): The ID of the chat to leave. If not provided, the chat ID is retrieved from the current update.

### `send(options, defaults = {})`

Sends a message.

- `options`: The options for the message. It can be either a string or an object with the following properties:
  - `text` (required): The text of the message.
  - `chatId` (optional): The ID of the chat to send the message to. If not provided, the chat ID is retrieved from the current update.
  - `messageId` (optional): The ID of the message to reply to.
  - `replyMarkup` (optional): The reply markup for the message.
  - `allowReply` (optional): Whether to allow replies to the message.
  - `notification` (optional): Whether to send the message as a notification.
  - `content` (optional): The content of the message.
  - `threadId` (optional): The ID of the thread to reply to.
  - `parseMode` (optional): The parse mode of the message.

- `defaults` (optional): Default options to be used if not provided in `options`.

### `remove(options)`

Removes a message.

- `options`: The options for removing the message. It can be an object with the following properties:
  - `chatId` (optional): The ID of the chat where the message is located. If not provided, the chat ID is retrieved from the current update.
  - `messageId` (optional): The ID of the message to remove.
  - `revoke` (optional): Whether to revoke the message.

### `update(options, defaults = {})`

Updates a message.

- `options`: The options for updating the message. It can be either a string or an object with the following properties:
  - `text` (required): The updated text of the message.
  - `chatId` (optional): The ID of the chat where the message is located. If not provided, the chat ID is retrieved from the current update.
  - `messageId` (optional): The ID of the message to update.
  - `replyMarkup` (optional): The updated reply markup for the message.
  - `webPage` (optional): The updated web page content.
  - `parseMode` (optional): The updated parse mode of the message.
- `defaults` (optional): Default options to be used if not provided in `options`.

### `reply(options, defaults = {})`

Reply to a Telegram message or callback query.

- `options` (string or object): The message text or an object containing the reply options.
- `defaults` (object, optional): Default options for the reply.

Throws a `ParameterError` if the parameters are invalid.

### `typing(typing, options)`

Send a typing action to indicate the bot is typing.

- `typing` (boolean): Specify whether the bot is typing or not.
- `options` (object, optional): Additional options for sending the typing action.

### `isCommand(checkAllEntities = false)`

Check if the message contains a bot command.

- `checkAllEntities` (boolean, optional): Specify whether to check all message entities for a bot command.

Returns `true` if a bot command is found, `false` otherwise.

### `isPhoto()`

Check if the message contains a photo.

Returns `true` if a photo is found, `false` otherwise.

### `isDocument()`

Check if the message contains a document.

Returns `true` if a document is found, `false` otherwise.

### `isAudio()`

Check if the message contains an audio file.

Returns `true` if an audio file is found, `false` otherwise.

### `isVideoNote()`

Check if the message contains a video note.

Returns `true` if a video note is found, `false` otherwise.

### `isVoice()`

Check if the message contains a voice message.

Returns `true` if a voice message is found, `false` otherwise.

### `isSticker()`

Check if the message contains a sticker.

Returns `true` if a sticker is found, `false` otherwise.

### `isContact()`

Check if the message contains a contact.

Returns `true` if a contact is found, `false` otherwise.

### `isPoll()`

Check if the message contains a poll.

Returns `true` if a poll is found, `false` otherwise.

### `isLocation()`

Check if the message contains a location.

Returns `true` if a location is found, `false` otherwise.

### `createMessageCollector(options)`

Create a message collector to collect messages that match the specified criteria.

- `options` (object): Options for the message collector.

Returns a `MessageCollector` instance.

### `deferUpdate(id)`

Defer an update to stop receiving further updates for the same callback query.

- `id` (string): The ID of the callback query.

Sends an answer to the callback query using `answerCallbackQuery`.
