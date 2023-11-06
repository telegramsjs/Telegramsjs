<div align="center">
  <h1>Telegramsjs</h1><br>
  <img src="https://raw.githubusercontent.com/Sempai-07/Telegramsjs/main/docs/avatar.png"><br>

[![Bot API](https://img.shields.io/badge/Bot%20API-v.6.9-00aced.svg?style=flat-square&logo=telegram)](https://core.telegram.org/bots/api)
[![NPM Version](https://img.shields.io/npm/v/telegramsjs.svg?maxAge=3600)](https://www.npmjs.com/package/telegramsjs)
[![NPM Downloads](https://img.shields.io/npm/dt/telegramsjs.svg?maxAge=3600)](https://www.npmjs.com/package/telegramsjs)

</div>

## ⚙️ Introduction

`Telegramsjs` is a lightweight Node.js library for creating Telegram bots. It provides an easy-to-use and flexible framework for building bots without relying on third-party libraries such as `Telegraf.js` or `node-telegram-bot-api`. This library allows developers to create Telegram bots with ease and efficiency.

## ⚒️ Installation

You can install the `telegramsjs` library using npm:

```sh
npm install telegramsjs
```

## 📙 Usage

To get started, create a new instance of the `TelegramBot` class by providing your Telegram bot token:

### TypeScript Example

```typescript
import { TelegramBot } from "telegramsjs";
import { Message, User } from "@telegram.ts/types";

const botToken = "BOT_TOKEN";
const bot = new TelegramBot(botToken);

let sessionData = { messageCounter: 0 };

function isBotCommand(ctx: Message) {
  if (ctx.text) {
    const firstEntity = ctx.entities?.[0];
    return firstEntity?.type === "bot_command" && ctx.text[0] === "/";
  }
  return false;
}

function isUserContext(context: unknown): context is User {
  if (typeof context !== "object" || context === null) return false;
  return "first_name" in context;
}

bot.on("ready", async (client) => {
  const botCommands = [
    {
      command: "/start",
      description: "Start command",
    },
    {
      command: "/remove",
      description: "Remove session",
    },
    {
      command: "/stats",
      description: "Session statistics",
    },
  ];

  bot.setMyCommands({ commands: botCommands });

  console.log(`Bot ${client.username} is ready`);
});

bot.on("message", (ctx) => {
  if (isBotCommand(ctx)) return;
  sessionData.messageCounter++;
  const responseMessage = `Counter updated, new value: \`${sessionData.messageCounter}\``;
  ctx.replyWithMarkdownV2(responseMessage);
  bot.use(sessionData);
});

bot.command("start", (ctx) => {
  const fromUser = ctx.from;
  if (!isUserContext(fromUser)) return;
  const username = fromUser.username
    ? `@${fromUser.username}`
    : fromUser.first_name;
  const welcomeMessage = `${username}, *thanks for using telegramsjs ❤️*`;
  ctx.replyWithMarkdown(welcomeMessage);
});

bot.command("remove", (ctx) => {
  const resetMessage = `Removing session data: \`${sessionData.messageCounter}\``;
  ctx.replyWithMarkdownV2(resetMessage);
  sessionData.messageCounter = 0;
});

bot.command("stats", (ctx) => {
  const fromUser = ctx.from;
  if (!isUserContext(fromUser)) return;
  const username = fromUser.username
    ? `@${fromUser.username}`
    : fromUser.first_name;
  const statsMessage = `Database has \`${sessionData.messageCounter}\` messages from ${username}`;
  ctx.replyWithMarkdownV2(statsMessage);
});

bot.login();
```

### JavaScript Example

```javascript
const { TelegramBot } = require("telegramsjs");

const botToken = "BOT_TOKEN";
const bot = new TelegramBot(botToken);

function isBotCommand(context) {
  const firstEntity = context.entities?.[0];
  return firstEntity?.type === "bot_command" && context.text[0] === "/";
}

bot.on("ready", async (client) => {
  const botCommands = [
    {
      command: "/start",
      description: "Starting command",
    },
    {
      command: "/remove",
      description: "Remove session",
    },
    {
      command: "/stats",
      description: "Session statistics",
    },
  ];

  bot.setMyCommands({ commands: botCommands });

  console.log(`Bot ${client.username} is ready`);
});

bot.session = {};

bot.on("message", (ctx) => {
  if (isBotCommand(ctx)) return;
  bot.session.counter = bot.session.counter || 0;
  bot.session.counter++;
  const responseMessage = `Counter updated, new value: \`${bot.session.counter}\``;
  ctx.replyWithMarkdownV2(responseMessage);
});

bot.command("start", (ctx) => {
  const fromUser = ctx.from;
  const username = fromUser.username
    ? `@${fromUser.username}`
    : fromUser.first_name;
  const welcomeMessage = `${username}, *thanks for using telegramsjs ❤️*`;
  ctx.replyWithMarkdown(welcomeMessage);
});

bot.command("remove", (ctx) => {
  const resetMessage = `Removing session data: \`${bot.session.counter}\``;
  ctx.replyWithMarkdownV2(resetMessage);
  bot.session = {};
});

bot.command("stats", (ctx) => {
  const fromUser = ctx.from;
  const username = fromUser.username
    ? `@${fromUser.username}`
    : fromUser.first_name;
  const statsMessage = `Database has \`${
    bot.session.counter ?? 0
  }\` messages from ${username}`;
  ctx.replyWithMarkdownV2(statsMessage);
});

bot.login();
```

## 🎃 Conclusion

`Telegramsjs` provides a simple and flexible way to create Telegram bots using Node.js. With its easy-to-use syntax and event-driven architecture, it is an excellent choice for developers who want to build bots quickly and efficiently.

## 📖 Documentation

For more information and detailed documentation, please visit the [Telegramsjs Documentation v1](https://docs-telegramsjs.surge.sh/) [Telegramsjs Documentation v2](https://telegramsjs-dev.surge.sh/).

## 🎒 Contributions

We welcome contributions to the development of `Telegramsjs`! If you have any ideas or suggestions, please visit the [Official Support Server](https://discord.gg/j8G7jhHMbs) or the [Official Telegram Channel](https://t.me/sempaika_telegrams_js).

## 📒 Example

For a comprehensive example of using the library, please refer to the GitHub page.

## 🧾 License

`Telegramsjs` is available under the MIT license. For more information, please refer to the [LICENSE](https://github.com/Sempai-07/Telegramsjs/blob/main/LICENSE) file.
