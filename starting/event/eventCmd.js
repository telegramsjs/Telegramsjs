const path = require('path');

module.exports = {
  name: 'generalMessageCreate',
  once: false,
  code: async (bot, message, args) => {
    const botInfo = await bot.getMe();
    const userId = await message.from.id;
    bot.botInfo = await botInfo.result;
    if (message.entities && !message.isCommand) {
      const [command, ...args] = await message.text.split(/@|\s+/);
      const commands = await bot.commands.get(command);
      const exudates = await bot.exudates.get(command);
     if (exudates) {
       try {
        await exudates.code(bot, message, args, exudates.usage);
      } catch (error) {
        console.log(error);
      }
     }
      if (!commands) return;
      try {
        await commands.code(bot, message, args, commands.usage);
      } catch (error) {
        console.log(error);
      }
    }
  }
};