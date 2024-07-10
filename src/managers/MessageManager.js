const { BaseManager } = require("./BaseManager");
const { Message } = require("../structures/Message");

class MessageManager extends BaseManager {
  constructor(client, cacheSize) {
    super(client, Message, cacheSize);
  }
}

module.exports = { MessageManager };
