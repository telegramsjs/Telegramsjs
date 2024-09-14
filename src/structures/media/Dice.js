// @ts-check
class Dice {
  /**
   * @param {import("@telegram.ts/types").Dice} data - Data about the represents an animated emoji that displays a random value
   */
  constructor(data) {
    /** Emoji on which the dice throw animation is based */
    this.emoji = data.emoji;

    /** Value of the dice, 1-6 for "🎲", "🎯" and "🎳" base emoji, 1-5 for "🏀" and "⚽" base emoji, 1-64 for "🎰" base Emoji*/
    this.value = data.value;
  }
}

module.exports = { Dice };
