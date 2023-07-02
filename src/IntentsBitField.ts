import { BitFieldError } from "./errorcollection";
import { IntentBits } from "./constanta/IntentBits";
import { TelegramIntentBits } from "./constanta/TelegramIntentBits";

/**
 * @class IntentsBitField
 * @classdesc Represents a bit field for Telegram intents.
 */
export class IntentsBitField {
  private bits: number;

  constructor(bits = 0) {
    this.bits = bits;
  }

  /**
   * Adds one or more bits to the bit field.
   * @param {...number} ints - The bits to add to the bit field.
   * @returns {IntentsBitField} The updated IntentsBitField instance.
   * @throws {BitFieldError} If a specified bit is not a number.
   */
  add(...ints: number[]): IntentsBitField {
    const filter = ints.filter((i) => {
      if (typeof i !== "number") {
        throw new BitFieldError(`specified "${i}" is not correct`);
      }
    });
    for (const i of ints) {
      this.bits |= i;
    }
    return this;
  }

  /**
   * Removes one or more Telegram intents from the bitfield.
   * @param {...number} ints - The bits that represent the Telegram intents to be removed.
   * @returns {IntentsBitField} - The IntentsBitField instance.
   * @throws {BitFieldError} - If an invalid argument is passed.
   */
  remove(...ints: number[]): IntentsBitField {
    const filter = ints.filter((i) => {
      if (typeof i !== "number") {
        throw new BitFieldError(`specified "${i}" is not correct`);
      }
    });
    for (const i of ints) {
      this.bits &= ~i;
    }
    return this;
  }

  /**
   * Returns the bitfield as a number.
   * @returns {number} - The bitfield.
   */
  serialize(): number {
    return this.bits;
  }

  /**
   * Returns an array of intent strings based on the current bit value
   * @method toArray
   * @returns {string[]} - Array of intent strings
   */
  toArray(): string[] {
    const arr: string[] = [];
    for (const [flag, bit] of Object.entries(IntentBits)) {
      if (this.has(bit)) {
        const intent = TelegramIntentBits[
          flag as keyof typeof TelegramIntentBits
        ].replace(/_/g, "_");
        arr.push(intent);
      }
    }
    return arr;
  }

  /**
   * Checks if the bit field has a specific bit set
   * @method has
   * @param {number} bit - Bit to check
   * @returns {boolean} - True if the bit is set, false otherwise
   */
  has(bit: number): boolean {
    return (this.bits & bit) === bit;
  }
}

/**
 * Decodes a bit field instance and returns an array of intent strings
 * @function decodeIntents
 * @param {IntentsBitField} intentsBitField - Bit field instance to decode
 * @returns {string[]} - Array of intent strings
 */
export function decodeIntents(intentsBitField: IntentsBitField): string[] {
  const botIntents: string[] = [];
  for (const [flag, bit] of Object.entries(IntentBits)) {
    if (intentsBitField?.has(bit)) {
      const intent = TelegramIntentBits[
        flag as keyof typeof TelegramIntentBits
      ].replace(/_/g, "_");
      botIntents.push(intent);
    }
  }
  return botIntents;
}
