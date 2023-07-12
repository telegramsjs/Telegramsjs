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
   * ```ts
   * import { IntentsBitField, IntentBits } from "telegramsjs";
   *
   * const intents = new IntentsBitField();
   *
   * intents.add(
   *  IntentBits.Message,
   *  IntentBits.EditedMessage
   * );
   *
   * console.log(intents.serialize());  // Output: 3
   * ```
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
   * ```ts
   * import { IntentsBitField } from "telegramsjs";
   *
   * const intents = new IntentsBitField(7);
   * intents.remove(2, 4);
   *
   * console.log(intents.serialize()); // Output: 1
   * ```
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
   * ```ts
   * import { IntentsBitField } from "telegramsjs";
   * const intents = new IntentsBitField(7);
   * console.log(intents.serialize()); // Output: 7
   * ```
   * @returns {number} - The bitfield.
   */
  serialize(): number {
    return this.bits;
  }

  /**
   * Returns an array of intent strings based on the current bit value
   * ```ts
   * import { IntentsBitField, IntentBits } from "telegramsjs";
   *
   * const intents = new IntentsBitField();
   * intents.add(
   *  IntentBits.Message,
   *  IntentBits.EditedMessage
   * );
   * console.log(intents.toArray()) // Output: [ 'message', 'edited_message' ]
   * ```
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
   * ```ts
   * import { IntentsBitField, IntentBits } from "telegramsjs";
   * const intents = new IntentsBitField();
   * intents.add(
   *  IntentBits.Message,
   *  IntentBits.EditedMessage
   * );
   *
   * console.log(intents.has(IntentBits.Message)); // Output: true
   * console.log(intents.has("test")); // Output: false
   * ```
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
 * ```ts
 * import { decodeIntents, IntentBits, IntentsBitField } from "telegramsjs";
 *
 * const intents = new IntentsBitField()
 *    .add(IntentBits.Message);
 *
 * console.log(decodeIntents(intents)); // Output: ['message']
 * console.log(decodeIntents(new IntentsBitField()); // Output: []
 * ```
 * @function decodeIntents
 * @param {IntentsBitField} intentsBitField - Bit field instance to decode
 * @returns {string[]} - Array of intent strings
 */
export function decodeIntents(intentsBitField: IntentsBitField): string[] {
  const botIntents: string[] = [];
  try {
    for (const [flag, bit] of Object.entries(IntentBits)) {
      if (intentsBitField?.has(bit)) {
        const intent = TelegramIntentBits[
          flag as keyof typeof TelegramIntentBits
        ].replace(/_/g, "_");
        botIntents.push(intent);
      }
    }
  } catch (error) {
    return botIntents;
  }
  return botIntents;
}
