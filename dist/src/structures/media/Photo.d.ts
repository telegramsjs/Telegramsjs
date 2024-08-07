export class Photo extends InputFile {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").PhotoSize} data - Data about the represents one size of a photo or a file / sticker thumbnail
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").PhotoSize);
    /** Photo width */
    width: number;
    /** Photo height */
    height: number;
}
import { InputFile } from "../misc/InputFile";
//# sourceMappingURL=Photo.d.ts.map