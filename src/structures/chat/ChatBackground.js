const { BackgroundType } = require("./BackgroundType");

class ChatBackground {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").ChatBackground} data - Data about the represents a chat background
   */
  constructor(client, data) {
    /** Type of the background*/
    this.type = new BackgroundType(client, data.type);
  }
}

module.exports = { ChatBackground };
