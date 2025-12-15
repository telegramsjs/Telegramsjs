// @ts-check
const { Message } = require("../message/Message");
const { StarAmount } = require("../misc/StarAmount");

class SuggestedPostPaid {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this.
   * @param {import("@telegram.ts/types").SuggestedPostPaid} data - Data about the successful payment for a suggested post
   */
  constructor(client, data) {
    if ("suggested_post_message" in data) {
      /**
       * Message containing the suggested post. Note that the Message object in this field will not contain the reply_to_message field even if it itself is a reply.
       * @type {Message | undefined}
       */
      this.postMessage = new Message(client, data.suggested_post_message);
    }

    /**
     * Currency in which the payment was made. Currently, one of “XTR” for Telegram Stars or “TON” for toncoins
     * @type {string}
     */
    this.currency = data.currency;

    if ("amout" in data) {
      /**
       * The amount of the currency that was received by the channel in nanotoncoins; for payments in toncoins only.
       * @type {number | undefined}
       */
      this.amount = data.amount;
    }

    if ("star_amount" in data) {
      /**
       * The amount of Telegram Stars that was received by the channel; for payments in Telegram Stars only.
       * @type {StarAmount | undefined}
       */
      this.starAmount = new StarAmount(data.star_amount);
    }
  }
}

module.exports = { SuggestedPostPaid };
