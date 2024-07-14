const { BaseManager } = require("./BaseManager");
const { Message } = require("../structures/message/Message");

class MessageManager extends BaseManager {
  constructor(client, cacheSize) {
    super(client, Message, cacheSize);
  }
}

module.exports = { MessageManager };
