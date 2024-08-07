export class GiveawayWinners extends Base {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").GiveawayWinners} data - Data about the represents a message about the completion of a giveaway with public winners
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").GiveawayWinners);
    /** The chat that created the giveaway */
    chat: Chat;
    /** Identifier of the messsage with the giveaway in the chat */
    messageId: number;
    /** Point in time (Unix timestamp) when winners of the giveaway were selected */
    selectionTimestamp: number;
    /** Total number of winners in the giveaway */
    count: number;
    /** List of up to 100 winners of the giveaway */
    winners: User[];
    _patch(data: any): any;
    /**
     * The number of other chats the user had to join in order to be eligible for the giveaway
     * @type {number | undefined}
     */
    addChatCount: number | undefined;
    /**
     * The number of months the Telegram Premium subscription won from the giveaway will be active for
     * @type {number | undefined}
     */
    subscriptionMonthCount: number | undefined;
    /**
     * Number of undistributed prizes
     * @type {number | undefined}
     */
    unclaimedPrizeCount: number | undefined;
    /**
     * True, if only users who had joined the chats after the giveaway started were eligible to win
     * @type {boolean | undefined}
     */
    onlyNewMembers: boolean | undefined;
    /**
     * True, if the giveaway was canceled because the payment for it was refunded
     * @type {true | undefined}
     */
    refunded: true | undefined;
    /**
     * Description of additional giveaway prize
     * @type {string | undefined}
     */
    description: string | undefined;
    /**
     * Point in time when winners of the giveaway were selected
     * @type {Date}
     */
    get selectionAt(): Date;
}
import { Base } from "../Base";
import { Chat } from "../chat/Chat";
import { User } from "../misc/User";
//# sourceMappingURL=GiveawayWinners.d.ts.map