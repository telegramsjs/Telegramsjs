import type {
  InlineKeyboardButton,
  SwitchInlineQueryChosenChat,
  LoginUrl,
} from "@telegram.ts/types";

class InlineKeyboard {
  constructor(
    public readonly inline_keyboard: InlineKeyboardButton[][] = [[]],
  ) {}

  add(...buttons: InlineKeyboardButton[]) {
    this.inline_keyboard[this.inline_keyboard.length - 1]?.push(...buttons);
    return this;
  }

  row(...buttons: InlineKeyboardButton[]) {
    this.inline_keyboard.push(buttons);
    return this;
  }

  url(text: string, url: string) {
    return this.add(InlineKeyboard.url(text, url));
  }

  static url(text: string, url: string): InlineKeyboardButton.UrlButton {
    return { text, url };
  }

  text(text: string, data = text) {
    return this.add(InlineKeyboard.text(text, data));
  }

  static text(text: string, data = text): InlineKeyboardButton.CallbackButton {
    return { text, callback_data: data };
  }

  webApp(text: string, url: string) {
    return this.add(InlineKeyboard.webApp(text, url));
  }

  static webApp(text: string, url: string): InlineKeyboardButton.WebAppButton {
    return { text, web_app: { url } };
  }

  login(text: string, loginUrl: string | LoginUrl) {
    return this.add(InlineKeyboard.login(text, loginUrl));
  }

  static login(
    text: string,
    loginUrl: string | LoginUrl,
  ): InlineKeyboardButton.LoginButton {
    return {
      text,
      login_url: typeof loginUrl === "string" ? { url: loginUrl } : loginUrl,
    };
  }

  switchInline(text: string, query = "") {
    return this.add(InlineKeyboard.switchInline(text, query));
  }

  static switchInline(
    text: string,
    query = "",
  ): InlineKeyboardButton.SwitchInlineButton {
    return { text, switch_inline_query: query };
  }

  switchInlineCurrent(text: string, query = "") {
    return this.add(InlineKeyboard.switchInlineCurrent(text, query));
  }

  static switchInlineCurrent(
    text: string,
    query = "",
  ): InlineKeyboardButton.SwitchInlineCurrentChatButton {
    return { text, switch_inline_query_current_chat: query };
  }

  switchInlineChosen(text: string, query: SwitchInlineQueryChosenChat = {}) {
    return this.add(InlineKeyboard.switchInlineChosen(text, query));
  }

  static switchInlineChosen(
    text: string,
    query: SwitchInlineQueryChosenChat = {},
  ): InlineKeyboardButton.SwitchInlineChosenChatButton {
    return { text, switch_inline_query_chosen_chat: query };
  }

  game(text: string) {
    return this.add(InlineKeyboard.game(text));
  }

  static game(text: string): InlineKeyboardButton.GameButton {
    return { text, callback_game: {} };
  }

  pay(text: string) {
    return this.add(InlineKeyboard.pay(text));
  }

  static pay(text: string): InlineKeyboardButton.PayButton {
    return { text, pay: true };
  }

  clone() {
    return new InlineKeyboard(this.inline_keyboard.map((row) => row.slice()));
  }

  static from(
    source: InlineKeyboard | InlineKeyboardButton[][],
  ): InlineKeyboard {
    if (source instanceof InlineKeyboard) return source.clone();
    return new InlineKeyboard(source.map((row) => row.slice()));
  }
}

export { InlineKeyboard };
