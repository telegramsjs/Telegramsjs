const { Base } = require("../Base");
const { Chat } = require("../chat/Chat");

class Story extends Chat {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").Story} data - Data about the represents a story
   */
  constructor(client, data) {
    super(client, data);

    /** Unique identifier for the story in the chat */
    this.id = data.id;

    /** Chat that posted the story */
    this.chat = new Chat(client, data.chat);
  }
}

module.exports = { Story };
