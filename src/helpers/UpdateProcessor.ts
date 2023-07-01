import { Context } from "./Context";
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

/**
 * Represents the UpdateProcessor class.
 */
export class UpdateProcessor {
  /**
   * The TelegramBot instance.
   */
  bot: TelegramBot;

  /**
   * The response updates object.
   */
  updates!: ResponseApi;

  context: Context;
  /**
   * Creates an instance of UpdateProcessor.
   * @param {TelegramBot} bot - The TelegramBot instance.
   */
  constructor(bot: TelegramBot) {
    this.bot = bot;
    this.context = new Context(this.updates, this.bot);
  }

  /**
   * Processes the updates.
   * @param {ResponseApi} [updates] - The updates object.
   * @returns {Promise<void>}
   */
  public async processUpdate(updates?: ResponseApi): Promise<void> {
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
                send: this.context.send.bind(this),
                leave: this.context.leave.bind(this),
              });
              const message: any = {
                ...updateProperty,
                chat,
                client: this,
                reply: this.context.reply.bind(this),
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
}
