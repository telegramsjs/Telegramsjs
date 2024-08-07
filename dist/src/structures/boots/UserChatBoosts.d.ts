export class UserChatBoosts {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").UserChatBoosts} data - Data about the user chat boosts
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").UserChatBoosts);
    /**
     * The list of boosts added to the chat by the user
     * @type {ChatBoost[]}
     */
    boosts: ChatBoost[];
    /**
     * The boost count added to the chat by the user
     * @type {number}
     */
    count: number;
}
import { ChatBoost } from "./ChatBoost";
//# sourceMappingURL=UserChatBoosts.d.ts.map