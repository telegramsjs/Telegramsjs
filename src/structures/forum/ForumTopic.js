const { Forum } = require("./Forum");

class ForumTopic extends Forum {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {number} threadId - Unique identifier of the forum topic
   * @param {number} chatId - Unique identifier for this chat
   * @param {import("@telegram.ts/types").ForumTopic | import("@telegram.ts/types").ForumTopicEdited} data - Unique identifier for this
   */
  constructor(client, threadId, chatId, data) {
    super(client, data.message_thread_id || threadId, chatId, data);

    /** Name of the topic */
    this.name = data.name || null;

    /** Color of the topic icon in RGB format */
    this.iconColor = data.icon_color || null;

    if ("icon_custom_emoji_id" in data) {
      /** Unique identifier of the custom emoji shown as the topic icon */
      this.iconEmojiId = data.icon_custom_emoji_id;
    }
  }
}

module.exports = { ForumTopic };
