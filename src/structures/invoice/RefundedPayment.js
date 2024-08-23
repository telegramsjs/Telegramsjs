const { Base } = require("../Base");

class RefundedPayment extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").RefundedPayment} data - Data about the contains basic information about a refunded payment
   */
  constructor(client, data) {
    super(client);

    /** Three-letter ISO 4217 currency code, or “XTR” for payments in Telegram Stars. Currently, always “XTR” */
    this.currency = data.currency;

    /** Total refunded price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45, total_amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
    this.totalAmount = data.total_amount;

    /** Bot-specified invoice payload */
    this.invoicePayload = data.invoice_payload;

    /** Telegram payment identifier */
    this.telegramChargeId = data.telegram_payment_charge_id;

    if ("provider_payment_charge_id" in data) {
      /** Provider payment identifier */
      this.providerChargeId = data.provider_payment_charge_id;
    }
  }

  /**
   * Refunds a successful payment in Telegram Stars.
   * @param {string | number} userId - Identifier of the user whose payment will be refunded
   * @returns {Promise<true>} - Returns True on success.
   */
  refundStarPayment(userId) {
    return this.client.refundStarPayment(userId, this.telegramChargeId);
  }
}

module.exports = { RefundedPayment };
