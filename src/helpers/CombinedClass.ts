import { TelegramBot } from "../TelegramBot";
import { ParameterError } from "../errorcollection";

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
  message?: object;
  chat?: object;
  from?: object;
  edited_message?: object;
  channel_post?: object;
  edited_channel_post?: object;
  inline_query?: object;
  chosen_inline_result?: object;
  callback_query?: object;
  shipping_query?: object;
  pre_checkout_query?: object;
  poll?: object;
  poll_answer?: object;
  my_chat_member?: object;
  chat_member?: object;
  chat_join_request?: object;
  pinned_message?: object;
  sender_chat?: object;
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

class CombinedClass {
  bot: TelegramBot;
  updates!: ResponseApi;
  botInfo?: botInfo;

  constructor(bot: TelegramBot, botInfo?: botInfo) {
    this.bot = bot;
    this.botInfo = botInfo;
  }

  get me() {
    return this.botInfo?.username;
  }

  get message() {
    return this.updates.message;
  }

  get messageId() {
    return this.updates.message_id;
  }

  get editedMessage() {
    return this.updates?.edited_message;
  }

  get inlineQuery() {
    return this.updates?.inline_query;
  }

  get shippingQuery() {
    return this.updates?.shipping_query;
  }

  get preCheckoutQuery() {
    return this.updates?.pre_checkout_query;
  }

  get chosenInlineResult() {
    return this.updates?.chosen_inline_result;
  }

  get channelPost() {
    return this.updates?.channel_post;
  }

  get editedChannelPost() {
    return this.updates?.edited_channel_post;
  }

  get callbackQuery() {
    return this.updates?.callback_query;
  }

  get poll() {
    return this.updates?.poll;
  }

  get pollAnswer() {
    return this.updates?.poll_answer;
  }

  get myChatMember() {
    return this.updates?.my_chat_member;
  }

  get chatMember() {
    return this.updates?.chat_member;
  }

  get chatJoinRequest() {
    return this.updates?.chat_join_request;
  }

  get chat() {
    return (
      this.chatMember ??
      this.myChatMember ??
      this.chatJoinRequest ??
<<<<<<< HEAD
      this.updates as any
      )?.chat;
=======
      this.message ??
      (this.updates as any)
    )?.chat;
>>>>>>> 4b1566e (add @grammyjs/types and action. beginning)
  }

  get senderChat() {
    return this.updates?.sender_chat;
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
    }
  ) {
    return this.bot.sendMessage({
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
      replyToMessageId?: number;
      threadId?: number;
      parseMode?: string;
    }
  ) {
    return this.bot.sendMessage({
      text: text,
      chatId: this.chat.id,
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
        let responseLastTime = this.bot.lastTimeMap.get("lastTime");
        if (responseLastTime === "auto") responseLastTime = true;

        if (responseLastTime) {
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
                    replyMarkup?: any;
                    allowReply?: boolean;
                    notification?: boolean;
                    content?: boolean | undefined;
                    replyToMessageId: number;
                    threadId?: number;
                    parseMode?: string;
                  }
                ) => this.send(text, args),
                leave: () => this.leave(),
              });
              const message: any = {
                ...updateProperty,
                chat,
                client: this,
                reply: (
                  text: string,
                  args?: {
                    replyMarkup?: any;
                    allowReply?: boolean;
                    notification?: boolean;
                    content?: boolean | undefined;
                    threadId?: number;
                    parseMode?: string;
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
<<<<<<< HEAD

  // Add other methods or properties specific to the CombinedClass
  // that you want to incorporate from both UpdateProcessor and Context classes.
}

export { CombinedClass };
=======
}

export { CombinedClass };
>>>>>>> 4b1566e (add @grammyjs/types and action. beginning)
