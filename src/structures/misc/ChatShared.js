const { Base } = require("../Base");
const { Photo } = require("../media/Photo");

class ChatShared extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").ChatShared} data - Data about the contains information about a chat that was shared with the bot using a KeyboardButtonRequestChat button
   */
  constructor(client, data) {
    super(client);

    /** Identifier of the shared chat. The bot may not have access to the chat and could be unable to use this identifier, unless the chat is already known to the bot by some other means. */
    this.id = data.chat_id;

    /** Identifier of the request */
    this.requestId = data.request_id;

    if ("title" in data) {
      /** Title of the chat, if the title was requested by the bot. */
      this.title = data.title;
    }

    if ("username" in data) {
      /** Username of the chat, if the username was requested by the bot and available. */
      this.username = data.username;
    }

    if ("photo" in data) {
      /** Available sizes of the chat photo, if the photo was requested by the bot */
      this.photo = data.photo.map((photo) => new Photo(client, photo));
    }
  }
}

module.exports = { ChatShared };
