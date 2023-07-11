import { TelegramBot } from "../TelegramBot";
import { Message, Chat, User, InlineQuery, ChosenInlineResult, CallbackQuery, ShippingQuery, PreCheckoutQuery, Poll, PollAnswer, ChatMemberUpdated, ChatJoinRequest, Update, InlineQueryResult, InlineQueryResultsButton, BotCommand, ChatFromGetChat, ChatInviteLink, ChatMember, ChatMemberAdministrator, ChatMemberOwner, ChatPermissions, File, ForumTopic, ForceReply, InlineKeyboardMarkup, ReplyKeyboardMarkup, ReplyKeyboardRemove, MessageEntity, MessageId, ParseMode, StickerSet, PassportElementError, LabeledPrice, ShippingOption, MenuButton, InputMediaAudio, InputMediaDocument, InputMediaPhoto, InputMediaVideo, InputMedia, InputSticker } from "@telegram.ts/types";
type ResponseApi = {
    update_id?: number;
    message_id?: number;
    message?: Message & Update.NonChannel;
    chat?: Chat;
    from?: User;
    edited_message?: Message & Update.Edited & Update.NonChannel;
    channel_post?: Message & Update.Channel;
    edited_channel_post?: Message & Update.Edited & Update.Channel;
    inline_query?: InlineQuery;
    chosen_inline_result?: ChosenInlineResult;
    callback_query?: CallbackQuery;
    shipping_query?: ShippingQuery;
    pre_checkout_query?: PreCheckoutQuery;
    poll?: Poll;
    poll_answer?: PollAnswer;
    my_chat_member?: ChatMemberUpdated;
    chat_member?: ChatMemberUpdated;
    chat_join_request?: ChatJoinRequest;
    pinned_message?: Message.PinnedMessageMessage;
    sender_chat?: Chat;
    message_thread_id: number;
    is_topic_message: boolean;
};
type botInfo = {
    id: number;
    is_bot: boolean;
    first_name: string;
    username: string;
    can_join_groups: boolean;
    can_read_all_group_messages: boolean;
    supports_inline_queries: boolean;
    setCommands: Function;
    getCommands: Function;
    deleteCommands: Function;
    setDescription: Function;
    getDescription: Function;
    setShortDescription: Function;
    getShortDescription: Function;
    getName: Function;
    setName: Function;
};
declare class CombinedClass<F> {
    bot: TelegramBot<F>;
    updates: ResponseApi;
    botInfo?: botInfo;
    constructor(bot: TelegramBot<F>, botInfo?: botInfo);
    get getThreadId(): number | undefined;
    get getMessageFromAnySource(): Message & Update.Edited & Update.NonChannel;
    get me(): string;
    get messageId(): number;
    get editedMessage(): Message & Update.Edited & Update.NonChannel;
    get inlineQuery(): InlineQuery;
    get shippingQuery(): ShippingQuery;
    get preCheckoutQuery(): PreCheckoutQuery;
    get chosenInlineResult(): ChosenInlineResult;
    get channelPost(): Message & Update.Channel;
    get editedChannelPost(): Message & Update.Edited & Update.Channel;
    get callbackQuery(): CallbackQuery;
    get poll(): Poll;
    get pollAnswer(): PollAnswer;
    get myChatMember(): ChatMemberUpdated;
    get chatMember(): ChatMemberUpdated;
    get chatJoinRequest(): ChatJoinRequest;
    get chat(): Chat;
    get senderChat(): Chat;
    get from(): User;
    get inlineMessageId(): string;
    get passportData(): unknown;
    answerInlineQuery(args: {
        results: readonly InlineQueryResult[];
        cache_time?: number;
        is_personal?: boolean;
        next_offset?: string;
        button?: InlineQueryResultsButton;
    }): Promise<boolean>;
    answerCallbackQuery(args?: {
        text?: string;
        show_alert?: boolean;
        url?: string;
        cache_time?: number;
    }): Promise<boolean>;
    answerShippingQuery(args: {
        ok: boolean;
        shipping_options?: readonly ShippingOption[];
        error_message?: string;
    }): Promise<boolean>;
    answerPreCheckoutQuery(args: {
        ok: boolean;
        error_message?: string;
    }): Promise<boolean>;
    editMessageText(text: string, args?: {
        message_id?: number;
        parse_mode?: ParseMode;
        entities?: MessageEntity[];
        disable_web_page_preview?: boolean;
        reply_markup?: InlineKeyboardMarkup;
    }): Promise<boolean | (Update.Edited & Message.CommonMessage & {
        text: string;
    })>;
    editMessageCaption(caption?: string, args?: {
        parse_mode?: ParseMode;
        caption_entities?: MessageEntity[];
        reply_markup?: InlineKeyboardMarkup;
    }): Promise<boolean | (Update.Edited & Message.CaptionableMessage)>;
    editMessageMedia(media: InputMedia<F>, reply_markup?: InlineKeyboardMarkup): Promise<boolean | (Update.Edited & Message)>;
    editMessageReplyMarkup(markup?: InlineKeyboardMarkup): Promise<boolean | (Update.Edited & Message)>;
    editMessageLiveLocation(replyMarkup?: InlineKeyboardMarkup): Promise<boolean | (Update.Edited & Message)>;
    stopMessageLiveLocation(latitude: number, longitude: number, args?: {
        horizontal_accuracy?: number;
        heading?: number;
        proximity_alert_radius?: number;
        reply_markup?: InlineKeyboardMarkup;
    }): Promise<boolean | (Update.Edited & Message.CommonMessage & {
        location: import("@telegram.ts/types").Location;
    })>;
    sendMessage(text: string, args?: {
        parse_mode?: ParseMode;
        entities?: MessageEntity[];
        disable_web_page_preview?: boolean;
        disable_notification?: boolean;
        protect_content?: boolean;
        reply_to_message_id?: number;
        allow_sending_without_reply?: boolean;
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message.TextMessage>;
    getChat(): Promise<ChatFromGetChat>;
    exportChatInviteLink(): Promise<string>;
    createChatInviteLink(args?: {
        name?: string;
        expire_date?: number;
        member_limit?: number;
        creates_join_request?: boolean;
    }): Promise<ChatInviteLink>;
    editChatInviteLink(args: {
        invite_link: string;
        name?: string;
        expire_date?: number;
        member_limit?: number;
        creates_join_request?: boolean;
    }): Promise<ChatInviteLink>;
    revokeChatInviteLink(invite_link: string): Promise<ChatInviteLink>;
    banChatMember(userId: number, args?: {
        until_date?: number;
        revoke_messages?: boolean;
    }): Promise<boolean>;
    get kickChatMember(): (userId: number, args?: {
        until_date?: number | undefined;
        revoke_messages?: boolean | undefined;
    } | undefined) => Promise<boolean>;
    unbanChatMember(userId: number, onlyIfBanned?: boolean): Promise<boolean>;
    restrictChatMember(args: {
        user_id: number;
        permissions: ChatPermissions;
        use_independent_chat_permissions?: boolean;
        until_date?: number;
    }): Promise<boolean>;
    promoteChatMember(userId: number, args?: {
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
    setChatAdministratorCustomTitle(args: {
        user_id: number;
        custom_title: string;
    }): Promise<boolean>;
    setChatPhoto(photo: F): Promise<boolean>;
    deleteChatPhoto(): Promise<boolean>;
    setChatTitle(title: string): Promise<boolean>;
    setChatDescription(description: string): Promise<boolean>;
    pinChatMessage(messageId: number, disableNotification?: boolean): Promise<boolean>;
    unpinChatMessage(messageId: number): Promise<boolean>;
    unpinAllChatMessages(): Promise<boolean>;
    leaveChat(): Promise<boolean>;
    setChatPermissions(permissions: ChatPermissions, use_independent_chat_permissions?: boolean): Promise<boolean>;
    getChatAdministrators(): Promise<(ChatMemberOwner | ChatMemberAdministrator)[]>;
    getChatMember(userId: number): Promise<ChatMember>;
    getChatMembersCount(): Promise<number>;
    setPassportDataErrors(errors: readonly PassportElementError[]): Promise<boolean>;
    sendPhoto(photo: F | string, args?: {
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
    sendMediaGroup(media: ReadonlyArray<InputMediaAudio<F> | InputMediaDocument<F> | InputMediaPhoto<F> | InputMediaVideo<F>>, args?: {
        disable_notification?: boolean;
        protect_content?: boolean;
        reply_to_message_id?: number;
        allow_sending_without_reply?: boolean;
    }): Promise<(Message.PhotoMessage | Message.AudioMessage | Message.DocumentMessage | Message.VideoMessage)[]>;
    sendAudio(audio: F | string, args?: {
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
    sendDice(args: {
        emoji?: string;
        disable_notification?: boolean;
        protect_content?: boolean;
        reply_to_message_id?: number;
        allow_sending_without_reply?: boolean;
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message.DiceMessage>;
    sendDocument(document: F | string, args?: {
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
    sendSticker(sticker: F | string, args?: {
        emoji?: string;
        disable_notification?: boolean;
        protect_content?: boolean;
        reply_to_message_id?: number;
        allow_sending_without_reply?: boolean;
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message.StickerMessage>;
    sendVideo(video: F | string, args?: {
        duration?: number;
        length?: number;
        thumbnail?: F;
        disable_notification?: boolean;
        protect_content?: boolean;
        reply_to_message_id?: number;
        allow_sending_without_reply?: boolean;
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message.VideoMessage>;
    sendAnimation(animation: F | string, args?: {
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
    sendVideoNote(videoNote: F | string, args?: {
        duration?: number;
        length?: number;
        thumbnail?: F;
        disable_notification?: boolean;
        protect_content?: boolean;
        reply_to_message_id?: number;
        allow_sending_without_reply?: boolean;
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message.VideoNoteMessage>;
    sendInvoice(args: {
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
    sendGame(gameShortName: string, args: {
        disable_notification?: boolean;
        protect_content?: boolean;
        reply_to_message_id?: number;
        allow_sending_without_reply?: boolean;
        reply_markup?: InlineKeyboardMarkup;
    }): Promise<Message.GameMessage>;
    sendVoice(voice: F | string, args?: {
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
    }): Promise<Message.VoiceMessage>;
    sendPoll(options: readonly string[], args: {
        question: string;
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
    stopPoll(args: {
        message_id: number;
        reply_markup?: InlineKeyboardMarkup;
    }): Promise<Poll>;
    sendLocation(latitude: number, longitude: number, args?: {
        message_thread_id?: number;
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
    sendVenue(latitude: number, longitude: number, title: string, address: string, args?: {
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
    sendContact(phoneNumber: string, firstName: string, args?: {
        last_name?: string;
        vcard?: string;
        disable_notification?: boolean;
        protect_content?: boolean;
        reply_to_message_id?: number;
        allow_sending_without_reply?: boolean;
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message.ContactMessage>;
    getStickerSet(name: string): Promise<StickerSet>;
    setChatStickerSet(sticker_set_name: string): Promise<boolean>;
    deleteChatStickerSet(): Promise<boolean>;
    createForumTopic(args: {
        name: string;
        icon_color?: 0x6fb9f0 | 0xffd67e | 0xcb86db | 0x8eee98 | 0xff93b2 | 0xfb6f5f;
        icon_custom_emoji_id?: string;
    }): Promise<ForumTopic>;
    editForumTopic(args: {
        name?: string;
        icon_custom_emoji_id?: string;
    }): Promise<boolean>;
    closeForumTopic(): Promise<boolean>;
    reopenForumTopic(): Promise<boolean>;
    deleteForumTopic(): Promise<boolean>;
    unpinAllForumTopicMessages(): Promise<boolean>;
    editGeneralForumTopic(name: string): Promise<boolean>;
    closeGeneralForumTopic(): Promise<boolean>;
    reopenGeneralForumTopic(): Promise<boolean>;
    hideGeneralForumTopic(): Promise<boolean>;
    unhideGeneralForumTopic(): Promise<boolean>;
    setStickerPositionInSet(sticker: string, position: number): Promise<boolean>;
    setStickerSetThumbnail(args: {
        name: string;
        user_id: number;
        thumbnail?: any;
    }): Promise<boolean>;
    deleteStickerFromSet(sticker: string): Promise<boolean>;
    uploadStickerFile(args: {
        sticker_format: "static" | "animated" | "video";
        sticker: any;
    }): Promise<File>;
    createNewStickerSet(args: {
        name: string;
        title: string;
        stickers: InputSticker<any>[];
        sticker_format: "static" | "animated" | "video";
        sticker_type?: "regular" | "mask" | "custom_emoji";
        needs_repainting?: boolean;
    }): Promise<boolean>;
    addStickerToSet(args: {
        name: string;
        sticker: InputSticker<F>;
    }): Promise<boolean>;
    getMyCommands(): Promise<BotCommand[]>;
    setMyCommands(commands: readonly BotCommand[]): Promise<boolean>;
    replyWithMarkdown(text: string, args?: {
        message_thread_id?: number;
        entities?: MessageEntity[];
        disable_web_page_preview?: boolean;
        disable_notification?: boolean;
        protect_content?: boolean;
        reply_to_message_id?: number;
        allow_sending_without_reply?: boolean;
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message.TextMessage>;
    replyWithMarkdownV2(text: string, args?: {
        message_thread_id?: number;
        entities?: MessageEntity[];
        disable_web_page_preview?: boolean;
        disable_notification?: boolean;
        protect_content?: boolean;
        reply_to_message_id?: number;
        allow_sending_without_reply?: boolean;
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message.TextMessage>;
    replyWithHTML(text: string, args?: {
        message_thread_id?: number;
        entities?: MessageEntity[];
        disable_web_page_preview?: boolean;
        disable_notification?: boolean;
        protect_content?: boolean;
        reply_to_message_id?: number;
        allow_sending_without_reply?: boolean;
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message.TextMessage>;
    deleteMessage(messageId?: number): Promise<boolean>;
    forwardMessage(chatId: string | number, args: {
        disable_notification?: boolean;
        protect_content?: boolean;
        message_id: number;
    }): Promise<Message>;
    copyMessage(chatId: string | number, args: {
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
    approveChatJoinRequest(userId: number): Promise<boolean>;
    declineChatJoinRequest(userId: number): Promise<boolean>;
    banChatSenderChat(senderChatId: number): Promise<boolean>;
    unbanChatSenderChat(senderChatId: number): Promise<boolean>;
    setChatMenuButton(menuButton?: MenuButton): Promise<boolean>;
    getChatMenuButton(): Promise<MenuButton>;
    reply(text: string, args?: {
        message_thread_id?: number;
        parse_mode?: ParseMode;
        entities?: MessageEntity[];
        disable_web_page_preview?: boolean;
        disable_notification?: boolean;
        protect_content?: boolean;
        reply_to_message_id?: number;
        allow_sending_without_reply?: boolean;
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message.TextMessage>;
    send(text: string, args?: {
        message_thread_id?: number;
        parse_mode?: ParseMode;
        entities?: MessageEntity[];
        disable_web_page_preview?: boolean;
        disable_notification?: boolean;
        protect_content?: boolean;
        reply_to_message_id?: number;
        allow_sending_without_reply?: boolean;
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message.TextMessage>;
    leave(): Promise<boolean>;
    processUpdate(): Promise<void>;
}
export { CombinedClass };
//# sourceMappingURL=CombinedClass.d.ts.map