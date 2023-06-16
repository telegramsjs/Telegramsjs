"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntentBits = void 0;
exports.IntentBits = {
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
  ChatJoinRequest: 1 << 13,
};
