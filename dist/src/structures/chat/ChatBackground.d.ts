export class ChatBackground {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").ChatBackground} data - Data about the represents a chat background
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").ChatBackground);
    /** Type of the background*/
    type: BackgroundType;
}
import { BackgroundType } from "./BackgroundType";
//# sourceMappingURL=ChatBackground.d.ts.map