import { TelegramBot } from "../TelegramBot";
import { ParameterError } from "../errorcollection";
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

  get me() {
    const me = this.botInfo?.username;
    if (!me) {
      throw new Error("getMe is not available");
    }
    return me;
  }

  get messageId() {
    const messageId = this.updates.message_id;
    if (!messageId) {
      throw new Error("messageId is not available");
    }
    return messageId;
  }

  get editedMessage() {
    const editedMessage = this.updates?.edited_message;
    if (!editedMessage) {
      throw new Error("editedMessage is not available");
    }
    return editedMessage;
  }

  get inlineQuery() {
    const inlineQuery = this.updates?.inline_query;
    if (!inlineQuery) {
      throw new Error("inlineQuery is not available");
    }
    return inlineQuery;
  }

  get shippingQuery() {
    const shippingQuery = this.updates?.shipping_query;
    if (!shippingQuery) {
      throw new Error("shippingQuery is not available");
    }
    return shippingQuery;
  }

  get preCheckoutQuery() {
    const preCheckoutQuery = this.updates?.pre_checkout_query;
    if (!preCheckoutQuery) {
      throw new Error("preCheckoutQuery is not available");
    }
    return preCheckoutQuery;
  }

  get chosenInlineResult() {
    const chosenInlineResult = this.updates?.chosen_inline_result;
    if (!chosenInlineResult) {
      throw new Error("chosenInlineResult is not available");
    }
    return chosenInlineResult;
  }

  get channelPost() {
    const channelPost = this.updates?.channel_post;
    if (!channelPost) {
      throw new Error("channelPost is not available");
    }
    return channelPost;
  }

  get editedChannelPost() {
    const editedChannelPost = this.updates?.edited_channel_post;
    if (!editedChannelPost) {
      throw new Error("editedChannelPost is not available");
    }
    return editedChannelPost;
  }

  get callbackQuery(): CallbackQuery {
    const callbackQuery = this.updates?.callback_query;
    if (!callbackQuery) {
      throw new Error("CallbackQuery is not available");
    }
    return callbackQuery;
  }

  get poll(): Poll {
    const poll = this.updates?.poll;
    if (!poll) {
      throw new Error("Poll is not available");
    }
    return poll;
  }

  get pollAnswer(): PollAnswer {
    const pollAnswer = this.updates.poll_answer;
    if (!pollAnswer) {
      throw new Error("PollAnswer is not available");
    }
    return pollAnswer;
  }

  get myChatMember() {
    const myChatMember = this.updates?.my_chat_member;
    if (!myChatMember) {
      throw new Error("myChatMember is not available");
    }
    return myChatMember;
  }

  get chatMember() {
    const chatMember = this.updates?.chat_member;
    if (!chatMember) {
      throw new Error("chatMember is not available");
    }
    return chatMember;
  }

  get chatJoinRequest() {
    const chatJoinRequest = this.updates?.chat_join_request;
    if (!chatJoinRequest) {
      throw new Error("chatJoinRequest is not available");
    }
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
    if (!senderChat) {
      throw new Error("senderChat is not available");
    }
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

  answerInlineQuery(args: {
    results: readonly InlineQueryResult[];
    cache_time?: number;
    is_personal?: boolean;
    next_offset?: string;
    button?: InlineQueryResultsButton;
  }) {
    return this.bot.answerInlineQuery({
      inline_query_id: this.inlineQuery.id,
      ...args,
    });
  }

  answerCallbackQuery(args?: {
    text?: string;
    show_alert?: boolean;
    url?: string;
    cache_time?: number;
  }) {
    return this.bot.answerCallbackQuery({
      callback_query_id: this.callbackQuery.id,
      ...args,
    });
  }

  answerShippingQuery(args: {
    ok: boolean;
    shipping_options?: readonly ShippingOption[];
    error_message?: string;
  }) {
    return this.bot.answerShippingQuery({
      shipping_query_id: this.shippingQuery.id,
      ...args,
    });
  }

  answerPreCheckoutQuery(args: { ok: boolean; error_message?: string }) {
    return this.bot.answerPreCheckoutQuery({
      pre_checkout_query_id: this.preCheckoutQuery.id,
      ...args,
    });
  }

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

  editMessageMedia(media: InputMedia<F>, reply_markup?: InlineKeyboardMarkup) {
    return this.bot.editMessageMedia({
      chat_id: this.chat?.id,
      message_id: this.callbackQuery?.message?.message_id,
      inline_message_id: this.inlineMessageId,
      media: media,
      reply_markup,
    });
  }

  editMessageReplyMarkup(markup?: InlineKeyboardMarkup) {
    return this.bot.editMessageReplyMarkup({
      chat_id: this.chat?.id,
      message_id: this.callbackQuery?.message?.message_id,
      inline_message_id: this.inlineMessageId,
      reply_markup: markup,
    });
  }

  editMessageLiveLocation(replyMarkup?: InlineKeyboardMarkup) {
    return this.bot.editMessageLiveLocation({
      chat_id: this.chat?.id,
      message_id: this.callbackQuery?.message?.message_id,
      inline_message_id: this.inlineMessageId,
      reply_markup: replyMarkup,
    });
  }

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

  getChat() {
    return this.bot.getChat(this.chat.id);
  }

  exportChatInviteLink() {
    return this.bot.exportChatInviteLink(this.chat.id);
  }

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

  revokeChatInviteLink(invite_link: string) {
    return this.bot.revokeChatInviteLink({
      chat_id: this.chat.id,
      invite_link,
    });
  }

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

  get kickChatMember() {
    return this.banChatMember;
  }

  unbanChatMember(userId: number, onlyIfBanned?: boolean) {
    return this.bot.unbanChatMember({
      chat_id: this.chat.id,
      user_id: userId,
      only_if_banned: onlyIfBanned,
    });
  }

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

  setChatAdministratorCustomTitle(args: {
    user_id: number;
    custom_title: string;
  }) {
    return this.bot.setChatAdministratorCustomTitle({
      chat_id: this.chat.id,
      ...args,
    });
  }

  setChatPhoto(photo: F) {
    return this.bot.setChatPhoto({
      chat_id: this.chat.id,
      photo,
    });
  }

  deleteChatPhoto() {
    return this.bot.deleteChatPhoto(this.chat.id);
  }

  setChatTitle(title: string) {
    return this.bot.setChatTitle({
      chat_id: this.chat.id,
      title,
    });
  }

  setChatDescription(description: string) {
    return this.bot.setChatDescription({
      chat_id: this.chat.id,
      description,
    });
  }

  pinChatMessage(messageId: number, disableNotification?: boolean) {
    return this.bot.pinChatMessage({
      chat_id: this.chat.id,
      message_id: messageId,
      disable_notification: disableNotification,
    });
  }

  unpinChatMessage(messageId: number) {
    return this.bot.unpinChatMessage({
      chat_id: this.chat.id,
      message_id: messageId,
    });
  }

  unpinAllChatMessages() {
    return this.bot.unpinAllChatMessages(this.chat.id);
  }

  leaveChat() {
    return this.bot.leaveChat(this.chat.id);
  }

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

  getChatAdministrators() {
    return this.bot.getChatAdministrators(this.chat.id);
  }

  getChatMember(userId: number) {
    return this.bot.getChatMember({
      chat_id: this.chat.id,
      user_id: userId,
    });
  }

  getChatMembersCount() {
    return this.bot.getChatMemberCount(this.chat.id);
  }

  setPassportDataErrors(errors: readonly PassportElementError[]) {
    return this.bot.setPassportDataErrors({
      user_id: this.from.id,
      errors,
    });
  }

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

  sendDice(args: {
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

  sendGame(
    gameShortName: string,
    args: {
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

  stopPoll(args: { message_id: number; reply_markup?: InlineKeyboardMarkup }) {
    return this.bot.stopPoll({
      chat_id: this.chat.id,
      ...args,
    });
  }

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

  getStickerSet(name: string) {
    return this.bot.getStickerSet(name);
  }

  setChatStickerSet(sticker_set_name: string) {
    return this.bot.setChatStickerSet({
      chat_id: this.chat.id,
      sticker_set_name,
    });
  }

  deleteChatStickerSet() {
    return this.bot.deleteChatStickerSet(this.chat.id);
  }

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

  editForumTopic(args: { name?: string; icon_custom_emoji_id?: string }) {
    return this.bot.editForumTopic({
      chat_id: this.chat.id,
      message_thread_id: this.updates.message_thread_id,
      ...args,
    });
  }

  closeForumTopic() {
    return this.bot.closeForumTopic({
      chat_id: this.chat.id,
      message_thread_id: this.updates.message_thread_id,
    });
  }

  reopenForumTopic() {
    return this.bot.reopenForumTopic({
      chat_id: this.chat.id,
      message_thread_id: this.updates.message_thread_id,
    });
  }

  deleteForumTopic() {
    return this.bot.deleteForumTopic({
      chat_id: this.chat.id,
      message_thread_id: this.updates.message_thread_id,
    });
  }

  unpinAllForumTopicMessages() {
    return this.bot.unpinAllForumTopicMessages({
      chat_id: this.chat.id,
      message_thread_id: this.updates.message_thread_id,
    });
  }

  editGeneralForumTopic(name: string) {
    return this.bot.editGeneralForumTopic({
      chat_id: this.chat.id,
      name,
    });
  }

  closeGeneralForumTopic() {
    return this.bot.closeGeneralForumTopic(this.chat.id);
  }

  reopenGeneralForumTopic() {
    return this.bot.reopenGeneralForumTopic(this.chat.id);
  }

  hideGeneralForumTopic() {
    return this.bot.hideGeneralForumTopic(this.chat.id);
  }

  unhideGeneralForumTopic() {
    return this.bot.unhideGeneralForumTopic(this.chat.id);
  }

  setStickerPositionInSet(sticker: string, position: number) {
    return this.bot.setStickerPositionInSet({
      sticker,
      position,
    });
  }

  setStickerSetThumbnail(args: {
    name: string;
    user_id: number;
    thumbnail?: any;
  }) {
    return this.bot.setStickerSetThumbnail({
      ...args,
    });
  }

  deleteStickerFromSet(sticker: string) {
    return this.bot.deleteStickerFromSet(sticker);
  }

  uploadStickerFile(args: {
    sticker_format: "static" | "animated" | "video";
    sticker: any;
  }) {
    return this.bot.uploadStickerFile({
      user_id: this.from.id,
      ...args,
    });
  }

  createNewStickerSet(args: {
    name: string;
    title: string;
    stickers: InputSticker<any>[];
    sticker_format: "static" | "animated" | "video";
    sticker_type?: "regular" | "mask" | "custom_emoji";
    needs_repainting?: boolean;
  }) {
    return this.bot.createNewStickerSet({
      user_id: this.from.id,
      ...args,
    });
  }

  addStickerToSet(args: { name: string; sticker: InputSticker<F> }) {
    return this.bot.addStickerToSet({
      user_id: this.from.id,
      ...args,
    });
  }

  getMyCommands() {
    return this.bot.getMyCommands();
  }

  setMyCommands(commands: readonly BotCommand[]) {
    return this.bot.setMyCommands({
      commands,
    });
  }

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
      message_id: message.message_id,
    });
  }

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
      message_thread_id: message.chat.id,
      from_chat_id: message.message_id,
      ...args,
    });
  }

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
      message_thread_id: message.chat.id,
      from_chat_id: message.message_id,
      ...args,
    });
  }

  approveChatJoinRequest(userId: number) {
    return this.bot.approveChatJoinRequest({
      chat_id: this.chat.id,
      user_id: userId,
    });
  }

  declineChatJoinRequest(userId: number) {
    return this.bot.declineChatJoinRequest({
      chat_id: this.chat.id,
      user_id: userId,
    });
  }

  banChatSenderChat(senderChatId: number) {
    return this.bot.banChatSenderChat({
      chat_id: this.chat.id,
      sender_chat_id: senderChatId,
    });
  }

  unbanChatSenderChat(senderChatId: number) {
    return this.bot.unbanChatSenderChat({
      chat_id: this.chat.id,
      sender_chat_id: senderChatId,
    });
  }

  setChatMenuButton(menuButton?: MenuButton) {
    return this.bot.setChatMenuButton({
      chat_id: this.chat.id,
      menu_button: menuButton,
    });
  }

  getChatMenuButton() {
    return this.bot.getChatMenuButton(this.chat.id);
  }

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

  leave() {
    return this.bot.leaveChat(this.chat.id);
  }

  async processUpdate() {
    while (true) {
      const getUpdates = await this.bot.getUpdates();
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
