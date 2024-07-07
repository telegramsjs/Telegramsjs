const { TransactionPartner } = require("./TransactionPartner");

class StarTransaction {
  constructor(client, data) {
    this.id = data.id;

    this.amount = data.amount;

    this.createdTimestamp = data.date;

    if ("source" in data) {
      this.source = new TransactionPartner(client, data.source);
    }

    if ("receiver" in data) {
      this.receiver = new TransactionPartner(client, data.receiver);
    }
  }

  get createdAt() {
    return new Date(this.createdTimestamp);
  }
}

module.exports = { StarTransaction };
