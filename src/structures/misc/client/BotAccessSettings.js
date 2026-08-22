// @ts-check
const { Base } = require("../../Base");

class BotAccessSettings extends Base {
  /**
   * @param {import("../../../client/TelegramClient").TelegramClient | import("../../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").BotAccessSettings} data - Data about the access settings of a bot.
   */
  constructor(client, data) {
    super(client);

    if (data.added_users) {
      /**
       * The list of other users who have access to the bot if the access is restricted
       * @type {import("../user/User").User[] | undefined}
       */
      this.users = data.added_users.map((user) => this.client.users._add(user));
    }

    /** Whether the bot's access is restricted */
    this.isAccessRestricted = data.is_access_restricted;

    this._patch(data);
  }
}

module.exports = { BotAccessSettings };
