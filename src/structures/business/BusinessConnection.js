const { Base } = require("../Base");
const { User } = require("../misc/User");

class BusinessConnection extends Base {
  constructor(client, data) {
    super(client, data);

    this.id = data.id;

    this.user = new User(client, data.user);

    this.userChatId = data.user_chat_id;

    this.createdTimestamp = data.date;

    this.replyed = data.can_reply;

    this.enabled = data.is_enabled;
  }

  get createdAt() {
    return new Date(this.createdTimestamp);
  }
}

module.exports = { BusinessConnection };
