export class Document extends InputFile {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").Document} data - Data about the represents a general file (as opposed to photos, voice messages and audio files)
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").Document);
    /** Original filename as defined by sender */
    name: string | undefined;
    /** Document thumbnail as defined by sender */
    thumbnail: Photo | undefined;
    /** MIME type of the file as defined by sender */
    mimeType: string | undefined;
}
import { InputFile } from "../misc/InputFile";
import { Photo } from "./Photo";
//# sourceMappingURL=Document.d.ts.map