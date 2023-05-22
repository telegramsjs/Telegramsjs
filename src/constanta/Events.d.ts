export = Events;
declare namespace Events {
    export { Events };
}
/**
 * Events object with predefined event types.
 */
type Events = {
    /**
     * - Represents the 'message' event.
     */
    Message: string;
    /**
     * - Represents the 'edited_message' event.
     */
    EditedMessage: string;
    /**
     * - Represents the 'channel_post' event.
     */
    ChannelPost: string;
    /**
     * - Represents the 'edited_channel_post' event.
     */
    EditedChannelPost: string;
    /**
     * - Represents the 'inline_query' event.
     */
    InlineQuery: string;
    /**
     * - Represents the 'chosen_inline_result' event.
     */
    ChosenInlineResult: string;
    /**
     * - Represents the 'callback_query' event.
     */
    CallbackQuery: string;
    /**
     * - Represents the 'shipping_query' event.
     */
    ShippingQuery: string;
    /**
     * - Represents the 'pre_checkout_query' event.
     */
    PreCheckoutQuery: string;
    /**
     * - Represents the 'poll' event.
     */
    Poll: string;
    /**
     * - Represents the 'poll_answer' event.
     */
    PollAnswer: string;
    /**
     * - Represents the 'chat_member' event.
     */
    ChatMember: string;
    /**
     * - Represents the 'my_chat_member' event.
     */
    MyChatMember: string;
    /**
     * - Represents the 'chat_join_request' event.
     */
    ChatJoinRequest: string;
    /**
     * - Represents the 'reply_message' event.
     */
    ReplyMessage: string;
};
