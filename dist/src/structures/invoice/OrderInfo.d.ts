export class OrderInfo {
    /**
     * @param {import("@telegram.ts/types").OrderInfo} data - Data about the represents information about an order
     */
    constructor(data: import("@telegram.ts/types").OrderInfo);
    /** User name */
    name: string | undefined;
    /** User's phone number */
    phoneNumber: string | undefined;
    /** User email */
    email: string | undefined;
    /**
     * This object represents a shipping address
     * @type {ShippingAddress | undefined}
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
    } | undefined;
}
//# sourceMappingURL=OrderInfo.d.ts.map