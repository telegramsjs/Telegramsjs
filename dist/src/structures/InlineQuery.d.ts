export class InlineQuery extends Base {
    /**
     * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").InlineQuery} data - Data about the represents an incoming inline query. When the user sends an empty query, your bot could return some default or trending results
     */
    constructor(client: import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient, data: import("@telegram.ts/types").InlineQuery);
    /** Unique identifier for this query */
    id: string;
    /** Sender */
    author: User;
    /** Text of the query (up to 256 characters) */
    query: string;
    /**  Offset of the results to be returned, can be controlled by the bot */
    offset: string;
    /** Type of the chat from which the inline query was sent. Can be either “sender” for a private chat with the inline query sender, “private”, “group”, “supergroup”, or “channel”. The chat type should be always known for requests sent from official clients and most third-party clients, unless the request was sent from a secret chat */
    type: "group" | "channel" | "private" | "supergroup" | "sender" | undefined;
    /** Sender location, only for bots that request user location */
    location: Location | undefined;
}
import { Base } from "./Base";
import { User } from "./misc/User";
import { Location } from "./misc/Location";
//# sourceMappingURL=InlineQuery.d.ts.map