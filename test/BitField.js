const { IntentsBitField, TelegramBot, IntentBits, TelegramIntentBits, decodeIntents } = require('telegramsjs');

const intents = new IntentsBitField()
  .add(
    IntentBits.Message,
    IntentBits.EditedMessage, 
    IntentBits.EditedChannelPost, 
    IntentBits.ChannelPost,
    IntentBits.InlineQuery,
    IntentBits.ChosenInlineResult,
    IntentBits.CallbackQuery, 
    IntentBits.ShippingQuery, 
    IntentBits.PreCheckoutQuery,
    IntentBits.Poll,
    IntentBits.PollAnswer, 
    IntentBits.MyChatMember, 
    IntentBits.ChatMember
    );


// 1
/*const bot = new TelegramBot('TELEGRAM_BOT_TOKEN', {
  intents: intents.serialize()
});*/

// 2
/*const bot = new TelegramBot('TELEGRAM_BOT_TOKEN', {
  intents: [intents.serialize()]
});*/

// 3
/*const bot = new TelegramBot('TELEGRAM_BOT_TOKEN', {
  intents: intents.toArray()
});*/

// 4
/*const bot = new TelegramBot('TELEGRAM_BOT_TOKEN', {
  intents: [intents.toArray()]
});*/

// 5 
/*const bot = new TelegramBot('TELEGRAM_BOT_TOKEN', {
  intents: intents
});*/

// 6
/*const bot = new TelegramBot('TELEGRAM_BOT_TOKEN', {
  intents: [IntentBits.Message, IntentBits.EditedMessage, IntentBits.EditedChannelPost, IntentBits.ChannelPost, IntentBits.InlineQuery, IntentBits.ChosenInlineResult, IntentBits.CallbackQuery, IntentBits.ShippingQuery, IntentBits.PreCheckoutQuery, IntentBits.Poll, IntentBits.PollAnswer, IntentBits.MyChatMember, IntentBits.ChatMember]
});*/

// 7
/*const bot = new TelegramBot('TELEGRAM_BOT_TOKEN', {
  intents: []
});*/

// 8
/*const bot = new TelegramBot('TELEGRAM_BOT_TOKEN', {
  intents: [TelegramIntentBits.Message]
});*/

// 9
//const bot = new TelegramBot('TELEGRAM_BOT_TOKEN');



bot.login();