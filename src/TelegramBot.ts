import { BaseClient } from "./BaseClient";
import {
  EventError,
  ParameterError
  } from "./errorcollection";
import { MessageCollector } from "./collection/MessageCollector";
/**
 * A class representing a Telegram Bot client.
 * @extends BaseClient
 */
export class TelegramBot extends BaseClient {
  private token: string = '';
  private intents: readonly string[] | number[] | null = null;
  private parseMode: string = '';
  private chatId: string | number = '';
  private queryString: string = '';
  private offSetType: any;
  private baseUrl: string = '';
  private countCollector: number = 0;
  /**
   * Creates a new TelegramBot client.
   * @param {string} token - The Telegram Bot API token.
   * @param {Object} [options] - The client options.
   * @param {string | array | number} [options.intents] - The client intents.
   * @param {string} [options.parseMode] - The parse mode for message formatting.
   * @param {string | number} [options.chatId] - The default chat ID for sending messages.
   * @param {string} [options.queryString] - The default query string for API requests.
   * @param {string | object} [options.offSetType] - The type of offset to use for updates.
   */
  constructor(token: string, options: {
    intents?: readonly string[] | number[] | null;
    parseMode?: string;
    chatId?: string | number;
    queryString?: string;
    offSetType?: any;
  } = {}) {
    super(
      token,
      options.intents,
      options.parseMode,
      options.chatId,
      options.queryString,
      options.offSetType
    );
    /**
     * The Telegram Bot API token.
     * @type {string}
     */
    this.token = token;
    /**
     * The base URL for the Telegram Bot API.
     * @type {string}
     */
    this.baseUrl = `https://api.telegram.org/bot${this.token}`;
    this.countCollector = 0;
  }
  
  /**
   * Registers a listener for the specified event.
   * @param {string} eventName - The name of the event.
   * @param {Function} listener - The listener function.
   */
  /**
   * on(eventName, listener) {
   * return this.on(eventName, listener);
   * }
   */
  

  /**
   * Removes the specified listener for the given event.
   * @param {string} eventName - The name of the event.
   * @param {Function} listener - The listener function to remove.
   */
  /**
   * off(eventName, listener) {
   * return this.off(eventName, listener);
   * }
   */ 
   
  /**
   * Registers a one-time listener for the specified event.
   * The listener is automatically removed after it's invoked.
   * @param {string} eventName - The name of the event.
   * @param {Function} listener - The listener function.
   */
   /**
    * once(eventName, listener) {
    * return this.once(eventName, listener);
    * }
    */
    /**
   * The function that starts the whole process
  */
  async login(): void {
  const client = await this.getMe();
  
  const responseClient = await {
    ...client,
    setCommands: this.setMyCommands.bind(this),
    getCommands: this.getMyCommands.bind(this),
    deleteCommands: this.deleteMyCommands.bind(this),
    setDescription: this.setMyDescription.bind(this),
    getDescription: this.getMyDescription.bind(this),
    setShortDescription: this.setMyShortDescription.bind(this),
    getShortDescription: this.getMyShortDescription.bind(this),
    getName: this.getMyName.bind(this),
    setName: this.setMyName.bind(this)
  };
  
  let lastUpdateTimestamp = new Date();
  (async() => {
   this.getMe().then(res => {
     this.emit('ready', responseClient);
   }).catch(err => {
     console.log(err);
   })
  })();
  while (true) {
    const getUpdates = await this.getUpdates();
    for (const updates of getUpdates) {
      let responseLastTime = this.lastTimeMap.get('lastTime');
      if (responseLastTime === 'auto')
        responseLastTime = true
        
      if (responseLastTime) {
        const leave = (chat_id) => {
          let chatId;
          
          if (updates?.callback_query) {
            chatId = chat_id || updates?.callback_query?.message?.chat?.id;
          } else {
            chatId = chat_id || updates?.message?.chat?.id;
          }
          
          return this.leaveChat({
            chatId: chatId
          })
        }
        
        const send = (options, defaults = {}) => {
          let chatId;
          let messageId;
          let text = typeof options === 'object' ? options.text : options;
          
          if (typeof options === 'object' && typeof defaults === 'object') {
            throw new ParameterError('default object should not have a text property');
          } else if (typeof options === 'string' && defaults.text) {
            throw new ParameterError('default object should not be used with a string message');
          } else if (typeof options === 'string' && typeof defaults === 'string') {
            throw new ParameterError('this code should not have two string parameters simultaneously.');
          }
          
          if (updates?.callback_query) {
            chatId = options.chatId || defaults?.chatId || updates?.callback_query?.message?.chat?.id;
            messageId = options.messageId || defaults?.messageId || updates?.callback_query?.message?.message_id;
          } else {
            chatId = options.chatId || defaults?.chatId || updates?.message?.chat?.id;
            messageId = options.messageId || defaults?.messageId || updates?.message?.message_id;
          }
          
          return this.sendMessage({
            text: text,
            chatId: chatId,
            messageId: messageId,
            replyMarkup: options.replyMarkup ?? defaults.replyMarkup,
            reply_to_message_id: messageId,
            allowReply: options.allowReply ?? defaults.replyMarkup,
            notification: options.notification ?? defaults.replyMarkup,
            content: options.content ?? defaults.replyMarkup,
            threadId: options.threadId ?? defaults.replyMarkup,
            parseMode: options.parseMode ?? defaults.replyMode
          });
        };
        
        const remove = (options) => {
          let chatId;
          let messageId;
          if (updates?.callback_query) {
            chatId = options?.chatId || updates?.callback_query?.message?.chat?.id || updates?.callback_query?.channel_post?.chat?.id;
            messageId = options?.messageId || updates?.callback_query?.message?.message_id || updates?.callback_query?.channel_post?.message_id;
          } else if (updates?.edited_message) {
            chatId = options?.chatId || updates?.edited_message?.chat?.id;
            messageId = options?.messageId || updates?.edited_message?.message_id;
          } else if (updates?.edited_channel_post) {
            chatId = options?.chatId || updates?.edited_channel_post?.chat?.id;
            messageId = options?.messageId || updates?.edited_channel_post?.message_id;
          } else {
            chatId = options?.chatId || updates?.message?.chat?.id || updates?.channel_post?.chat?.id;
            messageId = options?.messageId || updates?.message?.message_id || updates?.channel_post?.message_id;
          }

          
          return this.deleteMessage({
            chatId: chatId, 
            messageId: messageId,
            revoke: options?.revoke,
          })
        }
        
        const update = (options, defaults = {}) => {
          let chatId;
          let messageId;
          let text = typeof options === 'object' ? options.text : options;
          
          if (typeof options === 'object' && typeof defaults === 'object') {
            throw new ParameterError('default object should not have a text property');
          } else if (typeof options === 'string' && defaults.text) {
            throw new ParameterError('default object should not be used with a string message');
          } else if (typeof options === 'string' && typeof defaults === 'string') {
            throw new ParameterError('this code should not have two string parameters simultaneously.');
          }
          
          if (updates?.callback_query) {
            chatId = options?.chatId || defaults.chatId || updates?.callback_query?.message?.chat?.id || updates?.callback_query?.channel_post?.chat?.id;
            messageId = options?.messageId || defaults.messageId || updates?.callback_query?.message?.message_id || updates?.callback_query?.channel_post?.message_id;
          } else if (updates?.edited_message) {
            chatId = options?.chatId || defaults.chatId || updates?.edited_message?.chat?.id;
            messageId = options?.messageId || defaults.messageId || updates?.edited_message?.message_id;
          } else if (updates?.edited_channel_post) {
            chatId = options?.chatId || defaults.chatId || updates?.edited_channel_post?.chat?.id;
            messageId = options?.messageId || defaults?.messageId || updates?.edited_channel_post?.message_id;
          } else {
            chatId = options?.chatId || defaults.chatId || updates?.message?.chat?.id || updates?.channel_post?.chat?.id;
            messageId = options?.messageId || defaults.messageId || updates?.message?.message_id || updates?.channel_post?.message_id;
          }
          
          return this.editMessageText({
            chatId: chatId,
            messageId: messageId,
            text: text,
            replyMarkup: options.replyMarkup ?? defaults.replyMarkup,
            webPage: options.webPage ?? defaults.webPage,
            parseMode: options.parseMode ?? defaults.parseMode
          })
        }

        
        const reply = (options, defaults = {}) => {
          let chatId;
          let messageId;
          let text = typeof options === 'object' ? options.text : options;
          
          if (typeof options === 'object' && typeof defaults === 'object') {
            throw new ParameterError('default object should not have a text property');
          } else if (typeof options === 'string' && defaults?.text) {
            throw new ParameterError('default object should not be used with a string message');
          } else if (typeof options === 'string' && typeof defaults === 'string') {
            throw new ParameterError('this code should not have two string parameters simultaneously.');
          }
          
          if (updates?.callback_query) {
            chatId = options?.chatId || defaults.chatId || updates?.callback_query?.message?.chat?.id || updates?.callback_query?.channel_post?.chat?.id;
            messageId = options?.messageId || defaults.messageId || updates?.callback_query?.message?.message_id || updates?.callback_query?.channel_post?.message_id;
          } else if (updates?.edited_message) {
            chatId = options?.chatId || defaults.chatId || updates?.edited_message?.chat?.id;
            messageId = options?.messageId || defaults.messageId || updates?.edited_message?.message_id;
          } else if (updates?.edited_channel_post) {
            chatId = options?.chatId || defaults.chatId || updates?.edited_channel_post?.chat?.id;
            messageId = options?.messageId || defaults.messageId || updates?.edited_channel_post?.message_id;
            } else {
              chatId = options?.chatId || defaults.chatId || updates?.message?.chat?.id || updates?.channel_post?.chat?.id;
              messageId = options?.messageId || defaults?.messageId || updates?.message?.message_id || updates?.channel_post?.message_id;
            }
              
              return this.sendMessage({
                text: text,
                chatId: chatId,
                messageId: messageId,
                replyMarkup: options.replyMarkup ?? defaults.replyMarkup,
                replyToMessageId: messageId,
                allowReply: options.allowReply ?? defaults.allowReply,
                notification: options.notification ?? defaults.notification,
                content: options.content ?? defaults.content,
                threadId: options.threadId ?? defaults.threadId,
                parseMode: options.parseMode ?? defaults.parseMode
              });
        }
        
        const typing = (typing, options) => {
          let chatId;
          if (updates?.callback_query) {
            chatId = options?.chatId || updates?.callback_query?.message?.chat?.id || updates?.callback_query?.channel_post?.chat?.id;
          } else if (updates?.edited_message) {
            chatId = options?.chatId || updates?.edited_message?.chat?.id;
          } else if (updates?.edited_channel_post) {
            chatId = options?.chatId || updates?.edited_channel_post?.chat?.id;
            } else {
              chatId = options?.chatId || updates?.message?.chat?.id || updates?.channel_post?.chat?.id;
            }
            
            return this.sendChatAction({
              chatId,
              action: typing ? options.typing : 'typing'
            });
        }

        const isCommand = (checkAllEntities = false) => {
          let commandFound = false;
          const allEntities = [
            updates.message?.entities, updates.edited_message?.entities, updates.pinned_message?.entities, updates.channel_post?.entities, updates.channel_post?.pinned_message?.entities, updates.pinned_message?.entities, updates.message?.caption_entities, updates.pinned_message?.caption_entities, updates.channel_post?.pinned_message?.caption_entities, updates.edited_channel_post?.caption_entities].filter(Boolean);
            
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
        };
        
        const isPhoto = () => {
          let photoFound = false;
          const allEntities = [updates.message?.photo, updates.edited_message?.photo, updates.channel_post?.photo, updates.pinned_message?.photo, updates.channel_post?.pinned_message?.photo, updates.edited_channel_post?.photo].filter(Boolean);

          for (const entities of allEntities) {
            if (entities.length > 0) {
              photoFound = true;
              break;
            }
          }
          return photoFound;
        };
        
        const isDocument = () => {
          let documentFound = false;
          const allEntities = [updates.message?.document, updates.edited_message?.document, updates.channel_post?.document, updates.pinned_message?.document, updates.channel_post?.pinned_message?.document, updates.edited_channel_post?.document].filter(Boolean);

          for (const entities of allEntities) {
            if (entities.length > 0) {
              documentFound = true;
              break;
            }
          }
          return documentFound;
        };
        
        const isAudio = () => {
          let audioFound = false;
          const allEntities = [updates.message?.audio, updates.edited_message?.audio, updates.channel_post?.audio, updates.pinned_message?.audio, updates.channel_post?.pinned_message?.audio, updates.edited_channel_post?.audio].filter(Boolean);

          for (const entities of allEntities) {
            if (entities.length > 0) {
              audioFound = true;
              break;
            }
          }
          return audioFound;
        };
        
        const isVideoNote = () => {
          let videoNoteFound = false;
          const allEntities = [updates.message?.video_note, updates.edited_message?.video_note, updates.channel_post?.video_note, updates.pinned_message?.video_note, updates.channel_post?.pinned_message?.video_note, updates.edited_channel_post?.video_note].filter(Boolean);

          for (const entities of allEntities) {
            if (entities.length > 0) {
              videoNoteFound = true;
              break;
            }
          }
          return videoNoteFound;
        };
        
        const isVoice = () => {
          let voiceFound = false;
          const allEntities = [updates.message?.voice, updates.edited_message?.voice, updates.channel_post?.voice, updates.pinned_message?.voice, updates.channel_post?.pinned_message?.voice, updates.edited_channel_post?.voice].filter(Boolean);

          for (const entities of allEntities) {
            if (entities.length > 0) {
              voiceFound = true;
              break;
            }
          }
          return voiceFound;
        };
        
        const isSticker = () => {
          let stickerFound = false;
          const allEntities = [updates.message?.sticker, updates.edited_message?.sticker, updates.channel_post?.sticker, updates.pinned_message?.sticker, updates.channel_post?.pinned_message?.sticker, updates.edited_channel_post?.sticker].filter(Boolean);

          for (const entities of allEntities) {
            if (entities.length > 0) {
              stickerFound = true;
              break;
            }
          }
          return stickerFound;
        };
        
        const isContact = () => {
          let contactFound = false;
          const allEntities = [updates.message?.contact, updates.edited_message?.contact, updates.channel_post?.contact, updates.pinned_message?.contact, updates.channel_post?.pinned_message?.contact, updates.edited_channel_post?.contact].filter(Boolean);

          for (const entities of allEntities) {
            if (entities.length > 0) {
              contactFound = true;
              break;
            }
          }
          return contactFound;
        };
        
        const isPoll = () => {
          let pollFound = false;
          const allEntities = [updates.message?.poll, updates.edited_message?.poll, updates.channel_post?.poll, updates.pinned_message?.poll, updates.channel_post?.pinned_message?.poll, updates.edited_channel_post?.poll].filter(Boolean);

          for (const entities of allEntities) {
            if (entities.length > 0) {
              pollFound = true;
              break;
            }
          }
          return pollFound;
        };
        
        const isLocation = () => {
          let locationFound = false;
          const allEntities = [updates.message?.location, updates.edited_message?.location, updates.channel_post?.location, updates.pinned_message?.location, updates.channel_post?.pinned_message?.location, updates.edited_channel_post?.location].filter(Boolean);

          for (const entities of allEntities) {
            if (entities.length > 0) {
              locationFound = true;
              break;
            }
          }
          return locationFound;
        };
        
        const createMessageCollector = (options) => {
          let {
            chatId,
            filter,
            time,
            max
          } = options;
          chatId = chatId ? chatId : updates.message.chat.id;
          filter = filter ? filter : () => true;
          time = time ? time : 60000;
          const response = new MessageCollector({
            chatId,
            filter,
            time,
            max, 
          });
          
          this.on('message', (msg) => {
            response.handleMessage(msg);
          });
          
          return response;
        };
        
        const deferUpdate = async (id) => {
          const queryId = updates?.callback_query?.id
          await this.answerCallbackQuery({
            callbackQueryId: queryId ?? id
          }).catch(err => console.log)
        };
        
        const processUpdate = (updates) => {
          const messageTypeMap = {
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
          
          for (const [type, options] of Object.entries(messageTypeMap)) {
            const updateProperty = updates[type];
            if (updateProperty) {
              const chat = Object.assign({}, updateProperty.chat, { send, leave, typing });
              //const client = Object.assign({}, responseClient ,{session: this.offset});
              const message = {
                ...updateProperty,
                chat,
                client: responseClient,
                remove,
                update,
                reply,
                createMessageCollector,
                isCommand,
                isLocation,
                isPoll,
                isContact,
                isSticker,
                isVoice,
                isVideoNote,
                isAudio,
                isDocument,
                isPhoto,
                update,
                deferUpdate: type === 'callback_query' ? deferUpdate : null
              };
              this.emit(options.event, message);
              if (options.textEvent && updateProperty.text) {
                this.emit(options.textEvent, message);
              }
              if (options.captionEvent && updateProperty.caption) {
                this.emit(options.captionEvent, message);
              }
              if (type === 'message' && updateProperty.reply_to_message) {
                this.emit('reply_message', message);
              }
              break;
            }
          }
        }

        processUpdate(updates);
      }
    }
  }
 }
};