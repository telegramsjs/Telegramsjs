const { Base } = require("./Base");
const { Chat } = require("./Chat");

class Giveaway extends Base {
  constructor(client, data) {
    super(client, data);

    this.chats = data.chats.map((chat) => new Chat(client, chat));

    this.selectedTimestamp = this.winners_selection_date;

    this.winnerCount = data.winner_count;

    if ("only_new_members" in data) {
      this.onlyNewMembers = data.only_new_members;
    }

    if ("has_public_winners" in data) {
      this.publicWinners = data.has_public_winners;
    }

    if ("prize_description" in data) {
      this.description = data.prize_description;
    }

    if ("country_codes" in data) {
      this.countryCodes = data.country_codes;
    }

    if ("premium_subscription_month_count" in data) {
      this.subscriptionMonthCount = data.premium_subscription_month_count;
    }
  }

  get selectedAt() {
    return new Date(this.selectedTimestamp);
  }
}

module.exports = { Giveaway };
