const { Photo } = require("./Photo");
const { InputFile } = require("../misc/InputFile");

class Video extends InputFile {
  constructor(client, data) {
    super(client, data);

    this.width = data.width;

    this.height = data.height;

    this.duration = data.duration;

    if ("file_name" in data) {
      this.name = data.file_name;
    }

    if ("thumbnail" in data) {
      this.thumbnail = new Photo(client, data.thumbnail);
    }

    if ("mime_type" in data) {
      this.mimeType = data.mime_type;
    }
  }
}

module.exports = { Video };
