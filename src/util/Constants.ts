import { Agent } from "node:https";

const DefaultParameters = {
  offset: 0,
  limit: 1,
  timeout: 0,
  allowedUpdates: [
    "message",
    "edited_message",
    "channel_post",
    "edited_channel_post",
    "business_connection",
    "business_message",
    "edited_business_message",
    "deleted_business_messages",
    "message_reaction",
    "message_reaction_count",
    "inline_query",
    "chosen_inline_result",
    "callback_query",
    "shipping_query",
    "pre_checkout_query",
    "poll",
    "poll_answer",
    "my_chat_member",
    "chat_member",
    "chat_join_request",
    "chat_boost",
    "removed_chat_boost",
    "purchased_paid_media",
  ],
} as const;

const DefaultClientParameters = {
  chatCacheMaxSize: -1,
  userCacheMaxSize: -1,
  pollingTimeout: 300,
  requestOptions: {
    agent: new Agent({
      keepAlive: true,
      keepAliveMsecs: 10000,
    }),
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
  DefaultParameters,
  DefaultClientParameters,
  Events,
  CollectorEvents,
  ReactionCollectorEvents,
};
