const https = require('https');
const path = require('path');
const querystring = require('querystring');
const BaseClient = require("./BaseClient.js");
const { EventError, ParameterError } = require("./errorcollection.js");
const ms = require('ms');
/**
 * A class representing a Telegram Bot client.
 * @extends BaseClient
 */
class TelegramBot extends BaseClient {
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
  constructor(token, options = {}) {
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
  async login() {
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
  this.emit('ready', responseClient);
  while (true) {
    const getUpdates = await this.getUpdates();
    for (const updates of getUpdates) {
      console.log(this.lastTimeMap);
      let responseLastTime = this.lastTimeMap?.get('lastTime');
      console.log(responseLastTime);
      if (responseLastTime === 'auto')
        responseLastTime = true
        
      console.log(responseLastTime);
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
            parseMode: options.parseMode ?? defaults.replyMarkup
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

        
        const checkEntities = (...entityTypes) => {
          const allEntities = entityTypes.flatMap((entityType) => [
            updates.message?.[entityType],
            updates.edited_message?.[entityType],
            updates.channel_post?.[entityType],
            updates.channel_post?.pinned_message?.[entityType],
            updates.pinned_message?.[entityType],
            updates.edited_channel_post?.[entityType]
            ]);
            
            return allEntities.some((entities) => entities && entities.length > 0);
        };
        
        const isCommand = (checkAllEntities = false) => {
          if (checkAllEntities) {
            return checkEntities('entities', 'caption_entities', 'text_entities').some((entities) =>
            entities.some((entity) => entity.type === 'bot_command')
            );
          } else {
            return checkEntities('entities', 'caption_entities', 'text_entities').some(
              (entities) => entities && entities[0] && entities[0].type === 'bot_command'
              );
          }
        };
        
        const isPhoto = () => checkEntities('photo');
        const isDocument = () => checkEntities('document');
        const isAudio = () => checkEntities('audio');
        const isVideoNote = () => checkEntities('video_note');
        const isVoice = () => checkEntities('voice');
        const isSticker = () => checkEntities('sticker');
        const isContact = () => checkEntities('contact');
        const isPoll = () => checkEntities('poll');
        const isLocation = () => checkEntities('location');

        
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
}

module.exports = TelegramBot;