// @ts-check
const { Base } = require("./Base");
const { ReactionType } = require("./misc/ReactionType");
const { MessageCollector } = require("../util/collector/MessageCollector");
const { ReactionCollector } = require("../util/collector/ReactionCollector");
const {
  InlineKeyboardCollector,
} = require("../util/collector/InlineKeyboardCollector");
const {
  CollectorEvents,
  ReactionCollectorEvents,
} = require("../util/Constants");

/**
 * @typedef {import("../types").MethodParameters} MethodParameters
 */

class MessageReactionUpdated extends Base {
  /**
   * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").MessageReactionUpdated} data - Data about the represents a change of a reaction on a message performed by a user
   */
  constructor(client, data) {
    super(client);

    /** Unique identifier of the message inside the chat */
    this.id = String(data.message_id);

    /**
     * The chat containing the message the user reacted to
     * @type {import("./chat/Chat").Chat}
     */
    this.chat = this.client.chats._add(data.chat);

    if ("user" in data) {
      /**
       * The user that changed the reaction, if the user isn't anonymous
       * @type {import("./misc/User").User | undefined}
       */
      this.user = this.client.users._add(data.user);
    }

    if ("actor_chat" in data) {
      /**
       * The chat on behalf of which the reaction was changed, if the user is anonymous
       * @type {import("./chat/Chat").Chat}
       */
      this.actorChat = this.client.chats._add(data.actor_chat);
    }

    /** Date of the change in Unix time */
    this.createdUnixTime = data.date;

    const reactionData = reactions({
      added: data.new_reaction.map((reaction) => new ReactionType(reaction)),
      removed: data.old_reaction.map((reaction) => new ReactionType(reaction)),
    });

    if (reactionData.isEmoji()) {
      /** Summary of emoji reactions */
      this.emojiSummary = reactionData.emoji;
    }

    if (reactionData.isCustomEmoji()) {
      /** Summary of custom emoji reactions */
      this.customEmojiSummary = reactionData.customEmoji;
    }

    if (reactionData.isPaidEmoji()) {
      /** Summary of paid emoji reactions */
      this.paidEmoji = reactionData.paid;
    }
  }

  /**
   * Return the timestamp change, in milliseconds
   */
  get createdTimestamp() {
    return this.createdUnixTime * 1000;
  }

  /**
   * Date of the change
   * @type {Date}
   */
  get createdAt() {
    return new Date(this.createdTimestamp);
  }

  /**
   * @param {import("../util/collector/Collector").ICollectorOptions<string, import("./message/Message").Message>} [options={}] - message collector options
   * @returns {import("../util/collector/MessageCollector").MessageCollector}
   */
  createMessageCollector(options = {}) {
    return new MessageCollector(this.client, this.chat, options);
  }

  /**
   * @param {import("../util/collector/Collector").ICollectorOptions<string, import("./message/Message").Message>} [options={}] - message collector options
   * @returns {Promise<[import("@telegram.ts/collection").Collection<string, import("./message/Message").Message>, string]>}
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
   * @param {import("../util/collector/Collector").ICollectorOptions<string, import("./message/Message").Message> & { errors?: string[] }} [options={}] - message collector options
   * @returns {Promise<import("@telegram.ts/collection").Collection<string, import("./message/Message").Message>>}
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
   * @param {import("../util/collector/Collector").ICollectorOptions<string, MessageReactionUpdated>} [options={}] - reaction collector options
   * @returns {import("../util/collector/ReactionCollector").ReactionCollector}
   */
  createReactionCollector(options = {}) {
    return new ReactionCollector(this.client, this.chat, options);
  }

  /**
   * @param {import("../util/collector/Collector").ICollectorOptions<string, MessageReactionUpdated>} [options={}] - reaction collector options
   * @returns {Promise<[import("@telegram.ts/collection").Collection<string, MessageReactionUpdated>, string]>}
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
   * @param {import("../util/collector/Collector").ICollectorOptions<string, MessageReactionUpdated> & { errors?: string[] }} [options={}] - reaction collector options
   * @returns {Promise<import("@telegram.ts/collection").Collection<string, MessageReactionUpdated>>}
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
   * @param {import("../util/collector/Collector").ICollectorOptions<string, import("./CallbackQuery").CallbackQuery>} [options={}] - inline keyboard collector options
   * @returns {InlineKeyboardCollector}
   */
  createMessageComponentCollector(options = {}) {
    return new InlineKeyboardCollector(this.client, options);
  }

  /**
   * Reply to the current message
   * @param {string} text - Text of the message to be sent, 1-4096 characters after entities parsing
   * @param {Omit<MethodParameters["sendMessage"], "text" | "chatId" >} [options={}] - out parameters
   * @returns {Promise<import("./message/Message").Message & { content: string; }>} - On success, the sent Message is returned.
   */
  reply(text, options = {}) {
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
   * Use this method to change the chosen reactions on a message. Service messages of some types can't be reacted to. Automatically forwarded messages from a channel to its discussion group have the same available reactions as messages in the channel. In albums, bots must react to the first message.
   * @param {string | import("@telegram.ts/types").ReactionType | import("@telegram.ts/types").ReactionType[] | ReactionType | ReactionType[]} reaction - A JSON-serialized list of reaction types to set on the message. Currently, as non-premium users, bots can set up to one reaction per message. A custom emoji reaction can be used if it is either already present on the message or explicitly allowed by chat administrators. Paid reactions can't be used by bots
   * @param {boolean} [isBig] - Pass True to set the reaction with a big animation
   * @returns {Promise<true>} - Returns True on success.
   */
  react(reaction, isBig) {
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
   * @returns {Promise<true | (import("./message/Message").Message & {content: string; editedUnixTime: number; editedTimestamp: number; editedAt: Date; })>} - On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
   */
  edit(text, options = {}) {
    return this.client.editMessageText({
      text,
      chatId: this.chat.id,
      messageId: this.id,
      ...options,
    });
  }

  /**
   * Use this method to edit a checklist on behalf of a connected business account.
   * @param {string} businessConnectionId - Unique identifier of the business connection on behalf of which the message will be sent.
   * @param {import("../client/interfaces/Checklist").InputChecklist} checklist - An object for the new checklist.
   * @param {Omit<MethodParameters["editMessageChecklist"], "messageId" | "chatId" | "checklist" | "businessConnectionId">} [options] - out parameters.
   * @returns {Promise<import("./message/Message").Message & { checklist: import("./checklist/Checklist").Checklist }>} - On success, the edited Message is returned.
   */
  editChecklist(businessConnectionId, checklist, options = {}) {
    return this.client.editMessageChecklist({
      checklist,
      messageId: this.id,
      chatId: this.chat.id,
      businessConnectionId,
      ...options,
    });
  }

  /**
   * Use this method to edit captions of messages.
   * @param {string} [caption] - New caption of the message, 0-1024 characters after entities parsing
   * @param {Omit<MethodParameters["editMessageCaption"], "caption" | "chatId" | "messageId">} [options={}] - out parameters
   * @returns {Promise<true | (import("./message/Message").Message & { caption: string | undefined; editedUnixTime: number; editedTimestamp: number; editedAt: Date; })>} - On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
   */
  editCaption(caption, options = {}) {
    return this.client.editMessageCaption({
      ...(caption && { caption }),
      chatId: this.chat.id,
      messageId: this.id,
      ...options,
    });
  }

  /**
   * Use this method to edit animation, audio, document, photo, video messages or to add media to text messages. If a message is part of a message album, then it can be edited only to an audio for audio albums, only to a document for document albums and to a photo or a video otherwise. When an inline message is edited, a new file can't be uploaded; use a previously uploaded file via its file_id or specify a URL.
   * @param {MethodParameters["editMessageMedia"]["media"]} media - An object for a new media content of the message
   * @param {Omit<MethodParameters["editMessageMedia"], "media" | "chatId" | "messageId">} [options={}] - out parameters
   * @returns {Promise<true | import("./message/Message").Message & { editedUnixTime: number; editedTimestamp: number; editedAt: Date; }>} - On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
   */
  editMedia(media, options = {}) {
    return this.client.editMessageMedia({
      media,
      chatId: this.chat.id,
      messageId: this.id,
      ...options,
    });
  }

  /**
   * Use this method to edit only the reply markup of messages.
   * @param {import("../client/interfaces/Markup").InlineKeyboardMarkup} replyMarkup - An object for an inline keyboard
   * @param  {Omit<MethodParameters["editMessageReplyMarkup"], "media" | "chatId" | "messageId">} [options={}] - out parameters
   * @returns {Promise<true | import("./message/Message").Message & { editedUnixTime: number; editedTimestamp: number; editedAt: Date; }>} - On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
   */
  editReplyMarkup(replyMarkup, options = {}) {
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
   * @returns {Promise<import("./message/Message").Message>} - On success, the sent Message is returned.
   */
  forward(chatId, options = {}) {
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
   * Use this method to add a message to the list of pinned messages in a chat. In private chats and channel direct messages chats, all non-service messages can be pinned. Conversely, the bot must be an administrator with the 'can_pin_messages' right or the 'can_edit_messages' right to pin messages in groups and channels respectively.
   * @param {PinMessage} [options] - Options for pinned message
   * @returns {Promise<true>} - Returns True on success.
   */
  pin({ notification = false, businessConnectionId } = {}) {
    return this.client.pinChatMessage({
      chatId: this.chat.id,
      messageId: this.id,
      disableNotification: notification,
      ...(businessConnectionId && { businessConnectionId }),
    });
  }

  /**
   * Use this method to remove a message from the list of pinned messages in a chat. In private chats and channel direct messages chats, all messages can be unpinned. Conversely, the bot must be an administrator with the 'can_pin_messages' right or the 'can_edit_messages' right to unpin messages in groups and channels respectively.
   * @param {string} [businessConnectionId] - Unique identifier of the business connection on behalf of which the message will be unpinned
   * @returns {Promise<true>} - Returns True on success.
   */
  unpin(businessConnectionId) {
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
  - If the bot has can_delete_messages administrator right in a supergroup or a channel, it can delete any message there.
  - If the bot has can_manage_direct_messages administrator right in a channel, it can delete any message in the corresponding direct messages chat.
   * @returns {Promise<true>} - Returns True on success.
   */
  delete() {
    return this.client.deleteMessage(this.chat.id, this.id);
  }

  /**
   * Use this method to edit live location messages. A location can be edited until its live_period expires or editing is explicitly disabled by a call to stopMessageLiveLocation.
   * @param {number} latitude - Latitude of new location
   * @param {number} longitude - Longitude of new location
   * @param {Omit<MethodParameters["editMessageLiveLocation"], "latitude" | "longitude" | "chatId" | "messageId">} [options={}] - out parameters
   * @returns {Promise<true | (import("./message/Message").Message & { editedUnixTime: number; editedTimestamp: number; editedAt: Date; location: import("./misc/Location").Location })>} - On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
   */
  editLiveLocation(latitude, longitude, options = {}) {
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
   * @returns {Promise<true | (import("./message/Message").Message & { editedUnixTime: number; editedTimestamp: number; editedAt: Date; location: import("./misc/Location").Location })>} - On success, if the message is not an inline message, the edited Message is returned, otherwise True is returned.
   */
  stopLiveLocation(options = {}) {
    return this.client.stopMessageLiveLocation({
      chatId: this.chat.id,
      messageId: this.id,
      ...options,
    });
  }
}

/**
 * Retrieves information about reactions to a message.
 * @param {{ added: ReactionType[]; removed: ReactionType[] }} messageReaction - The message reaction object.
 * @returns Information about the reactions.
 */
function reactions(messageReaction) {
  const { added, removed } = messageReaction || {
    added: [],
    removed: [],
  };

  const emoji = isEmoji(added);
  const customEmoji = isCustomEmoji(added);
  const emojiRemoved = isEmoji(removed);
  const customEmojiRemoved = isCustomEmoji(removed);
  const paidAdded = isPaidEmoji(added);
  const paidRemoved = isPaidEmoji(removed);

  const emojiAdded = emoji.filter(
    (emojiItem) => !emojiRemoved.includes(emojiItem),
  );
  const customEmojiAdded = customEmoji.filter(
    (emojiItem) => !customEmojiRemoved.includes(emojiItem),
  );

  const emojiKept = emoji.filter((emojiItem) =>
    emojiRemoved.includes(emojiItem),
  );
  const customEmojiKept = customEmoji.filter((emojiItem) =>
    customEmojiRemoved.includes(emojiItem),
  );

  return {
    emoji: {
      added: emojiAdded,
      kept: emojiKept,
      removed: emojiRemoved,
    },
    customEmoji: {
      added: customEmojiAdded,
      kept: customEmojiKept,
      removed: customEmojiRemoved,
    },
    paid: {
      added: paidAdded,
      removed: paidRemoved,
    },
    isEmoji: () =>
      emojiAdded.length > 0 || emojiKept.length > 0 || emojiRemoved.length > 0,
    isCustomEmoji: () =>
      customEmojiAdded.length > 0 ||
      customEmojiKept.length > 0 ||
      customEmojiRemoved.length > 0,
    isPaidEmoji: () => paidAdded || paidRemoved,
  };
}

/**
 * @param {ReactionType[]} reaction
 * @returns {import("@telegram.ts/types").ReactionTypeEmoji["emoji"][]}
 */
function isEmoji(reaction) {
  const reactionTypeEmojis = reaction.filter((react) => react.isEmoji());
  // @ts-ignore
  return reactionTypeEmojis.map((react) => react.emoji);
}

/**
 * @param {ReactionType[]} reaction
 * @returns {string[]}
 */
function isCustomEmoji(reaction) {
  const reactionTypeCustomEmojis = reaction.filter((react) =>
    react.isCustomEmoji(),
  );
  // @ts-ignore
  return reactionTypeCustomEmojis.map((react) => react.customEmojiId);
}

/**
 * @param {ReactionType[]} reaction
 * @returns {boolean}
 */
function isPaidEmoji(reaction) {
  const reactionTypeCustomEmojis = reaction.filter((react) => react.isPaid());
  return reactionTypeCustomEmojis.length > 0;
}

module.exports = { MessageReactionUpdated };
