class ForumTopic {
  constructor(data) {
    this.id = data.message_thread_id;

    this.name = data.name;

    this.iconColor = data.icon_color;

    if ("icon_custom_emoji_id" in data) {
      this.iconEmojiId = data.icon_custom_emoji_id;
    }
  }
}

module.exports = { ForumTopic };
