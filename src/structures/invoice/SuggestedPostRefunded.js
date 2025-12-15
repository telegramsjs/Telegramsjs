// @ts-check
const { Message } = require("../message/Message");

class SuggestedPostRefunded {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this.
   * @param {import("@telegram.ts/types").SuggestedPostRefunded} data - Data about the payment refund for a suggested post.
   */
  constructor(client, data) {
    /**
     * Reason for the refund. Currently, one of “post_deleted” if the post was deleted within 24 hours of being posted or removed from scheduled messages without being posted, or “payment_refunded” if the payer refunded their payment.
     * @type {string}
     */
    this.reason = data.reason;

    if ("suggested_post_message" in data) {
      /**
       * Message containing the suggested post. Note that the Message object in this field will not contain the reply_to_message field even if it itself is a reply.
       * @type {Message | undefined}
       */
      this.postMessage = new Message(client, data.suggested_post_message);
    }
  }
}

module.exports = { SuggestedPostRefunded };
