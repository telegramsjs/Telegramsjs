// @ts-check
const { Base } = require("./Base");

class ManagedBotCreated extends Base {
  /**
   * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client
   * @param {any} data
   */
  constructor(client, data) {
    super(client);

    this.requestId = data.request_id;
    this.manager = this.client.users._add(data.manager_bot);
    this.bot = this.client.users._add(data.bot);
  }
}

module.exports = { ManagedBotCreated };
