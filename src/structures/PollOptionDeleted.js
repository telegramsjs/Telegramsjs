// @ts-check
const { Base } = require("./Base");

class PollOptionDeleted extends Base {
  /**
   * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client
   * @param {any} data
   */
  constructor(client, data) {
    super(client);
    this.pollId = data.poll_id;
    this.optionId = data.option_id;
  }
}

module.exports = { PollOptionDeleted };
