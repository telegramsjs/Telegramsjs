const { BotIntents, IntentsBitField, TelegramBot, IntentBits, TelegramIntentBits, decodeIntents, Button } = require('../src/index.js');

const intents = new IntentsBitField()
  .add(IntentBits.Message, IntentBits.EditedMessage, IntentBits.EditedChannelPost, IntentBits.ChannelPost, IntentBits.InlineQuery, IntentBits.ChosenInlineResult, IntentBits.CallbackQuery, IntentBits.ShippingQuery, IntentBits.PreCheckoutQuery, IntentBits.Poll, IntentBits.PollAnswer, IntentBits.MyChatMember, IntentBits.ChatMember);


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
const bot = new TelegramBot('TELEGRAM_BOT_TOKEN');

bot.on('generalMessageCreate', (message) => {
  console.log(message.entities);
  if (!message.isPhoto()) return;
  message.reply('Да, в данном сообщение есть фотка')
})

const button = new Button()
  .setText('Press me!')
  .setAction('button_pressed')
  .setType('callback_data');


bot.on('privateMessageCreate', (m) => {
  if (!m.isCommand) return;
  if (m.text === '/button') {
    m.reply({
      text: 'Button',
      replyMarkup: JSON.stringify({
        inline_keyboard: [[button.toJSON()]]
      })
    })
  }
})

bot.on('interactionCreate',  async (i) => {
  await i.defer()
    
  if (i.data === 'button_pressed') {
    i.reply('Hello!');
    i.chat.send('Hello!')
  }
})

setTimeout(function() {
  console.log(bot.uptime);
}, 1000);


bot.login();