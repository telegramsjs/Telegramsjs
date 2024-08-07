export class StarTransactions {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").StarTransactions} data - Data about the contains a list of Telegram Star transactions
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").StarTransactions);
    /** The list of transactions */
    transactions: StarTransaction[];
}
import { StarTransaction } from "./StarTransaction";
//# sourceMappingURL=StarTransactions.d.ts.map