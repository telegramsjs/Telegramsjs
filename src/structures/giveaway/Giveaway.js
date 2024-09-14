// @ts-check
const { Base } = require("../Base");

class Giveaway extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").Giveaway} data - Data about the represents a message about a scheduled giveaway
   */
  constructor(client, data) {
    super(client);

    /**
     * The list of chats which the user must join to participate in the giveaway
     * @type {import("../chat/Chat").Chat[]}
     */
    this.chats = data.chats.map((chat) => this.client.chats._add(chat));

    /** Point in time (Unix timestamp) when winners of the giveaway will be selected */
    this.selectedUnixTime = data.winners_selection_date;

    /** The number of users which are supposed to be selected as winners of the giveaway */
    this.winnerCount = data.winner_count;

    if ("only_new_members" in data) {
      /** True, if only users who join the chats after the giveaway started should be eligible to win */
      this.onlyNewMembers = data.only_new_members;
    }

    if ("has_public_winners" in data) {
      /** True, if the list of giveaway winners will be visible to everyone */
      this.publicWinners = data.has_public_winners;
    }

    if ("prize_description" in data) {
      /** Description of additional giveaway prize */
      this.description = data.prize_description;
    }

    if ("prize_star_count" in data) {
      /** The number of Telegram Stars that were split between giveaway winners; for Telegram Star giveaways only */
      this.starCount = data.prize_star_count;
    }

    if ("country_codes" in data) {
      /** A list of two-letter ISO 3166-1 alpha-2 country codes indicating the countries from which eligible users for the giveaway must come. If empty, then all users can participate in the giveaway. Users with a phone number that was bought on Fragment can always participate in giveaways */
      this.countryCodes = data.country_codes;
    }

    if ("premium_subscription_month_count" in data) {
      /** The number of months the Telegram Premium subscription won from the giveaway will be active for; for Telegram Premium giveaways only */
      this.subscriptionMonthCount = data.premium_subscription_month_count;
    }
  }

  /**
   * Return the timestamp winners of the giveaway will be selected, in milliseconds
   */
  get selectedTimestamp() {
    return this.selectedUnixTime * 1000;
  }

  /**
   * Point in time when winners of the giveaway will be selected
   * @type {Date}
   */
  get selectedAt() {
    return new Date(this.selectedTimestamp);
  }

  /**
   * Checks if this giveaway is equal to another giveaway.
   * @param {Giveaway} other - The other object to compare with.
   * @returns {boolean} True if both objects are instances of Giveaway and are equal based on key properties, otherwise false.
   */
  equals(other) {
    if (!other || !(other instanceof Giveaway)) return false;

    return Boolean(
      this.selectedUnixTime === other.selectedUnixTime &&
        this.winnerCount === other.winnerCount &&
        this.onlyNewMembers === other.onlyNewMembers &&
        this.publicWinners === other.publicWinners &&
        this.description === other.description &&
        this.starCount === other.starCount &&
        this.subscriptionMonthCount === other.subscriptionMonthCount &&
        this.countryCodes?.length === other.countryCodes?.length &&
        this.countryCodes?.every?.(
          (code, index) => code === other.countryCodes?.[index],
        ) &&
        this.chats.length === other.chats.length &&
        this.chats.every(
          (chat, index) =>
            other.chats[index] && chat.equals(other.chats[index]),
        ),
    );
  }
}

module.exports = { Giveaway };
