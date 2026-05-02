// @ts-check
const { Base } = require("./Base");

/**
 * @typedef {import("../types").MethodParameters} MethodParameters
 */

class ManagedBotUpdated extends Base {
  /**
   * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").ManagedBotUpdated} data - Data about the creation, token update, or owner update of a bot that is managed by the current bot.
   */
  constructor(client, data) {
    super(client);

    /**
     * User that created the bot
     * @type {import("./misc/User").User}
     */
    this.author = this.client.users._add(data.user);

    /**
     * Information about the bot.
     * @type {import("./misc/User").User}
     */
    this.bot = this.client.users._add(data.bot);
  }

  /**
   * Use this method to get the token of a managed bot.
   * @returns {Promise<string>} the token as String on success.
   */
  fetchBotToken() {
    return this.client.getManagedBotToken(this.author.id);
  }

  /**
   * Use this method to revoke the current token of a managed bot and generate a new one.
   * @returns {Promise<string>} the new token as String on success.
   */
  replaceBotToken() {
    return this.client.replaceManagedBotToken(this.author.id);
  }
}

module.exports = { ManagedBotUpdated };
