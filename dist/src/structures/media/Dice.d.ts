export class Dice {
    /**
     * @param {import("@telegram.ts/types").Dice} data - Data about the represents an animated emoji that displays a random value
     */
    constructor(data: import("@telegram.ts/types").Dice);
    /** Emoji on which the dice throw animation is based */
    emoji: string;
    /** Value of the dice, 1-6 for "🎲", "🎯" and "🎳" base emoji, 1-5 for "🏀" and "⚽" base emoji, 1-64 for "🎰" base Emoji*/
    value: number;
}
//# sourceMappingURL=Dice.d.ts.map