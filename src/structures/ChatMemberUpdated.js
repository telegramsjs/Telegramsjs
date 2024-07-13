const { Base } = require("./Base");
const { Chat } = require("./Chat");
const { User } = require("./User");
const { ChatMember } = require("./ChatMember");
const { ChatInviteLink } = require("./chat/ChatInviteLink");

class ChatMemberUpdated extends Base {
  constructor(client, data) {
    super(client, data);

    this._patch(data);
  }

  _patch(data) {
    this.chat = new Chat(this.client, data.chat);

    this.author = new User(this.client, data.from);

    this.createdTimestamp = data.date;

    this.oldMember = new ChatMember(
      this.client,
      this.chat.id,
      data.old_chat_member,
    );

    if (!this.chat.isPrivate()) {
      this.newMember = this.chat.members._add(this.chat.id, true, {
        id: data.new_chat_member.user.id,
        extras: [data.new_chat_member],
      });
    } else {
      this.newMember = new ChatMember(
        this.client,
        this.chat.id,
        data.new_chat_member,
      );
    }

    if ("invite_link" in data) {
      this.inviteLink = new ChatInviteLink(this.client, data.invite_link);
    }

    if ("via_join_request" in data) {
      this.viaJoinRequest = data.via_join_request;
    }

    if ("via_chat_folder_invite_link" in data) {
      this.viaInviteLink = data.via_chat_folder_invite_link;
    }
  }

  get createdAt() {
    return new Date(this.createdTimestamp);
  }
}

module.exports = { ChatMemberUpdated };
