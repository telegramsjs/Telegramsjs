// @ts-check
const { Base } = require("../Base");

class Story extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").Story} data - Data about the represents a story
   */
  constructor(client, data) {
    super(client);

    /** Unique identifier for the story in the chat */
    this.id = data.id;

    /**
     * Chat that posted the story
     * @type {import("../chat/Chat").Chat}
     */
    this.chat = this.client.chats._add(data.chat);
  }
}

module.exports = { Story };
