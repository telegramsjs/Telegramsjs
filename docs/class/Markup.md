## Markup

Represents a markup in the Telegram Bot API.

### Constructor

#### Markup(options)

Creates a new instance of the Markup class.

- `options` (object, optional): Button settings.
  - `options.text` (string): Text on the markup.
  - `options.action` (string): Button action to be passed to the event handler.
  - `options.type` (string, default: `'callback_data'`): Button action type.
  - `options.remove_keyboard` (boolean, default: `false`): Flag indicating whether to remove the inline markup.
  - `options.web_app` (object|string|boolean): Flag indicating whether the markup is for a web app.
  - `options.force_reply` (boolean): Flag indicating whether to force a reply from the user.

### Methods

#### setType(type)

Sets the markup action type.

- `type` (string): Button action type.
- Returns: `Markup` - Returns an instance of the Markup object for method chaining.

#### setAction(action)

Sets the markup action.

- `action` (string): Button action to be passed to the event handler.
- Returns: `Markup` - Returns an instance of the Markup object for method chaining.

#### setText(text)

Sets the text on the markup.

- `text` (string): Text on the markup.
- Returns: `Markup` - Returns an instance of the Markup object for method chaining.

#### setWebApp(url)

Sets the URL for the web app.

- `url` (object|string|boolean): The URL of the web app.
- Returns: `Markup` - Returns the current object instance for chaining.

#### setForceReply(forceReply)

Sets the `force_reply` option for the reply keyboard.

- `forceReply` (boolean): Indicates whether to enable the force reply feature.
- Returns: `Markup` - Returns the modified instance of the object.

#### toJSON()

Returns the markup object in the format expected by Telegram Bot API.

- Returns: `object` - Returns the markup object in the format expected by Telegram Bot API.

#### toString()

Returns the text representation of the markup object in the format expected by Telegram Bot API.

- Returns: `string` - Returns the text representation of the markup object in the format expected by Telegram Bot API.

### Static Methods

#### setRemove(remove)

Set the `remove_keyboard` option to remove the keyboard after the user presses a markup.

- `remove` (boolean, default: `false`): Whether the keyboard should be removed after the user presses a markup.
- Returns: `string` - Returns a JSON string with the `remove_keyboard` option set to `true`.

#### fromJSON(markupObj)

Creates a new Button object from a markup object in the format expected by Telegram Bot API.

- `markupObj` (object): Button object in the format expected by Telegram Bot API.
- Returns: `Markup` - Returns an instance of the Markup object.

#### inlineKeyboard(markups)

Returns the inline keyboard object in the format expected by Telegram Bot API.

- `markups` (array): A 2-dimensional array of Markup objects representing the markups on the keyboard.
- Returns: `object` - Returns the inline keyboard object in the format expected by Telegram Bot API.

#### addMarkupArray(arrayMarkup, arrayLength)

Generates a JSON string representing a reply markup object with an inline keyboard.

- `arrayMarkup` (array): An array containing elements of the markup.
- `arrayLength` (number, default: `10`): The desired length of the markup array.
- Returns: `string` - Returns a JSON string representing the reply markup object.
