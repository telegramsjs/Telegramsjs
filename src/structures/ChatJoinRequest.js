const { Base } = require("./Base");
const { Chat } = require("./chat/Chat");
const { User } = require("./misc/User");
const { ChatInviteLink } = require("./chat/ChatInviteLink");

class ChatJoinRequest extends Base {
  /**
   * @param {import("../client/TelegramClient").TelegramClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").ChatJoinRequest} data - Data about the represents a join request sent to a chat
   */
  constructor(client, data) {
    super(client);

    /** Identifier of a private chat with the user who sent the join request. The bot can use this identifier for 5 minutes to send messages until the join request is processed, assuming no other administrator contacted the user. */
    this.userChatId = data.user_chat_id;

    this._patch(data);
  }

  _patch(data) {
    /**
     * Chat to which the request was sent
     * @type {Chat}
     */
    this.chat = new Chat(this.client, data.chat);

    /**
     * User that sent the join request
     * @type {User}
     */
    this.author = new User(this.client, data.from);

    if ("bio" in data) {
      /**
       * Bio of the user
       * @type {string | undefined}
       */
      this.bio = data.bio;
    }

    if ("invite_link" in data) {
      /**
       * Chat invite link that was used by the user to send the join request
       * @type {ChatInviteLink}
       */
      this.inviteLink = new ChatInviteLink(this.client, data.invite_link);
    }
    /**
     * Date the request was sent in Unix time
     * @type {number}
     */
    this.createdTimestamp = data.date;

    return data;
  }

  /**
   * Date the request was sent
   * @type {Date}
   */
  get createdAt() {
    return new Date(this.createdTimestamp);
  }
}

module.exports = { ChatJoinRequest };
