const fs = require('fs').promises;
const path = require('path');

async function loaderEvent(bot, dir) {
  const readDirRecursive = async (directory) => {
    const files = await fs.readdir(directory);
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = await fs.stat(filePath);
      if (stat.isDirectory()) {
        await readDirRecursive(filePath);
      } else if (file.endsWith('.js')) {
        const event = require(filePath);
        if (event.once) {
          bot.once(event.name, (...args) => event.code(bot, ...args));
        } else {
          bot.on(event.name, (...args) => event.code(bot, ...args));
        }
      }
    }
  };
  await readDirRecursive(path.join(process.cwd(), dir));
}

module.exports = {
  loaderEvent
};