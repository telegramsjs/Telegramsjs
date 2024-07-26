const { Base } = require("./Base");
const { User } = require("./misc/User");
const { Location } = require("./misc/Location");

class ChosenInlineResult extends Base {
  /**
   * @param {import("../client/TelegramClient").TelegramClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").ChosenInlineResult} data - Data about the Represents a result of an inline query that was chosen by the user and sent to their chat partner
   */
  constructor(client, data) {
    super(client);

    /** The unique identifier for the result that was chosen */
    this.id = data.result_id;

    this._patch(data);
  }

  _patch(data) {
    /**
     * The user that chose the result
     * @type {User}
     */
    this.author = new User(this.client, data.from);

    if ("location" in data) {
      /**
       * Sender location, only for bots that require user location
       * @type {Location | undefined}
       */
      this.location = new Location(this.client, data.location);
    }

    /**
     * The query that was used to obtain the result
     * @type {string}
     */
    this.query = data.query;

    /**
     * Identifier of the sent inline message. Available only if there is an inline keyboard attached to the message. Will be also received in callback queries and can be used to edit the message
     * @type {number}
     */
    this.inlineMessageId = data.inline_message_id;

    return data;
  }
}

module.exports = { ChosenInlineResult };
