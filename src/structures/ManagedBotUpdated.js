// @ts-check
const { Base } = require("./Base");

class ManagedBotUpdated extends Base {
  /**
   * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client
   * @param {any} data
   */
  constructor(client, data) {
    super(client);

    if ("bot" in data) this.bot = this.client.users._add(data.bot);
    if ("manager_bot" in data) this.manager = this.client.users._add(data.manager_bot);
    if ("token" in data) this.token = data.token;
  }
}

module.exports = { ManagedBotUpdated };
