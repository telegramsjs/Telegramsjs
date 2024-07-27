const { Base } = require("../Base");
const { Location } = require("./Location");

class Venue extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").Venue} data - Data about the represents a venue
   */
  constructor(client, data) {
    super(client);

    /** Venue location. Can't be a live location */
    this.location = new Location(client, data.location);

    /** Name of the venue */
    this.title = data.title;

    /** Address of the venue */
    this.address = data.address;

    if ("foursquare_id" in data) {
      /** Foursquare identifier of the venue */
      this.foursquareId = data.foursquare_id;
    }

    if ("foursquare_type" in data) {
      /** Foursquare type of the venue. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.) */
      this.foursquareType = data.foursquare_type;
    }

    if ("google_place_id" in data) {
      /** Google Places identifier of the venue */
      this.googlePlaceId = data.google_place_id;
    }

    if ("google_place_type" in data) {
      /** Google Places type of the venue. (See supported types.) */
      this.googlePlaceType = data.google_place_type;
    }
  }
}

module.exports = { Venue };
