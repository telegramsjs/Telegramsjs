// @ts-check
const { Base } = require("../Base");

class Location extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").Location} data - Data about the represents a point on the map
   */
  constructor(client, data) {
    super(client);

    /** Latitude as defined by sender */
    this.latitude = data.latitude;

    /** Longitude as defined by sender */
    this.longitude = data.longitude;

    if ("horizontal_accuracy" in data) {
      /** The radius of uncertainty for the location, measured in meters; 0-1500 */
      this.horizontalAccuracy = data.horizontal_accuracy;
    }

    if ("live_period" in data) {
      /** Time relative to the message sending date, during which the location can be updated; in seconds. For active live locations only */
      this.livePeriod = data.live_period;
    }

    if ("heading" in data) {
      /** The direction in which user is moving, in degrees; 1-360. For active live locations only */
      this.heading = data.heading;
    }

    if ("proximity_alert_radius" in data) {
      /** The maximum distance for proximity alerts about approaching another chat member, in meters. For sent live locations only */
      this.proximityAlertRadius = data.proximity_alert_radius;
    }
  }
}

module.exports = { Location };
