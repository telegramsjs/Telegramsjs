class Invoice {
  /**
   * @param {import("@telegram.ts/types").Invoice} data - Data about the contains basic information about an invoice
   */
  constructor(data) {
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
}

module.exports = { Invoice };
