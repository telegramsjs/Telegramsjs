// @ts-check
class OrderInfo {
  /**
   * @param {import("@telegram.ts/types").OrderInfo} data - Data about the represents information about an order
   */
  constructor(data) {
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

      shippingAddress.countryCode = data.shipping_address?.country_code;
      shippingAddress.city = data.shipping_address?.city;
      shippingAddress.streetLine1 = data.shipping_address?.street_line1;
      shippingAddress.streetLine2 = data.shipping_address?.street_line2;
      shippingAddress.postCode = data.shipping_address?.post_code;

      /**
       * This object represents a shipping address
       * @type {ShippingAddress | undefined}
       */
      this.shippingAddress = shippingAddress;
    }
  }
}

module.exports = { OrderInfo };
