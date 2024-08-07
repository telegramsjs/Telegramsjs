export type MethodParameters = import("../types").MethodParameters;
/**
 * @typedef {import("../types").MethodParameters} MethodParameters
 */
export class PreCheckoutQuery extends Base {
    /**
     * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").PreCheckoutQuery} data - Data about the contains information about an incoming pre-checkout query
     */
    constructor(client: import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient, data: import("@telegram.ts/types").PreCheckoutQuery);
    /** Unique query identifier */
    id: string;
    /** User who sent the query */
    author: User;
    /** Three-letter ISO 4217 currency code, or “XTR” for payments in Telegram Stars */
    currency: string;
    /** Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies) */
    totalAmount: number;
    /** Bot specified invoice payload */
    invoicePayload: string;
    /** Identifier of the shipping option chosen by the user */
    shippingOptionId: string | undefined;
    /** Order information provided by the user */
    orderInfo: OrderInfo | undefined;
    /**
     * Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in the form of an Update with the field pre_checkout_query. Use this method to respond to such pre-checkout queries.
     * @param {boolean} ok - Specify True if everything is alright (goods are available, etc.) and the bot is ready to proceed with the order. Use False if there are any problems
     * @param {string} [errorMessage] - Required if ok is False. Error message in human readable form that explains the reason for failure to proceed with the checkout (e.g. "Sorry, somebody just bought the last of our amazing black T-shirts while you were busy filling out your payment details. Please choose a different color or garment!"). Telegram will display this message to the user
     * @return {Promise<true>} - On success, True is returned. Note: The Bot API must receive an answer within 10 seconds after the pre-checkout query was sent.
     */
    answerQuery(ok: boolean, errorMessage?: string | undefined): Promise<true>;
}
import { Base } from "./Base";
import { User } from "./misc/User";
import { OrderInfo } from "./invoice/OrderInfo";
//# sourceMappingURL=PreCheckoutQuery.d.ts.map