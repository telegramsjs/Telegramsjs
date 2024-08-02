const { Base } = require("./Base");
const { User } = require("./misc/User");
const { Location } = require("./misc/Location");

/**
 * @typedef {import("../types").MethodParameters} MethodParameters
 */

class ChosenInlineResult extends Base {
  /**
   * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").ChosenInlineResult} data - Data about the Represents a result of an inline query that was chosen by the user and sent to their chat partner
   */
  constructor(client, data) {
    super(client);

    /** The unique identifier for the result that was chosen */
    this.id = data.result_id;

    /** The user that chose the result */
    this.author = new User(client, data.from);

    if ("location" in data) {
      /** Sender location, only for bots that require user location */
      this.location = new Location(client, data.location);
    }

    /** The query that was used to obtain the result */
    this.query = data.query;

    /** Identifier of the sent inline message. Available only if there is an inline keyboard attached to the message. Will be also received in callback queries and can be used to edit the message */
    this.inlineMessageId = data.inline_message_id;
  }

  /**
   * Use this method to send answers to an inline query.
   * @param {readonly import("@telegram.ts/types").InlineQueryResult[]} results - An array of results for the inline query
   * @param {Omit<MethodParameters["answerInlineQuery"], "inlineQueryId" | "results">} [options={}] - out parameters
   * @return {Promise<true>} - On success, True is returned.
   */
  answerQuery(results, options = {}) {
    return this.client.answerInlineQuery({
      inlineQueryId: this.id,
      results,
      ...options,
    });
  }
}

module.exports = { ChosenInlineResult };
