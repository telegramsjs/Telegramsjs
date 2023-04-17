const https = require('https');
const querystring = require('querystring');
const BaseClient = require("./BaseClient.js");
const { EventError } = require("./errorcollection.js");
const ms = require('ms');
/**
 * A class representing a Telegram Bot client.
 * @extends BaseClient
 * /
 * class TelegramBot extends BaseClient {
/*
 * Creates a new TelegramBot client.
 * @param {string} token - The Telegram Bot API token.
 * @param {Object} [options] - The client options.
 * @param {Object} [options.intents] - The client intents.
*/
class TelegramBot extends BaseClient {
  constructor(token, options) {
    super(token, options?.intents);
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
    /**
     * Event listeners for the client.
     * @type {Object<string, Array<Function>>}
     */
    this.listeners = {
      ready: [],
      privateMessageCreate: [],
      privateMessageUpdate: [],
      privateMessagePinned: [],
      privatePhotoCreate: [],
      privateStickerCreate: [],
      privateVoiceCreate: [],
      privateVideoNoteCreate: [],
      privateAudioCreate: [],
      privateDocumentCreate: [],
      privatePhotoUpdate: [],
      privateStickerUpdate: [],
      privateVoiceUpdate: [],
      privateVideoNoteUpdate: [],
      privateAudioUpdate: [],
      privateDocumentUpdate: [],
      privateConcatCreate: [],
      privatePollCreate: [],
      privateLocationCreate: [],
      
      groupMessagePinned: [],
      groupMessageUpdate: [],
      groupMessageCreate: [],
      groupPermsUpdate: [],
      groupMemberAdd: [],
      groupMemberLeft: [],
      groupForumCreate: [],
      groupForumMessageCreate: [],
      groupForumReopened: [],
      groupForumClose: [],
      groupBroadcastStart: [],
      groupBroadcastEnd: [],
      groupBroadcastScheduled: [],
      groupAvatarUpdate: [],
      groupNameUpdate: [],
      groupPhotoCreate: [],
      groupStickerCreate: [],
      groupVoiceCreate: [],
      groupVideoNoteCreate: [],
      groupAudioCreate: [],
      groupDocumentCreate: [],
      groupPhotoUpdate: [],
      groupStickerUpdate: [],
      groupVoiceUpdate: [],
      groupVideoNoteUpdate: [],
      groupAudioUpdate: [],
      groupDocumentUpdate: [],
      groupConcatCreate: [],
      groupPollCreate: [],
      groupLocationCreate: [],
      groupBroadcastInvited: [],
      
      channelMessagePinned: [],
      channelMessageCreate: [],
      channelMessageUpdate: [],
      channelPermsUpdate: [],
      channelNameUpdate: [],
      channelPhotoUpdate: [],
      channelBroadcastStart: [],
      channelBroadcastEnd: [],
      channelBroadcastScheduled: [],
      channelPhotoCreate: [],
      channelStickerCreate: [],
      channelVoiceCreate: [],
      channelVideoNoteCreate: [],
      channelAudioCreate: [],
      channelDocumentCreate: [],
      channelAvatarUpdate: [],
      channelStickerUpdate: [],
      channelVoiceUpdate: [],
      channelVideoNoteUpdate: [],
      channelAudioUpdate: [],
      channelDocumentUpdate: [],
      channelConcatCreate: [],
      channelPollCreate: [],
      channelLocationCreate: [],
      
      generalMessageCreate: [],

      interactionCreate: [],
    }
  }
  
  /**
   * Adds a listener for the specified event.
   * @param {string} event - The name of the event.
   * @param {Function} listener - The listener function.
   * @throws {EventError} If the specified event is not supported.
   */
  on(event, listener) {
    if (!this.listeners[event]) {
      throw new EventError(`event "${event}" is not supported`);
    }
    this.listeners[event].push({
      listener,
      once: false
    });
  }
  
  /**
   * Adds a one-time listener for the specified event.
   * @param {string} event - The name of the event.
   * @param {Function} listener - The listener function.
   * @throws {EventError} If the specified event is not supported.
   */
  once(event, listener) {
    if (!this.listeners[event]) {
      throw new EventError(`event "${event}" is not supported`);
    }
    this.listeners[event].push({
      listener,
      once: false
    });
  }

  emit(event, ...args) {
    if (!this.listeners[event]) {
      throw new EventError(`event "${event}" is not supported`);
    }
    for (let i = 0; i < this.listeners[event].length; i++) {
      const { listener, once } = this.listeners[event][i];
      listener(...args);
      if (once) {
        this.listeners[event].splice(i, 1);
        i--;
      }
    }
  }
  /**
   * Removes the specified listener for the specified event.
   * @param {string} eventName - The name of the event.
   * @param {Function} listener - The listener function to remove.
   */
  off(eventName, listener) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(l => l !== listener);
    }
  }
  
  async login() {
  const client = await this.request('getMe');
  this.emit('ready', client.result);
  let lastUpdateTimestamp = new Date();
  while (true) {
    const getUpdates = await this.getUpdates();
    for (const updates of getUpdates) {
      console.log(updates);
      const time = updates.message?.date ?? updates.callback_query?.message?.date;
      const isMessage = !!updates.message;
      const isCallbackQuery = !!updates.callback_query;
      const updateTimestamp = new Date(time * 1000);
      if ((updateTimestamp > lastUpdateTimestamp && isMessage) || isCallbackQuery) {
        lastUpdateTimestamp = updateTimestamp;
        
        const send = (options) => {
          let chatId;
          let messageId;
          let text = typeof options === 'object' ? options.text : options
          if (updates?.callback_query) {
            chatId = options.chatId || updates?.callback_query?.message?.chat?.id;
            messageId = options.messageId || updates?.callback_query?.message?.message_id;
          } else {
            chatId = options.chatId || updates?.message?.chat?.id;
            messageId = options.messageId || updates?.message?.message_id;
          }
          
          return this.sendMessage({
            text: text,
            chatId: chatId,
            messageId: messageId,
            button: options.button,
            reply_to_message_id: messageId,
            allowReply: options.allowReply,
            notification: options.notification,
            content: options.content,
            threadId: options.threadId,
            parseMode: options.parseMode
          });
        };
        
        const deleted = (options) => {
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
            revoke: options.revoke
          })
        }
        
        const update = (options) => {
          let chatId;
          let messageId;
          let text = typeof options === 'object' ? options.text : options
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

          
          return this.editMessageText({
            chatId: chatId,
            messageId: messageId,
            text: text,
            replyMarkup: options.replyMarkup,
            webPage: options.webPage,
            parseMode: options.parseMode
          })
        }
        
        const reply = (options) => {
          let chatId;
          let messageId;
          let text = typeof options === 'object' ? options.text : options
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

          
          return this.sendMessage({
            text: text,
            chatId: chatId,
            messageId: messageId,
            replyMarkup: options.replyMarkup,
            replyToMessageId: messageId,
            allowReply: options.allowReply,
            notification: options.notification,
            content: options.content,
            threadId: options.threadId,
            parseMode: options.parseMode
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
        
        const defer = (id) => {
          const queryId = updates?.callback_query?.id
          this.answerCallbackQuery({
            callbackQueryId: queryId ?? id
          }).catch(err => console.log)
        }
        
        if (updates?.message?.chat?.type === 'group' || updates?.message?.chat?.type === 'supergroup') {
          
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('groupMessageCreate', message);
        }

        if (updates?.edited_message?.chat?.type === 'private') {
          
          const chat = Object.assign({}, updates.edited_message.chat, { send });
          const message = {
            ...updates.edited_message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('privateMessageUpdate', message);
        }
        
        if (updates?.message?.chat?.type === 'private') {
          
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('privateMessageCreate', message);
        }
        
        if (updates?.message?.chat?.type === 'group' || updates?.message?.chat?.type === 'supergroup' && updates?.message?.video_chat_participants_invited) {
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
            update,
            reply,
            isCommand,
            isPhoto,
            isLocation,
            isPoll,
            isContact,
            isSticker,
            isVoice,
            isVideoNote,
            isAudio,
            isDocument,
            isPhoto
          };
          
          this.emit('groupBroadcastInvited', message);
          
        }

        if (updates?.edited_message?.chat?.type === 'group' || updates?.edited_message?.chat?.type === 'supergroup'|| updates?.edited_message?.chat?.type === 'supergroups') {
          
          const chat = Object.assign({}, updates.edited_message.chat, { send });
          const message = {
            ...updates.edited_message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('groupMessageUpdate', message);
        }

        /*if (updates?.delete_message?.chat?.type === 'private') {
          
          const message = Object.assign({}, updates.delete_message, { send, deleted, update, reply });
          this.emit('privateMessageDelete', message);
        }*/

        /*if (updates?.delete_message?.chat?.type === 'group' || updates?.delete_message?.chat?.type === 'supergroup') {
          
          const message = Object.assign({}, updates.delete_message, { send, deleted, update, reply });
          this.emit('groupMessageDelete', message);
        }*/

        if (updates?.message?.chat?.type === 'group' || updates?.message?.chat?.type === 'supergroup' || updates?.message?.chat?.type === 'supergroups') {
          
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message.pinned_message,
            chat: chat,
            deleted,
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
            isPhoto
          };

          this.emit('groupMessagePinned', message);
        }
        
        if (updates?.message?.chat?.type === 'private' && updates?.message?.pinned_message) {
          
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message.pinned_message,
            chat: chat,
            deleted,
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
            isPhoto
          };

          this.emit('privateMessagePinned', message);
        }

        if (updates?.pinned_message?.chat?.type === 'channel') {
          
          const chat = Object.assign({}, updates.pinned_message.chat, { send });
          const message = {
            ...updates.pinned_message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('channelMessagePinned', message);
        }
        
        /*if (updates?.delete_chat_message?.chat?.type === 'channel') {
          
          const message = Object.assign({}, updates.delete_chat_message, { send, deleted, update, reply });
          this.emit('channelMessageDelete', message);
        }*/
        
        if (updates?.edited_channel_post?.chat?.type === 'channel') {
          
          const chat = Object.assign({}, updates.edited_channel_post.chat, { send });
          const message = {
            ...updates.edited_channel_post,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('channelMessageUpdate', message);
        }

        if (updates?.channel_post?.chat?.type === 'channel') {
          
          const chat = Object.assign({}, updates.channel_post.chat, { send });
          const message = {
            ...updates.channel_post,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('channelMessageCreate', message);
        }
        
        if (updates.callback_query) {
          const chat = Object.assign({}, updates.callback_query.chat, { send });
          const interaction = {
            ...updates.callback_query,
            chat: chat,
            deleted,
            update,
            reply,
            defer,
            isCommand,
            isLocation,
            isPoll,
            isContact,
            isSticker,
            isVoice,
            isVideoNote,
            isAudio,
            isDocument,
            isPhoto
          };
          
            this.emit('interactionCreate', interaction);
        }
        
        if (updates?.message?.chat?.type === 'private' || updates?.message?.chat?.type === 'group' || updates?.message?.chat?.type === 'supergroup' || updates?.message?.chat?.type === 'supergroups') {
          
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          this.emit('generalMessageCreate', message);
        }
        
        if (updates?.message?.chat?.type === 'private' && updates?.message?.photo) {
          
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('privatePhotoCreate', message);
        }
        
        if (updates?.message?.chat?.type === 'private' && updates?.message?.sticker) {
          
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          this.emit('privateStickerCreate', message);
        }
        
        if (updates?.message?.chat?.type === 'private' && updates?.message?.voice) {
          
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('privateVoiceCreate', message);
        }
        
        if (updates?.message?.chat?.type === 'private' && updates?.message?.video_note) {
          
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('privateVideoNoteCreate', message);
        }
        
        if (updates?.message?.chat?.type === 'private' && updates?.message?.audio) {
          
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('privateAudioCreate', message);
        }
        
        if (updates?.message?.chat?.type === 'private' && updates?.message?.document) {
          
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('privateDocumentCreate', message);
        }
        
        if (updates?.edited_message?.chat?.type === 'private' && updates?.edited_message?.photo) {
          
          const chat = Object.assign({}, updates.edited_message.chat, { send });
          const message = {
            ...updates.edited_message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('privatePhotoUpdate', message);
        }
        
        if (updates?.edited_message?.chat?.type === 'private' && updates?.edited_message?.sticker) {
          
          const chat = Object.assign({}, updates.edited_message.chat, { send });
          const message = {
            ...updates.edited_message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('privateStickerUpdate', message);
        }
        
        if (updates?.edited_message?.chat?.type === 'private' && updates?.edited_message?.voice) {
          
          const chat = Object.assign({}, updates.edited_message.chat, { send });
          const message = {
            ...updates.edited_message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('privateVoiceUpdate', message);
        }
        
        if (updates?.edited_message?.chat?.type === 'private' && updates?.edited_message?.video_note) {
          
          const chat = Object.assign({}, updates.edited_message.chat, { send });
          const message = {
            ...updates.edited_message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('privateVideoNoteUpdate', message);
        }
        
        if (updates?.edited_message?.chat?.type === 'private' && updates?.edited_message?.audio) {
          
          const chat = Object.assign({}, updates.edited_message.chat, { send });
          const message = {
            ...updates.edited_message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('privateAudioUpdate', message);
        }
        
        if (updates?.edited_message?.chat?.type === 'private' && updates?.edited_message?.document) {
          
          const chat = Object.assign({}, updates.edited_message.chat, { send });
          const message = {
            ...updates.edited_message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('privateDocumentUpdate', message);
        }
        
        if (updates?.message?.chat?.type === 'supergroup' || updates?.message?.chat?.type === 'group' || updates?.message?.chat?.type === 'supergroups' && updates?.message?.photo) {
          
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('groupPhotoCreate', message);
        }
        
        if (updates?.message?.chat?.type === 'supergroup' || updates?.message?.chat?.type === 'group' || updates?.message?.chat?.type === 'supergroups'&& updates?.message?.sticker) {
          
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('groupStickerCreate', message);
        }
        
        if (updates?.message?.chat?.type === 'supergroup' || updates?.message?.chat?.type === 'group' || updates?.message?.chat?.type === 'supergroups' && updates?.message?.voice) {
          
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('groupVoiceCreate', message);
        }
        
        if (updates?.message?.chat?.type === 'supergroup' || updates?.message?.chat?.type === 'group' || updates?.message?.chat?.type === 'supergroups' && updates?.message?.video_note) {
          
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('groupVideoNoteCreate', message);
        }
        
        if (updates?.message?.chat?.type === 'supergroup' || updates?.message?.chat?.type === 'group' || updates?.message?.chat?.type === 'supergroups' && updates?.message?.audio) {
          
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('groupAudioCreate', message);
        }
        
        if (updates?.message?.chat?.type === 'supergroup' || updates?.message?.chat?.type === 'group' || updates?.message?.chat?.type === 'supergroups' && updates?.message?.document) {
          
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('groupDocumentCreate', message);
        }
        
        if (updates?.edited_message?.chat?.type === 'group' || updates?.edited_message?.chat?.type === 'supergroup'|| updates?.edited_message?.chat?.type === 'supergroups' && updates?.edited_message?.photo) {
          
          const chat = Object.assign({}, updates.edited_message.chat, { send });
          const message = {
            ...updates.edited_message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('groupPhotoUpdate', message);
        }
        
        if (updates?.edited_message?.chat?.type === 'group' || updates?.edited_message?.chat?.type === 'supergroup'|| updates?.edited_message?.chat?.type === 'supergroups' && updates?.edited_message?.sticker) {
          
          const chat = Object.assign({}, updates.edited_message.chat, { send });
          const message = {
            ...updates.edited_message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('groupStickerUpdate', message);
        }
        
        if (updates?.edited_message?.chat?.type === 'group' || updates?.edited_message?.chat?.type === 'supergroup'|| updates?.edited_message?.chat?.type === 'supergroups' && updates?.edited_message?.voice) {
          
          const chat = Object.assign({}, updates.edited_message.chat, { send });
          const message = {
            ...updates.edited_message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('groupVoiceUpdate', message);
        }
        
        if (updates?.edited_message?.chat?.type === 'group' || updates?.edited_message?.chat?.type === 'supergroup'|| updates?.edited_message?.chat?.type === 'supergroups' && updates?.edited_message?.video_note) {
          
          const chat = Object.assign({}, updates.edited_message.chat, { send });
          const message = {
            ...updates.edited_message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('groupVideoNoteUpdate', message);
        }
        
        if (updates?.edited_message?.chat?.type === 'group' || updates?.edited_message?.chat?.type === 'supergroup'|| updates?.edited_message?.chat?.type === 'supergroups' && updates?.edited_message?.audio) {
          
          const chat = Object.assign({}, updates.edited_message.chat, { send });
          const message = {
            ...updates.edited_message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('groupAudioUpdate', message);
        }
        
        if (updates?.edited_message?.chat?.type === 'group' || updates?.edited_message?.chat?.type === 'supergroup'|| updates?.edited_message?.chat?.type === 'supergroups' && updates?.edited_message?.document) {
          
          const chat = Object.assign({}, updates.edited_message.chat, { send });
          const message = {
            ...updates.edited_message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('groupDocumentUpdate', message);
        }
        
        if (updates?.my_chat_member?.chat?.type === 'channel' && (updates?.my_chat_member?.old_chat_member && updates?.my_chat_member?.new_chat_member)) {
          
          const chat = Object.assign({}, updates.my_chat_member.chat, { send });
          const message = {
            ...updates.my_chat_member,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('channelPermsUpdate', message);
        }
        
        if (updates?.my_chat_member?.chat?.type === 'supergroup' || updates?.my_chat_member?.chat?.type === 'supergroups' && (updates?.my_chat_member?.old_chat_member && updates?.my_chat_member?.new_chat_member)) {
          
          const chat = Object.assign({}, updates.my_chat_member.chat, { send });
          const message = {
            ...updates.my_chat_member,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('groupPermsUpdate', message);
        }
        
        if (updates?.message?.chat?.type === 'supergroup' || updates?.message?.chat?.type === 'supergroups' && updates?.message?.new_chat_members) {
          
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('groupMemberAdd', message);
        }
        
        if (updates?.message?.chat?.type === 'supergroup' || updates?.message?.chat?.type === 'supergroups' && updates?.message?.left_chat_participant) {
          
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('groupMemberLeft', message);
        }
        
        if (updates?.channel_post?.chat?.type === 'channel' && (updates?.channel_post?.new_chat_title)) {
          
          const chat = Object.assign({}, updates.channel_post.chat, { send });
          const message = {
            ...updates.channel_post,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('channelNameUpdate', message);
        }
        
        if (updates?.channel_post?.chat?.type === 'channel' && (updates?.channel_post?.new_chat_photo)) {
          
          const chat = Object.assign({}, updates.channel_post.chat, { send });
          const message = {
            ...updates.channel_post,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('channelAvatarUpdate', message);
        }
        
        if (updates?.message?.chat?.type === 'supergroup' || updates?.message?.chat?.type === 'supergroups' && updates?.message?.forum_topic_created) {
          
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('groupForumCreate', message);
        }
        
        if (updates?.message?.chat?.type === 'supergroup' || updates?.message?.chat?.type === 'supergroups' && updates?.message?.reply_to_message?.forum_topic_created) {
          
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('groupForumMessageCreate', message);
        }
        
        if (updates?.message?.chat?.type === 'supergroup' || updates?.message?.chat?.type === 'supergroups' && updates?.message?.forum_topic_closed) {
          
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('groupForumClose', message);
        }
        
        if (updates?.message?.chat?.type === 'supergroup' || updates?.message?.chat?.type === 'supergroups' && updates?.message?.forum_topic_reopened) {
          
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('groupForumReopened', message);
        }
        
        if (updates?.message?.chat?.type === 'supergroup' || updates?.message?.chat?.type === 'supergroups' && updates?.message?.video_chat_started) {
          
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('groupBroadcastStart', message);
        }
        
        if (updates?.message?.chat?.type === 'supergroup' || updates?.message?.chat?.type === 'supergroups' && updates?.message?.video_chat_ended) {
          
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('groupBroadcastEnd', message);
        }
        
        if (updates?.message?.chat?.type === 'supergroup' || updates?.message?.chat?.type === 'supergroups' && updates?.message?.voice_chat_scheduled) {
          
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('groupBroadcastScheduled', message);
        }
        
        if (updates?.message?.chat?.type === 'supergroup' || updates?.message?.chat?.type === 'supergroups' && (updates?.message?.new_chat_title)) {
          
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('groupNameUpdate', message);
        }
        
        if (updates?.message?.chat?.type === 'supergroup' || updates?.message?.chat?.type === 'supergroups' && (updates?.message?.new_chat_photo)) {
          
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('groupAvatarUpdate', message);
        }
        
        if (updates?.channel_post?.chat?.type === 'channel' && updates?.channel_post?.video_chat_started) {
          
          const chat = Object.assign({}, updates.channel_post.chat, { send });
          const message = {
            ...updates.channel_post,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('channelBroadcastStart', message);
        }
        
        if (updates?.channel_post?.chat?.type === 'channel' && updates?.channel_post?.video_chat_ended) {
          
          const chat = Object.assign({}, updates.channel_post.chat, { send });
          const message = {
            ...updates.channel_post,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('channelBroadcastEnd', message);
        }
        
        if (updates?.channel_post?.chat?.type === 'channel' && updates?.channel_post?.voice_chat_scheduled) {
          
          const chat = Object.assign({}, updates.channel_post.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('channelBroadcastScheduled', message);
        }
        
        if (updates?.channel_post?.chat?.type === 'channel' && updates?.message?.photo) {
          
          const chat = Object.assign({}, updates.channel_post.chat, { send });
          const message = {
            ...updates.channel_post,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('channelPhotoCreate', message);
        }
        
        if (updates?.channel_post?.chat?.type === 'channel' && updates?.channel_post?.sticker) {
          
          const chat = Object.assign({}, updates.channel_post.chat, { send });
          const message = {
            ...updates.channel_post,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('channelStickerCreate', message);
        }
        
        if (updates?.channel_post?.chat?.type === 'channel' && updates?.channel_post?.voice) {
          
          const chat = Object.assign({}, updates.channel_post.chat, { send });
          const message = {
            ...updates.channel_post,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('channelVoiceCreate', message);
        }
        
        if (updates?.channel_post?.chat?.type === 'channel' && updates?.channel_post?.video_note) {
          
          const chat = Object.assign({}, updates.channel_post.chat, { send });
          const message = {
            ...updates.channel_post,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('channelVideoNoteCreate', message);
        }
        
        if (updates?.channel_post?.chat?.type === 'channel' && updates?.channel_post?.audio) {
          
          const chat = Object.assign({}, updates.channel_post.chat, { send });
          const message = {
            ...updates.channel_post,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('channelAudioCreate', message);
        }
        
        if (updates?.channel_post?.chat?.type === 'channel' && updates?.channel_post?.document) {
          
          const chat = Object.assign({}, updates.channel_post.chat, { send });
          const message = {
            ...updates.channel_post,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('channelDocumentCreate', message);
        }
        
        if (updates?.edited_channel_post?.chat?.type === 'channel' && updates?.edited_channel_post?.photo) {
          
          const chat = Object.assign({}, updates.edited_channel_post.chat, { send });
          const message = {
            ...updates.edited_channel_post,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('channelPhotoUpdate', message);
        }
        
        if (updates?.edited_channel_post?.chat?.type === 'channel' && updates?.edited_channel_post?.sticker) {
          
          const chat = Object.assign({}, updates.edited_channel_post.chat, { send });
          const message = {
            ...updates.edited_channel_post,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('channelStickerUpdate', message);
        }
        
        if (updates?.edited_channel_post?.chat?.type === 'channel' && updates?.edited_channel_post?.voice) {
          
          const chat = Object.assign({}, updates.edited_channel_post.chat, { send });
          const message = {
            ...updates.edited_channel_post,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('channelVoiceUpdate', message);
        }
        
        if (updates?.edited_channel_post?.chat?.type === 'channel' && updates?.edited_channel_post?.video_note) {
          
          const chat = Object.assign({}, updates.edited_channel_post.chat, { send });
          const message = {
            ...updates.edited_channel_post,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('channelVideoNoteUpdate', message);
        }
        
        if (updates?.edited_channel_post?.chat?.type === 'channel' && updates?.edited_channel_post?.audio) {
          
          const chat = Object.assign({}, updates.edited_channel_post.chat, { send });
          const message = {
            ...updates.edited_channel_post,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('channelAudioUpdate', message);
        }
        
        if (updates?.edited_channel_post?.chat?.type === 'channel' && updates?.edited_channel_post?.document) {
          
          const chat = Object.assign({}, updates.edited_channel_post.chat, { send });
          const message = {
            ...updates.edited_channel_post,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('channelDocumentUpdate', message);
        }
        
        if (updates?.channel_post?.chat?.type === 'channel' && updates?.channel_post?.concat) {
          const chat = Object.assign({}, updates.channel_post.chat, { send });
          const message = {
            ...updates.channel_post,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('channelConcatCreate', message);
        }
        
        if (updates?.channel_post?.chat?.type === 'channel' && updates?.channel_post?.poll) {
          const chat = Object.assign({}, updates.channel_post.chat, { send });
          const message = {
            ...updates.channel_post,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('channelPollCreate', message);
        }
        
        if (updates?.channel_post?.chat?.type === 'channel' && updates?.channel_post?.location) {
          const chat = Object.assign({}, updates.channel_post.chat, { send });
          const message = {
            ...updates.channel_post,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('channelLocationCreate', message);
        }
        
        if (updates?.message?.chat?.type === 'private' && updates?.message?.concat) {
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('privateConcatCreate', message);
        }
        
        if (updates?.message?.chat?.type === 'private' && updates?.message?.poll) {
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('privatePollCreate', message);
        }
        
        if (updates?.message?.chat?.type === 'private' && updates?.message?.location) {
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('privateLocationCreate', message);
        }
        
        if (updates?.message?.chat?.type === 'group' || updates?.message?.chat?.type === 'supergroup'|| updates?.message?.chat?.type === 'supergroups' && updates?.message?.concat) {
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('groupConcatCreate', message);
        }
        
        if (updates?.message?.chat?.type === 'group' || updates?.message?.chat?.type === 'supergroup'|| updates?.message?.chat?.type === 'supergroups' && updates?.message?.poll) {
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('groupPollCreate', message);
        }
        
        if (updates?.message?.chat?.type === 'group' || updates?.message?.chat?.type === 'supergroup'|| updates?.message?.chat?.type === 'supergroups' && updates?.message?.location) {
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
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
            isPhoto
          };
          
          this.emit('groupLocationCreate', message);
        }
      }
    }
  }
 }
}

module.exports = TelegramBot;