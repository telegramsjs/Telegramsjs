const { ChatBoostSource } = require("./ChatBoostSource");

class ChatBoost {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").ChatBoost} data - Data about the boost
   */
  constructor(client, data) {
    /** Unique identifier of the boost */
    this.id = data.boost_id;

    /** Point in time (Unix timestamp) when the chat was boosted */
    this.createdTimestamp = data.add_date;

    /** Point in time (Unix timestamp) when the boost will automatically expire, unless the booster's Telegram Premium subscription is prolonged */
    this.expirationedTimestamp = data.expiration_date;

    /** Source of the added boost */
    this.source = new ChatBoost(client, data.source);
  }

  /**
   * Point in time when the chat was boosted
   * @type {Date}
   */
  get createdAt() {
    return new Date(this.createdTimestamp);
  }

  /**
   * Point in time (Unix timestamp) when the boost will automatically expire, unless the booster's Telegram Premium subscription is prolonged
   * @type {Date}
   */
  get expirationedAt() {
    return new Date(this.expirationedTimestamp);
  }
}

module.exports = { ChatBoost };
