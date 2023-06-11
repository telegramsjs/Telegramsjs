type IntentBits = {
  Message: number;
  EditedMessage: number;
  ChannelPost: number;
  EditedChannelPost: number;
  InlineQuery: number;
  ChosenInlineResult: number;
  CallbackQuery: number;
  ShippingQuery: number;
  PreCheckoutQuery: number;
  Poll: number;
  PollAnswer: number;
  MyChatMember: number;
  ChatMember: number;
  ChatJoinRequest: number;
}

export const IntentBits: IntentBits = {
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