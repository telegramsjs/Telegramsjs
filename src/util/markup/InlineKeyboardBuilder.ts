import { replacedMarkupOptions, type MarkupOptions } from "./utils";
import type {
  InlineKeyboardButton,
  SwitchInlineQueryChosenChat,
  LoginUrl,
  WebAppInfo,
  CopyTextButton,
} from "../../client/interfaces/Markup";

/**
 * Represents an inline keyboard for Telegram bots.
 */
class InlineKeyboardBuilder {
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
   * @param options - Additional button style and icon.
   * @returns The current instance for chaining.
   */
  url(text: string, url: string, options?: MarkupOptions): this {
    return this.add(InlineKeyboardBuilder.url(text, url, options));
  }

  /**
   * Creates a URL button.
   * @param text - The button text.
   * @param url - The URL to be opened when the button is pressed.
   * @param options - Additional button style and icon.
   * @returns The created URL button.
   */
  static url(
    text: string,
    url: string,
    options?: MarkupOptions,
  ): InlineKeyboardButton.UrlButton {
    return {
      text,
      url,
      ...replacedMarkupOptions(options),
    };
  }

  /**
   * Adds a callback button to the inline keyboard.
   * @param text - The button text.
   * @param data - The callback data.
   * @param options - Additional button style and icon.
   * @returns The current instance for chaining.
   */
  text(text: string, data = text, options?: MarkupOptions): this {
    return this.add(InlineKeyboardBuilder.text(text, data, options));
  }

  /**
   * Creates a callback button.
   * @param text - The button text.
   * @param data - The callback data.
   * @param options - Additional button style and icon.
   * @returns The created callback button.
   */
  static text(
    text: string,
    data = text,
    options?: MarkupOptions,
  ): InlineKeyboardButton.CallbackButton {
    return {
      text,
      callback_data: data,
      ...replacedMarkupOptions(options),
    };
  }

  /**
   * Adds a WebApp button to the inline keyboard.
   * @param text - The button text.
   * @param url - The URL to the WebApp.
   * @param options - Additional button style and icon.
   * @returns The current instance for chaining.
   */
  webApp(
    text: string,
    url: string | WebAppInfo,
    options?: MarkupOptions,
  ): this {
    return this.add(InlineKeyboardBuilder.webApp(text, url, options));
  }

  /**
   * Creates a WebApp button.
   * @param text - The button text.
   * @param url - The URL to the WebApp.
   * @param options - Additional button style and icon.
   * @returns The created WebApp button.
   */
  static webApp(
    text: string,
    url: string | WebAppInfo,
    options?: MarkupOptions,
  ): InlineKeyboardButton.WebAppButton {
    return {
      text,
      web_app: typeof url === "string" ? { url } : url,
      ...replacedMarkupOptions(options),
    };
  }

  /**
   * Adds a login button to the inline keyboard.
   * @param text - The button text.
   * @param loginUrl - The login URL or LoginUrl object.
   * @param options - Additional button style and icon.
   * @returns The current instance for chaining.
   */
  login(
    text: string,
    loginUrl: string | LoginUrl,
    options?: MarkupOptions,
  ): this {
    return this.add(InlineKeyboardBuilder.login(text, loginUrl, options));
  }

  /**
   * Creates a login button.
   * @param text - The button text.
   * @param loginUrl - The login URL or LoginUrl object.
   * @param options - Additional button style and icon.
   * @returns The created login button.
   */
  static login(
    text: string,
    loginUrl: string | LoginUrl,
    options?: MarkupOptions,
  ): InlineKeyboardButton.LoginButton {
    return {
      text,
      login_url: typeof loginUrl === "string" ? { url: loginUrl } : loginUrl,
      ...replacedMarkupOptions(options),
    };
  }

  /**
   * Adds a switch inline button to the inline keyboard.
   * @param text - The button text.
   * @param query - The inline query to switch to.
   * @param options - Additional button style and icon.
   * @returns The current instance for chaining.
   */
  switchInline(text: string, query = "", options?: MarkupOptions): this {
    return this.add(InlineKeyboardBuilder.switchInline(text, query, options));
  }

  /**
   * Creates a switch inline button.
   * @param text - The button text.
   * @param query - The inline query to switch to.
   * @param options - Additional button style and icon.
   * @returns The created switch inline button.
   */
  static switchInline(
    text: string,
    query = "",
    options?: MarkupOptions,
  ): InlineKeyboardButton.SwitchInlineButton {
    return {
      text,
      switch_inline_query: query,
      ...replacedMarkupOptions(options),
    };
  }

  /**
   * Adds a switch inline current chat button to the inline keyboard.
   * @param text - The button text.
   * @param query - The inline query to switch to in the current chat.
   * @param options - Additional button style and icon.
   * @returns The current instance for chaining.
   */
  switchInlineCurrent(text: string, query = "", options?: MarkupOptions): this {
    return this.add(
      InlineKeyboardBuilder.switchInlineCurrent(text, query, options),
    );
  }

  /**
   * Creates a switch inline current chat button.
   * @param text - The button text.
   * @param query - The inline query to switch to in the current chat.
   * @param options - Additional button style and icon.
   * @returns The created switch inline current chat button.
   */
  static switchInlineCurrent(
    text: string,
    query = "",
    options?: MarkupOptions,
  ): InlineKeyboardButton.SwitchInlineCurrentChatButton {
    return {
      text,
      switch_inline_query_current_chat: query,
      ...replacedMarkupOptions(options),
    };
  }

  /**
   * Adds a switch inline chosen chat button to the inline keyboard.
   * @param text - The button text.
   * @param query - The inline query to switch to in the chosen chat.
   * @param options - Additional button style and icon.
   * @returns The current instance for chaining.
   */
  switchInlineChosen(
    text: string,
    query: SwitchInlineQueryChosenChat = { allow_user_chats: true },
    options?: MarkupOptions,
  ): this {
    return this.add(
      InlineKeyboardBuilder.switchInlineChosen(text, query, options),
    );
  }

  /**
   * Creates a switch inline chosen chat button.
   * @param text - The button text.
   * @param query - The inline query to switch to in the chosen chat.
   * @param options - Additional button style and icon.
   * @returns The created switch inline chosen chat button.
   */
  static switchInlineChosen(
    text: string,
    query: SwitchInlineQueryChosenChat = { allow_user_chats: true },
    options?: MarkupOptions,
  ): InlineKeyboardButton.SwitchInlineChosenChatButton {
    return {
      text,
      switch_inline_query_chosen_chat: query,
      ...replacedMarkupOptions(options),
    };
  }

  /**
   * Adds a copy text button to the inline keyboard.
   * @param text - The button text.
   * @param copyText - The text copy or CopyTextButton object.
   * @param options - Additional button style and icon.
   * @returns The current instance for chaining.
   */
  copyText(
    text: string,
    copyText: string | CopyTextButton = text,
    options?: MarkupOptions,
  ): this {
    return this.add(InlineKeyboardBuilder.copyText(text, copyText, options));
  }

  /**
   * Creates a copy text button.
   * @param text - The button text.
   * @param copyText - The text copy or CopyTextButton object.
   * @param options - Additional button style and icon.
   * @returns The created copy text button.
   */
  static copyText(
    text: string,
    copyText: string | CopyTextButton = text,
    options?: MarkupOptions,
  ): InlineKeyboardButton.CopyTextButtonButton {
    return {
      text,
      copy_text: typeof copyText === "string" ? { text: copyText } : copyText,
      ...replacedMarkupOptions(options),
    };
  }

  /**
   * Adds a game button to the inline keyboard.
   * @param text - The button text.
   * @param options - Additional button style and icon.
   * @returns The current instance for chaining.
   */
  game(text: string, options?: MarkupOptions): this {
    return this.add(InlineKeyboardBuilder.game(text, options));
  }

  /**
   * Creates a game button.
   * @param text - The button text.
   * @param options - Additional button style and icon.
   * @returns The created game button.
   */
  static game(
    text: string,
    options?: MarkupOptions,
  ): InlineKeyboardButton.GameButton {
    return {
      text,
      callback_game: {},
      ...replacedMarkupOptions(options),
    };
  }

  /**
   * Adds a pay button to the inline keyboard.
   * @param text - The button text.
   * @param options - Additional button style and icon.
   * @returns The current instance for chaining.
   */
  pay(text: string, options?: MarkupOptions): this {
    return this.add(InlineKeyboardBuilder.pay(text, options));
  }

  /**
   * Creates a pay button.
   * @param text - The button text.
   * @param options - Additional button style and icon.
   * @returns The created pay button.
   */
  static pay(
    text: string,
    options?: MarkupOptions,
  ): InlineKeyboardButton.PayButton {
    return {
      text,
      pay: true,
      ...replacedMarkupOptions(options),
    };
  }

  /**
   * Creates a deep copy of the current InlineKeyboard instance.
   * @returns A new instance of InlineKeyboard with the same buttons.
   */
  clone(): InlineKeyboardBuilder {
    return new InlineKeyboardBuilder(
      this.inline_keyboard.map((row) => row.slice()),
    );
  }

  /**
   * Combines the current inline keyboard with another one.
   * @param other - The other InlineKeyboard instance to combine with.
   * @returns The current instance for chaining.
   */
  combine(
    other:
      | InlineKeyboardBuilder
      | InlineKeyboardButton[][]
      | { inline_keyboard: InlineKeyboardButton[][] }
      | { toJSON(): { inline_keyboard: InlineKeyboardButton[][] } },
  ): InlineKeyboardBuilder {
    const json = "toJSON" in other ? other.toJSON() : other;
    const buttons = Array.isArray(json) ? json : json.inline_keyboard;

    for (const row of buttons) {
      this.row().add(...row);
    }

    return this;
  }

  /**
   * Creates an InlineKeyboard instance from another instance or a 2D array of buttons.
   * @param source - The source InlineKeyboard instance or 2D array of buttons.
   * @returns A new instance of InlineKeyboard.
   */
  static from(
    source: InlineKeyboardBuilder | InlineKeyboardButton[][],
  ): InlineKeyboardBuilder {
    if (source instanceof InlineKeyboardBuilder) return source.clone();
    return new InlineKeyboardBuilder(source.map((row) => row.slice()));
  }

  /**
   * Checks if this inline keyboard is equal to another inline keyboard.
   * @param other - The other inline keyboard to compare with.
   * @returns True if both keyboards are equal based on their structure and button properties, otherwise false.
   */
  equals(
    other:
      | InlineKeyboardBuilder
      | { inline_keyboard: InlineKeyboardButton[][] },
  ): boolean {
    if (!other) return false;

    if (this.inline_keyboard.length !== other.inline_keyboard.length)
      return false;

    for (let i = 0; i < this.inline_keyboard.length; i++) {
      const row = this.inline_keyboard[i];
      const otherRow = other.inline_keyboard[i];

      if (!row || !otherRow || row.length !== otherRow.length) return false;

      for (let j = 0; j < row.length; j++) {
        const a = row[j];
        const b = otherRow[j];

        if (!a || !b) return false;

        if (
          a.icon_custom_emoji_id !== b.icon_custom_emoji_id ||
          a.style !== b.style
        )
          return false;

        if ("url" in a && "url" in b) {
          if (a.text !== b.text || a.url !== b.url) return false;
        } else if ("callback_data" in a && "callback_data" in b) {
          if (a.text !== b.text || a.callback_data !== b.callback_data)
            return false;
        } else if ("web_app" in a && "web_app" in b) {
          if (a.text !== b.text || a.web_app.url !== b.web_app.url)
            return false;
        } else if ("login_url" in a && "login_url" in b) {
          if (
            a.text !== b.text ||
            JSON.stringify(a.login_url) !== JSON.stringify(b.login_url)
          )
            return false;
        } else if ("switch_inline_query" in a && "switch_inline_query" in b) {
          if (
            a.text !== b.text ||
            a.switch_inline_query !== b.switch_inline_query
          )
            return false;
        } else if (
          "switch_inline_query_current_chat" in a &&
          "switch_inline_query_current_chat" in b
        ) {
          if (
            a.text !== b.text ||
            a.switch_inline_query_current_chat !==
              b.switch_inline_query_current_chat
          )
            return false;
        } else if (
          "switch_inline_query_chosen_chat" in a &&
          "switch_inline_query_chosen_chat" in b
        ) {
          if (
            a.text !== b.text ||
            JSON.stringify(a.switch_inline_query_chosen_chat) !==
              JSON.stringify(b.switch_inline_query_chosen_chat)
          )
            return false;
        } else if ("copy_text" in a && "copy_text" in b) {
          if (a.text !== b.text || a.copy_text.text !== b.copy_text.text)
            return false;
        } else if ("callback_game" in a && "callback_game" in b) {
          if (a.text !== b.text) return false;
        } else if ("pay" in a && "pay" in b) {
          if (a.text !== b.text) return false;
        } else {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Converts the inline keyboard to a JSON format suitable for Telegram API.
   * @returns An object representing the inline keyboard in JSON format.
   */
  toJSON(): { inline_keyboard: InlineKeyboardButton[][] } {
    return { inline_keyboard: this.inline_keyboard };
  }
}

export { InlineKeyboardBuilder };
