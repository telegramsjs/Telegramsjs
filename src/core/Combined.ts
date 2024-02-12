import { TelegramBot } from "../client.js";
import { MediaPayload } from "./ApiClient.js";
import {
  MessageCollector,
  MessageFilter,
  TextCaptionContextMessage,
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
  ChatAdministratorRights,
  ChatFromGetChat,
  ChatInviteLink,
  ChatMember,
  ChatMemberAdministrator,
  ChatMemberOwner,
  ReactionType,
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
  ReplyParameters,
  LinkPreviewOptions,
  ReactionTypeEmoji,
  ReactionTypeCustomEmoji,
} from "@telegram.ts/types";

interface ResponseApi {
  id?: string;
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
  old_reaction: ReactionType[];
  new_reaction: ReactionType[];
}

const onlyEmiji = [
  "👍",
  "👎",
  "❤",
  "🔥",
  "🥰",
  "👏",
  "😁",
  "🤔",
  "🤯",
  "😱",
  "🤬",
  "😢",
  "🎉",
  "🤩",
  "🤮",
  "💩",
  "🙏",
  "👌",
  "🕊",
  "🤡",
  "🥱",
  "🥴",
  "😍",
  "🐳",
  "❤‍🔥",
  "🌚",
  "🌭",
  "💯",
  "🤣",
  "⚡",
  "🍌",
  "🏆",
  "💔",
  "🤨",
  "😐",
  "🍓",
  "🍾",
  "💋",
  "🖕",
  "😈",
  "😴",
  "😭",
  "🤓",
  "👻",
  "👨‍💻",
  "👀",
  "🎃",
  "🙈",
  "😇",
  "😨",
  "🤝",
  "✍",
  "🤗",
  "🫡",
  "🎅",
  "🎄",
  "☃",
  "💅",
  "🤪",
  "🗿",
  "🆒",
  "💘",
  "🙉",
  "🦄",
  "😘",
  "💊",
  "🙊",
  "😎",
  "👾",
  "🤷‍♂",
  "🤷",
  "🤷‍♀",
  "😡",
];

function isReactionTypeEmoji(reaction: any): reaction is ReactionTypeEmoji {
  return reaction?.type === "emoji" && onlyEmiji.includes(reaction?.emoji);
}

class Combined<F> {
  telegram: TelegramBot<F>;
  updates!: ResponseApi;

  constructor(telegram: TelegramBot<F>, updates: ResponseApi) {
    this.telegram = telegram;
    this.updates = updates;
  }

  get getThreadId() {
    return (this.updates.message_thread_id ??
      this.updates.message?.message_thread_id) as number;
  }

  get messageId() {
    return (this.updates.message_id ??
      this.updates.message?.message_id) as number;
  }

  get from() {
    const from = this.updates.from ?? this.updates.message?.from;
    if (!from) {
      throw Error("From is not available");
    }
    return from;
  }

  get chat(): Chat {
    const chat = this.updates.chat ?? this.updates.message?.chat;
    if (!chat) {
      throw Error("Chat is not available");
    }
    return chat;
  }

  get inlineMessageId() {
    const inlineMessageId = (this.updates as any)?.inline_message_id;
    return inlineMessageId;
  }

  isOldReaction(
    emojis?: ReactionTypeEmoji["emoji"] | ReactionTypeEmoji["emoji"][] | string,
    is_custom_emoji?: boolean,
  ) {
    const oldReaction = this.updates
      .old_reaction as unknown as (ReactionTypeEmoji &
      ReactionTypeCustomEmoji)[];
    if (!oldReaction) return false;
    if (!emojis) {
      return oldReaction.length > 0;
    }
    if (Array.isArray(emojis)) {
      return (
        oldReaction.length > 0 &&
        oldReaction.findIndex(({ emoji, custom_emoji }) =>
          !is_custom_emoji
            ? emojis.includes(emoji)
            : emojis.includes(custom_emoji),
        ) !== -1
      );
    }
    if (typeof emojis === "string") {
      return (
        oldReaction.length > 0 &&
        oldReaction.findIndex(({ emoji, custom_emoji }) =>
          !is_custom_emoji ? emoji === emojis : custom_emoji === emojis,
        ) !== -1
      );
    }
    return false;
  }

  isNewReaction(
    emojis?: ReactionTypeEmoji["emoji"] | ReactionTypeEmoji["emoji"][] | string,
    is_custom_emoji?: boolean,
  ) {
    const newReaction = this.updates
      .new_reaction as unknown as (ReactionTypeEmoji &
      ReactionTypeCustomEmoji)[];
    if (!newReaction) return false;
    if (!emojis) {
      return newReaction.length > 0;
    }
    if (Array.isArray(emojis)) {
      return (
        newReaction.length > 0 &&
        newReaction.findIndex(({ emoji, custom_emoji }) =>
          !is_custom_emoji
            ? emojis.includes(emoji)
            : emojis.includes(custom_emoji),
        ) !== -1
      );
    }
    if (typeof emojis === "string") {
      return (
        newReaction.length > 0 &&
        newReaction.findIndex(({ emoji, custom_emoji }) =>
          !is_custom_emoji ? emoji === emojis : custom_emoji === emojis,
        ) !== -1
      );
    }
    return false;
  }

  /**
   * @see https://core.telegram.org/bots/api#answerinlinequery
   */

  answerInlineQuery(args: {
    results: readonly InlineQueryResult[];
    cache_time?: number;
    is_personal?: boolean;
    next_offset?: string;
    button?: InlineQueryResultsButton;
  }) {
    return this.telegram.answerInlineQuery({
      inline_query_id: this.updates?.id as string,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#answercallbackquery
   */
  answerCallbackQuery(args?: {
    text?: string;
    show_alert?: boolean;
    url?: string;
    cache_time?: number;
  }) {
    return this.telegram.answerCallbackQuery({
      callback_query_id: this.updates?.id as string,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#answershippingquery
   */
  answerShippingQuery(args: {
    ok: boolean;
    shipping_options?: readonly ShippingOption[];
    error_message?: string;
  }) {
    return this.telegram.answerShippingQuery({
      shipping_query_id: this.updates?.id as string,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#answerprecheckoutquery
   */
  answerPreCheckoutQuery(args: { ok: boolean; error_message?: string }) {
    return this.telegram.answerPreCheckoutQuery({
      pre_checkout_query_id: this.updates?.id as string,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#editmessagetext
   */
  editMessageText(
    text: string,
    args?: {
      message_id?: number;
      parse_mode?: ParseMode;
      entities?: MessageEntity[];
      link_preview_options?: LinkPreviewOptions;
      reply_markup?: InlineKeyboardMarkup;
    },
  ) {
    return this.telegram.editMessageText({
      chat_id: this.chat?.id,
      message_id: this.updates?.message?.message_id,
      inline_message_id: this.inlineMessageId,
      text: text,
      ...args,
    });
  }

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
  ) {
    return this.telegram.editMessageCaption({
      chat_id: this.chat.id,
      message_id: this.messageId,
      inline_message_id: this.inlineMessageId,
      caption: caption,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#editmessagemedia
   */
  editMessageMedia(
    media: InputMedia<F> & MediaPayload,
    reply_markup?: InlineKeyboardMarkup,
  ) {
    return this.telegram.editMessageMedia({
      chat_id: this.chat.id,
      message_id: this.messageId,
      inline_message_id: this.inlineMessageId,
      media: media,
      reply_markup,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#editmessagereplymarkup
   */
  editMessageReplyMarkup(markup?: InlineKeyboardMarkup) {
    return this.telegram.editMessageReplyMarkup({
      chat_id: this.chat.id,
      message_id: this.messageId,
      inline_message_id: this.inlineMessageId,
      reply_markup: markup,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#editmessagelivelocation
   */
  editMessageLiveLocation(replyMarkup?: InlineKeyboardMarkup) {
    return this.telegram.editMessageLiveLocation({
      chat_id: this.chat.id,
      message_id: this.messageId,
      inline_message_id: this.inlineMessageId,
      reply_markup: replyMarkup,
    });
  }

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
  ) {
    return this.telegram.stopMessageLiveLocation({
      chat_id: this.chat.id,
      message_id: this.messageId,
      inline_message_id: this.inlineMessageId,
      latitude,
      longitude,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#sendmessage
   */
  sendMessage(
    text: string,
    args?: {
      parse_mode?: ParseMode;
      entities?: MessageEntity[];
      link_preview_options?: LinkPreviewOptions;
      disable_notification?: boolean;
      protect_content?: boolean;
      reply_parameters?: ReplyParameters;
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    },
  ) {
    return this.telegram.sendMessage(this.chat.id, text, {
      message_thread_id: this.getThreadId,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#getchat
   */
  getChat() {
    return this.telegram.getChat(this.chat.id);
  }

  /**
   * @see https://core.telegram.org/bots/api#exportchatinvitelink
   */
  exportChatInviteLink() {
    return this.telegram.exportChatInviteLink(this.chat.id);
  }

  /**
   * @see https://core.telegram.org/bots/api#createchatinvitelink
   */
  createChatInviteLink(args?: {
    name?: string;
    expire_date?: number;
    member_limit?: number;
    creates_join_request?: boolean;
  }) {
    return this.telegram.createChatInviteLink({
      chat_id: this.chat.id,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#editchatinvitelink
   */
  editChatInviteLink(args: {
    invite_link: string;
    name?: string;
    expire_date?: number;
    member_limit?: number;
    creates_join_request?: boolean;
  }) {
    return this.telegram.editChatInviteLink({
      chat_id: this.chat.id,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#revokechatinvitelink
   */
  revokeChatInviteLink(invite_link: string) {
    return this.telegram.revokeChatInviteLink(invite_link, this.chat.id);
  }

  /**
   * @see https://core.telegram.org/bots/api#banchatmember
   */
  banChatMember(
    userId: number,
    args?: {
      until_date?: number;
      revoke_messages?: boolean;
    },
  ) {
    return this.telegram.banChatMember({
      chat_id: this.chat.id,
      user_id: userId,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#unbanchatmember
   */
  unbanChatMember(userId: number, onlyIfBanned?: boolean) {
    return this.telegram.unbanChatMember({
      chat_id: this.chat.id,
      user_id: userId,
      only_if_banned: onlyIfBanned,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#restrictchatmember
   */
  restrictChatMember(args: {
    user_id: number;
    permissions: ChatPermissions;
    use_independent_chat_permissions?: boolean;
    until_date?: number;
  }) {
    return this.telegram.restrictChatMember({
      chat_id: this.chat.id,
      ...args,
    });
  }

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
  ) {
    return this.telegram.promoteChatMember({
      chat_id: this.chat.id,
      user_id: userId,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#setchatadministratorcustomtitle
   */
  setChatAdministratorCustomTitle(args: {
    user_id: number;
    custom_title: string;
  }) {
    return this.telegram.setChatAdministratorCustomTitle({
      chat_id: this.chat.id,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#setchatphoto
   */
  setChatPhoto(photo: MediaPayload) {
    return this.telegram.setChatPhoto(this.chat.id, photo);
  }

  /**
   * @see https://core.telegram.org/bots/api#deletechatphoto
   */
  deleteChatPhoto() {
    return this.telegram.deleteChatPhoto(this.chat.id);
  }

  /**
   * @see https://core.telegram.org/bots/api#setchattitle
   */
  setChatTitle(title: string) {
    return this.telegram.setChatTitle(this.chat.id, title);
  }

  /**
   * @see https://core.telegram.org/bots/api#setchatdescription
   */
  setChatDescription(description: string) {
    return this.telegram.setChatDescription(this.chat.id, description);
  }

  /**
   * @see https://core.telegram.org/bots/api#pinchatmessage
   */
  pinChatMessage(messageId: number, disableNotification?: boolean) {
    return this.telegram.pinChatMessage({
      chat_id: this.chat.id,
      message_id: messageId,
      disable_notification: disableNotification,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#unpinchatmessage
   */
  unpinChatMessage(messageId: number) {
    return this.telegram.unpinChatMessage(this.chat.id, messageId);
  }

  /**
   * @see https://core.telegram.org/bots/api#unpinallchatmessages
   */
  unpinAllChatMessages() {
    return this.telegram.unpinAllChatMessages(this.chat.id);
  }

  /**
   * @see https://core.telegram.org/bots/api#leavechat
   */
  leaveChat() {
    return this.telegram.leaveChat(this.chat.id);
  }

  /**
   * @see https://core.telegram.org/bots/api#setchatpermissions
   */
  setChatPermissions(
    permissions: ChatPermissions,
    use_independent_chat_permissions?: boolean,
  ) {
    return this.telegram.setChatPermissions({
      chat_id: this.chat.id,
      permissions,
      use_independent_chat_permissions,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#getchatadministrators
   */
  getChatAdministrators() {
    return this.telegram.getChatAdministrators(this.chat.id);
  }

  /**
   * @see https://core.telegram.org/bots/api#getchatmember
   */
  getChatMember(userId: number) {
    return this.telegram.getChatMember(this.chat.id, userId);
  }

  /**
   * @see https://core.telegram.org/bots/api#getchatmemberscount
   */
  getChatMembersCount() {
    return this.telegram.getChatMemberCount(this.chat.id);
  }

  /**
   * @see https://core.telegram.org/bots/api#setpassportdataerrors
   */
  setPassportDataErrors(errors: readonly PassportElementError[]) {
    return this.telegram.setPassportDataErrors(this.from.id, errors);
  }

  /**
   * @see https://core.telegram.org/bots/api#sendphoto
   */
  sendPhoto(
    photo: string | MediaPayload,
    args?: {
      caption?: string;
      parse_mode?: ParseMode;
      caption_entities?: MessageEntity[];
      has_spoiler?: boolean;
      disable_notification?: boolean;
      protect_content?: boolean;
      reply_parameters?: ReplyParameters;
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    },
  ) {
    return this.telegram.sendPhoto({
      chat_id: this.chat.id,
      photo,
      message_thread_id: this.getThreadId,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#sendmediagroup
   */
  sendMediaGroup(
    media: ReadonlyArray<
      (
        | InputMediaAudio<F>
        | InputMediaDocument<F>
        | InputMediaPhoto<F>
        | InputMediaVideo<F>
      ) &
        MediaPayload
    >,
    args?: {
      disable_notification?: boolean;
      protect_content?: boolean;
      reply_parameters?: ReplyParameters;
    },
  ) {
    return this.telegram.sendMediaGroup({
      chat_id: this.chat.id,
      media,
      message_thread_id: this.getThreadId,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#sendaudio
   */
  sendAudio(
    audio: string | MediaPayload,
    args?: {
      caption?: string;
      parse_mode?: ParseMode;
      caption_entities?: MessageEntity[];
      duration?: number;
      performer?: string;
      title?: string;
      thumbnail?: MediaPayload;
      disable_notification?: boolean;
      protect_content?: boolean;
      reply_parameters?: ReplyParameters;
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    },
  ) {
    return this.telegram.sendAudio({
      chat_id: this.chat.id,
      audio,
      message_thread_id: this.getThreadId,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#senddice
   */
  sendDice(args?: {
    emoji?: string;
    disable_notification?: boolean;
    protect_content?: boolean;
    reply_parameters?: ReplyParameters;
    reply_markup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
  }) {
    return this.telegram.sendDice({
      chat_id: this.chat.id,
      message_thread_id: this.getThreadId,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#senddocument
   */
  sendDocument(
    document: string | MediaPayload,
    args?: {
      thumbnail?: MediaPayload;
      caption?: string;
      parse_mode?: ParseMode;
      caption_entities?: MessageEntity[];
      disable_content_type_detection?: boolean;
      disable_notification?: boolean;
      protect_content?: boolean;
      reply_parameters?: ReplyParameters;
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    },
  ) {
    return this.telegram.sendDocument({
      chat_id: this.chat.id,
      document,
      message_thread_id: this.getThreadId,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#sendsticker
   */
  sendSticker(
    sticker: string | MediaPayload,
    args?: {
      emoji?: string;
      disable_notification?: boolean;
      protect_content?: boolean;
      reply_parameters?: ReplyParameters;
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    },
  ) {
    return this.telegram.sendSticker({
      chat_id: this.chat.id,
      sticker,
      message_thread_id: this.getThreadId,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#sendvideo
   */
  sendVideo(
    video: string | MediaPayload,
    args?: {
      duration?: number;
      length?: number;
      thumbnail?: MediaPayload;
      disable_notification?: boolean;
      protect_content?: boolean;
      reply_parameters?: ReplyParameters;
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    },
  ) {
    return this.telegram.sendVideo({
      chat_id: this.chat.id,
      video,
      message_thread_id: this.getThreadId,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#sendanimation
   */
  sendAnimation(
    animation: string | MediaPayload,
    args?: {
      duration?: number;
      width?: number;
      height?: number;
      thumbnail?: MediaPayload;
      caption?: string;
      parse_mode?: ParseMode;
      caption_entities?: MessageEntity[];
      has_spoiler?: boolean;
      disable_notification?: boolean;
      protect_content?: boolean;
      reply_parameters?: ReplyParameters;
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    },
  ) {
    return this.telegram.sendAnimation({
      chat_id: this.chat.id,
      animation,
      message_thread_id: this.getThreadId,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#sendvideonote
   */
  sendVideoNote(
    videoNote: string | MediaPayload,
    args?: {
      duration?: number;
      length?: number;
      thumbnail?: MediaPayload;
      disable_notification?: boolean;
      protect_content?: boolean;
      reply_parameters?: ReplyParameters;
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    },
  ) {
    return this.telegram.sendVideoNote({
      chat_id: this.chat.id,
      video_note: videoNote,
      message_thread_id: this.getThreadId,
      ...args,
    });
  }

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
    reply_parameters?: ReplyParameters;
    reply_markup?: InlineKeyboardMarkup;
  }) {
    return this.telegram.sendInvoice({
      chat_id: this.chat.id,
      message_thread_id: this.getThreadId,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#sendgame
   */
  sendGame(
    gameShortName: string,
    args?: {
      disable_notification?: boolean;
      protect_content?: boolean;
      reply_parameters?: ReplyParameters;
      reply_markup?: InlineKeyboardMarkup;
    },
  ) {
    return this.telegram.sendGame({
      chat_id: this.chat.id,
      game_short_name: gameShortName,
      message_thread_id: this.getThreadId,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#sendvoice
   */
  sendVoice(
    voice: string | MediaPayload,
    args?: {
      caption?: string;
      parse_mode?: ParseMode;
      caption_entities?: MessageEntity[];
      duration?: number;
      performer?: string;
      title?: string;
      thumbnail?: MediaPayload;
      disable_notification?: boolean;
      protect_content?: boolean;
      reply_parameters?: ReplyParameters;
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    },
  ) {
    return this.telegram.sendVoice({
      chat_id: this.chat.id,
      voice,
      message_thread_id: this.getThreadId,
      ...args,
    });
  }

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
      reply_parameters?: ReplyParameters;
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    },
  ) {
    return this.telegram.sendPoll({
      chat_id: this.chat.id,
      options,
      message_thread_id: this.getThreadId,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#stoppoll
   */
  stopPoll(args: { message_id: number; reply_markup?: InlineKeyboardMarkup }) {
    return this.telegram.stopPoll({
      chat_id: this.chat.id,
      ...args,
    });
  }

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
      reply_parameters?: ReplyParameters;
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    },
  ) {
    return this.telegram.sendLocation({
      chat_id: this.chat.id,
      latitude,
      longitude,
      message_thread_id: this.getThreadId,
      ...args,
    });
  }

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
      reply_parameters?: ReplyParameters;
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    },
  ) {
    return this.telegram.sendVenue({
      chat_id: this.chat.id,
      latitude,
      longitude,
      title,
      address,
      message_thread_id: this.getThreadId,
      ...args,
    });
  }

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
      reply_parameters?: ReplyParameters;
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    },
  ) {
    return this.telegram.sendContact({
      chat_id: this.chat.id,
      phone_number: phoneNumber,
      first_name: firstName,
      message_thread_id: this.getThreadId,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#getstickerset
   */
  getStickerSet(name: string) {
    return this.telegram.getStickerSet(name);
  }

  /**
   * @see https://core.telegram.org/bots/api#setchatstickerset
   */
  setChatStickerSet(stickerSetName: string) {
    return this.telegram.setChatStickerSet(stickerSetName, this.chat.id);
  }

  /**
   * @see https://core.telegram.org/bots/api#deletechatstickerset
   */
  deleteChatStickerSet() {
    return this.telegram.deleteChatStickerSet(this.chat.id);
  }

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
  }) {
    return this.telegram.createForumTopic({
      chat_id: this.chat.id,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#editforumtopic
   */
  editForumTopic(args?: { name?: string; icon_custom_emoji_id?: string }) {
    return this.telegram.editForumTopic({
      chat_id: this.chat.id,
      message_thread_id: this.updates.message_thread_id,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#closeforumtopic
   */
  closeForumTopic() {
    return this.telegram.closeForumTopic(
      this.chat.id,
      this.updates.message_thread_id,
    );
  }

  /**
   * @see https://core.telegram.org/bots/api#reopenforumtopic
   */
  reopenForumTopic() {
    return this.telegram.reopenForumTopic(
      this.chat.id,
      this.updates.message_thread_id,
    );
  }

  /**
   * @see https://core.telegram.org/bots/api#deleteforumtopic
   */
  deleteForumTopic() {
    return this.telegram.deleteForumTopic(
      this.chat.id,
      this.updates.message_thread_id,
    );
  }

  /**
   * @see https://core.telegram.org/bots/api#unpinallforumtopicmessages
   */
  unpinAllForumTopicMessages() {
    return this.telegram.unpinAllForumTopicMessages(
      this.chat.id,
      this.updates.message_thread_id,
    );
  }

  /**
   * @see https://core.telegram.org/bots/api#editgeneralforumtopic
   */
  editGeneralForumTopic(name: string) {
    return this.telegram.editGeneralForumTopic(this.chat.id, name);
  }

  /**
   * @see https://core.telegram.org/bots/api#closegeneralforumtopic
   */
  closeGeneralForumTopic() {
    return this.telegram.closeGeneralForumTopic(this.chat.id);
  }

  /**
   * @see https://core.telegram.org/bots/api#reopengeneralforumtopic
   */
  reopenGeneralForumTopic() {
    return this.telegram.reopenGeneralForumTopic(this.chat.id);
  }

  /**
   * @see https://core.telegram.org/bots/api#hidegeneralforumtopic
   */
  hideGeneralForumTopic() {
    return this.telegram.hideGeneralForumTopic(this.chat.id);
  }

  /**
   * @see https://core.telegram.org/bots/api#unhidegeneralforumtopic
   */
  unhideGeneralForumTopic() {
    return this.telegram.unhideGeneralForumTopic(this.chat.id);
  }
  /**
   * @see https://core.telegram.org/bots/api#unpinallgeneralforumtopicmessages
   */
  unpinAllGeneralForumTopicMessages() {
    return this.telegram.unpinAllGeneralForumTopicMessages(this.chat.id);
  }

  /**
   * @see https://core.telegram.org/bots/api#setstickerpositioninset
   */
  setStickerPositionInSet(sticker: string, position: number) {
    return this.telegram.setStickerPositionInSet(sticker, position);
  }

  /**
   * @see https://core.telegram.org/bots/api#setstickersetthumbnail
   */
  setStickerSetThumbnail(args: {
    name: string;
    user_id: number;
    thumbnail?: MediaPayload;
  }) {
    return this.telegram.setStickerSetThumbnail({
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#deletestickerfromset
   */
  deleteStickerFromSet(sticker: string) {
    return this.telegram.deleteStickerFromSet(sticker);
  }

  /**
   * @see https://core.telegram.org/bots/api#uploadstickerfile
   */
  uploadStickerFile(args: {
    sticker_format: "static" | "animated" | "video";
    sticker: MediaPayload;
  }) {
    return this.telegram.uploadStickerFile({
      user_id: this.from.id,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#createnewstickerset
   */
  createNewStickerSet(args: {
    name: string;
    title: string;
    stickers: (InputSticker<F> & MediaPayload)[];
    sticker_format: "static" | "animated" | "video";
    sticker_type?: "regular" | "mask" | "custom_emoji";
    needs_repainting?: boolean;
  }) {
    return this.telegram.createNewStickerSet({
      user_id: this.from.id,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#addstickertoset
   */
  addStickerToSet(args: {
    name: string;
    sticker: InputSticker<F> & MediaPayload;
  }) {
    return this.telegram.addStickerToSet({
      user_id: this.from.id,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#getmycommands
   */
  getMyCommands() {
    return this.telegram.getMyCommands();
  }

  /**
   * @see https://core.telegram.org/bots/api#setmycommands
   */
  setMyCommands(commands: readonly BotCommand[]) {
    return this.telegram.setMyCommands({ commands });
  }

  /**
   * @see https://core.telegram.org/bots/api#setmydescription
   */
  setMyDescription(description: string) {
    return this.telegram.setMyDescription(description);
  }

  /**
   * @see https://core.telegram.org/bots/api#getmydescription
   */
  getMyDescription() {
    return this.telegram.getMyDescription();
  }

  /**
   * @see https://core.telegram.org/bots/api#setmyshortdescription
   */
  setMyShortDescription(shortDescription: string) {
    return this.telegram.setMyShortDescription(shortDescription);
  }

  /**
   * @see https://core.telegram.org/bots/api#getmyshortdescription
   */
  getMyShortDescription() {
    return this.telegram.getMyShortDescription();
  }

  /**
   * @see https://core.telegram.org/bots/api#setmyname
   */
  setMyName(name: string) {
    return this.telegram.setMyName(name);
  }

  /**
   * @see https://core.telegram.org/bots/api#getmyname
   */
  getMyName() {
    return this.telegram.getMyName();
  }

  /**
   * @see https://core.telegram.org/bots/api#sendmessage
   */
  replyWithMarkdown(
    text: string,
    args?: {
      message_thread_id?: number;
      entities?: MessageEntity[];
      link_preview_options?: LinkPreviewOptions;
      disable_notification?: boolean;
      protect_content?: boolean;
      reply_parameters?: ReplyParameters;
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    },
  ) {
    return this.reply(text, {
      parse_mode: "Markdown",
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#sendmessage
   */
  replyWithMarkdownV2(
    text: string,
    args?: {
      message_thread_id?: number;
      entities?: MessageEntity[];
      link_preview_options?: LinkPreviewOptions;
      disable_notification?: boolean;
      protect_content?: boolean;
      reply_parameters?: ReplyParameters;
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    },
  ) {
    return this.reply(text, {
      parse_mode: "MarkdownV2",
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#sendmessage
   */
  replyWithHTML(
    text: string,
    args?: {
      message_thread_id?: number;
      entities?: MessageEntity[];
      link_preview_options?: LinkPreviewOptions;
      disable_notification?: boolean;
      protect_content?: boolean;
      reply_parameters?: ReplyParameters;
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    },
  ) {
    return this.reply(text, {
      parse_mode: "HTML",
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#deletemessage
   */
  deleteMessage(messageId?: number) {
    if (typeof messageId !== "undefined") {
      return this.telegram.deleteMessage(this.chat.id, messageId);
    }
    return this.telegram.deleteMessage(this.chat.id, this.messageId);
  }

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
  ) {
    return this.telegram.forwardMessage({
      chat_id: chatId,
      message_thread_id: this.chat.id,
      from_chat_id: this.messageId,
      ...args,
    });
  }

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
      reply_parameters?: ReplyParameters;
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    },
  ) {
    return this.telegram.copyMessage({
      chat_id: chatId,
      message_thread_id: this.chat.id,
      from_chat_id: this.messageId,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#approvechatjoinrequest
   */
  approveChatJoinRequest(userId: number) {
    return this.telegram.approveChatJoinRequest(this.chat.id, userId);
  }

  /**
   * @see https://core.telegram.org/bots/api#declinechatjoinrequest
   */
  declineChatJoinRequest(userId: number) {
    return this.telegram.declineChatJoinRequest(this.chat.id, userId);
  }

  /**
   * @see https://core.telegram.org/bots/api#banchatsenderchat
   */
  banChatSenderChat(senderChatId: number) {
    return this.telegram.banChatSenderChat(this.chat.id, senderChatId);
  }

  /**
   * @see https://core.telegram.org/bots/api#unbanchatsenderchat
   */
  unbanChatSenderChat(senderChatId: number) {
    return this.telegram.unbanChatSenderChat(this.chat.id, senderChatId);
  }

  /**
   * @see https://core.telegram.org/bots/api#setchatmenubutton
   */
  setChatMenuButton(menuButton?: MenuButton) {
    return this.telegram.setChatMenuButton(this.chat.id, menuButton);
  }

  /**
   * @see https://core.telegram.org/bots/api#getchatmenubutton
   */
  getChatMenuButton() {
    return this.telegram.getChatMenuButton(this.chat.id);
  }

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
  ) {
    return this.telegram.setGameScore({
      user_id: userId,
      score,
      ...args,
    });
  }

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
  ) {
    return this.telegram.getGameHighScores({
      user_id: userId,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#setmessagereaction
   */
  react(
    emoji: ReactionTypeEmoji["emoji"] | string,
    custom_emoji?: boolean,
    is_big?: boolean,
    chat_id?: number | string,
    message_id?: number,
  ) {
    const reaction = isReactionTypeEmoji({
      emoji,
      type: custom_emoji === true ? "custom_emoji" : "emoji",
    })
      ? { emoji, type: "emoji" }
      : { custom_emoji: emoji, type: "custom_emoji" };
    return this.telegram.setMessageReaction({
      is_big,
      reaction: [reaction as ReactionType],
      chat_id: this.chat.id,
      message_id: this.messageId,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#sendmessage
   */
  reply(
    text: string,
    args?: {
      message_thread_id?: number;
      parse_mode?: ParseMode;
      entities?: MessageEntity[];
      link_preview_options?: LinkPreviewOptions;
      disable_notification?: boolean;
      protect_content?: boolean;
      reply_parameters?: ReplyParameters;
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    },
  ) {
    return this.telegram.sendMessage(this.chat.id, text, {
      reply_parameters: { message_id: this.messageId },
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#sendmessage
   */
  send(
    text: string,
    args?: {
      message_thread_id?: number;
      parse_mode?: ParseMode;
      entities?: MessageEntity[];
      link_preview_options?: LinkPreviewOptions;
      disable_notification?: boolean;
      protect_content?: boolean;
      reply_parameters?: ReplyParameters;
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    },
  ) {
    return this.telegram.sendMessage(this.chat.id, text, {
      ...args,
    });
  }

  messageCollector(
    filter?: MessageFilter<F>,
    time?: number,
    max?: number,
    caption?: boolean,
  ): MessageCollector<F> {
    const message = new MessageCollector<F>({
      chatId: this.chat.id,
      filter,
      time,
      max,
      caption,
    });
    this.telegram.on(["message:text", "message:caption"], async function (ctx) {
      await message.handleMessage(ctx as TextCaptionContextMessage<F>);
    });
    return message;
  }
}

export { Combined, onlyEmiji, ResponseApi };
