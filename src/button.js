/**
 * Class representing a button in Telegram Bot API.
 * @class
 * @param {Object} [options={}] - Button settings.
 * @param {string} [options.text] - Text on the button.
 * @param {string} [options.action] - Button action to be passed to the event handler.
 * @param {string} [options.type='callback_data'] - Button action type. The default is 'callback_data'.
*/
class Button {
  constructor(options = {}) {
    this.text = options.text;
    this.action = options.action;
    this.type = options.type || 'callback_data';
  }

  /**
   * Sets the button action type.
   * @param {string} type - Button action type.
   * @returns {Button} Returns an instance of the Button object for method chaining.
   */
  setType(type) {
    this.type = type;
    return this;
  }
  
  /**
   * Sets the button action.
   * @param {string} action - Button action to be passed to the event handler.
   * @returns {Button} Returns an instance of the Button object for method chaining.
   */
  setAction(action) {
    this.action = action;
    return this;
  }
  
  /**
   * Sets the text on the button.
   * @param {string} text - Text on the button.
   * @returns {Button} Returns an instance of the Button object for method chaining.
*/
  setText(text) {
    this.text = text;
    return this;
  }
  
  /**
   * Creates a new Button object from a button object in the format expected by Telegram Bot API.
   * @param {Object} buttonObj - Button object in the format expected by Telegram Bot API.
   * @returns {Button} Returns an instance of the Button object.
   */
   static fromJSON(buttonObj) {
     const button = new Button()
        .setText(buttonObj.text)
        .setAction(buttonObj.action)
        .setType(buttonObj.type);
     return button;
   }

  
  /**
   * Returns the button object in the format expected by Telegram Bot API.
   * @returns {Object} Returns the button object in the format expected by Telegram Bot API.
   */
  toJSON() {
    const button = {
      text: this.text
    };
    button[this.type] = this.action;
    return button;
  }

  /**
   * Returns the text representation of the button object in the format expected by Telegram Bot API.
   * @returns {string} Returns the text representation of the button object in the format expected by Telegram Bot API.
   */
   toString() {
     return JSON.stringify(this.toJSON());
   }
}

module.exports = Button;