import { BaseClient } from "./BaseClient";
import { CombinedClass } from "./helpers/CombinedClass";
import { type CallbackQuery, type Message } from "@grammyjs/types";

/**
 * A class representing a Telegram Bot client.
 * @extends BaseClient
 */
export class TelegramBot extends BaseClient {
  token: string = "";
  intents: string[] | number[] | null = null;
  parseMode?: string;
  chatId?: string | number;
  queryString?: string;
  offSetType?: any;
  baseUrl: string = "";
  countCollector?: number;
  updatesProcess?: CombinedClass;

  /**
   * Creates a new TelegramBot client.
   * @param {string} token - The Telegram Bot API token.
   * @param {Object} [options] - The client options.
   * @param {string | array | number} [options.intents] - The client intents.
   * @param {string} [options.parseMode] - The parse mode for message formatting.
   * @param {string | number} [options.chatId] - The default chat ID for sending messages.
   * @param {string} [options.queryString] - The default query string for API requests.
   * @param {string | object} [options.offSetType] - The type of offset to use for updates.
   */
  constructor(
    token: string,
    options: {
      intents?: readonly string[] | number[] | null;
      parseMode?: string;
      chatId?: string | number;
      queryString?: string;
      offSetType?: any;
    } = {}
  ) {
    super(
      token,
      options.intents || null,
      options.parseMode,
      options.chatId,
      options.queryString,
      options.offSetType
    );

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

    this.countCollector = 0;
  }

  /**
   * Defines a command handler.
   * @param {string | string[]} command - The command string or an array of command strings.
   * @param {(message: Message.TextMessage, args?: string[]) => void} callback - The callback function to handle the command.
   */
  public command(
    command: string | string[],
    callback: (message: Message.TextMessage, args?: string[]) => void
  ): void {
    if (typeof command === "string") {
      this.on("message", (message: Message.TextMessage) => {
        const args = message.text.split?.(" ");
        const text = message.text;
        if (text && text.startsWith(`/${command}`)) {
          callback(message, args);
        }
      });
    } else if (Array.isArray(command)) {
      this.on("message", (message: Message.TextMessage) => {
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
   * @param {(callbackQuery: CallbackQuery) => void} callback - The callback function to handle the action.
   * @param {boolean} [answer=false] - Whether to answer the action.
   */
  public action(
    data: string | string[],
    callback: (callbackQuery: CallbackQuery) => void,
    answer: boolean = false
  ): void {
    if (typeof data === "string") {
      this.on("callback_query", (ctx) => {
        if (answer) {
          this.answerCallbackQuery({
            callbackQueryId: ctx.id,
          });
        }
        if (ctx.data === data) {
          callback(ctx);
        }
      });
    } else if (Array.isArray(data)) {
      this.on("callback_query", (ctx) => {
        if (answer) {
          this.answerCallbackQuery({
            callbackQueryId: ctx.id,
          });
        }
        if (data.some((d) => d === ctx.data)) {
          callback(ctx);
        }
      });
    }
  }
  /**
   * The function that starts the whole process.
   */
  public async login(): Promise<void> {
    const client = await this.getMe();

    const responseClient = await {
      ...client,
      setCommands: this.setMyCommands.bind(this),
      getCommands: this.getMyCommands.bind(this),
      deleteCommands: this.deleteMyCommands.bind(this),
      setDescription: this.setMyDescription.bind(this),
      getDescription: this.getMyDescription.bind(this),
      setShortDescription: this.setMyShortDescription.bind(this),
      getShortDescription: this.getMyShortDescription.bind(this),
      getName: this.getMyName.bind(this),
      setName: this.setMyName.bind(this),
    };

    this.updatesProcess = new CombinedClass(this);

    (async () => {
      this.getMe()
        .then((res) => {
          this.emit("ready", responseClient);
        })
        .catch((err) => {
          console.log(err);
        });
    })();

    this.updatesProcess.processUpdate();
  }
}
