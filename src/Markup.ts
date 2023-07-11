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
    request_id: string;
    user_is_premium?: boolean;
    user_is_bot?: boolean;
  };
  request_chat?: {
    request_id: string;
    chat_is_channel: boolean;
  };
  url?: string;
  callback_data?: string;
  switch_inline_query?: string;
  switch_inline_query_current_chat?: string;
  callback_game?: {};
  pay?: boolean;
  login_url?: {
    url: string;
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

  public keyboard(buttons: Button[], options: any): this {
    const keyboard = this.buildKeyboard(buttons, {
      columns: 1,
      ...options,
    });
    this.reply_markup.keyboard = keyboard;
    return this;
  }

  public inlineKeyboard(buttons: Button[], options: any): this {
    const inlineKeyboard = this.buildKeyboard(buttons, {
      columns: buttons.length,
      ...options,
    });
    this.reply_markup.inline_keyboard = inlineKeyboard;
    return this;
  }

  private buildKeyboard(buttons: Button[], options: any): Button[][] {
    const result: Button[][] = [];
    if (!Array.isArray(buttons)) {
      return result;
    }
    if (this.is2D(buttons)) {
      return buttons.map((row) =>
        Array.isArray(row)
          ? row.filter((button: Button) => !button.hide)
          : [row]
      );
    }
    const wrapFn =
      options.wrap !== undefined
        ? options.wrap
        : (_btn: Button, _index: number, currentRow: Button[]) =>
            currentRow.length >= options.columns;
    let currentRow: Button[] = [];
    let index = 0;
    for (const btn of buttons.filter((button) => !button.hide)) {
      if (wrapFn(btn, index, currentRow) && currentRow.length > 0) {
        result.push(currentRow);
        currentRow = [];
      }
      currentRow.push(btn);
      index++;
    }
    if (currentRow.length > 0) {
      result.push(currentRow);
    }
    return result;
  }

  private is2D(array: any[]): boolean {
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

  public static text(text: string): Button {
    return {
      text,
    };
  }

  public static contactRequest(text: string): Button {
    return {
      text,
      request_contact: true,
    };
  }

  public static locationRequest(text: string): Button {
    return {
      text,
      request_location: true,
    };
  }

  public static pollRequest(text: string, type: string): Button {
    return {
      text,
      request_poll: {
        type,
      },
    };
  }

  public static userRequest(
    text: string,
    request_id: string,
    user_is_premium: boolean
  ): Button {
    return {
      text,
      request_user: {
        request_id,
        user_is_premium,
      },
    };
  }

  public static botRequest(text: string, request_id: string): Button {
    return {
      text,
      request_user: {
        request_id,
        user_is_bot: true,
      },
    };
  }

  public static groupRequest(
    text: string,
    request_id: string,
    args: any
  ): Button {
    return {
      text,
      request_chat: {
        request_id,
        chat_is_channel: false,
        ...args,
      },
    };
  }

  public static channelRequest(
    text: string,
    request_id: string,
    args: any
  ): Button {
    return {
      text,
      request_chat: {
        request_id,
        chat_is_channel: true,
        ...args,
      },
    };
  }

  public static url(text: string, url: string): Button {
    return {
      text,
      url,
    };
  }

  public static callback(text: string, data: string): Button {
    return {
      text,
      callback_data: data,
    };
  }

  public static switchToChat(text: string, value: string): Button {
    return {
      text,
      switch_inline_query: value,
    };
  }

  public static switchToCurrentChat(text: string, value: string): Button {
    return {
      text,
      switch_inline_query_current_chat: value,
    };
  }

  public static game(text: string): Button {
    return {
      text,
      callback_game: {},
    };
  }

  public static pay(text: string): Button {
    return {
      text,
      pay: true,
    };
  }

  public static login(text: string, url: string, opts = {}): Button {
    return {
      text,
      login_url: {
        ...opts,
        url,
      },
    };
  }

  public static webApp(text: string, url: string): Button {
    return {
      text,
      web_app: {
        url,
      },
    };
  }

  public getReplyMarkup(): string {
    return JSON.stringify(this.reply_markup);
  }

  public static generateReplyMarkup(
    markups: Markup[],
    elevation: number = 5,
    type: "keyboard" | "inline_keyboard" = "inline_keyboard"
  ): ReplyMarkup {
    const replyMarkup = new Markup();
    const buttons = markups.map((markup) => markup.getReplyMarkup());
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
