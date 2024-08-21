// @ts-check
const { ReactionType } = require("./ReactionType");

class ReactionCount {
  /**
   * @param {import("@telegram.ts/types").ReactionCount} data - Data about the eepresents a reaction added to a message along with the number of times it was added
   */
  constructor(data) {
    /** Number of times the reaction was added */
    this.totalCount = data.total_count;

    /** Type of the reaction */
    this.type = new ReactionType(data.type);
  }
}

module.exports = { ReactionCount };
