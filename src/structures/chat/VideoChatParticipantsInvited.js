const { Base } = require("../Base");
const { User } = require("../misc/User");

class VideoChatParticipantsInvited extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").VideoChatParticipantsInvited} data - Data about the represents a service message about new members invited to a video chat
   */
  constructor(client, data) {
    super(client);

    /**
     * New members that were invited to the video chat
     * @type {User[]}
     */
    this.users = data.users.map((user) => new User(client, user));
  }
}

module.exports = { VideoChatParticipantsInvited };
