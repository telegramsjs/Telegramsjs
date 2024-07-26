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

    if ("voter_chat" in data) {
      /** The chat that changed the answer to the poll, if the voter is anonymous */
      this.voterChat = new Chat(client, data.voter_chat);
    }

    if ("user" in data) {
      /** The user that changed the answer to the poll, if the voter isn't anonymous */
      this.user = new User(client, data.user);
    }

    /** 0-based identifiers of chosen answer options. May be empty if the vote was retracted */
    this.ids = data.option_ids;
  }
}

module.exports = { PollAnswer };
