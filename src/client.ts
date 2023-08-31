import { Api } from "./api";
import { Combined } from "./helpers/Combined";
import {
  CallbackQuery,
  InlineQuery,
  ChosenInlineResult,
  Message,
  Update,
  UserFromGetMe,
} from "@telegram.ts/types";
import { TextCaptionContextMessage } from "./collection/MessageCollector";
import { Context } from "./context";
import { AllowedUpdates } from "./request";
import isRegex from "is-regex";

class TelegramBot<F = Buffer> extends Api<F> {
  token: string;
  session: unknown = {};
  updatesProcess: Combined<F>;

  /**
   * Constructs a new TelegramBot object.
   * @param {string} token - The API token for the bot.
   * @param {number} [options.limit=100] - Limits the number of updates to be retrieved. Values between 1-100 are accepted.
   * @param {number} [options.timeout=0] - Timeout in seconds for long polling. Defaults to 0, i.e. usual short polling. Should be positive, short polling should be used for testing purposes only.
   * @param {AllowedUpdates} [options.allowed_updates=AllowedUpdates] - The types of updates the bot is interested in.
   * @param {unknown} [session=object] - The session object to be used by the bot
   */
  constructor(
    token: string,
    options: {
      limit?: number;
      timeout?: number;
      allowed_updates?: AllowedUpdates;
      session?: unknown;
    } = {},
  ) {
    super(token, options);

    /**
     * The Telegram Bot API token.
     * @type {string}
     */
    this.token = token;

    /** Staring bot **/
    this.updatesProcess = new Combined<F>(this);
  }

  /**
   * Defines a command handler.
   * ```ts
   * // Register a command handler for the "/like" command
   * bot.command("like", (message, args) => {
   *   const username = message.from.first_name;
   *   message.reply(`${username}, wrote like ❤️`);
   * });
   *
   * // Register a command handler for multiple commands: "/like" and "/dislike"
   * bot.command(["like", "dislike"], (message, args) => {
   *   const username = message.from.first_name;
   *   if (args[0] === "like") {
   *     message.reply(`${username}, wrote like ❤️`);
   *   } else if (args[0] === "dislike") {
   *     message.reply(`${username}, wrote on dislike 🫠`);
   *   }
   * });
   *
   * // Register a command handler for the "/dislike" command with interactive answer
   * bot.command("dislike", (message, args) => {
   *   const username = message.from.first_name;
   *   message.reply(`${username}, wrote on dislike 🫠`);
   * });
   * ```
   * @param {string | string[] | RegExp} command - The command string or an array of command strings.
   * @param {(message: (Message.TextMessage & Context<F>), args?: string[]) => void} callback - The callback function to handle the command.
   * @param {string | boolean} [typeChannel=false] - In what type of channels to watch command
   */
  command(
    command: string | string[] | RegExp,
    callback: (
      message: Message.TextMessage & Context<F>,
      args?: string[],
    ) => void,
    typeChannel: "private" | "group" | "supergroup" | "channel" | false = false,
  ): void {
    this.on(
      "message:text",
      async (message: Message.TextMessage & Context<F>) => {
        if (typeChannel === message.chat.type || typeChannel === false) {
          const args = message.text.split(/\s+/);
          const text = message.text;

          if (
            (typeof command === "string" && text.startsWith(`/${command}`)) ||
            (Array.isArray(command) &&
              command.some((cmd) => text.startsWith(`/${cmd}`))) ||
            (isRegex(command) && command.test(text))
          ) {
            await callback(message, args);
          }
        }
      },
    );
  }

  /**
   * Defines an action handler.
   * ```ts
   * // Action allows you to track button click events 'callback_data'
   * bot.action("like", (ctx) => {
   *   const username = ctx.first_name;
   *   ctx.reply(`${username}, clicked like ❤️`);
   * });
   *
   * // Action can track, not only one interaction, but several at once
   * bot.action(["like", "dislike"], (ctx) => {
   *   const username = ctx.first_name;
   *   if (ctx.data === "like") {
   *   ctx.reply(`${username}, clicked like ❤️`);
   *   } else {
   *   ctx.reply(`${username}, clicked on dislike 🫠`);
   *   }
   * });
   *
   * // To answer interactively use the third argument 'answer'
   * bot.action("dislike", (ctx) => {
   *   const username = ctx.first_name;
   *   ctx.reply(`${username}, clicked on dislike 🫠`);
   * }, true);
   * ```
   * @param {string | string[] | RegExp} data - The action data string or an array of action data strings.
   * @param {(callbackQuery: (CallbackQuery & Context<F>)) => void} callback - The callback function to handle the action.
   * @param {boolean} [answer=false] - Whether to answer the action.
   */
  action(
    data: string | string[] | RegExp,
    callback: (callbackQuery: CallbackQuery & Context<F>) => void,
    answer: boolean = false,
  ): void {
    this.on("callback_query:data", async (ctx: CallbackQuery & Context<F>) => {
      if (
        (typeof data === "string" && ctx.data === data) ||
        (Array.isArray(data) && data.some((d) => d === ctx.data)) ||
        (isRegex(data) && data.test(ctx.data as string))
      ) {
        if (answer) {
          ctx.answerCallbackQuery().catch(() => console.log);
        }
        await callback(ctx);
      }
    });
  }

  /**
   * Registers a callback function to be executed when a message is received
   * that includes the specified text.
   * ```ts
   * bot.hears('hi', (ctx) => ctx.reply('hi!'));
   *
   * bot.hears(['help', 'start'], (ctx) => ctx.reply('helpers!'));
   *
   * bot.hears(/marmok/, (ctx) => ctx.reply("Hi marmok!"));
   * ```
   * @param {string | string[] | RegExp} text - The text to match in the received messages.
   * @param {(message: (TextCaptionContextMessage<F>, args: string[])) => void} callback - The callback function to be executed when a matching message is received.
   * @param {boolean} [caption=true] - track, text only?
   * It receives the matched message object as a parameter.
   * @returns void
   */
  hears(
    text: string | string[] | RegExp,
    callback: (message: Message, args: string[]) => void,
    caption: boolean = true,
  ): void {
    this.on("message", async (message) => {
      if (!caption && message.caption) return;
      const content = (message.text || message.caption) as string;

      if (
        (typeof text === "string" && content.includes(text)) ||
        (Array.isArray(text) && text.some((d) => content.includes(d))) ||
        (isRegex(text) && text.test(content))
      ) {
        const args = content.split(/\s+/);
        await callback(message, args);
      }
    });
  }

  /**
   * Registers a callback function to be executed when an inline query matches the specified text.
   * ```ts
   * // Example usage for matching a single text
   * bot.inlineQuery('search', (ctx) => {
   *   // Your callback logic here
   * });
   *
   * // Example usage for matching multiple texts using an array
   * bot.inlineQuery(['help', 'info'], (ctx) => {
   *   // Your callback logic here
   * });
   *
   * // Example usage for matching using a regular expression
   * bot.inlineQuery(/^start/, async (ctx) => {
   *   const query = ctx.query;
   *
   * // Your logic to generate results based on the query
   * const results = [
   *  {
   *     type: 'article',
   *     id: '1',
   *     title: 'Result 1',
   *    input_message_content: {
   *       message_text: 'This is result 1'
   *     }
   *   },
   *   // Add more results as needed
   * ];
   *
   * await ctx.answerInlineQuery({ results: results });
   * });
   * ```
   * @param {string | string[] | RegExp} text - The text or patterns to match in the inline query.
   * @param {(inlineQuery: InlineQuery & Context<F>) => void} callback - The callback function to be executed when a matching inline query is received.
   * It receives the matched inline query object as a parameter.
   * @returns void
   */
  inlineQuery(
    text: string | string[] | RegExp,
    callback: (inlineQuery: InlineQuery & Context<F>) => void,
  ) {
    this.on("inline_query", async (ctx: InlineQuery & Context<F>) => {
      if (
        (typeof text === "string" && ctx.query === text) ||
        (Array.isArray(text) && text.some((d) => d === ctx.query)) ||
        (isRegex(text) && text.test(ctx.query))
      ) {
        await callback(ctx);
      }
    });
  }

  /**
   * Use this function to set a session for the Telegram bot. The "use"
   * function assigns the provided session object to the bot instance,
   * allowing you to use session data and manage user interactions across different requests.
   * @param {session} [session=object] - The session object to be used by the bot
   * @param {combine} [combine=boolean] - this parameter is responsible for combining previous sessions
   */
  use<T>(session: T, combine: boolean = true): void {
    if (combine) {
      this.session = {
        ...(this.session as T),
        ...session,
      };
      return;
    }
    this.session = session || {};
  }

  /**
   * The function that starts the whole process.
   * ```ts
   * import { TelegramBot } from "telegramsjs";
   * import { UserFromGetMe } from "@telegram.ts/types";
   *
   * const bot = new TelegramBot('BOT_TOKEN');
   *
   * bot.on('ready', (user: UserFromGetMe) => {
   *  console.log(`Bot ${user.username}`)
   * })
   *
   * bot.login()
   * ```
   */
  async login(): Promise<void> {
    try {
      const response = await this.getMe();
      this.emit("ready", response);
      await this.updatesProcess.processUpdate();
    } catch (error) {
      throw error;
    }
  }
}

export { TelegramBot };
