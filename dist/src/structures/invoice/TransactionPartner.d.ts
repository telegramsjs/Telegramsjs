export class TransactionPartner extends Base {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").TransactionPartner} data - Data about the describes the source of a transaction, or its recipient for outgoing transactions
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").TransactionPartner);
    /** Type of the transaction partner */
    type: "other" | "user" | "fragment" | "telegram_ads";
    _patch(data: any): any;
    /**
     * State of the transaction if the transaction is outgoing
     * @type {RevenueWithdrawalState | undefined}
     */
    withdrawal: RevenueWithdrawalState | undefined;
    /**
     * Information about the user
     * @type {User | undefined}
     */
    user: User | undefined;
    /**
     * Bot-specified invoice payload
     * @type {string | undefined}
     */
    payload: string | undefined;
    /**
     * @return {this is this & { user: User }}
     */
    isUser(): this is this & {
        user: User;
    };
    /**
     * @return {this is this & { withdrawal: RevenueWithdrawalState }}
     */
    isFragment(): this is this & {
        withdrawal: RevenueWithdrawalState;
    };
}
import { Base } from "../Base";
import { RevenueWithdrawalState } from "./RevenueWithdrawalState";
import { User } from "../misc/User";
//# sourceMappingURL=TransactionPartner.d.ts.map