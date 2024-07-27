const { Base } = require("./Base");
const { User } = require("./misc/User");
const { Location } = require("./misc/Location");

class InlineQuery extends Base {
  /**
   * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").InlineQuery} data - Data about the represents an incoming inline query. When the user sends an empty query, your bot could return some default or trending results
   */
  constructor(client, data) {
    super(client);

    /** Unique identifier for this query */
    this.id = data.id;

    /** Sender */
    this.author = new User(client, data.from);

    /** Text of the query (up to 256 characters) */
    this.query = data.query;

    /**  Offset of the results to be returned, can be controlled by the bot */
    this.offset = data.offset;

    if ("chat_type" in data) {
      /** Type of the chat from which the inline query was sent. Can be either “sender” for a private chat with the inline query sender, “private”, “group”, “supergroup”, or “channel”. The chat type should be always known for requests sent from official clients and most third-party clients, unless the request was sent from a secret chat */
      this.type = data.chat_type;
    }

    if ("location" in data) {
      /** Sender location, only for bots that request user location */
      this.location = new Location(client, data.location);
    }
  }
}

module.exports = { InlineQuery };
