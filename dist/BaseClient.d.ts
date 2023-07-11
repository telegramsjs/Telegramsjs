/// <reference types="node" />
import { Request } from "./request.js";
import { Message, Poll, Update, InlineQueryResult, InlineQueryResultsButton, BotCommand, ChatAdministratorRights, ChatFromGetChat, ChatInviteLink, ChatMember, ChatMemberAdministrator, ChatMemberOwner, ChatPermissions, File, ForumTopic, UserFromGetMe, UserProfilePhotos, WebhookInfo, ForceReply, InlineKeyboardMarkup, ReplyKeyboardMarkup, ReplyKeyboardRemove, MaskPosition, MessageEntity, MessageId, ParseMode, SentWebAppMessage, Sticker, StickerSet, PassportElementError, LabeledPrice, ShippingOption, BotCommandScope, BotDescription, BotShortDescription, MenuButton, InputMediaAudio, InputMediaDocument, InputMediaPhoto, InputMediaVideo, InputMedia, InputSticker } from "@telegram.ts/types";
export declare class BaseClient<F> extends Request {
    token: string;
    intents?: string[] | number[] | null | undefined;
    /**
     * Creat method Telegram Api
     * @param {string} token - The Telegram Bot API token.
     * @param {string | array | number} [intents] - The client intents.
     * @param {string} [parseMode] - The parse mode for message formatting.
     * @param {string | number} [chatId] - The default chat ID for sending messages.
     * @param {string} [queryString] - The default query string for API requests.
     * @param {string | object} [offSetType] - The type of offset to use for updates.
     * @param {string} [options.parseMode] - The parse mode for message formatting.
     */
    constructor(token: string, intents?: readonly string[] | number[] | null);
    getMe(): Promise<UserFromGetMe>;
    deleteWebhook(params: {
        drop_pending_updates?: boolean;
    }): Promise<boolean>;
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
    sendMediaGroup(params: {
        chat_id: number | string;
        message_thread_id?: number;
        media: ReadonlyArray<InputMediaAudio<F> | InputMediaDocument<F> | InputMediaPhoto<F> | InputMediaVideo<F>>;
        disable_notification?: boolean;
        protect_content?: boolean;
        reply_to_message_id?: number;
        allow_sending_without_reply?: boolean;
    }): Promise<Array<Message.AudioMessage | Message.DocumentMessage | Message.PhotoMessage | Message.VideoMessage>>;
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
    forwardMessage(params: {
        chat_id: number | string;
        message_thread_id?: number;
        from_chat_id: number | string;
        disable_notification?: boolean;
        protect_content?: boolean;
        message_id: number;
    }): Promise<Message>;
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
    sendChatAction(params: {
        chat_id: number | string;
        action: "typing" | "upload_photo" | "record_video" | "upload_video" | "record_voice" | "upload_voice" | "upload_document" | "choose_sticker" | "find_location" | "record_video_note" | "upload_video_note";
        message_thread_id?: number;
    }): Promise<boolean>;
    getUserProfilePhotos(params: {
        user_id: number;
        offset?: number;
        limit?: number;
    }): Promise<UserProfilePhotos>;
    getFile(file_id: string): Promise<File>;
    downloadFile(filePath: string): Promise<Buffer>;
    banChatMember(params: {
        chat_id: number | string;
        user_id: number;
        until_date?: number;
        revoke_messages?: boolean;
    }): Promise<boolean>;
    unbanChatMember(params: {
        chat_id: number | string;
        user_id: number;
        only_if_banned?: boolean;
    }): Promise<boolean>;
    restrictChatMember(params: {
        chat_id: number | string;
        user_id: number;
        permissions: ChatPermissions;
        use_independent_chat_permissions?: boolean;
        until_date?: number;
    }): Promise<boolean>;
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
    setChatAdministratorCustomTitle(params: {
        chat_id: number | string;
        user_id: number;
        custom_title: string;
    }): Promise<boolean>;
    banChatSenderChat(params: {
        chat_id: number | string;
        sender_chat_id: number;
    }): Promise<boolean>;
    unbanChatSenderChat(params: {
        chat_id: number | string;
        sender_chat_id: number;
    }): Promise<boolean>;
    setChatPermissions(params: {
        chat_id: number | string;
        permissions: ChatPermissions;
        use_independent_chat_permissions?: boolean;
    }): Promise<boolean>;
    exportChatInviteLink(chatId?: number | string): Promise<string>;
    createChatInviteLink(params: {
        chat_id: number | string;
        name?: string;
        expire_date?: number;
        member_limit?: number;
        creates_join_request?: boolean;
    }): Promise<ChatInviteLink>;
    editChatInviteLink(params: {
        chat_id: number | string;
        invite_link: string;
        name?: string;
        expire_date?: number;
        member_limit?: number;
        creates_join_request?: boolean;
    }): Promise<ChatInviteLink>;
    revokeChatInviteLink(params: {
        invite_link: string;
        chat_id?: number | string;
    }): Promise<ChatInviteLink>;
    approveChatJoinRequest(params: {
        user_id: number;
        chat_id?: number | string;
    }): Promise<boolean>;
    declineChatJoinRequest(params: {
        chat_id: number | string;
        user_id: number;
    }): Promise<boolean>;
    setChatPhoto(params: {
        chat_id: number | string;
        photo: F;
    }): Promise<boolean>;
    deleteChatPhoto(chatId: number | string): Promise<boolean>;
    setChatTitle(params: {
        chat_id: number | string;
        title: string;
    }): Promise<boolean>;
    setChatDescription(params: {
        chat_id: number;
        description?: string;
    }): Promise<boolean>;
    pinChatMessage(params: {
        chat_id: number | string;
        message_id: number;
        disable_notification?: boolean;
    }): Promise<boolean>;
    unpinChatMessage(params: {
        chat_id: number | string;
        message_id?: number;
    }): Promise<boolean>;
    unpinAllChatMessages(chatId: number | string): Promise<boolean>;
    leaveChat(chatId: number | string): Promise<boolean>;
    getChat(chatId: number | string): Promise<ChatFromGetChat>;
    getChatAdministrators(chatId: number | string): Promise<Array<ChatMemberOwner | ChatMemberAdministrator>>;
    getChatMemberCount(chatId: number | string): Promise<number>;
    getChatMember(params: {
        chat_id: number | string;
        user_id: number;
    }): Promise<ChatMember>;
    setChatStickerSet(params: {
        chat_id?: number | string;
        sticker_set_name: string;
    }): Promise<boolean>;
    deleteChatStickerSet(chatId?: number | string): Promise<boolean>;
    getForumTopicIconStickers(): Promise<Sticker[]>;
    createForumTopic(params: {
        chat_id: number | string;
        name: string;
        icon_color?: 0x6fb9f0 | 0xffd67e | 0xcb86db | 0x8eee98 | 0xff93b2 | 0xfb6f5f;
        icon_custom_emoji_id?: string;
    }): Promise<ForumTopic>;
    editForumTopic(params: {
        chat_id: number | string;
        message_thread_id: number;
        name?: string;
        icon_custom_emoji_id?: string;
    }): Promise<boolean>;
    closeForumTopic(params: {
        chat_id: number | string;
        message_thread_id: number;
    }): Promise<boolean>;
    reopenForumTopic(params: {
        chat_id: number | string;
        message_thread_id: number;
    }): Promise<boolean>;
    deleteForumTopic(params: {
        chat_id: number | string;
        message_thread_id: number;
    }): Promise<boolean>;
    unpinAllForumTopicMessages(params: {
        chat_id: number | string;
        message_thread_id: number;
    }): Promise<boolean>;
    editGeneralForumTopic(params: {
        chat_id: number | string;
        name: string;
    }): Promise<boolean>;
    closeGeneralForumTopic(chatId: number | string): Promise<boolean>;
    reopenGeneralForumTopic(chatId: number | string): Promise<boolean>;
    hideGeneralForumTopic(chatId: number | string): Promise<boolean>;
    unhideGeneralForumTopic(chatId: string | number): Promise<boolean>;
    answerCallbackQuery(params: {
        callback_query_id: string;
        text?: string;
        show_alert?: boolean;
        url?: string;
        cache_time?: number;
    }): Promise<boolean>;
    setMyCommands(params: {
        commands: readonly BotCommand[];
        scope?: BotCommandScope;
        language_code?: string;
    }): Promise<boolean>;
    deleteMyCommands(params?: {
        scope?: string;
        language_code?: string;
    }): Promise<boolean>;
    getMyCommands(params?: {
        scope?: BotCommandScope;
        language_code?: string;
    }): Promise<BotCommand[]>;
    setMyName(params: {
        name?: string;
        language_code?: string;
    }): Promise<boolean>;
    getMyName(languageCode?: string): Promise<object | undefined>;
    setMyDescription(params: {
        description?: string;
        language_code?: string;
    }): Promise<boolean>;
    getMyDescription(languageCode?: string): Promise<BotDescription>;
    setMyShortDescription(params: {
        short_description?: string;
        language_code?: string;
    }): Promise<boolean>;
    getMyShortDescription(languageCode?: string): Promise<BotShortDescription>;
    setChatMenuButton(params: {
        chat_id?: number;
        menu_button?: MenuButton;
    }): Promise<boolean>;
    getChatMenuButton(chatId?: number | string): Promise<MenuButton>;
    setMyDefaultAdministratorRights(params: {
        rights?: ChatAdministratorRights;
        for_channels?: boolean;
    }): Promise<boolean>;
    getMyDefaultAdministratorRights(forChannels: boolean): Promise<ChatAdministratorRights>;
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
    editMessageCaption(params: {
        chat_id?: number | string;
        message_id?: number;
        inline_message_id?: string;
        caption?: string;
        parse_mode?: ParseMode;
        caption_entities?: MessageEntity[];
        reply_markup?: InlineKeyboardMarkup;
    }): Promise<(Update.Edited & Message.CaptionableMessage) | boolean>;
    editMessageMedia(params: {
        chat_id?: number | string;
        message_id?: number;
        inline_message_id?: string;
        media: InputMedia<F>;
        reply_markup?: InlineKeyboardMarkup;
    }): Promise<(Update.Edited & Message) | boolean>;
    editMessageLiveLocation(params: {
        chat_id?: number | string;
        message_id?: number;
        inline_message_id?: string;
        reply_markup?: InlineKeyboardMarkup;
    }): Promise<(Update.Edited & Message) | boolean>;
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
    editMessageReplyMarkup(params: {
        chat_id?: number | string;
        message_id?: number;
        inline_message_id?: string;
        reply_markup?: InlineKeyboardMarkup;
    }): Promise<(Update.Edited & Message) | boolean>;
    stopPoll(params: {
        chat_id: number | string;
        message_id: number;
        reply_markup?: InlineKeyboardMarkup;
    }): Promise<Poll>;
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
    getStickerSet(name: string): Promise<StickerSet>;
    getCustomEmojiStickers(customEmojiIds: string[]): Promise<Sticker[]>;
    uploadStickerFile(params: {
        user_id: number;
        sticker_format: "static" | "animated" | "video";
        sticker: F;
    }): Promise<File>;
    createNewStickerSet(params: {
        user_id: number;
        name: string;
        title: string;
        stickers: InputSticker<F>[];
        sticker_format: "static" | "animated" | "video";
        sticker_type?: "regular" | "mask" | "custom_emoji";
        needs_repainting?: boolean;
    }): Promise<boolean>;
    addStickerToSet(params: {
        user_id: number;
        name: string;
        sticker: InputSticker<F>;
    }): Promise<boolean>;
    setStickerPositionInSet(params: {
        sticker: string;
        position: number;
    }): Promise<boolean>;
    deleteStickerFromSet(sticker: string): Promise<boolean>;
    setStickerEmoji(params: {
        sticker: string;
        emoji_list: string[];
    }): Promise<boolean>;
    setStickerKeywords(params: {
        sticker: string;
        keywords?: string[];
    }): Promise<boolean>;
    setStickerMaskPosition(params: {
        sticker: string;
        mask_position?: MaskPosition;
    }): Promise<boolean>;
    setStickerSetTitle(params: {
        name: string;
        title: string;
    }): Promise<boolean>;
    setStickerSetThumbnail(params: {
        name: string;
        user_id: number;
        thumbnail?: F | string;
    }): Promise<boolean>;
    setCustomEmojiStickerSetThumbnail(params: {
        name: string;
        custom_emoji_id?: string;
    }): Promise<boolean>;
    deleteStickerSet(name: string): Promise<boolean>;
    answerInlineQuery(params: {
        inline_query_id: string;
        results: readonly InlineQueryResult[];
        cache_time?: number;
        is_personal?: boolean;
        next_offset?: string;
        button?: InlineQueryResultsButton;
    }): Promise<boolean>;
    answerWebAppQuery(params: {
        web_app_query_id: string;
        result: InlineQueryResult;
    }): Promise<SentWebAppMessage>;
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
    answerShippingQuery(params: {
        shipping_query_id: string;
        ok: boolean;
        shipping_options?: readonly ShippingOption[];
        error_message?: string;
    }): Promise<boolean>;
    answerPreCheckoutQuery(params: {
        pre_checkout_query_id: string;
        ok: boolean;
        error_message?: string;
    }): Promise<boolean>;
    setPassportDataErrors(params: {
        user_id: number;
        errors: readonly PassportElementError[];
    }): Promise<boolean>;
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
    deleteMessage(params: {
        chat_id: number | string;
        message_id: number;
    }): Promise<boolean>;
}
//# sourceMappingURL=BaseClient.d.ts.map