// @ts-check
const { Base } = require("../Base");

/**
 * @typedef {import("../../types").MethodParameters} MethodParameters
 */

class Story extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").Story} data - Data about the represents a story
   */
  constructor(client, data) {
    super(client);

    /** Unique identifier for the story in the chat */
    this.id = data.id;

    /**
     * Chat that posted the story
     * @type {import("../chat/Chat").Chat}
     */
    this.chat = this.client.chats._add(data.chat);
  }

  /**
   * Edits a story previously posted by the bot on behalf of a managed business account. Requires the can_manage_stories business bot right.
   * @param {import("@telegram.ts/types").InputStoryContent} content - Content of the story.
   * @param {string} businessConnectionId - Unique identifier of the business connection.
   * @param {Omit<MethodParameters["editStory"], "businessConnectionId" | "storyId" | "content">} [options={}] - out parameters.
   * @returns {Promise<Story>} - Returns Story on success.
   */
  edit(content, businessConnectionId, options = {}) {
    return this.client.editStory({
      ...options,
      content,
      businessConnectionId,
      storyId: this.id,
    });
  }

  /**
   * Deletes a story previously posted by the bot on behalf of a managed business account. Requires the can_manage_stories business bot right.
   * @param {string} businessConnectionId - Unique identifier of the business connection.
   * @returns {Promise<true>} - Returns True on success.
   */
  delete(businessConnectionId) {
    return this.client.deleteStory(businessConnectionId, this.id);
  }
}

module.exports = { Story };
