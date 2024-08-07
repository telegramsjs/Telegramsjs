export class Voice extends InputFile {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").Voice} data - Data about the represents a voice note
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").Voice);
    /** Duration of the audio in seconds as defined by sender */
    duration: number;
    /** MIME type of the file as defined by sender */
    mimeType: string | undefined;
}
import { InputFile } from "../misc/InputFile";
//# sourceMappingURL=Voice.d.ts.map