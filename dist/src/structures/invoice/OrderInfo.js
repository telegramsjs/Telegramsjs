"use strict";
class OrderInfo {
    /**
     * @param {import("@telegram.ts/types").OrderInfo} data - Data about the represents information about an order
     */
    constructor(data) {
        var _a, _b, _c, _d, _e;
        if ("name" in data) {
            /** User name */
            this.name = data.name;
        }
        if ("phone_number" in data) {
            /** User's phone number */
            this.phoneNumber = data.phone_number;
        }
        if ("email" in data) {
            /** User email */
            this.email = data.email;
        }
        if ("shipping_address" in data) {
            /**
             * @typedef {Object} ShippingAddress
             * @property {string} countryCode - Two-letter ISO 3166-1 alpha-2 country code
             * @property {string} state - State, if applicable
             * @property {string} city - City
             * @property {string} streetLine1 - First line for the address
             * @property {string} streetLine2 - Second line for the address
             * @property {string} postCode - Address post code
             */
            /**
             * This object represents a shipping address
             * @type {ShippingAddress}
             */
            const shippingAddress = {};
            shippingAddress.countryCode = (_a = data.shipping_address) === null || _a === void 0 ? void 0 : _a.country_code;
            shippingAddress.city = (_b = data.shipping_address) === null || _b === void 0 ? void 0 : _b.city;
            shippingAddress.streetLine1 = (_c = data.shipping_address) === null || _c === void 0 ? void 0 : _c.street_line1;
            shippingAddress.streetLine2 = (_d = data.shipping_address) === null || _d === void 0 ? void 0 : _d.street_line2;
            shippingAddress.postCode = (_e = data.shipping_address) === null || _e === void 0 ? void 0 : _e.post_code;
            /**
             * This object represents a shipping address
             * @type {ShippingAddress | undefined}
             */
            this.shippingAddress = shippingAddress;
        }
    }
}
module.exports = { OrderInfo };
//# sourceMappingURL=OrderInfo.js.map