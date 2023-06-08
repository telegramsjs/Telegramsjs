## Object: ChatPermission

An object containing chat permissions.

### Properties

#### CanSendOtherMessages

Specifies if users can send other kinds of messages.

- Type: `string`

#### CanAddWebPagePreviews

Specifies if users can add web page previews to their messages.

- Type: `string`

#### CanSendMessages

Specifies if users can send text messages.

- Type: `string`

#### CanSendAudios

Specifies if users can send audio messages.

- Type: `string`

#### CanSendDocuments

Specifies if users can send document messages.

- Type: `string`

#### CanSendPhotos

Specifies if users can send photo messages.

- Type: `string`

#### CanSendVideos

Specifies if users can send video messages.

- Type: `string`

#### CanSendVideoNotes

Specifies if users can send video note messages.

- Type: `string`

#### CanSendVoiceNotes

Specifies if users can send voice note messages.

- Type: `string`

#### CanSendPolls

Specifies if users can send polls.

- Type: `string`

### Usage

The `ChatPermission` object provides a set of predefined permissions that define the capabilities of users in a chat.

Example:

```javascript
const { ChatPermission } = require('telegramsjs');

console.log(ChatPermission.CanSendMessages); // Output: "can_send_messages"
console.log(ChatPermission.CanSendPhotos); // Output: "can_send_photos"
// ...
```