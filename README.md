<div align="center">
  <h1>Telegramsjs</h1><br>
  <img src="https://raw.githubusercontent.com/Sempai-07/Telegramsjs/main/docs/avatar.png"><br>

[![Bot API](https://img.shields.io/badge/Bot%20API-v.7.7-00aced.svg?style=flat-square&logo=telegram)](https://core.telegram.org/bots/api)
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

### Example

```ts
// esm/ts module
import { TelegramBot } from "telegramsjs";
// cjs module
const { TelegramBot } = require("telegramsjs");

const bot = new TelegramBot(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply("Welcome"));
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.reaction("❤️", (ctx) => ctx.reply("Like! ❤️"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));

bot.login();

// Enable graceful stop
process.once("SIGINT", () => bot.disconnect("SIGINT"));
process.once("SIGTERM", () => bot.disconnect("SIGTERM"));
```

```ts
// esm/ts module
import { TelegramBot, InlineKeyboard } from "telegramsjs";
// cjs module
const { TelegramBot, InlineKeyboard } = require("telegramsjs");

const bot = new TelegramBot(process.env.BOT_TOKEN);

bot.command("user", async (ctx) => {
  const inline_keyboard = new InlineKeyboard()
    .text("Like!", "like_callback_poll")
    .row()
    .text("Dislike!", "dislike_callback_poll");

  await ctx.reply("Developer 🙈", {
    reply_markup: inline_keyboard,
  });
});

bot.action(/callback_poll/, async (ctx) => {
  const text =
    ctx.data.split("_")[0] === "like"
      ? "Thank you for like! ❤️"
      : "Thank you, I will try! ❤️";
  await ctx.editMessageText(text);
});

bot.login();

// Enable graceful stop
process.once("SIGINT", () => bot.disconnect("SIGINT"));
process.once("SIGTERM", () => bot.disconnect("SIGTERM"));
```

### Webhook

```ts
// esm/ts module
import { TelegramBot, InlineKeyboard } from "telegramsjs";
// cjs module
const { TelegramBot, InlineKeyboard } = require("telegramsjs");

const bot = new TelegramBot(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply("Welcome"));
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.reaction("❤️", (ctx) => ctx.reply("Like! ❤️"), "newReaction");
bot.hears('hi', (ctx) => ctx.reply("Hey there"))

bot.login({
  webhook: {
    url: string;
    port?: number;
    host?: string;
    path?: string;
    certificate?: Buffer | ReadStream | string;
    ip_address?: string;
    max_connections?: number;
    tlsOptions?: TlsOptions;
    requestCallback?: RequestListener;
    allowed_updates?: MethodParameters["setWebhook"]["allowed_updates"];
    drop_pending_updates?: boolean;
    secret_token?: string;
  }
});

// Enable graceful stop
process.once("SIGINT", () => bot.disconnect("SIGINT"));
process.once("SIGTERM", () => bot.disconnect("SIGTERM"));
```

## 📖 Documentation

For more information and detailed documentation, please visit the [Telegramsjs Documentation v1](https://docs-telegramsjs.surge.sh/) [Telegramsjs Documentation v2](https://telegramsjs-dev.surge.sh/). [Telegramsjs Documentation v3](https://telegramsjs.vercel.app/).

## 🎒 Contributions

We welcome contributions to the development of `Telegramsjs`! If you have any ideas or suggestions, please visit the [Official Support Server](https://discord.gg/j8G7jhHMbs) or the [Official Telegram Channel](https://t.me/sempaika_telegrams_js).

## 📒 Example

For a comprehensive example of using the library, please refer to the GitHub page.

## 🧾 License

`Telegramsjs` is available under the MIT license. For more information, please refer to the [LICENSE](https://github.com/Sempai-07/Telegramsjs/blob/main/LICENSE) file.
