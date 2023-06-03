/**
 * Events object with predefined event types.
 * @typedef {Object} Events
 * @property {string} Message - Represents the 'message' event.
 * @property {string} EditedMessage - Represents the 'edited_message' event.
 * @property {string} ChannelPost - Represents the 'channel_post' event.
 * @property {string} EditedChannelPost - Represents the 'edited_channel_post' event.
 * @property {string} InlineQuery - Represents the 'inline_query' event.
 * @property {string} ChosenInlineResult - Represents the 'chosen_inline_result' event.
 * @property {string} CallbackQuery - Represents the 'callback_query' event.
 * @property {string} ShippingQuery - Represents the 'shipping_query' event.
 * @property {string} PreCheckoutQuery - Represents the 'pre_checkout_query' event.
 * @property {string} Poll - Represents the 'poll' event.
 * @property {string} PollAnswer - Represents the 'poll_answer' event.
 * @property {string} ChatMember - Represents the 'chat_member' event.
 * @property {string} MyChatMember - Represents the 'my_chat_member' event.
 * @property {string} ChatJoinRequest - Represents the 'chat_join_request' event.
 * @property {string} ReplyMessage - Represents the 'reply_message' event.
 */
const Events = {
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
  ChatMember: 'chat_member',
  MyChatMember: 'my_chat_member',
  ChatJoinRequest: 'chat_join_request',
  ReplyMessage: 'reply_message'
};

module.exports = Events;