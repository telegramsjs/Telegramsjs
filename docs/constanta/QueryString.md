## Object: QueryString

An object representing common query string formats.

### Properties

- `Multipart`: Represents the `multipart/form-data` format for query strings.
- `ApplicationJSON`: Represents the `application/json` format for query strings.
- `ApplicationUrlencoded`: Represents the `application/x-www-form-urlencoded` format for query strings.

### Usage

The `QueryString` object provides predefined formats for query strings that are commonly used in HTTP requests.

Example:

```javascript
const { QueryString } = require('telegramsjs');

// Send a request with a multipart form data query string
const multipartQueryString = QueryString.Multipart;
console.log(multipartQueryString); // Output: "multipart/form-data"

// Send a request with an application/json query string
const jsonQueryString = QueryString.ApplicationJSON;
console.log(jsonQueryString); // Output: "application/json"

// Send a request with an application/x-www-form-urlencoded query string
const urlencodedQueryString = QueryString.ApplicationUrlencoded;
console.log(urlencodedQueryString); // Output: "application/x-www-form-urlencoded"
```