export type ReadStream = import("node:fs").ReadStream;
export type Message = import("../message/Message").Message;
export type MethodParameters = import("../../types").MethodParameters;
export class Chat extends Base {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").Chat & { threadId?: number }} data - Data about the represents a chat
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").Chat & {
        threadId?: number;
    });
    /** Unique identifier for this chat */
    id: number;
    /**
     * Manages API methods for ChatMember and stores their cache.
     * @type {ChatMemberManager | undefined}
     */
    members: import("../../managers/ChatMemberManager").ChatMemberManager | undefined;
    /**
     * Manages API methods for Message and stores their cache.
     * @type {MessageManager}
     */
    messages: import("../../managers/MessageManager").MessageManager;
    _patch(data: any): any;
    /**
     * Title, for supergroups, channels and group chats
     * @type {string | undefined}
     */
    title: string | undefined;
    /**
     * Username, for private chats, supergroups and channels if available
     * @type {string | undefined}
     */
    username: string | undefined;
    /**
     * First name of the other party in a private chat
     * @type {string | undefined}
     */
    firstName: string | undefined;
    /**
     * Last name of the other party in a private chat
     * @type {string | undefined}
     */
    lastName: string | undefined;
    /**
     * True, if the supergroup chat is a forum (has topics enabled)
     * @type {boolean | undefined}
     */
    forum: boolean | undefined;
    /**
     * Unique identifier of the forum topic
     * @type {number | undefined}
     */
    threadId: number | undefined;
    /**
     * @return {this is this & {  title: string;  username?: string;  firstName?: undefined;  lastName?: undefined;  forum?: undefined;  threadId?: undefined }}
     */
    isChannel(): this is this & {
        title: string;
        username?: string;
        firstName?: undefined;
        lastName?: undefined;
        forum?: undefined;
        threadId?: undefined;
    };
    /**
     * @return {this is this & {  title: string;  username?: string;  firstName?: undefined;  lastName?: undefined;  forum?: true;  threadId?: number }}
     */
    isSupergroup(): this is this & {
        title: string;
        username?: string;
        firstName?: undefined;
        lastName?: undefined;
        forum?: true;
        threadId?: number;
    };
    /**
     * @return {this is this & {  title: string;  username?: undefined;  firstName?: undefined;  lastName?: undefined;  forum?: undefined;  threadId?: undefined }}
     */
    isGroup(): this is this & {
        title: string;
        username?: undefined;
        firstName?: undefined;
        lastName?: undefined;
        forum?: undefined;
        threadId?: undefined;
    };
    /**
     * @return {this is this & {  title?: undefined;  username?: string;  firstName: string;  lastName?: string;  forum?: undefined;  threadId?: undefined }}
     */
    isPrivate(): this is this & {
        title?: undefined;
        username?: string;
        firstName: string;
        lastName?: string;
        forum?: undefined;
        threadId?: undefined;
    };
    /**
     * @return {Promise<import("./ChatMember").ChatMember>}
     */
    me(): Promise<import("./ChatMember").ChatMember>;
    /**
     * Fetches this chat
     * @param {boolean} [force=true] - Whether to skip the cache check and request the API
     * @return {Promise<import("./ChatFullInfo").ChatFullInfo>}
     */
    fetch(force?: boolean | undefined): Promise<import("./ChatFullInfo").ChatFullInfo>;
    /**
     * Retrieves the permissions of a specific member in the chat.
     * @param {import("./ChatMember").ChatMember|string|number} member - The member object to check permissions for.
     * @param {boolean} [checkAdmin] - A flag to check if the member is an admin or creator.
     * @returns {UserPermissions|null} The permissions object of the member or null if not available.
     */
    memberPermissions(member: import("./ChatMember").ChatMember | string | number, checkAdmin?: boolean | undefined): UserPermissions | null;
    /**
     * @param {import("../../util/collector/Collector").ICollectorOptions<number, Message>} [options={}] - message collector options
     * @return {import("../../util/collector/MessageCollector").MessageCollector}
     */
    createMessageCollector(options?: import("../../util/collector/Collector").ICollectorOptions<number, import("../message/Message").Message> | undefined): import("../../util/collector/MessageCollector").MessageCollector;
    /**
     * @typedef {import("../../util/collector/Collector").ICollectorOptions<number, Message>} AwaitMessagesOptions
     * @property {string[]} [errors] Stop/end reasons that cause the promise to reject
     */
    /**
     * @param {AwaitMessagesOptions} [options={}] - message collector options
     * @return {Promise<import("@telegram.ts/collection").Collection<number, Message>>}
     */
    awaitMessages(options?: import("../../util/collector/Collector").ICollectorOptions<number, import("../message/Message").Message> | undefined): Promise<import("@telegram.ts/collection").Collection<number, Message>>;
    /**
     * @param {import("../../util/collector/Collector").ICollectorOptions<number, import("../MessageReactionUpdated").MessageReactionUpdated>} [options={}] - reaction collector options
     * @return {import("../../util/collector/ReactionCollector").ReactionCollector}
     */
    createReactionCollector(options?: import("../../util/collector/Collector").ICollectorOptions<number, import("../MessageReactionUpdated").MessageReactionUpdated> | undefined): import("../../util/collector/ReactionCollector").ReactionCollector;
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
    /**
     * Use this method to send text messages.
     * @param {string} text - Text of the message to be sent, 1-4096 characters after entities parsing
     * @param {Omit<MethodParameters["sendMessage"], "text" | "chatId">} [options={}] - out parameters
     * @return {Promise<Message & { content: string }>} - On success, the sent Message is returned.
     */
    send(text: string, options?: Omit<{
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: number;
        text: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        entities?: import("../../client/interfaces/Message").MessageEntity[];
        linkPreviewOptions?: import("../../client/interfaces/Message").LinkPreviewOptions;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: import("../../client/interfaces/Message").ReplyParameters;
        replyMarkup?: import("../../client/interfaces/Markup").InlineKeyboardMarkup | import("../../client/interfaces/Markup").ReplyKeyboardMarkup | import("../../client/interfaces/Markup").ReplyKeyboardRemove | import("../../client/interfaces/Markup").ForceReply;
    }, "text" | "chatId"> | undefined): Promise<Message & {
        content: string;
    }>;
    /**
     * Use this method to kick a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
     * @param {number} userId - Unique identifier of the target user
     * @param {Omit<MethodParameters["kickChatMember"], "userId" | "chatId">} [options={}]
     * @return {Promise<true>} - Returns True on success.
     */
    kick(userId: number, options?: Omit<{
        chatId: number | string;
        userId: number;
        untilDate?: number;
        revokeMessages?: boolean;
    }, "userId" | "chatId"> | undefined): Promise<true>;
    /**
     * Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
     * @param {number} userId - Unique identifier of the target user
     * @param {Omit<MethodParameters["banChatMember"], "userId" | "chatId">} [options={}]
     * @return {Promise<true>} - Returns True on success.
     */
    ban(userId: number, options?: Omit<{
        chatId: number | string;
        userId: number;
        untilDate?: number;
        revokeMessages?: boolean;
    }, "userId" | "chatId"> | undefined): Promise<true>;
    /**
     * Use this method to unban a previously banned user in a supergroup or channel. The user will not return to the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator for this to work. By default, this method guarantees that after the call the user is not a member of the chat, but will be able to join it. So if the user is a member of the chat they will also be removed from the chat. If you don't want this, use the parameter only_if_banned.
     * @param {number} userId - Unique identifier of the target user
     * @param {boolean} [onlyIfBanned] - Do nothing if the user is not banned
     * @return {Promise<true>} - Returns True on success.
     */
    unban(userId: number, onlyIfBanned?: boolean | undefined): Promise<true>;
    /**
     * Use this method to ban a channel chat in a supergroup or a channel. Until the chat is unbanned, the owner of the banned chat won't be able to send messages on behalf of any of their channels. The bot must be an administrator in the supergroup or channel for this to work and must have the appropriate administrator rights.
     * @param {number} senderChatId - Unique identifier of the target sender chat
     * @return {Promise<true>} - Returns True on success.
     */
    banSenderChat(senderChatId: number): Promise<true>;
    /**
     * Use this method to unban a previously banned channel chat in a supergroup or channel. The bot must be an administrator for this to work and must have the appropriate administrator rights.
     * @param {number} senderChatId - Unique identifier of the target sender chat
     * @return {Promise<true>} - Returns True on success.
     */
    unbanSenderChat(senderChatId: number): Promise<true>;
    /**
     * Use this method for your bot to leave this group, supergroup or channel.
     * @return {Promise<true>} - Returns True on success.
     */
    leave(): Promise<true>;
    /**
     * Use this method to get a list of administrators in a chat, which aren't bots.
     * @return {Promise<import("./ChatMember")[]>} - Returns an Array of ChatMember objects.
     */
    getAdmins(): Promise<typeof import("./ChatMember")[]>;
    /**
     * Use this method to get the number of members in a chat.
     * @return {Promise<number>} - Returns Int on success.
     */
    membersCount(): Promise<number>;
    /**
     * Use this method to set a new group sticker set for a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set ly returned in getChat requests to check if the bot can use this method
     * @param {string} name - Name of the sticker set to be set as the group sticker set.
     * @return {Promise<true>} - Returns True on success.
     */
    setStickerSet(name: string): Promise<true>;
    /**
     * Use this method to delete a group sticker set from a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set ly returned in getChat requests to check if the bot can use this method.
     * @return {Promise<true>} - Returns True on success.
     */
    deleteStickerSet(): Promise<true>;
    /**
     * Use this method to change the bot's menu button in a private chat, or the default menu button.
     * @param {import("@telegram.ts/types").MenuButton} [menuButton] - An object for the bot's new menu button. Defaults to MenuButtonDefault
     * @return {Promise<true>} - Returns True on success.
     */
    setMenuButton(menuButton?: import("@telegram.ts/types").MenuButton | undefined): Promise<true>;
    /**
     * Use this method to create a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights.
     * @param {string} name - Topic name, 1-128 characters
     * @param {Omit<MethodParameters["createForumTopic"], "name" | "chatId">} [options={}] - out parameters
     * @return {Promise<import("../forum/ForumTopic").ForumTopic>} - Returns information about the created topic as a ForumTopic object.
     */
    createForumTopic(name: string, options?: Omit<{
        chatId: number | string;
        name: string;
        iconColor?: 7322096 | 16766590 | 13338331 | 9367192 | 16749490 | 16478047;
        iconCustomEmojiId?: string;
    }, "name" | "chatId"> | undefined): Promise<import("../forum/ForumTopic").ForumTopic>;
    /**
     * Use this method to edit the name of the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have can_manage_topics administrator rights.
     * @param {string} name - New topic name, 1-128 characters
     * @return {Promise<true>} - Returns True on success.
     */
    editGeneralForumTopic(name: string): Promise<true>;
    /**
     * Use this method to close an open 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights.
     * @return {Promise<true>} - Returns True on success.
     */
    closeGeneralForumTopic(): Promise<true>;
    /**
     * Use this method to reopen a closed 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically unhidden if it was hidden.
     * @return {Promise<true>} - Returns True on success.
     */
    reopenGeneralForumTopic(): Promise<true>;
    /**
     * Use this method to hide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically closed if it was open.
     * @return {Promise<true>} - Returns True on success.
     */
    hideGeneralForumTopic(): Promise<true>;
    /**
     * Use this method to unhide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights.
     * @return {Promise<true>} - Returns True on success.
     */
    unhideGeneralForumTopic(): Promise<true>;
    /**
     * Use this method to clear the list of pinned messages in a General forum topic. The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup.
     * @return {Promise<true>} - Returns True on success.
     */
    unpinAllGeneralForumTopicMessages(): Promise<true>;
    /**
     * Use this method to set default chat permissions for all members. The bot must be an administrator in the group or a supergroup for this to work and must have the can_restrict_members administrator rights.
     * @param {import("../../util/ChatPermissions").ChatPermissionFlags} perms - An object for new default chat permissions
     * @param {boolean} [useIndependentChatPermissions] - Pass True if chat permissions are set independently. Otherwise, the can_send_other_messages and can_add_web_page_previews permissions will imply the can_send_messages, can_send_audios, can_send_documents, can_send_photos, can_send_videos, can_send_video_notes, and can_send_voice_notes permissions; the can_send_polls permission will imply the can_send_messages permission
     * @return {Promise<true>} - Returns True on success.
     */
    setPermissions(perms: import("../../util/ChatPermissions").ChatPermissionFlags, useIndependentChatPermissions?: boolean | undefined): Promise<true>;
    /**
     * Use this method to create an additional invite link for a chat. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. The link can be revoked using the method revokeChatInviteLink.
     * @param {Omit<MethodParameters["createChatInviteLink"], "chatId">} [options] - out parameters
     * @return {Promise<import("@telegram.ts/types").ChatInviteLink>} - Returns the new invite link as ChatInviteLink object.
     */
    createInvite(options?: Omit<{
        chatId: number | string;
        name?: string;
        expireDate?: number;
        memberLimit?: number;
        createsJoinRequest?: boolean;
    }, "chatId"> | undefined): Promise<import("@telegram.ts/types").ChatInviteLink>;
    /**
     * Use this method to edit a non-primary invite link created by the bot. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
     * @param {string} inviteLink - The invite link to edit
     * @param {Omit<MethodParameters["editChatInviteLink"], "inviteLink" | "chatId">} - out parameters
     * @return {Promise<import("@telegram.ts/types").ChatInviteLink>} - Returns the edited invite link as a ChatInviteLink object.
     */
    editInvite(inviteLink: string, options?: {}): Promise<import("@telegram.ts/types").ChatInviteLink>;
    /**
     * Use this method to revoke an invite link created by the bot. If the primary link is revoked, a new link is automatically generated. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
     * @param {string} inviteLink - The invite link to revoke
     *  @return {Promise<import("@telegram.ts/types").ChatInviteLink>} - Returns the revoked invite link as ChatInviteLink object.
     */
    revokeInvite(inviteLink: string): Promise<import("@telegram.ts/types").ChatInviteLink>;
    /**
     * Use this method to set a new profile photo for the chat. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
     * @param {Buffer | ReadStream | Blob | FormData | DataView | ArrayBuffer | Uint8Array | string} photo - New chat photo, uploaded using multipart/form-data
     * @return {Promise<true>} - Returns True on success.
     */
    setPhoto(photo: Buffer | ReadStream | Blob | FormData | DataView | ArrayBuffer | Uint8Array | string): Promise<true>;
    /**
     * Use this method to delete a chat photo. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
     * @return {Promise<true>} - Returns True on success.
     */
    deletePhoto(): Promise<true>;
    /**
     * Use this method to change the title of a chat. Titles can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
     * @param {string} title - New chat title, 1-128 characters
     * @return {Promise<true>} - Returns True on success.
     */
    setTitle(title: string): Promise<true>;
    /**
     * Use this method to change the description of a group, a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
     * @param {string} [description] - New chat description, 0-255 characters
     * @return {Promise<true>} - Returns True on success.
     */
    setDescription(description?: string | undefined): Promise<true>;
    /**
     * Use this method to add a message to the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel.
     * @param {number} messageId - Identifier of a message to pin
     * @param {boolean} [disableNotification] - Pass True if it is not necessary to send a notification to all chat members about the new pinned message. Notifications are always disabled in channels and private chats
     * @param {string} [businessConnectionId] - Unique identifier of the business connection on behalf of which the message will be pinned
     * @return {Promise<true>} - Returns True on success.
     */
    pinMessage(messageId: number, disableNotification?: boolean | undefined, businessConnectionId?: string | undefined): Promise<true>;
    /**
     * Use this method to remove a message from the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel.
     * @param {number} [messageId] - Identifier of the message to unpin. Required if business_connection_id is specified. If not specified, the most recent pinned message (by sending date) will be pinned
     * @param {string} [businessConnectionId] - Unique identifier of the business connection on behalf of which the message will be unpinned
     * @return {Promise<true>} - Returns True on success.
     */
    unpinMessage(messageId?: number | undefined, businessConnectionId?: string | undefined): Promise<true>;
    /**
     * Use this method to clear the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel.
     * @return {Promise<true>} - Returns True on success.
     */
    unpinAllMessages(): Promise<true>;
    /**
     * Use this method to send photos.
     * @param {Buffer | ReadStream | Blob | FormData | DataView | ArrayBuffer | Uint8Array | string} photo - Photo to send. Pass a file_id as String to send a photo that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the Internet, or upload a new photo using multipart/form-data. The photo must be at most 10 MB in size. The photo's width and height must not exceed 10000 in total. Width and height ratio must be at most 20
     * @param {Omit<MethodParameters["sendPhoto"], "photo" | "chatId" | "messageThreadId">} [options={}] - out parameters
     * @return {Promise<Message & { photo: import("../media/Photo").Photo[] }>} - On success, the sent Message is returned.
     */
    sendPhoto(photo: Buffer | ReadStream | Blob | FormData | DataView | ArrayBuffer | Uint8Array | string, options?: Omit<{
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: number;
        photo: Buffer | import("fs").ReadStream | import("buffer").Blob | FormData | DataView | ArrayBuffer | Uint8Array | string;
        caption?: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        captionEntities?: import("../../client/interfaces/Message").MessageEntity[];
        showCaptionAboveMedia?: boolean;
        hasSpoiler?: boolean;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: import("../../client/interfaces/Message").ReplyParameters;
        replyMarkup?: import("../../client/interfaces/Markup").InlineKeyboardMarkup | import("../../client/interfaces/Markup").ReplyKeyboardMarkup | import("../../client/interfaces/Markup").ReplyKeyboardRemove | import("../../client/interfaces/Markup").ForceReply;
    }, "photo" | "chatId" | "messageThreadId"> | undefined): Promise<Message & {
        photo: import("../media/Photo").Photo[];
    }>;
    /**
     * Use this method to send audio files, if you want Telegram clients to display them in the music player. Your audio must be in the .MP3 or .M4A format. On success, the sent Message is returned. Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.
     * @param {Buffer | ReadStream | Blob | FormData | DataView | ArrayBuffer | Uint8Array | string} audio - Audio file to send. Pass a file_id as String to send an audio file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an audio file from the Internet, or upload a new one using multipart/form-data
     * @param {Omit<MethodParameters["sendAudio"], "audio" | "chatId" | "messageThreadId">} [options={}] - out parameters
     * @return {Promise<Message & { audio: import("../media/Audio").Audio }>} - On success, the sent Message is returned.
     */
    sendAudio(audio: Buffer | ReadStream | Blob | FormData | DataView | ArrayBuffer | Uint8Array | string, options?: Omit<{
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: number;
        audio: Buffer | import("fs").ReadStream | import("buffer").Blob | FormData | DataView | ArrayBuffer | Uint8Array | string;
        caption?: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        captionEntities?: import("../../client/interfaces/Message").MessageEntity[];
        duration?: number;
        performer?: string;
        title?: string;
        thumbnail?: Buffer | import("fs").ReadStream | import("buffer").Blob | FormData | DataView | ArrayBuffer | Uint8Array | string;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: import("../../client/interfaces/Message").ReplyParameters;
        replyMarkup?: import("../../client/interfaces/Markup").InlineKeyboardMarkup | import("../../client/interfaces/Markup").ReplyKeyboardMarkup | import("../../client/interfaces/Markup").ReplyKeyboardRemove | import("../../client/interfaces/Markup").ForceReply;
    }, "audio" | "chatId" | "messageThreadId"> | undefined): Promise<Message & {
        audio: import("../media/Audio").Audio;
    }>;
    /**
     * Use this method to send paid media to channel chats.
     * @param {import("@telegram.ts/types").InputPaidMedia[]} media - An array describing the media to be sent; up to 10 items
     * @param {number} starCount - The number of Telegram Stars that must be paid to buy access to the media
     * @param {Omit<MethodParameters["sendPaidMedia"], "media" | "starCount" | "chatId">} [options={}] - out parameters
     * @return {Promise<Message & { paidMedia: import("../media/paid/PaidMediaInfo").PaidMediaInfo }>} - On success, the sent Message is returned.
     */
    sendPaidMedia(media: import("@telegram.ts/types").InputPaidMedia[], starCount: number, options?: Omit<{
        chatId: number | string;
        starCount: number;
        media: import("../../client/interfaces/Methods").InputPaidMedia[];
        caption?: string;
        parseMode?: string;
        captionEntities?: import("../../client/interfaces/Message").MessageEntity[];
        showCaptionAboveMedia?: boolean;
        disableNotification?: boolean;
        protectContent?: boolean;
        replyParameters?: import("../../client/interfaces/Message").ReplyParameters;
        replyMarkup?: import("../../client/interfaces/Markup").InlineKeyboardMarkup | import("../../client/interfaces/Markup").ReplyKeyboardMarkup | import("../../client/interfaces/Markup").ReplyKeyboardRemove | import("../../client/interfaces/Markup").ForceReply;
    }, "media" | "chatId" | "starCount"> | undefined): Promise<Message & {
        paidMedia: import("../media/paid/PaidMediaInfo").PaidMediaInfo;
    }>;
    /**
     * Use this method to send general files.
     * @param {Buffer | ReadStream | Blob | FormData | DataView | ArrayBuffer | Uint8Array | string} document - File to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data
     * @param {Omit<MethodParameters["sendDocument"], "document" | "chatId" | "messageThreadId">} [options={}] - out parameters
     * @return {Promise<Message & { document: import("../media/Document").Document }>} - On success, the sent Message is returned. Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future.
     */
    sendDocument(document: Buffer | ReadStream | Blob | FormData | DataView | ArrayBuffer | Uint8Array | string, options?: Omit<{
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: number;
        document: Buffer | import("fs").ReadStream | import("buffer").Blob | FormData | DataView | ArrayBuffer | Uint8Array | string;
        thumbnail?: Buffer | import("fs").ReadStream | import("buffer").Blob | FormData | DataView | ArrayBuffer | Uint8Array | string;
        caption?: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        captionEntities?: import("../../client/interfaces/Message").MessageEntity[];
        disableContentTypeDetection?: boolean;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: import("../../client/interfaces/Message").ReplyParameters;
        replyMarkup?: import("../../client/interfaces/Markup").InlineKeyboardMarkup | import("../../client/interfaces/Markup").ReplyKeyboardMarkup | import("../../client/interfaces/Markup").ReplyKeyboardRemove | import("../../client/interfaces/Markup").ForceReply;
    }, "document" | "chatId" | "messageThreadId"> | undefined): Promise<Message & {
        document: import("../media/Document").Document;
    }>;
    /**
     * Use this method to send video files, Telegram clients support MPEG4 videos (other formats may be sent as Document).
     * @param {Buffer | ReadStream | Blob | FormData | DataView | ArrayBuffer | Uint8Array | string} audio - Video to send. Pass a file_id as String to send a video that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a video from the Internet, or upload a new video using multipart/form-data.
     * @param {Omit<MethodParameters["sendVideo"], "video" | "chatId" | "messageThreadId">} [options={}] - out parameters
     * @return {Promise<Message & { video: import("../media/Video").Video }>} - On success, the sent Message is returned. Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future.
     */
    sendVideo(video: any, options?: Omit<{
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: number;
        video: Buffer | import("fs").ReadStream | import("buffer").Blob | FormData | DataView | ArrayBuffer | Uint8Array | string;
        duration?: number;
        width?: number;
        height?: number;
        thumbnail?: Buffer | import("fs").ReadStream | import("buffer").Blob | FormData | DataView | ArrayBuffer | Uint8Array | string;
        caption?: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        captionEntities?: import("../../client/interfaces/Message").MessageEntity[];
        showCaptionAboveMedia?: boolean;
        hasSpoiler?: boolean;
        supportsStreaming?: boolean;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: import("../../client/interfaces/Message").ReplyParameters;
        replyMarkup?: import("../../client/interfaces/Markup").InlineKeyboardMarkup | import("../../client/interfaces/Markup").ReplyKeyboardMarkup | import("../../client/interfaces/Markup").ReplyKeyboardRemove | import("../../client/interfaces/Markup").ForceReply;
    }, "video" | "chatId" | "messageThreadId"> | undefined): Promise<Message & {
        video: import("../media/Video").Video;
    }>;
    /**
     * Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound).
     * @param {Buffer | ReadStream | Blob | FormData | DataView | ArrayBuffer | Uint8Array | string} animation - Animation to send. Pass a file_id as String to send an animation that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an animation from the Internet, or upload a new animation using multipart/form-data
     * @param {Omit<MethodParameters["sendAnimation"], "animation" | "chatId" | "messageThreadId">} [options={}] - out parameters
     * @return {Promise<Message & { animation: import("../media/Animation").Animation }>} - On success, the sent Message is returned. Bots can currently send animation files of up to 50 MB in size, this limit may be changed in the future.
     */
    sendAnimation(animation: Buffer | ReadStream | Blob | FormData | DataView | ArrayBuffer | Uint8Array | string, options?: Omit<{
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: number;
        animation: Buffer | import("fs").ReadStream | import("buffer").Blob | FormData | DataView | ArrayBuffer | Uint8Array | string;
        duration?: number;
        width?: number;
        height?: number;
        thumbnail?: Buffer | import("fs").ReadStream | import("buffer").Blob | FormData | DataView | ArrayBuffer | Uint8Array | string;
        caption?: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        captionEntities?: import("../../client/interfaces/Message").MessageEntity[];
        showCaptionAboveMedia?: boolean;
        hasSpoiler?: boolean;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: import("../../client/interfaces/Message").ReplyParameters;
        replyMarkup?: import("../../client/interfaces/Markup").InlineKeyboardMarkup | import("../../client/interfaces/Markup").ReplyKeyboardMarkup | import("../../client/interfaces/Markup").ReplyKeyboardRemove | import("../../client/interfaces/Markup").ForceReply;
    }, "animation" | "chatId" | "messageThreadId"> | undefined): Promise<Message & {
        animation: import("../media/Animation").Animation;
    }>;
    /**
     * Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .OGG file encoded with OPUS, or in .MP3 format, or in .M4A format (other formats may be sent as Audio or Document).
     * @param {Buffer | ReadStream | Blob | FormData | DataView | ArrayBuffer | Uint8Array | string} voice - Audio file to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data
     * @param {Omit<MethodParameters["sendVoice"], "voice" | "chatId" | "messageThreadId">} [options={}] - out parameters
     * @return {Promise<Message & { voice: import("../media/Voice").Voice }>} - On success, the sent Message is returned. Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future.
     */
    sendVoice(voice: Buffer | ReadStream | Blob | FormData | DataView | ArrayBuffer | Uint8Array | string, options?: Omit<{
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: number;
        voice: Buffer | import("fs").ReadStream | import("buffer").Blob | FormData | DataView | ArrayBuffer | Uint8Array | string;
        caption?: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        captionEntities?: import("../../client/interfaces/Message").MessageEntity[];
        duration?: number;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: import("../../client/interfaces/Message").ReplyParameters;
        replyMarkup?: import("../../client/interfaces/Markup").InlineKeyboardMarkup | import("../../client/interfaces/Markup").ReplyKeyboardMarkup | import("../../client/interfaces/Markup").ReplyKeyboardRemove | import("../../client/interfaces/Markup").ForceReply;
    }, "voice" | "chatId" | "messageThreadId"> | undefined): Promise<Message & {
        voice: import("../media/Voice").Voice;
    }>;
    /**
     * Use this method to send video messages.
     * @param {Buffer | ReadStream | Blob | FormData | DataView | ArrayBuffer | Uint8Array | string} videoNote - Video note to send. Pass a file_id as String to send a video note that exists on the Telegram servers (recommended) or upload a new video using multipart/form-data.. Sending video notes by a URL is currently unsupported
     * @param {Omit<MethodParameters["sendVideoNote"], "video_note" | "chatId" | "messageThreadId">} [options={}] - out parameters
     * @return {Promise<Message & { videNote: import("../media/VideoNote").VideoNote }>} - On success, the sent Message is returned.
     */
    sendVideoNote(videoNote: Buffer | ReadStream | Blob | FormData | DataView | ArrayBuffer | Uint8Array | string, options?: Omit<{
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: number;
        videoNote: Buffer | import("fs").ReadStream | import("buffer").Blob | FormData | DataView | ArrayBuffer | Uint8Array | string;
        duration?: number;
        length?: number;
        thumbnail?: Buffer | import("fs").ReadStream | import("buffer").Blob | FormData | DataView | ArrayBuffer | Uint8Array | string;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: import("../../client/interfaces/Message").ReplyParameters;
        replyMarkup?: import("../../client/interfaces/Markup").InlineKeyboardMarkup | import("../../client/interfaces/Markup").ReplyKeyboardMarkup | import("../../client/interfaces/Markup").ReplyKeyboardRemove | import("../../client/interfaces/Markup").ForceReply;
    }, "video_note" | "chatId" | "messageThreadId"> | undefined): Promise<Message & {
        videNote: import("../media/VideoNote").VideoNote;
    }>;
    /**
     * Use this method to send a group of photos, videos, documents or audios as an album. Documents and audio files can be only grouped in an album with messages of the same type.
     * @param {ReadonlyArray<import("@telegram.ts/types").InputMediaAudio | import("@telegram.ts/types").InputMediaDocument | import("@telegram.ts/types").InputMediaPhoto | import("@telegram.ts/types").InputMediaVideo>} media - media
     * @param {Omit<MethodParameters["sendMediaGroup"], "media" | "chatId" | "messageThreadId">} [options={}] - out parameters
     * @return {Promise<Array<Message & { audio: import("../media/Audio").Audio; document: import("../media/Document").Document; photo: import("../media/Photo").Photo; video: import("../media/Video").Video}>>} - On success, an array of Messages that were sent is returned.
     */
    sendMediaGroup(media: ReadonlyArray<import("@telegram.ts/types").InputMediaAudio | import("@telegram.ts/types").InputMediaDocument | import("@telegram.ts/types").InputMediaPhoto | import("@telegram.ts/types").InputMediaVideo>, options?: Omit<{
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: number;
        media: ReadonlyArray<import("../../client/interfaces/Methods").InputMediaAudio | import("../../client/interfaces/Methods").InputMediaDocument | import("../../client/interfaces/Methods").InputMediaPhoto | import("../../client/interfaces/Methods").InputMediaVideo>;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: import("../../client/interfaces/Message").ReplyParameters;
    }, "media" | "chatId" | "messageThreadId"> | undefined): Promise<Array<Message & {
        audio: import("../media/Audio").Audio;
        document: import("../media/Document").Document;
        photo: import("../media/Photo").Photo;
        video: import("../media/Video").Video;
    }>>;
    /**
     * Use this method to send point on the map.
     * @param {number} latitude - Latitude of the location
     * @param {number} longitude - Longitude of the location
     * @param {Omit<MethodParameters["sendLocation"], "chatId" | "messageThreadId">} [options={}] - out parameters
     * @return {Promise<Message & { location: import("../misc/Location").Location }>} - On success, the sent Message is returned.
     */
    sendLocation(latitude: number, longitude: number, options?: Omit<{
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: number;
        latitude: number;
        longitude: number;
        horizontalAccuracy?: number;
        livePeriod?: number;
        heading?: number;
        proximityAlertRadius?: number;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: import("../../client/interfaces/Message").ReplyParameters;
        replyMarkup?: import("../../client/interfaces/Markup").InlineKeyboardMarkup | import("../../client/interfaces/Markup").ReplyKeyboardMarkup | import("../../client/interfaces/Markup").ReplyKeyboardRemove | import("../../client/interfaces/Markup").ForceReply;
    }, "chatId" | "messageThreadId"> | undefined): Promise<Message & {
        location: import("../misc/Location").Location;
    }>;
    /**
     * Use this method to send information about a venue.
     * @param {number} latitude - Latitude of the location
     * @param {number} llongitude - Longitude of the location
     * @param {Omit<MethodParameters["sendVenue"], "latitude" | "longitude" | "chatId" | "messageThreadId">} options- out parameters
     * @return {Promise<Message & { venue: import("../misc/Venue").Venue }>} - On success, the sent Message is returned.
     */
    sendVenue(latitude: number, longitude: any, options?: {}): Promise<Message & {
        venue: import("../misc/Venue").Venue;
    }>;
    /**
     * Use this method to send phone contacts.
     * @param {string} phoneNumber - Contact's phone number
     * @param {string} firstName - Contact's first name
     * @param {Omit<MethodParameters["sendContact"], "phoneNumber" | "firstName" | "chatId">} [options={}] - out parameters
     * @return {Promise<Message & { contact: import("../media/Contact").Contact }>} - On success, the sent Message is returned.
     */
    sendContact(phoneNumber: string, firstName: string, options?: Omit<{
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: number;
        phoneNumber: string;
        firstName: string;
        lastName?: string;
        vcard?: string;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: import("../../client/interfaces/Message").ReplyParameters;
        replyMarkup?: import("../../client/interfaces/Markup").InlineKeyboardMarkup | import("../../client/interfaces/Markup").ReplyKeyboardMarkup | import("../../client/interfaces/Markup").ReplyKeyboardRemove | import("../../client/interfaces/Markup").ForceReply;
    }, "chatId" | "phoneNumber" | "firstName"> | undefined): Promise<Message & {
        contact: import("../media/Contact").Contact;
    }>;
    /**
     * Use this method to send a native poll.
     * @param {string} question - Poll question, 1-300 characters
     * @param {import("@telegram.ts/types").InputPollOption[]} options - A list of 2-10 answer options
     * @param {Omit<MethodParameters["sendPoll"], "question" | "options" | "chatId" | "messageThreadId">} - out parameters
     * @return {Promise<Message & { poll: import("../media/Poll").Poll }>} - On success, the sent Message is returned.
     */
    sendPoll(question: string, options: import("@telegram.ts/types").InputPollOption[], other?: {}): Promise<Message & {
        poll: import("../media/Poll").Poll;
    }>;
    /**
     * Use this method to send an animated emoji that will display a random value.
     * @param {string} emoji - Emoji on which the dice throw animation is based. Currently, must be one of "🎲", "🎯", "🏀", "⚽", "🎳", or "🎰". Dice can have values 1-6 for "🎲", "🎯" and "🎳", values 1-5 for "🏀" and "⚽", and values 1-64 for "🎰".
     * @param {Omit<MethodParameters["sendDice"], "emoji" | "chatId" | "messageThreadId">} - out parameters
     * @return {Promise<Message & { dice: import("../media/Dice").Dice }>} - On success, the sent Message is returned.
     */
    sendDice(emoji: string, options?: {}): Promise<Message & {
        dice: import("../media/Dice").Dice;
    }>;
    /**
     * Use this method when you need to tell the user that something is happening on the bot's side. The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status).
     * @param {"typing"| "upload_photo"| "record_video"| "upload_video"| "record_voice" | "upload_voice" | "upload_document" | "choose_sticker"  | "find_location" | "record_video_note" | "upload_video_note"} action - Type of action to broadcast. Choose one, depending on what the user is about to receive: typing for text messages, upload_photo for photos, record_video or upload_video for videos, record_voice or upload_voice for voice notes, upload_document for general files, choose_sticker for stickers, find_location for location data, record_video_note or upload_video_note for video notes
     * @return {Promise<true>} - Returns True on success.
     */
    sendAction(action?: "typing" | "upload_photo" | "record_video" | "upload_video" | "record_voice" | "upload_voice" | "upload_document" | "choose_sticker" | "find_location" | "record_video_note" | "upload_video_note"): Promise<true>;
    /**
     * Use this method to send static .WEBP, animated .TGS, or video .WEBM stickers.
     * @param {Buffer | ReadStream | Blob | FormData | DataView | ArrayBuffer | Uint8Array | string} sticker - Sticker to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a .WEBP sticker from the Internet, or upload a new .WEBP, .TGS, or .WEBM sticker using multipart/form-data. Video and animated stickers can't be sent via an HTTP URL
     * @param {Omit<MethodParameters["sendSticker"], "sticker" | "chatId" | "messageThreadId">} [options={}] - out parameters
     * @return {Promise<Message & { sticker: import("../media/Sticker").Sticker }>} - On success, the sent Message is returned.
     */
    sendSticker(sticker: Buffer | ReadStream | Blob | FormData | DataView | ArrayBuffer | Uint8Array | string, options?: Omit<{
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: number;
        sticker: Buffer | import("fs").ReadStream | import("buffer").Blob | FormData | DataView | ArrayBuffer | Uint8Array | string;
        emoji?: string;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: import("../../client/interfaces/Message").ReplyParameters;
        replyMarkup?: import("../../client/interfaces/Markup").InlineKeyboardMarkup | import("../../client/interfaces/Markup").ReplyKeyboardMarkup | import("../../client/interfaces/Markup").ReplyKeyboardRemove | import("../../client/interfaces/Markup").ForceReply;
    }, "sticker" | "chatId" | "messageThreadId"> | undefined): Promise<Message & {
        sticker: import("../media/Sticker").Sticker;
    }>;
    /**
     * Use this method to send invoices.
     * @param {string} title - Product name, 1-32 characters
     * @param {string} description - Product description, 1-255 characters
     * @param {string} payload - Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use for your internal processes
     * @param {string} currency - Three-letter ISO 4217 currency code, see more on currencies. Pass “XTR” for payments in Telegram Stars
     * @param {import("@telegram.ts/types").LabeledPrice[]} prices - Price breakdown, a JSON-serialized list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.). Must contain exactly one item for payments in Telegram Stars
     * @param {Omit<MethodParameters["sendInvoice"], "title" | "description" | "payload" | "currency" | "prices" | "chatId" | "messageThreadId">} [options={}] - out parameters
     * @return {Promise<Message & { invoice: import("../invoice/Invoice").Invoice }>} - On success, the sent Message is returned.
     */
    sendInvoice(title: string, description: string, payload: string, currency: string, prices: import("@telegram.ts/types").LabeledPrice[], options?: Omit<{
        chatId: number | string;
        messageThreadId?: number;
        title: string;
        description: string;
        payload: string;
        providerToken?: string;
        currency: string;
        prices: readonly import("../../client/interfaces/Inline").LabeledPrice[];
        maxTipAmount?: number;
        suggestedTipAmounts?: number[];
        startParameter?: string;
        providerData?: string;
        photoUrl?: string;
        photoSize?: number;
        photoWidth?: number;
        photoHeight?: number;
        needName?: boolean;
        needPhoneNumber?: boolean;
        needEmail?: boolean;
        needShippingAddress?: boolean;
        sendPhoneNumberToProvider?: boolean;
        sendEmailToProvider?: boolean;
        isFlexible?: boolean;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: import("../../client/interfaces/Message").ReplyParameters;
        replyMarkup?: import("../../client/interfaces/Markup").InlineKeyboardMarkup;
    }, "currency" | "description" | "title" | "chatId" | "messageThreadId" | "payload" | "prices"> | undefined): Promise<Message & {
        invoice: import("../invoice/Invoice").Invoice;
    }>;
    /**
     * Use this method to send a game.
     * @param {string} gameShortName - Short name of the game, serves as the unique identifier for the game. Set up your games via BotFather.
     * @param {Omit<MethodParameters["sendGame"], "gameShortName" | "chatId" | "messageThreadId">} [options={}] - out parameters
     * @return {Promise<Message & { game: import("../game/Game").Game }>} - On success, the sent Message is returned.
     */
    sendGame(gameShortName: string, options?: Omit<{
        businessConnectionId?: string;
        chatId: number;
        messageThreadId?: number;
        gameShortName: string;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: import("../../client/interfaces/Message").ReplyParameters;
        replyMarkup?: import("../../client/interfaces/Markup").InlineKeyboardMarkup;
    }, "chatId" | "messageThreadId" | "gameShortName"> | undefined): Promise<Message & {
        game: import("../game/Game").Game;
    }>;
}
import { Base } from "../Base";
import { UserPermissions } from "../../util/UserPermissions";
import { InlineKeyboardCollector } from "../../util/collector/InlineKeyboardCollector";
//# sourceMappingURL=Chat.d.ts.map