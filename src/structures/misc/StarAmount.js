// @ts-check

class StarAmount {
  /**
   * @param {import("@telegram.ts/types").StarAmount} data - Data about the describes an amount of Telegram Stars.
   */
  constructor(data) {
    /** Integer amount of Telegram Stars, rounded to 0; can be negative */
    this.amount = data.amount;

    if ("nanostar_amount" in data) {
      /** The number of 1/1000000000 shares of Telegram Stars; from -999999999 to 999999999; can be negative if and only if amount is non-positive */
      this.nanostarAmount = data.nanostar_amount;
    }
  }
}

module.exports = { StarAmount };
