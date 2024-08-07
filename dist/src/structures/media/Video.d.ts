export class Video extends InputFile {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").Video} data - Data about the represents a video file
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").Video);
    /** Video width as defined by sender */
    width: number;
    /** Video height as defined by sender */
    height: number;
    /** Duration of the video in seconds as defined by sender */
    duration: number;
    /** Original filename as defined by sender */
    name: string | undefined;
    /** Video thumbnail */
    thumbnail: Photo | undefined;
    /** MIME type of the file as defined by sender */
    mimeType: string | undefined;
}
import { InputFile } from "../misc/InputFile";
import { Photo } from "./Photo";
//# sourceMappingURL=Video.d.ts.map