export class MessageReactionCountUpdated extends Base {
    /**
     * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").MessageReactionCountUpdated} data - Data about the represents reaction changes on a message with anonymous reactions
     */
    constructor(client: import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient, data: import("@telegram.ts/types").MessageReactionCountUpdated);
    /** Unique message identifier inside the chat */
    id: number;
    /** The chat containing the message */
    chat: Chat;
    /** List of reactions that are present on the message */
    reactions: ReactionCount[];
    /** Date of the change in Unix time */
    createdTimestamp: number;
    /**
     * Date of the change
     * @type {Date}
     */
    get createdAt(): Date;
}
import { Base } from "./Base";
import { Chat } from "./chat/Chat";
declare class ReactionCount {
    /**
     * @param {import("@telegram.ts/types").ReactionCount} data - Data about the eepresents a reaction added to a message along with the number of times it was added
     */
    constructor(data: import("@telegram.ts/types").ReactionCount);
    /** Number of times the reaction was added */
    totalCount: number;
    /** Type of the reaction */
    type: ReactionType;
}
import { ReactionType } from "./misc/ReactionType";
export {};
//# sourceMappingURL=MessageReactionCountUpdated.d.ts.map