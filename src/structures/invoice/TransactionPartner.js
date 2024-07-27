const { Base } = require("../Base");
const { User } = require("../misc/User");
const { RevenueWithdrawalState } = require("./RevenueWithdrawalState");

class TransactionPartner extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").TransactionPartner} data - Data about the describes the source of a transaction, or its recipient for outgoing transactions
   */
  constructor(client, data) {
    super(client, data);

    /** Type of the transaction partner */
    this.type = data.type;

    this._patch(data);
  }

  _patch(data) {
    if ("withdrawal_state" in data) {
      /**
       * State of the transaction if the transaction is outgoing
       * @type {RevenueWithdrawalState | undefined}
       */
      this.withdrawal = new RevenueWithdrawalState(data.withdrawal_state);
    }

    if ("user" in data) {
      /**
       * Information about the user
       * @type {User | undefined}
       */
      this.user = new User(this.client, data.user);
    }

    if ("invoice_payload" in data) {
      /**
       * Bot-specified invoice payload
       * @type {string | undefined}
       */
      this.payload = data.invoice_payload;
    }

    return data;
  }

  /**
   * @return {this is this & { user: User }}
   */
  isUser() {
    return Boolean("user" in this && this.user);
  }

  /**
   * @return {this is this & { withdrawal: RevenueWithdrawalState }}
   */
  isFragment() {
    return Boolean("withdrawal" in this && this.withdrawal);
  }
}

module.exports = { TransactionPartner };
