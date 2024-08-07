export class GiveawayCompleted extends Base {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").GiveawayCompleted} data - Data about the represents a service message about the completion of a giveaway without public winners
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").GiveawayCompleted);
    /** Number of winners in the giveaway */
    count: number;
    /** Number of undistributed prizes */
    unclaimedPrizeCount: number | undefined;
    /** Message with the giveaway that was completed, if it wasn't deleted */
    message: import("../message/Message").Message;
}
import { Base } from "../Base";
//# sourceMappingURL=GiveawayCompleted.d.ts.map