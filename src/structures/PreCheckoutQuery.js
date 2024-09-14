// @ts-check
const { Base } = require("./Base");
const { OrderInfo } = require("./invoice/OrderInfo");

/**
 * @typedef {import("../types").MethodParameters} MethodParameters
 */

class PreCheckoutQuery extends Base {
  /**
   * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").PreCheckoutQuery} data - Data about the contains information about an incoming pre-checkout query
   */
  constructor(client, data) {
    super(client);

    /** Unique query identifier */
    this.id = data.id;

    /**
     * User who sent the query
     * @type {import("./misc/User").User}
     */
    this.author = this.client.users._add(data.from);

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

  /**
   * Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in the form of an Update with the field pre_checkout_query. Use this method to respond to such pre-checkout queries.
   * @param {boolean} ok - Specify True if everything is alright (goods are available, etc.) and the bot is ready to proceed with the order. Use False if there are any problems
   * @param {string} [errorMessage] - Required if ok is False. Error message in human readable form that explains the reason for failure to proceed with the checkout (e.g. "Sorry, somebody just bought the last of our amazing black T-shirts while you were busy filling out your payment details. Please choose a different color or garment!"). Telegram will display this message to the user
   * @returns {Promise<true>} - On success, True is returned. Note: The Bot API must receive an answer within 10 seconds after the pre-checkout query was sent.
   */
  answerQuery(ok, errorMessage) {
    return this.client.answerPreCheckoutQuery({
      preCheckoutQueryId: this.id,
      ok,
      ...(errorMessage && { errorMessage }),
    });
  }
}

module.exports = { PreCheckoutQuery };
