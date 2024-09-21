import { Agent } from "node:https";

const DefaultPollingParameters = {
  offset: 0,
  limit: 100,
  timeout: 30,
  allowedUpdates: [
    "message",
    "edited_message",
    "channel_post",
    "edited_channel_post",
    "callback_query",
    "inline_query",
    "my_chat_member",
    "chat_member",
    "chat_join_request",
  ],
} as const;

const DefaultClientParameters = {
  chatCacheMaxSize: -1,
  userCacheMaxSize: -1,
  pollingTimeout: 300,
  restOptions: {
    agent: new Agent({
      keepAlive: true,
      keepAliveMsecs: 10000,
    }),
    enableRateLimit: true,
  },
} as const;

const Events = {
  Ready: "ready",
  Error: "error",
  Disconnect: "disconnect",
  Message: "message",
  ChannelPost: "message",
  BusinessMessage: "message",
  BusinessConnection: "businessConnection",
  EditedMessage: "messageUpdate",
  EditedChannelPost: "messageUpdate",
  EditedBusinessMessage: "messageUpdate",
  DeletedBusinessMessages: "deletedBusinessMessages",
  MessageReaction: "messageReaction",
  MessageReactionCount: "messageReactionCount",
  InlineQuery: "inlineQuery",
  ChosenInlineResult: "chosenInlineResult",
  CallbackQuery: "callbackQuery",
  ShippingQuery: "shippingQuery",
  PreCheckoutQuery: "preCheckoutQuery",
  Poll: "poll",
  PollAnswer: "pollAnswer",
  MyChatMember: "myChatMember",
  ChatMember: "chatMember",
  ChatCreate: "chatCreate",
  ChatMemberAdd: "chatMemberAdd",
  ChatDelete: "chatDelete",
  ChatMemberRemove: "chatMemberRemove",
  ChatJoinRequest: "chatJoinRequest",
  ChatBoost: "chatBoost",
  RemovedChatBoost: "removedChatBoost",
  PurchasedPaidMedia: "purchasedPaidMedia",
} as const;

const CollectorEvents = {
  Collect: "collect",
  Ignore: "ignore",
  Dispose: "dispose",
  End: "end",
} as const;

const ReactionCollectorEvents = {
  User: "user",
  Create: "create",
  ...CollectorEvents,
} as const;

export {
  DefaultPollingParameters,
  DefaultClientParameters,
  Events,
  CollectorEvents,
  ReactionCollectorEvents,
};
