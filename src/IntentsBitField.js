const { BitFieldError } = require("./errorcollection.js");

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

class IntentsBitField {
  constructor(bits = 0) {
    this.bits = bits;
  }

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

  serialize() {
    return this.bits;
  }

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

  has(bit) {
    return (this.bits & bit) === bit;
  }
}

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