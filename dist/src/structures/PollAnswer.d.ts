export class PollAnswer extends Base {
    /**
     * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").PollAnswer} data - Data about the represents an answer of a user in a non-anonymous poll
     */
    constructor(client: import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient, data: import("@telegram.ts/types").PollAnswer);
    /** Unique poll identifier */
    id: string;
    /** The chat that changed the answer to the poll, if the voter is anonymous */
    voterChat: Chat | undefined;
    /** The user that changed the answer to the poll, if the voter isn't anonymous */
    user: User | undefined;
    /** 0-based identifiers of chosen answer options. May be empty if the vote was retracted */
    ids: number[];
}
import { Base } from "./Base";
import { Chat } from "./chat/Chat";
import { User } from "./misc/User";
//# sourceMappingURL=PollAnswer.d.ts.map