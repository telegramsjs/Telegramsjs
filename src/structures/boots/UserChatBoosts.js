const { ChatBoost } = require("./ChatBoost");

class UserChatBoosts {
  constructor(client, data) {
    this.boosts = data.boosts.map((boost) => new ChatBoost(client, data));

    this.count = data.boosts.length;
  }
}

module.exports = { UserChatBoosts };
