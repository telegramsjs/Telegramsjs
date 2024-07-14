const { Base } = require("../Base");
const { Chat } = require("../chat/Chat");

class BusinessMessagesDeleted extends Base {
  constructor(client, data) {
    super(client, data);

    this.id = data.business_connection_id;

    this.chat = new Chat(client, data.chat);

    this.ids = data.message_ids;
  }
}

module.exports = { BusinessMessagesDeleted };
