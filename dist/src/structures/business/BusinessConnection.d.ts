export class BusinessConnection extends Base {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").BusinessConnection} data - Data about the connection of the bot with a business account
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").BusinessConnection);
    /**
     * Unique identifier of the business connection
     * @type {string}
     */
    id: string;
    /**
     * Business account user that created the business connection
     * @type {User}
     */
    user: User;
    /**
     * Identifier of a private chat with the user who created the business connection
     * @type {number}
     */
    userChatId: number;
    /**
     * Date the connection was established in Unix time
     * @type {number}
     */
    createdTimestamp: number;
    /**
     * True, if the bot can act on behalf of the business account in chats that were active in the last 24 hours
     * @type {boolean}
     */
    replyed: boolean;
    /**
     * True, if the connection is active
     * @type {boolean}
     */
    enabled: boolean;
    /**
     * Date the connection was established
     * @type {Date}
     */
    get createdAt(): Date;
}
import { Base } from "../Base";
import { User } from "../misc/User";
//# sourceMappingURL=BusinessConnection.d.ts.map