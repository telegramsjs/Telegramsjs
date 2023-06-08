## Object: Events

Events object with predefined event types.

### Properties

- `Message`: Represents the 'message' event.
- `EditedMessage`: Represents the 'edited_message' event.
- `ChannelPost`: Represents the 'channel_post' event.
- `EditedChannelPost`: Represents the 'edited_channel_post' event.
- `InlineQuery`: Represents the 'inline_query' event.
- `ChosenInlineResult`: Represents the 'chosen_inline_result' event.
- `CallbackQuery`: Represents the 'callback_query' event.
- `ShippingQuery`: Represents the 'shipping_query' event.
- `PreCheckoutQuery`: Represents the 'pre_checkout_query' event.
- `Poll`: Represents the 'poll' event.
- `PollAnswer`: Represents the 'poll_answer' event.
- `ChatMember`: Represents the 'chat_member' event.
- `MyChatMember`: Represents the 'my_chat_member' event.
- `ChatJoinRequest`: Represents the 'chat_join_request' event.
- `ReplyMessage`: Represents the 'reply_message' event.

### Usage

The `Events` object provides a set of predefined constants representing different event types in Telegram.

Example:

```javascript
const { Events } = require('telegramsjs');

console.log(Events.Message); // Output: "message"
console.log(Events.CallbackQuery); // Output: "callback_query"
// ...
```