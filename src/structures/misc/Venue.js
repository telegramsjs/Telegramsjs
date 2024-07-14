const { Base } = require("../Base");
const { Location } = require("./Location");

class Venue extends Base {
  constructor(client, data) {
    super(client, data);

    this.location = new Location(client, data.location);

    this.title = data.title;

    this.address = data.address;

    this.foursquareId = data.foursquare_id;

    this.foursquareType = data.foursquare_type;

    this.googlePlaceId = data.google_place_id;

    this.googlePlaceType = data.google_place_type;
  }
}

module.exports = { Venue };
