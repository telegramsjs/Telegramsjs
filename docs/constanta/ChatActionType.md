## Object: ChatActionType

An object representing the available chat action types.

### Properties

#### Typing

Represents a typing action.

- Type: `string`

#### UploadPhoto

Represents an action for uploading a photo.

- Type: `string`

#### RecordVideo

Represents an action for recording a video.

- Type: `string`

#### UploadVideo

Represents an action for uploading a video.

- Type: `string`

#### RecordVoice

Represents an action for recording a voice message.

- Type: `string`

#### UploadVoice

Represents an action for uploading a voice message.

- Type: `string`

#### UploadDocument

Represents an action for uploading a document.

- Type: `string`

#### ChooseSticker

Represents an action for choosing a sticker.

- Type: `string`

#### FindLocation

Represents an action for finding a location.

- Type: `string`

#### RecordVideoNote

Represents an action for recording a video note.

- Type: `string`

#### UploadVideoNote

Represents an action for uploading a video note.

- Type: `string`

### Usage

The `ChatActionType` object provides a set of predefined action types that can be used in various Telegram chat-related operations.

Example:

```javascript
const { ChatActionType } = require('telegramsjs');

console.log(ChatActionType.Typing); // Output: "typing"
console.log(ChatActionType.UploadPhoto); // Output: "upload_photo"
// ...
```