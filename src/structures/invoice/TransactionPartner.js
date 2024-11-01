// @ts-check
const { Base } = require("../Base");
const { PaidMedia } = require("../media/paid/PaidMedia");
const { RevenueWithdrawalState } = require("./RevenueWithdrawalState");

class TransactionPartner extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").TransactionPartner} data - Data about the describes the source of a transaction, or its recipient for outgoing transactions
   */
  constructor(client, data) {
    super(client);

    /** Type of the transaction partner */
    this.type = data.type;

    this._patch(data);
  }

  /**
   * @param {import("@telegram.ts/types").TransactionPartner} data - Data about the describes the source of a transaction, or its recipient for outgoing transactions
   * @override
   */
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
       * @type {import("../misc/User").User | undefined}
       */
      this.user = this.client.users._add(data.user);
    }

    if ("paid_media" in data) {
      /**
       * Information about the paid media bought by the user
       * @type {PaidMedia[] | undefined}
       */
      this.paidMedia = data.paid_media.map(
        (media) => new PaidMedia(this.client, media),
      );
    }

    if ("paid_media_payload" in data) {
      /**
       * Bot-specified paid media payload
       * @type {string | undefined}
       */
      this.paidMediaPayload = data.paid_media_payload;
    }

    if ("invoice_payload" in data) {
      /**
       * Bot-specified invoice payload
       * @type {string | undefined}
       */
      this.payload = data.invoice_payload;
    }

    if ("request_count" in data) {
      /**
       * The number of successful requests that exceeded regular limits and were therefore billed
       * @type {number | undefined}
       */
      this.requestCount = data.request_count;
    }

    return data;
  }

  /**
   * @returns {this is this & { withdrawal?: undefined; user: import("../misc/User").User; paidMedia?: PaidMedia[]; paidMediaPayload?: string; requestCount?: undefined }}
   */
  isUser() {
    return Boolean("user" in this && this.user);
  }

  /**
   * @returns {this is this & { withdrawal: RevenueWithdrawalState; user?: undefined; paidMedia?: undefined; paidMediaPayload?: undefined; requestCount?: undefined }}
   */
  isFragment() {
    return Boolean("withdrawal" in this && this.withdrawal);
  }

  /**
   * @returns {this is this & { withdrawal?: undefined; user?: undefined; paidMedia?: undefined; paidMediaPayload?: undefined; requestCount: number }}
   */
  isTelegramApi() {
    return Boolean("requestCount" in this && this.requestCount !== undefined);
  }
}

module.exports = { TransactionPartner };
