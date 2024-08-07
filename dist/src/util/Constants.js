"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = exports.DefaultClientParameters = exports.DefaultParameters = void 0;
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
    ],
};
exports.DefaultParameters = DefaultParameters;
const DefaultClientParameters = {
    messageCacheMaxSize: -1,
    chatCacheMaxSize: -1,
    memberCacheMaxSize: -1,
    userCacheMaxSize: -1,
};
exports.DefaultClientParameters = DefaultClientParameters;
const Events = {
    Ready: "ready",
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
};
exports.Events = Events;
//# sourceMappingURL=Constants.js.map