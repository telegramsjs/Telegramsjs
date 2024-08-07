export class PassportFile extends InputFile {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").PassportFile} data - Data about the represents a file uploaded to Telegram Passport. Currently, all Telegram Passport files are in JPEG format when decrypted and do not exceed 10MB
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").PassportFile);
    /** Unix time when the file was uploaded */
    createdTimestamp: number;
    /**
     * Date when the file was uploaded
     * @type {Date}
     */
    get createdAt(): Date;
}
import { InputFile } from "../misc/InputFile";
//# sourceMappingURL=PassportFile.d.ts.map