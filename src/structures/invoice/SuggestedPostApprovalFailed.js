// @ts-check
const { Message } = require("../message/Message");
const { SuggestedPostPrice } = require("./SuggestedPostPrice");

class SuggestedPostApprovalFailed {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this.
   * @param {import("@telegram.ts/types").SuggestedPostApprovalFailed} data - Data about the failed approval of a suggested post. Currently, only caused by insufficient user funds at the time of approval.
   */
  constructor(client, data) {
    /**
     * Expected price of the post.
     * @type {SuggestedPostPrice | undefined}
     */
    this.price = new SuggestedPostPrice(data.price);

    if ("suggested_post_message" in data) {
      /**
       * Message containing the suggested post whose approval has failed. Note that the Message object in this field will not contain the reply_to_message field even if it itself is a reply.
       * @type {Message | undefined}
       */
      this.postMessage = new Message(client, data.suggested_post_message);
    }
  }
}

module.exports = { SuggestedPostApprovalFailed };
