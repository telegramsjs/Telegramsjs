const { Base } = require("../Base");

class Location extends Base {
  constructor(client, data) {
    super(client, data);

    this.latitude = data.latitude;

    this.longitude = data.longitude;

    if ("horizontal_accuracy" in data) {
      this.horizontalAccuracy = data.horizontal_accuracy;
    }

    if ("live_period" in data) {
      this.livePeriod = data.live_period;
    }

    if ("heading" in data) {
      this.heading = data.heading;
    }

    if ("proximity_alert_radius" in data) {
      this.proximityAlertRadius = data.proximity_alert_radius;
    }
  }
}

module.exports = { Location };
