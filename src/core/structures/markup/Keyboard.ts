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
  public is_persistent?: boolean;

  /**
   * Indicates whether the keyboard is selective.
   */
  public selective?: boolean;

  /**
   * Indicates whether the keyboard is a one-time keyboard.
   */
  public one_time_keyboard?: boolean;

  /**
   * Indicates whether the keyboard should be resized.
   */
  public resize_keyboard?: boolean;

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
  add(...buttons: KeyboardButton[]) {
    this.keyboard[this.keyboard.length - 1]?.push(...buttons);
    return this;
  }

  /**
   * Adds a new row of buttons to the keyboard.
   * @param buttons - The buttons to add.
   * @returns The current instance for chaining.
   */
  row(...buttons: KeyboardButton[]) {
    this.keyboard.push(buttons);
    return this;
  }

  /**
   * Adds a text button to the keyboard.
   * @param text - The button text.
   * @returns The current instance for chaining.
   */
  text(text: string) {
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
  ) {
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
  ) {
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
  requestContact(text: string) {
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
  requestLocation(text: string) {
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
  requestPoll(text: string, type?: KeyboardButtonPollType["type"]) {
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
    type?: KeyboardButtonPollType["type"],
  ): KeyboardButton.RequestPollButton {
    return { text, request_poll: { type } };
  }

  /**
   * Adds a web app button to the keyboard.
   * @param text - The button text.
   * @param url - The URL of the web app.
   * @returns The current instance for chaining.
   */
  webApp(text: string, url: string) {
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
  persistent(isEnabled = true) {
    this.is_persistent = isEnabled;
    return this;
  }

  /**
   * Sets the keyboard as selective or not.
   * @param isEnabled - Indicates whether the keyboard should be selective.
   * @returns The current instance for chaining.
   */
  selected(isEnabled = true) {
    this.selective = isEnabled;
    return this;
  }

  /**
   * Sets the keyboard as a one-time keyboard or not.
   * @param isEnabled - Indicates whether the keyboard should be a one-time keyboard.
   * @returns The current instance for chaining.
   */
  oneTime(isEnabled = true) {
    this.one_time_keyboard = isEnabled;
    return this;
  }

  /**
   * Sets the keyboard to be resized or not.
   * @param isEnabled - Indicates whether the keyboard should be resized.
   * @returns The current instance for chaining.
   */
  resized(isEnabled = true) {
    this.resize_keyboard = isEnabled;
    return this;
  }

  /**
   * Sets the placeholder text for the input field.
   * @param value - The placeholder text.
   * @returns The current instance for chaining.
   */
  placeholder(value: string) {
    this.input_field_placeholder = value;
    return this;
  }

  /**
   * Creates a deep copy of the current Keyboard instance.
   * @returns A new instance of Keyboard with the same buttons and properties.
   */
  clone(keyboard: KeyboardButton[][] = this.keyboard) {
    const clone = new Keyboard(keyboard.map((row) => row.slice()));
    clone.is_persistent = this.is_persistent;
    clone.selective = this.selective;
    clone.one_time_keyboard = this.one_time_keyboard;
    clone.resize_keyboard = this.resize_keyboard;
    clone.input_field_placeholder = this.input_field_placeholder;
    return clone;
  }

  /**
   * Builds the keyboard structure.
   * @returns The built keyboard structure.
   */
  build() {
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
}

export { Keyboard };
