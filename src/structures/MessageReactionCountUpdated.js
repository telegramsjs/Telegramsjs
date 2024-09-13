// @ts-check
const { Base } = require("./Base");
const { ReactionCount } = require("./misc/ReactionCount");

class MessageReactionCountUpdated extends Base {
  /**
   * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").MessageReactionCountUpdated} data - Data about the represents reaction changes on a message with anonymous reactions
   */
  constructor(client, data) {
    super(client);

    /** Unique message identifier inside the chat */
    this.id = String(data.message_id);

    /**
     * The chat containing the message
     * @type {import("./chat/Chat").Chat}
     */
    this.chat = this.client.chats._add(data.chat);

    /** List of reactions that are present on the message */
    this.reactions = data.reactions.map((data) => new ReactionCount(data));

    /** Date of the change in Unix time */
    this.createdUnixTime = data.date;
  }

  /**
   * Return the timestamp change, in milliseconds
   */
  get createdTimestamp() {
    return this.createdUnixTime * 1000;
  }

  /**
   * Date of the change
   * @type {Date}
   */
  get createdAt() {
    return new Date(this.createdTimestamp);
  }
}

module.exports = { MessageReactionCountUpdated };
