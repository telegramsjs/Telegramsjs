export class SuccessfulPayment extends Base {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").SuccessfulPayment} data - Data about the contains basic information about a successful payment
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").SuccessfulPayment);
    /** Three-letter ISO 4217 currency code, or “XTR” for payments in Telegram Stars */
    currency: string;
    /** Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
    totalAmount: number;
    /** Bot specified invoice payload */
    payload: string;
    /** Identifier of the shipping option chosen by the user */
    shippingId: string | undefined;
    /** Order information provided by the user */
    orderInfo: OrderInfo | undefined;
    /** Telegram payment identifier */
    telegramPaymentId: string;
    /** Provider payment identifier */
    providedPaymentId: string;
    /**
     * Refunds a successful payment in Telegram Stars.
     * @param {number} userId - Identifier of the user whose payment will be refunded
     * @return {Promise<true>} - Returns True on success.
     */
    refundStarPayment(userId: number): Promise<true>;
}
import { Base } from "../Base";
import { OrderInfo } from "./OrderInfo";
//# sourceMappingURL=SuccessfulPayment.d.ts.map