/** This object represents a Telegram user or bot. */
export interface User {
    /** Unique identifier for this user or bot. */
    id: number;
    /** True, if this user is a bot */
    isBot: boolean;
    /** User's or bot's first name */
    firstName: string;
    /** User's or bot's last name */
    lastName?: string;
    /** User's or bot's username */
    username?: string;
    /** IETF language tag of the user's language */
    languageCode?: string;
    /** True, if this user is a Telegram Premium user */
    isPremium?: true;
    /** True, if this user added the bot to the attachment menu */
    addedToAttachmentMenu?: true;
}
/** Describes the options used for link preview generation. */
export interface LinkPreviewOptions {
    /** True, if the link preview is disabled */
    isDisabled?: boolean;
    /** URL to use for the link preview. If empty, then the first URL found in the message text will be used */
    url?: string;
    /** True, if the media in the link preview is suppposed to be shrunk; ignored if the URL isn't explicitly specified or media size change isn't supported for the preview */
    preferSmallMedia?: boolean;
    /** True, if the media in the link preview is suppposed to be enlarged; ignored if the URL isn't explicitly specified or media size change isn't supported for the preview */
    preferLargeMedia?: boolean;
    /** True, if the link preview must be shown above the message text; otherwise, the link preview will be shown below the message text */
    showAboveText?: boolean;
}
export declare namespace MessageEntity {
    interface AbstractMessageEntity {
        /** Type of the entity. Currently, can be “mention” (@username), “hashtag” (#hashtag), “cashtag” ($USD), “bot_command” (/start@jobs_bot), “url” (https://telegram.org), “email” (do-not-reply@telegram.org), “phone_number” (+1-212-555-0123), “bold” (bold text), “italic” (italic text), “underline” (underlined text), “strikethrough” (strikethrough text), “spoiler” (spoiler message), “blockquote” (block quotation), “expandable_blockquote” (collapsed-by-default block quotation), “code” (monowidth string), “pre” (monowidth block), “text_link” (for clickable text URLs), “text_mention” (for users without usernames), “custom_emoji” (for inline custom emoji stickers) */
        type: string;
        /** Offset in UTF-16 code units to the start of the entity */
        offset: number;
        /** Length of the entity in UTF-16 code units */
        length: number;
    }
    interface CommonMessageEntity extends AbstractMessageEntity {
        type: "mention" | "hashtag" | "cashtag" | "bot_command" | "url" | "email" | "phone_number" | "bold" | "italic" | "underline" | "strikethrough" | "spoiler" | "blockquote" | "expandable_blockquote" | "code";
    }
    interface PreMessageEntity extends AbstractMessageEntity {
        type: "pre";
        /** For “pre” only, the programming language of the entity text */
        language?: string;
    }
    interface TextLinkMessageEntity extends AbstractMessageEntity {
        type: "text_link";
        /** For “text_link” only, URL that will be opened after user taps on the text */
        url: string;
    }
    interface TextMentionMessageEntity extends AbstractMessageEntity {
        type: "text_mention";
        /** For “text_mention” only, the mentioned user */
        user: User;
    }
    interface CustomEmojiMessageEntity extends AbstractMessageEntity {
        type: "custom_emoji";
        /** For “custom_emoji” only, unique identifier of the custom emoji. Use getCustomEmojiStickers to get full information about the sticker */
        customEmojiId: string;
    }
}
/** This object represents one special entity in a text message. For example, hashtags, usernames, URLs, etc. */
export type MessageEntity = MessageEntity.CommonMessageEntity | MessageEntity.CustomEmojiMessageEntity | MessageEntity.PreMessageEntity | MessageEntity.TextLinkMessageEntity | MessageEntity.TextMentionMessageEntity;
/** This object describes the position on faces where a mask should be placed by default. */
export interface MaskPosition {
    /** The part of the face relative to which the mask should be placed. One of “forehead”, “eyes”, “mouth”, or “chin”. */
    point: "forehead" | "eyes" | "mouth" | "chin";
    /** Shift by X-axis measured in widths of the mask scaled to the face size, from left to right. For example, choosing -1.0 will place mask just to the left of the default mask position. */
    xShift: number;
    /** Shift by Y-axis measured in heights of the mask scaled to the face size, from top to bottom. For example, 1.0 will place the mask just below the default mask position. */
    yShift: number;
    /** Mask scaling coefficient. For example, 2.0 means double size. */
    scale: number;
}
/** This object contains information about one answer option in a poll to send. */
export interface InputPollOption {
    /** Option text, 1-100 characters */
    text: string;
    /** Mode for parsing entities in the text. See formatting options for more details. Currently, only custom emoji entities are allowed */
    textParseMode?: string;
    /** A list of special entities that appear in the poll option text. It can be specified instead of text_parse_mode */
    textEntities?: MessageEntity[];
}
/** Describes reply parameters for the message that is being sent. */
export interface ReplyParameters {
    /** Identifier of the message that will be replied to in the current chat, or in the chat chat_id if it is specified */
    messageId: number;
    /** If the message to be replied to is from a different chat, unique identifier for the chat or username of the channel (in the format @channelusername). Not supported for messages sent on behalf of a business account. */
    chatId?: number | string;
    /** Pass True if the message should be sent even if the specified message to be replied to is not found; can be used only for replies in the same chat and forum topic. Always True for messages sent on behalf of a business account. */
    allowSendingWithoutReply?: boolean;
    /** Quoted part of the message to be replied to; 0-1024 characters after entities parsing. The quote must be an exact substring of the message to be replied to, including bold, italic, underline, strikethrough, spoiler, and custom_emoji entities. The message will fail to send if the quote isn't found in the original message. */
    quote?: string;
    /** Mode for parsing entities in the quote. See formatting options for more details. */
    quoteParseMode?: string;
    /** A JSON-serialized list of special entities that appear in the quote. It can be specified instead of quote_parse_mode. */
    quoteEntities?: MessageEntity[];
    /** Position of the quote in the original message in UTF-16 code units */
    quotePosition?: number;
}
/** This object describes the type of a reaction. Currently, it can be one of
- ReactionTypeEmoji
- ReactionTypeCustomEmoji */
export type ReactionType = ReactionTypeEmoji | ReactionTypeCustomEmoji;
/** The reaction is based on an emoji. */
export interface ReactionTypeEmoji {
    /** Type of the reaction, always “emoji” */
    type: "emoji";
    /** Reaction emoji. Currently, it can be one of "👍", "👎", "❤", "🔥", "🥰", "👏", "😁", "🤔", "🤯", "😱", "🤬", "😢", "🎉", "🤩", "🤮", "💩", "🙏", "👌", "🕊", "🤡", "🥱", "🥴", "😍", "🐳", "❤‍🔥", "🌚", "🌭", "💯", "🤣", "⚡", "🍌", "🏆", "💔", "🤨", "😐", "🍓", "🍾", "💋", "🖕", "😈", "😴", "😭", "🤓", "👻", "👨‍💻", "👀", "🎃", "🙈", "😇", "😨", "🤝", "✍", "🤗", "🫡", "🎅", "🎄", "☃", "💅", "🤪", "🗿", "🆒", "💘", "🙉", "🦄", "😘", "💊", "🙊", "😎", "👾", "🤷‍♂", "🤷", "🤷‍♀", "😡" */
    emoji: "👍" | "👎" | "❤" | "🔥" | "🥰" | "👏" | "😁" | "🤔" | "🤯" | "😱" | "🤬" | "😢" | "🎉" | "🤩" | "🤮" | "💩" | "🙏" | "👌" | "🕊" | "🤡" | "🥱" | "🥴" | "😍" | "🐳" | "❤‍🔥" | "🌚" | "🌭" | "💯" | "🤣" | "⚡" | "🍌" | "🏆" | "💔" | "🤨" | "😐" | "🍓" | "🍾" | "💋" | "🖕" | "😈" | "😴" | "😭" | "🤓" | "👻" | "👨‍💻" | "👀" | "🎃" | "🙈" | "😇" | "😨" | "🤝" | "✍" | "🤗" | "🫡" | "🎅" | "🎄" | "☃" | "💅" | "🤪" | "🗿" | "🆒" | "💘" | "🙉" | "🦄" | "😘" | "💊" | "🙊" | "😎" | "👾" | "🤷‍♂" | "🤷" | "🤷‍♀" | "😡";
}
/** The reaction is based on a custom emoji. */
export interface ReactionTypeCustomEmoji {
    /** Type of the reaction, always “custom_emoji” */
    type: "custom_emoji";
    /** Custom emoji identifier */
    customEmoji: string;
}
/** This object represents a point on the map. */
export interface Location {
    /** Latitude as defined by sender */
    latitude: number;
    /** Longitude as defined by sender */
    longitude: number;
    /** The radius of uncertainty for the location, measured in meters; 0-1500 */
    horizontalAccuracy?: number;
    /** Time relative to the message sending date, during which the location can be updated; in seconds. For active live locations only. */
    livePeriod?: number;
    /** The direction in which user is moving, in degrees; 1-360. For active live locations only. */
    heading?: number;
    /** The maximum distance for proximity alerts about approaching another chat member, in meters. For sent live locations only. */
    proximityAlertRadius?: number;
}
//# sourceMappingURL=Message.d.ts.map