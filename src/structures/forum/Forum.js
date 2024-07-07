const { Base } = require("../Base");

class Forum extends Base {
  constructor(client, threadId, chatId, data) {
    super(client, data);

    this.threadId = threadId || null;

    this.chatId = chatId || null;
  }

  edit(name, customEmojiId) {
    return this.client.editForumTopic({
      chat_id: this.chatId,
      message_thread_id: this.threadId,
      name,
      icon_custom_emoji_id: customEmojiId,
    });
  }

  close() {
    return this.client.closeForumTopic(this.chatId, this.threadId);
  }

  reopen() {
    return this.client.reopenForumTopic(this.chatId, this.threadId);
  }

  delete() {
    return this.client.deleteForumTopic(this.chatId, this.threadId);
  }

  unpinAllMessages() {
    return this.client.unpinAllForumTopicMessages(this.chatId, this.threadId);
  }
}

module.exports = { Forum };
