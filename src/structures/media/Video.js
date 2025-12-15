// @ts-check
const { Photo } = require("./Photo");
const { InputFile } = require("../misc/InputFile");

class Video extends InputFile {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").Video} data - Data about the represents a video file
   */
  constructor(client, data) {
    super(client, data);

    /** Video width as defined by sender */
    this.width = data.width;

    /** Video height as defined by sender */
    this.height = data.height;

    /** Duration of the video in seconds as defined by sender */
    this.duration = data.duration;

    if ("cover" in data) {
      /** Available sizes of the cover of the video in the message */
      this.cover = data.cover.map((cover) => new Photo(client, cover));
    }

    if ("start_timestamp" in data) {
      /** Timestamp in seconds from which the video will play in the message */
      this.startedTimestamp = data.start_timestamp;
    }

    if ("file_name" in data) {
      /** Original filename as defined by sender */
      this.name = data.file_name;
    }

    if ("thumbnail" in data) {
      /** Video thumbnail */
      this.thumbnail = new Photo(client, data.thumbnail);
    }

    if ("mime_type" in data) {
      /** MIME type of the file as defined by sender */
      this.mimeType = data.mime_type;
    }
  }

  /**
   * Date the video was sent. Timestamp in seconds from which the video will play in the message
   */
  get createdAt() {
    return this.startedTimestamp ? new Date(this.startedTimestamp) : null;
  }
}

module.exports = { Video };
