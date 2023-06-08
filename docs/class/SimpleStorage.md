## SimpleStorage

Represents a simple storage.

### Constructor

#### SimpleStorage(options)

Creates an instance of SimpleStorage.

- `options` (object, optional): The options for configuring the simple storage.
  - `options.path` (string, default: `"database"`): The path to the storage directory.
  - `options.table` (string[], default: `["main"]`): An array of table names.
  - `options.extname` (string, default: `".sql"`): The extension for storage files.
- Throws:
  - `ErrorTable` if the table array is invalid.
  - `ErrorExtension` if the extension is invalid.

### Methods

#### get(table, key)

Retrieves the value associated with the given key from the specified table.

- `table` (string): The name of the table.
- `key` (any): The key to retrieve the value for.
- Throws `ErrorTable` if the table name is invalid.
- Returns: `*` - The value associated with the key.

#### set(table, key, value)

Sets the value for the given key in the specified table.

- `table` (string): The name of the table.
- `key` (any): The key to set the value for.
- `value` (*): The value to set.
- Throws `ErrorTable` if the table name is invalid.

#### delete(table, key)

Deletes the value associated with the given key from the specified table.

- `table` (string): The name of the table.
- `key` (any): The key to delete.
- Throws `ErrorTable` if the table name is invalid.

#### has(table, key)

Checks if the specified table has a value associated with the given key.

- `table` (string): The name of the table.
- `key` (any): The key to check.
- Throws `ErrorTable` if the table name is invalid.
- Returns: `boolean` - `true` if the table has the key, `false` otherwise.

#### filter(table, callback)

Filters the values in the specified table based on the provided callback function.

- `table` (string): The name of the table.
- `callback` (function): The filter function.
- Throws `ErrorTable` if the table name is invalid.
- Returns: `object` - An object containing the filtered key-value pairs.

#### all(table)

Retrieves all the key-value pairs from the specified table.

- `table` (string): The name of the table.
- Throws `ErrorTable` if the table name is invalid.
- Returns: `object` - An object containing all the key-value pairs.

### Static Methods

None.