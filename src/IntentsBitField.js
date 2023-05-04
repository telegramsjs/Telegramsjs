const { BitFieldError } = require("./errorcollection.js");

/**
 * @typedef {Object} TelegramIntentBits
 * @property {string} Message - Represents a Telegram message.
 * @property {string} EditedMessage - Represents an edited Telegram message.
 * @property {string} ChannelPost - Represents a post in a Telegram channel.
 * @property {string} EditedChannelPost - Represents an edited post in a Telegram channel.
 * @property {string} InlineQuery - Represents an inline query from a user.
 * @property {string} ChosenInlineResult - Represents a chosen inline query result.
 * @property {string} CallbackQuery - Represents a callback query from a user.
 * @property {string} ShippingQuery - Represents a shipping query from a user.
 * @property {string} PreCheckoutQuery - Represents a pre-checkout query from a user.
 * @property {string} Poll - Represents a poll from a user.
 * @property {string} PollAnswer - Represents an answer to a poll from a user.
 * @property {string} MyChatMember - Represents a user's chat membership status in their own chat.
 * @property {string} ChatMember - Represents a user's chat membership status in a chat they are a member of.
 * @property {string} ChatJoinRequest - Represents a user's request to join a chat.
 */
const TelegramIntentBits = {
    Message: 'message',
    EditedMessage: 'edited_message',
    ChannelPost: 'channel_post',
    EditedChannelPost: 'edited_channel_post',
    InlineQuery: 'inline_query',
    ChosenInlineResult: 'chosen_inline_result',
    CallbackQuery: 'callback_query',
    ShippingQuery: 'shipping_query',
    PreCheckoutQuery: 'pre_checkout_query',
    Poll: 'poll',
    PollAnswer: 'poll_answer',
    MyChatMember: 'my_chat_member',
    ChatMember: 'chat_member',
    ChatJoinRequest: 'chat_join_request'
}

/**
 * @typedef {Object} IntentBits
 * @property {number} Message - Represents a bit flag for Telegram messages.
 * @property {number} EditedMessage - Represents a bit flag for edited Telegram messages.
 * @property {number} ChannelPost - Represents a bit flag for posts in Telegram channels.
 * @property {number} EditedChannelPost - Represents a bit flag for edited posts in Telegram channels.
 * @property {number} InlineQuery - Represents a bit flag for inline queries from users.
 * @property {number} ChosenInlineResult - Represents a bit flag for chosen inline query results.
 * @property {number} CallbackQuery - Represents a bit flag for callback queries from users.
 * @property {number} ShippingQuery - Represents a bit flag for shipping queries from users.
 * @property {number} PreCheckoutQuery - Represents a bit flag for pre-checkout queries from users.
 * @property {number} Poll - Represents a bit flag for polls from users.
 * @property {number} PollAnswer - Represents a bit flag for answers to polls from users.
 * @property {number} MyChatMember - Represents a bit flag for a user's chat membership status in their own chat.
 * @property {number} ChatMember - Represents a bit flag for a user's chat membership status in a chat they are a member of.
 * @property {number} ChatJoinRequest - Represents a bit flag for a user's request to join a chat.
 */
const IntentBits = {
  Message: 1 << 0,
  EditedMessage: 1 << 1,
  ChannelPost: 1 << 2,
  EditedChannelPost: 1 << 3,
  InlineQuery: 1 << 4,
  ChosenInlineResult: 1 << 5,
  CallbackQuery: 1 << 6,
  ShippingQuery: 1 << 7,
  PreCheckoutQuery: 1 << 8,
  Poll: 1 << 9,
  PollAnswer: 1 << 10,
  MyChatMember: 1 << 11,
  ChatMember: 1 << 12,
  ChatJoinRequest: 1 << 13
};

/**
 * @class IntentsBitField
 * @classdesc Represents a bit field for Telegram intents.
 */
class IntentsBitField {
  constructor(bits = 0) {
    this.bits = bits;
  }
  
  /**
   * Adds one or more bits to the bit field.
   * @param {...number} ints - The bits to add to the bit field.
   * @returns {IntentsBitField} The updated IntentsBitField instance.
   * @throws {BitFieldError} If a specified bit is not a number.
   */
  add(...ints) {
    const filter = ints.filter(i => {
      if (typeof i !== 'number') {
        throw new BitFieldError(`specified "${i}" is not correct`)
      }
    })
    for (const i of ints) {
      this.bits |= i;
    }
    return this;
  }
  
  /**
   * Removes one or more Telegram intents from the bitfield.
   * @param {...number} ints - The bits that represent the Telegram intents to be removed.
   * @returns {IntentsBitField} - The IntentsBitField instance.
   * @throws {BitFieldError} - If an invalid argument is passed.
   */
  remove(...ints) {
    const filter = ints.filter(i => {
      if (typeof i !== 'number') {
        throw new BitFieldError(`specified "${i}" is not correct`)
      }
    })
    for (const i of ints) {
      this.bits &= ~i;
    }
    return this;
  }
  
  /**
   * Returns the bitfield as a number.
   * @returns {number} - The bitfield.
   */
  serialize() {
    return this.bits;
  }

  /**
 * Returns an array of intent strings based on the current bit value
 * @method toArray
 * @returns {string[]} - Array of intent strings
 */
  toArray() {
    const arr = [];
    for (const [flag, bit] of Object.entries(IntentBits)) {
      if (this.has(bit)) {
        const intent = TelegramIntentBits[flag]
        arr.push(intent);
      }
    }
    return arr;
  }

  /**
 * Checks if the bit field has a specific bit set
 * @method has
 * @param {number} bit - Bit to check
 * @returns {boolean} - True if the bit is set, false otherwise
 */
  has(bit) {
    return (this.bits & bit) === bit;
  }
}

/**
 * Decodes a bit field instance and returns an array of intent strings
 * @function decodeIntents
 * @param {IntentsBitField} intentsBitField - Bit field instance to decode
 * @returns {string[]} - Array of intent strings
 */
function decodeIntents(intentsBitField) {
  const botIntents = [];
  for (const [flag, bit] of Object.entries(IntentBits)) {
    if (intentsBitField?.has(bit)) {
      const intent = TelegramIntentBits[flag].replace(/_/g, '_');
      botIntents.push(intent);
    }
  }
  return botIntents;
}

module.exports = {
  TelegramIntentBits,
  IntentsBitField,
  IntentBits,
  decodeIntents
};