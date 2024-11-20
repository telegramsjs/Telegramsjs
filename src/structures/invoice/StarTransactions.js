// @ts-check
const { StarTransaction } = require("./StarTransaction");
const { Collection } = require("@telegram.ts/collection");

class StarTransactions {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").StarTransactions} data - Data about the contains a list of Telegram Star transactions
   */
  constructor(client, data) {
    /**
     * The list of transactions
     * @type {Collection<string, StarTransaction>}
     */
    this.transactions = new Collection(
      data.transactions.map((transaction) => [
        transaction.id,
        new StarTransaction(client, transaction),
      ]),
    );
  }

  /**
   * Makes the class iterable, returning each `StarTransaction` object.
   * @returns {IterableIterator<StarTransaction>}
   */
  *[Symbol.iterator]() {
    for (const [_, transaction] of this.transactions) {
      yield transaction;
    }
  }
}

module.exports = { StarTransactions };
