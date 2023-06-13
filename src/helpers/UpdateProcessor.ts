import { BaseClient } from "./BaseClient";

type MessageTypeMap = {
  [key: string]: {
    event: string;
    textEvent?: string;
    captionEvent?: string;
  };
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

export class UpdateProcessor extends BaseClient {
  private bot: TelegramBot;

  constructor(bot: TelegramBot) {
    super();
    this.bot = bot;
  }

  public processUpdate(
    updates: object
    ): void {
    for (const [type, options] of Object.entries(messageTypeMap)) {
      const updateProperty = updates[type];
      if (updateProperty) {
        const chat = Object.assign({}, updateProperty.chat, {
          send: this.send,
          leave: this.leave,
          typing: this.typing
        });
        const message = {
          ...updateProperty,
          chat,
          client: responseClient,
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
  
  reply(): void {
    
  }
  
  send(): void {
    
  }
  
  typing(): void {
    
  }
  
  leave(): void {
    
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