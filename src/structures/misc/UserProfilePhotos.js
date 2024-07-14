const { Base } = require("../Base");
const { Photo } = require("../media/Photo");

class UserProfilePhotos extends Base {
  constructor(client, data) {
    super(client, data);

    this.count = data.total_count;

    this.photos = data.photos.map((photo) =>
      photo.map((photo) => new Photo(client, photo)),
    );
  }
}

module.exports = { UserProfilePhotos };
