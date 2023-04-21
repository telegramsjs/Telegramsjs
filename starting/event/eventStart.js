module.exports = {
  name: 'ready',
  once: false,
  code: async(bot, client) => {
    const info = await bot.setMyShortDescription({
      shortDescription: 'My bots information'
    });
    console.log(await bot.getMyShortDescription());
    await bot.setMyCommands({
      commands: []
    }).then(msg => {
      bot.setMyCommands({
        commands: JSON.stringify({
          inline_keyboard: bot.commands.toArray()
        })
      });
    });
    console.log("Bot starting");
  }
}
