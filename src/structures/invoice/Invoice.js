const { Base } = require("../Base");

/**
 * @typedef {import("../../types").MethodParameters} MethodParameters
 */

class Invoice extends Base {
  /**
   * @param {import("@telegram.ts/types").Invoice} data - Data about the contains basic information about an invoice
   */
  constructor(client, data) {
    super(client);

    /** Product name */
    this.title = data.title;

    /** Product description */
    this.description = data.description;

    /** Unique bot deep-linking parameter that can be used to generate this invoice */
    this.startParameter = data.start_parameter;

    /** Three-letter ISO 4217 currency code, or “XTR” for payments in Telegram Stars */
    this.currency = data.currency;

    /** Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
    this.totalAmount = data.total_amount;
  }

  /**
   * Use this method to create a link for an invoice.
   * @param {string} payload - Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use for your internal processes
   * @param {import("@telegram.ts/types").LabeledPrice[]} prices - Price breakdown, a list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.)
   * @param {Omit<MethodParameters["createInvoiceLink"], "payload" | "prices" | "title" | "description" | "currency" | "maxTipAmount">} [options={}] - out parameters
   * @returns {Promise<string>} - Returns the created invoice link as String on success.
   */
  create(payload, prices, options = {}) {
    return this.client.createInvoiceLink({
      payload,
      prices,
      title: this.title,
      description: this.description,
      currency: this.currency,
      maxTipAmount: this.totalAmount,
      ...options,
    });
  }
}

module.exports = { Invoice };
