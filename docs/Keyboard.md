# Keyboard Class

The `Keyboard` class represents a keyboard in the Telegram Bot API. It provides methods for creating and manipulating keyboards.

## Constructor

### Keyboard(buttons, options = {})

Creates a new instance of the `Keyboard` class.

#### Parameters

- `buttons` (Array): A 2-dimensional array of `Button` objects representing the buttons on the keyboard.
- `options` (Object, optional): Additional options for the keyboard.
  - `inline` (boolean, optional): Whether the keyboard is an inline keyboard. Default is `false`.
  - `resize` (boolean, optional): Whether the keyboard should be resized to fit the user's screen. Default is `false`.
  - `oneTime` (boolean, optional): Whether the keyboard should disappear after the user presses a button. Default is `false`.
  - `selective` (boolean, optional): Whether the keyboard should be shown only to specific users. Default is `false`.

#### Returns

- An instance of the `Keyboard` object.

## Methods

### toJSON()

Returns the keyboard object in the format expected by the Telegram Bot API.

#### Returns

- The keyboard object in the format expected by the Telegram Bot API.

### setInline(inline)

Sets the `inline` option of the keyboard.

#### Parameters

- `inline` (boolean): Whether the keyboard should be displayed inline with the message.

#### Returns

- The updated `Keyboard` object.

### setResize(resize)

Sets the `resize` option for the keyboard.

#### Parameters

- `resize` (boolean): Whether the keyboard should be resized to fit the user's screen.

#### Returns

- The current `Keyboard` object for chaining.

### setOneTime(oneTime)

Sets whether the keyboard should disappear after the user presses a button.

#### Parameters

- `oneTime` (boolean): Whether the keyboard should disappear after the user presses a button.

#### Returns

- The `Keyboard` object.

### setSelective(selective)

Sets the `selective` option for the keyboard.

#### Parameters

- `selective` (boolean): Whether the keyboard should be shown only to specific users.

#### Returns

- The `Keyboard` object with the `selective` option set.

### addKeyboard(...buttonRows)

Adds buttons to the keyboard buttons array.

#### Parameters

- `buttonRows` (any): One or more button rows to add to the keyboard.

#### Returns

- The updated `Keyboard` object.

## Example Usage

```javascript
const Keyboard = require('telegramsjs');

// Create a new Keyboard object with buttons
const buttons = [
  [{ text: 'Button 1' }, { text: 'Button 2' }],
  [{ text: 'Button 3' }],
];

const keyboard = new Keyboard(buttons, {
  inline: true,
  resize: true,
  oneTime: true,
  selective: false,
});

// Get the keyboard object in the format expected by Telegram Bot API
const keyboardObject = keyboard.toJSON();

console.log(keyboardObject);
// Output: {"keyboard":[[{"text":"Button 1"},{"text":"Button 2"}],[{"text":"Button 3"}]],"resize_keyboard":true,"one_time_keyboard":true,"selective":false}

// Set the inline option of the keyboard
keyboard.setInline(false);

// Set the resize option for the keyboard
keyboard.setResize(false);

// Set whether the keyboard should disappear after the user presses a button
keyboard.setOneTime(false);

// Set the selective option for the keyboard
keyboard.setSelective(true);

// Add additional button rows to the keyboard
keyboard.addKeyboard([{ text: 'Button 4' }, { text: 'Button 5' }]);

// Get the updated keyboard object


const updatedKeyboardObject = keyboard.toJSON();

console.log(updatedKeyboardObject);
// Output: {"keyboard":[[{"text":"Button 1"},{"text":"Button 2"}],[{"text":"Button 3"}],[{"text":"Button 4"},{"text":"Button 5"}]],"resize_keyboard":false,"one_time_keyboard":false,"selective":true}
```

This example demonstrates the usage of the `Keyboard` class for creating and manipulating keyboards in the Telegram Bot API.