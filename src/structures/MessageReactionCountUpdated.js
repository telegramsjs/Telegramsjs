const { Base } = require("./Base");
const { Chat } = require("./chat/Chat");
const { ReactionType } = require("./misc/ReactionType");

class ReactionCount {
  /**
   * @param {import("@telegram.ts/types").ReactionCount} data - Data about the eepresents a reaction added to a message along with the number of times it was added
   */
  constructor(data) {
    /** Number of times the reaction was added */
    this.totalCount = data.total_count;

    /** Type of the reaction */
    this.type = new ReactionType(data.type);
  }
}

class MessageReactionCountUpdated extends Base {
  /**
   * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").MessageReactionCountUpdated} data - Data about the represents reaction changes on a message with anonymous reactions
   */
  constructor(client, data) {
    super(client);

    /** Unique message identifier inside the chat */
    this.id = String(data.message_id);

    /** The chat containing the message */
    this.chat = new Chat(client, data.chat);

    /** List of reactions that are present on the message */
    this.reactions = data.reactions.map((data) => new ReactionCount(data));

    /** Date of the change in Unix time */
    this.createdTimestamp = data.date;
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
