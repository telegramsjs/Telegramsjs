// @ts-check
class GiveawayCompleted {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").GiveawayCompleted} data - Data about the represents a service message about the completion of a giveaway without public winners
   */
  constructor(client, data) {
    /** Number of winners in the giveaway */
    this.count = data.winner_count;

    if ("unclaimedPrizeCount" in data) {
      /** Number of undistributed prizes */
      this.unclaimedPrizeCount = data.unclaimed_prize_count;
    }

    if ("giveaway_message" in data) {
      const { Message } = require("../message/Message");

      /** Message with the giveaway that was completed, if it wasn't deleted */
      this.message = new Message(client, data.giveaway_message);
    }

    if ("is_star_giveaway" in data) {
      /** True, if the giveaway is a Telegram Star giveaway. Otherwise, currently, the giveaway is a Telegram Premium giveaway. */
      this.startedGiveaway = data.is_star_giveaway;
    }
  }
}

module.exports = { GiveawayCompleted };
