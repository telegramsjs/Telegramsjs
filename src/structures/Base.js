const ClientSymbol = Symbol("Client");

/**
 * Represents a data model
 * @abstract
 */
class Base {
  /**
   * @public
   * @param {import("../client/TelegramClient").TelegramClient} client - The client that instantiated this
   */
  constructor(client) {
    /**
     * The client that instantiated this
     * @type {import("../client/TelegramClient").TelegramClient}
     */
    Object.defineProperty(this, ClientSymbol, { value: client });
  }

  /**
   * The client that instantiated this
   * @type {import("../client/TelegramClient").TelegramClient}
   */
  get client() {
    return this[ClientSymbol];
  }

  /**
   * Patches the current instance with new data
   * @param {Record<string, any>} data - The data to patch the instance with
   * @returns {Record<string, any>} The patched data
   * @protected
   */
  _patch(data) {
    return data;
  }

  /**
   * Creates a clone of the current instance
   * @returns {Base} A clone of the current instance
   * @protected
   */
  _clone() {
    return Object.assign(Object.create(this), this);
  }

  /**
   * Updates the current instance with new data and returns a clone of the updated instance
   * @param {Record<string, any>} data - The data to update the instance with
   * @returns {Base} A clone of the updated instance
   * @protected
   */
  _update(data) {
    const clone = this._clone();
    this._patch(data);
    return clone;
  }

  /**
   * Returns the primitive value of the instance
   * @returns {string | null} The primitive value of the instance
   */
  valueOf() {
    return this.id || null;
  }
}

module.exports = { Base };
