<div align="center">
  <h1>Telegramsjs</h1><br>
  <img src="https://raw.githubusercontent.com/Sempai-07/Telegramsjs/main/docs/avatar.png"><br>

[![Bot API](https://img.shields.io/badge/Bot%20API-v.9.0-00aced.svg?style=flat-square&logo=telegram)](https://core.telegram.org/bots/api)
[![NPM Version](https://img.shields.io/npm/v/telegramsjs.svg?maxAge=3600)](https://www.npmjs.com/package/telegramsjs)
[![NPM Downloads](https://img.shields.io/npm/dt/telegramsjs.svg?maxAge=3600)](https://www.npmjs.com/package/telegramsjs)

</div>

## About

`telegramsjs` is a powerful [Node.js](https://nodejs.org) module that allows you to easily interact with the
[Telegram API](https://core.telegram.org/bots).

- Object-oriented
- Predictable abstractions
- Performant
- 100% coverage of the Telegram API

## Installation

```sh
npm install telegramsjs
yarn add telegramsjs
```

## Support the Project 💖

> Support the developer with a cup of tea—after all, solo covers the package.  
> [☕ Buy me a coffee](https://send.monobank.ua/jar/AXsVZde3Lc)

### Optional packages

- **[@telegram.ts/collection](https://github.com/telegramsjs/collection)**: Collection utilities for `TelegramsJS`.
- **[@telegram.ts/types](https://github.com/telegramsjs/types)**: `TypeScript` types for Telegram API objects.
- **[@telegram.ts/emoji](https://github.com/telegramsjs/emoji)**: Emoji utilities for `TelegramsJS`.
- **[@telegram.ts/formatters](https://github.com/telegramsjs/formatters)**: Formatters for text and messages in `TelegramsJS`.

## Example usage

Install telegramsjs:

```sh
npm install telegramsjs
yarn add telegramsjs
```

Afterwards we can create a quite simple example bot:

```js
// ECMAscript/TypeScript
import { TelegramClient } from "telegramsjs";
// CommonJS
const { TelegramClient } = require("telegramsjs");

const client = new TelegramClient("TELEGRAM_BOT_TOKEN");

client.on("ready", async ({ user }) => {
  await user.setCommands([
    {
      command: "/start",
      description: "Starting command",
    },
  ]);

  console.log(`Bot @${user.username} is the ready status!`);
});

client.on("message", async (message) => {
  if (message.content === "/start" && message.author) {
    await message.reply(
      `Hello ${message.author.username ? `@${message.author.username}` : message.author.firstName}!`,
    );
    return;
  }
});

client.login();
```

## Documentation

For more information and detailed documentation, please visit the [documentation](https://docs-telegramsjs.vercel.app/).

## Contributions

We welcome contributions to the development of `Telegramsjs`! If you have any ideas or suggestions, please visit the [Official Support Server](https://discord.gg/j8G7jhHMbs) or the [Official Telegram Group](https://t.me/sempaika_telegramsjs).

## Example

For a comprehensive example of using the library, please refer to the GitHub page.

## License

`Telegramsjs` is available under the MIT license. For more information, please refer to the [LICENSE](https://github.com/Sempai-07/Telegramsjs/blob/main/LICENSE) file.
