export = TelegramIntentBits;
declare namespace TelegramIntentBits {
    export { TelegramIntentBits };
}
type TelegramIntentBits = {
    /**
     * - Represents a Telegram message.
     */
    Message: string;
    /**
     * - Represents an edited Telegram message.
     */
    EditedMessage: string;
    /**
     * - Represents a post in a Telegram channel.
     */
    ChannelPost: string;
    /**
     * - Represents an edited post in a Telegram channel.
     */
    EditedChannelPost: string;
    /**
     * - Represents an inline query from a user.
     */
    InlineQuery: string;
    /**
     * - Represents a chosen inline query result.
     */
    ChosenInlineResult: string;
    /**
     * - Represents a callback query from a user.
     */
    CallbackQuery: string;
    /**
     * - Represents a shipping query from a user.
     */
    ShippingQuery: string;
    /**
     * - Represents a pre-checkout query from a user.
     */
    PreCheckoutQuery: string;
    /**
     * - Represents a poll from a user.
     */
    Poll: string;
    /**
     * - Represents an answer to a poll from a user.
     */
    PollAnswer: string;
    /**
     * - Represents a user's chat membership status in their own chat.
     */
    MyChatMember: string;
    /**
     * - Represents a user's chat membership status in a chat they are a member of.
     */
    ChatMember: string;
    /**
     * - Represents a user's request to join a chat.
     */
    ChatJoinRequest: string;
};
