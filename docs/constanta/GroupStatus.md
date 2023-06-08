## Object: GroupStatus

Enum representing the status of a group member.

### Values

- `Administrator`: The user is an administrator of the group.
- `Left`: The user has left the group.
- `Member`: The user is a regular member of the group.
- `Creator`: The user is the creator of the group.

### Usage

The `GroupStatus` enum provides predefined constants representing the status of a group member in Telegram.

Example:

```javascript
const { GroupStatus } = require('telegramsjs');

console.log(GroupStatus.Administrator); // Output: "administrator"
console.log(GroupStatus.Left); // Output: "left"
// ...
```