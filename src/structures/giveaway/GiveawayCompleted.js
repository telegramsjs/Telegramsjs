const { Base } = require("../Base");

class GiveawayCompleted extends Base {
  constructor(client, data) {
    super(client, data);

    this.count = data.winner_count;

    this.prizeCount = data.unclaimed_prize_count;

    const { Message } = require("../message/Message");
    this.message = new Message(client, data.message);
  }
}

module.exports = { GiveawayCompleted };
