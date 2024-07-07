const { ChatBoostSource } = require("./ChatBoostSource");

class ChatBoost {
  constructor(client, data) {
    this.id = data.boost_id;

    this.createdTimestamp = data.add_date;

    this.expirationedTimestamp = data.expiration_date;

    this.source = new ChatBoost(client, data.source);
  }

  get createdAt() {
    return new Date(this.createdTimestamp);
  }

  get expirationedAt() {
    return new Date(this.expirationedTimestamp);
  }
}

module.exports = { ChatBoost };
