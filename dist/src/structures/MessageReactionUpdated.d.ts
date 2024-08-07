export class MessageReactionUpdated extends Base {
    /**
     * Retrieves information about reactions to a message.
     * @param {MessageReactionUpdated} messageReaction - The message reaction object.
     * @returns Information about the reactions.
     */
    static reactions(messageReaction: MessageReactionUpdated): {
        emoji: any;
        emojiAdded: any;
        emojiKept: any;
        emojiRemoved: any;
        customEmoji: any;
        customEmojiAdded: any;
        customEmojiKept: any;
        customEmojiRemoved: any;
    };
    /**
     * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").MessageReactionUpdated} data - Data about the represents a change of a reaction on a message performed by a user
     */
    constructor(client: import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient, data: import("@telegram.ts/types").MessageReactionUpdated);
    /** Unique identifier of the message inside the chat */
    id: number;
    /** The chat containing the message the user reacted to */
    chat: Chat;
    /** The user that changed the reaction, if the user isn't anonymous */
    user: User | undefined;
    /** The chat on behalf of which the reaction was changed, if the user is anonymous */
    actorChat: Chat | undefined;
    /** Date of the change in Unix time */
    createdTimestamp: number;
    /** Previous list of reaction types that were set by the user */
    added: ReactionType[];
    /** New list of reaction types that have been set by the user */
    removed: ReactionType[];
    /**
     * Date of the change
     * @type {Date}
     */
    get createdAt(): Date;
}
import { Base } from "./Base";
import { Chat } from "./chat/Chat";
import { User } from "./misc/User";
import { ReactionType } from "./misc/ReactionType";
//# sourceMappingURL=MessageReactionUpdated.d.ts.map