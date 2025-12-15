// @ts-check
const { SuggestedPostPrice } = require("./SuggestedPostPrice");

class SuggestedPostInfo {
  /**
   * @param {import("@telegram.ts/types").SuggestedPostInfo} data - Data about the contains information about a suggested post.
   */
  constructor(data) {
    /**
     * State of the suggested post. Currently, it can be one of “pending”, “approved”, “declined”.
     * @type {"pending" | "approved" | "declined"}
     */
    this.state = data.state;

    if ("price" in data) {
      /**
       * Proposed price of the post. If the field is omitted, then the post is unpaid.
       * @type {SuggestedPostPrice | undefined}
       */
      this.price = new SuggestedPostPrice(data.price);
    }

    if ("send_date" in data) {
      /**
       * Proposed send date of the post. If the field is omitted, then the post can be published at any time within 30 days at the sole discretion of the user or administrator who approves it.
       * @type {number | undefined}
       */
      this.createdUnixTime = data.send_date;
    }
  }

  /**
   * Return the timestamp withdrawal was completed, in milliseconds
   */
  get createdTimestamp() {
    return this.createdUnixTime ? this.createdUnixTime * 1000 : null;
  }

  /**
   * Date the withdrawal was completed
   * @type {null | Date}
   */
  get createdAt() {
    return this.createdTimestamp ? new Date(this.createdTimestamp) : null;
  }
}

module.exports = { SuggestedPostInfo };
