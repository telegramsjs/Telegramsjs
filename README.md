<div align="center">
  <h1>Telegramsjs</h1><br>
  <img src="https://raw.githubusercontent.com/Sempai-07/Telegramsjs/main/docs/avatar.png"><br>

[![Bot API](https://img.shields.io/badge/Bot%20API-v.6.8-00aced.svg?style=flat-square&logo=telegram)](https://core.telegram.org/bots/api)
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
import { TelegramBot } from "./src/index";
import { Message, User } from "@telegram.ts/types";

const bot = new TelegramBot("BOT_TOKEN");

let session = { counter: 0 };

function isCommand(ctx: Message) {
  if (ctx.text) {
    return ctx.entities?.[0].type === "bot_command" && ctx.text[0] === "/";
  }
  return false;
}

function isFromUser(ctx: unknown): ctx is User {
  if (typeof ctx !== "object" || ctx === null) return false;
  if ("first_name" in ctx) {
    return true;
  }
  return false;
}

bot.on("ready", async (client) => {
  bot.setMyCommands({
    commands: [
      {
        command: "/start",
        description: "starting command",
      },
      {
        command: "/remove",
        description: "remove session",
      },
      {
        command: "/stats",
        description: "statistics session",
      },
    ],
  });

  console.log(`Starting ${client.username}`);
});

bot.on("message", (ctx) => {
  if (isCommand(ctx)) return;
  session.counter = session.counter || 0;
  session.counter++;
  ctx.replyWithMarkdownV2(
    `Counter updated, new value: \`${session.counter}\``,
  );
  bot.use(session);
});

bot.command("start", (ctx) => {
  const from = ctx.from;
  if (!isFromUser(from)) return;
  const username = from.username
    ? `@${from.username}`
    : from.first_name;
  ctx.replyWithMarkdown(`${username}, *thanks for using telegramsjs ❤️*`);
});

bot.command("remove", (ctx) => {
  ctx.replyWithMarkdownV2(
    `Removing session from database: \`${session.counter}\``,
  );
  session.counter = 0;
});

bot.command("stats", (ctx) => {
  const from = ctx.from;
  if (!isFromUser(from)) return;
  const username = from.username
    ? `@${from.username}`
    : from.first_name;
  ctx.replyWithMarkdownV2(
    `Database has \`${session.counter}\` messages from ${username}`,
  );
});

bot.login();
```

### JavaScript Example

```javascript
const { TelegramBot } = require("telegramsjs");

const bot = new TelegramBot("BOT_TOKEN");

function isCommand(ctx) {
  return ctx.entities?.[0]?.type === "bot_command" && ctx.text[0] === "/";
}

bot.on("ready", async (client) => {
  bot.setMyCommands({
    commands: [
      {
        command: "/start",
        description: "starting command",
      },
      {
        command: "/remove",
        description: "remove session",
      },
      {
        command: "/stats",
        description: "statistics session",
      },
    ],
  });

  console.log(`Starting ${client.username}`);
});

bot.use({});

bot.on("message", (ctx) => {
  if (isCommand(ctx)) return;
  bot.session.counter = bot.session.counter || 0;
  bot.session.counter++;
  ctx.replyWithMarkdownV2(
    `Counter updated, new value: \`${bot.session.counter}\``,
  );
});

bot.command("start", (ctx) => {
  const username = ctx.from.username
    ? `@${ctx.from.username}`
    : ctx.from.first_name;
  ctx.replyWithMarkdown(`${username}, *thanks for using telegramsjs ❤️*`);
});

bot.command("remove", (ctx) => {
  ctx.replyWithMarkdownV2(
    `Removing session from database: \`${bot.session.counter}\``,
  );
  bot.session = null;
});

bot.command("stats", (ctx) => {
  const username = ctx.from.username
    ? `@${ctx.from.username}`
    : ctx.from.first_name;
  ctx.replyWithMarkdownV2(
    `Database has \`${bot.session?.counter ?? 0}\` messages from ${username}`,
  );
});

bot.login();
```

## 🎃 Conclusion

`Telegramsjs` provides a simple and flexible way to create Telegram bots using Node.js. With its easy-to-use syntax and event-driven architecture, it is an excellent choice for developers who want to build bots quickly and efficiently.

## 📖 Documentation

For more information and detailed documentation, please visit the [Telegramsjs Documentation](https://docs-telegramsjs.surge.sh/).

## 🎒 Contributions

We welcome contributions to the development of `Telegramsjs`! If you have any ideas or suggestions, please visit the [Official Support Server](https://discord.gg/j8G7jhHMbs) or the [Official Telegram Channel](https://t.me/sempaika_telegrams_js).

## 📒 Example

For a comprehensive example of using the library, please refer to the GitHub page.

## 🧾 License

`Telegramsjs` is available under the MIT license. For more information, please refer to the [LICENSE](https://github.com/Sempai-07/Telegramsjs/blob/main/LICENSE) file.
