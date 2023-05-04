module.exports = {
  name: 'ready',
  once: false,
  code: async(bot, client) => {
    const info = await bot.setShortDescription({
      description: 'My bots information'
    });
    await bot.setCommands({
      commands: []
    }).then(msg => {
      bot.setCommands({
        commands: JSON.stringify(bot.commands.toArray())
      });
    });
    console.log("Bot starting");
  }
}