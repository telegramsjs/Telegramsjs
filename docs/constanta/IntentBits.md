## Object: IntentBits

An object representing bit flags for different intents in Telegram.

### Properties

- `Message`: Represents a bit flag for Telegram messages.
- `EditedMessage`: Represents a bit flag for edited Telegram messages.
- `ChannelPost`: Represents a bit flag for posts in Telegram channels.
- `EditedChannelPost`: Represents a bit flag for edited posts in Telegram channels.
- `InlineQuery`: Represents a bit flag for inline queries from users.
- `ChosenInlineResult`: Represents a bit flag for chosen inline query results.
- `CallbackQuery`: Represents a bit flag for callback queries from users.
- `ShippingQuery`: Represents a bit flag for shipping queries from users.
- `PreCheckoutQuery`: Represents a bit flag for pre-checkout queries from users.
- `Poll`: Represents a bit flag for polls from users.
- `PollAnswer`: Represents a bit flag for answers to polls from users.
- `MyChatMember`: Represents a bit flag for a user's chat membership status in their own chat.
- `ChatMember`: Represents a bit flag for a user's chat membership status in a chat they are a member of.
- `ChatJoinRequest`: Represents a bit flag for a user's request to join a chat.

### Usage

The `IntentBits` object provides bit flags representing different intents in Telegram. These flags can be used to specify the type of event or action you want to handle.

Example:

```javascript
const { IntentBits } = require('telegramsjs');

const intent = IntentBits.Message | IntentBits.CallbackQuery;

// Check if the intent includes a message
if (intent & IntentBits.Message) {
  console.log('Received a message');
}

// Check if the intent includes a callback query
if (intent & IntentBits.CallbackQuery) {
  console.log('Received a callback query');
}
```