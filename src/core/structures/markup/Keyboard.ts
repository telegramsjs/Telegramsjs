import type {
  KeyboardButton,
  KeyboardButtonPollType,
  KeyboardButtonRequestChat,
  KeyboardButtonRequestUsers,
} from "@telegram.ts/types";

class Keyboard {
  public is_persistent?: boolean;
  public selective?: boolean;
  public one_time_keyboard?: boolean;
  public resize_keyboard?: boolean;
  public input_field_placeholder?: string;

  constructor(public readonly keyboard: KeyboardButton[][] = [[]]) {}

  add(...buttons: KeyboardButton[]) {
    this.keyboard[this.keyboard.length - 1]?.push(...buttons);
    return this;
  }

  row(...buttons: KeyboardButton[]) {
    this.keyboard.push(buttons);
    return this;
  }

  text(text: string) {
    return this.add(Keyboard.text(text));
  }

  static text(text: string): KeyboardButton.CommonButton {
    return { text };
  }

  requestUsers(
    text: string,
    requestId: number,
    options: Omit<KeyboardButtonRequestUsers, "request_id"> = {},
  ) {
    return this.add(Keyboard.requestUsers(text, requestId, options));
  }

  static requestUsers(
    text: string,
    requestId: number,
    options: Omit<KeyboardButtonRequestUsers, "request_id"> = {},
  ): KeyboardButton.RequestUsersButton {
    return { text, request_users: { request_id: requestId, ...options } };
  }

  requestChat(
    text: string,
    requestId: number,
    options: Omit<KeyboardButtonRequestChat, "request_id"> = {
      chat_is_channel: false,
    },
  ) {
    return this.add(Keyboard.requestChat(text, requestId, options));
  }

  static requestChat(
    text: string,
    requestId: number,
    options: Omit<KeyboardButtonRequestChat, "request_id"> = {
      chat_is_channel: false,
    },
  ): KeyboardButton.RequestChatButton {
    return { text, request_chat: { request_id: requestId, ...options } };
  }

  requestContact(text: string) {
    return this.add(Keyboard.requestContact(text));
  }

  static requestContact(text: string): KeyboardButton.RequestContactButton {
    return { text, request_contact: true };
  }

  requestLocation(text: string) {
    return this.add(Keyboard.requestLocation(text));
  }

  static requestLocation(text: string): KeyboardButton.RequestLocationButton {
    return { text, request_location: true };
  }

  requestPoll(text: string, type?: KeyboardButtonPollType["type"]) {
    return this.add(Keyboard.requestPoll(text, type));
  }

  static requestPoll(
    text: string,
    type?: KeyboardButtonPollType["type"],
  ): KeyboardButton.RequestPollButton {
    return { text, request_poll: { type } };
  }

  webApp(text: string, url: string) {
    return this.add(Keyboard.webApp(text, url));
  }

  static webApp(text: string, url: string): KeyboardButton.WebAppButton {
    return { text, web_app: { url } };
  }

  persistent(isEnabled = true) {
    this.is_persistent = isEnabled;
    return this;
  }

  selected(isEnabled = true) {
    this.selective = isEnabled;
    return this;
  }

  oneTime(isEnabled = true) {
    this.one_time_keyboard = isEnabled;
    return this;
  }

  resized(isEnabled = true) {
    this.resize_keyboard = isEnabled;
    return this;
  }

  placeholder(value: string) {
    this.input_field_placeholder = value;
    return this;
  }

  clone(keyboard: KeyboardButton[][] = this.keyboard) {
    const clone = new Keyboard(keyboard.map((row) => row.slice()));
    clone.is_persistent = this.is_persistent;
    clone.selective = this.selective;
    clone.one_time_keyboard = this.one_time_keyboard;
    clone.resize_keyboard = this.resize_keyboard;
    clone.input_field_placeholder = this.input_field_placeholder;
    return clone;
  }

  build() {
    return this.keyboard;
  }

  static from(source: (string | KeyboardButton)[][] | Keyboard): Keyboard {
    if (source instanceof Keyboard) return source.clone();
    function toButton(btn: string | KeyboardButton) {
      return typeof btn === "string" ? Keyboard.text(btn) : btn;
    }
    return new Keyboard(source.map((row) => row.map(toButton)));
  }
}

export { Keyboard };
