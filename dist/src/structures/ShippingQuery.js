"use strict";
const { Base } = require("./Base");
const { User } = require("./misc/User");
/**
 * @typedef {import("../types").MethodParameters} MethodParameters
 */
class ShippingQuery extends Base {
    /**
     * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").ShippingQuery} data - Data about the contains information about an incoming shipping query
     */
    constructor(client, data) {
        var _a, _b, _c, _d, _e, _f;
        super(client);
        /** Unique query identifier */
        this.id = data.id;
        /**.User who sent the query */
        this.author = new User(client, data.from);
        /** Bot specified invoice payload.*/
        this.invoicePayload = data.invoice_payload;
        /**
         * @typedef {Object} ShippingAddress
         * @property {string} countryCode - Two-letter ISO 3166-1 alpha-2 country code
         * @property {string} state - State, if applicable
         * @property {string} city - City
         * @property {string} streetLine1 - First line for the address
         * @property {string} streetLine2 - Second line for the address
         * @property {string} postCode - Address post code
         */
        const shippingAddress = {};
        shippingAddress.countryCode = (_a = data.shipping_address) === null || _a === void 0 ? void 0 : _a.country_code;
        shippingAddress.state = (_b = data.shipping_address) === null || _b === void 0 ? void 0 : _b.state;
        shippingAddress.city = (_c = data.shipping_address) === null || _c === void 0 ? void 0 : _c.city;
        shippingAddress.streetLine1 = (_d = data.shipping_address) === null || _d === void 0 ? void 0 : _d.street_line1;
        shippingAddress.streetLine2 = (_e = data.shipping_address) === null || _e === void 0 ? void 0 : _e.street_line2;
        shippingAddress.postCode = (_f = data.shipping_address) === null || _f === void 0 ? void 0 : _f.post_code;
        /**
         * User specified shipping address
         * @type {ShippingAddress}
         */
        this.shippingAddress = shippingAddress;
    }
    /**
     * If you sent an invoice requesting a shipping address and the parameter is_flexible was specified, the Bot API will send an Update with a shipping_query field to the bot. Use this method to reply to shipping queries.
     * @param {boolean} ok - Pass True if delivery to the specified address is possible and False if there are any problems (for example, if delivery to the specified address is not possible)
     * @param {Omit<MethodParameters["answerShippingQuery"], "shippingQueryId" | "ok">} [options={}] - out parameters
     * @return {Promise<true>} - On success, True is returned.
     */
    answerQuery(ok, options = {}) {
        return this.client.answerShippingQuery({
            shippingQueryId: this.id,
            ok,
            ...options,
        });
    }
}
module.exports = { ShippingQuery };
//# sourceMappingURL=ShippingQuery.js.map