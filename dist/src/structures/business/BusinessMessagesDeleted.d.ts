export class BusinessMessagesDeleted extends Base {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").BusinessMessagesDeleted} data - Data about the received when messages are deleted from a connected business account
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").BusinessMessagesDeleted);
    /**
     * Unique identifier of the business connection
     * @type {string}
     */
    id: string;
    /**
     * Information about a chat in the business account. The bot may not have access to the chat or the corresponding user
     * @type {import("@telegram.ts/types").Chat.PrivateChat}
     */
    chat: import("@telegram.ts/types").Chat.PrivateChat;
    /**
     * The list of identifiers of deleted messages in the chat of the business account
     * @type {number[]}
     */
    ids: number[];
}
import { Base } from "../Base";
//# sourceMappingURL=BusinessMessagesDeleted.d.ts.map