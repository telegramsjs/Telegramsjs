import { Request } from "./request.js";
import axios from "axios";
import { TelegramApiError } from "./errorcollection.js";
import {
  Message,
  Chat,
  User,
  InlineQuery,
  ChosenInlineResult,
  CallbackQuery,
  ShippingQuery,
  PreCheckoutQuery,
  Poll,
  PollAnswer,
  ChatMemberUpdated,
  ChatJoinRequest,
  Update,
  InlineQueryResult,
  InlineQueryResultsButton,
  BotCommand,
  ChatAdministratorRights,
  ChatFromGetChat,
  ChatInviteLink,
  ChatMember,
  ChatMemberAdministrator,
  ChatMemberOwner,
  ChatPermissions,
  File,
  ForumTopic,
  UserFromGetMe,
  UserProfilePhotos,
  WebhookInfo,
  ForceReply,
  InlineKeyboardMarkup,
  ReplyKeyboardMarkup,
  ReplyKeyboardRemove,
  GameHighScore,
  MaskPosition,
  MessageEntity,
  MessageId,
  ParseMode,
  SentWebAppMessage,
  Sticker,
  StickerSet,
  PassportElementError,
  LabeledPrice,
  ShippingOption,
  BotCommandScope,
  BotDescription,
  BotName,
  BotShortDescription,
  MenuButton,
  InputMediaAudio,
  InputMediaDocument,
  InputMediaPhoto,
  InputMediaVideo,
  InputMedia,
  InputSticker,
} from "@telegram.ts/types";

export class BaseClient<F> extends Request {
  token: string = "";
  intents?: string[] | number[] | null | undefined = null;
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
  constructor(token: string, intents?: readonly string[] | number[] | null) {
    super(token, intents);
  }

  async getMe(): Promise<UserFromGetMe> {
    const method = "getMe";
    const response = await this.request(method);
    return response.result;
  }

  async deleteWebhook(params: {
    drop_pending_updates?: boolean;
  }): Promise<boolean> {
    const method = "deleteWebhook";
    const response = await this.request(method, params);
    return response.result;
  }

  async getWebhookInfo(): Promise<WebhookInfo> {
    const method = "getWebhookInfo";
    const response = await this.request(method);
    return response.result;
  }

  async sendMessage(params: {
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
    reply_markup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
  }): Promise<Message.TextMessage> {
    const method = "sendMessage";
    const response = await this.request(method, params);

    return response.result;
  }

  async sendPhoto(params: {
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
    reply_markup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
  }): Promise<Message.PhotoMessage> {
    const method = "sendPhoto";
    const response = await this.request(method, params);

    return response.result;
  }

  async sendAudio(params: {
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
    reply_markup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
  }): Promise<Message.AudioMessage> {
    const method = "sendAudio";
    const response = await this.request(method, params);
    return response.result;
  }

  async sendDocument(params: {
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
    reply_markup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
  }): Promise<Message.DocumentMessage> {
    const method = "sendDocument";
    const response = await this.request(method, params);
    return response.result;
  }

  async sendVideo(params: {
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
    reply_markup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
  }): Promise<Message.VideoMessage> {
    const method = "sendVideo";
    const response = await this.request(method, params);
    return response.result;
  }

  async sendAnimation(params: {
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
    reply_markup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
  }): Promise<Message.AnimationMessage> {
    const method = "sendAnimation";
    const response = await this.request(method, params);
    return response.result;
  }

  async sendVoice(params: {
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
    reply_markup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
  }): Promise<Message.VoiceMessage> {
    const method = "sendVoice";
    const response = await this.request(method, params);
    return response.result;
  }

  async sendVideoNote(params: {
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
    reply_markup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
  }): Promise<Message.VideoNoteMessage> {
    const method = "sendVideoNote";
    const response = await this.request(method, params);
    return response.result;
  }

  async sendMediaGroup(params: {
    chat_id: number | string;
    message_thread_id?: number;
    media: ReadonlyArray<
      | InputMediaAudio<F>
      | InputMediaDocument<F>
      | InputMediaPhoto<F>
      | InputMediaVideo<F>
    >;
    disable_notification?: boolean;
    protect_content?: boolean;
    reply_to_message_id?: number;
    allow_sending_without_reply?: boolean;
  }): Promise<
    Array<
      | Message.AudioMessage
      | Message.DocumentMessage
      | Message.PhotoMessage
      | Message.VideoMessage
    >
  > {
    const method = "sendMediaGroup";
    const response = await this.request(method, params);
    return response.result;
  }

  async sendLocation(params: {
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
    reply_markup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
  }): Promise<Message.LocationMessage> {
    const method = "sendLocation";
    const response = await this.request(method, params);
    return response.result;
  }

  async sendVenue(params: {
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
    reply_markup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
  }): Promise<Message.VenueMessage> {
    const method = "sendVenue";
    const response = await this.request(method, params);
    return response.result;
  }

  async forwardMessage(params: {
    chat_id: number | string;
    message_thread_id?: number;
    from_chat_id: number | string;
    disable_notification?: boolean;
    protect_content?: boolean;
    message_id: number;
  }): Promise<Message> {
    const method = "forwardMessage";
    const response = await this.request(method, params);
    return response.result;
  }

  async copyMessage(params: {
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
    reply_markup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
  }): Promise<MessageId> {
    const method = "copyMessage";
    const response = await this.request(method, params);
    return response.result;
  }

  async sendContact(params: {
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
    reply_markup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
  }): Promise<Message.ContactMessage> {
    const method = "sendContact";
    const response = await this.request(method, params);
    return response.result;
  }

  async sendPoll(params: {
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
    reply_markup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
  }): Promise<Message.PollMessage> {
    const method = "sendPoll";
    const response = await this.request(method, params);
    return response.result;
  }

  async sendDice(params: {
    chat_id: number | string;
    message_thread_id?: number;
    emoji?: string;
    disable_notification?: boolean;
    protect_content?: boolean;
    reply_to_message_id?: number;
    allow_sending_without_reply?: boolean;
    reply_markup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
  }): Promise<Message.DiceMessage> {
    const method = "sendDice";
    const response = await this.request(method, params);
    return response.result;
  }

  async sendChatAction(params: {
    chat_id: number | string;
    action:
      | "typing"
      | "upload_photo"
      | "record_video"
      | "upload_video"
      | "record_voice"
      | "upload_voice"
      | "upload_document"
      | "choose_sticker"
      | "find_location"
      | "record_video_note"
      | "upload_video_note";
    message_thread_id?: number;
  }): Promise<boolean> {
    const method = "sendChatAction";
    const response = await this.request(method, params);
    return true;
  }

  async getUserProfilePhotos(params: {
    user_id: number;
    offset?: number;
    limit?: number;
  }): Promise<UserProfilePhotos> {
    const method = "getUserProfilePhotos";
    const response = await this.request(method, params);
    return response.result;
  }

  async getFile(file_id: string): Promise<File> {
    const method = "getFile";
    const response = await this.request(method, {
      file_id,
    });

    return response.result;
  }

  async downloadFile(filePath: string): Promise<Buffer> {
    const fileUrl = `https://api.telegram.org/file/bot${this.token}/${filePath}`;

    try {
      const response = await axios.get(fileUrl, {
        responseType: "arraybuffer",
      });
      return Buffer.from(response.data, "binary");
    } catch (error) {
      const downloadError = error as {
        message: string;
      };
      throw new Error(`Failed to download file: ${downloadError.message}`);
    }
  }

  async banChatMember(params: {
    chat_id: number | string;
    user_id: number;
    until_date?: number;
    revoke_messages?: boolean;
  }): Promise<boolean> {
    const method = "banChatMember";
    const response = await this.request(method, params);
    return true;
  }

  async unbanChatMember(params: {
    chat_id: number | string;
    user_id: number;
    only_if_banned?: boolean;
  }): Promise<boolean> {
    const method = "unbanChatMember";
    const response = await this.request(method, params);
    return true;
  }

  async restrictChatMember(params: {
    chat_id: number | string;
    user_id: number;
    permissions: ChatPermissions;
    use_independent_chat_permissions?: boolean;
    until_date?: number;
  }): Promise<boolean> {
    const method = "restrictChatMember";
    const response = await this.request(method, params);
    return true;
  }

  async promoteChatMember(params: {
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
  }): Promise<boolean> {
    const method = "promoteChatMember";
    const response = await this.request(method, params);
    return true;
  }

  async setChatAdministratorCustomTitle(params: {
    chat_id: number | string;
    user_id: number;
    custom_title: string;
  }): Promise<boolean> {
    const method = "setChatAdministratorCustomTitle";
    const response = await this.request(method, params);
    return true;
  }

  async banChatSenderChat(params: {
    chat_id: number | string;
    sender_chat_id: number;
  }): Promise<boolean> {
    const method = "banChatMember";
    const response = await this.request(method, params);
    return true;
  }

  async unbanChatSenderChat(params: {
    chat_id: number | string;
    sender_chat_id: number;
  }): Promise<boolean> {
    const method = "unbanChatMember";
    const response = await this.request(method, params);
    return true;
  }

  async setChatPermissions(params: {
    chat_id: number | string;
    permissions: ChatPermissions;
    use_independent_chat_permissions?: boolean;
  }): Promise<boolean> {
    const method = "setChatPermissions";
    const response = await this.request(method, params);
    return true;
  }

  async exportChatInviteLink(chatId?: number | string): Promise<string> {
    const method = "exportChatInviteLink";
    const response = await this.request(method, {
      chat_id: chatId,
    });

    return response.result;
  }

  async createChatInviteLink(params: {
    chat_id: number | string;
    name?: string;
    expire_date?: number;
    member_limit?: number;
    creates_join_request?: boolean;
  }): Promise<ChatInviteLink> {
    const method = "createChatInviteLink";
    const response = await this.request(method, params);
    return response.result;
  }

  async editChatInviteLink(params: {
    chat_id: number | string;
    invite_link: string;
    name?: string;
    expire_date?: number;
    member_limit?: number;
    creates_join_request?: boolean;
  }): Promise<ChatInviteLink> {
    const method = "editChatInviteLink";
    const response = await this.request(method, params);
    return response.result;
  }

  async revokeChatInviteLink(params: {
    invite_link: string;
    chat_id?: number | string;
  }): Promise<ChatInviteLink> {
    const method = "revokeChatInviteLink";
    const response = await this.request(method, params);
    return response.result;
  }

  async approveChatJoinRequest(params: {
    user_id: number;
    chat_id?: number | string;
  }): Promise<boolean> {
    const method = "approveChatJoinRequest";
    const response = await this.request(method, params);
    return true;
  }

  async declineChatJoinRequest(params: {
    chat_id: number | string;
    user_id: number;
  }): Promise<boolean> {
    const method = "declineChatJoinRequest";
    const response = await this.request(method, params);
    return true;
  }

  async setChatPhoto(params: {
    chat_id: number | string;
    photo: F;
  }): Promise<boolean> {
    const method = "setChatPhoto";
    const response = await this.request(method, params);
    return true;
  }

  async deleteChatPhoto(chatId: number | string): Promise<boolean> {
    const method = "deleteChatPhoto";
    const response = await this.request(method, {
      chat_id: chatId,
    });
    return true;
  }

  async setChatTitle(params: {
    chat_id: number | string;
    title: string;
  }): Promise<boolean> {
    const method = "setChatTitle";
    const response = await this.request(method, params);
    return true;
  }

  async setChatDescription(params: {
    chat_id: number;
    description?: string;
  }): Promise<boolean> {
    const method = "setChatDescription";
    const response = await this.request(method, params);
    return true;
  }

  async pinChatMessage(params: {
    chat_id: number | string;
    message_id: number;
    disable_notification?: boolean;
  }): Promise<boolean> {
    const method = "pinChatMessage";
    const response = await this.request(method, params);
    return true;
  }

  async unpinChatMessage(params: {
    chat_id: number | string;
    message_id?: number;
  }): Promise<boolean> {
    const method = "unpinChatMessage";
    const response = await this.request(method, params);
    return true;
  }

  async unpinAllChatMessages(chatId: number | string): Promise<boolean> {
    const method = "unpinAllChatMessages";
    const response = await this.request(method, {
      chat_id: chatId,
    });
    return true;
  }

  async leaveChat(chatId: number | string): Promise<boolean> {
    const method = "leaveChat";
    const response = await this.request(method, {
      chat_id: chatId,
    });
    return true;
  }

  async getChat(chatId: number | string): Promise<ChatFromGetChat> {
    const method = "getChat";
    const response = await this.request(method, {
      chat_id: chatId,
    });
    return response.result;
  }

  async getChatAdministrators(
    chatId: number | string
  ): Promise<Array<ChatMemberOwner | ChatMemberAdministrator>> {
    const method = "getChatAdministrators";
    const response = await this.request(method, {
      chat_id: chatId,
    });
    return response.result;
  }

  async getChatMemberCount(chatId: number | string): Promise<number> {
    const method = "getChatMemberCount";
    const response = await this.request(method, {
      chat_id: chatId,
    });
    return response.result;
  }

  async getChatMember(params: {
    chat_id: number | string;
    user_id: number;
  }): Promise<ChatMember> {
    const method = "getChatMember";
    const response = await this.request(method, params);
    return response.result;
  }

  async setChatStickerSet(params: {
    chat_id?: number | string;
    sticker_set_name: string;
  }): Promise<boolean> {
    const method = "setChatStickerSet";
    const response = await this.request(method, params);
    return true;
  }

  async deleteChatStickerSet(chatId?: number | string): Promise<boolean> {
    const method = "deleteChatStickerSet";
    const response = await this.request(method, {
      chat_id: chatId,
    });
    return true;
  }

  async getForumTopicIconStickers(): Promise<Sticker[]> {
    const method = "getForumTopicIconStickers";
    const response = await this.request(method);
    return response.result;
  }

  async createForumTopic(params: {
    chat_id: number | string;
    name: string;
    icon_color?:
      | 0x6fb9f0
      | 0xffd67e
      | 0xcb86db
      | 0x8eee98
      | 0xff93b2
      | 0xfb6f5f;
    icon_custom_emoji_id?: string;
  }): Promise<ForumTopic> {
    const method = "createForumTopic";
    const response = await this.request(method, params);
    return response.result;
  }

  async editForumTopic(params: {
    chat_id: number | string;
    message_thread_id: number;
    name?: string;
    icon_custom_emoji_id?: string;
  }): Promise<boolean> {
    const method = "editForumTopic";
    const response = await this.request(method, params);
    return true;
  }

  async closeForumTopic(params: {
    chat_id: number | string;
    message_thread_id: number;
  }): Promise<boolean> {
    const method = "closeForumTopic";
    const response = await this.request(method, params);
    return true;
  }

  async reopenForumTopic(params: {
    chat_id: number | string;
    message_thread_id: number;
  }): Promise<boolean> {
    const method = "reopenForumTopic";
    const response = await this.request(method, params);
    return true;
  }

  async deleteForumTopic(params: {
    chat_id: number | string;
    message_thread_id: number;
  }): Promise<boolean> {
    const method = "deleteForumTopic";
    const response = await this.request(method, params);
    return true;
  }

  async unpinAllForumTopicMessages(params: {
    chat_id: number | string;
    message_thread_id: number;
  }): Promise<boolean> {
    const method = "unpinAllForumTopicMessages";
    const response = await this.request(method, params);
    return true;
  }

  async editGeneralForumTopic(params: {
    chat_id: number | string;
    name: string;
  }): Promise<boolean> {
    const method = "editGeneralForumTopic";
    const response = await this.request(method, params);
    return true;
  }

  async closeGeneralForumTopic(chatId: number | string): Promise<boolean> {
    const method = "closeGeneralForumTopic";
    const response = await this.request(method, {
      chat_id: chatId,
    });
    return true;
  }

  async reopenGeneralForumTopic(chatId: number | string): Promise<boolean> {
    const method = "reopenGeneralForumTopic";
    const response = await this.request(method, {
      chat_id: chatId,
    });

    return true;
  }

  async hideGeneralForumTopic(chatId: number | string): Promise<boolean> {
    const method = "hideGeneralForumTopic";
    const response = await this.request(method, {
      chat_id: chatId,
    });

    return true;
  }

  async unhideGeneralForumTopic(chatId: string | number): Promise<boolean> {
    const method = "unhideGeneralForumTopic";
    const response = await this.request(method, {
      chat_id: chatId,
    });

    return true;
  }

  async answerCallbackQuery(params: {
    callback_query_id: string;
    text?: string;
    show_alert?: boolean;
    url?: string;
    cache_time?: number;
  }): Promise<boolean> {
    const method = "answerCallbackQuery";
    const response = await this.request(method, params);

    return true;
  }

  async setMyCommands(params: {
    commands: readonly BotCommand[];
    scope?: BotCommandScope;
    language_code?: string;
  }): Promise<boolean> {
    const method = "setMyCommands";
    const response = await this.request(method, params);
    return response.result;
  }

  async deleteMyCommands(params?: {
    scope?: string;
    language_code?: string;
  }): Promise<boolean> {
    const method = "deleteMyCommands";
    const response = await this.request(method, params);

    return response.result;
  }

  async getMyCommands(params?: {
    scope?: BotCommandScope;
    language_code?: string;
  }): Promise<BotCommand[]> {
    const method = "getMyCommands";
    const response = await this.request(method, params);

    return response.result;
  }

  async setMyName(params: {
    name?: string;
    language_code?: string;
  }): Promise<boolean> {
    const method = "setMyName";
    const response = await this.request(method, params);

    return response.result;
  }

  async getMyName(languageCode?: string): Promise<object | undefined> {
    const method = "getMyName";
    const response = await this.request(method, {
      language_code: languageCode,
    });

    return response.result;
  }

  async setMyDescription(params: {
    description?: string;
    language_code?: string;
  }): Promise<boolean> {
    const method = "setMyDescription";
    const response = await this.request(method, params);

    return response.result;
  }

  async getMyDescription(languageCode?: string): Promise<BotDescription> {
    const method = "getMyDescription";
    const response = await this.request(method, {
      language_code: languageCode,
    });
    return response.result;
  }

  async setMyShortDescription(params: {
    short_description?: string;
    language_code?: string;
  }): Promise<boolean> {
    const method = "setMyShortDescription";
    const response = await this.request(method, params);
    return response.result;
  }

  async getMyShortDescription(
    languageCode?: string
  ): Promise<BotShortDescription> {
    const method = "getMyShortDescription";
    const response = await this.request(method, {
      language_code: languageCode,
    });
    return response.result;
  }

  async setChatMenuButton(params: {
    chat_id?: number;
    menu_button?: MenuButton;
  }): Promise<boolean> {
    const method = "setChatMenuButton";
    const response = await this.request(method, params);
    return response.result;
  }

  async getChatMenuButton(chatId?: number | string): Promise<MenuButton> {
    const method = "getChatMenuButton";
    const response = await this.request(method, {
      chat_id: chatId,
    });
    return response.result;
  }

  async setMyDefaultAdministratorRights(params: {
    rights?: ChatAdministratorRights;
    for_channels?: boolean;
  }): Promise<boolean> {
    const method = "setMyDefaultAdministratorRights";
    const response = await this.request(method, params);
    return response.result;
  }

  async getMyDefaultAdministratorRights(
    forChannels: boolean
  ): Promise<ChatAdministratorRights> {
    const method = "getMyDefaultAdministratorRights";
    const response = await this.request(method, {
      for_channels: forChannels,
    });
    return response.result;
  }

  async editMessageText(params: {
    chat_id?: number | string;
    message_id?: number;
    inline_message_id?: string;
    text: string;
    parse_mode?: ParseMode;
    entities?: MessageEntity[];
    disable_web_page_preview?: boolean;
    reply_markup?: InlineKeyboardMarkup;
  }): Promise<(Update.Edited & Message.TextMessage) | boolean> {
    const method = "editMessageText";
    const response = await this.request(method, params);
    return response.result;
  }

  async editMessageCaption(params: {
    chat_id?: number | string;
    message_id?: number;
    inline_message_id?: string;
    caption?: string;
    parse_mode?: ParseMode;
    caption_entities?: MessageEntity[];
    reply_markup?: InlineKeyboardMarkup;
  }): Promise<(Update.Edited & Message.CaptionableMessage) | boolean> {
    const method = "editMessageCaption";
    const response = await this.request(method, params);
    return response.result;
  }

  async editMessageMedia(params: {
    chat_id?: number | string;
    message_id?: number;
    inline_message_id?: string;
    media: InputMedia<F>;
    reply_markup?: InlineKeyboardMarkup;
  }): Promise<(Update.Edited & Message) | boolean> {
    const method = "editMessageMedia";
    const response = await this.request(method, params);
    return response.result;
  }

  async editMessageLiveLocation(params: {
    chat_id?: number | string;
    message_id?: number;
    inline_message_id?: string;
    reply_markup?: InlineKeyboardMarkup;
  }): Promise<(Update.Edited & Message) | boolean> {
    const method = "editMessageLiveLocation";
    const response = await this.request(method, params);
    return response.result;
  }

  async stopMessageLiveLocation(params: {
    chat_id?: number | string;
    message_id?: number;
    inline_message_id?: string;
    latitude: number;
    longitude: number;
    horizontal_accuracy?: number;
    heading?: number;
    proximity_alert_radius?: number;
    reply_markup?: InlineKeyboardMarkup;
  }): Promise<(Update.Edited & Message.LocationMessage) | boolean> {
    const method = "stopMessageLiveLocation";
    const response = await this.request(method, params);
    return response.result;
  }

  async editMessageReplyMarkup(params: {
    chat_id?: number | string;
    message_id?: number;
    inline_message_id?: string;
    reply_markup?: InlineKeyboardMarkup;
  }): Promise<(Update.Edited & Message) | boolean> {
    const method = "editMessageReplyMarkup";
    const response = await this.request(method, params);
    return response.result;
  }

  async stopPoll(params: {
    chat_id: number | string;
    message_id: number;
    reply_markup?: InlineKeyboardMarkup;
  }): Promise<Poll> {
    const method = "stopPoll";
    const response = await this.request(method, params);
    return response.result;
  }

  async sendSticker(params: {
    chat_id: number | string;
    message_thread_id?: number;
    sticker: F | string;
    emoji?: string;
    disable_notification?: boolean;
    protect_content?: boolean;
    reply_to_message_id?: number;
    allow_sending_without_reply?: boolean;
    reply_markup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
  }): Promise<Message.StickerMessage> {
    const method = "sendSticker";
    const response = await this.request(method, params);
    return response.result;
  }

  async getStickerSet(name: string): Promise<StickerSet> {
    const method = "getStickerSet";
    const response = await this.request(method, {
      name,
    });
    return response.result;
  }

  async getCustomEmojiStickers(customEmojiIds: string[]): Promise<Sticker[]> {
    const method = "getCustomEmojiStickers";
    const response = await this.request(method, {
      custom_emoji_ids: customEmojiIds,
    });

    return response.result;
  }

  async uploadStickerFile(params: {
    user_id: number;
    sticker_format: "static" | "animated" | "video";
    sticker: F;
  }): Promise<File> {
    const method = "uploadStickerFile";
    const response = await this.request(method, params);
    return response.result;
  }

  async createNewStickerSet(params: {
    user_id: number;
    name: string;
    title: string;
    stickers: InputSticker<F>[];
    sticker_format: "static" | "animated" | "video";
    sticker_type?: "regular" | "mask" | "custom_emoji";
    needs_repainting?: boolean;
  }): Promise<boolean> {
    const method = "createNewStickerSet";
    const response = await this.request(method, params);
    return response.result;
  }

  async addStickerToSet(params: {
    user_id: number;
    name: string;
    sticker: InputSticker<F>;
  }): Promise<boolean> {
    const method = "addStickerToSet";
    const response = await this.request(method, params);

    return response.result;
  }

  async setStickerPositionInSet(params: {
    sticker: string;
    position: number;
  }): Promise<boolean> {
    const method = "setStickerPositionInSet";
    const response = await this.request(method, params);
    return response.result;
  }

  async deleteStickerFromSet(sticker: string): Promise<boolean> {
    const method = "deleteStickerFromSet";
    const response = await this.request(method, {
      sticker,
    });
    return response.result;
  }

  async setStickerEmoji(params: {
    sticker: string;
    emoji_list: string[];
  }): Promise<boolean> {
    const method = "setStickerEmoji";
    const response = await this.request(method, params);
    return response.result;
  }

  async setStickerKeywords(params: {
    sticker: string;
    keywords?: string[];
  }): Promise<boolean> {
    const method = "setStickerKeywords";
    const response = await this.request(method, params);
    return response.result;
  }

  async setStickerMaskPosition(params: {
    sticker: string;
    mask_position?: MaskPosition;
  }): Promise<boolean> {
    const method = "setStickerMaskPosition";
    const response = await this.request(method, params);
    return response.result;
  }

  async setStickerSetTitle(params: {
    name: string;
    title: string;
  }): Promise<boolean> {
    const method = "setStickerSetTitle";
    const response = await this.request(method, params);
    return response.result;
  }

  async setStickerSetThumbnail(params: {
    name: string;
    user_id: number;
    thumbnail?: F | string;
  }): Promise<boolean> {
    const method = "setStickerSetThumbnail";
    const response = await this.request(method, params);
    return response.result;
  }

  async setCustomEmojiStickerSetThumbnail(params: {
    name: string;
    custom_emoji_id?: string;
  }): Promise<boolean> {
    const method = "setCustomEmojiStickerSetThumbnail";
    const response = await this.request(method, params);
    return response.result;
  }

  async deleteStickerSet(name: string): Promise<boolean> {
    const method = "deleteStickerSet";
    const response = await this.request(method, {
      name,
    });
    return response.result;
  }

  async answerInlineQuery(params: {
    inline_query_id: string;
    results: readonly InlineQueryResult[];
    cache_time?: number;
    is_personal?: boolean;
    next_offset?: string;
    button?: InlineQueryResultsButton;
  }): Promise<boolean> {
    const method = "answerInlineQuery";
    const response = await this.request(method, params);
    return response.result;
  }

  async answerWebAppQuery(params: {
    web_app_query_id: string;
    result: InlineQueryResult;
  }): Promise<SentWebAppMessage> {
    const method = "answerWebAppQuery";
    const response = await this.request(method, params);
    return response.result;
  }

  async sendInvoice(params: {
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
  }): Promise<Message.InvoiceMessage> {
    const method = "sendInvoice";
    const response = await this.request(method, params);
    return response.result;
  }

  async createInvoiceLink(params: {
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
  }): Promise<string> {
    const method = "createInvoiceLink";
    const response = await this.request(method, params);
    return response.result;
  }

  async answerShippingQuery(params: {
    shipping_query_id: string;
    ok: boolean;
    shipping_options?: readonly ShippingOption[];
    error_message?: string;
  }): Promise<boolean> {
    const method = "answerShippingQuery";
    const response = await this.request(method, params);
    return response.result;
  }

  async answerPreCheckoutQuery(params: {
    pre_checkout_query_id: string;
    ok: boolean;
    error_message?: string;
  }): Promise<boolean> {
    const method = "answerPreCheckoutQuery";
    const response = await this.request(method, params);
    return response.result;
  }

  async setPassportDataErrors(params: {
    user_id: number;
    errors: readonly PassportElementError[];
  }): Promise<boolean> {
    const method = "setPassportDataErrors";
    const response = await this.request(method, params);
    return response.result;
  }

  async sendGame(params: {
    chat_id: number;
    message_thread_id?: number;
    game_short_name: string;
    disable_notification?: boolean;
    protect_content?: boolean;
    reply_to_message_id?: number;
    allow_sending_without_reply?: boolean;
    reply_markup?: InlineKeyboardMarkup;
  }): Promise<Message.GameMessage> {
    const method = "sendGame";
    const response = await this.request(method, params);
    return response.result;
  }

  async deleteMessage(params: {
    chat_id: number | string;
    message_id: number;
  }): Promise<boolean> {
    const method = "deleteMessage";
    const response = await this.request(method, params);
    return response.result;
  }
}
