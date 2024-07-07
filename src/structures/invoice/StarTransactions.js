const { StarTransaction } = require("./StarTransaction");

class StarTransactions {
  constructor(client, data) {
    this.transactions = data.transactions.map(
      (transaction) => new StarTransaction(client, data),
    );
  }
}

module.exports = { StarTransactions };
