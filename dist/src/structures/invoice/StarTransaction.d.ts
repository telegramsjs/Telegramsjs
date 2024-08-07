export class StarTransaction {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").StarTransaction} data - Data about the describes a Telegram Star transaction
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").StarTransaction);
    /** Unique identifier of the transaction. Coincides with the identifer of the original transaction for refund transactions. Coincides with SuccessfulPayment.telegram_payment_charge_id for successful incoming payments from users. */
    id: string;
    /** Number of Telegram Stars transferred by the transaction */
    amount: number;
    /** Date the transaction was created in Unix time */
    createdTimestamp: number;
    /**
     * Source of an incoming transaction (e.g., a user purchasing goods or services, Fragment refunding a failed withdrawal). Only for incoming transactions
     * @type {TransactionPartner | undefined}
     */
    source: TransactionPartner | undefined;
    /**
     * Receiver of an outgoing transaction (e.g., a user for a purchase refund, Fragment for a withdrawal). Only for outgoing transactions
     * @type {TransactionPartner | undefined}
     */
    receiver: TransactionPartner | undefined;
    /**
     * Refunds a successful payment in Telegram Stars.
     * @param {number} userId - Identifier of the user whose payment will be refunded
     * @return {Promise<true>} - Returns True on success.
     */
    refundStarPayment(userId: number): Promise<true>;
    /**
     * Date the transaction was created in Unix time
     * @type {Date}
     */
    get createdAt(): Date;
}
import { TransactionPartner } from "./TransactionPartner";
//# sourceMappingURL=StarTransaction.d.ts.map