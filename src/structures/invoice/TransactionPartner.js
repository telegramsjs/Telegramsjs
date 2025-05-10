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

    if ("transaction_type" in data) {
      /** Type of the transaction, currently one of “invoice_payment” for payments via invoices, “paid_media_payment” for payments for paid media, “gift_purchase” for gifts sent by the bot, “premium_purchase” for Telegram Premium subscriptions gifted by the bot, “business_account_transfer” for direct transfers from managed business accounts */
      this.transactionType = data.transaction_type;
    }

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
       * Information about the paid media bought by the user. Can be available only for “invoice_payment” transactions.
       * @type {PaidMedia[] | undefined}
       */
      this.paidMedia = data.paid_media.map(
        (media) => new PaidMedia(this.client, media),
      );
    }

    if ("paid_media_payload" in data) {
      /**
       * Bot-specified paid media payload. Can be available only for “invoice_payment” transactions.
       * @type {string | undefined}
       */
      this.paidMediaPayload = data.paid_media_payload;
    }

    if ("invoice_payload" in data) {
      /**
       * Bot-specified invoice payload. Can be available only for “invoice_payment” transactions.
       * @type {string | undefined}
       */
      this.payload = data.invoice_payload;
    }

    if ("subscription_period" in data) {
      /**
       * The duration of the paid subscription. Can be available only for “invoice_payment” transactions.
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
       * The gift sent to the user by the bot; for “gift_purchase” transactions only.
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
       * Information about the affiliate that received a commission via this transaction. Can be available only for “invoice_payment” and “paid_media_payment” transactions.
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

    if ("premium_subscription_duration" in data) {
      /** Number of months the gifted Telegram Premium subscription will be active for; for “premium_purchase” transactions only */
      this.premiumSubscriptionDuration = data.premium_subscription_duration;
    }

    return data;
  }

  /**
   * @returns {this is this & { withdrawal?: undefined; user: import("../misc/User").User; paidMedia?: PaidMedia[]; paidMediaPayload?: string; gift?: Gift; subscriptionPeriod?: number; affiliate?: AffiliateInfo; sponsorUser?: undefined; commissionRate?: undefined; requestCount?: undefined; chat?: undefined; premiumSubscriptionDuration?: number; }}
   */
  isUser() {
    return Boolean("user" in this && this.user);
  }

  /**
   * @returns {this is this & { withdrawal?: undefined; user?: undefined; paidMedia?: PaidMedia[]; paidMediaPayload?: string; gift?: Gift; subscriptionPeriod?: number; affiliate?: AffiliateInfo; sponsorUser?: undefined; commissionRate?: undefined; requestCount?: undefined; chat: import("../misc/Chat").Chat; premiumSubscriptionDuration?: undefined; }}
   */
  isChat() {
    return Boolean("chat" in this && this.chat);
  }

  /**
   * @returns {this is this & { withdrawal: RevenueWithdrawalState; user?: undefined; paidMedia?: undefined; paidMediaPayload?: undefined; gift?: undefined; subscriptionPeriod?: undefined;  affiliate?: undefined; sponsorUser?: undefined; commissionRate?: undefined; requestCount?: undefined; chat?: undefined; premiumSubscriptionDuration?: undefined; }}
   */
  isFragment() {
    return Boolean("withdrawal" in this && this.withdrawal);
  }

  /**
   * @returns {this is this & { withdrawal?: undefined; user?: undefined; paidMedia?: undefined; paidMediaPayload?: undefined; gift?: undefined; subscriptionPeriod?: undefined; affiliate?: undefined; sponsorUser?: undefined; commissionRate?: undefined; requestCount: number; chat?: undefined; premiumSubscriptionDuration?: undefined; }}
   */
  isTelegramApi() {
    return Boolean("requestCount" in this && this.requestCount !== undefined);
  }

  /**
   * @returns {this is this & { withdrawal?: undefined; user?: undefined; paidMedia?: undefined; paidMediaPayload?: undefined; gift?: undefined; subscriptionPeriod?: undefined; affiliate?: undefined; sponsorUser?: import("../misc/User").User; commissionRate?: number; requestCount?: undefined; chat?: undefined; premiumSubscriptionDuration?: undefined; }}
   */
  isAffiliateProgram() {
    return Boolean(
      "commissionRate" in this && this.commissionRate !== undefined,
    );
  }
}

module.exports = { TransactionPartner };
