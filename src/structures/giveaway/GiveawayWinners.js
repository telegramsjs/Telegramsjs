// @ts-check
const { Base } = require("../Base");
const { Collection } = require("@telegram.ts/collection");

class GiveawayWinners extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").GiveawayWinners} data - Data about the represents a message about the completion of a giveaway with public winners
   */
  constructor(client, data) {
    super(client);

    /**
     * The chat that created the giveaway
     * @type {import("../chat/Chat").Chat}
     */
    this.chat = this.client.chats._add(data.chat);

    /** Identifier of the messsage with the giveaway in the chat */
    this.messageId = String(data.giveaway_message_id);

    /** Point in time (Unix timestamp) when winners of the giveaway were selected */
    this.selectionUnixTime = data.winners_selection_date;

    /** Total number of winners in the giveaway */
    this.count = data.winner_count;

    /**
     * List of up to 100 winners of the giveaway
     * @type {Collection<string, import("../misc/User").User>}
     */
    this.winners = new Collection(
      data.winners.map((user) => [
        String(user.id),
        this.client.users._add(user),
      ]),
    );

    this._patch(data);
  }

  /**
   * @param {import("@telegram.ts/types").GiveawayWinners} data - Data about the represents a message about the completion of a giveaway with public winners
   * @override
   */
  _patch(data) {
    if ("additional_chat_count" in data) {
      /**
       * The number of other chats the user had to join in order to be eligible for the giveaway
       * @type {number | undefined}
       */
      this.addChatCount = data.additional_chat_count;
    }

    if ("prize_star_count" in data) {
      /**
       * The number of Telegram Stars that were split between giveaway winners; for Telegram Star giveaways only
       * @type {number | undefined}
       */
      this.starCount = data.prize_star_count;
    }

    if ("premium_subscription_month_count" in data) {
      /**
       * The number of months the Telegram Premium subscription won from the giveaway will be active for; for Telegram Premium giveaways only
       * @type {number | undefined}
       */
      this.subscriptionMonthCount = data.premium_subscription_month_count;
    }

    if ("unclaimed_prize_count" in data) {
      /**
       * Number of undistributed prizes
       * @type {number | undefined}
       */
      this.unclaimedPrizeCount = data.unclaimed_prize_count;
    }

    if ("only_new_members" in data) {
      /**
       * True, if only users who had joined the chats after the giveaway started were eligible to win
       * @type {boolean | undefined}
       */
      this.onlyNewMembers = data.only_new_members;
    }

    if ("was_refunded" in data) {
      /**
       * True, if the giveaway was canceled because the payment for it was refunded
       * @type {true | undefined}
       */
      this.refunded = data.was_refunded;
    }

    if ("prize_description" in data) {
      /**
       * Description of additional giveaway prize
       * @type {string | undefined}
       */
      this.description = data.prize_description;
    }

    return data;
  }

  /**
   * Return the timestamp winners of the giveaway were selected, in milliseconds
   */
  get selectionTimestamp() {
    return this.selectionUnixTime * 1000;
  }

  /**
   * Point in time when winners of the giveaway were selected
   * @type {Date}
   */
  get selectionAt() {
    return new Date(this.selectionTimestamp);
  }

  /**
   * Checks if this giveaway winners object is equal to another giveaway winners object.
   * @param {GiveawayWinners} other - The other object to compare with.
   * @returns {boolean} True if both objects are instances of GiveawayWinners and are equal based on key properties, otherwise false.
   */
  equals(other) {
    if (!other || !(other instanceof GiveawayWinners)) return false;

    const thisWinners = Array.from(this.winners).map(([_, winner]) => winner);
    const otherWinners = Array.from(other.winners).map(([_, winner]) => winner);

    return (
      this.messageId === other.messageId &&
      this.selectionUnixTime === other.selectionUnixTime &&
      this.count === other.count &&
      this.addChatCount === other.addChatCount &&
      this.starCount === other.starCount &&
      this.subscriptionMonthCount === other.subscriptionMonthCount &&
      this.unclaimedPrizeCount === other.unclaimedPrizeCount &&
      this.onlyNewMembers === other.onlyNewMembers &&
      this.refunded === other.refunded &&
      this.description === other.description &&
      thisWinners.length === otherWinners.length &&
      thisWinners.every(
        (winner, index) =>
          otherWinners[index] && winner.equals(otherWinners[index]),
      ) &&
      this.chat.equals(other.chat)
    );
  }

  /**
   * Makes the class iterable, returning each `User` object.
   * @returns {IterableIterator<import("../misc/User").User>}
   */
  *[Symbol.iterator]() {
    for (const [_, winner] of this.winners) {
      yield winner;
    }
  }
}

module.exports = { GiveawayWinners };
