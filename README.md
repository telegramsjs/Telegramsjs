<div align="center">
  <h1>Telegramsjs</h1><br>
  <img src="https://raw.githubusercontent.com/Sempai-07/Telegramsjs/main/docs/avatar.png"><br>

[![Bot API](https://img.shields.io/badge/Bot%20API-v.6.7-00aced.svg?style=flat-square&logo=telegram)](https://core.telegram.org/bots/api)
[![NPM Version](https://img.shields.io/npm/v/telegramsjs.svg?maxAge=3600)](https://www.npmjs.com/package/telegramsjs)
[![NPM Downloads](https://img.shields.io/npm/dt/telegramsjs.svg?maxAge=3600)](https://www.npmjs.com/package/telegramsjs)

</div>

## ⚙️ Introduction

`Telegramsjs` is a lightweight Node.js library for creating Telegram bots. It provides an easy-to-use and flexible framework for building bots without relying on third-party libraries such as `Telegraf.js` or `node-telegram-bot-api`. With a syntax similar to `Discord.js`, this library allows developers to create Telegram bots with ease and efficiency.

## ⚒️ Installation

You can install the `telegramsjs` library using npm:

```sh
npm install telegramsjs
```

## 📙 Usage

To get started, create a new instance of the `TelegramBot` class by providing your Telegram bot token:

### TypeScript Example

```typescript
import { TelegramBot, Context } from "telegramsjs";
import { Message, UserFromGetMe } from "@telegram.ts/types";

const bot = new TelegramBot("TELEGRAM_BOT_TOKEN");

bot.on("ready", (client: UserFromGetMe) => {
  console.log("Starting bot", client);
});

bot.on("message", (message: Message & Context) => {
  message.reply("Hello ❤️");
});

bot.command(["hello", "text"], (msg, args) => {
  message.reply(
    `Thank you for using telegramsjs ❤️ `,
    !args[0] ? args[0] : msg.from.firs_name
  );
});

bot.login();
```

### JavaScript Example

```javascript
const { TelegramBot } = require("telegramsjs");
const bot = new TelegramBot("TELEGRAM_BOT_TOKEN");

bot.on("ready", (client) => {
  console.log("Starting bot", client);
});

bot.on("message", (message) => {
  message.reply("Hello ❤️");
});

bot.command(["hello", "text"], (msg, args) => {
  message.reply(
    `Thank you for using telegramsjs ❤️ `,
    !args[0] ? args[0] : msg.from.firs_name
  );
});

bot.login();
```

## 🎃 Conclusion

`Telegramsjs` provides a simple and flexible way to create Telegram bots using Node.js. With its easy-to-use syntax and event-driven architecture, it is an excellent choice for developers who want to build bots quickly and efficiently.

## 📖 Documentation

For more information and detailed documentation, please visit the [Telegramsjs Documentation](https://telegramsjs.surge.sh).

## 🎒 Contributions

We welcome contributions to the development of `Telegramsjs`! If you have any ideas or suggestions, please visit the [Official Support Server](https://discord.gg/j8G7jhHMbs) or the [Official Telegram Channel](https://t.me/sempaika_telegrams_js).

## 📒 Example

For a comprehensive example of using the library, please refer to the GitHub page.

## 🧾 License

`Telegramsjs` is available under the MIT license. For more information, please refer to the [LICENSE](https://github.com/Sempai-07/Telegramsjs/blob/main/LICENSE) file.
