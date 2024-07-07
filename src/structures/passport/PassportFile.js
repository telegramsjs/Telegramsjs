const { InputFile } = require("../InputFile");

class PassportFile extends InputFile {
  constructor(client, data) {
    super(client, data);

    this.createdTimestamp = data.file_date;
  }

  get createdAt() {
    return new Date(this.createdTimestamp);
  }
}

module.exports = { PassportFile };
