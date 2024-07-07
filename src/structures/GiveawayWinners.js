const { Chat } = require("./Chat");
const { User } = require("./User");
const { Base } = require("./Base");

class GiveawayWinners extends Base {
  constructor(client, data) {
    super(client, data);

    this.chat = new Chat(client, data.chat);

    this.messageId = data.giveaway_message_id;

    this.selectionTimestamp = data.winners_selection_date;

    this.count = data.winner_count;

    this.winners = data.winners.map((user) => new User(client, user));

    this._patch(data);
  }

  _patch(data) {
    if ("additional_chat_count" in data) {
      this.addChatCount = data.additional_chat_count;
    }

    if ("premium_subscription_month_count" in data) {
      this.subscriptionMonthCount = data.premium_subscription_month_count;
    }

    if ("only_new_members" in data) {
      this.onlyNewMembers = data.only_new_members;
    }

    if ("was_refunded" in data) {
      this.refunded = data.was_refunded;
    }

    if ("prize_description" in data) {
      this.description = data.prize_description;
    }
  }

  get selectionAt() {
    return new Date(this.selectionTimestamp);
  }
}

module.exports = { GiveawayWinners };
