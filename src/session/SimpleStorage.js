const fs = require('fs');
const path = require('path');
const { ErrorTable, ErrorExtension } = require("../errorcollection.js");

/**
 * Retrieves the database object from the specified directory, table, and extension.
 * @param {string} dir - The directory where the storage is located.
 * @param {string} table - The name of the table.
 * @param {string} extname - The extension of the storage file.
 * @returns {*} The retrieved database object.
 */
const get = (dir, table, extname) => {
  let db = fs.readFileSync(path.join(process.cwd(), dir, table, "storage" + extname), "utf8");
  db = typeof db === "string" ? JSON.parse(db) : db;
  return db;
};

/**
 * Sets the database object in the specified directory, table, and extension.
 * @param {string} dir - The directory where the storage is located.
 * @param {string} table - The name of the table.
 * @param {*} db - The database object to set.
 * @param {string} extname - The extension of the storage file.
 */
const set = (dir, table, db, extname) => {
  let content = JSON.stringify(db);
  fs.writeFileSync(path.join(process.cwd(), dir, table, "storage" + extname), content);
};


/**
 * Class representing a simple storage.
 */
class SimpleStorage {
  /**
   * Creates an instance of SimpleStorage.
   * @param {Object} [options={}] - The options for configuring the simple storage.
   * @param {string} [options.path="database"] - The path to the storage directory.
   * @param {string[]} [options.table=["main"]] - An array of table names.
   * @param {string} [options.extname=".sql"] - The extension for storage files.
   * @throws {ErrorTable} Throws an error if the table array is invalid.
   * @throws {ErrorExtension} Throws an error if the extension is invalid.
   */
  constructor(options = {}) {
    this.path = options.path ?? "database";
    this.table = options.table ?? ["main"];
    this.extname = options.extname ?? ".sql";

    if (!fs.existsSync(path.join(process.cwd(), this.path))) {
      fs.mkdirSync(path.join(process.cwd(), this.path));
    }

    if (!Array.isArray(this.table)) {
      throw new ErrorTable("Invalid table array");
    }

    if (!this.extname) {
      throw new ErrorExtension("Invalid extension");
    }

    for (let i = 0; i < this.table.length; i++) {
      const tablePath = path.join(process.cwd(), this.path, this.table[i]);
      if (!fs.existsSync(tablePath)) {
        fs.mkdirSync(tablePath);
      }

      const storagePath = path.join(tablePath, `storage${this.extname}`);
      if (!fs.existsSync(storagePath)) {
        fs.writeFileSync(storagePath, "{}");
      }
    }
  }

  /**
   * Retrieves the value associated with the given key from the specified table.
   * @param {string} table - The name of the table.
   * @param {any} key - The key to retrieve the value for.
   * @throws {ErrorTable} Throws an error if the table name is invalid.
   * @returns {*} The value associated with the key.
   */
  get(table, key) {
    if (!this.table.includes(table)) {
      throw new ErrorTable("Invalid table name: " + table);
    }

    const db = get(this.path, table, this.extname);
    return db[key];
  }

  /**
   * Sets the value for the given key in the specified table.
   * @param {string} table - The name of the table.
   * @param {any} key - The key to set the value for.
   * @param {*} value - The value to set.
   * @throws {ErrorTable} Throws an error if the table name is invalid.
   */
  set(table, key, value) {
    if (!this.table.includes(table)) {
      throw new ErrorTable("Invalid table name: " + table);
    }

    const db = get(this.path, table, this.extname);
    db[key] = value;
    set(this.path, table, db, this.extname);
  }

  /**
   * Deletes the value associated with the given key from the specified table.
   * @param {string} table - The name of the table.
   * @param {any} key - The key to delete.
   * @throws {ErrorTable} Throws an error if the table name is invalid.
   */
  delete(table, key) {
    if (!this.table.includes(table)) {
      throw new ErrorTable("Invalid table name: " + table);
    }

    const db = get(this.path, table, this.extname);
    delete db[key];
    set(this.path, table, db, this.extname);
  }

  /**
   * Checks if the specified table has a value associated with the given key.
   * @param {string} table - The name of the table.
   * @param {any} key - The key to check.
   * @throws {ErrorTable} Throws an error if the table name is invalid.
   * @returns {boolean} `true` if the table has the key, `false` otherwise.
   */
  has(table, key) {
    if (!this.table.includes(table)) {
      throw new ErrorTable("Invalid table name: " + table);
    }

    const db = get(this.path, table, this.extname);
    return db.hasOwnProperty(key);
  }

  /**
   * Filters the values in the specified table based on the provided callback function.
   * @param {string} table - The name of the table.
   * @param {function} callback - The filter function.
   * @throws {ErrorTable} Throws an error if the table name is invalid.
   * @returns {object} An object containing the filtered key-value pairs.
   */
  filter(table, callback) {
    if (!this.table.includes(table)) {
      throw new ErrorTable("Invalid table name: " + table);
    }

    const db = get(this.path, table, this.extname);
    const result = {};
    for (const key in db) {
      if (callback(db[key], key, db)) {
        result[key] = db[key];
      }
    }
    return result;
  }

  /**
   * Retrieves all the key-value pairs from the specified table.
   * @param {string} table - The name of the table.
   * @throws {ErrorTable} Throws an error if the table name is invalid.
   * @returns {object} An object containing all the key-value pairs.
   */
  all(table) {
    if (!this.table.includes(table)) {
      throw new ErrorTable("Invalid table name: " + table);
    }

    return get(this.path, table, this.extname);
  }
}

module.exports = SimpleStorage;
