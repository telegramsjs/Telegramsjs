<div style="text-align: center;">
   <h1>Telegramsjs</h1><br>
   <image src="https://raw.githubusercontent.com/Sempai-07/Telegramsjs/main/docs/avatar.png"><br>
   
   [![Discord Server](https://img.shields.io/discord/796504104565211187?color=7289da&logo=discord&logoColor=white)](https://discord.gg/EuSbT5HH8b)  [![Telegram](https://img.shields.io/appveyor/tests/Sempai-07/Telegramsjs/main)](https://t.me/sempaika_telegrams_js) [![NPM Version](https://img.shields.io/npm/v/telegramsjs.svg?maxAge=3600)](https://www.npmjs.com/package/telegramsjs) [![NPM Downloads](https://img.shields.io/npm/dt/telegramsjs.svg?maxAge=3600)](https://www.npmjs.com/package/telegramsjs)
   </div>

## Introduction
`Telegramsjs` is a lightweight `Node.js` library for creating Telegram bots. It is designed to be a framework and does not rely on third-party libraries such as `Telegraf.js` or `node-telegram-bot-api`. The library has a syntax that is similar to `Discord.js`. This library provides a way to create Telegram bots with ease and flexibility.

## Installation
You can install the telegramsjs library using npm:
```
npm install telegramsjs
```

## Usage
First, you need to create a new instance of the TelegramBot class by providing your Telegram bot token:

```javascript
const { TelegramBot } = require("telegramsjs");

const bot = new TelegramBot('TELEGRAM_BOT_TOKEN', {
  intents: [] // not necessary
});
```
The intents option is an array of Telegram bot API <a href="https://core.telegram.org/bots/api#getupdates">Update types</a>, that the bot should receive.

After creating the bot instance, you can listen to events using the on method. The on method takes two arguments: the event name and the callback function.

```javascript
bot.on('eventName', (arg1, arg2, ...) => {
  // your code here
});
```
The library provides several events that you can listen to, including:

- `generalMessageCreate`: Fires when a message global (private, supergroup) is created in a chat.
- `ready`: Fires when the bot is ready to start.

Here's an example of how to listen to the `generalMessageCreate` event:

```javascript
bot.on('generalMessageCreate', async (message) => {
  // your code here
});
```

To handle commands, you can use the commands property, which is a Collection object that stores the commands and their corresponding code.

```javascript
bot.commands = new Collection();
```

You can add commands to the commands collection using the set method.

```javascript
bot.commands.set('/help', {
  description: 'Displays help information.',
  code: (bot, message) => {
    message.chat.send({
      text: 'Here are some helpful tips...'
    }); // or: message.chat.send('Here are some helpful tips...')
  }
});
```
The code property is a callback function that is called when the command is executed.

To handle multiple commands, you can create a separate file for each command and load them using a loader function.

```javascript
async function loaderTextCmd(dir) {
  const readDirRecursive = async (directory) => {
    const files = await fs.readdirSync(directory);
    for (const file of files) {
      const filePath = path.join(directory, file);
      if (fs.statSync(filePath).isDirectory()) {
        await readDirRecursive(filePath);
      } else if (file.endsWith('.js')) {
        const pull = require(filePath);
        bot.commands.set(pull.command, pull);
      }
    }
  }
  await readDirRecursive(path.join(process.cwd(), dir));
}

loaderTextCmd('./commands/');
```
The loader function reads all the files in the `./commands/` directory and adds each command to the commands collection.

Now we create any file with the `.js` extension, and write there:

```js
module.exports = {
  command: '/start',
  description: 'Startin command',
  code: (bot, message) => {
    message.chat.send({
      text: `Starting...`
    }) // or: message.chat.send('Starting...')
  }
}
```

You can set the bot's description and commands using the `setMyDescription` and `setMyCommands` methods respectively.

```javascript
bot.once('ready', async (client) => {
  await client.setDescription({
    description: 'My awesome Telegram bot'
  });

  await client.setCommands({
    commands: JSON.stringify(bot.commands.toArray())
  });
});
```

The `bot.setMyDescription` and `client.setDescription` method sets the bot's description, while the `bot.setMyCommands` and `client.setCommands` method sets the bot's commands.

## Conclusion
`Telegramsjs` provides a simple and flexible way to create Telegram bots using Node.js. With its easy-to-use syntax and event-driven architecture, it is a great choice for developers who want to build bots quickly and efficiently.

## Documentation
Detailed documentation for `Telegramsjs` is still in progress.

## Contributions
We welcome your contributions to the development of `Telegramsjs`! If you have any ideas or suggestions, please visit the <a href="https://discord.gg/j8G7jhHMbs">Official support server</a> or the <a href="https://t.me/sempaika_telegrams_js">Official Telegram channel</a>.

## Example 
To see the correct use of the library, see the page on github

## License
`Telegramsjs` is available under the `MIT` license. For more information, please refer to the <a href="https://github.com/Sempai-07/Telegramsjs/blob/main/LICENSE">LICENSE</a> file.