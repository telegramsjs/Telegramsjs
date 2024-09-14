// @ts-check
const { Base } = require("../Base");
const { TransactionPartner } = require("./TransactionPartner");

class StarTransaction extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").StarTransaction} data - Data about the describes a Telegram Star transaction
   */
  constructor(client, data) {
    super(client);

    /** Unique identifier of the transaction. Coincides with the identifer of the original transaction for refund transactions. Coincides with SuccessfulPayment.telegram_payment_charge_id for successful incoming payments from users. */
    this.id = data.id;

    /** Number of Telegram Stars transferred by the transaction */
    this.amount = data.amount;

    /** Date the transaction was created in Unix time */
    this.createdUnixTime = data.date;

    if ("source" in data) {
      /**
       * Source of an incoming transaction (e.g., a user purchasing goods or services, Fragment refunding a failed withdrawal). Only for incoming transactions
       * @type {TransactionPartner | undefined}
       */
      this.source = new TransactionPartner(client, data.source);
    }

    if ("receiver" in data) {
      /**
       * Receiver of an outgoing transaction (e.g., a user for a purchase refund, Fragment for a withdrawal). Only for outgoing transactions
       * @type {TransactionPartner | undefined}
       */
      this.receiver = new TransactionPartner(client, data.receiver);
    }
  }

  /**
   * Refunds a successful payment in Telegram Stars.
   * @param {string | number} userId - Identifier of the user whose payment will be refunded
   * @returns {Promise<true>} - Returns True on success.
   */
  refundStarPayment(userId) {
    return this.client.refundStarPayment(userId, this.id);
  }

  /**
   * Return the timestamp transaction was created
   */
  get createdTimestamp() {
    return this.createdUnixTime * 1000;
  }

  /**
   * Date the transaction was created
   * @type {Date}
   */
  get createdAt() {
    return new Date(this.createdTimestamp);
  }
}

module.exports = { StarTransaction };
