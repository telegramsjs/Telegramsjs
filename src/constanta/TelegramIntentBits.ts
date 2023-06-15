type TelegramIntentBits = {
  Message: string;
  EditedMessage: string;
  ChannelPost: string;
  EditedChannelPost: string;
  InlineQuery: string;
  ChosenInlineResult: string;
  CallbackQuery: string;
  ShippingQuery: string;
  PreCheckoutQuery: string;
  Poll: string;
  PollAnswer: string;
  MyChatMember: string;
  ChatMember: string;
  ChatJoinRequest: string;
};

export const TelegramIntentBits: TelegramIntentBits = {
  Message: "message",
  EditedMessage: "edited_message",
  ChannelPost: "channel_post",
  EditedChannelPost: "edited_channel_post",
  InlineQuery: "inline_query",
  ChosenInlineResult: "chosen_inline_result",
  CallbackQuery: "callback_query",
  ShippingQuery: "shipping_query",
  PreCheckoutQuery: "pre_checkout_query",
  Poll: "poll",
  PollAnswer: "poll_answer",
  MyChatMember: "my_chat_member",
  ChatMember: "chat_member",
  ChatJoinRequest: "chat_join_request",
};
