// @ts-check

class AffiliateInfo {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").AffiliateInfo} data - Data about the affiliate that received a commission via this transaction.
   */
  constructor(client, data) {
    if ("affiliate_user" in data) {
      /**
       * The bot or the user that received an affiliate commission if it was received by a bot or a user
       * @type {import("../misc/User").User | undefined}
       */
      this.user = client.users._add(data.affiliate_user);
    }

    if ("affiliate_chat" in data) {
      /**
       * The chat that received an affiliate commission if it was received by a chat
       * @type {import("../chat/Chat").Chat | undefined}
       */
      this.chat = client.chats._add(data.affiliate_chat);
    }

    /** The number of Telegram Stars received by the affiliate for each 1000 Telegram Stars received by the bot from referred users */
    this.commissionRate = data.commission_per_mille;

    /** Integer amount of Telegram Stars received by the affiliate from the transaction, rounded to 0; can be negative for refunds */
    this.amount = data.amount;

    if ("nanostar_amount" in data) {
      /**
       * The number of 1/1000000000 shares of Telegram Stars received by the affiliate; can be negative for refunds
       * @type {number | undefined}
       */
      this.nanostarAmount = data.nanostar_amount;
    }
  }
}

module.exports = { AffiliateInfo };
