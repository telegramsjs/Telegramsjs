const { Forum } = require("./Forum");

class ForumTopic extends Forum {
  constructor(client, threadId, chatId, data) {
    super(client, data.message_thread_id || threadId, chatId, data);

    this.name = data.name || null;

    this.iconColor = data.icon_color || null;

    if ("icon_custom_emoji_id" in data) {
      this.iconEmojiId = data.icon_custom_emoji_id;
    }
  }
}

module.exports = { ForumTopic };
