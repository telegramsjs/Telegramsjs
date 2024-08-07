"use strict";
const { Photo } = require("./Photo");
const { InputFile } = require("../misc/InputFile");
class Animation extends InputFile {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").Animation} data - Data about the represents an animation file (GIF or H.264/MPEG-4 AVC video without sound)
     */
    constructor(client, data) {
        super(client, data);
        /** Video width as defined by sender */
        this.width = data.width;
        /** Video height as defined by sender */
        this.height = data.height;
        /** Duration of the video in seconds as defined by sender */
        this.duration = data.duration;
        if ("file_name" in data) {
            /** Original animation filename as defined by sender */
            this.name = data.file_name;
        }
        if ("thumbnail" in data) {
            /** Animation thumbnail as defined by sender */
            this.thumbnail = new Photo(client, data.thumbnail);
        }
        if ("mime_type" in data) {
            /** MIME type of the file as defined by sender */
            this.mimeType = data.mime_type;
        }
    }
}
module.exports = { Animation };
//# sourceMappingURL=Animation.js.map