const { Base } = require("./Base");
const { User } = require("./misc/User");
const { OrderInfo } = require("./invoice/OrderInfo");

class PreCheckoutQuery extends Base {
  /**
   * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").PreCheckoutQuery} data - Data about the contains information about an incoming pre-checkout query
   */
  constructor(client, data) {
    super(client);

    /** Unique query identifier */
    this.id = data.id;

    /** User who sent the query */
    this.author = new User(client, data.from);

    /** Three-letter ISO 4217 currency code, or “XTR” for payments in Telegram Stars */
    this.currency = data.currency;

    /** Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies) */
    this.totalAmount = data.total_amount;

    /** Bot specified invoice payload */
    this.invoicePayload = data.invoice_payload;

    if ("shipping_option_id" in data) {
      /** Identifier of the shipping option chosen by the user */
      this.shippingOptionId = data.shipping_option_id;
    }

    if ("order_info" in data) {
      /** Order information provided by the user */
      this.orderInfo = new OrderInfo(data.order_info);
    }
  }
}

module.exports = { PreCheckoutQuery };
