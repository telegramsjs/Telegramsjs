// @ts-check
const { Forum } = require("./Forum");

class ForumTopic extends Forum {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {string | number} threadId - Unique identifier of the forum topic
   * @param {string | number} chatId - Unique identifier for this chat
   * @param {import("@telegram.ts/types").ForumTopic | import("@telegram.ts/types").ForumTopicEdited} data - Unique identifier for this
   */
  constructor(client, threadId, chatId, data) {
    super(
      client,
      "message_thread_id" in data ? data.message_thread_id : threadId,
      chatId,
    );

    /** Name of the topic */
    this.name = "name" in data ? data.name : null;

    /** Color of the topic icon in RGB format */
    this.iconColor = "icon_color" in data ? data.icon_color : null;

    if ("icon_custom_emoji_id" in data) {
      /** Unique identifier of the custom emoji shown as the topic icon */
      this.iconEmojiId = data.icon_custom_emoji_id;
    }
  }
}

module.exports = { ForumTopic };
