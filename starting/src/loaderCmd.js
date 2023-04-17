const path = require('path');
const fs = require('fs');

async function loaderCmd(bot, dir) {
  const readDirRecursive = async (directory) => {
    const files = await fs.readdirSync(directory);
    for (const file of files) {
      const filePath = path.join(directory, file);
      if (fs.statSync(filePath).isDirectory()) {
        await readDirRecursive(filePath);
      } else if (file.endsWith('.js')) {
        const pull = require(filePath);
        if (pull.exudates) 
        bot.exudates.set(pull.command, pull);
        else
        bot.commands.set(pull.command, pull);
      }
    }
  }
  await readDirRecursive(path.join(process.cwd(), dir));
}

module.exports = {
  loaderCmd
}