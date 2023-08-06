import { BaseClient } from "./BaseClient";
import { CombinedClass } from "./helpers/CombinedClass";
import { CallbackQuery, Message, Update } from "@telegram.ts/types";
import { Context } from "./Context";
import isRegex from "is-regex";

export class TelegramBot<F = Buffer> extends BaseClient<F> {
  token: string = "";
  intents?: string[] | number[] | number | null;
  baseUrl: string = "";
  processUpdate: (webhook?: Update[] | undefined) => Promise<void>;
  session: any;

  constructor(
    token: string,
    options: {
      intents?: string[] | number[] | number | null;
      session?: any;
    } = {},
  ) {
    super(token, options.intents || null);

    /**
     * The Telegram Bot API token.
     * @type {string}
     */
    this.token = token;

    /**
     * The base URL for the Telegram Bot API.
     * @type {string}
     */
    this.baseUrl = `https://api.telegram.org/bot${this.token}`;

    this.processUpdate = new CombinedClass<F>(this).processUpdate;
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
   *   message.reply(`${username}, wrote on dislike 🫠`, true);
   * });
   * ```
   * @param {string | string[] | RegExp} command - The command string or an array of command strings.
   * @param {(message: (Message.TextMessage & Context<F>), args?: string[]) => void} callback - The callback function to handle the command.
   */
  public command(
    command: string | string[] | RegExp,
    callback: (
      message: Message.TextMessage & Context<F>,
      args?: string[],
    ) => void,
    typeChannel: "private" | "group" | "supergroup" | "channel" | false = false,
  ): void {
    this.on("message", async (message: Message.TextMessage & Context<F>) => {
      if (typeChannel === message.chat.type || typeChannel === false) {
        const args = message?.text.split(" ");
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
    });
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
  public action(
    data: string | string[] | RegExp,
    callback: (callbackQuery: CallbackQuery & Context<F>) => void,
    answer: boolean = false,
  ): void {
    this.on("callback_query", async (ctx: CallbackQuery & Context<F>) => {
      if (answer) {
        ctx.answerCallbackQuery().catch(() => console.log);
      }

      if (
        (typeof data === "string" && ctx.data === data) ||
        (Array.isArray(data) && data.some((d) => d === ctx.data)) ||
        (isRegex(data) && data.test(ctx.data as string))
      ) {
        await callback(ctx);
      }
    });
  }

  /**
   * Registers a callback function to be executed when a message is received
   * that includes the specified text.
   * ```ts
   * import { TelegramBot } from "telegramsjs"
   *
   * const bot = new TelegramBot('BOT_TOKEN');
   *
   * bot.hears('hi', (ctx) => ctx.reply('hi!'));
   * bot.hears(['help', 'start'] => ctx.reply('helpers!'))
   *
   * bot.login()
   * ```
   * @param {string | string[] | RegExp} text - The text to match in the received messages.
   * @param {(message: (Message.TextMessage & Context<F>, args[])) => void} callback - The callback function to be executed when a matching message is received.
   * It receives the matched message object as a parameter.
   * @returns void
   */
  public hears(
    text: string | string[] | RegExp,
    callback: (
      message: Message.TextMessage & Context<F>,
      args?: string[],
    ) => void,
  ): void {
    this.on("message", async (message: Message.TextMessage & Context<F>) => {
      const args = message?.text.split(" ");

      if (
        (typeof text === "string" && message.text.includes(text)) ||
        (Array.isArray(text) && text.some((d) => message.text.includes(d))) ||
        (isRegex(text) && text.test(message.text))
      ) {
        await callback(message, args);
      }
    });
  }

  /**
   * Use this function to set a session for the Telegram bot. The "use"
   * function assigns the provided session object to the bot instance,
   * allowing you to use session data and manage user interactions across different requests.
   * @param {any} session - The session object to be used by the bot
   */
  public use(session: any): void {
    this.session = session;
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
  public async login(): Promise<void> {
    const updatesProcess = new CombinedClass<F>(this);

    (async () => {
      this.getMe()
        .then((res) => {
          this.emit("ready", res);
        })
        .catch((err) => {
          throw err;
        });
    })();

    await updatesProcess.processUpdate();
  }
}
