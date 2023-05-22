/**
 * @typedef {Object} TelegramIntentBits
 * @property {string} Message - Represents a Telegram message.
 * @property {string} EditedMessage - Represents an edited Telegram message.
 * @property {string} ChannelPost - Represents a post in a Telegram channel.
 * @property {string} EditedChannelPost - Represents an edited post in a Telegram channel.
 * @property {string} InlineQuery - Represents an inline query from a user.
 * @property {string} ChosenInlineResult - Represents a chosen inline query result.
 * @property {string} CallbackQuery - Represents a callback query from a user.
 * @property {string} ShippingQuery - Represents a shipping query from a user.
 * @property {string} PreCheckoutQuery - Represents a pre-checkout query from a user.
 * @property {string} Poll - Represents a poll from a user.
 * @property {string} PollAnswer - Represents an answer to a poll from a user.
 * @property {string} MyChatMember - Represents a user's chat membership status in their own chat.
 * @property {string} ChatMember - Represents a user's chat membership status in a chat they are a member of.
 * @property {string} ChatJoinRequest - Represents a user's request to join a chat.
 */
const TelegramIntentBits = {
    Message: 'message',
    EditedMessage: 'edited_message',
    ChannelPost: 'channel_post',
    EditedChannelPost: 'edited_channel_post',
    InlineQuery: 'inline_query',
    ChosenInlineResult: 'chosen_inline_result',
    CallbackQuery: 'callback_query',
    ShippingQuery: 'shipping_query',
    PreCheckoutQuery: 'pre_checkout_query',
    Poll: 'poll',
    PollAnswer: 'poll_answer',
    MyChatMember: 'my_chat_member',
    ChatMember: 'chat_member',
    ChatJoinRequest: 'chat_join_request'
}

module.exports = TelegramIntentBits;