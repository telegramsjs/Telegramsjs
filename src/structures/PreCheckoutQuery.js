const { Base } = require("./Base");
const { User } = require("./User");
const { OrderInfo } = require("./invoice/OrderInfo");

class PreCheckoutQuery extends Base {
  constructor(client, data) {
    super(client, data);

    this.id = data.id;

    this._patch(data);
  }

  _patch(data) {
    this.author = new User(this.client, data.from);

    this.currency = data.currency;

    this.totalAmount = data.total_amount;

    this.invoicePayload = data.invoice_payload;

    if ("shipping_option_id" in data) {
      this.shippingOptionId = data.shipping_option_id;
    }

    if ("order_info" in data) {
      this.orderInfo = new OrderInfo(data.order_info);
    }
  }
}

module.exports = { PreCheckoutQuery };
