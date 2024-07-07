const { User } = require("./User");
const { Base } = require("./Base");

class VideoChatParticipantsInvited extends Base {
  constructor(client, data) {
    super(client, data);

    this.users = data.users.map((user) => new User(client, user));
  }
}

module.exports = { VideoChatParticipantsInvited };
