const { Base } = require("../Base");
const { User } = require("../misc/User");

class ChatInviteLink extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").ChatInviteLink} data - Data about the represents an invite link for a chat
   */
  constructor(client, data) {
    super(client);

    /**
     * The invite link. If the link was created by another chat administrator, then the second part of the link will be replaced with "...".
     * @type {string}
     */
    this.link = data.invite_link;

    /**
     * Creator of the link
     * @type {User}
     */
    this.creator = new User(client, data.creator);

    /**
     * True, if users joining the chat via the link need to be approved by chat administrators
     * @type {boolean}
     */
    this.createsRequest = data.creates_join_request;

    /**
     * True, if the link is primary
     * @type {boolean}
     */
    this.primary = data.is_primary;

    /**
     * True, if the link is revoked
     * @type {boolean}
     */
    this.revoked = data.is_revoked;

    if ("name" in data) {
      /**
       * Invite link name
       * @type {string | undefined}
       */
      this.name = data.name;
    }

    if ("expire_date" in data) {
      /**
       * Point in time (Unix timestamp) when the link will expire or has been expired
       * @type {number}
       */
      this.expiredTimestamp = data.expire_date;
    }

    if ("member_limit" in data) {
      /**
       * The maximum number of users that can be members of the chat simultaneously after joining the chat via this invite link; 1-99999
       * @type {number | undefined}
       */
      this.limit = data.member_limit;
    }

    if ("pending_join_request_count" in data) {
      /**
       * Number of pending join requests created using this link
       * @type {number | undefined}
       */
      this.requestsCount = data.pending_join_request_count;
    }
  }

  /**
   * Point in time when the link will expire or has been expired
   * @type {Date}
   */
  get expiredAt() {
    return new Date(this.expiredTimestamp);
  }
}

module.exports = { ChatInviteLink };
