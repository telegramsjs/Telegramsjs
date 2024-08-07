export class Story extends Chat {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").Story} data - Data about the represents a story
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").Story);
    /** Chat that posted the story */
    chat: Chat;
}
import { Chat } from "../chat/Chat";
//# sourceMappingURL=Story.d.ts.map