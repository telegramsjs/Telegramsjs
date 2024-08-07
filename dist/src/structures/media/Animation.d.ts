export class Animation extends InputFile {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").Animation} data - Data about the represents an animation file (GIF or H.264/MPEG-4 AVC video without sound)
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").Animation);
    /** Video width as defined by sender */
    width: number;
    /** Video height as defined by sender */
    height: number;
    /** Duration of the video in seconds as defined by sender */
    duration: number;
    /** Original animation filename as defined by sender */
    name: string | undefined;
    /** Animation thumbnail as defined by sender */
    thumbnail: Photo | undefined;
    /** MIME type of the file as defined by sender */
    mimeType: string | undefined;
}
import { InputFile } from "../misc/InputFile";
import { Photo } from "./Photo";
//# sourceMappingURL=Animation.d.ts.map