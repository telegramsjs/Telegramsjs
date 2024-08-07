export type MethodParameters = import("../types").MethodParameters;
/**
 * @typedef {import("../types").MethodParameters} MethodParameters
 */
export class ShippingQuery extends Base {
    /**
     * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").ShippingQuery} data - Data about the contains information about an incoming shipping query
     */
    constructor(client: import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient, data: import("@telegram.ts/types").ShippingQuery);
    /** Unique query identifier */
    id: string;
    /**.User who sent the query */
    author: User;
    /** Bot specified invoice payload.*/
    invoicePayload: string;
    /**
     * User specified shipping address
     * @type {ShippingAddress}
     */
    shippingAddress: {
        /**
         * - Two-letter ISO 3166-1 alpha-2 country code
         */
        countryCode: string;
        /**
         * - State, if applicable
         */
        state: string;
        /**
         * - City
         */
        city: string;
        /**
         * - First line for the address
         */
        streetLine1: string;
        /**
         * - Second line for the address
         */
        streetLine2: string;
        /**
         * - Address post code
         */
        postCode: string;
    };
    /**
     * If you sent an invoice requesting a shipping address and the parameter is_flexible was specified, the Bot API will send an Update with a shipping_query field to the bot. Use this method to reply to shipping queries.
     * @param {boolean} ok - Pass True if delivery to the specified address is possible and False if there are any problems (for example, if delivery to the specified address is not possible)
     * @param {Omit<MethodParameters["answerShippingQuery"], "shippingQueryId" | "ok">} [options={}] - out parameters
     * @return {Promise<true>} - On success, True is returned.
     */
    answerQuery(ok: boolean, options?: Omit<{
        shippingQueryId: string;
        ok: boolean;
        shippingOptions?: readonly import("../client/interfaces/Inline").ShippingOption[];
        errorMessage?: string;
    }, "ok" | "shippingQueryId"> | undefined): Promise<true>;
}
import { Base } from "./Base";
import { User } from "./misc/User";
//# sourceMappingURL=ShippingQuery.d.ts.map