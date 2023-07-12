import { BaseClient } from "./BaseClient";
import { CombinedClass } from "./helpers/CombinedClass";
import { CallbackQuery, Message } from "@telegram.ts/types";
import { Context } from "./Context";

export class TelegramBot<F = Buffer> extends BaseClient<F> {
  token: string = "";
  intents?: string[] | number[] | number | null;
  baseUrl: string = "";
  session?: any;
  updatesProcess?: CombinedClass<F>;

  constructor(
    token: string,
    options: {
      intents?: string[] | number[] | number | null;
      session?: any;
    } = {}
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
  }

  /**
   * Defines a command handler.
   * @param {string | string[]} command - The command string or an array of command strings.
   * @param {(message: (Message.TextMessage & Context<F>), args?: string[]) => void} callback - The callback function to handle the command.
   */
  public command(
    command: string | string[],
    callback: (
      message: Message.TextMessage & Context<F>,
      args?: string[]
    ) => void
  ): void {
    if (typeof command === "string") {
      this.on("message", (message) => {
        const args = message.text.split?.(" ");
        const text = message.text;
        if (text && text.startsWith(`/${command}`)) {
          callback(message, args);
        }
      });
    } else if (Array.isArray(command)) {
      this.on("message", (message) => {
        const args = message.text.split?.(" ");
        const text = message.text;
        if (text && command.some((cmd) => text.startsWith(`/${cmd}`))) {
          callback(message, args);
        }
      });
    }
  }

  /**
   * Defines an action handler.
   * @param {string | string[]} data - The action data string or an array of action data strings.
   * @param {(callbackQuery: (CallbackQuery & Context<F>)) => void} callback - The callback function to handle the action.
   * @param {boolean} [answer=false] - Whether to answer the action.
   */
  public action(
    data: string | string[],
    callback: (callbackQuery: CallbackQuery & Context<F>) => void,
    answer: boolean = false
  ): void {
    if (typeof data === "string") {
      this.on("callback_query", (ctx) => {
        if (answer) {
          ctx.answerCallbackQuery();
        }
        if (ctx.data === data) {
          callback(ctx);
        }
      });
    } else if (Array.isArray(data)) {
      this.on("callback_query", (ctx) => {
        if (answer) {
          ctx.answerCallbackQuery();
        }
        if (data.some((d) => d === ctx.data)) {
          callback(ctx);
        }
      });
    }
  }

  public use(params: any): void {
    this.session = params;
  }
  /**
   * The function that starts the whole process.
   */
  public async login(): Promise<void> {
    const updatesProcess = new CombinedClass<F>(this);

    (async () => {
      this.getMe()
        .then((res) => {
          this.emit("ready", res);
        })
        .catch((err) => {
          console.log(err);
        });
    })();

    updatesProcess.processUpdate();
  }
}
