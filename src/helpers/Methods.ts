import {
  MessageCollector,
  MessageFilter,
  TextCaptionContextMessage,
} from "../collection/MessageCollector";
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

class Methods<F> {
  updates: any;
  bot: any;

  constructor(updates: any, bot: any) {
    this.updates = updates;
    this.bot = bot;
  }

  get getThreadId() {
    const msg = this.getMessageFromAnySource;
    return this.updates.is_topic_message
      ? this.updates.message_thread_id
      : undefined;
  }

  get getMessageFromAnySource() {
    return this.updates;
  }

  get messageId(): number {
    const messageId =
      this.updates.message_id ?? this.updates.message?.message_id;
    return messageId as number;
  }

  get from() {
    const from = this.updates.from ?? this.updates.message?.from;
    if (!from) {
      throw Error("From is not available");
    }
    return from;
  }

  get chat(): Chat {
    const chat = this.updates?.chat ?? this.updates.message?.chat;
    if (!chat) {
      throw Error("Chat is not available");
    }
    return chat;
  }

  get inlineMessageId() {
    const inlineMessageId = (this.updates as any)?.inline_message_id;
    return inlineMessageId;
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
    return this.bot.answerInlineQuery({
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
    return this.bot.answerCallbackQuery({
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
    return this.bot.answerShippingQuery({
      shipping_query_id: this.updates?.id as string,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#answerprecheckoutquery
   */
  answerPreCheckoutQuery(args: { ok: boolean; error_message?: string }) {
    return this.bot.answerPreCheckoutQuery({
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
      disable_web_page_preview?: boolean;
      reply_markup?: InlineKeyboardMarkup;
    },
  ) {
    return this.bot.editMessageText({
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
    return this.bot.editMessageCaption({
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
  editMessageMedia(media: InputMedia<F>, reply_markup?: InlineKeyboardMarkup) {
    return this.bot.editMessageMedia({
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
    return this.bot.editMessageReplyMarkup({
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
    return this.bot.editMessageLiveLocation({
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
    return this.bot.stopMessageLiveLocation({
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
  ) {
    return this.bot.sendMessage({
      chat_id: this.chat.id,
      text,
      message_thread_id: this.getThreadId,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#getchat
   */
  getChat() {
    return this.bot.getChat(this.chat.id);
  }

  /**
   * @see https://core.telegram.org/bots/api#exportchatinvitelink
   */
  exportChatInviteLink() {
    return this.bot.exportChatInviteLink(this.chat.id);
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
    return this.bot.createChatInviteLink({
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
    return this.bot.editChatInviteLink({
      chat_id: this.chat.id,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#revokechatinvitelink
   */
  revokeChatInviteLink(invite_link: string) {
    return this.bot.revokeChatInviteLink({
      chat_id: this.chat.id,
      invite_link,
    });
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
    return this.bot.banChatMember({
      chat_id: this.chat.id,
      user_id: userId,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#kickchatmember
   */
  get kickChatMember() {
    return this.banChatMember;
  }

  /**
   * @see https://core.telegram.org/bots/api#unbanchatmember
   */
  unbanChatMember(userId: number, onlyIfBanned?: boolean) {
    return this.bot.unbanChatMember({
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
    return this.bot.restrictChatMember({
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
      can_edit_messages?: boolean;
      can_delete_messages?: boolean;
      can_manage_video_chats?: boolean;
      can_restrict_members?: boolean;
      can_promote_members?: boolean;
      can_change_info?: boolean;
      can_invite_users?: boolean;
      can_pin_messages?: boolean;
      can_manage_topics?: boolean;
    },
  ) {
    return this.bot.promoteChatMember({
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
    return this.bot.setChatAdministratorCustomTitle({
      chat_id: this.chat.id,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#setchatphoto
   */
  setChatPhoto(photo: F) {
    return this.bot.setChatPhoto({
      chat_id: this.chat.id,
      photo,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#deletechatphoto
   */
  deleteChatPhoto() {
    return this.bot.deleteChatPhoto(this.chat.id);
  }

  /**
   * @see https://core.telegram.org/bots/api#setchattitle
   */
  setChatTitle(title: string) {
    return this.bot.setChatTitle({
      chat_id: this.chat.id,
      title,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#setchatdescription
   */
  setChatDescription(description: string) {
    return this.bot.setChatDescription({
      chat_id: this.chat.id,
      description,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#pinchatmessage
   */
  pinChatMessage(messageId: number, disableNotification?: boolean) {
    return this.bot.pinChatMessage({
      chat_id: this.chat.id,
      message_id: messageId,
      disable_notification: disableNotification,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#unpinchatmessage
   */
  unpinChatMessage(messageId: number) {
    return this.bot.unpinChatMessage({
      chat_id: this.chat.id,
      message_id: messageId,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#unpinallchatmessages
   */
  unpinAllChatMessages() {
    return this.bot.unpinAllChatMessages(this.chat.id);
  }

  /**
   * @see https://core.telegram.org/bots/api#leavechat
   */
  leaveChat() {
    return this.bot.leaveChat(this.chat.id);
  }

  /**
   * @see https://core.telegram.org/bots/api#setchatpermissions
   */
  setChatPermissions(
    permissions: ChatPermissions,
    use_independent_chat_permissions?: boolean,
  ) {
    return this.bot.setChatPermissions({
      chat_id: this.chat.id,
      permissions,
      use_independent_chat_permissions,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#getchatadministrators
   */
  getChatAdministrators() {
    return this.bot.getChatAdministrators(this.chat.id);
  }

  /**
   * @see https://core.telegram.org/bots/api#getchatmember
   */
  getChatMember(userId: number) {
    return this.bot.getChatMember({
      chat_id: this.chat.id,
      user_id: userId,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#getchatmemberscount
   */
  getChatMembersCount() {
    return this.bot.getChatMemberCount(this.chat.id);
  }

  /**
   * @see https://core.telegram.org/bots/api#setpassportdataerrors
   */
  setPassportDataErrors(errors: readonly PassportElementError[]) {
    return this.bot.setPassportDataErrors({
      user_id: this.from.id,
      errors,
    });
  }

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
  ) {
    return this.bot.sendPhoto({
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
  ) {
    return this.bot.sendMediaGroup({
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
  ) {
    return this.bot.sendAudio({
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
    reply_to_message_id?: number;
    allow_sending_without_reply?: boolean;
    reply_markup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
  }) {
    return this.bot.sendDice({
      chat_id: this.chat.id,
      message_thread_id: this.getThreadId,
      ...args,
    });
  }

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
  ) {
    return this.bot.sendDocument({
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
  ) {
    return this.bot.sendSticker({
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
  ) {
    return this.bot.sendVideo({
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
  ) {
    return this.bot.sendAnimation({
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
  ) {
    return this.bot.sendVideoNote({
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
    reply_to_message_id?: number;
    allow_sending_without_reply?: boolean;
    reply_markup?: InlineKeyboardMarkup;
  }) {
    return this.bot.sendInvoice({
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
      reply_to_message_id?: number;
      allow_sending_without_reply?: boolean;
      reply_markup?: InlineKeyboardMarkup;
    },
  ) {
    return this.bot.sendGame({
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
  ) {
    return this.bot.sendVoice({
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
      reply_to_message_id?: number;
      allow_sending_without_reply?: boolean;
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    },
  ) {
    return this.bot.sendPoll({
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
    return this.bot.stopPoll({
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
      reply_to_message_id?: number;
      allow_sending_without_reply?: boolean;
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    },
  ) {
    return this.bot.sendLocation({
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
      reply_to_message_id?: number;
      allow_sending_without_reply?: boolean;
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    },
  ) {
    return this.bot.sendVenue({
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
      reply_to_message_id?: number;
      allow_sending_without_reply?: boolean;
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    },
  ) {
    return this.bot.sendContact({
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
    return this.bot.getStickerSet(name);
  }

  /**
   * @see https://core.telegram.org/bots/api#setchatstickerset
   */
  setChatStickerSet(stickerSetName: string) {
    return this.bot.setChatStickerSet({
      chat_id: this.chat.id,
      sticker_set_name: stickerSetName,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#deletechatstickerset
   */
  deleteChatStickerSet() {
    return this.bot.deleteChatStickerSet(this.chat.id);
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
    return this.bot.createForumTopic({
      chat_id: this.chat.id,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#editforumtopic
   */
  editForumTopic(args?: { name?: string; icon_custom_emoji_id?: string }) {
    return this.bot.editForumTopic({
      chat_id: this.chat.id,
      message_thread_id: this.updates.message_thread_id,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#closeforumtopic
   */
  closeForumTopic() {
    return this.bot.closeForumTopic({
      chat_id: this.chat.id,
      message_thread_id: this.updates.message_thread_id,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#reopenforumtopic
   */
  reopenForumTopic() {
    return this.bot.reopenForumTopic({
      chat_id: this.chat.id,
      message_thread_id: this.updates.message_thread_id,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#deleteforumtopic
   */
  deleteForumTopic() {
    return this.bot.deleteForumTopic({
      chat_id: this.chat.id,
      message_thread_id: this.updates.message_thread_id,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#unpinallforumtopicmessages
   */
  unpinAllForumTopicMessages() {
    return this.bot.unpinAllForumTopicMessages({
      chat_id: this.chat.id,
      message_thread_id: this.updates.message_thread_id,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#editgeneralforumtopic
   */
  editGeneralForumTopic(name: string) {
    return this.bot.editGeneralForumTopic({
      chat_id: this.chat.id,
      name,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#closegeneralforumtopic
   */
  closeGeneralForumTopic() {
    return this.bot.closeGeneralForumTopic(this.chat.id);
  }

  /**
   * @see https://core.telegram.org/bots/api#reopengeneralforumtopic
   */
  reopenGeneralForumTopic() {
    return this.bot.reopenGeneralForumTopic(this.chat.id);
  }

  /**
   * @see https://core.telegram.org/bots/api#hidegeneralforumtopic
   */
  hideGeneralForumTopic() {
    return this.bot.hideGeneralForumTopic(this.chat.id);
  }

  /**
   * @see https://core.telegram.org/bots/api#unhidegeneralforumtopic
   */
  unhideGeneralForumTopic() {
    return this.bot.unhideGeneralForumTopic(this.chat.id);
  }

  /**
   * @see https://core.telegram.org/bots/api#setstickerpositioninset
   */
  setStickerPositionInSet(sticker: string, position: number) {
    return this.bot.setStickerPositionInSet({
      sticker,
      position,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#setstickersetthumbnail
   */
  setStickerSetThumbnail(args: {
    name: string;
    user_id: number;
    thumbnail?: F;
  }) {
    return this.bot.setStickerSetThumbnail({
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#deletestickerfromset
   */
  deleteStickerFromSet(sticker: string) {
    return this.bot.deleteStickerFromSet(sticker);
  }

  /**
   * @see https://core.telegram.org/bots/api#uploadstickerfile
   */
  uploadStickerFile(args: {
    sticker_format: "static" | "animated" | "video";
    sticker: F;
  }) {
    return this.bot.uploadStickerFile({
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
    stickers: InputSticker<F>[];
    sticker_format: "static" | "animated" | "video";
    sticker_type?: "regular" | "mask" | "custom_emoji";
    needs_repainting?: boolean;
  }) {
    return this.bot.createNewStickerSet({
      user_id: this.from.id,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#addstickertoset
   */
  addStickerToSet(args: { name: string; sticker: InputSticker<F> }) {
    return this.bot.addStickerToSet({
      user_id: this.from.id,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#getmycommands
   */
  getMyCommands() {
    return this.bot.getMyCommands();
  }

  /**
   * @see https://core.telegram.org/bots/api#setmycommands
   */
  setMyCommands(commands: readonly BotCommand[]) {
    return this.bot.setMyCommands({
      commands,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#setmydescription
   */
  setMyDescription(description: string) {
    return this.bot.setMyDescription({
      description,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#getmydescription
   */
  getMyDescription() {
    return this.bot.getMyDescription();
  }

  /**
   * @see https://core.telegram.org/bots/api#setmyshortdescription
   */
  setMyShortDescription(short_description: string) {
    return this.bot.setMyShortDescription({
      short_description,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#getmyshortdescription
   */
  getMyShortDescription() {
    return this.bot.getMyShortDescription();
  }

  /**
   * @see https://core.telegram.org/bots/api#setmyname
   */
  setMyName(name: string) {
    return this.bot.setMyName({
      name,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#getmyname
   */
  getMyName() {
    return this.bot.getMyName();
  }

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
      return this.bot.deleteMessage({
        chat_id: this.chat.id,
        message_id: messageId,
      });
    }
    return this.bot.deleteMessage({
      chat_id: this.chat.id,
      message_id: this.messageId,
    });
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
    return this.bot.forwardMessage({
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
      reply_to_message_id?: number;
      allow_sending_without_reply?: boolean;
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    },
  ) {
    return this.bot.copyMessage({
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
    return this.bot.approveChatJoinRequest({
      chat_id: this.chat.id,
      user_id: userId,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#declinechatjoinrequest
   */
  declineChatJoinRequest(userId: number) {
    return this.bot.declineChatJoinRequest({
      chat_id: this.chat.id,
      user_id: userId,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#banchatsenderchat
   */
  banChatSenderChat(senderChatId: number) {
    return this.bot.banChatSenderChat({
      chat_id: this.chat.id,
      sender_chat_id: senderChatId,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#unbanchatsenderchat
   */
  unbanChatSenderChat(senderChatId: number) {
    return this.bot.unbanChatSenderChat({
      chat_id: this.chat.id,
      sender_chat_id: senderChatId,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#setchatmenubutton
   */
  setChatMenuButton(menuButton?: MenuButton) {
    return this.bot.setChatMenuButton({
      chat_id: this.chat.id,
      menu_button: menuButton,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#getchatmenubutton
   */
  getChatMenuButton() {
    return this.bot.getChatMenuButton(this.chat.id);
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
    return this.bot.setGameScore({
      user_id: userId,
      score,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#getgamehighscores
   */
  async getGameHighScores(
    userId: number,
    args?: {
      chat_id?: number;
      message_id?: number;
      inline_message_id?: string;
    },
  ) {
    return this.bot.getGameHighScores({
      user_id: userId,
      ...args,
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
  ) {
    return this.bot.sendMessage({
      text: text,
      chat_id: this.chat.id,
      reply_to_message_id: this.messageId,
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
  ) {
    return this.bot.sendMessage({
      text: text,
      chat_id: this.chat.id,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#leavechat
   */
  leave() {
    return this.bot.leaveChat(this.chat.id);
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
    this.bot.on("message", (ctx: TextCaptionContextMessage<F>) => {
      message.handleMessage(ctx);
    });
    return message;
  }
}

export { Methods };
