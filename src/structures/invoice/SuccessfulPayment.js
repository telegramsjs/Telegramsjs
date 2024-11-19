// @ts-check
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

    if ("subscription_expiration_date" in data) {
      /** Expiration date of the subscription, in Unix time; for recurring payments only */
      this.subscriptionExpirationUnixTime = data.subscription_expiration_date;
    }

    /** True, if the payment is a recurring payment for a subscription */
    this.isRecurring = Boolean(data.is_recurring);

    /** True, if the payment is the first payment for a subscription */
    this.isFirstRecurring = Boolean(data.is_first_recurring);

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
   * Return the timestamp subscription, in milliseconds
   */
  get subscriptionExpirationTimestamp() {
    return this.subscriptionExpirationUnixTime
      ? this.subscriptionExpirationUnixTime * 1000
      : null;
  }

  /**
   * Date the subscription
   * @type {null | Date}
   */
  get subscriptionExpirationAt() {
    return this.subscriptionExpirationTimestamp
      ? new Date(this.subscriptionExpirationTimestamp)
      : null;
  }

  /**
   * Refunds a successful payment in Telegram Stars.
   * @param {string | number} userId - Identifier of the user whose payment will be refunded
   * @returns {Promise<true>} - Returns True on success.
   */
  refundStarPayment(userId) {
    return this.client.refundStarPayment(userId, this.telegramPaymentId);
  }

  /**
   * @typedef {Object} StarSubscription
   * @property {number | string} userId - Identifier of the user whose subscription will be edited.
   * @property {boolean} isCanceled - Pass True to cancel extension of the user subscription; the subscription must be active up to the end of the current subscription period. Pass False to allow the user to re-enable a subscription that was previously canceled by the bot.
   */

  /** Allows the bot to cancel or re-enable extension of a subscription paid in Telegram Stars.
   * @param {StarSubscription} options - out parameters.
   * @returns {Promise<true>} - Returns True on success.
   */
  editStarSubscription({ userId, isCanceled }) {
    return this.client.editUserStarSubscription({
      userId,
      isCanceled,
      telegramPaymentChargeId: this.telegramPaymentId,
    });
  }
}

module.exports = { SuccessfulPayment };
