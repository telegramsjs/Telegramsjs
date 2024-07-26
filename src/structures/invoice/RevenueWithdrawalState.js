class RevenueWithdrawalState {
  /**
   * @param {import("@telegram.ts/types").RevenueWithdrawalState} data - Data about the describes the state of a revenue withdrawal operation
   */
  constructor(data) {
    if ("date" in data) {
      /** Date the withdrawal was completed in Unix time */
      this.createdTimestamp = data.date;
    }

    if ("url" in data) {
      /** An HTTPS URL that can be used to see transaction details */
      this.url = data.url;
    }

    if (data.type === "failed") {
      /** Type of the state, always “failed” */
      this.failed = true;
    }

    if (data.type === "pending") {
      /** Type of the state, always “pending” */
      this.pending = true;
    }
  }

  /**
   * Date the withdrawal was completed
   * @type {Date}
    
   */
  get createdAt() {
    return new Date(this.createdTimestamp);
  }

  /**
   * @return {this is this & { createdTimestamp: number; url: string; }}
   */
  isSucceeded() {
    return Boolean(
      "createdTimestamp" in this &&
        this.createdTimestamp &&
        "url" in this &&
        this.url,
    );
  }
}

module.exports = { RevenueWithdrawalState };
