export class RefundedPayment extends Base {
    /**
     * @param {import("@telegram.ts/types").RefundedPayment} data - Data about the contains basic information about a refunded payment
     */
    constructor(client: any, data: import("@telegram.ts/types").RefundedPayment);
    /** Three-letter ISO 4217 currency code, or “XTR” for payments in Telegram Stars. Currently, always “XTR” */
    currency: string;
    /** Total refunded price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45, total_amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
    totalAmount: number;
    /** Bot-specified invoice payload */
    invoicePayload: string;
    /** Telegram payment identifier */
    telegramChargeId: string;
    /** Provider payment identifier */
    providerChargeId: string | undefined;
    /**
     * Refunds a successful payment in Telegram Stars.
     * @param {number} userId - Identifier of the user whose payment will be refunded
     * @return {Promise<true>} - Returns True on success.
     */
    refundStarPayment(userId: number): Promise<true>;
}
import { Base } from "../Base";
//# sourceMappingURL=RefundedPayment.d.ts.map