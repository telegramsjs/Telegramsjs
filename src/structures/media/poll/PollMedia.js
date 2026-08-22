// @ts-check
const { Base } = require("../../Base");
const { Animation } = require("../Animation");
const { Audio } = require("../Audio");
const { Document } = require("../Document");
const { LivePhoto } = require("../LivePhoto");
const { Location } = require("../../misc/Location");
const { Photo } = require("../Photo");
const { Sticker } = require("../Sticker");
const { Venue } = require("../../misc/Venue");
const { Video } = require("../video/Video");

class PollMedia extends Base {
  /**
   * @param {import("../../../client/TelegramClient").TelegramClient | import("../../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").PollMedia} data - Data about the contains information about a optional fields can be present in any given object
   */
  constructor(client, data) {
    super(client);

    if (data.animation) {
      /** Media is an animation, information about the animation */
      this.animation = new Animation(client, data.animation);
    }

    if (data.audio) {
      /** Media is an audio file, information about the file; currently, can't be received in a poll option */
      this.audio = new Audio(client, data.audio);
    }

    if (data.document) {
      /** Media is a general file, information about the file; currently, can't be received in a poll option */
      this.document = new Document(client, data.document);
    }

    if (data.live_photo) {
      /** Media is a live photo, information about the live photo */
      this.livePhoto = new LivePhoto(client, data.live_photo);
    }

    if (data.location) {
      /** Media is a shared location, information about the location */
      this.location = new Location(client, data.location);
    }

    if (data.photo) {
      /** Media is a photo, available sizes of the photo */
      this.photo = data.photo.map((photo) => new Photo(client, photo));
    }

    if (data.sticker) {
      /** Media is a sticker, information about the sticker; currently, for poll options only */
      this.sticker = new Sticker(client, data.sticker);
    }

    if (data.venue) {
      /** Media is a venue, information about the venue */
      this.venue = new Venue(client, data.venue);
    }

    if (data.video) {
      /** Media is a video, information about the video */
      this.video = new Video(client, data.video);
    }
  }
}

module.exports = { PollMedia };
