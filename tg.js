const { 
  TelegramBot,
  Markup
} = require("./dist/index");

const bot = new TelegramBot("5840191342:AAFNfDR7wzjujc1OqsrK0oyV8T1dXJt_aH0");

bot.on("ready", c => {
  console.log(bot);
});

bot.command(["start", "hello"], (m) => {
  const username = m.from.username ? `@${m.from.username}` : m.from.first_name;
  m.reply(`${username}, hello 👋`);
});

const search = new Markup()
  .setText("❤️ last")
  .setAction("start")
  .setType("callback_data");
  
const last = new Markup()
  .setText("❤️ love")
  .setAction("last")
  .setType("callback_data");

bot.on('message', (msg) => {
  /*const update = msg.client.updates;
  const context = new Context(
    update,
    bot
    );*/
  /*console.log(context);
  console.log(context.deleteIn);*/
  msg.reply('Username 👋');
  msg.chat.send('Username 👋', {
    replyMarkup: JSON.stringify({
      inline_keyboard: [[search.toJSON(), last.toJSON()]]
    })
  });
});

bot.action(['last', 'start'], (callback) => {
  return callback.chat.send(callback.from.username);
}, true);

bot.login();