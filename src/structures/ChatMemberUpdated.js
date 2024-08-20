const { Base } = require("./Base");
const { ChatMember } = require("./chat/ChatMember");
const { ChatInviteLink } = require("./chat/ChatInviteLink");

class ChatMemberUpdated extends Base {
  /**
   * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").ChatMemberUpdated} data - Data about the represents changes in the status of a chat member
   */
  constructor(client, data) {
    super(client);

    /**
     * Chat the user belongs to
     * @type {import("./chat/Chat").Chat}
     */
    this.chat = this.client.chats._add(data.chat);

    /**
     * Performer of the action, which resulted in the change
     * @type {import("./misc/User").User}
     */
    this.author = this.client.users._add(data.from);

    /** Date the change was done in Unix time */
    this.createdUnixTime = data.date;

    /** Previous information about the chat member */
    this.oldMember = new ChatMember(client, this.chat.id, data.old_chat_member);

    /** New information about the chat member */
    this.newMember = new ChatMember(client, this.chat.id, data.new_chat_member);

    if ("invite_link" in data) {
      /** Chat invite link, which was used by the user to join the chat; for joining by invite link events only */
      this.inviteLink = new ChatInviteLink(client, data.invite_link);
    }

    if ("via_join_request" in data) {
      /** True, if the user joined the chat after sending a direct join request without using an invite link without using an invite link and being approved by an administrator */
      this.viaJoinRequest = data.via_join_request;
    }

    if ("via_chat_folder_invite_link" in data) {
      /** True, if the user joined the chat via a chat folder invite link */
      this.viaInviteLink = data.via_chat_folder_invite_link;
    }
  }

  /**
   * Return the timestamp change was done, in milliseconds
   */
  get createdTimestamp() {
    return this.createdUnixTime * 1000;
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
