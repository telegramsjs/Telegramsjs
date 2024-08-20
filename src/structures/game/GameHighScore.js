const { Base } = require("../Base");

class GameHighScore extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").GameHighScore} data - Data about the represents one row of the high scores table for a game
   */
  constructor(client, data) {
    super(client);

    /** Position in high score table for the game */
    this.position = data.position;

    /** Score */
    this.score = data.score;

    /** User */
    this.user = this.client.users._add(data.user);
  }
}

module.exports = { GameHighScore };
