## Class: Keyboard

Represents a keyboard in the Telegram Bot API.

### Constructor

#### Keyboard(markups, options)

Creates a new Keyboard object.

- `markups` (array): A 2-dimensional array of Button objects representing the markups on the keyboard.
- `options` (object, optional): Additional options for the keyboard.
  - `options.inline` (boolean, default: `false`): Whether the keyboard is an inline keyboard.
  - `options.resize` (boolean, default: `false`): Whether the keyboard should be resized to fit the user's screen.
  - `options.oneTime` (boolean, default: `false`): Whether the keyboard should disappear after the user presses a markup.
  - `options.selective` (boolean, default: `false`): Whether the keyboard should be shown only to specific users.

### Methods

#### toJSON()

Returns the keyboard object in the format expected by Telegram Bot API.

- Returns: `object` - Returns the keyboard object in the format expected by Telegram Bot API.

#### setInline(inline)

Sets the inline option of the keyboard.

- `inline` (boolean): Whether the keyboard should be displayed inline with the message.
- Returns: `Keyboard` - Returns the updated Keyboard object.

#### setResize(resize)

Sets the `resize` option for the keyboard.

- `resize` (boolean): Whether the keyboard should be resized to fit the user's screen.
- Returns: `Keyboard` - Returns the current Keyboard object for chaining.

#### setOneTime(oneTime)

Sets whether the keyboard should disappear after the user presses a markup.

- `oneTime` (boolean): Whether the keyboard should disappear after the user presses a markup.
- Returns: `Keyboard` - Returns the Keyboard object.

#### setSelective(selective)

Set the `selective` option for the keyboard.

- `selective` (boolean): Whether the keyboard should be shown only to specific users.
- Returns: `Keyboard` - Returns the Keyboard object with the `selective` option set.

#### addKeyboard(markupRows, defaults)

Adds markups to the keyboard markups array.

- `markupRows` (...any): One or more markup rows to add to the keyboard.
- `defaults` (boolean, default: `false`): Specifies whether to use default values for the markups.
- Returns: `Keyboard` - Returns the updated Keyboard object.

### Static Methods

None.