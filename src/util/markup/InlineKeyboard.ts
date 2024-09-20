import type {
  InlineKeyboardButton,
  SwitchInlineQueryChosenChat,
  LoginUrl,
} from "@telegram.ts/types";

/**
 * Represents an inline keyboard for Telegram bots.
 */
class InlineKeyboard {
  /**
   * Creates an instance of InlineKeyboard.
   * @param inline_keyboard - A 2D array of inline keyboard buttons.
   */
  constructor(
    public readonly inline_keyboard: InlineKeyboardButton[][] = [[]],
  ) {}

  /**
   * Adds buttons to the last row of the inline keyboard.
   * @param buttons - The buttons to add.
   * @returns The current instance for chaining.
   */
  add(...buttons: InlineKeyboardButton[]): this {
    this.inline_keyboard[this.inline_keyboard.length - 1]?.push(...buttons);
    return this;
  }

  /**
   * Adds a new row of buttons to the inline keyboard.
   * @param buttons - The buttons to add.
   * @returns The current instance for chaining.
   */
  row(...buttons: InlineKeyboardButton[]): this {
    this.inline_keyboard.push(buttons);
    return this;
  }

  /**
   * Adds a URL button to the inline keyboard.
   * @param text - The button text.
   * @param url - The URL to be opened when the button is pressed.
   * @returns The current instance for chaining.
   */
  url(text: string, url: string): this {
    return this.add(InlineKeyboard.url(text, url));
  }

  /**
   * Creates a URL button.
   * @param text - The button text.
   * @param url - The URL to be opened when the button is pressed.
   * @returns The created URL button.
   */
  static url(text: string, url: string): InlineKeyboardButton.UrlButton {
    return { text, url };
  }

  /**
   * Adds a callback button to the inline keyboard.
   * @param text - The button text.
   * @param data - The callback data.
   * @returns The current instance for chaining.
   */
  text(text: string, data = text): this {
    return this.add(InlineKeyboard.text(text, data));
  }

  /**
   * Creates a callback button.
   * @param text - The button text.
   * @param data - The callback data.
   * @returns The created callback button.
   */
  static text(text: string, data = text): InlineKeyboardButton.CallbackButton {
    return { text, callback_data: data };
  }

  /**
   * Adds a WebApp button to the inline keyboard.
   * @param text - The button text.
   * @param url - The URL to the WebApp.
   * @returns The current instance for chaining.
   */
  webApp(text: string, url: string): this {
    return this.add(InlineKeyboard.webApp(text, url));
  }

  /**
   * Creates a WebApp button.
   * @param text - The button text.
   * @param url - The URL to the WebApp.
   * @returns The created WebApp button.
   */
  static webApp(text: string, url: string): InlineKeyboardButton.WebAppButton {
    return { text, web_app: { url } };
  }

  /**
   * Adds a login button to the inline keyboard.
   * @param text - The button text.
   * @param loginUrl - The login URL or LoginUrl object.
   * @returns The current instance for chaining.
   */
  login(text: string, loginUrl: string | LoginUrl): this {
    return this.add(InlineKeyboard.login(text, loginUrl));
  }

  /**
   * Creates a login button.
   * @param text - The button text.
   * @param loginUrl - The login URL or LoginUrl object.
   * @returns The created login button.
   */
  static login(
    text: string,
    loginUrl: string | LoginUrl,
  ): InlineKeyboardButton.LoginButton {
    return {
      text,
      login_url: typeof loginUrl === "string" ? { url: loginUrl } : loginUrl,
    };
  }

  /**
   * Adds a switch inline button to the inline keyboard.
   * @param text - The button text.
   * @param query - The inline query to switch to.
   * @returns The current instance for chaining.
   */
  switchInline(text: string, query = ""): this {
    return this.add(InlineKeyboard.switchInline(text, query));
  }

  /**
   * Creates a switch inline button.
   * @param text - The button text.
   * @param query - The inline query to switch to.
   * @returns The created switch inline button.
   */
  static switchInline(
    text: string,
    query = "",
  ): InlineKeyboardButton.SwitchInlineButton {
    return { text, switch_inline_query: query };
  }

  /**
   * Adds a switch inline current chat button to the inline keyboard.
   * @param text - The button text.
   * @param query - The inline query to switch to in the current chat.
   * @returns The current instance for chaining.
   */
  switchInlineCurrent(text: string, query = ""): this {
    return this.add(InlineKeyboard.switchInlineCurrent(text, query));
  }

  /**
   * Creates a switch inline current chat button.
   * @param text - The button text.
   * @param query - The inline query to switch to in the current chat.
   * @returns The created switch inline current chat button.
   */
  static switchInlineCurrent(
    text: string,
    query = "",
  ): InlineKeyboardButton.SwitchInlineCurrentChatButton {
    return { text, switch_inline_query_current_chat: query };
  }

  /**
   * Adds a switch inline chosen chat button to the inline keyboard.
   * @param text - The button text.
   * @param query - The inline query to switch to in the chosen chat.
   * @returns The current instance for chaining.
   */
  switchInlineChosen(
    text: string,
    query: SwitchInlineQueryChosenChat = {},
  ): this {
    return this.add(InlineKeyboard.switchInlineChosen(text, query));
  }

  /**
   * Creates a switch inline chosen chat button.
   * @param text - The button text.
   * @param query - The inline query to switch to in the chosen chat.
   * @returns The created switch inline chosen chat button.
   */
  static switchInlineChosen(
    text: string,
    query: SwitchInlineQueryChosenChat = {},
  ): InlineKeyboardButton.SwitchInlineChosenChatButton {
    return { text, switch_inline_query_chosen_chat: query };
  }

  /**
   * Adds a game button to the inline keyboard.
   * @param text - The button text.
   * @returns The current instance for chaining.
   */
  game(text: string): this {
    return this.add(InlineKeyboard.game(text));
  }

  /**
   * Creates a game button.
   * @param text - The button text.
   * @returns The created game button.
   */
  static game(text: string): InlineKeyboardButton.GameButton {
    return { text, callback_game: {} };
  }

  /**
   * Adds a pay button to the inline keyboard.
   * @param text - The button text.
   * @returns The current instance for chaining.
   */
  pay(text: string): this {
    return this.add(InlineKeyboard.pay(text));
  }

  /**
   * Creates a pay button.
   * @param text - The button text.
   * @returns The created pay button.
   */
  static pay(text: string): InlineKeyboardButton.PayButton {
    return { text, pay: true };
  }

  /**
   * Creates a deep copy of the current InlineKeyboard instance.
   * @returns A new instance of InlineKeyboard with the same buttons.
   */
  clone(): InlineKeyboard {
    return new InlineKeyboard(this.inline_keyboard.map((row) => row.slice()));
  }

  /**
   * Creates an InlineKeyboard instance from another instance or a 2D array of buttons.
   * @param source - The source InlineKeyboard instance or 2D array of buttons.
   * @returns A new instance of InlineKeyboard.
   */
  static from(
    source: InlineKeyboard | InlineKeyboardButton[][],
  ): InlineKeyboard {
    if (source instanceof InlineKeyboard) return source.clone();
    return new InlineKeyboard(source.map((row) => row.slice()));
  }

  /**
   * Checks if this inline keyboard is equal to another inline keyboard.
   * @param {InlineKeyboard} other - The other inline keyboard to compare with.
   * @returns {boolean} True if both keyboards are equal based on their structure and button properties, otherwise false.
   */
  equals(other: InlineKeyboard): boolean {
    if (!other || !(other instanceof InlineKeyboard)) return false;

    if (this.inline_keyboard.length !== other.inline_keyboard.length)
      return false;

    for (let i = 0; i < this.inline_keyboard.length; i++) {
      const row = this.inline_keyboard[i];
      const otherRow = other.inline_keyboard[i];

      if (!row || !otherRow || row.length !== otherRow.length) return false;

      for (let j = 0; j < row.length; j++) {
        const buttonA = row[j];
        const buttonB = otherRow[j];

        if (!buttonA || !buttonB) return false;

        if ("url" in buttonA && "url" in buttonB) {
          if (buttonA.text !== buttonB.text || buttonA.url !== buttonB.url)
            return false;
        } else if ("callback_data" in buttonA && "callback_data" in buttonB) {
          if (
            buttonA.text !== buttonB.text ||
            buttonA.callback_data !== buttonB.callback_data
          )
            return false;
        } else if ("web_app" in buttonA && "web_app" in buttonB) {
          if (
            buttonA.text !== buttonB.text ||
            buttonA.web_app.url !== buttonB.web_app.url
          )
            return false;
        } else if ("login_url" in buttonA && "login_url" in buttonB) {
          if (
            buttonA.text !== buttonB.text ||
            JSON.stringify(buttonA.login_url) !==
              JSON.stringify(buttonB.login_url)
          )
            return false;
        } else if (
          "switch_inline_query" in buttonA &&
          "switch_inline_query" in buttonB
        ) {
          if (
            buttonA.text !== buttonB.text ||
            buttonA.switch_inline_query !== buttonB.switch_inline_query
          )
            return false;
        } else if (
          "switch_inline_query_current_chat" in buttonA &&
          "switch_inline_query_current_chat" in buttonB
        ) {
          if (
            buttonA.text !== buttonB.text ||
            buttonA.switch_inline_query_current_chat !==
              buttonB.switch_inline_query_current_chat
          )
            return false;
        } else if (
          "switch_inline_query_chosen_chat" in buttonA &&
          "switch_inline_query_chosen_chat" in buttonB
        ) {
          if (
            buttonA.text !== buttonB.text ||
            JSON.stringify(buttonA.switch_inline_query_chosen_chat) !==
              JSON.stringify(buttonB.switch_inline_query_chosen_chat)
          )
            return false;
        } else if ("callback_game" in buttonA && "callback_game" in buttonB) {
          if (buttonA.text !== buttonB.text) return false;
        } else if ("pay" in buttonA && "pay" in buttonB) {
          if (buttonA.text !== buttonB.text) return false;
        } else {
          return false;
        }
      }
    }

    return true;
  }
}

export { InlineKeyboard };
