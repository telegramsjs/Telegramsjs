import { BaseClient } from "../BaseClient";
import { TelegramBot } from "../TelegramBot";

type MessageTypeMap = {
  [key: string]: {
    event: string;
    textEvent?: string;
    captionEvent?: string;
  };
};

type ResponseApi = {
  update_id?: number;
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
};

const messageTypeMap: MessageTypeMap = {
  message: {
    event: 'message',
    textEvent: 'text'
  },
  edited_message: {
    event: 'edited_message',
    textEvent: 'edited_message_text',
    captionEvent: 'edited_message_caption',
  },
  channel_post: {
    event: 'channel_post'
  },
  edited_channel_post: {
    event: 'edited_channel_post',
    textEvent: 'edited_channel_post_text',
    captionEvent: 'edited_channel_post_caption',
  },
  inline_query: {
    event: 'inline_query',
  },
  chosen_inline_result: {
    event: 'chosen_inline_result',
  },
  callback_query: {
    event: 'callback_query',
  },
  shipping_query: {
    event: 'shipping_query',
  },
  pre_checkout_query: {
    event: 'pre_checkout_query',
  },
  poll: {
    event: 'poll',
  },
  poll_answer: {
    event: 'poll_answer'
  },
  chat_member: {
    event: 'chat_member',
  },
  my_chat_member: {
    event: 'my_chat_member',
  },
  chat_join_request: {
    event: 'chat_join_request',
  },
};

export class UpdateProcessor {
  bot: TelegramBot;
  updates!: ResponseApi;
  functions: BaseClient;

  constructor(bot: TelegramBot) {
    this.bot = bot;
    this.functions = new BaseClient(
      bot.token,
      bot.intents,
      bot.parseMode,
      bot.chatId,
      bot.queryString,
      bot.offSetType
    );
    console.log(this.functions);
  }

  public async processUpdate(updates?: ResponseApi): Promise<void> {
    while (true) {
      const getUpdates = await this.bot.getUpdates();
      for (const update of getUpdates) {
        let responseLastTime = this.bot.lastTimeMap.get('lastTime');
        if (responseLastTime === 'auto')
          responseLastTime = true;

        if (responseLastTime) {
          for (const [type, options] of Object.entries(messageTypeMap)) {
            const updateProperty: any = (update as ResponseApi)[type as keyof ResponseApi];
            this.updates = updateProperty as ResponseApi;
            if (updateProperty) {
              const chat: any = Object.assign({}, updateProperty.chat, {
                send: this.send,
                leave: (args?: string | number) => this.leave(args),
                typing: this.typing
              });
              const message: any = {
                ...updateProperty,
                chat,
                client: this,
                remove: this.remove,
                edit: this.edit,
                reply: this.reply,
                createMessageCollector: this.createMessageCollector,
                isCommand: this.isCommand,
                isLocation: this.isLocation,
                isPoll: this.isPoll,
                isContact: this.isContact,
                isSticker: this.isSticker,
                isVoice: this.isVoice,
                isVideoNote: this.isVideoNote,
                isAudio: this.isAudio,
                isDocument: this.isDocument,
                isPhoto: this.isPhoto,
                deferUpdate: type === 'callback_query' ? this.deferUpdate : null
              };
              this.bot.emit(options.event, message);
              if (options.textEvent && updateProperty.text) {
                this.bot.emit(options.textEvent, message);
              }
              if (options.captionEvent && updateProperty.caption) {
                this.bot.emit(options.captionEvent, message);
              }
              if (type === 'message' && updateProperty.reply_to_message) {
                this.bot.emit('reply_message', message);
              }
              break;
            }
          }
        }
      }
    }
  }

  reply(): void {

  }

  send(): void {

  }

  typing(): void {

  }

  leave(chatId?: number | string): object {
    let chat_id: string | number;
    if (this.updates?.callback_query) {
      chat_id = (this.updates?.callback_query as any)?.message?.chat?.id;
    } else {
      chat_id = (this.updates?.chat as any)?.id;
    }
    return this.functions.leaveChat(chat_id);
  }

  remove(): void {

  }

  edit(): void {

  }

  createMessageCollector(): void {

  }

  deferUpdate(): void {

  }

  isCommand(): void {

  }

  isPhoto(): void {

  }

  isDocument(): void {

  }

  isAudio(): void {

  }

  isVideoNote(): void {

  }

  isSticker(): void {

  }

  isVoice(): void {

  }

  isContact(): void {

  }

  isPoll(): void {

  }

  isLocation(): void {

  }
};