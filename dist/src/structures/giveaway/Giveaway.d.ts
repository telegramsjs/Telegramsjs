export class Giveaway extends Base {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").Giveaway} data - Data about the represents a message about a scheduled giveaway
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").Giveaway);
    /** The list of chats which the user must join to participate in the giveaway */
    chats: Chat[];
    /** Point in time (Unix timestamp) when winners of the giveaway will be selected */
    selectedTimestamp: any;
    /** The number of users which are supposed to be selected as winners of the giveaway */
    winnerCount: number;
    /** True, if only users who join the chats after the giveaway started should be eligible to win */
    onlyNewMembers: true | undefined;
    /** True, if the list of giveaway winners will be visible to everyone */
    publicWinners: true | undefined;
    /** Description of additional giveaway prize */
    description: string | undefined;
    /** A list of two-letter ISO 3166-1 alpha-2 country codes indicating the countries from which eligible users for the giveaway must come. If empty, then all users can participate in the giveaway. Users with a phone number that was bought on Fragment can always participate in giveaways */
    countryCodes: string[] | undefined;
    /** The number of months the Telegram Premium subscription won from the giveaway will be active for */
    subscriptionMonthCount: number | undefined;
    /**
     * Point in time when winners of the giveaway will be selected
     * @type {Date}
     */
    get selectedAt(): Date;
}
import { Base } from "../Base";
import { Chat } from "../chat/Chat";
//# sourceMappingURL=Giveaway.d.ts.map