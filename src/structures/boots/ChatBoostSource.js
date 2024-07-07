const { Base } = require("../Base");
const { User } = require("../User");

class ChatBoostSource extends Base {
  constructor(client, data) {
    super(client, data);

    this._patch(data);
  }

  _patch(data) {
    if ("user" in data) {
      this.user = new User(this.client, data.user);
    }

    if ("giveaway_message_id" in data) {
      this.giveawayId = data.giveaway_message_id;
    }

    if ("is_unclaimed" in data) {
      this.unclaimed = data.is_unclaimed;
    }
  }

  isGiveaway() {
    return "giveawayId" in this && this.giveawayId;
  }

  isPremiumAndGift() {
    return "user" in this && this.user && !("giveawayId" in this);
  }
}

module.exports = { ChatBoostSource };
