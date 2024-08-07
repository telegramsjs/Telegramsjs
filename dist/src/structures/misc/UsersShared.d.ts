export class UsersShared {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").UsersShared} data - Data about the contains information about the user whose identifier was shared with the bot using a KeyboardButtonRequestUsers button
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").UsersShared);
    /** Identifier of the request */
    requestId: number;
    /** Information about users shared with the bot. */
    users: SharedUser[];
}
import { SharedUser } from "./SharedUser";
//# sourceMappingURL=UsersShared.d.ts.map