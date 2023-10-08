import { TelegramBot } from "./client.js";
import {
  MessageCollector,
  MessageFilter,
} from "../collection/MessageCollector.js";
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
  ChatFromGetChat,
  ChatInviteLink,
  ChatMember,
  ChatMemberAdministrator,
  ChatMemberOwner,
  ChatPermissions,
  File,
  ForumTopic,
  ForceReply,
  InlineKeyboardMarkup,
  ReplyKeyboardMarkup,
  ReplyKeyboardRemove,
  MessageEntity,
  MessageId,
  ParseMode,
  StickerSet,
  PassportElementError,
  LabeledPrice,
  ShippingOption,
  MenuButton,
  InputMediaAudio,
  InputMediaDocument,
  InputMediaPhoto,
  InputMediaVideo,
  InputMedia,
  InputSticker,
} from "@telegram.ts/types";

interface Context<F = Buffer> {
  telegram: TelegramBot<F>;

  /**
   * @see https://core.telegram.org/bots/api#answerinlinequery
   */
  answerInlineQuery(args: {
    results: readonly InlineQueryResult[];
    cache_time?: number;
    is_personal?: boolean;
    next_offset?: string;
    button?: InlineQueryResultsButton;
  }): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#answercallbackquery
   */
  answerCallbackQuery(args?: {
    text?: string;
    show_alert?: boolean;
    url?: string;
    cache_time?: number;
  }): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#answershippingquery
   */
  answerShippingQuery(args: {
    ok: boolean;
    shipping_options?: readonly ShippingOption[];
    error_message?: string;
  }): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#answerprecheckoutquery
   */
  answerPreCheckoutQuery(args: {
    ok: boolean;
    error_message?: string;
  }): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#editmessagetext
   */
  editMessageText(
    text: string,
    args?: {
      message_id?: number;
      parse_mode?: ParseMode;
      entities?: MessageEntity[];
      disable_web_page_preview?: boolean;
      reply_markup?: InlineKeyboardMarkup;
    },
  ): Promise<
    | boolean
    | (Update.Edited &
        Message.CommonMessage & {
          text: string;
        })
  >;
  /**
   * @see https://core.telegram.org/bots/api#editmessagecaption
   */
  editMessageCaption(
    caption?: string,
    args?: {
      parse_mode?: ParseMode;
      caption_entities?: MessageEntity[];
      reply_markup?: InlineKeyboardMarkup;
    },
  ): Promise<boolean | (Update.Edited & Message.CaptionableMessage)>;
  /**
   * @see https://core.telegram.org/bots/api#editmessagemedia
   */
  editMessageMedia(
    media: InputMedia<F>,
    reply_markup?: InlineKeyboardMarkup,
  ): Promise<boolean | (Update.Edited & Message)>;
  /**
   * @see https://core.telegram.org/bots/api#editmessagereplymarkup
   */
  editMessageReplyMarkup(
    markup?: InlineKeyboardMarkup,
  ): Promise<boolean | (Update.Edited & Message)>;
  /**
   * @see https://core.telegram.org/bots/api#editmessagelivelocation
   */
  editMessageLiveLocation(
    replyMarkup?: InlineKeyboardMarkup,
  ): Promise<boolean | (Update.Edited & Message)>;
  /**
   * @see https://core.telegram.org/bots/api#stopmessagelivelocation
   */
  stopMessageLiveLocation(
    latitude: number,
    longitude: number,
    args?: {
      horizontal_accuracy?: number;
      heading?: number;
      proximity_alert_radius?: number;
      reply_markup?: InlineKeyboardMarkup;
    },
  ): Promise<
    | boolean
    | (Update.Edited &
        Message.CommonMessage & {
          location: import("@telegram.ts/types").Location;
        })
  >;
  /**
   * @see https://core.telegram.org/bots/api#sendmessage
   */
  sendMessage(
    text: string,
    args?: {
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
    },
  ): Promise<Message.TextMessage>;
  /**
   * @see https://core.telegram.org/bots/api#getchat
   */
  getChat(): Promise<ChatFromGetChat>;
  /**
   * @see https://core.telegram.org/bots/api#exportchatinvitelink
   */
  exportChatInviteLink(): Promise<string>;
  /**
   * @see https://core.telegram.org/bots/api#createchatinvitelink
   */
  createChatInviteLink(args?: {
    name?: string;
    expire_date?: number;
    member_limit?: number;
    creates_join_request?: boolean;
  }): Promise<ChatInviteLink>;
  /**
   * @see https://core.telegram.org/bots/api#editchatinvitelink
   */
  editChatInviteLink(args: {
    invite_link: string;
    name?: string;
    expire_date?: number;
    member_limit?: number;
    creates_join_request?: boolean;
  }): Promise<ChatInviteLink>;
  /**
   * @see https://core.telegram.org/bots/api#revokechatinvitelink
   */
  revokeChatInviteLink(invite_link: string): Promise<ChatInviteLink>;
  /**
   * @see https://core.telegram.org/bots/api#banchatmember
   */
  banChatMember(
    userId: number,
    args?: {
      until_date?: number;
      revoke_messages?: boolean;
    },
  ): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#unbanchatmember
   */
  unbanChatMember(userId: number, onlyIfBanned?: boolean): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#restrictchatmember
   */
  restrictChatMember(args: {
    user_id: number;
    permissions: ChatPermissions;
    use_independent_chat_permissions?: boolean;
    until_date?: number;
  }): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#promotechatmember
   */
  promoteChatMember(
    userId: number,
    args?: {
      is_anonymous?: boolean;
      can_manage_chat?: boolean;
      can_post_messages?: boolean;
      can_post_stories?: boolean;
      can_edit_messages?: boolean;
      can_edit_stories?: boolean;
      can_delete_messages?: boolean;
      can_delete_stories?: boolean;
      can_manage_video_chats?: boolean;
      can_restrict_members?: boolean;
      can_promote_members?: boolean;
      can_change_info?: boolean;
      can_invite_users?: boolean;
      can_pin_messages?: boolean;
      can_manage_topics?: boolean;
    },
  ): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#setchatadministratorcustomtitle
   */
  setChatAdministratorCustomTitle(args: {
    user_id: number;
    custom_title: string;
  }): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#setchatphoto
   */
  setChatPhoto(photo: F): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#deletechatphoto
   */
  deleteChatPhoto(): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#setchattitle
   */
  setChatTitle(title: string): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#setchatdescription
   */
  setChatDescription(description: string): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#pinchatmessage
   */
  pinChatMessage(
    messageId: number,
    disableNotification?: boolean,
  ): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#unpinchatmessage
   */
  unpinChatMessage(messageId: number): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#unpinallchatmessages
   */
  unpinAllChatMessages(): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#leavechat
   */
  leaveChat(): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#setchatpermissions
   */
  setChatPermissions(
    permissions: ChatPermissions,
    use_independent_chat_permissions?: boolean,
  ): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#getchatadministrators
   */
  getChatAdministrators(): Promise<
    (ChatMemberOwner | ChatMemberAdministrator)[]
  >;
  /**
   * @see https://core.telegram.org/bots/api#getchatmember
   */
  getChatMember(userId: number): Promise<ChatMember>;
  /**
   * @see https://core.telegram.org/bots/api#getchatmemberscount
   */
  getChatMembersCount(): Promise<number>;
  /**
   * @see https://core.telegram.org/bots/api#setpassportdataerrors
   */
  setPassportDataErrors(
    errors: readonly PassportElementError[],
  ): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#sendphoto
   */
  sendPhoto(
    photo: F | string,
    args?: {
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
    },
  ): Promise<Message.PhotoMessage>;
  /**
   * @see https://core.telegram.org/bots/api#sendmediagroup
   */
  sendMediaGroup(
    media: ReadonlyArray<
      | InputMediaAudio<F>
      | InputMediaDocument<F>
      | InputMediaPhoto<F>
      | InputMediaVideo<F>
    >,
    args?: {
      disable_notification?: boolean;
      protect_content?: boolean;
      reply_to_message_id?: number;
      allow_sending_without_reply?: boolean;
    },
  ): Promise<
    (
      | Message.PhotoMessage
      | Message.AudioMessage
      | Message.DocumentMessage
      | Message.VideoMessage
    )[]
  >;
  /**
   * @see https://core.telegram.org/bots/api#sendaudio
   */
  sendAudio(
    audio: F | string,
    args?: {
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
    },
  ): Promise<Message.AudioMessage>;
  /**
   * @see https://core.telegram.org/bots/api#senddice
   */
  sendDice(args?: {
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
  }): Promise<Message.DiceMessage>;
  /**
   * @see https://core.telegram.org/bots/api#senddocument
   */
  sendDocument(
    document: F | string,
    args?: {
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
    },
  ): Promise<Message.DocumentMessage>;
  /**
   * @see https://core.telegram.org/bots/api#sendsticker
   */
  sendSticker(
    sticker: F | string,
    args?: {
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
    },
  ): Promise<Message.StickerMessage>;
  /**
   * @see https://core.telegram.org/bots/api#sendvideo
   */
  sendVideo(
    video: F | string,
    args?: {
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
    },
  ): Promise<Message.VideoMessage>;
  /**
   * @see https://core.telegram.org/bots/api#sendanimation
   */
  sendAnimation(
    animation: F | string,
    args?: {
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
    },
  ): Promise<Message.AnimationMessage>;
  /**
   * @see https://core.telegram.org/bots/api#sendvideonote
   */
  sendVideoNote(
    videoNote: F | string,
    args?: {
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
    },
  ): Promise<Message.VideoNoteMessage>;
  /**
   * @see https://core.telegram.org/bots/api#sendinvoice
   */
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
  /**
   * @see https://core.telegram.org/bots/api#sendgame
   */
  sendGame(
    gameShortName: string,
    args?: {
      disable_notification?: boolean;
      protect_content?: boolean;
      reply_to_message_id?: number;
      allow_sending_without_reply?: boolean;
      reply_markup?: InlineKeyboardMarkup;
    },
  ): Promise<Message.GameMessage>;
  /**
   * @see https://core.telegram.org/bots/api#sendvoice
   */
  sendVoice(
    voice: F | string,
    args?: {
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
    },
  ): Promise<Message.VoiceMessage>;
  /**
   * @see https://core.telegram.org/bots/api#sendpoll
   */
  sendPoll(
    options: readonly string[],
    args: {
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
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    },
  ): Promise<Message.PollMessage>;
  /**
   * @see https://core.telegram.org/bots/api#stoppoll
   */
  stopPoll(args: {
    message_id: number;
    reply_markup?: InlineKeyboardMarkup;
  }): Promise<Poll>;
  /**
   * @see https://core.telegram.org/bots/api#sendlocation
   */
  sendLocation(
    latitude: number,
    longitude: number,
    args?: {
      message_thread_id?: number;
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
    },
  ): Promise<Message.LocationMessage>;
  /**
   * @see https://core.telegram.org/bots/api#sendvenue
   */
  sendVenue(
    latitude: number,
    longitude: number,
    title: string,
    address: string,
    args?: {
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
    },
  ): Promise<Message.VenueMessage>;
  /**
   * @see https://core.telegram.org/bots/api#sendcontact
   */
  sendContact(
    phoneNumber: string,
    firstName: string,
    args?: {
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
    },
  ): Promise<Message.ContactMessage>;
  /**
   * @see https://core.telegram.org/bots/api#getstickerset
   */
  getStickerSet(name: string): Promise<StickerSet>;
  /**
   * @see https://core.telegram.org/bots/api#setchatstickerset
   */
  setChatStickerSet(stickerSetName: string): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#deletechatstickerset
   */
  deleteChatStickerSet(): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#createforumtopic
   */
  createForumTopic(args: {
    name: string;
    icon_color?:
      | 0x6fb9f0
      | 0xffd67e
      | 0xcb86db
      | 0x8eee98
      | 0xff93b2
      | 0xfb6f5f;
    icon_custom_emoji_id?: string;
  }): Promise<ForumTopic>;
  /**
   * @see https://core.telegram.org/bots/api#editforumtopic
   */
  editForumTopic(args?: {
    name?: string;
    icon_custom_emoji_id?: string;
  }): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#closeforumtopic
   */
  closeForumTopic(): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#reopenforumtopic
   */
  reopenForumTopic(): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#deleteforumtopic
   */
  deleteForumTopic(): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#unpinallforumtopicmessages
   */
  unpinAllForumTopicMessages(): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#editgeneralforumtopic
   */
  editGeneralForumTopic(name: string): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#closegeneralforumtopic
   */
  closeGeneralForumTopic(): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#reopengeneralforumtopic
   */
  reopenGeneralForumTopic(): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#hidegeneralforumtopic
   */
  hideGeneralForumTopic(): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#unhidegeneralforumtopic
   */
  unhideGeneralForumTopic(): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#unpinallgeneralforumtopicmessages
   */
  unpinAllGeneralForumTopicMessages(): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#setstickerpositioninset
   */
  setStickerPositionInSet(sticker: string, position: number): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#setstickersetthumbnail
   */
  setStickerSetThumbnail(args: {
    name: string;
    user_id: number;
    thumbnail?: F;
  }): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#deletestickerfromset
   */
  deleteStickerFromSet(sticker: string): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#uploadstickerfile
   */
  uploadStickerFile(args: {
    sticker_format: "static" | "animated" | "video";
    sticker: F;
  }): Promise<File>;
  /**
   * @see https://core.telegram.org/bots/api#createnewstickerset
   */
  createNewStickerSet(args: {
    name: string;
    title: string;
    stickers: InputSticker<F>[];
    sticker_format: "static" | "animated" | "video";
    sticker_type?: "regular" | "mask" | "custom_emoji";
    needs_repainting?: boolean;
  }): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#addstickertoset
   */
  addStickerToSet(args: {
    name: string;
    sticker: InputSticker<F>;
  }): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#getmycommands
   */
  getMyCommands(): Promise<BotCommand[]>;
  /**
   * @see https://core.telegram.org/bots/api#setmycommands
   */
  setMyCommands(commands: readonly BotCommand[]): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#setmydescription
   */
  setMyDescription(description: string): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#getmydescription
   */
  getMyDescription(): Promise<BotDescription>;
  /**
   * @see https://core.telegram.org/bots/api#setmyshortdescription
   */
  setMyShortDescription(shortDescription: string): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#getmyshortdescription
   */
  getMyShortDescription(): Promise<BotShortDescription>;
  /**
   * @see https://core.telegram.org/bots/api#setmyname
   */
  setMyName(name: string): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#getmyname
   */
  getMyName(): Promise<BotName>;
  /**
   * @see https://core.telegram.org/bots/api#sendmessage
   */
  replyWithMarkdown(
    text: string,
    args?: {
      message_thread_id?: number;
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
    },
  ): Promise<Message.TextMessage>;
  /**
   * @see https://core.telegram.org/bots/api#sendmessage
   */
  replyWithMarkdownV2(
    text: string,
    args?: {
      message_thread_id?: number;
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
    },
  ): Promise<Message.TextMessage>;
  /**
   * @see https://core.telegram.org/bots/api#sendmessage
   */
  replyWithHTML(
    text: string,
    args?: {
      message_thread_id?: number;
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
    },
  ): Promise<Message.TextMessage>;
  /**
   * @see https://core.telegram.org/bots/api#deletemessage
   */
  deleteMessage(messageId?: number): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#forwardmessage
   */
  forwardMessage(
    chatId: string | number,
    args: {
      disable_notification?: boolean;
      protect_content?: boolean;
      message_id: number;
    },
  ): Promise<Message>;
  /**
   * @see https://core.telegram.org/bots/api#copymessage
   */
  copyMessage(
    chatId: string | number,
    args: {
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
    },
  ): Promise<MessageId>;
  /**
   * @see https://core.telegram.org/bots/api#approvechatjoinrequest
   */
  approveChatJoinRequest(userId: number): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#declinechatjoinrequest
   */
  declineChatJoinRequest(userId: number): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#banchatsenderchat
   */
  banChatSenderChat(senderChatId: number): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#unbanchatsenderchat
   */
  unbanChatSenderChat(senderChatId: number): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#setchatmenubutton
   */
  setChatMenuButton(menuButton?: MenuButton): Promise<boolean>;
  /**
   * @see https://core.telegram.org/bots/api#getchatmenubutton
   */
  getChatMenuButton(): Promise<MenuButton>;
  /**
   * @see https://core.telegram.org/bots/api#setgamescore
   */
  setGameScore(
    userId: number,
    score: number,
    args?: {
      force?: boolean;
      disable_edit_message?: boolean;
      chat_id?: number;
      message_id?: number;
      inline_message_id?: string;
    },
  ): Promise<
    | true
    | (Update.Edited &
        Message.CommonMessage & {
          game: import("@telegram.ts/types").Game;
        })
  >;
  /**
   * @see https://core.telegram.org/bots/api#getgamehighscores
   */
  getGameHighScores(
    userId: number,
    args?: {
      chat_id?: number;
      message_id?: number;
      inline_message_id?: string;
    },
  ): Promise<GameHighScore[]>;
  /**
   * @see https://core.telegram.org/bots/api#sendmessage
   */
  reply(
    text: string,
    args?: {
      message_thread_id?: number;
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
    },
  ): Promise<Message.TextMessage>;
  /**
   * @see https://core.telegram.org/bots/api#sendmessage
   */
  send(
    text: string,
    args?: {
      message_thread_id?: number;
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
    },
  ): Promise<Message.TextMessage>;

  messageCollector(
    filter?: MessageFilter<F>,
    time?: number,
    max?: number,
    caption?: boolean,
  ): MessageCollector<F>;

  /**
   * Filters an object based on a specified path.
   * @param {string} filterPath - The path to navigate within the object (e.g., "update:message:text").
   * @returns {boolean} Returns true if the path exists within the object; otherwise, false.
   */
  filter(filterPath: string): boolean;
}

export { Context };
