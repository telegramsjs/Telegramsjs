// @ts-check
const { Base } = require("../Base");
const { Gift } = require("../gift/Gift");
const { PaidMedia } = require("../media/paid/PaidMedia");
const { AffiliateInfo } = require("./AffiliateInfo");
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

    if ("subscription_period" in data) {
      /**
       * The duration of the paid subscription.
       * @type {number | undefined}
       */
      this.subscriptionPeriod = data.subscription_period;
    }

    if ("request_count" in data) {
      /**
       * The number of successful requests that exceeded regular limits and were therefore billed
       * @type {number | undefined}
       */
      this.requestCount = data.request_count;
    }

    if ("gift" in data) {
      /**
       * The gift sent to the user by the bot.
       * @type {Gift | undefined}
       */
      this.gift = new Gift(this.client, data.gift);
    }

    if ("chat" in data) {
      /**
       * Information about the chat.
       * @type {import("../chat/Chat").Chat | undefined}
       */
      this.chat = this.client.chats._add(data.chat);
    }

    if ("affiliate" in data) {
      /**
       * Information about the affiliate that received a commission via this transaction.
       * @type {AffiliateInfo | undefined}
       */
      this.affiliate = new AffiliateInfo(this.client, data.affiliate);
    }

    if ("sponsor_user" in data) {
      /**
       * Information about the bot that sponsored the affiliate program.
       * @type {import("../misc/User").User | undefined}
       */
      this.sponsorUser = this.client.users._add(data.sponsor_user);
    }

    if ("commission_per_mille" in data) {
      /**
       * The number of Telegram Stars received by the bot for each 1000 Telegram Stars received by the affiliate program sponsor from referred users.
       * @type {number | undefined}
       */
      this.commissionRate = data.commission_per_mille;
    }

    return data;
  }

  /**
   * @returns {this is this & { withdrawal?: undefined; user: import("../misc/User").User; paidMedia?: PaidMedia[]; paidMediaPayload?: string; gift?: Gift; subscriptionPeriod?: number; affiliate?: AffiliateInfo; sponsorUser?: undefined; commissionRate?: undefined; requestCount?: undefined; chat?: undefined }}
   */
  isUser() {
    return Boolean("user" in this && this.user);
  }

  /**
   * @returns {this is this & { withdrawal?: undefined; user?: undefined; paidMedia?: PaidMedia[]; paidMediaPayload?: string; gift?: Gift; subscriptionPeriod?: number; affiliate?: AffiliateInfo; sponsorUser?: undefined; commissionRate?: undefined; requestCount?: undefined; chat: import("../misc/Chat").Chat }}
   */
  isChat() {
    return Boolean("chat" in this && this.chat);
  }

  /**
   * @returns {this is this & { withdrawal: RevenueWithdrawalState; user?: undefined; paidMedia?: undefined; paidMediaPayload?: undefined; gift?: undefined; subscriptionPeriod?: undefined;  affiliate?: undefined; sponsorUser?: undefined; commissionRate?: undefined; requestCount?: undefined; chat?: undefined }}
   */
  isFragment() {
    return Boolean("withdrawal" in this && this.withdrawal);
  }

  /**
   * @returns {this is this & { withdrawal?: undefined; user?: undefined; paidMedia?: undefined; paidMediaPayload?: undefined; gift?: undefined; subscriptionPeriod?: undefined; affiliate?: undefined; sponsorUser?: undefined; commissionRate?: undefined; requestCount: number; chat?: undefined }}
   */
  isTelegramApi() {
    return Boolean("requestCount" in this && this.requestCount !== undefined);
  }

  /**
   * @returns {this is this & { withdrawal?: undefined; user?: undefined; paidMedia?: undefined; paidMediaPayload?: undefined; gift?: undefined; subscriptionPeriod?: undefined; affiliate?: undefined; sponsorUser?: import("../misc/User").User; commissionRate?: number; requestCount?: undefined; chat?: undefined }}
   */
  isAffiliateProgram() {
    return Boolean(
      "commissionRate" in this && this.commissionRate !== undefined,
    );
  }
}

module.exports = { TransactionPartner };
