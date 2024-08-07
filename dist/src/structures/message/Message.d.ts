export type MethodParameters = import("../../types").MethodParameters;
/**
 * @typedef {import("../../types").MethodParameters} MethodParameters
 */
export class Message extends Base {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").Message} data - Data about the message
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").Message);
    /** Unique message identifier inside this chat */
    id: number;
    _patch(data: any): any;
    /**
     * Unique identifier of a message thread or a forum topic to which the message belongs; for supergroups only
     * @type {number | undefined}
     */
    threadId: number | undefined;
    /**
     * Sender of the message; empty for messages sent to channels. For backward compatibility, the field contains a fake sender user in non-channel chats, if the message was sent on behalf of a chat.
     * @type {import("../misc/User").User | undefined}
     */
    author: import("../misc/User").User | undefined;
    /**
     * Chat the message belongs to
     * @type {import("../chat/Chat").Chat | undefined}
     */
    chat: import("../chat/Chat").Chat | undefined;
    /**
     * Member that were added to the message group or supergroup and information about them
     * @type {import("../chat/ChatMember").ChatMember | undefined}
     */
    member: import("../chat/ChatMember").ChatMember | undefined;
    /**
     * For text messages, the actual UTF-8 text of the message
     * @type {string | undefined}
     */
    content: string | undefined;
    /**
     * Caption for the animation, audio, document, photo, video or voice
     * @type {string | undefined}
     */
    caption: string | undefined;
    /**
     * For messages with a caption, special entities like usernames, URLs, bot commands, etc. that appear in the caption
     * @type {MessageEntities | undefined}
     */
    captionEntities: MessageEntities | undefined;
    /**
     * For text messages, special entities like usernames, URLs, bot commands, etc. that appear in the text
     * @type {MessageEntities | undefined}
     */
    entities: MessageEntities | undefined;
    /**
     * If the sender of the message boosted the chat, the number of boosts added by the user
     * @type {number | undefined}
     */
    senderBoostCount: number | undefined;
    /**
     * The bot that actually sent the message on behalf of the business account. Available only for outgoing messages sent on behalf of the connected business account.
     * @type {User | undefined}
     */
    senderBusinessBot: User | undefined;
    /**
     * Information about the original message for forwarded messages
     * @type {MessageOrigin | undefined}
     */
    forwardOrigin: MessageOrigin | undefined;
    /**
     * True, if the message is a channel post that was automatically forwarded to the connected discussion group
     * @type {boolean | undefined}
     */
    automaticForward: boolean | undefined;
    /**
     * For replies in the same chat and message thread, the original message. Note that the Message object in this field will not contain further reply_to_message fields even if it itself is a reply
     * @type {Message | undefined}
     */
    originalMessage: Message | undefined;
    /**
     * Information about the message that is being replied to, which may come from another chat or forum topic
     * @type {ExternalReplyInfo | undefined}
     */
    externalReply: ExternalReplyInfo | undefined;
    /**
     * For replies that quote part of the original message, the quoted part of the message
     * @type {TextQuote | undefined}
     */
    quote: TextQuote | undefined;
    /**
     * For replies to a story, the original message
     * @type {Story | undefined}
     */
    story: {
        /**
         * - Unique identifier for the story in the chat
         */
        id: number;
        /**
         * - Chat that posted the story
         */
        chat: Chat;
    } | undefined;
    /**
     * Bot through which the message was sent
     * @type {User | undefined}
     */
    viaBot: User | undefined;
    /**
     * True, if the message can't be forwarded
     * @type {true | undefined}
     */
    protectedContent: true | undefined;
    /**
     * True, if the caption must be shown above the message media
     * @type {true | undefined}
     */
    showAboveMedia: true | undefined;
    /**
     * True, if the message was sent by an implicit action, for example, as an away or a greeting business message, or as a scheduled message
     * @type {true | undefined}
     */
    authorOffline: true | undefined;
    /**
     * Signature of the post author for messages in channels, or the custom title of an anonymous group administrator
     * @type {true | undefined}
     */
    authorSignature: true | undefined;
    /**
     * Options used for link preview generation for the message, if it is a text message and link preview options were changed
     * @type {LinkPreviewOptions | undefined}
     */
    linkPreviewOpts: LinkPreviewOptions | undefined;
    /**
     * Unique identifier of the message effect added to the message
     * @type {string | undefined}
     */
    effectId: string | undefined;
    /**
     * Chat that sent the message originally
     * @type {Chat | undefined}
     */
    senderChat: Chat | undefined;
    /**
     * Date the message was sent in Unix time. It is always a positive number, representing a valid date
     * @type {number}
     */
    createdTimestamp: number | undefined;
    /**
     * Date the message was last edited in Unix time
     * @type {number | undefined}
     */
    editedTimestamp: number | undefined;
    /**
     * Unique identifier of the business connection from which the message was received. If non-empty, the message belongs to a chat of the corresponding business account that is independent from any potential bot chat which might share the same identifier
     * @type {string | undefined}
     */
    businessId: string | undefined;
    /**
     * If the message is sent to a forum topic
     * @type {Forum | undefined}
     */
    forum: Forum | undefined;
    /**
     * True, if the message is sent to a forum topic
     * @type {number | undefined}
     */
    inTopic: number | undefined;
    /**
     * New member that were added to the group or supergroup and information about them (the bot itself may be one of these member)
     * @type {User | undefined}
     */
    newChatMember: User | undefined;
    /**
     * New members that were added to the group or supergroup and information about them (the bot itself may be one of these members)
     * @type {User[] | undefined}
     */
    newChatMembers: User[] | undefined;
    /**
     * A member was removed from the group, information about them (this member may be the bot itself)
     * @type {User | undefined}
     */
    leftChatMember: User | undefined;
    /**
     * A chat title was changed to this value
     * @type {string | undefined}
     */
    newChatTitle: string | undefined;
    /**
     * A chat photo was change to this value
     * @type {Photo[] | undefined}
     */
    newChatPhoto: Photo[] | undefined;
    /**
     * Service message: the chat photo was deleted
     * @type {true | undefined}
     */
    deleteChatPhoto: true | undefined;
    /**
     * Service message: the group has been created
     * @type {true | undefined}
     */
    groupChatCreated: true | undefined;
    /**
     * Service message: the supergroup has been created. This field can't be received in a message coming through updates, because bot can't be a member of a supergroup when it is created. It can only be found in reply_to_message if someone replies to a very first message in a directly created supergroup
     * @type {true | undefined}
     */
    supergroupChatCreated: true | undefined;
    /**
     * Service message: the channel has been created. This field can't be received in a message coming through updates, because bot can't be a member of a channel when it is created. It can only be found in reply_to_message if someone replies to a very first message in a channel
     * @type {true | undefined}
     */
    channelChatCreated: true | undefined;
    /**
     * Service message: auto-delete timer settings changed in the chat
     * @type {MessageAutoDeleteTimerChanged | undefined}
     */
    autoDelTimerChanged: {
        /**
         * - New auto-delete time for messages in the chat; in seconds
         */
        autoDelTime: number;
    } | undefined;
    /**
     * The group has been migrated to a supergroup with the specified identifier
     * @type {number | undefined}
     */
    migrateToChatId: number | undefined;
    /**
     * The supergroup has been migrated from a group with the specified identifier
     * @type {number | undefined}
     */
    migrateFromChatId: number | undefined;
    /**
     * Message is a service message about a successful payment, information about the payment. More about payments
     * @type {SuccessfulPayment | undefined}
     */
    successfulPayment: SuccessfulPayment | undefined;
    /**
     * Message is a service message about a refunded payment, information about the payment. More about payments
     * @type {RefundedPayment | undefined}
     */
    refundedPayment: RefundedPayment | undefined;
    /**
     * Service message: users were shared with the bot
     * @type {SharedUser | undefined}
     */
    usersShared: SharedUser | undefined;
    /**
     * Service message: a chat was shared with the bot
     * @type {ChatShared | undefined}
     */
    chatShared: ChatShared | undefined;
    /**
     * The domain name of the website on which the user has logged in. More about Telegram Login
     * @type {string | undefined}
     */
    connectedWebsite: string | undefined;
    /**
     * Service message: the user allowed the bot to write messages after adding it to the attachment or side menu, launching a Web App from a link, or accepting an explicit request from a Web App sent by the method requestWriteAccess
     * @type {WiteAccessAllowed | undefined}
     */
    writeAccessAllowed: {
        /**
         * - True, if the access was granted after the user accepted an explicit request from a Web App sent by the method requestWriteAccess
         */
        authorRequest: boolean | undefined;
        /**
         * - Name of the Web App, if the access was granted when the Web App was launched from a link
         */
        appName: string | undefined;
        /**
         * - True, if the access was granted when the bot was added to the attachment or side menu
         */
        authorAttachmentMenu: boolean | undefined;
    } | undefined;
    /**
     * Telegram Passport data
     * @type {PassportData | undefined}
     */
    passport: PassportData | undefined;
    /**
     * Service message. A user in the chat triggered another user's proximity alert while sharing Live Location
     * @type {ProximityAlertTriggered | undefined}
     */
    proximityAlertTriggered: {
        /**
         * - User that triggered the alert
         */
        traveler: User;
        /**
         * - User that set the alert
         */
        watcher: User;
        /**
         * - The distance between the users
         */
        distance: number;
    } | undefined;
    /**
     * Service message: user boosted the chat
     * @type {BoostAdded | undefined}
     */
    boostAdded: {
        /**
         * - Number of boosts added by the user
         */
        count: number;
    } | undefined;
    /**
     * Service message: chat background set
     * @type {ChatBackground | undefined}
     */
    chatBackgroundSet: ChatBackground | undefined;
    /**
     * Service message: forum topic created
     * @type {ForumTopic | undefined}
     */
    forumCreated: ForumTopic | undefined;
    /**
     * Service message: forum topic edited
     * @type {ForumTopic | undefined}
     */
    forumEdited: ForumTopic | undefined;
    /**
     * Service message: forum topic closed
     * @type {true | undefined}
     */
    forumClosed: true | undefined;
    /**
     * Service message: forum topic reopened
     * @type {true | undefined}
     */
    forumTopicReopened: true | undefined;
    /**
     * Service message: the 'General' forum topic hidden
     * @type {true | undefined}
     */
    generalForumHidden: true | undefined;
    /**
     * Service message: the 'General' forum topic unhidden
     * @type {true | undefined}
     */
    generalForumUnhidden: true | undefined;
    /**
     * Service message: a scheduled giveaway was created
     * @type {true | undefined}
     */
    giveawayCreated: true | undefined;
    /**
     * The message is a scheduled giveaway message
     * @type {Giveaway | undefined}
     */
    giveaway: Giveaway | undefined;
    /**
     * A giveaway with public winners was completed
     * @type {GiveawayWinners | undefined}
     */
    giveawayWinners: GiveawayWinners | undefined;
    /**
     * Service message: a giveaway without public winners was completed
     * @type {GiveawayCompleted | undefined}
     */
    giveawayCompleted: GiveawayCompleted | undefined;
    /**
     * Service message: video chat scheduled
     * @type {VideoChatScheduled | undefined}
     */
    videoChatScheduled: VideoChatScheduled | undefined;
    /**
     * Service message: video chat started
     * @type {true | undefined}
     */
    videoChatStarted: true | undefined;
    /**
     * @typedef {Object} VideoChatEnded
     * @property {number} duration - Video chat duration in seconds
     */
    /**
     * Service message: video chat ended
     * @type {VideoChatEnded | undefined}
     */
    videoChatEnded: {
        /**
         * - Video chat duration in seconds
         */
        duration: number;
    } | undefined;
    /**
     * Service message: new participants invited to a video chat
     * @type {VideoChatParticipantsInvited | undefined}
     */
    videoChatParticiInvited: VideoChatParticipantsInvited | undefined;
    /**
     * Service message: data sent by a Web App
     * @type {WebAppData | undefined}
     */
    webApp: {
        /**
         * - The data. Be aware that a bad client can send arbitrary data in this field
         */
        data: string;
        /**
         * - Text of the web_app keyboard button from which the Web App was opened. Be aware that a bad client can send arbitrary data in this field
         */
        text: string;
    } | undefined;
    /**
     * Message is a shared location, information about the location
     * @type {Location | undefined}
     */
    location: Location | undefined;
    /**
     * Message contains paid media; information about the paid media
     * @type {PaidMediaInfo | undefined}
     */
    paidMedia: PaidMediaInfo | undefined;
    /**
     * Message is an animation, information about the animation. For backward compatibility, when this field is set, the document field will also be set
     * @type {Animation | undefined}
     */
    animation: Animation | undefined;
    /**
     * Message is an audio file, information about the file
     * @type {Audio | undefined}
     */
    audio: Audio | undefined;
    /**
     * Message is a general file, information about the file
     * @type {Document | undefined}
     */
    document: Document | undefined;
    /**
     * Message is a photo, available sizes of the photo
     * @type {Photo[] | undefined}
     */
    photo: Photo[] | undefined;
    /**
     * Message is a video, information about the video
     * @type {Video | undefined}
     */
    video: Video | undefined;
    /**
     * Message is a video note, information about the video message
     * @type {VideoNote | undefined}
     */
    videoNote: VideoNote | undefined;
    /**
     * Message is a voice message, information about the file
     * @type {Voice | undefined}
     */
    voice: Voice | undefined;
    /**
     * Message is a sticker, information about the sticker
     * @type {Sticker | undefined}
     */
    sticker: Sticker | undefined;
    /**
     * Message is a shared contact, information about the contact
     * @type {Contact | undefined}
     */
    contact: Contact | undefined;
    /**
     * Message is a native poll, information about the poll
     * @type {Poll | undefined}
     */
    poll: Poll | undefined;
    /**
     * Message is a venue, information about the venue
     * @type {Venue | undefined}
     */
    venue: Venue | undefined;
    /**
     * Message is a game, information about the game. More about games
     * @type {Game | undefined}
     */
    game: Game | undefined;
    /**
     * Message is a dice with random value
     * @type {Dice | undefined}
     */
    dice: Dice | undefined;
    /**
     * @return {this is this & { editedTimestamp: number }}
     */
    get isEdited(): boolean;
    /**
     * Date the message was sent. It is always a positive number, representing a valid date
     * @type {Date}
     */
    get createdAt(): Date;
    /**
     * Date the message was last edited
     * @type {Date}
     */
    get editedAt(): Date;
    /**
     * @param {import("../../util/collector/Collector").ICollectorOptions<number, Message>} [options={}] - message collector options
     * @return {import("../../util/collector/MessageCollector").MessageCollector}
     */
    createMessageCollector(options?: import("../../util/collector/Collector").ICollectorOptions<number, Message> | undefined): import("../../util/collector/MessageCollector").MessageCollector;
    /**
     * @param {import("../../util/collector/Collector").ICollectorOptions<number, Message>} [options={}] - message collector options
     * @return {Promise<[import("@telegram.ts/collection").Collection<number, Message>, string]>}
     */
    awaitMessage(options?: import("../../util/collector/Collector").ICollectorOptions<number, Message> | undefined): Promise<[import("@telegram.ts/collection").Collection<number, Message>, string]>;
    /**
     * @typedef {import("../../util/collector/Collector").ICollectorOptions<number, Message>} AwaitMessagesOptions
     * @property {string[]} [errors] Stop/end reasons that cause the promise to reject
     */
    /**
     * @param {AwaitMessagesOptions} [options={}] - message collector options
     * @return {Promise<import("@telegram.ts/collection").Collection<number, Message>>}
     */
    awaitMessages(options?: import("../../util/collector/Collector").ICollectorOptions<number, Message> | undefined): Promise<import("@telegram.ts/collection").Collection<number, Message>>;
    /**
     * @param {import("../../util/collector/Collector").ICollectorOptions<number, import("../MessageReactionUpdated").MessageReactionUpdated>} [options={}] - reaction collector options
     * @return {import("../../util/collector/ReactionCollector").ReactionCollector}
     */
    createReactionCollector(options?: import("../../util/collector/Collector").ICollectorOptions<number, import("../MessageReactionUpdated").MessageReactionUpdated> | undefined): import("../../util/collector/ReactionCollector").ReactionCollector;
    /**
     * @param {import("../../util/collector/Collector").ICollectorOptions<number, import("../MessageReactionUpdated").MessageReactionUpdated>} [options={}] - reaction collector options
     * @return {Promise<[import("@telegram.ts/collection").Collection<number, import("../MessageReactionUpdated").MessageReactionUpdated>, string]>}
     */
    awaitReaction(options?: import("../../util/collector/Collector").ICollectorOptions<number, import("../MessageReactionUpdated").MessageReactionUpdated> | undefined): Promise<[import("@telegram.ts/collection").Collection<number, import("../MessageReactionUpdated").MessageReactionUpdated>, string]>;
    /**
     * @typedef {import("../../util/collector/Collector").ICollectorOptions<number, import("../MessageReactionUpdated").MessageReactionUpdated>} AwaitRectionsOptions
     * @property {string[]} [errors] Stop/end reasons that cause the promise to reject
     */
    /**
     * @param {AwaitRectionsOptions} [options={}] - reaction collector options
     * @return {Promise<[import("@telegram.ts/collection").Collection<number, import("../MessageReactionUpdated").MessageReactionUpdated>, string]>}
     */
    awaitReactions(options?: import("../../util/collector/Collector").ICollectorOptions<number, import("../MessageReactionUpdated").MessageReactionUpdated> | undefined): Promise<[import("@telegram.ts/collection").Collection<number, import("../MessageReactionUpdated").MessageReactionUpdated>, string]>;
    /**
     * @param {import("../../util/collector/Collector").ICollectorOptions<number, import("../CallbackQuery").CallbackQuery>} [options={}] - inline keyboard collector options
     * @return {InlineKeyboardCollector}
     */
    createMessageComponentCollector(options?: import("../../util/collector/Collector").ICollectorOptions<number, import("../CallbackQuery").CallbackQuery> | undefined): InlineKeyboardCollector;
    reply(text: any, options?: {}): Promise<Message & {
        content: string;
    }>;
    /**
     * Use this method to change the chosen reactions on a message. Service messages can't be reacted to. Automatically forwarded messages from a channel to its discussion group have the same available reactions as messages in the channel. In albums, bots must react to the first message.
     * @param {string | import("@telegram.ts/types").ReactionType} reaction - A list of reaction types to set on the message. Currently, as non-premium users, bots can set up to one reaction per message. A custom emoji reaction can be used if it is either already present on the message or explicitly allowed by chat administrators
     * @param {boolean} [isBig] - Pass True to set the reaction with a big animation
     * @return {Promise<true>} - Returns True on success.
     */
    react(reaction: string | import("@telegram.ts/types").ReactionType, isBig?: boolean | undefined): Promise<true>;
    /**
     * Use this method to edit text and game messages.
     * @param {string} text - New text of the message, 1-4096 characters after entities parsing
     * @param {Omit<MethodParameters["editMessageText"], "text" | "chatId" | "messageId">} [options={}] - out parameters
     * @return {Promise<Message & {content: string; editedTimestamp: number; }>} - On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
     */
    edit(text: string, options?: Omit<{
        businessConnectionId?: string;
        chatId?: number | string;
        messageId?: number;
        inlineMessageId?: string;
        text: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        entities?: import("../../client/interfaces/Message").MessageEntity[];
        linkPreviewOptions?: import("../../client/interfaces/Message").LinkPreviewOptions;
        replyMarkup?: import("../../client/interfaces/Markup").InlineKeyboardMarkup;
    }, "text" | "chatId" | "messageId"> | undefined): Promise<Message & {
        content: string;
        editedTimestamp: number;
    }>;
    /**
     * Use this method to edit captions of messages.
     * @param {string} [caption] - New caption of the message, 0-1024 characters after entities parsing
     * @param {Omit<MethodParameters["editMessageCaption"], "caption" | "chatId" | "messageId">} [options={}] - out parameters
     * @return {Promise<Message & { caption?: string; editedTimestamp: number; }>}
     */
    editCaption(caption?: string | undefined, options?: Omit<{
        businessConnectionId?: string;
        chatId?: number | string;
        messageId?: number;
        inlineMessageId?: string;
        caption?: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        captionEntities?: import("../../client/interfaces/Message").MessageEntity[];
        showCaptionAboveMedia?: boolean;
        replyMarkup?: import("../../client/interfaces/Markup").InlineKeyboardMarkup;
    }, "caption" | "chatId" | "messageId"> | undefined): Promise<Message & {
        caption?: string;
        editedTimestamp: number;
    }>;
    /**
     * Use this method to edit animation, audio, document, photo, or video messages. If a message is part of a message album, then it can be edited only to an audio for audio albums, only to a document for document albums and to a photo or a video otherwise. When an inline message is edited, a new file can't be uploaded; use a previously uploaded file via its file_id or specify a URL.
     * @param {import("@telegram.ts/types").InputMedia} media - An object for a new media content of the message
     * @param {Omit<MethodParameters["editMessageMedia"], "media" | "chatId" | "messageId">} [options={}] - out parameters
     * @return {Promise<true | Message & { editedTimestamp: number; }>} - On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
     */
    editMedia(media: import("@telegram.ts/types").InputMedia, options?: Omit<{
        businessConnectionId?: string;
        chatId?: number | string;
        messageId?: number;
        inlineMessageId?: string;
        media: import("../../client/interfaces/Methods").InputMedia;
        replyMarkup?: import("../../client/interfaces/Markup").InlineKeyboardMarkup;
    }, "media" | "chatId" | "messageId"> | undefined): Promise<true | (Message & {
        editedTimestamp: number;
    })>;
    /**
     * Use this method to edit only the reply markup of messages.
     * @param {import("@telegram.ts/types").InlineKeyboardMarkup} replyMarkup - An object for an inline keyboard
     * @param  {Omit<MethodParameters["editMessageReplyMarkup"], "media" | "chatId" | "messageId">} [options={}] - out parameters
     * @return {Promise<true | Message & { editedTimestamp: number; }>} - On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
     */
    editReplyMarkup(replyMarkup: import("@telegram.ts/types").InlineKeyboardMarkup, options?: Omit<{
        businessConnectionId?: string;
        chatId?: number | string;
        messageId?: number;
        inlineMessageId?: string;
        replyMarkup?: import("../../client/interfaces/Markup").InlineKeyboardMarkup;
    }, "media" | "chatId" | "messageId"> | undefined): Promise<true | (Message & {
        editedTimestamp: number;
    })>;
    /**
     * Use this method to forward messages of any kind. Service messages and messages with protected content can't be forwarded.
     * @param {number | string} chatId - Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param {Omit<MethodParameters["forwardMessage"], "chatId" | "fromChatId" | "messageId" | "messageThreadId">} [options={}] - out parameters
     * @return {Promise<Message>} - On success, the sent Message is returned.
     */
    forward(chatId: number | string, options?: Omit<{
        chatId: number | string;
        messageThreadId?: number;
        fromChatId: number | string;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageId: number;
    }, "chatId" | "messageThreadId" | "messageId" | "fromChatId"> | undefined): Promise<Message>;
    /**
     * Use this method to copy messages of any kind. Service messages, paid media messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correct_option_id is known to the bot. The method is analogous to the method forwardMessage, but the copied message doesn't have a link to the original message.
     * @param {number | string} chatId - Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param {Omit<MethodParameters["copyMessage"], "chatId" | "fromChatId" | "messageId">} [options={}] - out parameters
     * @return {Promise<number>} - Returns the message id of the sent message on success.
     */
    copy(chatId: number | string, options?: Omit<{
        chatId: number | string;
        messageThreadId?: number;
        fromChatId: number | string;
        messageId: number;
        caption?: string;
        parseMode?: string;
        captionEntities?: import("../../client/interfaces/Message").MessageEntity[];
        showCaptionAboveMedia?: boolean;
        disableNotification?: boolean;
        protectContent?: boolean;
        replyParameters?: import("../../client/interfaces/Message").ReplyParameters;
        replyMarkup?: import("../../client/interfaces/Markup").InlineKeyboardMarkup | import("../../client/interfaces/Markup").ReplyKeyboardMarkup | import("../../client/interfaces/Markup").ReplyKeyboardRemove | import("../../client/interfaces/Markup").ForceReply;
    }, "chatId" | "messageId" | "fromChatId"> | undefined): Promise<number>;
    /**
     * Use this method to add a message to the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel.
     * @param {boolean} [notification=false] - Pass True if it is not necessary to send a notification to all chat members about the new pinned message. Notifications are always disabled in channels and private chats
     * @param {string} [businessConnectionId] - Unique identifier of the business connection on behalf of which the message will be pinned
     * @return {Promise<true>} - Returns True on success.
     */
    pin(notification?: boolean | undefined, businessConnectionId?: string | undefined): Promise<true>;
    /**
     * Use this method to remove a message from the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel.
     * @param {string} [businessConnectionId] - Unique identifier of the business connection on behalf of which the message will be unpinned
     * @return {Promise<true>} - Returns True on success.
     */
    unpin(businessConnectionId?: string | undefined): Promise<true>;
    /**
     * Use this method to delete a message, including service messages, with the following limitations:
    - A message can only be deleted if it was sent less than 48 hours ago.
    - Service messages about a supergroup, channel, or forum topic creation can't be deleted.
    - A dice message in a private chat can only be deleted if it was sent more than 24 hours ago.
    - Bots can delete outgoing messages in private chats, groups, and supergroups.
    - Bots can delete incoming messages in private chats.
    - Bots granted can_post_messages permissions can delete outgoing messages in channels.
    - If the bot is an administrator of a group, it can delete any message there.
    - If the bot has can_delete_messages permission in a supergroup or a channel, it can delete any message there.
     * @return {Promise<true>} - Returns True on success.
     */
    delete(): Promise<true>;
    /**
     * Use this method to edit live location messages. A location can be edited until its live_period expires or editing is explicitly disabled by a call to stopMessageLiveLocation.
     * @param {number} latitude - Latitude of new location
     * @param {number} longitude - Longitude of new location
     * @param {Omit<MethodParameters["editMessageLiveLocation"], "latitude" | "longitude" | "chatId" | "messageId">} [options={}] - out parameters
     * @return {Promise<true | Message & { location: Location }>} - On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
     */
    editLiveLocation(latitude: number, longitude: number, options?: Omit<{
        businessConnectionId?: string;
        chatId?: number | string;
        messageId?: number;
        inlineMessageId?: string;
        latitude: number;
        longitude: number;
        livePeriod?: number;
        horizontalAccuracy?: number;
        heading?: number;
        proximityAlertRadius?: number;
        replyMarkup?: import("../../client/interfaces/Markup").InlineKeyboardMarkup;
    }, "chatId" | "messageId" | "latitude" | "longitude"> | undefined): Promise<true | (Message & {
        location: Location;
    })>;
    /**
     * Use this method to stop updating a live location message before live_period expires.
     * @param {Omit<MethodParameters["stopMessageLiveLocation"], "chatId" | "messageId">} [options={}] - out parameters
     * @return {Promise<true | Message & { location: Location }>} - On success, if the message is not an inline message, the edited Message is returned, otherwise True is returned.
     */
    stopLiveLocation(options?: Omit<{
        businessConnectionId?: string;
        chatId?: number | string;
        messageId?: number;
        inlineMessageId?: string;
        replyMarkup?: import("../../client/interfaces/Markup").InlineKeyboardMarkup;
    }, "chatId" | "messageId"> | undefined): Promise<true | (Message & {
        location: Location;
    })>;
}
import { Base } from "../Base";
import { MessageEntities } from "../message/MessageEntities";
import { User } from "../misc/User";
import { MessageOrigin } from "../message/MessageOrigin";
import { ExternalReplyInfo } from "../misc/ExternalReplyInfo";
import { TextQuote } from "../misc/TextQuote";
import { Chat } from "../chat/Chat";
import { LinkPreviewOptions } from "../misc/LinkPreviewOptions";
import { Forum } from "../forum/Forum";
import { Photo } from "../media/Photo";
import { SuccessfulPayment } from "../invoice/SuccessfulPayment";
import { RefundedPayment } from "../invoice/RefundedPayment";
import { SharedUser } from "../misc/SharedUser";
import { ChatShared } from "../misc/ChatShared";
import { PassportData } from "../passport/PassportData";
import { ChatBackground } from "../chat/ChatBackground";
import { ForumTopic } from "../forum/ForumTopic";
import { Giveaway } from "../giveaway/Giveaway";
import { GiveawayWinners } from "../giveaway/GiveawayWinners";
import { GiveawayCompleted } from "../giveaway/GiveawayCompleted";
import { VideoChatScheduled } from "../chat/VideoChatScheduled";
import { VideoChatParticipantsInvited } from "../chat/VideoChatParticipantsInvited";
import { Location } from "../misc/Location";
import { PaidMediaInfo } from "../media/paid/PaidMediaInfo";
import { Animation } from "../media/Animation";
import { Audio } from "../media/Audio";
import { Document } from "../media/Document";
import { Video } from "../media/Video";
import { VideoNote } from "../media/VideoNote";
import { Voice } from "../media/Voice";
import { Sticker } from "../media/Sticker";
import { Contact } from "../media/Contact";
import { Poll } from "../media/Poll";
import { Venue } from "../misc/Venue";
import { Game } from "../game/Game";
import { Dice } from "../media/Dice";
import { InlineKeyboardCollector } from "../../util/collector/InlineKeyboardCollector";
//# sourceMappingURL=Message.d.ts.map