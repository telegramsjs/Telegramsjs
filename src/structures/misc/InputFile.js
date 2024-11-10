// @ts-check
const fs = require("node:fs");
const fetch = require("node-fetch");
const { Base } = require("../Base");
const { TelegramError } = require("../../errors/TelegramError");
const { ErrorCodes } = require("../../errors/ErrorCodes");

class InputFile extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").File} data - Data about the file object from the Telegram API
   */
  constructor(client, data) {
    super(client);

    /**
     * The unique identifier for this file
     * @type {string}
     */
    this.id = data.file_id;

    /**
     * The unique identifier for this file, which is supposed to be consistent across different bots
     * @type {string}
     */
    this.uniqueId = data.file_unique_id;

    /**
     * The size of the file in bytes, if available
     * @type {number | null}
     */
    this.size = data.file_size || null;

    /**
     * The path to the file on the Telegram server, if available
     * @type {string | null}
     */
    this.path = data.file_path || null;
  }

  /**
   * Gets the URL to access the file on the Telegram server.
   * @returns {string | null}
   */
  get url() {
    return this.path
      ? `https://api.telegram.org/file/bot${this.client.authToken}/${this.path}`
      : null;
  }

  /**
   * Downloads the file from the Telegram server.
   * @param {string | null} [filePath=this.path] - The path of the file on the Telegram server.
   * @returns {Promise<Buffer>} - A promise that resolves with the file data as a Buffer.
   */
  async download(filePath = this.path) {
    if (!filePath) {
      throw new TelegramError(ErrorCodes.FileRetrievalFailed);
    }

    const fileUrl = `https://api.telegram.org/file/bot${this.client.authToken}/${filePath}`;

    try {
      const response = await fetch(fileUrl);
      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);
    } catch (err) {
      throw new TelegramError(ErrorCodes.FileDownloadFailed, {
        err: String(err),
      });
    }
  }

  /**
   * @typedef {Object} PromiseOptions
   * @property {BufferEncoding | undefined} [encoding] - The encoding to use.
   * @property {string} [flag] - File system flag.
   * @property {AbortSignal} [signal] - An AbortSignal to abort the operation.
   */

  /**
   * @typedef {Object} StreamOptions
   * @property {BufferEncoding | undefined} [encoding] - The encoding to use.
   * @property {boolean} [autoClose] - Automatically close the stream when the file is finished.
   * @property {boolean} [emitClose] - Emit a 'close' event when the stream is closed.
   * @property {number} [start] - The position to start reading data from the file.
   * @property {number} [highWaterMark] - The maximum number of bytes to store in the internal buffer.
   * @property {boolean} [flush] - Control whether the stream should flush data to disk.
   */

  /**
   * Writes the file to the specified path.
   * @param {string} path - The path where the file should be written.
   * @param {"promise"|"stream"} writeType - The type of write operation.
   * @param {PromiseOptions|StreamOptions} [options] - Additional options for writing the file.
   * @returns {Promise<void>} A promise that resolves when the file has been written.
   */
  async write(path, writeType = "promise", options = {}) {
    if (!this.path) {
      throw new TelegramError(ErrorCodes.FileRetrievalFailed);
    }

    if (writeType === "promise") {
      const fileData = await this.download(this.path);
      await fs.promises.writeFile(path, fileData, options);
      return;
    }

    if (writeType === "stream") {
      const fileData = await this.download(this.path);
      const writeStream = fs.createWriteStream(path, {
        ...options,
        encoding: options.encoding ?? undefined,
      });
      writeStream.write(fileData);
      writeStream.end();
      return;
    }

    throw new TelegramError(ErrorCodes.FileWriteInvalidType);
  }
}

module.exports = { InputFile };
