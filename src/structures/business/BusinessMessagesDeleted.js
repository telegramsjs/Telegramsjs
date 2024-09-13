// @ts-check
const { Base } = require("../Base");

class BusinessMessagesDeleted extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").BusinessMessagesDeleted} data - Data about the received when messages are deleted from a connected business account
   */
  constructor(client, data) {
    super(client);

    /**
     * Unique identifier of the business connection
     * @type {string}
     */
    this.id = data.business_connection_id;

    /**
     * Information about a chat in the business account. The bot may not have access to the chat or the corresponding user
     * @type {import("../chat/Chat").Chat}
     */
    this.chat = this.client.chats._add(data.chat);

    /**
     * The list of identifiers of deleted messages in the chat of the business account
     * @type {string[]}
     */
    this.ids = data.message_ids.map((id) => String(id));
  }
}

module.exports = { BusinessMessagesDeleted };
