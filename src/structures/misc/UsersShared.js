// @ts-check
const { SharedUser } = require("./SharedUser");
const { Collection } = require("@telegram.ts/collection");

class UsersShared {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").UsersShared} data - Data about the contains information about the user whose identifier was shared with the bot using a KeyboardButtonRequestUsers button
   */
  constructor(client, data) {
    /** Identifier of the request */
    this.requestId = data.request_id;

    /**
     * Information about users shared with the bot.
     * @type {Collection<string, SharedUser>}
     */
    this.users = new Collection(
      data.users.map((user) => [
        String(user.user_id),
        new SharedUser(client, user),
      ]),
    );
  }

  /**
   * Makes the class iterable, returning each `SharedUser` object.
   * @returns {IterableIterator<SharedUser>}
   */
  *[Symbol.iterator]() {
    for (const [_, user] of this.users) {
      yield user;
    }
  }
}

module.exports = { UsersShared };
