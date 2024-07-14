const { Base } = require("./Base");
const { User } = require("./misc/User");

class ShippingQuery extends Base {
  constructor(client, data) {
    super(client, data);

    this.id = data.id;

    this._patch(data);
  }

  _patch(data) {
    this.author = new User(this.client, data.from);

    this.invoicePayload = data.invoice_payload;

    const shippingAddress = {};

    shippingAddress.countryCode = data.shipping_address?.country_code;
    shippingAddress.city = data.shipping_address?.city;
    shippingAddress.streetLine1 = data.shipping_address?.street_line1;
    shippingAddress.streetLine2 = data.shipping_address?.street_line2;
    shippingAddress.postCode = data.shipping_address?.post_code;

    this.shippingAddress = shippingAddress;
  }
}

module.exports = { ShippingQuery };
