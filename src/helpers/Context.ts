import { BaseClient } from "../BaseClient";

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

export class Context {
  constructor(
    readonly update: any,
    readonly telegram: BaseClient,
    readonly botInfo?: botInfo,
  ) {}

  get me() {
    return this.botInfo?.username;
  }

  get message() {
    return this.update.message;
  }

  get messageId() {
    return this.update.message_id;
  }

  get editedMessage() {
    return this.update.edited_message;
  }

  get inlineQuery() {
    return this.update.inline_query;
  }

  get shippingQuery() {
    return this.update.shipping_query;
  }

  get preCheckoutQuery() {
    return this.update.pre_checkout_query;
  }

  get chosenInlineResult() {
    return this.update.chosen_inline_result;
  }

  get channelPost() {
    return this.update.channel_post;
  }

  get editedChannelPost() {
    return this.update.edited_channel_post;
  }

  get callbackQuery() {
    return this.update.callback_query;
  }

  get poll() {
    return this.update.poll;
  }

  get pollAnswer() {
    return this.update.poll_answer;
  }

  get myChatMember() {
    return this.update.my_chat_member;
  }

  get chatMember() {
    return this.update.chat_member;
  }

  get chatJoinRequest() {
    return this.update.chat_join_request;
  }

  get chat() {
    return (
      this.chatMember ??
      this.myChatMember ??
      this.chatJoinRequest ??
      this.update
    )?.chat;
  }

  get senderChat() {
    return this.update.sender_chat;
  }

  get from() {
    return (
      this.callbackQuery ??
      this.inlineQuery ??
      this.shippingQuery ??
      this.preCheckoutQuery ??
      this.chosenInlineResult ??
      this.chatMember ??
      this.myChatMember ??
      this.chatJoinRequest
    )?.from;
  }

  get inlineMessageId() {
    return (this.callbackQuery ?? this.chosenInlineResult)?.inline_message_id;
  }

  reply(
    text: string,
    args?: {
      replyMarkup?: any;
      allowReply?: boolean;
      notification?: boolean;
      content?: boolean | undefined;
      threadId?: number;
      parseMode?: string;
    },
  ) {
    return this.telegram.sendMessage({
      text: text,
      chatId: this.chat.id,
      replyToMessageId: this.messageId,
      ...args,
    });
  }

  send(
    text: string,
    args?: {
      replyMarkup?: any;
      allowReply?: boolean;
      notification?: boolean;
      content?: boolean | undefined;
      replyToMessageId: number;
      threadId?: number;
      parseMode?: string;
    },
  ) {
    return this.telegram.sendMessage({
      text: text,
      chatId: this.chat.id,
      ...args,
    });
  }

  leave() {
    return this.telegram.leaveChat(this.chat.id);
  }
}
