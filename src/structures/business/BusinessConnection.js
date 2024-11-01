// @ts-check
const { Base } = require("../Base");

/**
 * @typedef {import("../../types").MethodParameters} MethodParameters
 */

class BusinessConnection extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").BusinessConnection} data - Data about the connection of the bot with a business account
   */
  constructor(client, data) {
    super(client);

    /**
     * Unique identifier of the business connection
     * @type {string}
     */
    this.id = data.id;

    /**
     * Business account user that created the business connection
     * @type {import("../misc/User").User}
     */
    this.user = this.client.users._add(data.user);

    /**
     * Identifier of a private chat with the user who created the business connection
     * @type {string}
     */
    this.userChatId = String(data.user_chat_id);

    /**
     * Date the connection was established in Unix time
     * @type {number}
     */
    this.createdUnixTime = data.date;

    /**
     * True, if the bot can act on behalf of the business account in chats that were active in the last 24 hours
     * @type {boolean}
     */
    this.replyed = data.can_reply;

    /**
     * True, if the connection is active
     * @type {boolean}
     */
    this.enabled = data.is_enabled;
  }

  /**
   * Return the timestamp connection was established, in milliseconds
   */
  get createdTimestamp() {
    return this.createdUnixTime * 1000;
  }

  /**
   * Date the connection was established
   * @type {Date}
   */
  get createdAt() {
    return new Date(this.createdTimestamp);
  }

  /**
   * Use this method to send text messages.
   * @param {string | Omit<MethodParameters["sendMediaGroup"], "chatId">} text - Text of the message to be sent, 1-4096 characters after entities parsing
   * @param {Omit<MethodParameters["sendMessage"], "text" | "chatId">} [options={}] - out parameters
   * @returns {Promise<import("../message/Message").Message & { content: string } | Array<import("../message/Message").Message & { audio: import("../media/Audio").Audio; } | import("../message/Message").Message & { document: import("../media/Document").Document; } | import("../message/Message").Message & { photo: import("../media/Photo").Photo; } | import("../message/Message").Message & { video: import("../media/Video").Video}>>} - On success, the sent Message is returned.
   */
  send(text, options = {}) {
    if (typeof text === "object") {
      return this.client.sendMediaGroup({
        chatId: this.userChatId,
        ...text,
      });
    }
    return this.client.sendMessage({
      text,
      chatId: this.userChatId,
      ...options,
    });
  }
}

module.exports = { BusinessConnection };
