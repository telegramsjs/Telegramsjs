const { Base } = require("./Base");
const { Chat } = require("./chat/Chat");
const { User } = require("./misc/User");
const { ChatMember } = require("./chat/ChatMember");
const { ChatInviteLink } = require("./chat/ChatInviteLink");

class ChatMemberUpdated extends Base {
  /**
   * @param {import("../client/TelegramClient").TelegramClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").ChatMemberUpdated} data - Data about the represents changes in the status of a chat member
   */
  constructor(client, data) {
    super(client);

    this._patch(data);
  }

  _patch(data) {
    /**
     * Chat the user belongs to
     * @param {Chat}
     */
    this.chat = new Chat(this.client, data.chat);

    /**
     * Performer of the action, which resulted in the change
     * @type {User}
     */
    this.author = new User(this.client, data.from);

    /**
     * Date the change was done in Unix time
     * @type {number}
     */
    this.createdTimestamp = data.date;

    /**
     * Previous information about the chat member
     * @type {ChatMember}
     */
    this.oldMember = new ChatMember(
      this.client,
      this.chat.id,
      data.old_chat_member,
    );

    if (!this.chat.isPrivate()) {
      /**
       * New information about the chat member
       * @type {ChatMember}
       */
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
      /**
       * Chat invite link, which was used by the user to join the chat; for joining by invite link events only
       * @type {ChatInviteLink | undefined}
       */
      this.inviteLink = new ChatInviteLink(this.client, data.invite_link);
    }

    if ("via_join_request" in data) {
      /**
       * True, if the user joined the chat after sending a direct join request without using an invite link without using an invite link and being approved by an administrator
       * @type {boolean | undefined}
       */
      this.viaJoinRequest = data.via_join_request;
    }

    if ("via_chat_folder_invite_link" in data) {
      /**
       * True, if the user joined the chat via a chat folder invite link
       * @type {boolean | undefined}
       */
      this.viaInviteLink = data.via_chat_folder_invite_link;
    }

    return data;
  }

  /**
   * Date the change was done
   * @type {Date}
   */
  get createdAt() {
    return new Date(this.createdTimestamp);
  }
}

module.exports = { ChatMemberUpdated };
