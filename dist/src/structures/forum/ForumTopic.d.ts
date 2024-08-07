export class ForumTopic extends Forum {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {number} threadId - Unique identifier of the forum topic
     * @param {string | number} chatId - Unique identifier for this chat
     * @param {import("@telegram.ts/types").ForumTopic | import("@telegram.ts/types").ForumTopicEdited} data - Unique identifier for this
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, threadId: number, chatId: string | number, data: import("@telegram.ts/types").ForumTopic | import("@telegram.ts/types").ForumTopicEdited);
    /** Name of the topic */
    name: string | null;
    /** Color of the topic icon in RGB format */
    iconColor: any;
    /** Unique identifier of the custom emoji shown as the topic icon */
    iconEmojiId: string | undefined;
}
import { Forum } from "./Forum";
//# sourceMappingURL=ForumTopic.d.ts.map