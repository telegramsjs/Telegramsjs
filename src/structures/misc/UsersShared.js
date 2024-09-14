// @ts-check
const { SharedUser } = require("./SharedUser");

class UsersShared {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").UsersShared} data - Data about the contains information about the user whose identifier was shared with the bot using a KeyboardButtonRequestUsers button
   */
  constructor(client, data) {
    /** Identifier of the request */
    this.requestId = data.request_id;

    /** Information about users shared with the bot. */
    this.users = data.users.map((user) => new SharedUser(client, user));
  }
}

module.exports = { UsersShared };
