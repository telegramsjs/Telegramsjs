const { Base } = require("./Base");
const { Chat } = require("./Chat");

class Story extends Chat {
  constructor(client, data) {
    super(client, data);

    this.id = data.id;

    this.chat = new Chat(client, data.chat);
  }
}

module.exports = { Story };
