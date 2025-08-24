// @ts-check
const { Message } = require("../message/Message");
const { SuggestedPostPrice } = require("./SuggestedPostPrice");

class SuggestedPostApproved {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this.
   * @param {import("@telegram.ts/types").SuggestedPostApproved} data - Data about the approval of a suggested post.
   */
  constructor(client, data) {
    if ("suggested_post_message" in data) {
      /**
       * Message containing the suggested post. Note that the Message object in this field will not contain the reply_to_message field even if it itself is a reply.
       * @type {Message | undefined}
       */
      this.postMessage = new Message(client, data.suggested_post_message);
    }

    if ("price" in data) {
      /**
       * Proposed price of the post. If the field is omitted, then the post is unpaid.
       * @type {SuggestedPostPrice | undefined}
       */
      this.price = new SuggestedPostPrice(data.price);
    }

    /**
     * Date when the post will be published.
     * @type {number | undefined}
     */
    this.createdUnixTime = data.send_date;
  }

  /**
   * Return the timestamp post will be published, in milliseconds
   */
  get createdTimestamp() {
    return this.createdUnixTime ? this.createdUnixTime * 1000 : null;
  }

  /**
   * Date the post will be published
   * @type {null | Date}
   */
  get createdAt() {
    return this.createdTimestamp ? new Date(this.createdTimestamp) : null;
  }
}

module.exports = { SuggestedPostApproved };
