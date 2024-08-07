export type MethodParameters = import("../types").MethodParameters;
/**
 * @typedef {import("../types").MethodParameters} MethodParameters
 */
export class ChosenInlineResult extends Base {
    /**
     * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").ChosenInlineResult} data - Data about the Represents a result of an inline query that was chosen by the user and sent to their chat partner
     */
    constructor(client: import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient, data: import("@telegram.ts/types").ChosenInlineResult);
    /** The unique identifier for the result that was chosen */
    id: string;
    /** The user that chose the result */
    author: User;
    /** Sender location, only for bots that require user location */
    location: Location | undefined;
    /** The query that was used to obtain the result */
    query: string;
    /** Identifier of the sent inline message. Available only if there is an inline keyboard attached to the message. Will be also received in callback queries and can be used to edit the message */
    inlineMessageId: string | undefined;
    /**
     * Use this method to send answers to an inline query.
     * @param {readonly import("@telegram.ts/types").InlineQueryResult[]} results - An array of results for the inline query
     * @param {Omit<MethodParameters["answerInlineQuery"], "inlineQueryId" | "results">} [options={}] - out parameters
     * @return {Promise<true>} - On success, True is returned.
     */
    answerQuery(results: readonly import("@telegram.ts/types").InlineQueryResult[], options?: Omit<{
        inlineQueryId: string;
        results: readonly import("../client/interfaces/Inline").InlineQueryResult[];
        cacheTime?: number;
        isPersonal?: boolean;
        nextOffset?: string;
        button?: import("../client/interfaces/Inline").InlineQueryResultsButton;
    }, "results" | "inlineQueryId"> | undefined): Promise<true>;
}
import { Base } from "./Base";
import { User } from "./misc/User";
import { Location } from "./misc/Location";
//# sourceMappingURL=ChosenInlineResult.d.ts.map