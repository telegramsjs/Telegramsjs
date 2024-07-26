const { Base } = require("../Base");
const { Photo } = require("../media/Photo");

class SharedUser extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").SharedUser} data - Data about the contains information about a user that was shared with the bot using a KeyboardButtonRequestUser button
   */
  constructor(client, data) {
    super(client);

    /** Identifier of the shared user. The bot may not have access to the user and could be unable to use this identifier, unless the user is already known to the bot by some other means. */
    this.userId = data.user_id;

    this._patch(data);
  }

  _patch(data) {
    if ("first_name" in data) {
      /**
       * First name of the user, if the name was requested by the bot
       * @type {string | undefined}
       */
      this.firstName = data.first_name;
    }

    if ("last_name" in data) {
      /**
       * Last name of the user, if the name was requested by the bot
       * @type {string | undefined}
       */
      this.lastName = data.last_name;
    }

    if ("username" in data) {
      /**
       * Username of the user, if the username was requested by the bot
       * @type {string | undefined}
       */
      this.username = data.username;
    }

    if ("photo" in data) {
      /**
       * Available sizes of the chat photo, if the photo was requested by the bot
       * @type {Photo[] | undefined}
       */
      this.photo = data.photo.map((photo) => new Photo(this.client, photo));
    }

    return data;
  }

  /**
   * Use this method to get a list of profile pictures for a user.
   * @param {number} [offset=0] - Sequential number of the first photo to be returned. By default, all photos are returned
   * @param {number} [limit=100] - Limits the number of photos to be retrieved. Values between 1-100 are accepted. Defaults to 100
   * @return {Promise<import("./UserProfilePhotos").UserProfilePhotos>} - Returns a UserProfilePhotos object.
   */
  getProfilePhotos(offset = 0, limit = 100) {
    return this.client.getUserProfilePhotos({
      userId: this.userId,
      limit,
      offset,
    });
  }
}

module.exports = { SharedUser };
