## Object: GroupPermission

An object containing group permissions.

### Properties

- `CanManageChat`: Specifies if users can manage the group.
- `CanChangeInfo`: Specifies if users can change group information.
- `CanDeleteMessages`: Specifies if users can delete messages.
- `CanInviteUsers`: Specifies if users can invite other users to the group.
- `CanRestrictMembers`: Specifies if users can restrict group members.
- `CanPinMessages`: Specifies if users can pin messages.
- `CanManageTopics`: Specifies if users can manage group topics.
- `CanPromoteMembers`: Specifies if users can promote members.
- `CanManageVideoChats`: Specifies if users can manage video groups.
- `CanManageVoiceChats`: Specifies if users can manage voice groups.

### Usage

The `GroupPermission` object provides a set of predefined constants representing different permissions for groups in Telegram.

Example:

```javascript
const { GroupPermission } = require('telegramsjs');

console.log(GroupPermission.CanChangeInfo); // Output: "can_change_info"
console.log(GroupPermission.CanDeleteMessages); // Output: "can_delete_messages"
// ...
```