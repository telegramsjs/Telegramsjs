export class Audio extends InputFile {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").Audio} data - Data about the represents an audio file to be treated as music by the Telegram clients
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").Audio);
    /** Duration of the audio in seconds as defined by sender */
    duration: number;
    performer: string | undefined;
    /** Original filename as defined by sender */
    name: string | undefined;
    /** Thumbnail of the album cover to which the music file belongs */
    thumbnail: Photo | undefined;
    /** MIME type of the file as defined by sender */
    mimeType: string | undefined;
}
import { InputFile } from "../misc/InputFile";
import { Photo } from "./Photo";
//# sourceMappingURL=Audio.d.ts.map