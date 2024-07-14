const { Base } = require("./Base");
const { Chat } = require("./chat/Chat");
const { User } = require("./misc/User");
const { ChatInviteLink } = require("./chat/ChatInviteLink");

class ChatJoinRequest extends Base {
  constructor(client, data) {
    super(client, data);

    this.userChatId = data.user_chat_id;

    this._patch(data);
  }

  _patch(data) {
    this.chat = new Chat(this.client, data.chat);

    this.author = new User(this.client, data.from);

    if ("bio" in data) {
      this.bio = data.bio;
    }

    if ("invite_link" in data) {
      this.inviteLink = new ChatInviteLink(this.client, data.invite_link);
    }

    this.createdTimestamp = data.date;
  }

  get createdAt() {
    return new Date(this.createdTimestamp);
  }
}

module.exports = { ChatJoinRequest };
