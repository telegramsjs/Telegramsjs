const fs = require("node:fs");
const fetch = require("node-fetch");
const { Base } = require("../Base");
const { TelegramError } = require("../../errors/TelegramError");

class InputFile extends Base {
  constructor(client, data) {
    super(client, data);

    this.id = data.file_id;
    this.uniqueId = data.file_unique_id;

    this.size = data.size || null;
    this.path = data.file_path || null;
  }

  get url() {
    return (this.url = this.path
      ? `https://api.telegram.org/file/bot${this.client.authToken}/${this.path}`
      : null);
  }

  async download(filePath = this.path) {
    if (!this.path) {
      throw new TelegramError("getFile did not return <file_path>");
    }

    const fileUrl = `https://api.telegram.org/file/bot${this.client.authToken}/${filePath}`;

    try {
      const response = await fetch(fileUrl);
      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);
    } catch (err) {
      throw new TelegramError(`Failed to download file: ${err}`);
    }
  }

  async write(path, writeType = "promise", options = {}) {
    if (!this.path) {
      throw new TelegramError("getFile did not return <file_path>");
    }

    if (writeType === "promise") {
      const fileData = await this.download(this.path);
      await fs.promises.writeFile(path, fileData, options);
      return;
    }

    if (writeType === "stream") {
      const fileData = await this.download(this.path);
      const writeStream = fs.createWriteStream(path, options);
      writeStream.write(fileData);
      writeStream.end();
      return;
    }

    throw new TelegramError(
      "The specified incorrect file write type is available: stream | promise",
    );
  }
}

module.exports = { InputFile };
