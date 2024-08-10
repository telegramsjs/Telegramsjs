const { Base } = require("../Base");
const { User } = require("../misc/User");

class BusinessConnection extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").BusinessConnection} data - Data about the connection of the bot with a business account
   */
  constructor(client, data) {
    super(client);

    /**
     * Unique identifier of the business connection
     * @type {string}
     */
    this.id = data.id;

    /**
     * Business account user that created the business connection
     * @type {User}
     */
    this.user = new User(client, data.user);

    /**
     * Identifier of a private chat with the user who created the business connection
     * @type {string}
     */
    this.userChatId = String(data.user_chat_id);

    /**
     * Date the connection was established in Unix time
     * @type {number}
     */
    this.createdUnixTime = data.date;

    /**
     * True, if the bot can act on behalf of the business account in chats that were active in the last 24 hours
     * @type {boolean}
     */
    this.replyed = data.can_reply;

    /**
     * True, if the connection is active
     * @type {boolean}
     */
    this.enabled = data.is_enabled;
  }

  /**
   * Return the timestamp connection was established, in milliseconds
   */
  get createdTimestamp() {
    return this.createdUnixTime * 1000;
  }

  /**
   * Date the connection was established
   * @type {Date}
   */
  get createdAt() {
    return new Date(this.createdTimestamp);
  }
}

module.exports = { BusinessConnection };
