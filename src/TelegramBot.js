const https = require('https');
const querystring = require('querystring');
const BaseClient = require("./BaseClient.js");
const { EventError } = require("./errorcollection.js");

class TelegramBot extends BaseClient {
  constructor(token, options) {
    super(token, options?.intents);
    this.token = token;
    this.baseUrl = `https://api.telegram.org/bot${this.token}`;
    this.listeners = {
      ready: [],
      privateMessageCreate: [],
      privateMessageUpdate: [],
      privateMessagePinned: [],
      privateMediaCreate: [],
      
      groupMessagePinned: [],
      groupMessageUpdate: [],
      groupMessageCreate: [],
      groupMediaCreate: [],
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
      groupPhotoUpdate: [],
      groupNameUpdate: [],
      
      channelMessagePinned: [],
      channelMessageCreate: [],
      channelMessageUpdate: [],
      channelMediaCreate: [],
      channelPermsUpdate: [],
      channelNameUpdate: [],
      channelPhotoUpdate: [],
      channelBroadcastStart: [],
      channelBroadcastEnd: [],
      channelBroadcastScheduled: [],
      
      generalMessageCreate: [],
      
      // Покачто нет их
      interactionCreate: [],
    }
  }
  
  on(event, listener) {
    if (!this.listeners[event]) {
      throw new EventError(`event "${event}" is not supported`);
    }
    this.listeners[event].push(listener);
  }

  emit(event, ...args) {
    if (!this.listeners[event]) {
      throw new EventError(`event "${event}" is not supported`);
    }
    for (const listener of this.listeners[event]) {
      listener(...args);
    }
  }
  
  off(eventName, listener) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(l => l !== listener);
    }
  }
  
  async start() {
  const client = await this.request('getMe');
  this.emit('ready', client);
  while (true) {
    const getUpdates = await this.getUpdates();

    for (const updates of getUpdates) {
      if (updates.update_id <= this.offset) {
        this.offset = updates.update_id + 1;
        
        const send = (options) => {
          let chatId;
          let messageId;
          if (updates?.callback_query) {
            chatId = options.chatId || updates?.callback_query?.message?.chat?.id;
            messageId = options.messageId || updates?.callback_query?.message?.message_id;
          } else {
            chatId = options.chatId || updates?.message?.chat?.id;
            messageId = options.messageId || updates?.message?.message_id;
          }
          
          return this.sendMessage({
            text: options.text,
            chatId: chatId,
            messageId: messageId,
            button: options.button,
            reply_to_message_id: messageId
          });
        };
        
        const deleted = (options) => {
          let chatId;
          let messageId;
          if (updates?.callback_query) {
            chatId = options.chatId || updates?.callback_query?.message?.chat?.id;
            messageId = options.messageId || updates?.callback_query?.message?.message_id;
          } else {
            chatId = options.chatId || updates?.message?.chat?.id;
            messageId = options.messageId || updates?.message?.message_id;
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
          if (updates?.callback_query) {
            chatId = options.chatId || updates?.callback_query?.message?.chat?.id;
            messageId = options.messageId || updates?.callback_query?.message?.message_id;
          } else {
            chatId = options.chatId || updates?.message?.chat?.id;
            messageId = options.messageId || updates?.message?.message_id;
          }
          
          return this.editMessage({
            chatId: chatId,
            messageId: messageId,
            text: options.text,
            button: options.button,
            webPage: options.webPage,
            parseMode: options.parseMode
          })
        }
        
        const reply = (options) => {
          let chatId;
          let messageId;
          if (updates?.callback_query) {
            chatId = options.chatId || updates?.callback_query?.message?.chat?.id;
            messageId = options.messageId || updates?.callback_query?.message?.message_id;
          } else {
            chatId = options.chatId || updates?.message?.chat?.id;
            messageId = options.messageId || updates?.message?.message_id;
          }
          return this.sendMessage({
            text: options.text,
            chatId: chatId,
            messageId: messageId,
            button: options.button,
            replyToMessageId: messageId
          });
        }
          
        if (updates?.message?.chat?.type === 'private') {
          
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
            update,
            reply
          };
          
          this.emit('privateMessageCreate', message);
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
            
            const chat = Object.assign({}, updates.callback_query.chat, { send });
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
        
        if (updates?.message?.chat?.type === 'private' && (updates?.message?.photo || updates?.message?.sticker || updates?.message?.voice || updates?.message?.video_note )) {
          
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
            update,
            reply
          };
          this.emit('privateMediaCreate', message);
        }
        
        if (updates?.message?.chat?.type === 'supergroup' || updates?.message?.chat?.type === 'group' || updates?.message?.chat?.type === 'supergroups' && (updates?.message?.photo || updates?.message?.sticker || updates?.message?.voice || updates?.message?.video_note )) {
          
          const chat = Object.assign({}, updates.message.chat, { send });
          const message = {
            ...updates.message,
            chat: chat,
            deleted,
            update,
            reply
          };
          this.emit('groupMediaCreate', message);
        }
        
        if (updates?.channel_post?.chat?.type === 'channel' && (updates?.channel_post?.photo || updates?.channel_post?.sticker || updates?.channel_post?.voice || updates?.channel_post?.video_note )) {
          
          const chat = Object.assign({}, updates.channel_post.chat, { send });
          const message = {
            ...updates.channel_post,
            chat: chat,
            deleted,
            update,
            reply
          };
          
          this.emit('channelMediaCreate', message);
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
          this.emit('channelPhotoUpdate', message);
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
          this.emit('groupPhotoUpdate', message);
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
      }
    }
  }
 }
}

module.exports = TelegramBot;