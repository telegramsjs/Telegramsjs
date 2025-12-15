// @ts-check
const { flatten } = require("../util/Utils");

/**
 * Represents a data model
 * @abstract
 */
class Base {
  /** @type {import("../client/TelegramClient").TelegramClient} */
  #apiClient;

  /**
   * @param {any} client - The client that instantiated this
   */
  constructor(client) {
    this.#apiClient = client;
  }

  /**
   * The client that instantiated this
   * @type {import("../client/TelegramClient").TelegramClient}
   */
  get client() {
    return this.#apiClient;
  }

  /**
   * Patches the current instance with new data
   * @param {Record<string, any>} data - The data to patch the instance with
   * @returns {Record<string, any>} The patched data
   */
  _patch(data) {
    return data;
  }

  /**
   * Creates a clone of the current instance
   * @returns {this} A clone of the current instance
   */
  _clone() {
    return Object.assign(Object.create(this), this);
  }

  /**
   * Updates the current instance with new data and returns a clone of the updated instance
   * @param {Record<string, any>} data - The data to update the instance with
   * @returns {this} A clone of the updated instance
   */
  _update(data) {
    const clone = this._clone();
    this._patch(data);
    return clone;
  }

  /**
   * Flatten an object. Any properties that are collections will get converted to an array of keys.
   * @param {boolean} [propsRecursive=false] - If true, calls toJSON method on nested objects.
   * @param {Record<string, boolean | string>[]} props - Specific properties to include/exclude, or rename.
   * @returns Flattened object.
   */
  toJSON(propsRecursive, ...props) {
    return flatten(this, propsRecursive, ...props);
  }

  /**
   * Returns the id instance Chat, User, ChatMember and other
   * @returns {string | null}
   */
  valueOf() {
    return "id" in this ? String(this.id) : null;
  }
}

module.exports = { Base };
