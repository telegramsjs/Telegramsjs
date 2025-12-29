// @ts-check
const { Base } = require("./Base");
const { ChatInviteLink } = require("./chat/ChatInviteLink");

class ChatJoinRequest extends Base {
  /**
   * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").ChatJoinRequest} data - Data about the represents a join request sent to a chat
   */
  constructor(client, data) {
    super(client);

    /** Identifier of a private chat with the user who sent the join request. The bot can use this identifier for 5 minutes to send messages until the join request is processed, assuming no other administrato */
    this.userChatId = String(data.user_chat_id);

    /**
     * Chat to which the request was sent
     * @type {import("./chat/Chat").Chat}
     */
    this.chat = this.client.chats._add(data.chat);

    /**
     * User that sent the join request
     * @type {import("./misc/User").User}
     */
    this.author = this.client.users._add(data.from);

    if ("bio" in data) {
      /** Bio of the user */
      this.bio = data.bio;
    }

    if ("invite_link" in data) {
      /** Chat invite link that was used by the user to send the join request */
      this.inviteLink = new ChatInviteLink(client, data.invite_link);
    }

    /** Date the request was sent in Unix time */
    this.createdUnixTime = data.date;
  }

  /**
   * Return the timestamp request was sent, in milliseconds
   */
  get createdTimestamp() {
    return this.createdUnixTime * 1000;
  }

  /**
   * Date the request was sent
   * @type {Date}
   */
  get createdAt() {
    return new Date(this.createdTimestamp);
  }

  /**
   * Use this method to approve a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right.
   * @returns {Promise<true>} - Returns True on success.
   */
  approveJoinRequest() {
    return this.client.approveChatJoinRequest(this.chat.id, this.author.id);
  }

  /**
   * Use this method to decline a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right.
   * @returns {Promise<true>} - Returns True on success.
   */
  declineJoinRequest() {
    return this.client.declineChatJoinRequest(this.chat.id, this.author.id);
  }
}

module.exports = { ChatJoinRequest };
