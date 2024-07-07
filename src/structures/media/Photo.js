const { InputFile } = require("../InputFile");

class Photo extends InputFile {
  constructor(client, data) {
    super(client, data);

    this.width = data.width;

    this.height = data.height;
  }
}

module.exports = { Photo };
