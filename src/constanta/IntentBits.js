/**
 * @typedef {Object} IntentBits
 * @property {number} Message - Represents a bit flag for Telegram messages.
 * @property {number} EditedMessage - Represents a bit flag for edited Telegram messages.
 * @property {number} ChannelPost - Represents a bit flag for posts in Telegram channels.
 * @property {number} EditedChannelPost - Represents a bit flag for edited posts in Telegram channels.
 * @property {number} InlineQuery - Represents a bit flag for inline queries from users.
 * @property {number} ChosenInlineResult - Represents a bit flag for chosen inline query results.
 * @property {number} CallbackQuery - Represents a bit flag for callback queries from users.
 * @property {number} ShippingQuery - Represents a bit flag for shipping queries from users.
 * @property {number} PreCheckoutQuery - Represents a bit flag for pre-checkout queries from users.
 * @property {number} Poll - Represents a bit flag for polls from users.
 * @property {number} PollAnswer - Represents a bit flag for answers to polls from users.
 * @property {number} MyChatMember - Represents a bit flag for a user's chat membership status in their own chat.
 * @property {number} ChatMember - Represents a bit flag for a user's chat membership status in a chat they are a member of.
 * @property {number} ChatJoinRequest - Represents a bit flag for a user's request to join a chat.
 */
const IntentBits = {
  Message: 1 << 0,
  EditedMessage: 1 << 1,
  ChannelPost: 1 << 2,
  EditedChannelPost: 1 << 3,
  InlineQuery: 1 << 4,
  ChosenInlineResult: 1 << 5,
  CallbackQuery: 1 << 6,
  ShippingQuery: 1 << 7,
  PreCheckoutQuery: 1 << 8,
  Poll: 1 << 9,
  PollAnswer: 1 << 10,
  MyChatMember: 1 << 11,
  ChatMember: 1 << 12,
  ChatJoinRequest: 1 << 13
};

module.exports = IntentBits;