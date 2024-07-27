const { StarTransaction } = require("./StarTransaction");

class StarTransactions {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").StarTransactions} data - Data about the contains a list of Telegram Star transactions
   */
  constructor(client, data) {
    /** The list of transactions */
    this.transactions = data.transactions.map(
      (transaction) => new StarTransaction(client, data),
    );
  }
}

module.exports = { StarTransactions };
