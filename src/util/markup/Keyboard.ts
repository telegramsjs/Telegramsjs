import type {
  KeyboardButton,
  KeyboardButtonPollType,
  KeyboardButtonRequestChat,
  KeyboardButtonRequestUsers,
} from "@telegram.ts/types";

/**
 * Represents a custom keyboard for Telegram bots.
 */
class Keyboard {
  /**
   * Indicates whether the keyboard is persistent.
   */
  public is_persistent: boolean = false;

  /**
   * Indicates whether the keyboard is selective.
   */
  public selective: boolean = false;

  /**
   * Indicates whether the keyboard is a one-time keyboard.
   */
  public one_time_keyboard: boolean = false;

  /**
   * Indicates whether the keyboard should be resized.
   */
  public resize_keyboard: boolean = false;

  /**
   * The placeholder text for the input field.
   */
  public input_field_placeholder?: string;

  /**
   * Creates an instance of Keyboard.
   * @param keyboard - A 2D array of keyboard buttons.
   */
  constructor(public readonly keyboard: KeyboardButton[][] = [[]]) {}

  /**
   * Adds buttons to the last row of the keyboard.
   * @param buttons - The buttons to add.
   * @returns The current instance for chaining.
   */
  add(...buttons: KeyboardButton[]): this {
    this.keyboard[this.keyboard.length - 1]?.push(...buttons);
    return this;
  }

  /**
   * Adds a new row of buttons to the keyboard.
   * @param buttons - The buttons to add.
   * @returns The current instance for chaining.
   */
  row(...buttons: KeyboardButton[]): this {
    this.keyboard.push(buttons);
    return this;
  }

  /**
   * Adds a text button to the keyboard.
   * @param text - The button text.
   * @returns The current instance for chaining.
   */
  text(text: string): this {
    return this.add(Keyboard.text(text));
  }

  /**
   * Creates a text button.
   * @param text - The button text.
   * @returns The created text button.
   */
  static text(text: string): KeyboardButton.CommonButton {
    return { text };
  }

  /**
   * Adds a request users button to the keyboard.
   * @param text - The button text.
   * @param requestId - The request ID.
   * @param options - Additional options for the button.
   * @returns The current instance for chaining.
   */
  requestUsers(
    text: string,
    requestId: number,
    options: Omit<KeyboardButtonRequestUsers, "request_id"> = {},
  ): this {
    return this.add(Keyboard.requestUsers(text, requestId, options));
  }

  /**
   * Creates a request users button.
   * @param text - The button text.
   * @param requestId - The request ID.
   * @param options - Additional options for the button.
   * @returns The created request users button.
   */
  static requestUsers(
    text: string,
    requestId: number,
    options: Omit<KeyboardButtonRequestUsers, "request_id"> = {},
  ): KeyboardButton.RequestUsersButton {
    return { text, request_users: { request_id: requestId, ...options } };
  }

  /**
   * Adds a request chat button to the keyboard.
   * @param text - The button text.
   * @param requestId - The request ID.
   * @param options - Additional options for the button.
   * @returns The current instance for chaining.
   */
  requestChat(
    text: string,
    requestId: number,
    options: Omit<KeyboardButtonRequestChat, "request_id"> = {
      chat_is_channel: false,
    },
  ): this {
    return this.add(Keyboard.requestChat(text, requestId, options));
  }

  /**
   * Creates a request chat button.
   * @param text - The button text.
   * @param requestId - The request ID.
   * @param options - Additional options for the button.
   * @returns The created request chat button.
   */
  static requestChat(
    text: string,
    requestId: number,
    options: Omit<KeyboardButtonRequestChat, "request_id"> = {
      chat_is_channel: false,
    },
  ): KeyboardButton.RequestChatButton {
    return { text, request_chat: { request_id: requestId, ...options } };
  }

  /**
   * Adds a request contact button to the keyboard.
   * @param text - The button text.
   * @returns The current instance for chaining.
   */
  requestContact(text: string): this {
    return this.add(Keyboard.requestContact(text));
  }

  /**
   * Creates a request contact button.
   * @param text - The button text.
   * @returns The created request contact button.
   */
  static requestContact(text: string): KeyboardButton.RequestContactButton {
    return { text, request_contact: true };
  }

  /**
   * Adds a request location button to the keyboard.
   * @param text - The button text.
   * @returns The current instance for chaining.
   */
  requestLocation(text: string): this {
    return this.add(Keyboard.requestLocation(text));
  }

  /**
   * Creates a request location button.
   * @param text - The button text.
   * @returns The created request location button.
   */
  static requestLocation(text: string): KeyboardButton.RequestLocationButton {
    return { text, request_location: true };
  }

  /**
   * Adds a request poll button to the keyboard.
   * @param text - The button text.
   * @param type - The type of the poll button.
   * @returns The current instance for chaining.
   */
  requestPoll(text: string, type?: KeyboardButtonPollType["type"]): this {
    return this.add(Keyboard.requestPoll(text, type));
  }

  /**
   * Creates a request poll button.
   * @param text - The button text.
   * @param type - The type of the poll button.
   * @returns The created request poll button.
   */
  static requestPoll(
    text: string,
    type: KeyboardButtonPollType["type"] = "regular",
  ): KeyboardButton.RequestPollButton {
    return { text, request_poll: { type } };
  }

  /**
   * Adds a web app button to the keyboard.
   * @param text - The button text.
   * @param url - The URL of the web app.
   * @returns The current instance for chaining.
   */
  webApp(text: string, url: string): this {
    return this.add(Keyboard.webApp(text, url));
  }

  /**
   * Creates a web app button.
   * @param text - The button text.
   * @param url - The URL of the web app.
   * @returns The created web app button.
   */
  static webApp(text: string, url: string): KeyboardButton.WebAppButton {
    return { text, web_app: { url } };
  }

  /**
   * Sets the keyboard as persistent or not.
   * @param isEnabled - Indicates whether the keyboard should be persistent.
   * @returns The current instance for chaining.
   */
  persistent(isEnabled = true): this {
    this.is_persistent = isEnabled;
    return this;
  }

  /**
   * Sets the keyboard as selective or not.
   * @param isEnabled - Indicates whether the keyboard should be selective.
   * @returns The current instance for chaining.
   */
  selected(isEnabled = true): this {
    this.selective = isEnabled;
    return this;
  }

  /**
   * Sets the keyboard as a one-time keyboard or not.
   * @param isEnabled - Indicates whether the keyboard should be a one-time keyboard.
   * @returns The current instance for chaining.
   */
  oneTime(isEnabled = true): this {
    this.one_time_keyboard = isEnabled;
    return this;
  }

  /**
   * Sets the keyboard to be resized or not.
   * @param isEnabled - Indicates whether the keyboard should be resized.
   * @returns The current instance for chaining.
   */
  resized(isEnabled = true): this {
    this.resize_keyboard = isEnabled;
    return this;
  }

  /**
   * Sets the placeholder text for the input field.
   * @param value - The placeholder text.
   * @returns The current instance for chaining.
   */
  placeholder(value: string): this {
    this.input_field_placeholder = value;
    return this;
  }

  /**
   * Creates a deep copy of the current Keyboard instance.
   * @returns A new instance of Keyboard with the same buttons and properties.
   */
  clone(keyboard: KeyboardButton[][] = this.keyboard): Keyboard {
    const clone = new Keyboard(keyboard.map((row) => row.slice()));
    clone.is_persistent = this.is_persistent;
    clone.selective = this.selective;
    clone.one_time_keyboard = this.one_time_keyboard;
    clone.resize_keyboard = this.resize_keyboard;
    if (this.input_field_placeholder) {
      clone.input_field_placeholder = this.input_field_placeholder;
    }
    return clone;
  }

  /**
   * Builds the keyboard structure.
   * @returns The built keyboard structure.
   */
  build(): KeyboardButton[][] {
    return this.keyboard;
  }

  /**
   * Creates a Keyboard instance from another instance or a 2D array of buttons.
   * @param source - The source Keyboard instance or 2D array of buttons.
   * @returns A new instance of Keyboard.
   */
  static from(source: (string | KeyboardButton)[][] | Keyboard): Keyboard {
    if (source instanceof Keyboard) return source.clone();
    function toButton(btn: string | KeyboardButton) {
      return typeof btn === "string" ? Keyboard.text(btn) : btn;
    }
    return new Keyboard(source.map((row) => row.map(toButton)));
  }

  /**
   * Checks if this keyboard is equal to another keyboard.
   * @param {Keyboard} other - The other keyboard to compare with.
   * @returns {boolean} True if both keyboards are equal based on their structure and properties, otherwise false.
   */
  equals(other: Keyboard): boolean {
    if (!other || !(other instanceof Keyboard)) return false;

    if (this.keyboard.length !== other.keyboard.length) return false;

    for (let i = 0; i < this.keyboard.length; i++) {
      const row = this.keyboard[i];
      const otherRow = other.keyboard[i];

      if (!row || !otherRow || row.length !== otherRow.length) return false;

      for (let j = 0; j < row.length; j++) {
        const buttonA = row[j];
        const buttonB = otherRow[j];

        if (buttonA === undefined || buttonB === undefined) return false;

        if (typeof buttonA === "string" && typeof buttonB === "string") {
          if (buttonA !== buttonB) return false;
        } else if (typeof buttonA === "object" && typeof buttonB === "object") {
          if ("text" in buttonA && "text" in buttonB) {
            if (buttonA.text !== buttonB.text) return false;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    }

    return true;
  }
}

export { Keyboard };
