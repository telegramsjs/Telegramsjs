/// <reference types="node" />
import { Request } from "./request.js";
import { Message, Poll, Update, InlineQueryResult, InlineQueryResultsButton, BotCommand, ChatAdministratorRights, ChatFromGetChat, ChatInviteLink, ChatMember, ChatMemberAdministrator, ChatMemberOwner, ChatPermissions, File, ForumTopic, UserFromGetMe, UserProfilePhotos, WebhookInfo, ForceReply, InlineKeyboardMarkup, ReplyKeyboardMarkup, ReplyKeyboardRemove, MaskPosition, MessageEntity, MessageId, ParseMode, SentWebAppMessage, Sticker, StickerSet, PassportElementError, LabeledPrice, ShippingOption, BotCommandScope, BotDescription, BotName, BotShortDescription, MenuButton, InputMediaAudio, InputMediaDocument, InputMediaPhoto, InputMediaVideo, InputMedia, InputSticker } from "@telegram.ts/types";
export declare class BaseClient<F> extends Request {
    token: string;
    intents?: string[] | number[] | number | null;
    /**
     * Creat method Telegram Api
     * @param {string} token - The Telegram Bot API token.
     * @param {string[] | number[] | number | null} [intents=null] - The client intents.
     */
    constructor(token: string, intents?: string[] | number[] | number | null);
    getMe(): Promise<UserFromGetMe>;
    /** Use this method to remove webhook integration if you decide to switch back to getUpdates. Returns True on success. */
    deleteWebhook(params: {
        drop_pending_updates?: boolean;
    }): Promise<boolean>;
    /** Use this method to get current webhook status. Requires no parameters. On success, returns a WebhookInfo object. If the bot is using getUpdates, will return an object with the url field empty. */
    getWebhookInfo(): Promise<WebhookInfo>;
    sendMessage(params: {
        chat_id: number | string;
        message_thread_id?: number;
        text: string;
        parse_mode?: ParseMode;
        entities?: MessageEntity[];
        disable_web_page_preview?: boolean;
        disable_notification?: boolean;
        protect_content?: boolean;
        reply_to_message_id?: number;
        allow_sending_without_reply?: boolean;
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message.TextMessage>;
    /** Use this method to send photos. On success, the sent Message is returned. */
    sendPhoto(params: {
        chat_id: number | string;
        message_thread_id?: number;
        photo: F | string;
        caption?: string;
        parse_mode?: ParseMode;
        caption_entities?: MessageEntity[];
        has_spoiler?: boolean;
        disable_notification?: boolean;
        protect_content?: boolean;
        reply_to_message_id?: number;
        allow_sending_without_reply?: boolean;
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message.PhotoMessage>;
    /** Use this method to send audio files, if you want Telegram clients to display them in the music player. Your audio must be in the .MP3 or .M4A format. On success, the sent Message is returned. Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.
  
    For sending voice messages, use the sendVoice method instead. */
    sendAudio(params: {
        chat_id: number | string;
        message_thread_id?: number;
        audio: F | string;
        caption?: string;
        parse_mode?: ParseMode;
        caption_entities?: MessageEntity[];
        duration?: number;
        performer?: string;
        title?: string;
        thumbnail?: F;
        disable_notification?: boolean;
        protect_content?: boolean;
        reply_to_message_id?: number;
        allow_sending_without_reply?: boolean;
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message.AudioMessage>;
    /** Use this method to send general files. On success, the sent Message is returned. Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future. */
    sendDocument(params: {
        chat_id: number | string;
        message_thread_id?: number;
        document: F | string;
        thumbnail?: F;
        caption?: string;
        parse_mode?: ParseMode;
        caption_entities?: MessageEntity[];
        disable_content_type_detection?: boolean;
        disable_notification?: boolean;
        protect_content?: boolean;
        reply_to_message_id?: number;
        allow_sending_without_reply?: boolean;
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message.DocumentMessage>;
    /** Use this method to send video files, Telegram clients support MPEG4 videos (other formats may be sent as Document). On success, the sent Message is returned. Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future. */
    sendVideo(params: {
        chat_id: number | string;
        message_thread_id?: number;
        video: F | string;
        duration?: number;
        width?: number;
        height?: number;
        thumbnail?: F;
        caption?: string;
        parse_mode?: ParseMode;
        caption_entities?: MessageEntity[];
        has_spoiler?: boolean;
        supports_streaming?: boolean;
        disable_notification?: boolean;
        protect_content?: boolean;
        reply_to_message_id?: number;
        allow_sending_without_reply?: boolean;
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message.VideoMessage>;
    /** Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound). On success, the sent Message is returned. Bots can currently send animation files of up to 50 MB in size, this limit may be changed in the future. */
    sendAnimation(params: {
        chat_id: number | string;
        message_thread_id?: number;
        animation: F | string;
        duration?: number;
        width?: number;
        height?: number;
        thumbnail?: F;
        caption?: string;
        parse_mode?: ParseMode;
        caption_entities?: MessageEntity[];
        has_spoiler?: boolean;
        disable_notification?: boolean;
        protect_content?: boolean;
        reply_to_message_id?: number;
        allow_sending_without_reply?: boolean;
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message.AnimationMessage>;
    /** Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .OGG file encoded with OPUS (other formats may be sent as Audio or Document). On success, the sent Message is returned. Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future. */
    sendVoice(params: {
        chat_id: number | string;
        message_thread_id?: number;
        voice: F | string;
        caption?: string;
        parse_mode?: ParseMode;
        caption_entities?: MessageEntity[];
        duration?: number;
        disable_notification?: boolean;
        protect_content?: boolean;
        reply_to_message_id?: number;
        allow_sending_without_reply?: boolean;
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message.VoiceMessage>;
    /** Use this method to send video messages. On success, the sent Message is returned.
    As of v.4.0, Telegram clients support rounded square MPEG4 videos of up to 1 minute long. */ /** Use this method to send video messages. On success, the sent Message is returned.
    As of v.4.0, Telegram clients support rounded square MPEG4 videos of up to 1 minute long. */
    sendVideoNote(params: {
        chat_id: number | string;
        message_thread_id?: number;
        video_note: F | string;
        duration?: number;
        length?: number;
        thumbnail?: F;
        disable_notification?: boolean;
        protect_content?: boolean;
        reply_to_message_id?: number;
        allow_sending_without_reply?: boolean;
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message.VideoNoteMessage>;
    /** Use this method to send a group of photos, videos, documents or audios as an album. Documents and audio files can be only grouped in an album with messages of the same type. On success, an array of Messages that were sent is returned. */
    sendMediaGroup(params: {
        chat_id: number | string;
        message_thread_id?: number;
        media: ReadonlyArray<InputMediaAudio<F> | InputMediaDocument<F> | InputMediaPhoto<F> | InputMediaVideo<F>>;
        disable_notification?: boolean;
        protect_content?: boolean;
        reply_to_message_id?: number;
        allow_sending_without_reply?: boolean;
    }): Promise<Array<Message.AudioMessage | Message.DocumentMessage | Message.PhotoMessage | Message.VideoMessage>>;
    /** Use this method to send point on the map. On success, the sent Message is returned. */
    sendLocation(params: {
        chat_id: number | string;
        message_thread_id?: number;
        latitude: number;
        longitude: number;
        horizontal_accuracy?: number;
        live_period?: number;
        heading?: number;
        proximity_alert_radius?: number;
        disable_notification?: boolean;
        protect_content?: boolean;
        reply_to_message_id?: number;
        allow_sending_without_reply?: boolean;
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message.LocationMessage>;
    /** Use this method to send information about a venue. On success, the sent Message is returned. */
    sendVenue(params: {
        chat_id: number | string;
        message_thread_id?: number;
        latitude: number;
        longitude: number;
        title: string;
        address: string;
        foursquare_id?: string;
        foursquare_type?: string;
        google_place_id?: string;
        google_place_type?: string;
        disable_notification?: boolean;
        protect_content?: boolean;
        reply_to_message_id?: number;
        allow_sending_without_reply?: boolean;
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message.VenueMessage>;
    /** Use this method to forward messages of any kind. Service messages can't be forwarded. On success, the sent Message is returned. */
    forwardMessage(params: {
        chat_id: number | string;
        message_thread_id?: number;
        from_chat_id: number | string;
        disable_notification?: boolean;
        protect_content?: boolean;
        message_id: number;
    }): Promise<Message>;
    /** Use this method to copy messages of any kind. Service messages and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correct_option_id is known to the bot. The method is analogous to the method forwardMessage, but the copied message doesn't have a link to the original message. Returns the MessageId of the sent message on success. */
    copyMessage(params: {
        chat_id: number | string;
        message_thread_id?: number;
        from_chat_id: number | string;
        message_id: number;
        caption?: string;
        parse_mode?: string;
        caption_entities?: MessageEntity[];
        disable_notification?: boolean;
        protect_content?: boolean;
        reply_to_message_id?: number;
        allow_sending_without_reply?: boolean;
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<MessageId>;
    /** Use this method to send phone contacts. On success, the sent Message is returned. */
    sendContact(params: {
        chat_id: number | string;
        message_thread_id?: number;
        phone_number: string;
        first_name: string;
        last_name?: string;
        vcard?: string;
        disable_notification?: boolean;
        protect_content?: boolean;
        reply_to_message_id?: number;
        allow_sending_without_reply?: boolean;
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message.ContactMessage>;
    /** Use this method to send a native poll. On success, the sent Message is returned. */
    sendPoll(params: {
        chat_id: number | string;
        message_thread_id?: number;
        question: string;
        options: readonly string[];
        is_anonymous?: boolean;
        type?: "quiz" | "regular";
        allows_multiple_answers?: boolean;
        correct_option_id?: number;
        explanation?: string;
        explanation_parse_mode?: ParseMode;
        explanation_entities?: MessageEntity[];
        open_period?: number;
        close_date?: number;
        is_closed?: boolean;
        disable_notification?: boolean;
        protect_content?: boolean;
        reply_to_message_id?: number;
        allow_sending_without_reply?: boolean;
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message.PollMessage>;
    /** Use this method to send an animated emoji that will display a random value. On success, the sent Message is returned. */
    sendDice(params: {
        chat_id: number | string;
        message_thread_id?: number;
        emoji?: string;
        disable_notification?: boolean;
        protect_content?: boolean;
        reply_to_message_id?: number;
        allow_sending_without_reply?: boolean;
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message.DiceMessage>;
    /** Use this method when you need to tell the user that something is happening on the bot's side. The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status). Returns True on success.
  
    Example: The ImageBot needs some time to process a request and upload the image. Instead of sending a text message along the lines of "Retrieving image, please wait...", the bot may use sendChatAction with action = upload_photo. The user will see a "sending photo" status for the bot.
  
    We only recommend using this method when a response from the bot will take a noticeable amount of time to arrive. */
    sendChatAction(params: {
        chat_id: number | string;
        action: "typing" | "upload_photo" | "record_video" | "upload_video" | "record_voice" | "upload_voice" | "upload_document" | "choose_sticker" | "find_location" | "record_video_note" | "upload_video_note";
        message_thread_id?: number;
    }): Promise<boolean>;
    /** Use this method to get a list of profile pictures for a user. Returns a UserProfilePhotos object. */
    getUserProfilePhotos(params: {
        user_id: number;
        offset?: number;
        limit?: number;
    }): Promise<UserProfilePhotos>;
    /** Use this method to get basic information about a file and prepare it for downloading. For the moment, bots can download files of up to 20MB in size. On success, a File object is returned. The file can then be downloaded via the link https://api.telegram.org/file/bot<token>/<file_path>, where <file_path> is taken from the response. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling getFile again.
  
    Note: This function may not preserve the original file name and MIME type. You should save the file's MIME type and name (if available) when the File object is received. */
    getFile(file_id: string): Promise<File>;
    downloadFile(filePath: string): Promise<Buffer>;
    /** Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
    banChatMember(params: {
        chat_id: number | string;
        user_id: number;
        until_date?: number;
        revoke_messages?: boolean;
    }): Promise<boolean>;
    /** Use this method to unban a previously banned user in a supergroup or channel. The user will not return to the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator for this to work. By default, this method guarantees that after the call the user is not a member of the chat, but will be able to join it. So if the user is a member of the chat they will also be removed from the chat. If you don't want this, use the parameter only_if_banned. Returns True on success. */
    unbanChatMember(params: {
        chat_id: number | string;
        user_id: number;
        only_if_banned?: boolean;
    }): Promise<boolean>;
    /** Use this method to restrict a user in a supergroup. The bot must be an administrator in the supergroup for this to work and must have the appropriate administrator rights. Pass True for all permissions to lift restrictions from a user. Returns True on success. */
    restrictChatMember(params: {
        chat_id: number | string;
        user_id: number;
        permissions: ChatPermissions;
        use_independent_chat_permissions?: boolean;
        until_date?: number;
    }): Promise<boolean>;
    /** Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Pass False for all boolean parameters to demote a user. Returns True on success. */
    promoteChatMember(params: {
        chat_id: number | string;
        user_id: number;
        is_anonymous?: boolean;
        can_manage_chat?: boolean;
        can_post_messages?: boolean;
        can_edit_messages?: boolean;
        can_delete_messages?: boolean;
        can_manage_video_chats?: boolean;
        can_restrict_members?: boolean;
        can_promote_members?: boolean;
        can_change_info?: boolean;
        can_invite_users?: boolean;
        can_pin_messages?: boolean;
        can_manage_topics?: boolean;
    }): Promise<boolean>;
    /** Use this method to set a custom title for an administrator in a supergroup promoted by the bot. Returns True on success. */
    setChatAdministratorCustomTitle(params: {
        chat_id: number | string;
        user_id: number;
        custom_title: string;
    }): Promise<boolean>;
    /** Use this method to ban a channel chat in a supergroup or a channel. Until the chat is unbanned, the owner of the banned chat won't be able to send messages on behalf of any of their channels. The bot must be an administrator in the supergroup or channel for this to work and must have the appropriate administrator rights. Returns True on success. */
    banChatSenderChat(params: {
        chat_id: number | string;
        sender_chat_id: number;
    }): Promise<boolean>;
    /** Use this method to unban a previously banned channel chat in a supergroup or channel. The bot must be an administrator for this to work and must have the appropriate administrator rights. Returns True on success. */
    unbanChatSenderChat(params: {
        chat_id: number | string;
        sender_chat_id: number;
    }): Promise<boolean>;
    /** Use this method to set default chat permissions for all members. The bot must be an administrator in the group or a supergroup for this to work and must have the can_restrict_members administrator rights. Returns True on success. */
    setChatPermissions(params: {
        chat_id: number | string;
        permissions: ChatPermissions;
        use_independent_chat_permissions?: boolean;
    }): Promise<boolean>;
    /** Use this method to generate a new primary invite link for a chat; any previously generated primary link is revoked. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the new invite link as String on success.
  
    Note: Each administrator in a chat generates their own invite links. Bots can't use invite links generated by other administrators. If you want your bot to work with invite links, it will need to generate its own link using exportChatInviteLink or by calling the getChat method. If your bot needs to generate a new primary invite link replacing its previous one, use exportChatInviteLink again. */
    exportChatInviteLink(chatId?: number | string): Promise<string>;
    /** Use this method to create an additional invite link for a chat. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. The link can be revoked using the method revokeChatInviteLink. Returns the new invite link as ChatInviteLink object. */
    createChatInviteLink(params: {
        chat_id: number | string;
        name?: string;
        expire_date?: number;
        member_limit?: number;
        creates_join_request?: boolean;
    }): Promise<ChatInviteLink>;
    /** Use this method to edit a non-primary invite link created by the bot. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the edited invite link as a ChatInviteLink object. */
    editChatInviteLink(params: {
        chat_id: number | string;
        invite_link: string;
        name?: string;
        expire_date?: number;
        member_limit?: number;
        creates_join_request?: boolean;
    }): Promise<ChatInviteLink>;
    /** Use this method to revoke an invite link created by the bot. If the primary link is revoked, a new link is automatically generated. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the revoked invite link as ChatInviteLink object. */
    revokeChatInviteLink(params: {
        invite_link: string;
        chat_id?: number | string;
    }): Promise<ChatInviteLink>;
    /** Use this method to approve a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success. */
    approveChatJoinRequest(params: {
        user_id: number;
        chat_id?: number | string;
    }): Promise<boolean>;
    /** Use this method to decline a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success. */
    declineChatJoinRequest(params: {
        chat_id: number | string;
        user_id: number;
    }): Promise<boolean>;
    /** Use this method to set a new profile photo for the chat. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
    setChatPhoto(params: {
        chat_id: number | string;
        photo: F;
    }): Promise<boolean>;
    /** Use this method to delete a chat photo. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
    deleteChatPhoto(chatId: number | string): Promise<boolean>;
    /** Use this method to change the title of a chat. Titles can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
    setChatTitle(params: {
        chat_id: number | string;
        title: string;
    }): Promise<boolean>;
    /** Use this method to change the description of a group, a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
    setChatDescription(params: {
        chat_id: number;
        description?: string;
    }): Promise<boolean>;
    /** Use this method to add a message to the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel. Returns True on success. */
    pinChatMessage(params: {
        chat_id: number | string;
        message_id: number;
        disable_notification?: boolean;
    }): Promise<boolean>;
    /** Use this method to remove a message from the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel. Returns True on success. */
    unpinChatMessage(params: {
        chat_id: number | string;
        message_id?: number;
    }): Promise<boolean>;
    /** Use this method to clear the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel. Returns True on success. */
    unpinAllChatMessages(chatId: number | string): Promise<boolean>;
    /** Use this method for your bot to leave a group, supergroup or channel. Returns True on success. */
    leaveChat(chatId: number | string): Promise<boolean>;
    /** Use this method to get up to date information about the chat (current name of the user for one-on-one conversations, current username of a user, group or channel, etc.). Returns a Chat object on success. */
    getChat(chatId: number | string): Promise<ChatFromGetChat>;
    /** Use this method to get a list of administrators in a chat, which aren't bots. Returns an Array of ChatMember objects. */
    getChatAdministrators(chatId: number | string): Promise<Array<ChatMemberOwner | ChatMemberAdministrator>>;
    /** Use this method to get the number of members in a chat. Returns Int on success. */
    getChatMemberCount(chatId: number | string): Promise<number>;
    /** Use this method to get information about a member of a chat. The method is only guaranteed to work for other users if the bot is an administrator in the chat. Returns a ChatMember object on success. */
    getChatMember(params: {
        chat_id: number | string;
        user_id: number;
    }): Promise<ChatMember>;
    /** Use this method to set a new group sticker set for a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set ly returned in getChat requests to check if the bot can use this method. Returns True on success. */
    setChatStickerSet(params: {
        chat_id?: number | string;
        sticker_set_name: string;
    }): Promise<boolean>;
    /** Use this method to delete a group sticker set from a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set ly returned in getChat requests to check if the bot can use this method. Returns True on success. */
    deleteChatStickerSet(chatId?: number | string): Promise<boolean>;
    /** Use this method to get custom emoji stickers, which can be used as a forum topic icon by any user. Requires no parameters. Returns an Array of Sticker objects. */
    getForumTopicIconStickers(): Promise<Sticker[]>;
    /** Use this method to create a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns information about the created topic as a ForumTopic object. */
    createForumTopic(params: {
        chat_id: number | string;
        name: string;
        icon_color?: 0x6fb9f0 | 0xffd67e | 0xcb86db | 0x8eee98 | 0xff93b2 | 0xfb6f5f;
        icon_custom_emoji_id?: string;
    }): Promise<ForumTopic>;
    /** Use this method to edit name and icon of a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success. */
    editForumTopic(params: {
        chat_id: number | string;
        message_thread_id: number;
        name?: string;
        icon_custom_emoji_id?: string;
    }): Promise<boolean>;
    /** Use this method to close an open topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success. */
    closeForumTopic(params: {
        chat_id: number | string;
        message_thread_id: number;
    }): Promise<boolean>;
    /** Use this method to reopen a closed topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success. */
    reopenForumTopic(params: {
        chat_id: number | string;
        message_thread_id: number;
    }): Promise<boolean>;
    /** Use this method to delete a forum topic along with all its messages in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_delete_messages administrator rights. Returns True on success. */
    deleteForumTopic(params: {
        chat_id: number | string;
        message_thread_id: number;
    }): Promise<boolean>;
    /** Use this method to clear the list of pinned messages in a forum topic. The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup. Returns True on success. */
    unpinAllForumTopicMessages(params: {
        chat_id: number | string;
        message_thread_id: number;
    }): Promise<boolean>;
    /** Use this method to edit the name of the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have can_manage_topics administrator rights. Returns True on success. */
    editGeneralForumTopic(params: {
        chat_id: number | string;
        name: string;
    }): Promise<boolean>;
    /** Use this method to close an open 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns True on success. */
    closeGeneralForumTopic(chatId: number | string): Promise<boolean>;
    /** Use this method to reopen a closed 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically unhidden if it was hidden. Returns True on success. */
    reopenGeneralForumTopic(chatId: number | string): Promise<boolean>;
    /** Use this method to hide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically closed if it was open. Returns True on success. */
    hideGeneralForumTopic(chatId: number | string): Promise<boolean>;
    /** Use this method to unhide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns True on success. */
    unhideGeneralForumTopic(chatId: string | number): Promise<boolean>;
    /** Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, True is returned.
  
    Alternatively, the user can be redirected to the specified Game URL. For this option to work, you must first create a game for your bot via @BotFather and accept the terms. Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter. */
    answerCallbackQuery(params: {
        callback_query_id: string;
        text?: string;
        show_alert?: boolean;
        url?: string;
        cache_time?: number;
    }): Promise<boolean>;
    /** Use this method to change the list of the bot's commands. See https://core.telegram.org/bots#commands for more details about bot commands. Returns True on success. */
    setMyCommands(params: {
        commands: readonly BotCommand[];
        scope?: BotCommandScope;
        language_code?: string;
    }): Promise<boolean>;
    /** Use this method to delete the list of the bot's commands for the given scope and user language. After deletion, higher level commands will be shown to affected users. Returns True on success. */
    deleteMyCommands(params?: {
        scope?: string;
        language_code?: string;
    }): Promise<boolean>;
    /** Use this method to get the current list of the bot's commands for the given scope and user language. Returns an Array of BotCommand objects. If commands aren't set, an empty list is returned. */
    getMyCommands(params?: {
        scope?: BotCommandScope;
        language_code?: string;
    }): Promise<BotCommand[]>;
    /** Use this method to change the bot's name. Returns True on success. */
    setMyName(params: {
        name?: string;
        language_code?: string;
    }): Promise<boolean>;
    /** Use this method to get the current bot name for the given user language. Returns BotName on success. */
    getMyName(languageCode?: string): Promise<BotName>;
    /** Use this method to change the bot's description, which is shown in the chat with the bot if the chat is empty. Returns True on success. */
    setMyDescription(params: {
        description?: string;
        language_code?: string;
    }): Promise<boolean>;
    /** Use this method to get the current bot description for the given user language. Returns BotDescription on success. */
    getMyDescription(languageCode?: string): Promise<BotDescription>;
    /** Use this method to change the bot's short description, which is shown on the bot's profile page and is sent together with the link when users share the bot. Returns True on success. */
    setMyShortDescription(params: {
        short_description?: string;
        language_code?: string;
    }): Promise<boolean>;
    /** Use this method to get the current bot short description for the given user language. Returns BotShortDescription on success. */
    getMyShortDescription(languageCode?: string): Promise<BotShortDescription>;
    /** Use this method to change the bot's menu button in a private chat, or the default menu button. Returns True on success. */
    setChatMenuButton(params: {
        chat_id?: number;
        menu_button?: MenuButton;
    }): Promise<boolean>;
    /** Use this method to get the current value of the bot's menu button in a private chat, or the default menu button. Returns MenuButton on success. */
    getChatMenuButton(chatId?: number | string): Promise<MenuButton>;
    /** Use this method to change the default administrator rights requested by the bot when it's added as an administrator to groups or channels. These rights will be suggested to users, but they are free to modify the list before adding the bot. Returns True on success. */
    setMyDefaultAdministratorRights(params: {
        rights?: ChatAdministratorRights;
        for_channels?: boolean;
    }): Promise<boolean>;
    /** Use this method to get the current default administrator rights of the bot. Returns ChatAdministratorRights on success. */
    getMyDefaultAdministratorRights(forChannels: boolean): Promise<ChatAdministratorRights>;
    /** Use this method to edit text and game messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. */
    editMessageText(params: {
        chat_id?: number | string;
        message_id?: number;
        inline_message_id?: string;
        text: string;
        parse_mode?: ParseMode;
        entities?: MessageEntity[];
        disable_web_page_preview?: boolean;
        reply_markup?: InlineKeyboardMarkup;
    }): Promise<(Update.Edited & Message.TextMessage) | boolean>;
    /** Use this method to edit captions of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. */
    editMessageCaption(params: {
        chat_id?: number | string;
        message_id?: number;
        inline_message_id?: string;
        caption?: string;
        parse_mode?: ParseMode;
        caption_entities?: MessageEntity[];
        reply_markup?: InlineKeyboardMarkup;
    }): Promise<(Update.Edited & Message.CaptionableMessage) | boolean>;
    /** Use this method to edit animation, audio, document, photo, or video messages. If a message is part of a message album, then it can be edited only to an audio for audio albums, only to a document for document albums and to a photo or a video otherwise. When an inline message is edited, a new file can't be uploaded; use a previously uploaded file via its file_id or specify a URL. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. */
    editMessageMedia(params: {
        chat_id?: number | string;
        message_id?: number;
        inline_message_id?: string;
        media: InputMedia<F>;
        reply_markup?: InlineKeyboardMarkup;
    }): Promise<(Update.Edited & Message) | boolean>;
    /** Use this method to edit live location messages. A location can be edited until its live_period expires or editing is explicitly disabled by a call to stopMessageLiveLocation. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. */
    editMessageLiveLocation(params: {
        chat_id?: number | string;
        message_id?: number;
        inline_message_id?: string;
        reply_markup?: InlineKeyboardMarkup;
    }): Promise<(Update.Edited & Message) | boolean>;
    /** Use this method to stop updating a live location message before live_period expires. On success, if the message is not an inline message, the edited Message is returned, otherwise True is returned. */
    stopMessageLiveLocation(params: {
        chat_id?: number | string;
        message_id?: number;
        inline_message_id?: string;
        latitude: number;
        longitude: number;
        horizontal_accuracy?: number;
        heading?: number;
        proximity_alert_radius?: number;
        reply_markup?: InlineKeyboardMarkup;
    }): Promise<(Update.Edited & Message.LocationMessage) | boolean>;
    /** Use this method to edit only the reply markup of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. */
    editMessageReplyMarkup(params: {
        chat_id?: number | string;
        message_id?: number;
        inline_message_id?: string;
        reply_markup?: InlineKeyboardMarkup;
    }): Promise<(Update.Edited & Message) | boolean>;
    /** Use this method to stop a poll which was sent by the bot. On success, the stopped Poll is returned. */
    stopPoll(params: {
        chat_id: number | string;
        message_id: number;
        reply_markup?: InlineKeyboardMarkup;
    }): Promise<Poll>;
    /** Use this method to send static .WEBP, animated .TGS, or video .WEBM stickers. On success, the sent Message is returned. */
    sendSticker(params: {
        chat_id: number | string;
        message_thread_id?: number;
        sticker: F | string;
        emoji?: string;
        disable_notification?: boolean;
        protect_content?: boolean;
        reply_to_message_id?: number;
        allow_sending_without_reply?: boolean;
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message.StickerMessage>;
    /** Use this method to get a sticker set. On success, a StickerSet object is returned. */
    getStickerSet(name: string): Promise<StickerSet>;
    /** Use this method to get information about custom emoji stickers by their identifiers. Returns an Array of Sticker objects. */
    getCustomEmojiStickers(customEmojiIds: string[]): Promise<Sticker[]>;
    /** Use this method to upload a file with a sticker for later use in the createNewStickerSet and addStickerToSet methods (the file can be used multiple times). Returns the uploaded File on success. */
    uploadStickerFile(params: {
        user_id: number;
        sticker_format: "static" | "animated" | "video";
        sticker: F;
    }): Promise<File>;
    /** Use this method to create a new sticker set owned by a user. The bot will be able to edit the sticker set thus created. Returns True on success. */
    createNewStickerSet(params: {
        user_id: number;
        name: string;
        title: string;
        stickers: InputSticker<F>[];
        sticker_format: "static" | "animated" | "video";
        sticker_type?: "regular" | "mask" | "custom_emoji";
        needs_repainting?: boolean;
    }): Promise<boolean>;
    /** Use this method to add a new sticker to a set created by the bot. The format of the added sticker must match the format of the other stickers in the set. Emoji sticker sets can have up to 200 stickers. Animated and video sticker sets can have up to 50 stickers. Static sticker sets can have up to 120 stickers. Returns True on success. */
    addStickerToSet(params: {
        user_id: number;
        name: string;
        sticker: InputSticker<F>;
    }): Promise<boolean>;
    /** Use this method to move a sticker in a set created by the bot to a specific position. Returns True on success. */
    setStickerPositionInSet(params: {
        sticker: string;
        position: number;
    }): Promise<boolean>;
    /** Use this method to delete a sticker from a set created by the bot. Returns True on success. */
    deleteStickerFromSet(sticker: string): Promise<boolean>;
    /** Use this method to change the list of emoji assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot. Returns True on success. */
    setStickerEmoji(params: {
        sticker: string;
        emoji_list: string[];
    }): Promise<boolean>;
    /** Use this method to change search keywords assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot. Returns True on success. */
    setStickerKeywords(params: {
        sticker: string;
        keywords?: string[];
    }): Promise<boolean>;
    /** Use this method to change the mask position of a mask sticker. The sticker must belong to a sticker set that was created by the bot. Returns True on success. */
    setStickerMaskPosition(params: {
        sticker: string;
        mask_position?: MaskPosition;
    }): Promise<boolean>;
    /** Use this method to set the title of a created sticker set. Returns True on success. */
    setStickerSetTitle(params: {
        name: string;
        title: string;
    }): Promise<boolean>;
    /** Use this method to set the thumbnail of a regular or mask sticker set. The format of the thumbnail file must match the format of the stickers in the set. Returns True on success. */
    setStickerSetThumbnail(params: {
        name: string;
        user_id: number;
        thumbnail?: F | string;
    }): Promise<boolean>;
    /** Use this method to set the thumbnail of a custom emoji sticker set. Returns True on success. */
    setCustomEmojiStickerSetThumbnail(params: {
        name: string;
        custom_emoji_id?: string;
    }): Promise<boolean>;
    /** Use this method to delete a sticker set that was created by the bot. Returns True on success. */
    deleteStickerSet(name: string): Promise<boolean>;
    /** Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, True is returned.
  
    Alternatively, the user can be redirected to the specified Game URL. For this option to work, you must first create a game for your bot via @BotFather and accept the terms. Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter. */
    answerInlineQuery(params: {
        inline_query_id: string;
        results: readonly InlineQueryResult[];
        cache_time?: number;
        is_personal?: boolean;
        next_offset?: string;
        button?: InlineQueryResultsButton;
    }): Promise<boolean>;
    /** Use this method to set the result of an interaction with a Web App and send a corresponding message on behalf of the user to the chat from which the query originated. On success, a SentWebAppMessage object is returned. */
    answerWebAppQuery(params: {
        web_app_query_id: string;
        result: InlineQueryResult;
    }): Promise<SentWebAppMessage>;
    /** Use this method to send invoices. On success, the sent Message is returned. */
    sendInvoice(params: {
        chat_id: number | string;
        message_thread_id?: number;
        title: string;
        description: string;
        payload: string;
        provider_token: string;
        currency: string;
        prices: readonly LabeledPrice[];
        max_tip_amount?: number;
        suggested_tip_amounts?: number[];
        start_parameter?: string;
        provider_data?: string;
        photo_url?: string;
        photo_size?: number;
        photo_width?: number;
        photo_height?: number;
        need_name?: boolean;
        need_phone_number?: boolean;
        need_email?: boolean;
        need_shipping_address?: boolean;
        send_phone_number_to_provider?: boolean;
        send_email_to_provider?: boolean;
        is_flexible?: boolean;
        disable_notification?: boolean;
        protect_content?: boolean;
        reply_to_message_id?: number;
        allow_sending_without_reply?: boolean;
        reply_markup?: InlineKeyboardMarkup;
    }): Promise<Message.InvoiceMessage>;
    /** Use this method to create a link for an invoice. Returns the created invoice link as String on success. */
    createInvoiceLink(params: {
        title: string;
        description: string;
        payload: string;
        provider_token: string;
        currency: string;
        prices: LabeledPrice[];
        max_tip_amount?: number;
        suggested_tip_amounts?: number[];
        provider_data?: string;
        photo_url?: string;
        photo_size?: number;
        photo_width?: number;
        photo_height?: number;
        need_name?: boolean;
        need_phone_number?: boolean;
        need_email?: boolean;
        need_shipping_address?: boolean;
        send_phone_number_to_provider?: boolean;
        send_email_to_provider?: boolean;
        is_flexible?: boolean;
    }): Promise<string>;
    /** If you sent an invoice requesting a shipping address and the parameter is_flexible was specified, the Bot API will send an Update with a shipping_query field to the bot. Use this method to reply to shipping queries. On success, True is returned. */
    answerShippingQuery(params: {
        shipping_query_id: string;
        ok: boolean;
        shipping_options?: readonly ShippingOption[];
        error_message?: string;
    }): Promise<boolean>;
    /** Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in the form of an Update with the field pre_checkout_query. Use this method to respond to such pre-checkout queries. On success, True is returned. Note: The Bot API must receive an answer within 10 seconds after the pre-checkout query was sent. */
    answerPreCheckoutQuery(params: {
        pre_checkout_query_id: string;
        ok: boolean;
        error_message?: string;
    }): Promise<boolean>;
    /** Informs a user that some of the Telegram Passport elements they provided contains errors. The user will not be able to re-submit their Passport to you until the errors are fixed (the contents of the field for which you returned the error must change). Returns True on success.
  
    Use this if the data submitted by the user doesn't satisfy the standards your service requires for any reason. For example, if a birthday date seems invalid, a submitted document is blurry, a scan shows evidence of tampering, etc. Supply some details in the error message to make sure the user knows how to correct the issues. */
    setPassportDataErrors(params: {
        user_id: number;
        errors: readonly PassportElementError[];
    }): Promise<boolean>;
    /** Use this method to send a game. On success, the sent Message is returned. */
    sendGame(params: {
        chat_id: number;
        message_thread_id?: number;
        game_short_name: string;
        disable_notification?: boolean;
        protect_content?: boolean;
        reply_to_message_id?: number;
        allow_sending_without_reply?: boolean;
        reply_markup?: InlineKeyboardMarkup;
    }): Promise<Message.GameMessage>;
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
    deleteMessage(params: {
        chat_id: number | string;
        message_id: number;
    }): Promise<boolean>;
}
//# sourceMappingURL=BaseClient.d.ts.map