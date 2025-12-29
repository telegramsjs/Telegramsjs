// @ts-check
const { ChatBoost } = require("./ChatBoost");
const { Collection } = require("@telegram.ts/collection");

class UserChatBoosts {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").UserChatBoosts} data - Data about the user chat boosts
   */
  constructor(client, data) {
    /**
     * The list of boosts added to the chat by the user
     * @type {Collection<string, ChatBoost>}
     */
    this.boosts = new Collection(
      data.boosts.map((boost) => [
        boost.boost_id,
        new ChatBoost(client, boost),
      ]),
    );

    /**
     * The boost count added to the chat by the user
     * @type {number}
     */
    this.count = data.boosts.length;
  }

  /**
   * Makes the class iterable, returning each `ChatBoost` object.
   * @returns {IterableIterator<ChatBoost>}
   */
  *[Symbol.iterator]() {
    yield* this.boosts.values();
  }
}

module.exports = { UserChatBoosts };
