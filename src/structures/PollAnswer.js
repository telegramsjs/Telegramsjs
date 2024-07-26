const { Base } = require("./Base");
const { User } = require("./misc/User");
const { Chat } = require("./chat/Chat");

class PollAnswer extends Base {
  /**
   * @param {import("../client/TelegramClient").TelegramClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").PollAnswer} data - Data about the represents an answer of a user in a non-anonymous poll
   */
  constructor(client, data) {
    super(client);

    /** Unique poll identifier */
    this.id = data.poll_id;

    this._patch(data);
  }

  _patch(data) {
    if ("voter_chat" in data) {
      /**
       * The chat that changed the answer to the poll, if the voter is anonymous
       * @type {Chat | undefined}
       */
      this.voterChat = new Chat(this.client, data.voter_chat);
    }

    if ("user" in data) {
      /**
       * The user that changed the answer to the poll, if the voter isn't anonymous
       * @type {User | undefined}
       */
      this.user = new User(this.client, data.user);
    }

    /**
     * 0-based identifiers of chosen answer options. May be empty if the vote was retracted
     * @type {number[]}
     */
    this.ids = data.option_ids;

    return data;
  }
}

module.exports = { PollAnswer };
