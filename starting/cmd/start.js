module.exports = {
  command: '/start', // command name 
  exudates: true, // Command will be invisible in the list 
  description: 'Начало',
  code: async (bot, message) => {
    await message.reply('Hello ' + message.from?.username ?? message.from.first_name);
  },
};
