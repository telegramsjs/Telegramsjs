export type MethodParameters = import("../../types").MethodParameters;
/**
 * @typedef {import("../../types").MethodParameters} MethodParameters
 */
export class Invoice extends Base {
    /**
     * @param {import("@telegram.ts/types").Invoice} data - Data about the contains basic information about an invoice
     */
    constructor(client: any, data: import("@telegram.ts/types").Invoice);
    /** Product name */
    title: string;
    /** Product description */
    description: string;
    /** Unique bot deep-linking parameter that can be used to generate this invoice */
    startParameter: string;
    /** Three-letter ISO 4217 currency code, or “XTR” for payments in Telegram Stars */
    currency: string;
    /** Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
    totalAmount: number;
    /**
     * Use this method to create a link for an invoice.
     * @param {string} payload - Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use for your internal processes
     * @param {import("@telegram.ts/types").LabeledPrice[]} prices - Price breakdown, a list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.)
     * @param {Omit<MethodParameters["createInvoiceLink"], "payload" | "prices" | "title" | "description" | "currency" | "maxTipAmount">} [options={}] - out parameters
     * @return {Promise<string>} - Returns the created invoice link as String on success.
     */
    create(payload: string, prices: import("@telegram.ts/types").LabeledPrice[], options?: Omit<{
        title: string;
        description: string;
        payload: string;
        providerToken?: string;
        currency: string;
        prices: import("../../client/interfaces/Inline").LabeledPrice[];
        maxTipAmount?: number;
        suggestedTipAmounts?: number[];
        providerData?: string;
        photoUrl?: string;
        photoSize?: number;
        photoWidth?: number;
        photoHeight?: number;
        needName?: boolean;
        needPhoneNumber?: boolean;
        needEmail?: boolean;
        needShippingAddress?: boolean;
        sendPhoneNumberToProvider?: boolean;
        sendEmailToProvider?: boolean;
        isFlexible?: boolean;
    }, "currency" | "description" | "title" | "payload" | "prices" | "maxTipAmount"> | undefined): Promise<string>;
}
import { Base } from "../Base";
//# sourceMappingURL=Invoice.d.ts.map