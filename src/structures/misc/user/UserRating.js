// @ts-check

class UserRating {
  /**
   * @param {import("@telegram.ts/types").UserRating} data - Data about the rating of a user based on their Telegram Star spendings.
   */
  constructor(data) {
    /** Current level of the user, indicating their reliability when purchasing digital goods and services. A higher level suggests a more trustworthy customer; a negative level is likely reason for concern. */
    this.level = data.level;

    /** Numerical value of the user's rating; the higher the rating, the better */
    this.rating = data.rating;

    /** The rating value required to get the current level */
    this.currentLevel = data.current_level_rating;

    if ("next_level_rating" in data) {
      /** The rating value required to get to the next level; omitted if the maximum level was reached */
      this.nextLevel = data.next_level_rating;
    }
  }

  /**
   * Checks if this UserRating is equal to another UserRating.
   * @param {UserRating} other - The other object to compare with.
   * @returns {boolean} True if both objects are instances of UserRating and are equal based on key properties, otherwise false.
   */
  equals(other) {
    if (!other || !(other instanceof UserRating)) return false;

    return (
      this.level === other.level &&
      this.rating === other.rating &&
      this.currentLevel === other.currentLevel &&
      this.nextLevel === other.nextLevel
    );
  }
}

module.exports = { UserRating };
