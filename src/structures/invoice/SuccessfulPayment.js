const { Base } = require("../Base");
const { OrderInfo } = require("./OrderInfo");

class SuccessfulPayment extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").SuccessfulPayment} data - Data about the contains basic information about a successful payment
   */
  constructor(client, data) {
    super(client);

    /** Three-letter ISO 4217 currency code, or “XTR” for payments in Telegram Stars */
    this.currency = data.currency;

    /** Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
    this.totalAmount = data.total_amount;

    /** Bot specified invoice payload */
    this.payload = data.invoice_payload;

    if ("shipping_option_id" in data) {
      /** Identifier of the shipping option chosen by the user */
      this.shippingId = data.shipping_option_id;
    }

    if ("order_info" in data) {
      /** Order information provided by the user */
      this.orderInfo = new OrderInfo(data.order_info);
    }

    /** Telegram payment identifier */
    this.telegramPaymentId = data.telegram_payment_charge_id;

    /** Provider payment identifier */
    this.providedPaymentId = data.provider_payment_charge_id;
  }

  /**
   * Refunds a successful payment in Telegram Stars.
   * @param {string | number} userId - Identifier of the user whose payment will be refunded
   * @return {Promise<true>} - Returns True on success.
   */
  refundStarPayment(userId) {
    return this.client.refundStarPayment(userId, this.telegramPaymentId);
  }
}

module.exports = { SuccessfulPayment };
