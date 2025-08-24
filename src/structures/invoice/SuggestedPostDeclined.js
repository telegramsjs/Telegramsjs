// @ts-check
const { Message } = require("../message/Message");

class SuggestedPostDeclined {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this.
   * @param {import("@telegram.ts/types").SuggestedPostDeclined} data - Data about the the rejection of a suggested post.
   */
  constructor(client, data) {
    if ("comment" in data) {
      /**
       * Comment with which the post was declined.
       * @type {string | undefined}
       */
      this.comment = data.comment;
    }

    if ("suggested_post_message" in data) {
      /**
       * Message containing the suggested post. Note that the Message object in this field will not contain the reply_to_message field even if it itself is a reply.
       * @type {Message | undefined}
       */
      this.postMessage = new Message(client, data.suggested_post_message);
    }
  }
}

module.exports = { SuggestedPostDeclined };
