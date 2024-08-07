"use strict";
const { Photo } = require("./Photo");
const { InputFile } = require("../misc/InputFile");
class Audio extends InputFile {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").Audio} data - Data about the represents an audio file to be treated as music by the Telegram clients
     */
    constructor(client, data) {
        super(client, data);
        /** Duration of the audio in seconds as defined by sender */
        this.duration = data.duration;
        /** Performer of the audio as defined by sender or by audio tags  */
        if ("performer" in data) {
            this.performer = data.performer;
        }
        if ("file_name" in data) {
            /** Original filename as defined by sender */
            this.name = data.file_name;
        }
        if ("thumbnail" in data) {
            /** Thumbnail of the album cover to which the music file belongs */
            this.thumbnail = new Photo(client, data.thumbnail);
        }
        if ("mime_type" in data) {
            /** MIME type of the file as defined by sender */
            this.mimeType = data.mime_type;
        }
    }
}
module.exports = { Audio };
//# sourceMappingURL=Audio.js.map