<div style="text-align: center;">
   <h1>Telegramsjs</h1><br>
   <image src="https://raw.githubusercontent.com/Sempai-07/Telegramsjs/main/docs/avatar.png"><br>
   
   [![Bot API](https://img.shields.io/badge/Bot%20API-v.6.7-00aced.svg?style=flat-square&logo=telegram)](https://core.telegram.org/bots/api)
   [![NPM Version](https://img.shields.io/npm/v/telegramsjs.svg?maxAge=3600)](https://www.npmjs.com/package/telegramsjs)
   [![NPM Downloads](https://img.shields.io/npm/dt/telegramsjs.svg?maxAge=3600)](https://www.npmjs.com/package/telegramsjs)
   </div>

## ⚙️ Introduction

`Telegramsjs` is a lightweight `Node.js` library for creating Telegram bots. It is designed to be a framework and does not rely on third-party libraries such as `Telegraf.js` or `node-telegram-bot-api`. The library has a syntax that is similar to `Discord.js`. This library provides a way to create Telegram bots with ease and flexibility.

## ⚒️ Installation

You can install the telegramsjs library using npm:

```
npm install telegramsjs
```

## 📙 Usage

First, you need to create a new instance of the TelegramBot class by providing your Telegram bot token:

```javascript
const {
  TelegramBot,
  IntentsBitField,
  IntentBits,
  Events,
} = require("telegramsjs");
const intents = new IntentsBitField().add(
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
  IntentBits.ChatMember,
);

const bot = new TelegramBot("TELEGRAM_BOT_TOKEN", {
  intents: intents.toArray(),
});
```

The intents option is an array of Telegram bot API [Update types](https://core.telegram.org/bots/api#getupdates), that the bot should receive.

After creating the bot instance, you can listen to events using the `on` method. The `on` method takes two arguments: the event name and the callback function.

```javascript
bot.on('eventName', (arg1, arg2, ...) => {
  // your code here
});
```

The library provides several events that you can listen to, including:

- `ready`: Fires when the bot is ready to start.
- `message`: Fires when a new message is received.
- `callback_query`: Fires when a callback query is received.

Here's an example of how to listen to the `message` event:

```javascript
bot.on("message", message => {
  // your code here
});
```

To handle commands, you can use the `commands` property, which is a Collection object that stores the commands and their corresponding code.

```javascript
const { Collection } = require("telegramsjs");

bot.commands = new Collection();
```

You can add commands to the `commands` collection using the `set` method.

```javascript
bot.commands.set("/help", {
  description: "Displays help information.",
  code: (bot, message) => {
    message.chat.send({
      text: "Here are some helpful tips...",
    });
  },
});
```

The `code` property is a callback function that is called when the command is executed.

To handle multiple commands, you can create a separate file for each command and load them using a loader function.

```javascript
async function loadCommands(dir) {
  const fs = require("fs");
  const path = require("path");

  const readDirRecursive = async directory => {
    const files = await fs.readdirSync(directory);
    for (const file of files) {
      const filePath = path.join(directory, file);
      if (fs.statSync(filePath).isDirectory()) {
        await readDirRecursive(filePath);
      } else if (file.endsWith(".js")) {
        const pull = require(filePath);
        bot.commands.set(pull.command, pull);
      }
    }
  };

  await readDirRecursive(path.join(process.cwd(), dir));
}

loadCommands("./commands/");
```

The loader function reads all the files in the `./commands/` directory and adds each command to the `commands` collection.

Now you can create a file with the `.js` extension for each command:

```javascript
module.exports = {
  command: "/start",
  description: "Start command",
  code: (bot, message) => {
    message.chat.send({
      text: "Starting...",
    });
  },
};
```

You can set the bot's description and commands using the `setMyDescription` and `setCommands` methods respectively.

```javascript
bot.once("ready", async client => {
  await client.setDescription({
    description: "My awesome Telegram bot",
  });

  await client.setCommands({
    commands: JSON.stringify(bot.commands.toArray()),
  });
});
```

The `setMyDescription` and `setDescription` methods set the bot's description, while the `setMyCommands` and `setCommands` methods set the bot's commands.

## 🎃 Conclusion

`Telegramsjs` provides a simple and flexible way to create Telegram bots using Node.js. With its easy-to-use syntax and event-driven architecture, it is a great choice for developers who want to build bots quickly and efficiently.

## 📖 Documentation

[Telegramsjs](https://telegramsjs.surge.sh)<br>
[Telegramsjs Documentation-1](https://github.com/Sempai-07/Telegramsjs/tree/main/docs)<br>
[Telegramsjs Documentation-2](https://github.com/Sempai-07/Telegramsjs/blob/main/documentation.md)<br>
[Collection](https://telegram-ts-collection.surge.sh/)<br>
[Formatters](https://telegram-ts-formatters.surge.sh/)

## 🎒 Contributions

We welcome your contributions to the development of `Telegramsjs`! If you have any ideas or suggestions, please visit the [Official support server](https://discord.gg/j8G7jhHMbs) or the [Official Telegram channel](https://t.me/sempaika_telegrams_js).

## 📒 Example

To see the correct use of the library, see the page on GitHub.

## 🧾 License

`Telegramsjs` is available under the `MIT` license. For more information, please refer to the [LICENSE](https://github.com/Sempai-07/Telegramsjs/blob/main/LICENSE) file.
