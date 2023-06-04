# Markup Class

The `Markup` class represents a button in the Telegram Bot API. It provides methods for creating and manipulating buttons.

## Constructor

### Markup(options = {})

Creates a new instance of the `Markup` class.

#### Parameters

- `options` (Object, optional): Button settings.
  - `text` (string, optional): Text on the button.
  - `action` (string, optional): Button action to be passed to the event handler.
  - `type` (string, optional): Button action type. The default is `'callback_data'`.
  - `remove_keyboard` (boolean, optional): Flag indicating whether to remove the inline markup.
  - `web_app` (boolean, optional): Flag indicating whether the button is for a web app.
  - `force_reply` (boolean, optional): Flag indicating whether to force a reply from the user.

#### Returns

- An instance of the `Markup` object.

## Methods

### setType(type)

Sets the button action type.

#### Parameters

- `type` (string): Button action type.

#### Returns

- An instance of the `Markup` object for method chaining.

### setAction(action)

Sets the button action.

#### Parameters

- `action` (string): Button action to be passed to the event handler.

#### Returns

- An instance of the `Markup` object for method chaining.

### setText(text)

Sets the text on the button.

#### Parameters

- `text` (string): Text on the button.

#### Returns

- An instance of the `Markup` object for method chaining.

### setWebApp(url)

Sets the URL for the web app.

#### Parameters

- `url` (string): The URL of the web app.

#### Returns

- The current object instance for chaining.

### setForceReply(forceReply)

Sets the `force_reply` option for the reply keyboard.

#### Parameters

- `forceReply` (boolean): Indicates whether to enable the force reply feature.

#### Returns

- The modified instance of the object.

### toJSON()

Returns the button object in the format expected by the Telegram Bot API.

#### Returns

- The button object in the format expected by the Telegram Bot API.

### toString()

Returns the text representation of the button object in the format expected by the Telegram Bot API.

#### Returns

- The text representation of the button object in the format expected by the Telegram Bot API.

## Static Methods

### setRemove(remove = false)

Sets the `remove_keyboard` option to remove the keyboard after the user presses a button.

#### Parameters

- `remove` (boolean, optional): Whether the keyboard should be removed after the user presses a button. The default is `false`.

#### Returns

- A JSON string with the `remove_keyboard` option set to `true`.

### fromJSON(buttonObj)

Creates a new `Markup` object from a button object in the format expected by the Telegram Bot API.

#### Parameters

- `buttonObj` (object): Button object in the format expected by the Telegram Bot API.

#### Returns

- An instance of the `Markup` object.

### inlineKeyboard(buttons)

Returns the inline keyboard object in the format expected by the Telegram Bot API.

#### Parameters

- `buttons` (Array): A 2-dimensional array of `Markup` objects representing the buttons on the keyboard.

#### Returns

- The inline keyboard object in the format expected by the Telegram Bot API.

### addMarkupArray(arrayMarkup, arrayLength = 10)

Generates a JSON string representing a reply markup object with an inline keyboard.

#### Parameters

- `arrayMarkup` (Array): An array containing elements of the markup.
- `arrayLength` (number, optional): The desired length of the markup array

. Defaults to 10.

#### Returns

- A JSON string representing the reply markup object.

## Example Usage

```javascript
const Markup = require('./Markup');

// Create a new Markup object
const button = new Markup()
  .setText('Click Me')
  .setAction('button_click')
  .setType('callback_data');

// Get the button object in the format expected by Telegram Bot API
const buttonObject = button.toJSON();

console.log(buttonObject);
// Output: { text: 'Click Me', callback_data: 'button_click' }

// Get the JSON string representation of the button object
const buttonString = button.toString();

console.log(buttonString);
// Output: '{"text":"Click Me","callback_data":"button_click"}'

// Set the remove_keyboard option
const removeKeyboard = Markup.setRemove(true);

console.log(removeKeyboard);
// Output: '{"remove_keyboard":true}'

// Create an inline keyboard
const buttons = [
  [button, button],
  [button, button],
];

const inlineKeyboard = Markup.inlineKeyboard(buttons);

console.log(inlineKeyboard);
// Output: '{"inline_keyboard":[[{"text":"Click Me","callback_data":"button_click"},{"text":"Click Me","callback_data":"button_click"}],[{"text":"Click Me","callback_data":"button_click"},{"text":"Click Me","callback_data":"button_click"}]]}'

// Generate a reply markup object with an inline keyboard
const replyMarkup = Markup.addMarkupArray(buttons);

console.log(replyMarkup);
// Output: '{"inline_keyboard":[[{"text":"Click Me","callback_data":"button_click"},{"text":"Click Me","callback_data":"button_click"}],[{"text":"Click Me","callback_data":"button_click"},{"text":"Click Me","callback_data":"button_click"}]]}'
```

This example demonstrates the usage of the `Markup` class for creating buttons and generating markup objects in the format expected by the Telegram Bot API.