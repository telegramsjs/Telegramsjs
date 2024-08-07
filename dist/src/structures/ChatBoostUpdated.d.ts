export class ChatBoostUpdated extends Base {
    /**
     * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").ChatBoostUpdated} data - Data about the represents a boost added to a chat or changed
     */
    constructor(client: import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient, data: import("@telegram.ts/types").ChatBoostUpdated);
    /** Chat which was boosted  */
    chat: Chat;
    /** Information about the chat boost */
    boost: ChatBoost;
}
import { Base } from "./Base";
import { Chat } from "./chat/Chat";
import { ChatBoost } from "./boots/ChatBoost";
//# sourceMappingURL=ChatBoostUpdated.d.ts.map