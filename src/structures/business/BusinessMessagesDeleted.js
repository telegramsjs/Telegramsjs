const { Base } = require("../Base");
const { Chat } = require("../chat/Chat");

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
     * @type {import("@telegram.ts/types").Chat.PrivateChat}
      
     */
    this.chat = new Chat(client, data.chat);

    /**
     * The list of identifiers of deleted messages in the chat of the business account
     * @type {number[]}
      
     */
    this.ids = data.message_ids;
  }
}

module.exports = { BusinessMessagesDeleted };
