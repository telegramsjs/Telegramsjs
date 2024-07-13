const { Base } = require("./Base");
const { User } = require("./User");
const { Chat } = require("./Chat");

class PollAnswer extends Base {
  constructor(client, data) {
    super(client, data);

    this.id = data.poll_id;

    this._patch(data);
  }

  _patch(data) {
    if ("voter_chat" in data) {
      this.voterChat = new Chat(this.client, data.voter_chat);
    }

    if ("user" in data) {
      this.user = new User(this.client, data.user);
    }

    this.ids = data.option_ids;
  }
}

module.exports = { PollAnswer };
