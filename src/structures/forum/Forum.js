const { Base } = require("../Base");

class Forum extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {number | string} threadId - Unique identifier of the forum topic
   * @param {number | string} chatId - Unique identifier for this chat
   */
  constructor(client, threadId, chatId) {
    super(client);

    /** Unique identifier of the forum topic */
    this.threadId = String(threadId);

    /** Unique identifier for this chat */
    this.chatId = String(chatId);
  }

  /**
   * Use this method to edit name and icon of a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have can_manage_topics administrator rights, unless it is the creator of the topic.
   * @param {string} [name] - New topic name, 0-128 characters. If not specified or empty, the current name of the topic will be kept
   * @param {string} [customEmojiId] - New unique identifier of the custom emoji shown as the topic icon. Use getForumTopicIconStickers to get all allowed custom emoji identifiers. Pass an empty string to remove the icon. If not specified, the current icon will be kept
   * @return {Promise<true>} - Returns True on success.
   */
  edit(name, customEmojiId) {
    return this.client.editForumTopic({
      chatId: this.chatId,
      messageThreadId: this.threadId,
      name,
      iconCustomEmojiId: customEmojiId,
    });
  }

  /**
   * Use this method to close an open topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic.
   * @return {Promise<true>} - Returns True on success.
   */
  close() {
    return this.client.closeForumTopic(this.chatId, this.threadId);
  }

  /**
   * Use this method to reopen a closed topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic.
   * @return {Promise<true>} - Returns True on success.
   */
  reopen() {
    return this.client.reopenForumTopic(this.chatId, this.threadId);
  }

  /**
   * Use this method to delete a forum topic along with all its messages in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_delete_messages administrator rights.
   * @return {Promise<true>} - Returns True on success.
   */
  delete() {
    return this.client.deleteForumTopic(this.chatId, this.threadId);
  }

  /**
   * Use this method to clear the list of pinned messages in a forum topic. The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup.
   * @return {Promise<true>} - Returns True on success.
   */
  unpinAllMessages() {
    return this.client.unpinAllForumTopicMessages(this.chatId, this.threadId);
  }
}

module.exports = { Forum };
