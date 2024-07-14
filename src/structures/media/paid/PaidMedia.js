const { Base } = require("../../Base");
const { Photo } = require("../Photo");
const { Video } = require("../Video");

class PaidMedia extends Base {
  constructor(client, data) {
    super(client, data);

    this._patch(data);
  }

  _patch(data) {
    if ("width" in data) {
      this.width = data.width;
    }

    if ("height" in data) {
      this.height = data.height;
    }

    if ("duration" in data) {
      this.duration = data.duration;
    }

    if ("photo" in data) {
      this.photo = data.photo.map((photo) => new Photo(this.client, photo));
    }

    if ("video" in data) {
      this.video = new Video(this.client, data.video);
    }
  }

  isPreview() {
    return !this.isPhoto() && !this.isVideo();
  }

  isPhoto() {
    return "photo" in this && this.photo;
  }

  isVideo() {
    return "video" in this && this.video;
  }
}

module.exports = { PaidMedia };
