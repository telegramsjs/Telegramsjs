const { Photo } = require("./Photo");
const { InputFile } = require("../misc/InputFile");

class VideoNote extends InputFile {
  constructor(client, data) {
    super(client, data);

    this.length = data.length;

    this.duration = data.duration;

    if ("thumbnail" in data) {
      this.thumbnail = new Photo(client, data.thumbnail);
    }
  }
}

module.exports = { VideoNote };
