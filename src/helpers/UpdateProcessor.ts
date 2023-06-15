import { BaseClient } from "../BaseClient";
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

type SendOptions = {
  chatId?: number | string;
  messageId?: number;
  text?: string;
  replyMarkup?: string;
  allowReply?: boolean;
  notification?: boolean;
  replyToMessageId?: number;
  content?: boolean;
  threadId?: number;
  parseMode?: string;
}

type Defaults = {
  text?: string;
  chatId?: number | string;
  messageId?: number;
  replyMarkup?: string;
  allowReply?: boolean;
  notification?: boolean
  replyToMessageId?: number;
  content?: boolean;
  threadId?: number;
  parseMode?: string;
}

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
                send: (args: SendOptions, defaults?: Defaults) => this.send(args, defaults),
                leave: (args?: string | number) => this.leave(args)
              });
              const message: any = {
                ...updateProperty,
                chat,
                client: this,
                reply: (args: SendOptions, defaults?: Defaults) => this.reply(args, defaults),
                isCommand: (args?: boolean) => this.isCommand(args)
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

  public async reply(
    options: SendOptions,
    defaults?: Defaults
    ): Promise<object | undefined> {
      let chatId: string | number;
      let messageId: number | undefined;
      let text: string | undefined = typeof options === 'object' ? options.text : options;
      
      if (typeof options === 'object' && typeof defaults === 'object') {
        throw new ParameterError('default object should not have a text property');
      } else if (typeof options === 'string' && defaults?.text) {
        throw new ParameterError('default object should not be used with a string message');
      } else if (typeof options === 'string' && typeof defaults === 'string') {
        throw new ParameterError('this code should not have two string parameters simultaneously.');
      }
      
      if ((this.updates?.callback_query as any)?.message) {
        chatId = options?.chatId || defaults?.chatId || (this.updates.callback_query as any)?.chat?.id;
        messageId = options?.messageId || defaults?.messageId || (this.updates.callback_query as any)?.message?.message_id;
      } else if (this.updates?.edited_message) {
        chatId = options?.chatId || defaults?.chatId || (this.updates.edited_message as any)?.chat?.id;
        messageId = options?.messageId || defaults?.messageId || (this.updates.edited_message as any)?.message_id;
      } else if (this.updates?.edited_channel_post) {
        chatId = options?.chatId || defaults?.chatId || (this.updates.edited_channel_post as any)?.chat?.id;
        messageId = options?.messageId || defaults?.messageId || (this.updates.edited_channel_post as any)?.message_id;
      } else {
        chatId = options?.chatId || defaults?.chatId || (this.updates?.chat as any)?.id || (this.updates?.channel_post as any)?.chat?.id;
        messageId = options?.messageId || defaults?.messageId || this.updates?.message_id || (this.updates?.channel_post as any)?.message_id;
      }
    
    if (text === undefined) {
      throw new ParameterError('Text is missing');
    }
    
    return this.functions.sendMessage({
      text: text,
      chatId: chatId,
      replyMarkup: options.replyMarkup ?? defaults?.replyMarkup,
      allowReply: options.allowReply ?? defaults?.allowReply,
      replyToMessageId: messageId,
      notification: options.notification ?? defaults?.notification,
      content: options.content ?? defaults?.content,
      threadId: options.threadId ?? defaults?.threadId,
      parseMode: options.parseMode ?? defaults?.parseMode
    });
   }


  public async send(
    options: SendOptions,
    defaults?: Defaults
    ): Promise<object | undefined> {
      let chatId: string | number;
      let messageId: number | undefined;
      let text: string | undefined = typeof options === 'object' ? options.text : options;
      
      if (typeof options === 'object' && typeof defaults === 'object') {
        throw new ParameterError('default object should not have a text property');
      } else if (typeof options === 'string' && defaults?.text) {
        throw new ParameterError('default object should not be used with a string message');
      } else if (typeof options === 'string' && typeof defaults === 'string') {
        throw new ParameterError('this code should not have two string parameters simultaneously.');
      }
      
      if ((this.updates?.callback_query as any)?.message) {
        chatId = options?.chatId || defaults?.chatId || (this.updates.callback_query as any)?.chat?.id;
      } else if (this.updates?.chat) {
        chatId = options?.chatId || defaults?.chatId || (this.updates.chat as any)?.id;
      } else {
        throw new ParameterError('ChatId is missing');
      }
      
      if (text === undefined) {
        throw new ParameterError('Text is missing');
      }
      
      return this.functions.sendMessage({
        text: text,
        chatId: chatId,
        replyMarkup: options?.replyMarkup ?? defaults?.replyMarkup,
        allowReply: options?.allowReply ?? defaults?.allowReply,
        notification: options?.notification ?? defaults?.notification,
        content: options?.content ?? defaults?.content,
        threadId: options?.threadId ?? defaults?.threadId,
        parseMode: options?.parseMode ?? defaults?.parseMode
      });
    }

  public async leave(chatId?: number | string): Promise<object | undefined> {
    let chat_id: string | number;
    if (this.updates?.callback_query) {
      chat_id = (this.updates?.callback_query as any)?.message?.chat?.id;
    } else {
      chat_id = (this.updates?.chat as any)?.id;
    }
    return this.functions.leaveChat(chat_id);
  }

  public isCommand(checkAllEntities?: boolean): boolean {
    let commandFound = false;
    const allEntities = [
      (this.updates.message as any)?.entities, (this.updates.edited_message as any)?.entities, (this.updates.pinned_message as any)?.entities, (this.updates.channel_post as any)?.entities, (this.updates.channel_post as any)?.pinned_message?.entities, (this.updates.pinned_message as any)?.entities, (this.updates.message as any)?.caption_entities, (this.updates.pinned_message as any)?.caption_entities, (this.updates.channel_post as any)?.pinned_message?.caption_entities, (this.updates.edited_channel_post as any)?.caption_entities].filter(Boolean);
      if (checkAllEntities) {
        for (const entities of allEntities) {
          for (const entity of entities) {
            if (entity.type === 'bot_command') {
              commandFound = true;
              break;
            }
          }
          if (commandFound) {
            break;
          }
        }
      } else {
        const firstEntities = allEntities[0];
        if (firstEntities) {
          const firstEntity = firstEntities[0];
          if (firstEntity) {
            commandFound = firstEntity.type === 'bot_command';
          }
        }
      }
      return commandFound;
  }
};