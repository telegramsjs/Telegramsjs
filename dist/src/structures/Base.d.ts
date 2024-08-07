/**
 * Represents a data model
 * @abstract
 */
export class Base {
    /**
     * @public
     * @param {import("../client/TelegramClient").TelegramClient} client - The client that instantiated this
     */
    constructor(client: import("../client/TelegramClient").TelegramClient);
    /**
     * The client that instantiated this
     * @type {import("../client/TelegramClient").TelegramClient}
     */
    get client(): import("../client/TelegramClient").TelegramClient;
    /**
     * Patches the current instance with new data
     * @param {Record<string, any>} data - The data to patch the instance with
     * @returns {Record<string, any>} The patched data
     * @protected
     */
    protected _patch(data: Record<string, any>): Record<string, any>;
    /**
     * Creates a clone of the current instance
     * @returns {Base} A clone of the current instance
     * @protected
     */
    protected _clone(): Base;
    /**
     * Updates the current instance with new data and returns a clone of the updated instance
     * @param {Record<string, any>} data - The data to update the instance with
     * @returns {Base} A clone of the updated instance
     * @protected
     */
    protected _update(data: Record<string, any>): Base;
    /**
     * Returns the primitive value of the instance
     * @returns {number | null} The primitive value of the instance
     */
    valueOf(): number | null;
}
//# sourceMappingURL=Base.d.ts.map