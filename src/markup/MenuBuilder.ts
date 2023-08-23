import { TelegramBot } from "../TelegramBot";
import { CallbackQuery } from "@telegram.ts/types";
import { Context } from "../Context";

type MenuFunction<F> = (callbackQuery: CallbackQuery & Context<F>) => void;

type Rows<F> = {
  type: string;
  text?: string;
  callback?: MenuFunction<F>;
  callback_data?: string;
  url?: string;
}[];

interface CallbackMarkup {
  text: string;
  callback_data: string;
}

interface URLMarkup {
  text: string;
  url: string;
}

interface URLAndCallbackMarkup {
  text: string;
  url: string;
  callback_data?: string;
}

class MenuBuilder<F> {
  identifier?: string;
  rows: Rows<F>;
  telegram?: TelegramBot<F>;

  /**
   * Creates an instance of MenuBuilder.
   * @param {string} [identifier] - An identifier for the menu.
   * @param {TelegramBot<F>} [bot] - The Telegram bot instance.
   */
  constructor(identifier?: string, bot?: TelegramBot<F>) {
    this.identifier = identifier;
    this.telegram = bot;
    this.rows = [];
  }

  /**
   * Adds a text button to the menu.
   * ```ts
   * const menu = new MenuBuilder("text", bot)
   * .text("A", (ctx) => {
   *  ctx.reply("A - button");
   * })
   * .text("B", (ctx) => {
   *  ctx.reply("B - button!");
   * })
   * .text("C")
   * .build();
   *
   * bot.action("menu_text_C", (ctx) => {
   *  ctx.reply("C - button!");
   * }, true);
   *
   * bot.command("text", (ctx) => {
   *  ctx.reply("Menu:", { reply_markup: menu });
   * });
   * ```
   * @param {string} text - The text for the button.
   * @param {MenuFunction<F>} callback - The callback function for the button.
   * @returns {this} The current MenuBuilder instance.
   */
  text(text: string, callback: MenuFunction<F>): this {
    this.rows.push({
      type: "text",
      text,
      callback,
      callback_data: `menu_${this.identifier}_${text}`,
    });
    return this;
  }

  /**
   * Adds a URL button to the menu.
   * ```ts
   * const menu = new MenuBuilder()
   * .url("Marmok #1", "https://youtu.be/x8cuvUdeSqc")
   * .url("Marmok #2", "https://youtu.be/J6a57KEV6hY")
   * .url("Marmok #3", "https://youtu.be/4lLcv16u7po")
   * .build();
   *
   * bot.command("url", (ctx) => {
   *  ctx.reply("Menu url:", { reply_markup: menu });
   * });
   * ```
   * @param {string} text - The text for the button.
   * @param {string} url - The URL for the button.
   * @returns {this} The current MenuBuilder instance.
   */
  url(text: string, url: string): this {
    this.rows.push({
      type: "url",
      text,
      url,
    });
    return this;
  }

  /**
   * Adds an empty row to the menu.
   * ```ts
   * const menu = new MenuBuilder("row", bot)
   * .text("A", (ctx) => {
   *  ctx.reply("A - button");
   * })
   * .row()
   * .text("B", (ctx) => {
   *  ctx.reply("B - button!");
   * })
   * .row()
   * .text("C", (ctx) => {
   *  ctx.reply("C - button!");
   * })
   * .build();
   *
   * bot.command("buttons", (ctx) => {
   *  ctx.reply("Menu:", { reply_markup: menu });
   * });
   * ```
   * @returns {this} The current MenuBuilder instance.
   */
  row(): this {
    this.rows.push({ type: "row" });
    return this;
  }

  /**
   * Builds the menu and returns the inline keyboard structure.
   * ```ts
   * const menu = new MenuBuilder("build", bot)
   * .text("A", (ctx) => {
   *  ctx.reply("A - button");
   * })
   * .text("B", (ctx) => {
   *  ctx.reply("B - button!");
   * })
   * .url("marmok", "https://youtu.be/x8cuvUdeSqc")
   * .build();
   *
   * bot.command("menu", (ctx) => {
   *  ctx.reply("Menu:", { reply_markup: menu });
   * });
   * ```
   * @returns {{ inline_keyboard: (CallbackMarkup | URLMarkup | URLAndCallbackMarkup)[][] }} The inline keyboard structure.
   */
  build(): {
    inline_keyboard: (CallbackMarkup | URLMarkup | URLAndCallbackMarkup)[][];
  } {
    const buttons = [];
    let currentRow: (CallbackMarkup | URLMarkup | URLAndCallbackMarkup)[] = [];

    for (const rowItem of this.rows) {
      if (rowItem.type === "text") {
        currentRow.push({
          text: rowItem.text as string,
          callback_data: `menu_${this.identifier}_${rowItem.text}`,
        });
      } else if (rowItem.type === "url") {
        currentRow.push({
          text: rowItem.text as string,
          url: rowItem.url as string,
        });
      } else if (rowItem.type === "row") {
        if (currentRow.length > 0) {
          buttons.push([...currentRow]);
          currentRow = [];
        }
      }
    }

    if (currentRow.length > 0) {
      buttons.push([...currentRow]);
    }

    for (const item of this.rows) {
      if (!item.callback) continue;
      if (!this.identifier) throw Error("specify the parameter 'identifier'");
      if (!this.telegram?.on)
        throw Error("you need to specify the second parameter 'bot'");
      const callback = item.callback;
      this.telegram.on(
        "callback_query:data",
        async (ctx: CallbackQuery & Context<F>) => {
          if (ctx.data === item.callback_data) {
            await callback(ctx);
          }
        },
      );
    }

    return { inline_keyboard: buttons };
  }
}

export { MenuBuilder };
