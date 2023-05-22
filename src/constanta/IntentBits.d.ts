export = IntentBits;
declare namespace IntentBits {
    export { IntentBits };
}
type IntentBits = {
    /**
     * - Represents a bit flag for Telegram messages.
     */
    Message: number;
    /**
     * - Represents a bit flag for edited Telegram messages.
     */
    EditedMessage: number;
    /**
     * - Represents a bit flag for posts in Telegram channels.
     */
    ChannelPost: number;
    /**
     * - Represents a bit flag for edited posts in Telegram channels.
     */
    EditedChannelPost: number;
    /**
     * - Represents a bit flag for inline queries from users.
     */
    InlineQuery: number;
    /**
     * - Represents a bit flag for chosen inline query results.
     */
    ChosenInlineResult: number;
    /**
     * - Represents a bit flag for callback queries from users.
     */
    CallbackQuery: number;
    /**
     * - Represents a bit flag for shipping queries from users.
     */
    ShippingQuery: number;
    /**
     * - Represents a bit flag for pre-checkout queries from users.
     */
    PreCheckoutQuery: number;
    /**
     * - Represents a bit flag for polls from users.
     */
    Poll: number;
    /**
     * - Represents a bit flag for answers to polls from users.
     */
    PollAnswer: number;
    /**
     * - Represents a bit flag for a user's chat membership status in their own chat.
     */
    MyChatMember: number;
    /**
     * - Represents a bit flag for a user's chat membership status in a chat they are a member of.
     */
    ChatMember: number;
    /**
     * - Represents a bit flag for a user's request to join a chat.
     */
    ChatJoinRequest: number;
};
