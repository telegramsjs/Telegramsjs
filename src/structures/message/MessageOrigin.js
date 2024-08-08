const { Base } = require("../Base");
const { Chat } = require("../chat/Chat");
const { MessageCollector } = require("../../util/collector/MessageCollector");
const { ReactionCollector } = require("../../util/collector/ReactionCollector");
const {
  InlineKeyboardCollector,
} = require("../../util/collector/InlineKeyboardCollector");

/**
 * @typedef {import("../../types").MethodParameters} MethodParameters
 */

/**
 * @typedef {import("./Message").Message} Message
 */

class MessageOrigin extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").MessageOrigin} data - Data about the describes the origin of a message
   */
  constructor(client, data) {
    super(client);

    /** Date the message was sent originally in Unix time */
    this.createdTimestamp = data.date;

    this._patch(data);
  }

  _patch(data) {
    if ("message_id" in data) {
      /**
       * Unique message identifier inside the chat
       * @type {string | undefined}
       */
      this.id = String(data.message_id);
    }

    if ("sender_user" in data) {
      /**
       * User that sent the message originally
       * @type {import("../misc/User").User | undefined}
       */
      this.senderUser = this.client.users._add(data.sender_user);
    }

    if ("sender_user_name" in data) {
      /**
       * Name of the user that sent the message originally
       * @type {string | undefined}
       */
      this.username = data.sender_user_name;
    }

    if ("sender_chat" in data) {
      /**
       * Chat that sent the message originally
       * @type {Chat | undefined}
       */
      this.senderChat = new Chat(this.client, data.sender_chat);
    }

    if ("chat" in data) {
      /**
       * Channel chat to which the message was originally sent
       * @type {import("../chat/Chat").Chat | undefined}
       */
      this.chat = this.client.chats._add(data.chat);

      if (!this.chat.isPrivate() && data.sender_user) {
        /**
         * Member that were added to the message group or supergroup and information about them
         * @type {import("../chat/ChatMember").ChatMember | undefined}
         */
        this.member = this.chat.members._add(this.chat.id, true, {
          id: data.sender_user.id,
          extras: [{ user: data.sender_user }],
        });
      }
    }

    if ("author_signature" in data) {
      /**
       * Signature of the original post author
       * @type {string | undefined}
       */
      this.authorSignature = data.author_signature;
    }

    return data;
  }

  /**
   * @return {this is this & { senderUser: import("../misc/User").User }}
   */
  isUser() {
    return Boolean("senderUser" in this && this.senderUser);
  }

  /**
   * @return {this is this & { username: string }}
   */
  isHiddenUser() {
    return Boolean("username" in this && this.username);
  }

  /**
   * @return {this is this & { senderChat: Chat; authorSignature?: string }}
   */
  isChat() {
    return Boolean("senderChat" in this && this.senderChat);
  }

  /**
   * @return {this is this & { id: string; chat: Chat; authorSignature?: string }}
   */
  isChennel() {
    return Boolean("id" in this && this.id && "chat" in this && this.chat);
  }

  /**
   * @param {import("../../util/collector/Collector").ICollectorOptions<string, Message>} [options={}] - message collector options
   * @return {import("../../util/collector/MessageCollector").MessageCollector}
   */
  createMessageCollector(options = {}) {
    return new MessageCollector(this.client, this, options);
  }

  /**
   * @param {import("../../util/collector/Collector").ICollectorOptions<string, Message>} [options={}] - message collector options
   * @return {Promise<[import("@telegram.ts/collection").Collection<string, Message>, string]>}
   */
  awaitMessage(options = {}) {
    const _options = { ...options, max: 1 };
    return new Promise((resolve, reject) => {
      const collect = this.createMessageCollector(_options);
      collect.on("end", (collections, reason) => {
        resolve([collections, reason]);
      });
    });
  }

  /**
   * @typedef {import("../../util/collector/Collector").ICollectorOptions<string, Message>} AwaitMessagesOptions
   * @property {string[]} [errors] Stop/end reasons that cause the promise to reject
   */

  /**
   * @param {AwaitMessagesOptions} [options={}] - message collector options
   * @return {Promise<import("@telegram.ts/collection").Collection<string, Message>>}
   */
  awaitMessages(options = {}) {
    return new Promise((resolve, reject) => {
      const collect = this.createMessageCollector(options);
      collect.on("end", (collections, reason) => {
        if (options.errors?.includes(reason)) {
          reject(collections);
        } else {
          resolve(collections);
        }
      });
    });
  }

  /**
   * @param {import("../../util/collector/Collector").ICollectorOptions<string, import("../MessageReactionUpdated").MessageReactionUpdated>} [options={}] - reaction collector options
   * @return {import("../../util/collector/ReactionCollector").ReactionCollector}
   */
  createReactionCollector(options = {}) {
    return new ReactionCollector(this.client, this, options);
  }

  /**
   * @param {import("../../util/collector/Collector").ICollectorOptions<string, import("../MessageReactionUpdated").MessageReactionUpdated>} [options={}] - reaction collector options
   * @return {Promise<[import("@telegram.ts/collection").Collection<string, import("../MessageReactionUpdated").MessageReactionUpdated>, string]>}
   */
  awaitReaction(options = {}) {
    const _options = { ...options, max: 1 };
    return new Promise((resolve, reject) => {
      const collect = this.createReactionCollector(_options);
      collect.on("end", (collections, reason) => {
        resolve([collections, reason]);
      });
    });
  }

  /**
   * @typedef {import("../../util/collector/Collector").ICollectorOptions<string, import("../MessageReactionUpdated").MessageReactionUpdated>} AwaitRectionsOptions
   * @property {string[]} [errors] Stop/end reasons that cause the promise to reject
   */

  /**
   * @param {AwaitRectionsOptions} [options={}] - reaction collector options
   * @return {Promise<[import("@telegram.ts/collection").Collection<string, import("../MessageReactionUpdated").MessageReactionUpdated>, string]>}
   */
  awaitReactions(options = {}) {
    return new Promise((resolve, reject) => {
      const collect = this.createReactionCollector(options);
      collect.on("end", (collections, reason) => {
        if (options.errors?.includes(reason)) {
          reject(collections);
        } else {
          resolve(collections);
        }
      });
    });
  }

  /**
   * @param {import("../../util/collector/Collector").ICollectorOptions<string, import("../CallbackQuery").CallbackQuery>} [options={}] - inline keyboard collector options
   * @return {InlineKeyboardCollector}
   */
  createMessageComponentCollector(options = {}) {
    return new InlineKeyboardCollector(this.client, options);
  }

  /**
   * Reply to the current message
   * @param {string} text - Text of the message to be sent, 1-4096 characters after entities parsing
   * @param {Omit<MethodParameters["sendMessage"], "text" | "chatId" >} [options={}] - out parameters
   * @return {Promise<Message & { content: string; }>} - On success, the sent Message is returned.
   */
  reply(text, options = {}) {
    if (!this.id) {
      throw new TelegramError(
        "Could not find the messageId where this message came from in the cache!",
      );
    }

    if (!this.chat) {
      throw new TelegramError(
        "Could not find the chat where this message came from in the cache!",
      );
    }

    return this.client.sendMessage({
      text,
      chatId: this.chat.id,
      replyParameters: {
        messageId: this.id,
      },
      ...options,
    });
  }

  /**
   * Use this method to change the chosen reactions on a message. Service messages can't be reacted to. Automatically forwarded messages from a channel to its discussion group have the same available reactions as messages in the channel. In albums, bots must react to the first message.
   * @param {string | import("@telegram.ts/types").ReactionType} reaction - A list of reaction types to set on the message. Currently, as non-premium users, bots can set up to one reaction per message. A custom emoji reaction can be used if it is either already present on the message or explicitly allowed by chat administrators
   * @param {boolean} [isBig] - Pass True to set the reaction with a big animation
   * @return {Promise<true>} - Returns True on success.
   */
  react(reaction, isBig) {
    if (!this.id) {
      throw new TelegramError(
        "Could not find the messageId where this message came from in the cache!",
      );
    }

    if (!this.chat) {
      throw new TelegramError(
        "Could not find the chat where this message came from in the cache!",
      );
    }

    let react = [];

    if (typeof reaction === "string") {
      react.push({ type: "emoji", emoji: reaction });
    } else if (typeof reaction === "object") {
      react.push(reaction);
    } else {
      react = reaction;
    }

    return this.client.setMessageReaction({
      reaction: react,
      chatId: this.chat.id,
      messageId: this.id,
      isBig,
    });
  }

  /**
   * Use this method to edit text and game messages.
   * @param {string} text - New text of the message, 1-4096 characters after entities parsing
   * @param {Omit<MethodParameters["editMessageText"], "text" | "chatId" | "messageId">} [options={}] - out parameters
   * @return {Promise<Message & {content: string; editedTimestamp: number; }>} - On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
   */
  edit(text, options = {}) {
    if (!this.id) {
      throw new TelegramError(
        "Could not find the messageId where this message came from in the cache!",
      );
    }

    if (!this.chat) {
      throw new TelegramError(
        "Could not find the chat where this message came from in the cache!",
      );
    }

    return this.client.editMessageText({
      text,
      chatId: this.chat.id,
      messageId: this.id,
      ...options,
    });
  }

  /**
   * Use this method to edit captions of messages.
   * @param {string} [caption] - New caption of the message, 0-1024 characters after entities parsing
   * @param {Omit<MethodParameters["editMessageCaption"], "caption" | "chatId" | "messageId">} [options={}] - out parameters
   * @return {Promise<Message & { caption?: string; editedTimestamp: number; }>}
   */
  editCaption(caption, options = {}) {
    if (!this.id) {
      throw new TelegramError(
        "Could not find the messageId where this message came from in the cache!",
      );
    }

    if (!this.chat) {
      throw new TelegramError(
        "Could not find the chat where this message came from in the cache!",
      );
    }

    return this.client.editMessageCaption({
      caption,
      chatId: this.chat.id,
      messageId: this.id,
      ...options,
    });
  }

  /**
   * Use this method to edit animation, audio, document, photo, or video messages. If a message is part of a message album, then it can be edited only to an audio for audio albums, only to a document for document albums and to a photo or a video otherwise. When an inline message is edited, a new file can't be uploaded; use a previously uploaded file via its file_id or specify a URL.
   * @param {import("@telegram.ts/types").InputMedia} media - An object for a new media content of the message
   * @param {Omit<MethodParameters["editMessageMedia"], "media" | "chatId" | "messageId">} [options={}] - out parameters
   * @return {Promise<true | Message & { editedTimestamp: number; }>} - On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
   */
  editMedia(media, options = {}) {
    if (!this.id) {
      throw new TelegramError(
        "Could not find the messageId where this message came from in the cache!",
      );
    }

    if (!this.chat) {
      throw new TelegramError(
        "Could not find the chat where this message came from in the cache!",
      );
    }

    return this.client.editMessageMedia({
      media,
      chatId: this.chat.id,
      messageId: this.id,
      ...options,
    });
  }

  /**
   * Use this method to edit only the reply markup of messages.
   * @param {import("@telegram.ts/types").InlineKeyboardMarkup} replyMarkup - An object for an inline keyboard
   * @param  {Omit<MethodParameters["editMessageReplyMarkup"], "media" | "chatId" | "messageId">} [options={}] - out parameters
   * @return {Promise<true | Message & { editedTimestamp: number; }>} - On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
   */
  editReplyMarkup(replyMarkup, options = {}) {
    if (!this.id) {
      throw new TelegramError(
        "Could not find the messageId where this message came from in the cache!",
      );
    }

    if (!this.chat) {
      throw new TelegramError(
        "Could not find the chat where this message came from in the cache!",
      );
    }

    return this.client.editMessageReplyMarkup({
      replyMarkup,
      chatId: this.chat.id,
      messageId: this.id,
      ...options,
    });
  }

  /**
   * Use this method to forward messages of any kind. Service messages and messages with protected content can't be forwarded.
   * @param {number | string} chatId - Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param {Omit<MethodParameters["forwardMessage"], "chatId" | "fromChatId" | "messageId">} [options={}] - out parameters
   * @return {Promise<Message>} - On success, the sent Message is returned.
   */
  forward(chatId, options = {}) {
    if (!this.id) {
      throw new TelegramError(
        "Could not find the messageId where this message came from in the cache!",
      );
    }

    if (!this.chat) {
      throw new TelegramError(
        "Could not find the chat where this message came from in the cache!",
      );
    }

    return this.client.forwardMessage({
      chatId: chatId,
      fromChatId: this.chat.id,
      messageId: this.id,
      ...options,
    });
  }

  /**
   * Use this method to copy messages of any kind. Service messages, paid media messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correct_option_id is known to the bot. The method is analogous to the method forwardMessage, but the copied message doesn't have a link to the original message.
   * @param {number | string} chatId - Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param {Omit<MethodParameters["copyMessage"], "chatId" | "fromChatId" | "messageId">} [options={}] - out parameters
   * @return {Promise<number>} - Returns the message id of the sent message on success.
   */
  copy(chatId, options = {}) {
    if (!this.id) {
      throw new TelegramError(
        "Could not find the messageId where this message came from in the cache!",
      );
    }

    if (!this.chat) {
      throw new TelegramError(
        "Could not find the chat where this message came from in the cache!",
      );
    }

    return this.client.copyMessage({
      chatId: chatId,
      fromChatId: this.chat.id,
      messageId: this.id,
      ...options,
    });
  }

  /**
   * Use this method to add a message to the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel.
   * @param {boolean} [notification=false] - Pass True if it is not necessary to send a notification to all chat members about the new pinned message. Notifications are always disabled in channels and private chats
   * @param {string} [businessConnectionId] - Unique identifier of the business connection on behalf of which the message will be pinned
   * @return {Promise<true>} - Returns True on success.
   */
  pin(notification = false, businessConnectionId) {
    if (!this.id) {
      throw new TelegramError(
        "Could not find the messageId where this message came from in the cache!",
      );
    }

    if (!this.chat) {
      throw new TelegramError(
        "Could not find the chat where this message came from in the cache!",
      );
    }

    return this.client.pinChatMessage({
      chatId: this.chat.id,
      messageId: this.id,
      disableNotification: notification,
      businessConnectionId,
    });
  }

  /**
   * Use this method to remove a message from the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel.
   * @param {string} [businessConnectionId] - Unique identifier of the business connection on behalf of which the message will be unpinned
   * @return {Promise<true>} - Returns True on success.
   */
  unpin(businessConnectionId) {
    if (!this.id) {
      throw new TelegramError(
        "Could not find the messageId where this message came from in the cache!",
      );
    }

    if (!this.chat) {
      throw new TelegramError(
        "Could not find the chat where this message came from in the cache!",
      );
    }

    return this.client.unpinChatMessage({
      chatId: this.chat.id,
      messageId: this.id,
      businessConnectionId,
    });
  }

  /**
   * Use this method to delete a message, including service messages, with the following limitations:
  - A message can only be deleted if it was sent less than 48 hours ago.
  - Service messages about a supergroup, channel, or forum topic creation can't be deleted.
  - A dice message in a private chat can only be deleted if it was sent more than 24 hours ago.
  - Bots can delete outgoing messages in private chats, groups, and supergroups.
  - Bots can delete incoming messages in private chats.
  - Bots granted can_post_messages permissions can delete outgoing messages in channels.
  - If the bot is an administrator of a group, it can delete any message there.
  - If the bot has can_delete_messages permission in a supergroup or a channel, it can delete any message there.
   * @return {Promise<true>} - Returns True on success.
   */
  delete() {
    if (!this.id) {
      throw new TelegramError(
        "Could not find the messageId where this message came from in the cache!",
      );
    }

    if (!this.chat) {
      throw new TelegramError(
        "Could not find the chat where this message came from in the cache!",
      );
    }

    return this.client.deleteMessage(this.chat.id, this.id);
  }

  /**
   * Use this method to edit live location messages. A location can be edited until its live_period expires or editing is explicitly disabled by a call to stopMessageLiveLocation.
   * @param {number} latitude - Latitude of new location
   * @param {number} longitude - Longitude of new location
   * @param {Omit<MethodParameters["editMessageLiveLocation"], "latitude" | "longitude" | "chatId" | "messageId">} [options={}] - out parameters
   * @return {Promise<true | Message & { location: Location }>} - On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
   */
  editLiveLocation(latitude, longitude, options = {}) {
    if (!this.id) {
      throw new TelegramError(
        "Could not find the messageId where this message came from in the cache!",
      );
    }

    if (!this.chat) {
      throw new TelegramError(
        "Could not find the chat where this message came from in the cache!",
      );
    }

    return this.client.editMessageLiveLocation({
      chatId: this.chat.id,
      messageId: this.id,
      latitude,
      longitude,
      ...options,
    });
  }

  /**
   * Use this method to stop updating a live location message before live_period expires.
   * @param {Omit<MethodParameters["stopMessageLiveLocation"], "chatId" | "messageId">} [options={}] - out parameters
   * @return {Promise<true | Message & { location: Location }>} - On success, if the message is not an inline message, the edited Message is returned, otherwise True is returned.
   */
  stopLiveLocation(options = {}) {
    if (!this.id) {
      throw new TelegramError(
        "Could not find the messageId where this message came from in the cache!",
      );
    }

    if (!this.chat) {
      throw new TelegramError(
        "Could not find the chat where this message came from in the cache!",
      );
    }

    return this.client.stopMessageLiveLocation({
      chatId: this.chat.id,
      messageId: this.id,
      ...options,
    });
  }

  /**
   * Date the message was sent originally
   * @type {Date}
   */
  get createdAt() {
    return new Date(this.createdTimestamp);
  }
}

module.exports = { MessageOrigin };
