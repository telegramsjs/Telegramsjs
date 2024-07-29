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

    shippingAddress.countryCode = data.shipping_address?.country_code;
    shippingAddress.state = data.shipping_address?.state;
    shippingAddress.city = data.shipping_address?.city;
    shippingAddress.streetLine1 = data.shipping_address?.street_line1;
    shippingAddress.streetLine2 = data.shipping_address?.street_line2;
    shippingAddress.postCode = data.shipping_address?.post_code;

    /**
     * User specified shipping address
     * @type {ShippingAddress}
     */
    this.shippingAddress = shippingAddress;
  }

  /**
   * If you sent an invoice requesting a shipping address and the parameter is_flexible was specified, the Bot API will send an Update with a shipping_query field to the bot. Use this method to reply to shipping queries.
   * @param {boolean} ok - Pass True if delivery to the specified address is possible and False if there are any problems (for example, if delivery to the specified address is not possible)
   * @param {Omit<MethodParameters["answerShippingQuery"], "shipping_query_id" | "ok">} [options={}] - out parameters
   * @return {Promise<true>} - On success, True is returned.
   */
  answerQuery(ok, options = {}) {
    return this.client.answerShippingQuery({
      shipping_query_id: this.id,
      ok,
      ...options,
    });
  }
}

module.exports = { ShippingQuery };
