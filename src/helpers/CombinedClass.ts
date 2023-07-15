import { TelegramBot } from "../TelegramBot";
import { ParameterError } from "../errorcollection";
import { MessageCollector } from "../collection/MessageCollector";
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

type MessageTypeMap = {
  [key: string]: {
    event: string;
    textEvent?: string;
    captionEvent?: string;
  };
};

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

const messageTypeMap: MessageTypeMap = {
  message: {
    event: "message",
    textEvent: "text",
  },
  edited_message: {
    event: "edited_message",
    textEvent: "edited_message_text",
    captionEvent: "edited_message_caption",
  },
  channel_post: {
    event: "channel_post",
  },
  edited_channel_post: {
    event: "edited_channel_post",
    textEvent: "edited_channel_post_text",
    captionEvent: "edited_channel_post_caption",
  },
  inline_query: {
    event: "inline_query",
  },
  chosen_inline_result: {
    event: "chosen_inline_result",
  },
  callback_query: {
    event: "callback_query",
  },
  shipping_query: {
    event: "shipping_query",
  },
  pre_checkout_query: {
    event: "pre_checkout_query",
  },
  poll: {
    event: "poll",
  },
  poll_answer: {
    event: "poll_answer",
  },
  chat_member: {
    event: "chat_member",
  },
  my_chat_member: {
    event: "my_chat_member",
  },
  chat_join_request: {
    event: "chat_join_request",
  },
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

class CombinedClass<F> {
  bot: TelegramBot<F>;
  updates!: ResponseApi;
  botInfo?: botInfo;

  constructor(bot: TelegramBot<F>, botInfo?: botInfo) {
    this.bot = bot;
    this.botInfo = botInfo;
  }

  get getThreadId() {
    const msg = this.getMessageFromAnySource;
    return this.updates?.is_topic_message
      ? this.updates?.message_thread_id
      : undefined;
  }

  get getMessageFromAnySource() {
    return (
      this.editedMessage ??
      this.callbackQuery?.message ??
      this.channelPost ??
      this.editedChannelPost ??
      this.updates
    );
  }

  get me(): string | undefined {
    const me = this.botInfo?.username;
    return me;
  }

  get messageId(): number | undefined {
    const messageId = this.updates.message_id;
    return messageId;
  }

  get editedMessage():
    | (Message & Update.Edited & Update.NonChannel)
    | undefined {
    const editedMessage = this.updates?.edited_message;
    return editedMessage;
  }

  get inlineQuery(): InlineQuery | undefined {
    const inlineQuery = this.updates?.inline_query;
    return inlineQuery;
  }

  get shippingQuery(): ShippingQuery | undefined {
    const shippingQuery = this.updates?.shipping_query;
    return shippingQuery;
  }

  get preCheckoutQuery(): PreCheckoutQuery | undefined {
    const preCheckoutQuery = this.updates?.pre_checkout_query;
    return preCheckoutQuery;
  }

  get chosenInlineResult(): ChosenInlineResult | undefined {
    const chosenInlineResult = this.updates?.chosen_inline_result;
    return chosenInlineResult;
  }

  get channelPost(): (Message & Update.Channel) | undefined {
    const channelPost = this.updates?.channel_post;
    return channelPost;
  }

  get editedChannelPost():
    | (Message & Update.Edited & Update.Channel)
    | undefined {
    const editedChannelPost = this.updates?.edited_channel_post;
    return editedChannelPost;
  }

  get callbackQuery(): CallbackQuery | undefined {
    const callbackQuery = this.updates?.callback_query;
    return callbackQuery;
  }

  get poll(): Poll | undefined {
    const poll = this.updates?.poll;
    return poll;
  }

  get pollAnswer(): PollAnswer | undefined {
    const pollAnswer = this.updates?.poll_answer;
    return pollAnswer;
  }

  get myChatMember(): ChatMemberUpdated | undefined {
    const myChatMember = this.updates?.my_chat_member;
    return myChatMember;
  }

  get chatMember(): ChatMemberUpdated | undefined {
    const chatMember = this.updates?.chat_member;
    return chatMember;
  }

  get chatJoinRequest(): ChatJoinRequest | undefined {
    const chatJoinRequest = this.updates?.chat_join_request;
    return chatJoinRequest;
  }

  get chat(): Chat {
    const chat = (
      this.chatMember ??
      this.myChatMember ??
      this.chatJoinRequest ??
      this.updates
    )?.chat;
    if (!chat) {
      throw new Error("Chat is not available");
    }
    return chat;
  }

  get senderChat() {
    const senderChat = this.updates?.sender_chat;
    return senderChat;
  }

  get from() {
    const from = (
      this.callbackQuery ??
      this.inlineQuery ??
      this.shippingQuery ??
      this.preCheckoutQuery ??
      this.chosenInlineResult ??
      this.chatMember ??
      this.myChatMember ??
      this.chatJoinRequest ??
      this.getMessageFromAnySource
    )?.from;
    if (!from) {
      throw new Error("From is not available");
    }
    return from;
  }

  get inlineMessageId() {
    const inlineMessageId = (this.callbackQuery ?? this.chosenInlineResult)
      ?.inline_message_id;
    if (!inlineMessageId) {
      throw new Error("inlineMessageId is not available");
    }
    return inlineMessageId;
  }

  get passportData() {
    if (this.updates == null) return undefined;
    if (!("passport_data" in this.updates)) return undefined;
    return this.updates?.passport_data;
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
      inline_query_id: this.inlineQuery?.id as string,
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
      callback_query_id: this.callbackQuery?.id as string,
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
      shipping_query_id: this.shippingQuery?.id as string,
      ...args,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#answerprecheckoutquery
   */
  answerPreCheckoutQuery(args: { ok: boolean; error_message?: string }) {
    return this.bot.answerPreCheckoutQuery({
      pre_checkout_query_id: this.preCheckoutQuery?.id as string,
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
    }
  ) {
    return this.bot.editMessageText({
      chat_id: this.chat?.id,
      message_id: this.callbackQuery?.message?.message_id,
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
    }
  ) {
    return this.bot.editMessageCaption({
      chat_id: this.chat?.id,
      message_id: this.callbackQuery?.message?.message_id,
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
      chat_id: this.chat?.id,
      message_id: this.callbackQuery?.message?.message_id,
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
      chat_id: this.chat?.id,
      message_id: this.callbackQuery?.message?.message_id,
      inline_message_id: this.inlineMessageId,
      reply_markup: markup,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#editmessagelivelocation
   */
  editMessageLiveLocation(replyMarkup?: InlineKeyboardMarkup) {
    return this.bot.editMessageLiveLocation({
      chat_id: this.chat?.id,
      message_id: this.callbackQuery?.message?.message_id,
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
    }
  ) {
    return this.bot.stopMessageLiveLocation({
      chat_id: this.chat?.id,
      message_id: this.callbackQuery?.message?.message_id,
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
    }
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
    }
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
    }
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
    use_independent_chat_permissions?: boolean
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    const message = this.getMessageFromAnySource;
    return this.bot.deleteMessage({
      chat_id: this.chat.id,
      message_id: message.message_id as number,
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
    }
  ) {
    const message = this.getMessageFromAnySource;
    return this.bot.forwardMessage({
      chat_id: chatId,
      message_thread_id: message.chat?.id,
      from_chat_id: message.message_id as number,
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
    }
  ) {
    const message = this.getMessageFromAnySource;
    return this.bot.copyMessage({
      chat_id: chatId,
      message_thread_id: message.chat?.id as number,
      from_chat_id: message.message_id as number,
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
    }
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
    }
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
    filter?: Function,
    time?: number,
    max?: number
  ): MessageCollector {
    const message = new MessageCollector({
      chatId: this.chat.id,
      filter,
      time,
      max,
    });
    this.bot.on("message", (ctx: Message) => {
      message.handleMessage(ctx);
    });
    return message;
  }

  async processUpdate(webhook?: Update[]) {
    let getUpdates;
    while (true) {
      if (!webhook) {
        getUpdates = await this.bot.getUpdates();
      } else {
        getUpdates = await webhook;
      }
      for (const update of getUpdates) {
        for (const [type, options] of Object.entries(messageTypeMap)) {
          const updateProperty: any = (update as ResponseApi)[
            type as keyof ResponseApi
          ];
          this.updates = updateProperty as ResponseApi;
          if (updateProperty) {
            const chat: any = Object.assign({}, updateProperty.chat, {
              send: (
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
                }
              ) => this.send(text, args),
              leave: () => this.leave(),
            });
            const message: any = {
              ...updateProperty,
              chat,
              telegram: this.bot,
              reply: (
                text: string,
                args?: {
                  message_thread_id?: number;
                  parse_mode?: ParseMode;
                  entities?: MessageEntity[];
                  disable_web_page_preview?: boolean;
                  disable_notification?: boolean;
                  protect_content?: boolean;
                  allow_sending_without_reply?: boolean;
                  reply_markup?:
                    | InlineKeyboardMarkup
                    | ReplyKeyboardMarkup
                    | ReplyKeyboardRemove
                    | ForceReply;
                }
              ) => this.reply(text, args),
              answerInlineQuery: (args: {
                results: readonly InlineQueryResult[];
                cache_time?: number;
                is_personal?: boolean;
                next_offset?: string;
                button?: InlineQueryResultsButton;
              }) => this.answerInlineQuery(args),
              answerCallbackQuery: (args?: {
                text?: string;
                show_alert?: boolean;
                url?: string;
                cache_time?: number;
              }) => this.answerCallbackQuery(args),
              answerShippingQuery: (args: {
                ok: boolean;
                shipping_options?: readonly ShippingOption[];
                error_message?: string;
              }) => this.answerShippingQuery(args),
              answerPreCheckoutQuery: (args: {
                ok: boolean;
                error_message?: string;
              }) => this.answerPreCheckoutQuery(args),
              editMessageText: (
                text: string,
                args?: {
                  message_id?: number;
                  parse_mode?: ParseMode;
                  entities?: MessageEntity[];
                  disable_web_page_preview?: boolean;
                  reply_markup?: InlineKeyboardMarkup;
                }
              ) => this.editMessageText(text, args),
              editMessageCaption: (
                caption?: string,
                args?: {
                  parse_mode?: ParseMode;
                  caption_entities?: MessageEntity[];
                  reply_markup?: InlineKeyboardMarkup;
                }
              ) => this.editMessageCaption(caption, args),
              editMessageMedia: (
                media: InputMedia<F>,
                reply_markup?: InlineKeyboardMarkup
              ) => this.editMessageMedia(media, reply_markup),
              editMessageReplyMarkup: (markup?: InlineKeyboardMarkup) =>
                this.editMessageReplyMarkup(markup),
              editMessageLiveLocation: (replyMarkup?: InlineKeyboardMarkup) =>
                this.editMessageLiveLocation(replyMarkup),
              stopMessageLiveLocation: (
                latitude: number,
                longitude: number,
                args?: {
                  horizontal_accuracy?: number;
                  heading?: number;
                  proximity_alert_radius?: number;
                  reply_markup?: InlineKeyboardMarkup;
                }
              ) => this.stopMessageLiveLocation(latitude, longitude, args),
              sendMessage: (
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
                }
              ) => this.sendMessage(text, args),
              getChat: () => this.getChat(),
              exportChatInviteLink: () => this.exportChatInviteLink(),
              createChatInviteLink: (args?: {
                name?: string;
                expire_date?: number;
                member_limit?: number;
                creates_join_request?: boolean;
              }) => this.createChatInviteLink(args),
              editChatInviteLink: (args: {
                invite_link: string;
                name?: string;
                expire_date?: number;
                member_limit?: number;
                creates_join_request?: boolean;
              }) => this.editChatInviteLink(args),
              revokeChatInviteLink: (invite_link: string) =>
                this.revokeChatInviteLink(invite_link),
              banChatMember: (
                userId: number,
                args?: {
                  until_date?: number;
                  revoke_messages?: boolean;
                }
              ) => this.banChatMember(userId, args),
              kickChatMember: () => this.kickChatMember,
              unbanChatMember: (userId: number, onlyIfBanned?: boolean) =>
                this.unbanChatMember(userId, onlyIfBanned),
              restrictChatMember: (args: {
                user_id: number;
                permissions: ChatPermissions;
                use_independent_chat_permissions?: boolean;
                until_date?: number;
              }) => this.restrictChatMember(args),
              promoteChatMember: (
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
                }
              ) => this.promoteChatMember(userId, args),
              setChatAdministratorCustomTitle: (args: {
                user_id: number;
                custom_title: string;
              }) => this.setChatAdministratorCustomTitle(args),
              setChatPhoto: (photo: F) => this.setChatPhoto(photo),
              deleteChatPhoto: () => this.deleteChatPhoto(),
              setChatTitle: (title: string) => this.setChatTitle(title),
              setChatDescription: (description: string) =>
                this.setChatDescription(description),
              pinChatMessage: (
                messageId: number,
                disableNotification?: boolean
              ) => this.pinChatMessage(messageId, disableNotification),
              unpinChatMessage: (messageId: number) =>
                this.unpinChatMessage(messageId),
              unpinAllChatMessages: () => this.unpinAllChatMessages(),
              leaveChat: () => this.leaveChat(),
              setChatPermissions: (
                permissions: ChatPermissions,
                use_independent_chat_permissions?: boolean
              ) =>
                this.setChatPermissions(
                  permissions,
                  use_independent_chat_permissions
                ),
              getChatAdministrators: () => this.getChatAdministrators(),
              getChatMember: (userId: number) => this.getChatMember(userId),
              getChatMembersCount: () => this.getChatMembersCount(),
              setPassportDataErrors: (
                errors: readonly PassportElementError[]
              ) => this.setPassportDataErrors(errors),
              sendPhoto: (
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
                }
              ) => this.sendPhoto(photo, args),
              sendMediaGroup: (
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
                }
              ) => this.sendMediaGroup(media, args),
              sendAudio: (
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
                }
              ) => this.sendAudio(audio, args),
              sendDice: (args?: {
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
              }) => this.sendDice(args),
              sendDocument: (
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
                }
              ) => this.sendDocument(document, args),
              sendSticker: (
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
                }
              ) => this.sendSticker(sticker, args),
              sendVideo: (
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
                }
              ) => this.sendVideo(video, args),
              sendAnimation: (
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
                }
              ) => this.sendAnimation(animation, args),
              sendVideoNote: (
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
                }
              ) => this.sendVideoNote(videoNote, args),
              sendInvoice: (args: {
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
              }) => this.sendInvoice(args),
              sendGame: (
                gameShortName: string,
                args?: {
                  disable_notification?: boolean;
                  protect_content?: boolean;
                  reply_to_message_id?: number;
                  allow_sending_without_reply?: boolean;
                  reply_markup?: InlineKeyboardMarkup;
                }
              ) => this.sendGame(gameShortName, args),
              sendVoice: (
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
                }
              ) => this.sendVoice(voice, args),
              sendPoll: (
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
                }
              ) => this.sendPoll(options, args),
              stopPoll: (args: {
                message_id: number;
                reply_markup?: InlineKeyboardMarkup;
              }) => this.stopPoll(args),
              sendLocation: (
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
                }
              ) => this.sendLocation(latitude, longitude, args),
              sendVenue: (
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
                }
              ) => this.sendVenue(latitude, longitude, title, address, args),
              sendContact: (
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
                }
              ) => this.sendContact(phoneNumber, firstName, args),
              getStickerSet: (name: string) => this.getStickerSet(name),
              setChatStickerSet: (stickerSetName: string) =>
                this.setChatStickerSet(stickerSetName),
              deleteChatStickerSet: () => this.deleteChatStickerSet(),
              createForumTopic: (args: {
                name: string;
                icon_color?:
                  | 0x6fb9f0
                  | 0xffd67e
                  | 0xcb86db
                  | 0x8eee98
                  | 0xff93b2
                  | 0xfb6f5f;
                icon_custom_emoji_id?: string;
              }) => this.createForumTopic(args),
              editForumTopic: (args?: {
                name?: string;
                icon_custom_emoji_id?: string;
              }) => this.editForumTopic(args),
              closeForumTopic: () => this.closeForumTopic(),
              reopenForumTopic: () => this.reopenForumTopic(),
              deleteForumTopic: () => this.deleteForumTopic(),
              unpinAllForumTopicMessages: () =>
                this.unpinAllForumTopicMessages(),
              editGeneralForumTopic: (name: string) =>
                this.editGeneralForumTopic(name),
              closeGeneralForumTopic: () => this.closeGeneralForumTopic(),
              reopenGeneralForumTopic: () => this.reopenGeneralForumTopic(),
              hideGeneralForumTopic: () => this.hideGeneralForumTopic(),
              unhideGeneralForumTopic: () => this.unhideGeneralForumTopic(),
              setStickerPositionInSet: (sticker: string, position: number) =>
                this.setStickerPositionInSet(sticker, position),
              setStickerSetThumbnail: (args: {
                name: string;
                user_id: number;
                thumbnail?: F;
              }) => this.setStickerSetThumbnail(args),
              deleteStickerFromSet: (sticker: string) =>
                this.deleteStickerFromSet(sticker),
              uploadStickerFile: (args: {
                sticker_format: "static" | "animated" | "video";
                sticker: F;
              }) => this.uploadStickerFile(args),
              createNewStickerSet: (args: {
                name: string;
                title: string;
                stickers: InputSticker<F>[];
                sticker_format: "static" | "animated" | "video";
                sticker_type?: "regular" | "mask" | "custom_emoji";
                needs_repainting?: boolean;
              }) => this.createNewStickerSet(args),
              addStickerToSet: (args: {
                name: string;
                sticker: InputSticker<F>;
              }) => this.addStickerToSet(args),
              getMyCommands: () => this.getMyCommands(),
              setMyCommands: (commands: readonly BotCommand[]) =>
                this.setMyCommands(commands),
              replyWithMarkdown: (
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
                }
              ) => this.replyWithMarkdown(text, args),
              replyWithMarkdownV2: (
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
                }
              ) => this.replyWithMarkdownV2(text, args),
              replyWithHTML: (
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
                }
              ) => this.replyWithHTML(text, args),
              deleteMessage: (messageId?: number) =>
                this.deleteMessage(messageId),
              forwardMessage: (
                chatId: string | number,
                args: {
                  disable_notification?: boolean;
                  protect_content?: boolean;
                  message_id: number;
                }
              ) => this.forwardMessage(chatId, args),
              copyMessage: (
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
                }
              ) => this.copyMessage(chatId, args),
              approveChatJoinRequest: (userId: number) =>
                this.approveChatJoinRequest(userId),
              declineChatJoinRequest: (userId: number) =>
                this.declineChatJoinRequest(userId),
              banChatSenderChat: (senderChatId: number) =>
                this.banChatSenderChat(senderChatId),
              unbanChatSenderChat: (senderChatId: number) =>
                this.unbanChatSenderChat(senderChatId),
              setChatMenuButton: (menuButton?: MenuButton) =>
                this.setChatMenuButton(menuButton),
              getChatMenuButton: () => this.getChatMenuButton(),
              messageCollector: (
                filter?: Function,
                time?: number,
                max?: number
              ) => this.messageCollector(filter, time, max),
            };
            this.bot.emit(options.event, message);
            if (options.textEvent && updateProperty.text) {
              this.bot.emit(options.textEvent, message);
            }
            if (options.captionEvent && updateProperty.caption) {
              this.bot.emit(options.captionEvent, message);
            }
            if (type === "message" && updateProperty.reply_to_message) {
              this.bot.emit("reply_message", message);
            }
            break;
          }
        }
      }
    }
  }
}

export { CombinedClass };
