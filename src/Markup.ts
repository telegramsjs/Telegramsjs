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

export class Markup {
  private reply_markup: ReplyMarkup;

  constructor() {
    this.reply_markup = {};
  }

  public setText(text: string): this {
    this.reply_markup.text = text;
    return this;
  }

  public selective(value = true): this {
    this.reply_markup.selective = value;
    return this;
  }

  public placeholder(placeholder: string): this {
    this.reply_markup.input_field_placeholder = placeholder;
    return this;
  }

  public resize(value = true): this {
    this.reply_markup.resize_keyboard = value;
    return this;
  }

  public oneTime(value = true): this {
    this.reply_markup.one_time_keyboard = value;
    return this;
  }

  public removeKeyboard(): this {
    this.reply_markup.remove_keyboard = true;
    return this;
  }

  public forceReply(): this {
    this.reply_markup.force_reply = true;
    return this;
  }

  public keyboard(buttons: Button[], options?: WrapOptions): this {
    const keyboard = this.buildKeyboard(buttons, {
      columns: 1,
      ...options,
    });
    this.reply_markup.keyboard = keyboard;
    return this;
  }

  public inlineKeyboard(buttons: Button[], options?: WrapOptions): this {
    const inlineKeyboard = this.buildKeyboard(buttons, {
      columns: buttons.length,
      ...options,
    });
    this.reply_markup.inline_keyboard = inlineKeyboard;
    return this;
  }

  private buildKeyboard(buttons: Button[], options: BuildKeyboard): Button[][] {
    if (!Array.isArray(buttons) || buttons.length === 0) {
      return [];
    }

    if (this.is2D(buttons)) {
      return buttons.map((row) =>
        Array.isArray(row)
          ? row.filter((button: Button) => !button.hide)
          : [row],
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

  private is2D<T>(array: T[]): boolean {
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
  
  public static text(text: string): Text {
    return {
      text
    };
  }

  public static contactRequest(
    text: string,
  ): KeyboardButton.RequestContactButton & Text {
    return {
      text,
      request_contact: true,
    };
  }

  public static locationRequest(
    text: string,
  ): KeyboardButton.RequestLocationButton & Text {
    return {
      text,
      request_location: true,
    };
  }

  public static pollRequest(
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

  public static userRequest(
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

  public static chatRequest(
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

  public static url(
    text: string,
    url: string,
  ): InlineKeyboardButton.UrlButton & Text {
    return {
      text,
      url,
    };
  }

  public static callback(
    text: string,
    data: string,
  ): InlineKeyboardButton.CallbackButton & Text {
    return {
      text,
      callback_data: data,
    };
  }

  public static switchToChat(
    text: string,
    value: string,
  ): InlineKeyboardButton.SwitchInlineButton & Text {
    return {
      text,
      switch_inline_query: value,
    };
  }

  public static switchToCurrentChat(
    text: string,
    value: string,
  ): InlineKeyboardButton.SwitchInlineCurrentChatButton & Text {
    return {
      text,
      switch_inline_query_current_chat: value,
    };
  }

  public static game(text: string): InlineKeyboardButton.GameButton & Text {
    return {
      text,
      callback_game: {},
    };
  }

  public static pay(text: string): InlineKeyboardButton.PayButton & Text {
    return {
      text,
      pay: true,
    };
  }

  public static login(
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

  public static webApp(
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

  public static generateReplyMarkup(
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
