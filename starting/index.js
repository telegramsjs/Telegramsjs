const { TelegramBot, Collection, Button } = require("telegramsjs");
const { CreateStorage } = require('database-sempai');
const { loaderCmd, loaderEvent } = require("./src/index.js");

const bot = new TelegramBot('', {
  intents: []
});

bot.commands = new Collection();
bot.exudates = new Collection();
bot.db = new CreateStorage({
  path: "database-sempai",
  table: ["click", "command_blacklist", "cooldown", "currency", "global", "language", "main", "quest",  "shop", "supergroup",  "system", "timers", "username"]
})
bot.random = function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

loaderCmd(bot, "./cmd/");
loaderEvent(bot, "./event/");

bot.login();