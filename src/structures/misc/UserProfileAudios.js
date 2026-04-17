// @ts-check
const { Base } = require("../Base");
const { Audio } = require("../media/Audio");
const { Collection } = require("@telegram.ts/collection");

class UserProfileAudios extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").UserProfileAudios} data - Data about the audios displayed on a user's profile
   */
  constructor(client, data) {
    super(client);

    /** Total number of profile audios for the target user */
    this.count = data.total_count;

    /** Requested profile audios */
    this.audios = new Collection(
      data.audios.map((audio) => [audio.file_id, new Audio(client, audio)]),
    );
  }

  /**
   * Makes the class iterable, returning each `Audio` object.
   * @returns {IterableIterator<Audio>}
   */
  *[Symbol.iterator]() {
    yield* this.audios.values();
  }
}

module.exports = { UserProfileAudios };
