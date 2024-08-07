declare const DefaultParameters: {
    readonly offset: 0;
    readonly limit: 1;
    readonly timeout: 0;
    readonly allowedUpdates: readonly ["message", "edited_message", "channel_post", "edited_channel_post", "business_connection", "business_message", "edited_business_message", "deleted_business_messages", "message_reaction", "message_reaction_count", "inline_query", "chosen_inline_result", "callback_query", "shipping_query", "pre_checkout_query", "poll", "poll_answer", "my_chat_member", "chat_member", "chat_join_request", "chat_boost", "removed_chat_boost"];
};
declare const DefaultClientParameters: {
    readonly messageCacheMaxSize: -1;
    readonly chatCacheMaxSize: -1;
    readonly memberCacheMaxSize: -1;
    readonly userCacheMaxSize: -1;
};
declare const Events: {
    readonly Ready: "ready";
    readonly Disconnect: "disconnect";
    readonly Message: "message";
    readonly ChannelPost: "message";
    readonly BusinessMessage: "message";
    readonly BusinessConnection: "businessConnection";
    readonly EditedMessage: "messageUpdate";
    readonly EditedChannelPost: "messageUpdate";
    readonly EditedBusinessMessage: "messageUpdate";
    readonly DeletedBusinessMessages: "deletedBusinessMessages";
    readonly MessageReaction: "messageReaction";
    readonly MessageReactionCount: "messageReactionCount";
    readonly InlineQuery: "inlineQuery";
    readonly ChosenInlineResult: "chosenInlineResult";
    readonly CallbackQuery: "callbackQuery";
    readonly ShippingQuery: "shippingQuery";
    readonly PreCheckoutQuery: "preCheckoutQuery";
    readonly Poll: "poll";
    readonly PollAnswer: "pollAnswer";
    readonly MyChatMember: "myChatMember";
    readonly ChatMember: "chatMember";
    readonly ChatCreate: "chatCreate";
    readonly ChatMemberAdd: "chatMemberAdd";
    readonly ChatDelete: "chatDelete";
    readonly ChatMemberRemove: "chatMemberRemove";
    readonly ChatJoinRequest: "chatJoinRequest";
    readonly ChatBoost: "chatBoost";
    readonly RemovedChatBoost: "removedChatBoost";
};
export { DefaultParameters, DefaultClientParameters, Events };
//# sourceMappingURL=Constants.d.ts.map