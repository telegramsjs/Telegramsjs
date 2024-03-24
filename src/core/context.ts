import { TelegramTypeError } from "./util";
import type { TelegramBot } from "../client";
import type { UnionKeys, UpdateReturn, MethodParameters } from "./types";
import {
  Reaction,
  Entities,
  MessageCollector,
  ReactionCollector,
  InlineKeyboardCollector,
} from "./structures";
import type {
  Update,
  Message,
  User,
  Chat,
  ReactionType,
  ReactionTypeEmoji,
  MenuButton,
  InlineKeyboardMarkup,
} from "@telegram.ts/types";

class Context {
  constructor(
    public readonly api: TelegramBot,
    private readonly update: Update,
    private readonly updates: UpdateReturn,
  ) {
    // @ts-ignorel
    return {
      ...updates,
      api,
      msgId: this.msgId,
      updateType: this.updateType,
      inlineMessageId: this.inlineMessageId,
      passportData: this.passportData,
      webAppData: this.webAppData,
      reactions: this.reactions,
      entities: this.entities,
      awaitReaction: this.awaitReaction.bind(this),
      createMessageCollector: this.createMessageCollector.bind(this),
      createReactionCollector: this.createReactionCollector.bind(this),
      createInlineKeyboardCollector:
        this.createInlineKeyboardCollector.bind(this),
      answerInlineQuery: this.answerInlineQuery.bind(this),
      answerCallbackQuery: this.answerCallbackQuery.bind(this),
      getUserChatBoosts: this.getUserChatBoosts.bind(this),
      answerShippingQuery: this.answerShippingQuery.bind(this),
      answerPreCheckoutQuery: this.answerPreCheckoutQuery.bind(this),
      editMessageText: this.editMessageText.bind(this),
      editMessageCaption: this.editMessageCaption.bind(this),
      editMessageMedia: this.editMessageMedia.bind(this),
      editMessageReplyMarkup: this.editMessageReplyMarkup.bind(this),
      editMessageLiveLocation: this.editMessageLiveLocation.bind(this),
      stopMessageLiveLocation: this.stopMessageLiveLocation.bind(this),
      sendMessage: this.sendMessage.bind(this),
      reply: this.reply.bind(this),
      getChat: this.getChat.bind(this),
      exportChatInviteLink: this.exportChatInviteLink.bind(this),
      createChatInviteLink: this.createChatInviteLink.bind(this),
      editChatInviteLink: this.editChatInviteLink.bind(this),
      revokeChatInviteLink: this.revokeChatInviteLink.bind(this),
      banChatMember: this.banChatMember.bind(this),
      unbanChatMember: this.unbanChatMember.bind(this),
      restrictChatMember: this.restrictChatMember.bind(this),
      promoteChatMember: this.promoteChatMember.bind(this),
      setChatAdministratorCustomTitle:
        this.setChatAdministratorCustomTitle.bind(this),
      setChatPhoto: this.setChatPhoto.bind(this),
      deleteChatPhoto: this.deleteChatPhoto.bind(this),
      setChatTitle: this.setChatTitle.bind(this),
      setChatDescription: this.setChatDescription.bind(this),
      pinChatMessage: this.pinChatMessage.bind(this),
      unpinChatMessage: this.unpinChatMessage.bind(this),
      unpinAllChatMessages: this.unpinAllChatMessages.bind(this),
      leaveChat: this.leaveChat.bind(this),
      setChatPermissions: this.setChatPermissions.bind(this),
      getChatAdministrators: this.getChatAdministrators.bind(this),
      getChatMember: this.getChatMember.bind(this),
      getChatMembersCount: this.getChatMembersCount.bind(this),
      setPassportDataErrors: this.setPassportDataErrors.bind(this),
      sendPhoto: this.sendPhoto.bind(this),
      sendMediaGroup: this.sendMediaGroup.bind(this),
      sendAudio: this.sendAudio.bind(this),
      sendDice: this.sendDice.bind(this),
      sendDocument: this.sendDocument.bind(this),
      sendSticker: this.sendSticker.bind(this),
      sendVideo: this.sendVideo.bind(this),
      sendAnimation: this.sendAnimation.bind(this),
      sendVideoNote: this.sendVideoNote.bind(this),
      sendInvoice: this.sendInvoice.bind(this),
      sendGame: this.sendGame.bind(this),
      sendVoice: this.sendVoice.bind(this),
      sendPoll: this.sendPoll.bind(this),
      sendQuiz: this.sendQuiz.bind(this),
      stopPoll: this.stopPoll.bind(this),
      sendChatAction: this.sendChatAction.bind(this),
      react: this.react.bind(this),
      sendLocation: this.sendLocation.bind(this),
      sendVenue: this.sendVenue.bind(this),
      sendContact: this.sendContact.bind(this),
      setChatStickerSet: this.setChatStickerSet.bind(this),
      deleteChatStickerSet: this.deleteChatStickerSet.bind(this),
      createForumTopic: this.createForumTopic.bind(this),
      editForumTopic: this.editForumTopic.bind(this),
      closeForumTopic: this.closeForumTopic.bind(this),
      reopenForumTopic: this.reopenForumTopic.bind(this),
      deleteForumTopic: this.deleteForumTopic.bind(this),
      unpinAllForumTopicMessages: this.unpinAllForumTopicMessages.bind(this),
      editGeneralForumTopic: this.editGeneralForumTopic.bind(this),
      closeGeneralForumTopic: this.closeGeneralForumTopic.bind(this),
      reopenGeneralForumTopic: this.reopenGeneralForumTopic.bind(this),
      hideGeneralForumTopic: this.hideGeneralForumTopic.bind(this),
      unhideGeneralForumTopic: this.unhideGeneralForumTopic.bind(this),
      unpinAllGeneralForumTopicMessages:
        this.unpinAllGeneralForumTopicMessages.bind(this),
      setStickerPositionInSet: this.setStickerPositionInSet.bind(this),
      setStickerSetThumbnail: this.setStickerSetThumbnail.bind(this),
      setStickerSetThumb: this.setStickerSetThumb.bind(this),
      setStickerMaskPosition: this.setStickerMaskPosition.bind(this),
      setStickerKeywords: this.setStickerKeywords.bind(this),
      setStickerEmojiList: this.setStickerEmojiList.bind(this),
      deleteStickerSet: this.deleteStickerSet.bind(this),
      setStickerSetTitle: this.setStickerSetTitle.bind(this),
      setCustomEmojiStickerSetThumbnail:
        this.setCustomEmojiStickerSetThumbnail.bind(this),
      uploadStickerFile: this.uploadStickerFile.bind(this),
      createNewStickerSet: this.createNewStickerSet.bind(this),
      addStickerToSet: this.addStickerToSet.bind(this),
      replyWithMarkdownV2: this.replyWithMarkdownV2.bind(this),
      replyWithHTML: this.replyWithHTML.bind(this),
      deleteMessage: this.deleteMessage.bind(this),
      deleteMessages: this.deleteMessages.bind(this),
      forwardMessage: this.forwardMessage.bind(this),
      forwardMessages: this.forwardMessages.bind(this),
      copyMessage: this.copyMessage.bind(this),
      copyMessages: this.copyMessages.bind(this),
      approveChatJoinRequest: this.approveChatJoinRequest.bind(this),
      declineChatJoinRequest: this.declineChatJoinRequest.bind(this),
      banChatSenderChat: this.banChatSenderChat.bind(this),
      unbanChatSenderChat: this.unbanChatSenderChat.bind(this),
      setChatMenuButton: this.setChatMenuButton.bind(this),
      getChatMenuButton: this.getChatMenuButton.bind(this),
      setMyDefaultAdministratorRights:
        this.setMyDefaultAdministratorRights.bind(this),
      getMyDefaultAdministratorRights:
        this.getMyDefaultAdministratorRights.bind(this),
    };
  }

  get updateType() {
    for (const key in this.update) {
      if (typeof (this.update as any)[key] === "object") {
        return key as Extract<UnionKeys<Update>, string>;
      }
    }
    return undefined;

    throw new Error(
      `Cannot determine \`updateType\` of ${JSON.stringify(this.update)}`,
    );
  }

  get message() {
    return this.update.message as Update["message"];
  }

  get editedMessage() {
    return this.update.edited_message as Update["edited_message"];
  }

  get inlineQuery() {
    return this.update.inline_query as Update["inline_query"];
  }

  get shippingQuery() {
    return this.update.shipping_query as Update["shipping_query"];
  }

  get preCheckoutQuery() {
    return this.update.pre_checkout_query as Update["pre_checkout_query"];
  }

  get chosenInlineResult() {
    return this.update.chosen_inline_result as Update["chosen_inline_result"];
  }

  get channelPost() {
    return this.update.channel_post as Update["channel_post"];
  }

  get editedChannelPost() {
    return this.update.edited_channel_post as Update["edited_channel_post"];
  }

  get messageReaction() {
    return this.update.message_reaction as Update["message_reaction"];
  }

  get messageReactionCount() {
    return this.update
      .message_reaction_count as Update["message_reaction_count"];
  }

  get callbackQuery() {
    return this.update.callback_query as Update["callback_query"];
  }

  get poll() {
    return this.update.poll as Update["poll"];
  }

  get pollAnswer() {
    return this.update.poll_answer as Update["poll_answer"];
  }

  get myChatMember() {
    return this.update.my_chat_member as Update["my_chat_member"];
  }

  get chatMember() {
    return this.update.chat_member as Update["chat_member"];
  }

  get chatJoinRequest() {
    return this.update.chat_join_request as Update["chat_join_request"];
  }

  get chatBoost() {
    return this.update.chat_boost as Update["chat_boost"];
  }

  get removedChatBoost() {
    return this.update.removed_chat_boost as Update["removed_chat_boost"];
  }

  get msg() {
    const messageKeys: Array<keyof this> = [
      "message",
      "editedMessage",
      "channelPost",
      "editedChannelPost",
      "messageReaction",
      "messageReactionCount",
      "callbackQuery",
    ];
    for (const method of messageKeys) {
      if (!this[method]) continue;
      if (method === "callbackQuery") {
        const thisMethod = (this as any)[method];
        return ("message" in thisMethod && thisMethod.message) as Message;
      }
      return {
        ...this[method],
      } as Message;
    }

    return {} as Message;
  }

  get msgId() {
    const messageKeys: Array<keyof this> = [
      "message",
      "editedMessage",
      "channelPost",
      "editedChannelPost",
      "messageReaction",
      "messageReactionCount",
      "callbackQuery",
    ];
    for (const method of messageKeys) {
      if (!this[method]) continue;
      const obj = this[method];
      if (method === "callbackQuery") {
        const thisMethod = obj as any;
        return "message" in thisMethod && thisMethod.message.message_id;
      }
      if (typeof obj === "object" && obj !== null && "message_id" in obj) {
        return obj.message_id as number;
      }
    }

    return undefined;
  }

  get chat() {
    const possibleChats = [
      this.msg,
      this.messageReaction,
      this.messageReactionCount,
      this.chatJoinRequest,
      this.chatMember,
      this.myChatMember,
      this.removedChatBoost,
    ];

    for (const chat of possibleChats) {
      if (typeof chat === "object" && chat !== null && "chat" in chat) {
        return chat.chat as Chat;
      }
    }

    return undefined;
  }

  get senderChat() {
    const msg = this.msg;
    return msg.sender_chat as Chat;
  }

  get from() {
    const possibleUsers = [
      this.msg,
      this.messageReaction,
      this.chatJoinRequest,
      this.chatMember,
      this.myChatMember,
      this.removedChatBoost,
    ];

    for (const user of possibleUsers) {
      if (typeof user !== "object" && !user) continue;
      if ("from" in user) {
        return user.from as User;
      } else if ("user" in user) {
        return user.user as User;
      }
    }

    return undefined;
  }

  get inlineMessageId() {
    return (this.callbackQuery ?? this.chosenInlineResult)?.inline_message_id;
  }

  get passportData() {
    if (this.message == null) return undefined;
    if (!("passport_data" in this.message)) return undefined;
    return this.message?.passport_data;
  }

  get webAppData() {
    if (!(this.message && "web_app_data" in this.message)) return undefined;

    const { data, button_text } = this.message.web_app_data!;

    return {
      data: {
        json<T>() {
          return JSON.parse(data) as T;
        },
        text() {
          return data;
        },
      },
      button_text,
    };
  }

  get reactions() {
    return Reaction.reactions(this.messageReaction);
  }

  assert<T extends string | number | object>(
    value: T | undefined,
    method: string,
  ): asserts value is T {
    if (value === undefined) {
      throw new TelegramTypeError(
        `"${method}" isn't available for "${this.updateType}"`,
      );
    }
  }

  get entities() {
    const text = this.msg?.text || this.msg?.caption || "";
    const entities = this.msg?.entities || this.msg?.caption_entities || [];
    return new Entities(text, entities);
  }

  awaitReaction(options: MethodParameters<Reaction>["awaitReaction"]) {
    return new Reaction(this.api).awaitReaction(options);
  }

  createMessageCollector(options: MessageCollector["options"]) {
    this.assert(this.msg, "createMessageCollector");
    return new MessageCollector(this.api, this.msg, options);
  }

  createReactionCollector(options: ReactionCollector["options"]) {
    this.assert(this.msg, "createMessageCollector");
    return new ReactionCollector(this.api, this.msg, options);
  }

  createInlineKeyboardCollector(options: InlineKeyboardCollector["options"]) {
    return new InlineKeyboardCollector(this.api, options);
  }

  answerInlineQuery(
    args: Omit<MethodParameters["answerInlineQuery"], "inline_query_id">,
  ) {
    this.assert(this.inlineQuery, "answerInlineQuery");
    return this.api.answerInlineQuery({
      inline_query_id: this.inlineQuery.id,
      ...args,
    });
  }

  answerCallbackQuery(
    args: Omit<MethodParameters["answerCallbackQuery"], "callback_query_id">,
  ) {
    this.assert(this.callbackQuery, "answerCallbackQuery");
    return this.api.answerCallbackQuery({
      callback_query_id: this.callbackQuery.id,
      ...args,
    });
  }

  getUserChatBoosts() {
    this.assert(this.chat, "getUserChatBoosts");
    this.assert(this.from, "getUserChatBoosts");
    return this.api.getUserChatBoosts(this.chat.id, this.from.id);
  }

  answerShippingQuery(
    args: Omit<MethodParameters["answerShippingQuery"], "shipping_query_id">,
  ) {
    this.assert(this.shippingQuery, "answerShippingQuery");
    return this.api.answerShippingQuery({
      shipping_query_id: this.shippingQuery.id,
      ...args,
    });
  }

  answerPreCheckoutQuery(
    args: Omit<
      MethodParameters["answerPreCheckoutQuery"],
      "pre_checkout_query_id"
    >,
  ) {
    this.assert(this.preCheckoutQuery, "answerPreCheckoutQuery");
    return this.api.answerPreCheckoutQuery({
      pre_checkout_query_id: this.preCheckoutQuery.id,
      ...args,
    });
  }

  editMessageText(
    text: string,
    args?: Omit<MethodParameters["editMessageText"], "text">,
  ) {
    this.assert(this.msgId ?? this.inlineMessageId, "editMessageText");
    return this.api.editMessageText({
      chat_id: this.chat?.id,
      message_id: this.msgId,
      inline_message_id: this.inlineMessageId,
      text,
      ...args,
    });
  }

  editMessageCaption(
    caption: string,
    args?: Omit<MethodParameters["editMessageCaption"], "caption">,
  ) {
    this.assert(this.msgId ?? this.inlineMessageId, "editMessageCaption");
    return this.api.editMessageCaption({
      chat_id: this.chat?.id,
      message_id: this.msgId,
      inline_message_id: this.inlineMessageId,
      caption,
      ...args,
    });
  }

  editMessageMedia(
    media: MethodParameters["editMessageMedia"]["media"],
    args?: Omit<MethodParameters["editMessageMedia"], "media">,
  ) {
    this.assert(this.msgId ?? this.inlineMessageId, "editMessageMedia");
    return this.api.editMessageMedia({
      chat_id: this.chat?.id,
      message_id: this.msgId,
      inline_message_id: this.inlineMessageId,
      media,
      ...args,
    });
  }

  editMessageReplyMarkup(markup: InlineKeyboardMarkup) {
    this.assert(this.msgId ?? this.inlineMessageId, "editMessageReplyMarkup");
    return this.api.editMessageReplyMarkup({
      chat_id: this.chat?.id,
      message_id: this.msgId,
      inline_message_id: this.inlineMessageId,
      reply_markup: markup,
    });
  }

  editMessageLiveLocation(
    latitude: number,
    longitude: number,
    args?: Omit<
      MethodParameters["editMessageLiveLocation"],
      "latitude" | "longitude"
    >,
  ) {
    this.assert(this.msgId ?? this.inlineMessageId, "editMessageLiveLocation");
    return this.api.editMessageLiveLocation({
      chat_id: this.chat?.id,
      message_id: this.msgId,
      inline_message_id: this.inlineMessageId,
      latitude,
      longitude,
      ...args,
    });
  }

  stopMessageLiveLocation(markup?: InlineKeyboardMarkup) {
    this.assert(this.msgId ?? this.inlineMessageId, "stopMessageLiveLocation");
    return this.api.stopMessageLiveLocation({
      chat_id: this.chat?.id,
      message_id: this.msgId,
      inline_message_id: this.inlineMessageId,
      reply_markup: markup,
    });
  }

  sendMessage(
    text: string,
    args?: Omit<MethodParameters["sendMessage"], "text" | "chat_id">,
  ) {
    this.assert(this.chat, "sendMessage");
    return this.api.sendMessage({
      chat_id: this.chat.id,
      text,
      message_thread_id: getThreadId(this),
      ...args,
    });
  }

  reply(
    text: string,
    args?: Omit<Partial<MethodParameters["sendMessage"]>, "text">,
  ) {
    this.assert(this.msgId, "reply");
    return this.sendMessage(text, {
      reply_parameters: { message_id: this.msgId },
      ...args,
    });
  }

  getChat() {
    this.assert(this.chat, "getChat");
    return this.api.getChat(this.chat.id);
  }

  exportChatInviteLink() {
    this.assert(this.chat, "exportChatInviteLink");
    return this.api.exportChatInviteLink(this.chat.id);
  }

  createChatInviteLink(
    args: Omit<MethodParameters["createChatInviteLink"], "chat_id">,
  ) {
    this.assert(this.chat, "createChatInviteLink");
    return this.api.createChatInviteLink({ chat_id: this.chat.id, ...args });
  }

  editChatInviteLink(
    args: Omit<MethodParameters["editChatInviteLink"], "chat_id">,
  ) {
    this.assert(this.chat, "editChatInviteLink");
    return this.api.editChatInviteLink({ chat_id: this.chat.id, ...args });
  }

  revokeChatInviteLink(inviteLink: string) {
    this.assert(this.chat, "revokeChatInviteLink");
    return this.api.revokeChatInviteLink(inviteLink, this.chat.id);
  }

  banChatMember(args: Omit<MethodParameters["banChatMember"], "chat_id">) {
    this.assert(this.chat, "banChatMember");
    return this.api.banChatMember({ chat_id: this.chat.id, ...args });
  }

  unbanChatMember(args: Omit<MethodParameters["unbanChatMember"], "chat_id">) {
    this.assert(this.chat, "unbanChatMember");
    return this.api.unbanChatMember({
      chat_id: this.chat.id,
      ...args,
    });
  }

  restrictChatMember(
    args: Omit<MethodParameters["restrictChatMember"], "chat_id">,
  ) {
    this.assert(this.chat, "restrictChatMember");
    return this.api.restrictChatMember({
      chat_id: this.chat.id,
      ...args,
    });
  }

  promoteChatMember(
    args: Omit<MethodParameters["promoteChatMember"], "chat_id">,
  ) {
    this.assert(this.chat, "promoteChatMember");
    return this.api.promoteChatMember({
      chat_id: this.chat.id,
      ...args,
    });
  }

  setChatAdministratorCustomTitle(
    args: Omit<MethodParameters["setChatAdministratorCustomTitle"], "chat_id">,
  ) {
    this.assert(this.chat, "setChatAdministratorCustomTitle");
    return this.api.setChatAdministratorCustomTitle({
      chat_id: this.chat.id,
      ...args,
    });
  }

  setChatPhoto(photo: MethodParameters["setChatPhoto"]["photo"]) {
    this.assert(this.chat, "setChatPhoto");
    return this.api.setChatPhoto(this.chat.id, photo);
  }

  deleteChatPhoto() {
    this.assert(this.chat, "deleteChatPhoto");
    return this.api.deleteChatPhoto(this.chat.id);
  }

  setChatTitle(title: string) {
    this.assert(this.chat, "setChatTitle");
    return this.api.setChatTitle(this.chat.id, title);
  }

  setChatDescription(description: string) {
    this.assert(this.chat, "setChatDescription");
    return this.api.setChatDescription(this.chat.id, description);
  }

  pinChatMessage(args: Omit<MethodParameters["pinChatMessage"], "chat_id">) {
    this.assert(this.chat, "pinChatMessage");
    return this.api.pinChatMessage({
      chat_id: this.chat.id,
      ...args,
    });
  }

  unpinChatMessage(message_id?: number) {
    this.assert(this.chat, "unpinChatMessage");
    return this.api.unpinChatMessage(this.chat.id, message_id);
  }

  unpinAllChatMessages() {
    this.assert(this.chat, "unpinAllChatMessages");
    return this.api.unpinAllChatMessages(this.chat.id);
  }

  leaveChat() {
    this.assert(this.chat, "leaveChat");
    return this.api.leaveChat(this.chat.id);
  }

  setChatPermissions(
    args: Omit<MethodParameters["setChatPermissions"], "chat_id">,
  ) {
    this.assert(this.chat, "setChatPermissions");
    return this.api.setChatPermissions({
      chat_id: this.chat.id,
      ...args,
    });
  }

  getChatAdministrators() {
    this.assert(this.chat, "getChatAdministrators");
    return this.api.getChatAdministrators(this.chat.id);
  }

  getChatMember(user_id: number) {
    this.assert(this.chat, "getChatMember");
    return this.api.getChatMember(this.chat.id, user_id);
  }

  getChatMembersCount() {
    this.assert(this.chat, "getChatMembersCount");
    return this.api.getChatMemberCount(this.chat.id);
  }

  setPassportDataErrors(
    errors: MethodParameters["setPassportDataErrors"]["errors"],
  ) {
    this.assert(this.from, "setPassportDataErrors");
    return this.api.setPassportDataErrors(this.from.id, errors);
  }

  sendPhoto(
    photo: MethodParameters["sendPhoto"]["photo"],
    args?: Omit<MethodParameters["sendPhoto"], "photo">,
  ) {
    this.assert(this.chat, "sendPhoto");
    return this.api.sendPhoto({
      chat_id: this.chat.id,
      photo,
      message_thread_id: getThreadId(this),
      ...args,
    });
  }

  sendMediaGroup(
    media: MethodParameters["sendMediaGroup"]["media"],
    args?: Omit<MethodParameters["sendMediaGroup"], "media">,
  ) {
    this.assert(this.chat, "sendMediaGroup");
    return this.api.sendMediaGroup({
      chat_id: this.chat.id,
      media,
      message_thread_id: getThreadId(this),
      ...args,
    });
  }

  sendAudio(
    audio: MethodParameters["sendAudio"]["audio"],
    args?: Omit<MethodParameters["sendAudio"], "media">,
  ) {
    this.assert(this.chat, "sendAudio");
    return this.api.sendAudio({
      chat_id: this.chat.id,
      audio,
      message_thread_id: getThreadId(this),
      ...args,
    });
  }

  sendDice(args?: Omit<MethodParameters["sendDice"], "chat_id">) {
    this.assert(this.chat, "sendDice");
    return this.api.sendDice({
      chat_id: this.chat.id,
      message_thread_id: getThreadId(this),
      ...args,
    });
  }

  sendDocument(
    document: MethodParameters["sendDocument"]["document"],
    args?: Omit<MethodParameters["sendDocument"], "document">,
  ) {
    this.assert(this.chat, "sendDocument");
    return this.api.sendDocument({
      chat_id: this.chat.id,
      document,
      message_thread_id: getThreadId(this),
      ...args,
    });
  }

  sendSticker(
    sticker: MethodParameters["sendSticker"]["sticker"],
    args?: Omit<MethodParameters["sendSticker"], "sticker">,
  ) {
    this.assert(this.chat, "sendSticker");
    return this.api.sendSticker({
      chat_id: this.chat.id,
      sticker,
      message_thread_id: getThreadId(this),
      ...args,
    });
  }

  sendVideo(
    video: MethodParameters["sendVideo"]["video"],
    args?: Omit<MethodParameters["sendVideo"], "video">,
  ) {
    this.assert(this.chat, "sendVideo");
    return this.api.sendVideo({
      chat_id: this.chat.id,
      video,
      message_thread_id: getThreadId(this),
      ...args,
    });
  }

  sendAnimation(
    animation: MethodParameters["sendAnimation"]["animation"],
    args?: Omit<MethodParameters["sendAnimation"], "animation">,
  ) {
    this.assert(this.chat, "sendAnimation");
    return this.api.sendAnimation({
      chat_id: this.chat.id,
      animation,
      message_thread_id: getThreadId(this),
      ...args,
    });
  }

  sendVideoNote(
    videoNote: MethodParameters["sendVideoNote"]["video_note"],
    args?: Omit<MethodParameters["sendVideoNote"], "video_note">,
  ) {
    this.assert(this.chat, "sendVideoNote");
    return this.api.sendVideoNote({
      chat_id: this.chat.id,
      video_note: videoNote,
      message_thread_id: getThreadId(this),
      ...args,
    });
  }

  sendInvoice(
    payload: MethodParameters["sendInvoice"]["payload"],
    args: Omit<MethodParameters["sendInvoice"], "payload" | "chat_id">,
  ) {
    this.assert(this.chat, "sendInvoice");
    return this.api.sendInvoice({
      chat_id: this.chat.id,
      payload,
      message_thread_id: getThreadId(this),
      ...args,
    });
  }

  sendGame(
    game: string,
    args?: Omit<MethodParameters["sendGame"], "game_short_name">,
  ) {
    this.assert(this.chat, "sendGame");
    return this.api.sendGame({
      chat_id: this.chat.id,
      game_short_name: game,
      message_thread_id: getThreadId(this),
      ...args,
    });
  }

  sendVoice(
    voice: MethodParameters["sendVoice"]["voice"],
    args?: Omit<MethodParameters["sendVoice"], "voice">,
  ) {
    this.assert(this.chat, "sendVoice");
    return this.api.sendVoice({
      chat_id: this.chat.id,
      voice,
      message_thread_id: getThreadId(this),
      ...args,
    });
  }

  sendPoll(
    question: string,
    options: readonly string[],
    args?: Omit<MethodParameters["sendPoll"], "question" | "options">,
  ) {
    this.assert(this.chat, "sendPoll");
    return this.api.sendPoll({
      chat_id: this.chat.id,
      question,
      options,
      message_thread_id: getThreadId(this),
      ...args,
    });
  }

  sendQuiz(
    question: string,
    options: readonly string[],
    args?: Omit<Partial<MethodParameters["sendPoll"]>, "question" | "type">,
  ) {
    this.assert(this.chat, "sendQuiz");
    return this.api.sendPoll({
      chat_id: this.chat.id,
      type: "quiz",
      question,
      options,
      message_thread_id: getThreadId(this),
      ...args,
    });
  }

  stopPoll(args: Omit<MethodParameters["stopPoll"], "chat_id">) {
    this.assert(this.chat, "stopPoll");
    return this.api.stopPoll({
      chat_id: this.chat.id,
      ...args,
    });
  }

  sendChatAction(
    action: MethodParameters["sendChatAction"]["action"],
    args?: Omit<Partial<MethodParameters["sendChatAction"]>, "action">,
  ) {
    this.assert(this.chat, "sendChatAction");
    return this.api.sendChatAction({
      chat_id: this.chat.id,
      action,
      message_thread_id: getThreadId(this),
      ...args,
    });
  }

  react(
    react: ReactionTypeEmoji["emoji"] | ReactionType | ReactionType[],
    is_big: boolean = false,
  ) {
    this.assert(this.chat, "setMessageReaction");
    this.assert(this.msgId, "setMessageReaction");
    let parsedReactions: ReactionType[] = [];
    if (typeof react === "string") {
      parsedReactions = [{ type: "emoji", emoji: react }];
    } else if (Array.isArray(react)) {
      parsedReactions = react.map((emoji) => {
        return typeof emoji === "string" ? { type: "emoji", emoji } : emoji;
      });
    } else parsedReactions = [react];

    this.api.setMessageReaction({
      chat_id: this.chat.id,
      is_big,
      message_id: this.msgId,
      reaction: parsedReactions,
    });
  }

  sendLocation(
    latitude: number,
    longitude: number,
    args?: Omit<MethodParameters["sendLocation"], "latitude" | "longitude">,
  ) {
    this.assert(this.chat, "sendLocation");
    return this.api.sendLocation({
      chat_id: this.chat.id,
      latitude,
      longitude,
      message_thread_id: getThreadId(this),
      ...args,
    });
  }

  sendVenue(
    latitude: number,
    longitude: number,
    title: string,
    address: string,
    args?: Omit<
      MethodParameters["sendVenue"],
      "latitude" | "longitude" | "title" | "address"
    >,
  ) {
    this.assert(this.chat, "sendVenue");
    return this.api.sendVenue({
      chat_id: this.chat.id,
      latitude,
      longitude,
      title,
      address,
      message_thread_id: getThreadId(this),
      ...args,
    });
  }

  sendContact(
    phoneNumber: string,
    firstName: string,
    args?: Omit<MethodParameters["sendContact"], "phone_number" | "first_name">,
  ) {
    this.assert(this.chat, "sendContact");
    return this.api.sendContact({
      chat_id: this.chat.id,
      phone_number: phoneNumber,
      first_name: firstName,
      message_thread_id: getThreadId(this),
      ...args,
    });
  }

  setChatStickerSet(setName: string) {
    this.assert(this.chat, "setChatStickerSet");
    return this.api.setChatStickerSet(setName, this.chat.id);
  }

  deleteChatStickerSet() {
    this.assert(this.chat, "deleteChatStickerSet");
    return this.api.deleteChatStickerSet(this.chat.id);
  }

  createForumTopic(
    args: Omit<MethodParameters["createForumTopic"], "chat_id">,
  ) {
    this.assert(this.chat, "createForumTopic");
    return this.api.createForumTopic({
      chat_id: this.chat.id,
      ...args,
    });
  }

  editForumTopic(
    args: Omit<Partial<MethodParameters["editForumTopic"]>, "chat_id">,
  ) {
    this.assert(this.chat, "editForumTopic");
    this.assert(this.message?.message_thread_id, "editForumTopic");
    return this.api.editForumTopic({
      chat_id: this.chat.id,
      message_thread_id: this.message.message_thread_id,
      ...args,
    });
  }

  closeForumTopic() {
    this.assert(this.chat, "closeForumTopic");
    this.assert(this.message?.message_thread_id, "closeForumTopic");

    return this.api.closeForumTopic(
      this.chat.id,
      this.message.message_thread_id,
    );
  }

  reopenForumTopic() {
    this.assert(this.chat, "reopenForumTopic");
    this.assert(this.message?.message_thread_id, "reopenForumTopic");

    return this.api.reopenForumTopic(
      this.chat.id,
      this.message.message_thread_id,
    );
  }

  deleteForumTopic() {
    this.assert(this.chat, "deleteForumTopic");
    this.assert(this.message?.message_thread_id, "deleteForumTopic");

    return this.api.deleteForumTopic(
      this.chat.id,
      this.message.message_thread_id,
    );
  }

  unpinAllForumTopicMessages() {
    this.assert(this.chat, "unpinAllForumTopicMessages");
    this.assert(this.message?.message_thread_id, "unpinAllForumTopicMessages");

    return this.api.unpinAllForumTopicMessages(
      this.chat.id,
      this.message.message_thread_id,
    );
  }

  editGeneralForumTopic(name: string) {
    this.assert(this.chat, "editGeneralForumTopic");
    return this.api.editGeneralForumTopic(this.chat.id, name);
  }

  closeGeneralForumTopic() {
    this.assert(this.chat, "closeGeneralForumTopic");
    return this.api.closeGeneralForumTopic(this.chat.id);
  }

  reopenGeneralForumTopic() {
    this.assert(this.chat, "reopenGeneralForumTopic");
    return this.api.reopenGeneralForumTopic(this.chat.id);
  }

  hideGeneralForumTopic() {
    this.assert(this.chat, "hideGeneralForumTopic");
    return this.api.hideGeneralForumTopic(this.chat.id);
  }

  unhideGeneralForumTopic() {
    this.assert(this.chat, "unhideGeneralForumTopic");
    return this.api.unhideGeneralForumTopic(this.chat.id);
  }

  unpinAllGeneralForumTopicMessages() {
    this.assert(this.chat, "unpinAllGeneralForumTopicMessages");
    return this.api.unpinAllGeneralForumTopicMessages(this.chat.id);
  }

  setStickerPositionInSet(sticker: string, position: number) {
    return this.api.setStickerPositionInSet(sticker, position);
  }

  setStickerSetThumb(args: MethodParameters["setStickerSetThumbnail"]) {
    return this.api.setStickerSetThumbnail(args);
  }

  setStickerSetThumbnail(args: MethodParameters["setStickerSetThumbnail"]) {
    return this.api.setStickerSetThumbnail(args);
  }

  setStickerMaskPosition(
    sticker: string,
    mask_position?: MethodParameters["setStickerMaskPosition"]["mask_position"],
  ) {
    return this.api.setStickerMaskPosition(sticker, mask_position);
  }

  setStickerKeywords(sticker: string, keywords?: string[]) {
    return this.api.setStickerKeywords(sticker, keywords);
  }

  setStickerEmojiList(sticker: string, emoji_list: string[]) {
    return this.api.setStickerEmojiList(sticker, emoji_list);
  }

  deleteStickerSet(name: string) {
    return this.api.deleteStickerSet(name);
  }

  setStickerSetTitle(name: string, title: string) {
    return this.api.setStickerSetTitle(name, title);
  }

  setCustomEmojiStickerSetThumbnail(name: string) {
    return this.api.setCustomEmojiStickerSetThumbnail(name);
  }

  uploadStickerFile(
    args: Omit<MethodParameters["uploadStickerFile"], "user_id">,
  ) {
    this.assert(this.from, "uploadStickerFile");
    return this.api.uploadStickerFile({
      user_id: this.from.id,
      ...args,
    });
  }

  createNewStickerSet(
    args: Omit<MethodParameters["createNewStickerSet"], "user_id">,
  ) {
    this.assert(this.from, "createNewStickerSet");
    return this.api.createNewStickerSet({
      user_id: this.from.id,
      ...args,
    });
  }

  addStickerToSet(args: Omit<MethodParameters["addStickerToSet"], "user_id">) {
    this.assert(this.from, "addStickerToSet");
    return this.api.addStickerToSet({
      user_id: this.from.id,
      ...args,
    });
  }

  replyWithMarkdownV2(
    markdown: string,
    args?: Omit<
      Partial<MethodParameters["sendMessage"]>,
      "text" | "parse_mode"
    >,
  ) {
    return this.reply(markdown, { parse_mode: "MarkdownV2", ...args });
  }

  replyWithHTML(
    html: string,
    args?: Omit<
      Partial<MethodParameters["sendMessage"]>,
      "text" | "parse_mode"
    >,
  ) {
    return this.reply(html, { parse_mode: "HTML", ...args });
  }

  deleteMessage(messageId?: number) {
    this.assert(this.chat, "deleteMessage");
    if (typeof messageId !== "undefined") {
      return this.api.deleteMessage(this.chat.id, messageId);
    }

    this.assert(this.msgId, "deleteMessage");
    return this.api.deleteMessage(this.chat.id, this.msgId);
  }

  deleteMessages(messageIds: number[]) {
    this.assert(this.chat, "deleteMessages");
    return this.api.deleteMessages(this.chat.id, messageIds);
  }

  forwardMessage(
    chatId: string | number,
    args?: Omit<MethodParameters["forwardMessage"], "chat_id">,
  ) {
    this.assert(this.chat, "forwardMessage");
    this.assert(this.msgId, "forwardMessage");
    return this.api.forwardMessage({
      chat_id: chatId,
      from_chat_id: this.chat.id,
      message_id: this.msgId,
      ...args,
    });
  }

  forwardMessages(
    chatId: string | number,
    messageIds: number[],
    args?: Omit<MethodParameters["forwardMessages"], "chat_id">,
  ) {
    this.assert(this.chat, "forwardMessages");
    return this.api.forwardMessages({
      chat_id: chatId,
      from_chat_id: this.chat.id,
      message_ids: messageIds,
      ...args,
    });
  }

  copyMessage(
    chatId: string | number,
    args?: Omit<MethodParameters["copyMessage"], "chat_id">,
  ) {
    this.assert(this.chat, "copyMessage");
    this.assert(this.msgId, "copyMessage");
    return this.api.copyMessage({
      chat_id: chatId,
      from_chat_id: this.chat.id,
      message_id: this.msgId,
      ...args,
    });
  }

  copyMessages(
    chatId: number | string,
    messageIds: number[],
    args?: Omit<MethodParameters["copyMessages"], "chat_id" | "message_ids">,
  ) {
    this.assert(this.chat, "copyMessages");
    return this.api.copyMessages({
      chat_id: chatId,
      from_chat_id: this.chat.id,
      message_ids: messageIds,
      ...args,
    });
  }

  approveChatJoinRequest(userId: number) {
    this.assert(this.chat, "approveChatJoinRequest");
    return this.api.approveChatJoinRequest(userId, this.chat.id);
  }

  declineChatJoinRequest(userId: number) {
    this.assert(this.chat, "declineChatJoinRequest");
    return this.api.declineChatJoinRequest(this.chat.id, userId);
  }

  banChatSenderChat(senderChatId: number) {
    this.assert(this.chat, "banChatSenderChat");
    return this.api.banChatSenderChat(this.chat.id, senderChatId);
  }

  unbanChatSenderChat(senderChatId: number) {
    this.assert(this.chat, "unbanChatSenderChat");
    return this.api.unbanChatSenderChat(this.chat.id, senderChatId);
  }

  setChatMenuButton(menuButton?: MenuButton) {
    this.assert(this.chat, "setChatMenuButton");
    return this.api.setChatMenuButton(this.chat.id, menuButton);
  }

  getChatMenuButton() {
    this.assert(this.chat, "getChatMenuButton");
    return this.api.getChatMenuButton(this.chat.id);
  }

  setMyDefaultAdministratorRights(
    rights?: MethodParameters["setMyDefaultAdministratorRights"]["rights"],
    for_channels?: boolean,
  ) {
    return this.api.setMyDefaultAdministratorRights(rights, for_channels);
  }

  getMyDefaultAdministratorRights(for_channels: boolean) {
    return this.api.getMyDefaultAdministratorRights(for_channels);
  }
}

function getThreadId(ctx: Context) {
  const { is_topic_message, message_thread_id } = ctx.msg;
  return is_topic_message ? message_thread_id : undefined;
}

export { Context };
