const { BackgroundType } = require("./BackgroundType");

class ChatBackground {
  constructor(client, data) {
    this.type = new BackgroundType(client, data);
  }
}

module.exports = ChatBackground;
