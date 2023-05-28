export = SimpleStorage;
/**
 * Class representing a simple storage.
 */
declare class SimpleStorage {
    /**
     * Creates an instance of SimpleStorage.
     * @param {Object} [options={}] - The options for configuring the simple storage.
     * @param {string} [options.path="database"] - The path to the storage directory.
     * @param {string[]} [options.table=["main"]] - An array of table names.
     * @param {string} [options.extname=".sql"] - The extension for storage files.
     * @throws {ErrorTable} Throws an error if the table array is invalid.
     * @throws {ErrorExtension} Throws an error if the extension is invalid.
     */
    constructor(options?: {
        path?: string;
        table?: string[];
        extname?: string;
    });
    path: string;
    table: string[];
    extname: string;
    /**
     * Retrieves the value associated with the given key from the specified table.
     * @param {string} table - The name of the table.
     * @param {any} key - The key to retrieve the value for.
     * @throws {ErrorTable} Throws an error if the table name is invalid.
     * @returns {*} The value associated with the key.
     */
    get(table: string, key: any): any;
    /**
     * Sets the value for the given key in the specified table.
     * @param {string} table - The name of the table.
     * @param {any} key - The key to set the value for.
     * @param {*} value - The value to set.
     * @throws {ErrorTable} Throws an error if the table name is invalid.
     */
    set(table: string, key: any, value: any): void;
    /**
     * Deletes the value associated with the given key from the specified table.
     * @param {string} table - The name of the table.
     * @param {any} key - The key to delete.
     * @throws {ErrorTable} Throws an error if the table name is invalid.
     */
    delete(table: string, key: any): void;
    /**
     * Checks if the specified table has a value associated with the given key.
     * @param {string} table - The name of the table.
     * @param {any} key - The key to check.
     * @throws {ErrorTable} Throws an error if the table name is invalid.
     * @returns {boolean} `true` if the table has the key, `false` otherwise.
     */
    has(table: string, key: any): boolean;
    /**
     * Filters the values in the specified table based on the provided callback function.
     * @param {string} table - The name of the table.
     * @param {function} callback - The filter function.
     * @throws {ErrorTable} Throws an error if the table name is invalid.
     * @returns {object} An object containing the filtered key-value pairs.
     */
    filter(table: string, callback: Function): object;
    /**
     * Retrieves all the key-value pairs from the specified table.
     * @param {string} table - The name of the table.
     * @throws {ErrorTable} Throws an error if the table name is invalid.
     * @returns {object} An object containing all the key-value pairs.
     */
    all(table: string): object;
}
