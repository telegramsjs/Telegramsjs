## Object: TelegramIntentBits

An object representing various intents in Telegram.

### Properties

- `Message`: Represents a Telegram message.
- `EditedMessage`: Represents an edited Telegram message.
- `ChannelPost`: Represents a post in a Telegram channel.
- `EditedChannelPost`: Represents an edited post in a Telegram channel.
- `InlineQuery`: Represents an inline query from a user.
- `ChosenInlineResult`: Represents a chosen inline query result.
- `CallbackQuery`: Represents a callback query from a user.
- `ShippingQuery`: Represents a shipping query from a user.
- `PreCheckoutQuery`: Represents a pre-checkout query from a user.
- `Poll`: Represents a poll from a user.
- `PollAnswer`: Represents an answer to a poll from a user.
- `MyChatMember`: Represents a user's chat membership status in their own chat.
- `ChatMember`: Represents a user's chat membership status in a chat they are a member of.
- `ChatJoinRequest`: Represents a user's request to join a chat.

### Usage

The `TelegramIntentBits` object provides predefined intents for different events in Telegram. These intents can be used to identify and handle specific types of events.

Example:

```javascript
const { TelegramIntentBits } = require('telegramsjs');

// Handle a Telegram message
if (intentBits & TelegramIntentBits.Message) {
  console.log('Received a message');
}

// Handle an edited Telegram message
if (intentBits & TelegramIntentBits.EditedMessage) {
  console.log('Received an edited message');
}

// Handle an inline query from a user
if (intentBits & TelegramIntentBits.InlineQuery) {
  console.log('Received an inline query');
}

// ... Handle other intents ...

```