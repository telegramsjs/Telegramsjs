## Util

A collection of utility functions for working with Telegram messages and links.

### Functions

#### checkMessageLinks(message)

Checks if a message contains any links.

- `message` (string): The message to check.
- Returns: `boolean` - Returns `true` if the message contains links, otherwise `false`.

#### extractUserMentions(message)

Extracts user mentions from a message.

- `message` (string): The message to extract mentions from.
- Returns: `string[]` - An array of user mentions found in the message.

#### extractHashtags(message)

Extracts hashtags from a message.

- `message` (string): The message to extract hashtags from.
- Returns: `string[]` - An array of hashtags found in the message.

#### checkLocation(location)

Checks if a location object is valid.

- `location` (object): The location object to check.
  - `location.latitude` (string | number): The latitude of the location.
  - `location.longitude` (string | number): The longitude of the location.
- Returns: `boolean` - Returns `true` if the location object is valid, otherwise `false`.

#### checkUserMentions(message)

Checks if a message contains any user mentions.

- `message` (string): The message to check.
- Returns: `boolean` - Returns `true` if the message contains user mentions, otherwise `false`.

#### checkHashtags(message)

Checks if a message contains any hashtags.

- `message` (string): The message to check.
- Returns: `boolean` - Returns `true` if the message contains hashtags, otherwise `false`.

#### checkPhoneNumber(phoneNumber)

Checks if a phone number is valid.

- `phoneNumber` (string): The phone number to check.
- Returns: `boolean` - Returns `true` if the phone number is valid, otherwise `false`.

#### extractUserIdFromLink(link)

Extracts the user ID from a Telegram link.

- `link` (string): The Telegram link to extract the user ID from.
- Returns: `string|null` - The extracted user ID, or `null` if not found.

#### checkGroupOrChannel(message)

Checks if a message contains a Telegram group or channel link.

- `message` (string): The message to check.
- Returns: `boolean` - Returns `true` if the message contains a group or channel link, otherwise `false`.

#### checkEmoji(message)

Checks if a message contains only emoji characters.

- `message` (string): The message to check.
- Returns: `boolean` - Returns `true` if the message contains only emoji characters, otherwise `false`.

#### checkSticker(message)

Checks if a message contains only a Telegram sticker.

- `message` (string): The message to check.
- Returns: `boolean` - Returns `true` if the message contains only a Telegram sticker, otherwise `false`.

#### extractUsernameFromLink(link)

Extracts the username from a Telegram link.

- `link` (string): The Telegram link to extract the username from.
- Returns: `string|null` - The extracted username, or `null` if not found.

#### checkBot(message)

Checks if a message contains a Telegram bot username.

- `message` (string): The message to check.
- Returns: `boolean` - Returns `true` if the message contains a Telegram bot username, otherwise `false`.

#### checkChannel(message)

Checks if a message contains a Telegram channel link (excluding usernames).

- `message` (string): The message to check.
- Returns: `boolean` - Returns `true` if the message contains a Telegram channel link, otherwise `false`.

#### checkLink(message)

Checks if a message contains a Telegram link.

- `message` (string): The message to check.
- Returns: `boolean` - Returns `true` if the message contains a Telegram link, otherwise `false`.

#### checkGroup(message)

Checks if a message contains a Telegram group link.

- `message` (string): The message to check.
- Returns: `boolean` - Returns `true` if the message contains a Telegram group link, otherwise `false`.

#### checkUsername(username)

Checks if a username is valid.

- `username` (string): The username to check.
- Returns: `boolean` - Returns `true` if the username is valid, otherwise `false`.

#### extractUsername(link)

Extracts the username from a Telegram link.

- `link` (string): The Telegram link to extract the username from.
- Returns: `string|null` - The extracted username, or `null` if not found.
