import {
  InlineKeyboardButton,
  LoginUrl,
  KeyboardButton,
  ChatAdministratorRights,
} from "@telegram.ts/types";

interface Text {
  text: string;
}

interface WrapOptions {
  wrap?: (button: Button, index: number, currentRow: Button[]) => boolean;
}

interface ColumnsOptions {
  columns: number;
}

type BuildKeyboard = WrapOptions & ColumnsOptions;

interface ReplyMarkup {
  text?: string;
  selective?: boolean;
  input_field_placeholder?: string;
  resize_keyboard?: boolean;
  one_time_keyboard?: boolean;
  remove_keyboard?: boolean;
  force_reply?: boolean;
  keyboard?: Button[][];
  inline_keyboard?: Button[][];
}

interface Button {
  hide?: boolean;
  text?: string;
  request_contact?: boolean;
  request_location?: boolean;
  request_poll?: {
    type: string;
  };
  request_user?: {
    request_id: number;
    user_is_premium?: boolean;
    user_is_bot?: boolean;
  };
  request_chat?: {
    request_id: number;
    chat_is_channel: boolean;
    chat_is_forum?: boolean;
    chat_has_username?: boolean;
    chat_is_created?: boolean;
    user_administrator_rights?: ChatAdministratorRights;
    bot_administrator_rights?: ChatAdministratorRights;
    bot_is_member?: boolean;
  };
  url?: string;
  callback_data?: string;
  switch_inline_query?: string;
  switch_inline_query_current_chat?: string;
  callback_game?: {};
  pay?: boolean;
  login_url?: {
    url: string;
    forward_text?: string;
    bot_username?: string;
    request_write_access?: boolean;
  };
  web_app?: {
    url: string;
  };
}

class Markup {
  reply_markup: ReplyMarkup;

  constructor() {
    this.reply_markup = {};
  }
  
  /**
   * Sets the text for the reply markup.
   * @param {string} text - The text to be displayed.
   * @returns The instance of the Markup class.
   */
  setText(text: string): this {
    this.reply_markup.text = text;
    return this;
  }
  
  /**
   * Sets the 'selective' option for the reply markup.
   * @param {boolean} [value=true] - The value indicating selectiveness.
   * @returns The instance of the Markup class.
   */
  selective(value = true): this {
    this.reply_markup.selective = value;
    return this;
  }
  
  /**
   * Sets the input field placeholder for the reply markup.
   * @param {string} placeholder - The placeholder text.
   * @returns The instance of the Markup class.
   */
  placeholder(placeholder: string): this {
    this.reply_markup.input_field_placeholder = placeholder;
    return this;
  }
  
  /**
   * Sets the 'resize_keyboard' option for the reply markup.
   * @param {boolean} [value=true] - The value indicating whether to resize the keyboard.
   * @returns The instance of the Markup class.
   */
  resize(value = true): this {
    this.reply_markup.resize_keyboard = value;
    return this;
  }
  
  /**
   * Sets the 'one_time_keyboard' option for the reply markup.
   * @param {boolean} [value=true] - The value indicating whether it's a one-time keyboard.
   * @returns The instance of the Markup class.
   */
  oneTime(value = true): this {
    this.reply_markup.one_time_keyboard = value;
    return this;
  }
  
  /**
   * Sets the 'remove_keyboard' option to remove the keyboard.
   * @returns The instance of the Markup class.
   */
  removeKeyboard(): this {
    this.reply_markup.remove_keyboard = true;
    return this;
  }
  
  /**
   * Sets the 'force_reply' option for the reply markup.
   * @returns The instance of the Markup class.
   */
  forceReply(): this {
    this.reply_markup.force_reply = true;
    return this;
  }
  
  /**
   * Sets the keyboard buttons for the reply markup.
   * @param {Button[]} buttons - An array of buttons to be displayed.
   * @param {WrapOptions} [options] - Additional options for arranging the buttons.
   * @returns The instance of the Markup class.
   */
  keyboard(buttons: Button[], options?: WrapOptions): this {
    const keyboard = buildKeyboard(buttons, {
      columns: 1,
      ...options,
    });
    this.reply_markup.keyboard = keyboard;
    return this;
  }
  
  /**
 * Sets up an inline keyboard with the specified buttons.
 * @param {Button[]} buttons - An array of buttons to be included in the inline keyboard.
 * @param {WrapOptions} [options] - Additional options for arranging the buttons.
 * @returns The instance of the Markup class.
 */
  inlineKeyboard(buttons: Button[], options?: WrapOptions): this {
    const inlineKeyboard = buildKeyboard(buttons, {
      columns: buttons.length,
      ...options,
    });
    this.reply_markup.inline_keyboard = inlineKeyboard;
    return this;
  }
  
  /**
 * Creates a contact request button with the specified text.
 * @param {string} text - The text label for the button.
 * @returns The contact request button object.
 */
  static text(text: string): Text {
    return {
      text,
    };
  }
  
  /**
 * Creates a contact request button with the specified text.
 * @param {string} text - The text label for the button.
 * @returns The contact request button object.
 */
  static contactRequest(
    text: string,
  ): KeyboardButton.RequestContactButton & Text {
    return {
      text,
      request_contact: true,
    };
  }
  
  /**
 * Creates a location request button with the specified text.
 * @param {string} text - The text label for the button.
 * @returns The location request button object.
 */
  static locationRequest(
    text: string,
  ): KeyboardButton.RequestLocationButton & Text {
    return {
      text,
      request_location: true,
    };
  }
  
  /**
 * Creates a poll request button with the specified text and type.
 * @param {string} text - The text label for the button.
 * @param {string} [type] - The type of poll request ("quiz" or "regular").
 * @returns The poll request button object.
 */
  static pollRequest(
    text: string,
    type?: "quiz" | "regular",
  ): KeyboardButton.RequestPollButton & Text {
    return {
      text,
      request_poll: {
        type,
      },
    };
  }

/**
 * Creates a user request button with the specified text and optional parameters.
 * @param {string} text - The text label for the button.
 * @param {number} request_id - The request ID.
 * @param {boolean} [user_is_bot] - Indicates if the user is a bot .
 * @param {boolean} [user_is_premium] - Indicates if the user is premium .
 * @returns The user request button object.
 */
  static userRequest(
    text: string,
    request_id: number,
    user_is_bot?: boolean,
    user_is_premium?: boolean,
  ): KeyboardButton.RequestUserButton & Text {
    return {
      text,
      request_user: {
        request_id,
        user_is_bot,
        user_is_premium,
      },
    };
  }
  
  /**
 * Creates a chat request button with the specified text, request ID, and additional arguments.
 * @param {string} text - The text label for the button.
 * @param {number} request_id - The request ID.
 * @param {boolean} chat_is_channel - Indicates if the chat is a channel.
 * @param {object} [args] - Additional arguments for the chat request.
 * @returns The chat request button object.
 */
  static chatRequest(
    text: string,
    request_id: number,
    chat_is_channel: boolean,
    args: {
      chat_is_forum?: boolean;
      chat_has_username?: boolean;
      chat_is_created?: boolean;
      user_administrator_rights?: ChatAdministratorRights;
      bot_administrator_rights?: ChatAdministratorRights;
      bot_is_member?: boolean;
    },
  ): KeyboardButton.RequestChatButton & Text {
    return {
      text,
      request_chat: {
        request_id,
        chat_is_channel,
        ...args,
      },
    };
  }

/**
 * Creates a URL button with the specified text and URL.
 * @param {string} text - The text label for the button.
 * @param {string} url - The URL to be opened when the button is clicked.
 * @returns The URL button object.
 */
  static url(text: string, url: string): InlineKeyboardButton.UrlButton & Text {
    return {
      text,
      url,
    };
  }

/**
 * Creates a callback button with the specified text and callback data.
 * @param {string} text - The text label for the button.
 * @param {string} data - The callback data to be sent when the button is clicked.
 * @returns The callback button object.
 */
  static callback(
    text: string,
    data: string,
  ): InlineKeyboardButton.CallbackButton & Text {
    return {
      text,
      callback_data: data,
    };
  }
  
  /**
 * Creates a button to switch to a chat and start inline query.
 * @param {string} text - The text label for the button.
 * @param {string} value - The query value for starting the inline query.
 * @returns The switch to chat button object.
 */
  static switchToChat(
    text: string,
    value: string,
  ): InlineKeyboardButton.SwitchInlineButton & Text {
    return {
      text,
      switch_inline_query: value,
    };
  }
  
  /**
 * Creates a button to switch to the current chat and start inline query.
 * @param {string} text - The text label for the button.
 * @param {string} value - The query value for starting the inline query.
 * @returns The switch to current chat button object.
 */
  static switchToCurrentChat(
    text: string,
    value: string,
  ): InlineKeyboardButton.SwitchInlineCurrentChatButton & Text {
    return {
      text,
      switch_inline_query_current_chat: value,
    };
  }
  
  /**
 * Creates a button for starting a game.
 * @param {string} text - The text label for the button.
 * @returns The game button object.
 */
  static game(text: string): InlineKeyboardButton.GameButton & Text {
    return {
      text,
      callback_game: {},
    };
  }
  
  /**
 * Creates a button for making a payment.
 * @param {string} text - The text label for the button.
 * @returns The pay button object.
 */
  static pay(text: string): InlineKeyboardButton.PayButton & Text {
    return {
      text,
      pay: true,
    };
  }

/**
 * Creates a login button with the specified text and URL.
 * @param {string} text - The text label for the button.
 * @param {string} url - The URL to be opened when the button is clicked.
 * @param {object} [args] - Additional arguments for the login URL .
 * @returns The login button object.
 */
  static login(
    text: string,
    url: string,
    args?: Pick<LoginUrl, "url">,
  ): InlineKeyboardButton.LoginButton & Text {
    return {
      text,
      login_url: {
        url,
        ...args,
      },
    };
  }
  
  /**
 * Creates a web app button with the specified text and URL.
 * @param {string} text - The text label for the button.
 * @param {string} url - The URL to be opened when the button is clicked.
 * @returns The web app button object.
 */
  static webApp(
    text: string,
    url: string,
  ): InlineKeyboardButton.WebAppButton & Text {
    return {
      text,
      web_app: {
        url,
      },
    };
  }
  
  /**
   * Generates the reply markup based on an array of Markups, an elevation level, and a type.
   * @param {Markup[]} markups - An array of Markups to be used for generating the markup.
   * @param {number} [elevation=5] - The elevation level for arranging buttons.
   * @param {string} [type=inline_keyboard] - The type of markup ('keyboard' or 'inline_keyboard').
   * @returns The generated ReplyMarkup.
   */
  static generateReplyMarkup(
    markups: Markup[],
    elevation: number = 5,
    type: "keyboard" | "inline_keyboard" = "inline_keyboard",
  ): ReplyMarkup {
    const replyMarkup = new Markup();
    const buttons = markups.map((markup) => markup.reply_markup);
    const keyboard = [];
    let row = [];
    for (const button of buttons) {
      row.push(button);
      if (row.length >= elevation) {
        keyboard.push(row);
        row = [];
      }
    }
    if (row.length > 0) {
      keyboard.push(row);
    }
    if (elevation === 1) {
      replyMarkup.reply_markup = { [type]: keyboard.map((row) => [row]) };
    } else {
      replyMarkup.reply_markup = { [type]: keyboard };
    }
    return replyMarkup.reply_markup;
  }
}

function is2D<T>(array: T[]): boolean {
  if (!Array.isArray(array)) {
    return false;
  }
  for (let i = 0; i < array.length; i++) {
    if (!Array.isArray(array[i])) {
      return false;
    }
  }
  return true;
}

function buildKeyboard(buttons: Button[], options: BuildKeyboard): Button[][] {
  if (!Array.isArray(buttons) || buttons.length === 0) {
    return [];
  }

  if (is2D(buttons)) {
    return buttons.map((row) =>
      Array.isArray(row) ? row.filter((button: Button) => !button.hide) : [row],
    );
  }

  const wrapFn =
    options?.wrap ??
    ((_btn: Button, _index: number, currentRow: Button[]) =>
      currentRow.length >= (options?.columns ?? 1));

  const result: Button[][] = [];
  let currentRow: Button[] = [];

  for (const button of buttons.filter((button) => !button.hide)) {
    if (
      wrapFn(button, currentRow.length, currentRow) &&
      currentRow.length > 0
    ) {
      result.push(currentRow);
      currentRow = [];
    }
    currentRow.push(button);
  }
  if (currentRow.length > 0) {
    result.push(currentRow);
  }

  return result;
}

export { Markup };
