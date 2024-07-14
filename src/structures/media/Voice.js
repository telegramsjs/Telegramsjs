const { InputFile } = require("../misc/InputFile");

class Voice extends InputFile {
  constructor(client, data) {
    super(client, data);

    this.duration = data.duration || null;

    this.mimeType = data.mime_type || null;
  }
}

module.exports = { Voice };
