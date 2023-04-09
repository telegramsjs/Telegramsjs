const https = require('https');
const querystring = require('querystring');
const BaseClient = require("./BaseClient.js");
const { EventError } = require("./errorcollection.js");
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
  
  async start() {
  const client = await this.request('getMe');
  this.emit('ready', client);
  const ms = require('ms');
  let lastUpdateTimestamp = new Date();
  while (true) {
    const getUpdates = await this.getUpdates();
    for (const updates of getUpdates) {
      const updateTimestamp = new Date(updates.message.date * 1000);
      if (updateTimestamp > lastUpdateTimestamp) {
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
            revoke: revoke
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
            button: options.button,
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
            button: options.button,
            replyToMessageId: messageId,
            allowReply: options.allowReply,
            notification: options.notification,
            content: options.content,
            threadId: options.threadId,
            parseMode: options.parseMode
          });
        }

        if (updates?.message?.chat?.type === 'group' || updates?.message?.chat?.type === 'supergroup') {
          
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
            update,
            reply
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
            reply
          };
          
          this.emit('privateMessageUpdate', message);
        }

        if (updates?.edited_message?.chat?.type === 'group' || updates?.edited_message?.chat?.type === 'supergroup'|| updates?.edited_message?.chat?.type === 'supergroups') {
          
          const chat = Object.assign({}, updates.edited_message.chat, { send });
          const message = {
            ...updates.edited_message,
            chat: chat,
            deleted,
            update,
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
          };
          this.emit('channelMessageCreate', message);
        }
        
        if (updates.callback_query) {
          const chat = Object.assign({}, updates.callback_query.message.chat, { send });
          const interaction = {
            ...updates.callback_query,
            chat: chat,
            deleted,
            update,
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
          };
          this.emit('privateDocumentUpdate', message);
        }
        
        /***********/
        
        if (updates?.message?.chat?.type === 'supergroup' || updates?.message?.chat?.type === 'group' || updates?.message?.chat?.type === 'supergroups' && updates?.message?.photo) {
          
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
            update,
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
          };
          this.emit('groupDocumentCreate', message);
        }
        
        /******/
        
        if (updates?.edited_message?.chat?.type === 'group' || updates?.edited_message?.chat?.type === 'supergroup'|| updates?.edited_message?.chat?.type === 'supergroups' && updates?.edited_message?.photo) {
          
          const chat = Object.assign({}, updates.edited_message.chat, { send });
          const message = {
            ...updates.edited_message,
            chat: chat,
            deleted,
            update,
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
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
            reply
          };
          this.emit('groupLocationCreate', message);
        }
      }
    }
  }
 }
}

module.exports = TelegramBot;