// @ts-check
const { Base } = require("../Base");
const { Collection } = require("@telegram.ts/collection");

class VideoChatParticipantsInvited extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").VideoChatParticipantsInvited} data - Data about the represents a service message about new members invited to a video chat
   */
  constructor(client, data) {
    super(client);

    /**
     * New members that were invited to the video chat
     * @type {Collection<string, import("../misc/User").User>}
     */
    this.users = new Collection(
      data.users.map((user) => [String(user.id), this.client.users._add(user)]),
    );
  }

  /**
   * Makes the class iterable, returning each `User` object.
   * @returns {IterableIterator<import("../misc/User").User>}
   */
  *[Symbol.iterator]() {
    yield* this.users.values();
  }
}

module.exports = { VideoChatParticipantsInvited };
