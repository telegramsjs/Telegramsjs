export class ChatShared extends Chat {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").ChatShared} data - Data about the contains information about a chat that was shared with the bot using a KeyboardButtonRequestChat button
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").ChatShared);
    /** Identifier of the request */
    requestId: number;
    /** Available sizes of the chat photo, if the photo was requested by the bot */
    photo: Photo[];
}
import { Chat } from "../chat/Chat";
import { Photo } from "../media/Photo";
//# sourceMappingURL=ChatShared.d.ts.map