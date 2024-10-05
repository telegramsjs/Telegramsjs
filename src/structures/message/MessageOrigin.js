// @ts-check
const { Base } = require("../Base");
const { TelegramError } = require("../../errors/TelegramError");
const { ErrorCodes } = require("../../errors/ErrorCodes");
const { ReactionType } = require("../misc/ReactionType");
const { MessageCollector } = require("../../util/collector/MessageCollector");
const { ReactionCollector } = require("../../util/collector/ReactionCollector");
const {
  InlineKeyboardCollector,
} = require("../../util/collector/InlineKeyboardCollector");
const {
  CollectorEvents,
  ReactionCollectorEvents,
} = require("../../util/Constants");

/**
 * @typedef {import("../../types").MethodParameters} MethodParameters
 */

class MessageOrigin extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").MessageOrigin} data - Data about the describes the origin of a message
   */
  constructor(client, data) {
    super(client);

    /** Date the message was sent originally in Unix time */
    this.createdUnixTime = data.date;

    this._patch(data);
  }

  /**
   * @param {import("@telegram.ts/types").MessageOrigin} data - Data about the describes the origin of a message
   * @override
   */
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
       * @type {import("../chat/Chat").Chat | undefined}
       */
      this.senderChat = this.client.chats._add(data.sender_chat);
    }

    if ("chat" in data) {
      /**
       * Channel chat to which the message was originally sent
       * @type {import("../chat/Chat").Chat | undefined}
       */
      this.chat = this.client.chats._add(data.chat);
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
   * @returns {this is this & { senderUser: import("../misc/User").User }}
   */
  isUser() {
    return Boolean("senderUser" in this && this.senderUser);
  }

  /**
   * @returns {this is this & { username: string }}
   */
  isHiddenUser() {
    return Boolean("username" in this && this.username);
  }

  /**
   * @returns {this is this & { senderChat: import("../chat/Chat").Chat; authorSignature?: string }}
   */
  isChat() {
    return Boolean("senderChat" in this && this.senderChat);
  }

  /**
   * @returns {this is this & { id: string; chat: import("../chat/Chat").Chat; authorSignature?: string }}
   */
  isChennel() {
    return Boolean("id" in this && this.id && "chat" in this && this.chat);
  }

  /**
   * @param {import("../../util/collector/Collector").ICollectorOptions<string, import("./Message").Message>} [options={}] - message collector options
   * @returns {import("../../util/collector/MessageCollector").MessageCollector}
   */
  createMessageCollector(options = {}) {
    if (!this.chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
    }

    return new MessageCollector(this.client, this.chat, options);
  }

  /**
   * @param {import("../../util/collector/Collector").ICollectorOptions<string, import("./Message").Message>} [options={}] - message collector options
   * @returns {Promise<[import("@telegram.ts/collection").Collection<string, import("./Message").Message>, string]>}
   */
  awaitMessage(options = {}) {
    const _options = { ...options, max: 1 };
    return new Promise((resolve) => {
      const collect = this.createMessageCollector(_options);
      collect.on(CollectorEvents.End, (collections, reason) => {
        resolve([collections, reason]);
      });
    });
  }

  /**
   * @param {import("../../util/collector/Collector").ICollectorOptions<string, import("./Message").Message> & { errors?: string[] }} [options={}] - message collector options
   * @returns {Promise<import("@telegram.ts/collection").Collection<string, import("./Message").Message>>}
   */
  awaitMessages(options = {}) {
    return new Promise((resolve, reject) => {
      const collect = this.createMessageCollector(options);
      collect.on(CollectorEvents.End, (collections, reason) => {
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
   * @returns {import("../../util/collector/ReactionCollector").ReactionCollector}
   */
  createReactionCollector(options = {}) {
    if (!this.chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
    }

    return new ReactionCollector(this.client, this.chat, options);
  }

  /**
   * @param {import("../../util/collector/Collector").ICollectorOptions<string, import("../MessageReactionUpdated").MessageReactionUpdated>} [options={}] - reaction collector options
   * @returns {Promise<[import("@telegram.ts/collection").Collection<string, import("../MessageReactionUpdated").MessageReactionUpdated>, string]>}
   */
  awaitReaction(options = {}) {
    const _options = { ...options, max: 1 };
    return new Promise((resolve) => {
      const collect = this.createReactionCollector(_options);
      collect.on(ReactionCollectorEvents.End, (collections, reason) => {
        resolve([collections, reason]);
      });
    });
  }

  /**
   * @param {import("../../util/collector/Collector").ICollectorOptions<string, import("../MessageReactionUpdated").MessageReactionUpdated> & { errors?: string[] }} [options={}] - reaction collector options
   * @returns {Promise<import("@telegram.ts/collection").Collection<string, import("../MessageReactionUpdated").MessageReactionUpdated>>}
   */
  awaitReactions(options = {}) {
    return new Promise((resolve, reject) => {
      const collect = this.createReactionCollector(options);
      collect.on(ReactionCollectorEvents.End, (collections, reason) => {
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
   * @returns {InlineKeyboardCollector}
   */
  createMessageComponentCollector(options = {}) {
    return new InlineKeyboardCollector(this.client, options);
  }

  /**
   * Reply to the current message
   * @param {string} text - Text of the message to be sent, 1-4096 characters after entities parsing
   * @param {Omit<MethodParameters["sendMessage"], "text" | "chatId" >} [options={}] - out parameters
   * @returns {Promise<import("./Message").Message & { content: string; }>} - On success, the sent Message is returned.
   */
  reply(text, options = {}) {
    if (!this.id) {
      throw new TelegramError(ErrorCodes.MessageIdNotAvailable);
    }

    if (!this.chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
    }

    return this.client.sendMessage({
      text,
      chatId: this.chat.id,
      replyParameters: {
        message_id: this.id,
      },
      ...options,
    });
  }

  /**
   * Use this method to change the chosen reactions on a message. Service messages can't be reacted to. Automatically forwarded messages from a channel to its discussion group have the same available reactions as messages in the channel. In albums, bots must react to the first message.
   * @param {string | import("@telegram.ts/types").ReactionType | import("@telegram.ts/types").ReactionType[] | ReactionType | ReactionType[]} reaction - A JSON-serialized list of reaction types to set on the message. Currently, as non-premium users, bots can set up to one reaction per message. A custom emoji reaction can be used if it is either already present on the message or explicitly allowed by chat administrators. Paid reactions can't be used by bots
   * @param {boolean} [isBig] - Pass True to set the reaction with a big animation
   * @returns {Promise<true>} - Returns True on success.
   */
  react(reaction, isBig) {
    if (!this.id) {
      throw new TelegramError(ErrorCodes.MessageIdNotAvailable);
    }

    if (!this.chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
    }

    /** @type {any[]} */
    let react = [];

    if (typeof reaction === "string") {
      react.push({ type: "emoji", emoji: reaction });
    } else if (reaction instanceof ReactionType) {
      const reactionData = reaction.isEmoji()
        ? { type: "emoji", emoji: reaction.emoji }
        : { type: "custom_emoji", customEmojiId: reaction.customEmojiId };
      react.push(reactionData);
    } else if (Array.isArray(reaction)) {
      reaction.forEach((rea) => {
        if (rea instanceof ReactionType) {
          const reactionData = rea.isEmoji()
            ? { type: "emoji", emoji: rea.emoji }
            : { type: "custom_emoji", customEmojiId: rea.customEmojiId };
          react.push(reactionData);
        } else {
          react.push(rea);
        }
      });
    } else if (typeof reaction === "object") {
      react.push(reaction);
    } else {
      react = reaction;
    }

    return this.client.setMessageReaction({
      reaction: react,
      chatId: this.chat.id,
      messageId: this.id,
      ...(isBig && { isBig }),
    });
  }

  /**
   * Use this method to edit text and game messages.
   * @param {string} text - New text of the message, 1-4096 characters after entities parsing
   * @param {Omit<MethodParameters["editMessageText"], "text" | "chatId" | "messageId">} [options={}] - out parameters
   * @returns {Promise<true | (import("./Message").Message & {content: string; editedUnixTime: number; editedTimestamp: number; editedAt: Date; })>} - On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
   */
  edit(text, options = {}) {
    if (!this.id) {
      throw new TelegramError(ErrorCodes.MessageIdNotAvailable);
    }

    if (!this.chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
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
   * @returns {Promise<true | (import("./Message").Message & { caption?: string; editedUnixTime: number; editedTimestamp: number; editedAt: Date; })>} - On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
   */
  editCaption(caption, options = {}) {
    if (!this.id) {
      throw new TelegramError(ErrorCodes.MessageIdNotAvailable);
    }

    if (!this.chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
    }

    return this.client.editMessageCaption({
      chatId: this.chat.id,
      messageId: this.id,
      ...(caption && { caption }),
      ...options,
    });
  }

  /**
   * Use this method to edit animation, audio, document, photo, or video messages. If a message is part of a message album, then it can be edited only to an audio for audio albums, only to a document for document albums and to a photo or a video otherwise. When an inline message is edited, a new file can't be uploaded; use a previously uploaded file via its file_id or specify a URL.
   * @param {MethodParameters["editMessageMedia"]["media"]} media - An object for a new media content of the message
   * @param {Omit<MethodParameters["editMessageMedia"], "media" | "chatId" | "messageId">} [options={}] - out parameters
   * @returns {Promise<true | import("./Message").Message & { editedUnixTime: number; editedTimestamp: number; editedAt: Date; }>} - On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
   */
  editMedia(media, options = {}) {
    if (!this.id) {
      throw new TelegramError(ErrorCodes.MessageIdNotAvailable);
    }

    if (!this.chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
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
   * @param {import("../../client/interfaces/Markup").InlineKeyboardMarkup} replyMarkup - An object for an inline keyboard
   * @param  {Omit<MethodParameters["editMessageReplyMarkup"], "media" | "chatId" | "messageId">} [options={}] - out parameters
   * @returns {Promise<true | import("./Message").Message & { editedUnixTime: number; editedTimestamp: number; editedAt: Date; }>} - On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
   */
  editReplyMarkup(replyMarkup, options = {}) {
    if (!this.id) {
      throw new TelegramError(ErrorCodes.MessageIdNotAvailable);
    }

    if (!this.chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
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
   * @returns {Promise<import("./Message").Message>} - On success, the sent Message is returned.
   */
  forward(chatId, options = {}) {
    if (!this.id) {
      throw new TelegramError(ErrorCodes.MessageIdNotAvailable);
    }

    if (!this.chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
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
   * @returns {Promise<number>} - Returns the message id of the sent message on success.
   */
  copy(chatId, options = {}) {
    if (!this.id) {
      throw new TelegramError(ErrorCodes.MessageIdNotAvailable);
    }

    if (!this.chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
    }

    return this.client.copyMessage({
      chatId: chatId,
      fromChatId: this.chat.id,
      messageId: this.id,
      ...options,
    });
  }

  /**
   * @typedef {Object} PinMessage
   * @property {boolean} [notification] - Pass True if it is not necessary to send a notification to all chat members about the new pinned message. Notifications are always disabled in channels and private chats
   * @property {string} [businessConnectionId] - Unique identifier of the business connection on behalf of which the message will be pinned
   */

  /**
   * Use this method to add a message to the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel.
   * @param {PinMessage} [options] - Options for pinned message.
   * @returns {Promise<true>} - Returns True on success.
   */
  pin({ notification = false, businessConnectionId } = {}) {
    if (!this.id) {
      throw new TelegramError(ErrorCodes.MessageIdNotAvailable);
    }

    if (!this.chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
    }

    return this.client.pinChatMessage({
      chatId: this.chat.id,
      messageId: this.id,
      disableNotification: notification,
      ...(businessConnectionId && { businessConnectionId }),
    });
  }

  /**
   * Use this method to remove a message from the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel.
   * @param {string} [businessConnectionId] - Unique identifier of the business connection on behalf of which the message will be unpinned
   * @returns {Promise<true>} - Returns True on success.
   */
  unpin(businessConnectionId) {
    if (!this.id) {
      throw new TelegramError(ErrorCodes.MessageIdNotAvailable);
    }

    if (!this.chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
    }

    return this.client.unpinChatMessage({
      chatId: this.chat.id,
      messageId: this.id,
      ...(businessConnectionId && { businessConnectionId }),
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
   * @returns {Promise<true>} - Returns True on success.
   */
  delete() {
    if (!this.id) {
      throw new TelegramError(ErrorCodes.MessageIdNotAvailable);
    }

    if (!this.chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
    }

    return this.client.deleteMessage(this.chat.id, this.id);
  }

  /**
   * Use this method to edit live location messages. A location can be edited until its live_period expires or editing is explicitly disabled by a call to stopMessageLiveLocation.
   * @param {number} latitude - Latitude of new location
   * @param {number} longitude - Longitude of new location
   * @param {Omit<MethodParameters["editMessageLiveLocation"], "latitude" | "longitude" | "chatId" | "messageId">} [options={}] - out parameters
   * @returns {Promise<true | (import("./Message").Message & { editedUnixTime: number; editedTimestamp: number; editedAt: Date; location: import("../misc/Location").Location })>} - On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
   */
  editLiveLocation(latitude, longitude, options = {}) {
    if (!this.id) {
      throw new TelegramError(ErrorCodes.MessageIdNotAvailable);
    }

    if (!this.chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
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
   * @returns {Promise<true | (import("./Message").Message & { editedUnixTime: number; editedTimestamp: number; editedAt: Date; location: import("../misc/Location").Location })>} - On success, if the message is not an inline message, the edited Message is returned, otherwise True is returned.
   */
  stopLiveLocation(options = {}) {
    if (!this.id) {
      throw new TelegramError(ErrorCodes.MessageIdNotAvailable);
    }

    if (!this.chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
    }

    return this.client.stopMessageLiveLocation({
      chatId: this.chat.id,
      messageId: this.id,
      ...options,
    });
  }

  /**
   * Return the timestamp message was sent originally, in milliseconds
   */
  get createdTimestamp() {
    return this.createdUnixTime * 1000;
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
