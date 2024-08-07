import type { ReadStream } from "node:fs";
import { EventEmitter } from "node:events";
import { ApiRequest } from "../rest/ApiRequest";
import { Collection } from "@telegram.ts/collection";
import type { ClientOptions } from "./TelegramClient";
import { UserManager } from "../managers/UserManager";
import { ChatManager } from "../managers/ChatManager";
import { type ChatPermissionFlags } from "../util/ChatPermissions";
import type { MethodsLibReturnType, MethodParameters, PossiblyAsync } from "../types";
interface EventHandlers {
    ready: (telegram: import("./TelegramClient").TelegramClient) => PossiblyAsync<void>;
    disconnect: (telegram: import("./TelegramClient").TelegramClient) => PossiblyAsync<void>;
    message: (message: import("../structures/message/Message").Message) => PossiblyAsync<void>;
    channelPost: (message: import("../structures/message/Message").Message) => PossiblyAsync<void>;
    businessMessage: (message: import("../structures/message/Message").Message) => PossiblyAsync<void>;
    businessConnection: (message: import("../structures/business/BusinessConnection").BusinessConnection) => PossiblyAsync<void>;
    editedMessage: (oldMessage: import("../structures/message/Message").Message | null, newMessage: import("../structures/message/Message").Message) => PossiblyAsync<void>;
    editedChannelPost: (oldMessage: import("../structures/message/Message").Message | null, newMessage: import("../structures/message/Message").Message) => PossiblyAsync<void>;
    editedBusinessMessage: (oldMessage: import("../structures/message/Message").Message | null, newMessage: import("../structures/message/Message").Message) => PossiblyAsync<void>;
    deletedBusinessMessages: (message: import("../structures/business/BusinessMessagesDeleted").BusinessMessagesDeleted) => PossiblyAsync<void>;
    messageReaction: (message: import("../structures/MessageReactionUpdated").MessageReactionUpdated) => PossiblyAsync<void>;
    messageReactionCount: (message: import("../structures/MessageReactionCountUpdated").MessageReactionCountUpdated) => PossiblyAsync<void>;
    inlineQuery: (inline: import("../structures/InlineQuery").InlineQuery) => PossiblyAsync<void>;
    chosenInlineResult: (inlineResult: import("../structures/ChosenInlineResult").ChosenInlineResult) => PossiblyAsync<void>;
    callbackQuery: (query: import("../structures/CallbackQuery").CallbackQuery) => PossiblyAsync<void>;
    shippingQuery: (query: import("../structures/ShippingQuery").ShippingQuery) => PossiblyAsync<void>;
    preCheckoutQuery: (checkoutQuery: import("../structures/PreCheckoutQuery").PreCheckoutQuery) => PossiblyAsync<void>;
    poll: (poll: import("../structures/media/Poll").Poll) => PossiblyAsync<void>;
    pollAnswer: (pollAnswer: import("../structures/PollAnswer").PollAnswer) => PossiblyAsync<void>;
    myChatMember: (member: import("../structures/ChatMemberUpdated").ChatMemberUpdated) => PossiblyAsync<void>;
    chatMember: (member: import("../structures/ChatMemberUpdated").ChatMemberUpdated) => PossiblyAsync<void>;
    chatCreate: (message: import("../structures/message/Message").Message) => PossiblyAsync<void>;
    chatMemberAdd: (message: import("../structures/message/Message").Message) => PossiblyAsync<void>;
    chatDelete: (message: import("../structures/message/Message").Message) => PossiblyAsync<void>;
    chatMemberRemove: (message: import("../structures/message/Message").Message) => PossiblyAsync<void>;
    chatJoinRequest: (joinRequest: import("../structures/ChatJoinRequest").ChatJoinRequest) => PossiblyAsync<void>;
    chatBoost: (boostChat: import("../structures/ChatBoostUpdated").ChatBoostUpdated) => PossiblyAsync<void>;
    removedChatBoost: (chatBoost: import("../structures/ChatBoostRemoved").ChatBoostRemoved) => PossiblyAsync<void>;
}
type EventHandlerParameters = import("../structures/message/Message").Message | [
    null | import("../structures/message/Message").Message,
    import("../structures/message/Message").Message
] | import("../structures/business/BusinessConnection").BusinessConnection | import("../structures/business/BusinessMessagesDeleted").BusinessMessagesDeleted | import("../structures/MessageReactionUpdated").MessageReactionUpdated | import("../structures/MessageReactionCountUpdated").MessageReactionCountUpdated | import("../structures/InlineQuery").InlineQuery | import("../structures/ChosenInlineResult").ChosenInlineResult | import("../structures/CallbackQuery").CallbackQuery | import("../structures/ShippingQuery").ShippingQuery | import("../structures/PreCheckoutQuery").PreCheckoutQuery | import("../structures/media/Poll").Poll | import("../structures/PollAnswer").PollAnswer | import("../structures/ChatMemberUpdated").ChatMemberUpdated | import("../structures/ChatJoinRequest").ChatJoinRequest | import("../structures/ChatBoostUpdated").ChatBoostUpdated | import("../structures/ChatBoostRemoved").ChatBoostRemoved;
declare class BaseClient extends EventEmitter {
    readonly apiRequest: ApiRequest;
    readonly users: UserManager;
    readonly chats: ChatManager;
    readonly updates: Collection<number, EventHandlerParameters>;
    constructor(authToken: string, options?: ClientOptions);
    /**
     * Adds a typed listener for the specified event.
     * @param event - The event name.
     * @param listener - The listener function.
     * @returns The ManagerEvents instance.
     */
    on<T extends keyof EventHandlers>(event: T, listener: EventHandlers[T]): this;
    /**
     * Adds a typed one-time listener for the specified event.
     * @param event - The event name.
     * @param listener - The listener function.
     * @returns The ManagerEvents instance.
     */
    once<T extends keyof EventHandlers>(event: T, listener: EventHandlers[T]): this;
    /**
     * Increments max listeners by one, if they are not zero.
     * @return {void}
     */
    incrementMaxListeners(): void;
    /**
     * Decrements max listeners by one, if they are not zero.
     * @return {void}
     */
    decrementMaxListeners(): void;
    /** Use this method to receive incoming updates using long polling (wiki). Returns an Array of Update objects.
  
    Notes
    1. This method will not work if an outgoing webhook is set up.
    2. In order to avoid getting duplicate updates, recalculate offset after each server response. */
    getUpdates(params?: MethodParameters["getUpdates"]): Promise<import("@telegram.ts/types").Update[]>;
    /** Use this method to specify a URL and receive incoming updates via an outgoing webhook. Whenever there is an update for the bot, we will send an HTTPS POST request to the specified URL, containing a JSON-serialized Update. In case of an unsuccessful request, we will give up after a reasonable amount of attempts. Returns True on success.
  
    If you'd like to make sure that the webhook was set by you, you can specify secret data in the parameter secret_token. If specified, the request will contain a header “X-Telegram-Bot-Api-Secret-Token” with the secret token as content.
  
    Notes
    1. You will not be able to receive updates using getUpdates for as long as an outgoing webhook is set up.
    2. To use a self-signed certificate, you need to upload your public key certificate using certificate parameter. Please upload as InputFile, sending a String will not work.
    3. Ports currently supported for Webhooks: 443, 80, 88, 8443.
  
    If you're having any trouble setting up webhooks, please check out this amazing guide to webhooks. */
    setWebhook(params: MethodParameters["setWebhook"]): Promise<MethodsLibReturnType["setWebhook"]>;
    /** A simple method for testing your bot's authentication token. Requires no parameters. Returns basic information about the bot in form of a User object. */
    getMe(): Promise<MethodsLibReturnType["getMe"]>;
    /** Use this method to log out from the cloud Bot API server before launching the bot locally. You must log out the bot before running it locally, otherwise there is no guarantee that the bot will receive updates. After a successful call, you can immediately log in on a local server, but will not be able to log in back to the cloud Bot API server for 10 minutes. Returns True on success. Requires no parameters. */
    logOut(): Promise<MethodsLibReturnType["logOut"]>;
    /** Use this method to close the bot instance before moving it from one local server to another. You need to delete the webhook before calling this method to ensure that the bot isn't launched again after server restart. The method will return error 429 in the first 10 minutes after the bot is launched. Returns True on success. Requires no parameters. */
    close(): Promise<MethodsLibReturnType["close"]>;
    /** Use this method to remove webhook integration if you decide to switch back to getUpdates. Returns True on success. */
    deleteWebhook(dropPendingUpdates?: boolean): Promise<MethodsLibReturnType["deleteWebhook"]>;
    /** Use this method to get current webhook status. Requires no parameters. On success, returns a WebhookInfo object. If the bot is using getUpdates, will return an object with the url field empty. */
    getWebhookInfo(): Promise<MethodsLibReturnType["getWebhookInfo"]>;
    /** Use this method to send text messages. On success, the sent Message is returned. */
    sendMessage(params: MethodParameters["sendMessage"]): Promise<MethodsLibReturnType["sendMessage"]>;
    /** Use this method to send photos. On success, the sent Message is returned. */
    sendPhoto(params: MethodParameters["sendPhoto"]): Promise<MethodsLibReturnType["sendPhoto"]>;
    /** Use this method to send audio files, if you want Telegram clients to display them in the music player. Your audio must be in the .MP3 or .M4A format. On success, the sent Message is returned. Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.
  
    For sending voice messages, use the sendVoice method instead. */
    sendAudio(params: MethodParameters["sendAudio"]): Promise<MethodsLibReturnType["sendAudio"]>;
    /** Use this method to send paid media to channel chats. On success, the sent Message is returned. */
    sendPaidMedia(params: MethodParameters["sendPaidMedia"]): Promise<MethodsLibReturnType["sendPaidMedia"]>;
    /** Use this method to send general files. On success, the sent Message is returned. Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future. */
    sendDocument(params: MethodParameters["sendDocument"]): Promise<MethodsLibReturnType["sendDocument"]>;
    /** Use this method to send video files, Telegram clients support MPEG4 videos (other formats may be sent as Document). On success, the sent Message is returned. Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future. */
    sendVideo(params: MethodParameters["sendVideo"]): Promise<MethodsLibReturnType["sendVideo"]>;
    /** Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound). On success, the sent Message is returned. Bots can currently send animation files of up to 50 MB in size, this limit may be changed in the future. */
    sendAnimation(params: MethodParameters["sendAnimation"]): Promise<MethodsLibReturnType["sendAnimation"]>;
    /** Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .OGG file encoded with OPUS, or in .MP3 format, or in .M4A format (other formats may be sent as Audio or Document). On success, the sent Message is returned. Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future. */
    sendVoice(params: MethodParameters["sendVoice"]): Promise<MethodsLibReturnType["sendVoice"]>;
    /** Use this method to send video messages. On success, the sent Message is returned.
    As of v.4.0, Telegram clients support rounded square MPEG4 videos of up to 1 minute long. */
    sendVideoNote(params: MethodParameters["sendVideoNote"]): Promise<MethodsLibReturnType["sendVideoNote"]>;
    /** Use this method to send a group of photos, videos, documents or audios as an album. Documents and audio files can be only grouped in an album with messages of the same type. On success, an array of Messages that were sent is returned. */
    sendMediaGroup(params: MethodParameters["sendMediaGroup"]): Promise<MethodsLibReturnType["sendMediaGroup"]>;
    /** Use this method to send point on the map. On success, the sent Message is returned. */
    sendLocation(params: MethodParameters["sendLocation"]): Promise<MethodsLibReturnType["sendLocation"]>;
    /** Use this method to send information about a venue. On success, the sent Message is returned. */
    sendVenue(params: MethodParameters["sendVenue"]): Promise<MethodsLibReturnType["sendVenue"]>;
    /** Use this method to forward messages of any kind. Service messages and messages with protected content can't be forwarded. On success, the sent Message is returned. */
    forwardMessage(params: MethodParameters["forwardMessage"]): Promise<MethodsLibReturnType["forwardMessage"]>;
    /** Use this method to forward multiple messages of any kind. If some of the specified messages can't be found or forwarded, they are skipped. Service messages and messages with protected content can't be forwarded. Album grouping is kept for forwarded messages. On success, an array of MessageId of the sent messages is returned. */
    forwardMessages(params: MethodParameters["forwardMessages"]): Promise<MethodsLibReturnType["forwardMessages"]>;
    /** Use this method to copy messages of any kind. Service messages, paid media messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correct_option_id is known to the bot. The method is analogous to the method forwardMessage, but the copied message doesn't have a link to the original message. Returns the MessageId of the sent message on success. */
    copyMessage(params: MethodParameters["copyMessage"]): Promise<MethodsLibReturnType["copyMessage"]>;
    /** Use this method to copy messages of any kind. If some of the specified messages can't be found or copied, they are skipped. Service messages, paid media messages, giveaway messages, giveaway winners messages,  and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correct_option_id is known to the bot. The method is analogous to the method forwardMessages, but the copied messages don't have a link to the original message. Album grouping is kept for copied messages. On success, an array of MessageId of the sent messages is returned. */
    copyMessages(params: MethodParameters["copyMessages"]): Promise<MethodsLibReturnType["copyMessages"]>;
    /** Use this method to send phone contacts. On success, the sent Message is returned. */
    sendContact(params: MethodParameters["sendContact"]): Promise<MethodsLibReturnType["sendContact"]>;
    /** Use this method to send a native poll. On success, the sent Message is returned. */
    sendPoll(params: MethodParameters["sendPoll"]): Promise<MethodsLibReturnType["sendPoll"]>;
    /** Use this method to send an animated emoji that will display a random value. On success, the sent Message is returned. */
    sendDice(params: MethodParameters["sendDice"]): Promise<MethodsLibReturnType["sendDice"]>;
    /** Use this method when you need to tell the user that something is happening on the bot's side. The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status). Returns True on success.
  
    Example: The ImageBot needs some time to process a request and upload the image. Instead of sending a text message along the lines of "Retrieving image, please wait...", the bot may use sendChatAction with action = upload_photo. The user will see a "sending photo" status for the bot.
  
    We only recommend using this method when a response from the bot will take a noticeable amount of time to arrive. */
    sendChatAction(params: MethodParameters["sendChatAction"]): Promise<MethodsLibReturnType["sendChatAction"]>;
    /** Use this method to change the chosen reactions on a message. Service messages can't be reacted to. Automatically forwarded messages from a channel to its discussion group have the same available reactions as messages in the channel. In albums, bots must react to the first message. Returns True on success. */
    setMessageReaction(params: MethodParameters["setMessageReaction"]): Promise<MethodsLibReturnType["setMessageReaction"]>;
    /** Use this method to get a list of profile pictures for a user. Returns a UserProfilePhotos object. */
    getUserProfilePhotos(params: MethodParameters["getUserProfilePhotos"]): Promise<MethodsLibReturnType["getUserProfilePhotos"]>;
    /** Use this method to get basic information about a file and prepare it for downloading. For the moment, bots can download files of up to 20MB in size. On success, a File object is returned. The file can then be downloaded via the link https://api.telegram.org/file/bot<token>/<file_path>, where <file_path> is taken from the response. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling getFile again.
  
    Note: This function may not preserve the original file name and MIME type. You should save the file's MIME type and name (if available) when the File object is received. */
    getFile(fileId: string): Promise<MethodsLibReturnType["getFile"]>;
    /** Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
    kickChatMember(params: MethodParameters["kickChatMember"]): Promise<MethodsLibReturnType["kickChatMember"]>;
    /** Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
    banChatMember(params: MethodParameters["banChatMember"]): Promise<MethodsLibReturnType["banChatMember"]>;
    /** Use this method to unban a previously banned user in a supergroup or channel. The user will not return to the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator for this to work. By default, this method guarantees that after the call the user is not a member of the chat, but will be able to join it. So if the user is a member of the chat they will also be removed from the chat. If you don't want this, use the parameter only_if_banned. Returns True on success. */
    unbanChatMember(params: MethodParameters["unbanChatMember"]): Promise<MethodsLibReturnType["unbanChatMember"]>;
    /** Use this method to restrict a user in a supergroup. The bot must be an administrator in the supergroup for this to work and must have the appropriate administrator rights. Pass True for all permissions to lift restrictions from a user. Returns True on success. */
    restrictChatMember(params: Omit<MethodParameters["restrictChatMember"], "permissions"> & {
        permissions: ChatPermissionFlags;
    }): Promise<MethodsLibReturnType["restrictChatMember"]>;
    /** Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Pass False for all boolean parameters to demote a user. Returns True on success. */
    promoteChatMember(params: Omit<MethodParameters["promoteChatMember"], keyof ChatPermissionFlags> & {
        permissions: ChatPermissionFlags;
    }): Promise<MethodsLibReturnType["promoteChatMember"]>;
    /** Use this method to set a custom title for an administrator in a supergroup promoted by the bot. Returns True on success. */
    setChatAdministratorCustomTitle(params: MethodParameters["setChatAdministratorCustomTitle"]): Promise<MethodsLibReturnType["setChatAdministratorCustomTitle"]>;
    /** Use this method to ban a channel chat in a supergroup or a channel. Until the chat is unbanned, the owner of the banned chat won't be able to send messages on behalf of any of their channels. The bot must be an administrator in the supergroup or channel for this to work and must have the appropriate administrator rights. Returns True on success. */
    banChatSenderChat(chatId: number | string, senderChatId: number): Promise<MethodsLibReturnType["banChatSenderChat"]>;
    /** Use this method to unban a previously banned channel chat in a supergroup or channel. The bot must be an administrator for this to work and must have the appropriate administrator rights. Returns True on success. */
    unbanChatSenderChat(chatId: number | string, senderChatId: number): Promise<MethodsLibReturnType["unbanChatSenderChat"]>;
    /** Use this method to set default chat permissions for all members. The bot must be an administrator in the group or a supergroup for this to work and must have the can_restrict_members administrator rights. Returns True on success. */
    setChatPermissions(params: Omit<MethodParameters["setChatPermissions"], "permissions"> & {
        permissions?: ChatPermissionFlags;
    }): Promise<MethodsLibReturnType["setChatPermissions"]>;
    /** Use this method to generate a new primary invite link for a chat; any previously generated primary link is revoked. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the new invite link as String on success.
  
    Note: Each administrator in a chat generates their own invite links. Bots can't use invite links generated by other administrators. If you want your bot to work with invite links, it will need to generate its own link using exportChatInviteLink or by calling the getChat method. If your bot needs to generate a new primary invite link replacing its previous one, use exportChatInviteLink again. */
    exportChatInviteLink(chatId?: number | string): Promise<MethodsLibReturnType["exportChatInviteLink"]>;
    /** Use this method to create an additional invite link for a chat. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. The link can be revoked using the method revokeChatInviteLink. Returns the new invite link as ChatInviteLink object. */
    createChatInviteLink(params: MethodParameters["createChatInviteLink"]): Promise<MethodsLibReturnType["createChatInviteLink"]>;
    /** Use this method to edit a non-primary invite link created by the bot. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the edited invite link as a ChatInviteLink object. */
    editChatInviteLink(params: MethodParameters["editChatInviteLink"]): Promise<MethodsLibReturnType["editChatInviteLink"]>;
    /** Use this method to revoke an invite link created by the bot. If the primary link is revoked, a new link is automatically generated. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the revoked invite link as ChatInviteLink object. */
    revokeChatInviteLink(inviteLink: string, chatId?: number | string): Promise<MethodsLibReturnType["revokeChatInviteLink"]>;
    /** Use this method to approve a chat join get. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success. */
    approveChatJoinRequest(userId: number, chatId?: number | string): Promise<MethodsLibReturnType["approveChatJoinRequest"]>;
    /** Use this method to decline a chat join get. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success. */
    declineChatJoinRequest(chatId: number | string, userId: number): Promise<MethodsLibReturnType["declineChatJoinRequest"]>;
    /** Use this method to set a new profile photo for the chat. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
    setChatPhoto(chatId: number | string, photo: Buffer | ReadStream | string): Promise<MethodsLibReturnType["setChatPhoto"]>;
    /** Use this method to delete a chat photo. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
    deleteChatPhoto(chatId: number | string): Promise<MethodsLibReturnType["deleteChatPhoto"]>;
    /** Use this method to change the title of a chat. Titles can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
    setChatTitle(chatId: number | string, title: string): Promise<MethodsLibReturnType["setChatTitle"]>;
    /** Use this method to change the description of a group, a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
    setChatDescription(chatId: number, description?: string): Promise<MethodsLibReturnType["setChatDescription"]>;
    /** Use this method to add a message to the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel. Returns True on success. */
    pinChatMessage(params: MethodParameters["pinChatMessage"]): Promise<MethodsLibReturnType["pinChatMessage"]>;
    /** Use this method to remove a message from the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel. Returns True on success. */
    unpinChatMessage(params: MethodParameters["unpinChatMessage"]): Promise<MethodsLibReturnType["unpinChatMessage"]>;
    /** Use this method to clear the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel. Returns True on success. */
    unpinAllChatMessages(chatId: number | string): Promise<MethodsLibReturnType["unpinAllChatMessages"]>;
    /** Use this method for your bot to leave a group, supergroup or channel. Returns True on success. */
    leaveChat(chatId: number | string): Promise<MethodsLibReturnType["leaveChat"]>;
    /** Use this method to get up to date information about the chat (current name of the user for one-on-one conversations, current username of a user, group or channel, etc.). Returns a Chat object on success. */
    getChat(chatId: number | string): Promise<MethodsLibReturnType["getChat"]>;
    /** Use this method to get a list of administrators in a chat, which aren't bots. Returns an Array of ChatMember objects. */
    getChatAdministrators(chatId: number | string): Promise<MethodsLibReturnType["getChatAdministrators"]>;
    /** Use this method to get the number of members in a chat. Returns Int on success. */
    getChatMemberCount(chatId: number | string): Promise<MethodsLibReturnType["getChatMemberCount"]>;
    /** Use this method to get the list of boosts added to a chat by a user. Requires administrator rights in the chat. Returns a UserChatBoosts object. */
    getUserChatBoosts(chatId: number | string, userId: number): Promise<MethodsLibReturnType["getUserChatBoosts"]>;
    /** Use this method to get information about the connection of the bot with a business account. Returns a BusinessConnection object on success. */
    getBusinessConnection(businessConnectionId: string): Promise<MethodsLibReturnType["getBusinessConnection"]>;
    /** Use this method to get information about a member of a chat. The method is only guaranteed to work for other users if the bot is an administrator in the chat. Returns a ChatMember object on success. */
    getChatMember(chatId: number | string, userId: number): Promise<MethodsLibReturnType["getChatMember"]>;
    /** Use this method to set a new group sticker set for a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set ly returned in getChat requests to check if the bot can use this method. Returns True on success. */
    setChatStickerSet(stickerSetName: string, chatId?: number | string): Promise<MethodsLibReturnType["setChatStickerSet"]>;
    /** Use this method to delete a group sticker set from a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set ly returned in getChat requests to check if the bot can use this method. Returns True on success. */
    deleteChatStickerSet(chatId?: number | string): Promise<MethodsLibReturnType["deleteChatStickerSet"]>;
    /** Use this method to get custom emoji stickers, which can be used as a forum topic icon by any user. Requires no parameters. Returns an Array of Sticker objects. */
    getForumTopicIconStickers(): Promise<MethodsLibReturnType["getForumTopicIconStickers"]>;
    /** Use this method to create a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns information about the created topic as a ForumTopic object. */
    createForumTopic(params: MethodParameters["createForumTopic"]): Promise<MethodsLibReturnType["createForumTopic"]>;
    /** Use this method to edit name and icon of a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success. */
    editForumTopic(params: MethodParameters["editForumTopic"]): Promise<MethodsLibReturnType["editForumTopic"]>;
    /** Use this method to close an open topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success. */
    closeForumTopic(chatId: number | string, messageThreadId: number): Promise<MethodsLibReturnType["closeForumTopic"]>;
    /** Use this method to reopen a closed topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success. */
    reopenForumTopic(chatId: number | string, messageThreadId: number): Promise<MethodsLibReturnType["reopenForumTopic"]>;
    /** Use this method to delete a forum topic along with all its messages in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_delete_messages administrator rights. Returns True on success. */
    deleteForumTopic(chatId: number | string, messageThreadId: number): Promise<MethodsLibReturnType["deleteForumTopic"]>;
    /** Use this method to clear the list of pinned messages in a forum topic. The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup. Returns True on success. */
    unpinAllForumTopicMessages(chatId: number | string, messageThreadId: number): Promise<MethodsLibReturnType["unpinAllForumTopicMessages"]>;
    /** Use this method to edit the name of the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have can_manage_topics administrator rights. Returns True on success. */
    editGeneralForumTopic(chatId: number | string, name: string): Promise<MethodsLibReturnType["editGeneralForumTopic"]>;
    /** Use this method to close an open 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns True on success. */
    closeGeneralForumTopic(chatId: number | string): Promise<MethodsLibReturnType["closeGeneralForumTopic"]>;
    /** Use this method to reopen a closed 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically unhidden if it was hidden. Returns True on success. */
    reopenGeneralForumTopic(chatId: number | string): Promise<MethodsLibReturnType["reopenGeneralForumTopic"]>;
    /** Use this method to hide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically closed if it was open. Returns True on success. */
    hideGeneralForumTopic(chatId: number | string): Promise<MethodsLibReturnType["hideGeneralForumTopic"]>;
    /** Use this method to unhide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns True on success. */
    unhideGeneralForumTopic(chatId: string | number): Promise<MethodsLibReturnType["unhideGeneralForumTopic"]>;
    /** Use this method to clear the list of pinned messages in a General forum topic. The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup. Returns True on success.
     */
    unpinAllGeneralForumTopicMessages(chatId: string | number): Promise<MethodsLibReturnType["unpinAllGeneralForumTopicMessages"]>;
    /** Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, True is returned.
  
    Alternatively, the user can be redirected to the specified Game URL. For this option to work, you must first create a game for your bot via @BotFather and accept the terms. Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter. */
    answerCallbackQuery(params: MethodParameters["answerCallbackQuery"]): Promise<MethodsLibReturnType["answerCallbackQuery"]>;
    /** Use this method to change the list of the bot's commands. See https://core.telegram.org/bots#commands for more details about bot commands. Returns True on success. */
    setMyCommands(params: MethodParameters["setMyCommands"]): Promise<MethodsLibReturnType["setMyCommands"]>;
    /** Use this method to delete the list of the bot's commands for the given scope and user language. After deletion, higher level commands will be shown to affected users. Returns True on success. */
    deleteMyCommands(scope?: string, languageCode?: string): Promise<MethodsLibReturnType["deleteMyCommands"]>;
    /** Use this method to get the current list of the bot's commands for the given scope and user language. Returns an Array of BotCommand objects. If commands aren't set, an empty list is returned. */
    getMyCommands(scope?: MethodParameters["getMyCommands"]["scope"], languageCode?: string): Promise<MethodsLibReturnType["getMyCommands"]>;
    /** Use this method to change the bot's name. Returns True on success. */
    setMyName(name?: string, languageCode?: string): Promise<MethodsLibReturnType["setMyName"]>;
    /** Use this method to get the current bot name for the given user language. Returns BotName on success. */
    getMyName(languageCode?: string): Promise<MethodsLibReturnType["getMyName"]>;
    /** Use this method to change the bot's description, which is shown in the chat with the bot if the chat is empty. Returns True on success. */
    setMyDescription(description?: string, languageCode?: string): Promise<MethodsLibReturnType["setMyDescription"]>;
    /** Use this method to get the current bot description for the given user language. Returns BotDescription on success. */
    getMyDescription(languageCode?: string): Promise<MethodsLibReturnType["getMyDescription"]>;
    /** Use this method to change the bot's short description, which is shown on the bot's profile page and is sent together with the link when users share the bot. Returns True on success. */
    setMyShortDescription(shortDescription?: string, languageCode?: string): Promise<MethodsLibReturnType["setMyShortDescription"]>;
    /** Use this method to get the current bot short description for the given user language. Returns BotShortDescription on success. */
    getMyShortDescription(languageCode?: string): Promise<MethodsLibReturnType["getMyShortDescription"]>;
    /** Use this method to change the bot's menu button in a private chat, or the default menu button. Returns True on success. */
    setChatMenuButton(chatId?: number, menuButton?: MethodParameters["setChatMenuButton"]["menuButton"]): Promise<MethodsLibReturnType["setChatMenuButton"]>;
    /** Use this method to get the current value of the bot's menu button in a private chat, or the default menu button. Returns MenuButton on success. */
    getChatMenuButton(chatId?: number | string): Promise<MethodsLibReturnType["getChatMenuButton"]>;
    /** Use this method to change the default administrator rights requested by the bot when it's added as an administrator to groups or channels. These rights will be suggested to users, but they are free to modify the list before adding the bot. Returns True on success. */
    setMyDefaultAdministratorRights(rights?: ChatPermissionFlags, forChannels?: boolean): Promise<MethodsLibReturnType["setMyDefaultAdministratorRights"]>;
    /** Use this method to get the current default administrator rights of the bot. Returns ChatAdministratorRights on success. */
    getMyDefaultAdministratorRights(forChannels: boolean): Promise<MethodsLibReturnType["getMyDefaultAdministratorRights"]>;
    /** Use this method to edit text and game messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
    editMessageText(params: MethodParameters["editMessageText"]): Promise<MethodsLibReturnType["editMessageText"]>;
    /** Use this method to edit captions of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
    editMessageCaption(params: MethodParameters["editMessageCaption"]): Promise<MethodsLibReturnType["editMessageCaption"]>;
    /** Use this method to edit animation, audio, document, photo, or video messages. If a message is part of a message album, then it can be edited only to an audio for audio albums, only to a document for document albums and to a photo or a video otherwise. When an inline message is edited, a new file can't be uploaded; use a previously uploaded file via its file_id or specify a URL. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
    editMessageMedia(params: MethodParameters["editMessageMedia"]): Promise<MethodsLibReturnType["editMessageMedia"]>;
    /** Use this method to edit live location messages. A location can be edited until its live_period expires or editing is explicitly disabled by a call to stopMessageLiveLocation. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. */
    editMessageLiveLocation(params: MethodParameters["editMessageLiveLocation"]): Promise<MethodsLibReturnType["editMessageLiveLocation"]>;
    /** Use this method to stop updating a live location message before live_period expires. On success, if the message is not an inline message, the edited Message is returned, otherwise True is returned. */
    stopMessageLiveLocation(params: MethodParameters["stopMessageLiveLocation"]): Promise<MethodsLibReturnType["stopMessageLiveLocation"]>;
    /** Use this method to edit only the reply markup of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
    editMessageReplyMarkup(params: MethodParameters["editMessageReplyMarkup"]): Promise<MethodsLibReturnType["editMessageReplyMarkup"]>;
    /** Use this method to stop a poll which was sent by the bot. On success, the stopped Poll is returned. */
    stopPoll(params: MethodParameters["stopPoll"]): Promise<MethodsLibReturnType["stopPoll"]>;
    /** Use this method to send static .WEBP, animated .TGS, or video .WEBM stickers. On success, the sent Message is returned. */
    sendSticker(params: MethodParameters["sendSticker"]): Promise<MethodsLibReturnType["sendSticker"]>;
    /** Use this method to get a sticker set. On success, a StickerSet object is returned. */
    getStickerSet(name: string): Promise<MethodsLibReturnType["getStickerSet"]>;
    /** Use this method to get information about custom emoji stickers by their identifiers. Returns an Array of Sticker objects. */
    getCustomEmojiStickers(customEmojiIds: string[]): Promise<MethodsLibReturnType["getCustomEmojiStickers"]>;
    /** Use this method to upload a file with a sticker for later use in the createNewStickerSet and addStickerToSet methods (the file can be used multiple times). Returns the uploaded File on success. */
    uploadStickerFile(params: MethodParameters["uploadStickerFile"]): Promise<MethodsLibReturnType["uploadStickerFile"]>;
    /** Use this method to create a new sticker set owned by a user. The bot will be able to edit the sticker set thus created. Returns True on success. */
    createNewStickerSet(params: MethodParameters["createNewStickerSet"]): Promise<MethodsLibReturnType["createNewStickerSet"]>;
    /** Use this method to add a new sticker to a set created by the bot. The format of the added sticker must match the format of the other stickers in the set. Emoji sticker sets can have up to 200 stickers. Animated and video sticker sets can have up to 50 stickers. Static sticker sets can have up to 120 stickers. Returns True on success. */
    addStickerToSet(params: MethodParameters["addStickerToSet"]): Promise<MethodsLibReturnType["addStickerToSet"]>;
    /** Use this method to replace an existing sticker in a sticker set with a new one. The method is equivalent to calling deleteStickerFromSet, then addStickerToSet, then setStickerPositionInSet. Returns True on success. */
    replaceStickerInSet(params: MethodParameters["replaceStickerInSet"]): Promise<MethodsLibReturnType["replaceStickerInSet"]>;
    /** Use this method to move a sticker in a set created by the bot to a specific position. Returns True on success. */
    setStickerPositionInSet(sticker: string, position: number): Promise<MethodsLibReturnType["setStickerPositionInSet"]>;
    /** Use this method to delete a sticker from a set created by the bot. Returns True on success. */
    deleteStickerFromSet(sticker: string): Promise<MethodsLibReturnType["deleteStickerFromSet"]>;
    /** Use this method to change the list of emoji assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot. Returns True on success. */
    setStickerEmojiList(sticker: string, emojiList: string[]): Promise<MethodsLibReturnType["setStickerEmojiList"]>;
    /** Use this method to change search keywords assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot. Returns True on success. */
    setStickerKeywords(sticker: string, keywords?: string[]): Promise<MethodsLibReturnType["setStickerKeywords"]>;
    /** Use this method to change the mask position of a mask sticker. The sticker must belong to a sticker set that was created by the bot. Returns True on success. */
    setStickerMaskPosition(sticker: string, maskPosition?: MethodParameters["setStickerMaskPosition"]["maskPosition"]): Promise<MethodsLibReturnType["setStickerMaskPosition"]>;
    /** Use this method to set the title of a created sticker set. Returns True on success. */
    setStickerSetTitle(name: string, title: string): Promise<MethodsLibReturnType["setStickerSetTitle"]>;
    /** Use this method to set the thumbnail of a regular or mask sticker set. The format of the thumbnail file must match the format of the stickers in the set. Returns True on success. */
    setStickerSetThumbnail(params: MethodParameters["setStickerSetThumbnail"]): Promise<MethodsLibReturnType["setStickerSetThumbnail"]>;
    /** Use this method to set the thumbnail of a custom emoji sticker set. Returns True on success. */
    setCustomEmojiStickerSetThumbnail(name: string, customEmojiId?: string): Promise<MethodsLibReturnType["setCustomEmojiStickerSetThumbnail"]>;
    /** Use this method to delete a sticker set that was created by the bot. Returns True on success. */
    deleteStickerSet(name: string): Promise<MethodsLibReturnType["deleteStickerSet"]>;
    /** Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, True is returned.
  
    Alternatively, the user can be redirected to the specified Game URL. For this option to work, you must first create a game for your bot via @BotFather and accept the terms. Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter. */
    answerInlineQuery(params: MethodParameters["answerInlineQuery"]): Promise<MethodsLibReturnType["answerInlineQuery"]>;
    /** Use this method to set the result of an interaction with a Web App and send a corresponding message on behalf of the user to the chat from which the query originated. On success, a SentWebAppMessage object is returned. */
    answerWebAppQuery(webAppQueryId: string, result: MethodParameters["answerWebAppQuery"]["result"]): Promise<MethodsLibReturnType["answerWebAppQuery"]>;
    /** Use this method to send invoices. On success, the sent Message is returned. */
    sendInvoice(params: MethodParameters["sendInvoice"]): Promise<MethodsLibReturnType["sendInvoice"]>;
    /** Use this method to create a link for an invoice. Returns the created invoice link as String on success. */
    createInvoiceLink(params: MethodParameters["createInvoiceLink"]): Promise<MethodsLibReturnType["createInvoiceLink"]>;
    /** If you sent an invoice requesting a shipping address and the parameter is_flexible was specified, the Bot API will send an Update with a shipping_query field to the bot. Use this method to reply to shipping queries. On success, True is returned. */
    answerShippingQuery(params: MethodParameters["answerShippingQuery"]): Promise<MethodsLibReturnType["answerShippingQuery"]>;
    /** Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in the form of an Update with the field pre_checkout_query. Use this method to respond to such pre-checkout queries. On success, True is returned. Note: The Bot API must receive an answer within 10 seconds after the pre-checkout query was sent. */
    answerPreCheckoutQuery(params: MethodParameters["answerPreCheckoutQuery"]): Promise<MethodsLibReturnType["answerPreCheckoutQuery"]>;
    /** Returns the bot's Telegram Star transactions in chronological order. On success, returns a StarTransactions object. */
    getStarTransactions(offset?: number, limit?: number): Promise<MethodsLibReturnType["getStarTransactions"]>;
    /** Refunds a successful payment in Telegram Stars. Returns True on success */
    refundStarPayment(userId: number, telegramPaymentChargeId: string): Promise<MethodsLibReturnType["refundStarPayment"]>;
    /** Informs a user that some of the Telegram Passport elements they provided contains errors. The user will not be able to re-submit their Passport to you until the errors are fixed (the contents of the field for which you returned the error must change). Returns True on success.
  
    Use this if the data submitted by the user doesn't satisfy the standards your service requires for any reason. For example, if a birthday date seems invalid, a submitted document is blurry, a scan shows evidence of tampering, etc. Supply some details in the error message to make sure the user knows how to correct the issues. */
    setPassportDataErrors(userId: number, errors: MethodParameters["setPassportDataErrors"]["errors"]): Promise<MethodsLibReturnType["setPassportDataErrors"]>;
    /** Use this method to send a game. On success, the sent Message is returned. */
    sendGame(params: MethodParameters["sendGame"]): Promise<MethodsLibReturnType["sendGame"]>;
    /** Use this method to set the score of the specified user in a game message. On success, if the message is not an inline message, the Message is returned, otherwise True is returned. Returns an error, if the new score is not greater than the user's current score in the chat and force is False. */
    setGameScore(params: MethodParameters["setGameScore"]): Promise<MethodsLibReturnType["setGameScore"]>;
    /** Use this method to get data for high score tables. Will return the score of the specified user and several of their neighbors in a game. Returns an Array of GameHighScore objects.
  
    This method will currently return scores for the target user, plus two of their closest neighbors on each side. Will also return the top three users if the user and their neighbors are not among them. Please note that this behavior is subject to change. */
    getGameHighScores(params: MethodParameters["getGameHighScores"]): Promise<MethodsLibReturnType["getGameHighScores"]>;
    /** Use this method to delete a message, including service messages, with the following limitations:
    - A message can only be deleted if it was sent less than 48 hours ago.
    - Service messages about a supergroup, channel, or forum topic creation can't be deleted.
    - A dice message in a private chat can only be deleted if it was sent more than 24 hours ago.
    - Bots can delete outgoing messages in private chats, groups, and supergroups.
    - Bots can delete incoming messages in private chats.
    - Bots granted can_post_messages permissions can delete outgoing messages in channels.
    - If the bot is an administrator of a group, it can delete any message there.
    - If the bot has can_delete_messages permission in a supergroup or a channel, it can delete any message there.
    Returns True on success. */
    deleteMessage(chatId: number | string, messageId: number): Promise<MethodsLibReturnType["deleteMessage"]>;
    /** Use this method to delete multiple messages simultaneously. Returns True on success. */
    deleteMessages(chatId: number | string, messageIds: number[]): Promise<MethodsLibReturnType["deleteMessages"]>;
}
export { BaseClient, type EventHandlerParameters };
//# sourceMappingURL=BaseClient.d.ts.map