export class Poll extends Base {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").Poll} data - Data about the contains information about a poll
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").Poll);
    /** Unique poll identifier */
    id: string;
    /** Poll question, 1-300 characters */
    question: string;
    /** Total number of users that voted in the poll */
    totalVoterCount: number;
    /** True, if the poll is closed */
    closed: boolean;
    /** True, if the poll is anonymous */
    anonymous: boolean;
    /** Poll type, currently can be “regular” or “quiz” */
    type: "quiz" | "regular";
    /** True, if the poll allows multiple answers */
    allowAnswers: boolean;
    _patch(data: any): any;
    /**
     * Special entities that appear in the question. Currently, only custom emoji entities are allowed in poll questions
     * @type {MessageEntities | undefined}
     */
    questionEntities: MessageEntities | undefined;
    /**
     * @typedef {Object} PollOptions
     * @property {string} text - Option text, 1-100 characters
     * @property {MessageEntities} entities - Special entities that appear in the option text. Currently, only custom emoji entities are allowed in poll option texts
     * @property {number} voterCount - Number of users that voted for this option
     */
    /**
     * List of poll options
     * @type {PollOptions | undefined}
     */
    options: {
        /**
         * - Option text, 1-100 characters
         */
        text: string;
        /**
         * - Special entities that appear in the option text. Currently, only custom emoji entities are allowed in poll option texts
         */
        entities: MessageEntities;
        /**
         * - Number of users that voted for this option
         */
        voterCount: number;
    } | undefined;
    /**
     * 0-based identifier of the correct answer option. Available only for polls in the quiz mode, which are closed, or was sent (not forwarded) by the bot or to the private chat with the bot
     * @type {number | undefined}
     */
    correctId: number | undefined;
    /**
     * Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll, 0-200 characters
     * @type {string | undefined}
     */
    explanation: string | undefined;
    /**
     * Special entities like usernames, URLs, bot commands, etc. that appear in the explanation
     * @type {MessageEntities | undefined}
     */
    explanationEntities: MessageEntities | undefined;
    /**
     * Amount of time in seconds the poll will be active after creation
     * @type {number | undefined}
     */
    openPeriod: number | undefined;
    /**
     * Point in time (Unix timestamp) when the poll will be automatically closed
     * @type {number | undefined}
     */
    closeTimestamp: number | undefined;
    /**
     * Point in time when the poll will be automatically closed
     * @type {Date}
     */
    get closedAt(): Date;
}
import { Base } from "../Base";
import { MessageEntities } from "../message/MessageEntities";
//# sourceMappingURL=Poll.d.ts.map