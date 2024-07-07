const { Base } = require("./Base");
const { User } = require("./User");
const { Chat } = require("./Chat");

class MessageOrigin extends Base {
  constructor(client, data) {
    super(client, data);

    this.createdTimestamp = data.date;
    this._patch(data);
  }

  _patch(data) {
    if ("message_id" in data) {
      this.id = data.message_id;
    }

    if ("sender_user" in data) {
      this.senderUser = new User(this.client, data.sender_user);
    }

    if ("sender_user_name" in data) {
      this.username = data.sender_user_name;
    }

    if ("sender_chat" in data) {
      this.senderChat = new Chat(this.client, data.sender_chat);
    }

    if ("chat" in data) {
      this.chat = new Chat(this.client, data.chat);
    }

    if ("author_signature" in data) {
      this.authorSignature = data.author_signature;
    }
  }

  isUser() {
    return "senderUser" in this;
  }

  isHiddenUser() {
    return "username" in this;
  }

  isChat() {
    return "senderChat" in this;
  }

  isChennel() {
    return "id" in this && "chat" in this;
  }

  get createdAt() {
    return new Date(this.createdTimestamp);
  }
}

module.exports = { MessageOrigin };
