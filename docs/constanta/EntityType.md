## Object: EntityType

Object representing types of Telegram message entities.

### Properties

- `Mention`: A `@username` mention.
- `Hashtag`: A `#hashtag` mention.
- `Cashtag`: A `$cashtag` mention.
- `BotCommand`: A bot command mention.
- `URL`: A URL link.
- `Email`: An email link.
- `PhoneNumber`: A phone number link.
- `Bold`: Bold text.
- `Italic`: Italic text.
- `Underline`: Underlined text.
- `Strikethrough`: Strikethrough text.
- `Spoiler`: Spoiler text.
- `Code`: Monospace code text.
- `Pre`: Preformatted code block.
- `TextLink`: A clickable text URL link.
- `TextMention`: A mention of a user by their username.
- `CustomEmoji`: A custom emoji.

### Usage

The `EntityType` object provides a set of predefined constants representing different types of message entities in Telegram.

Example:

```javascript
const { EntityType } = require('telegramsjs');

console.log(EntityType.Mention); // Output: "mention"
console.log(EntityType.URL); // Output: "url"
// ...
```