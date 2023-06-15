import { BaseClient } from "./BaseClient";
import { UpdateProcessor } from "./helpers/UpdateProcessor";

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
  updatesProcess?: UpdateProcessor;

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
    } = {},
  ) {
    super(
      token,
      options.intents || null,
      options.parseMode,
      options.chatId,
      options.queryString,
      options.offSetType,
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
   * @param {Function} callback - The callback function to handle the command.
   */
  public command(
    command: string | string[],
    callback: (message: object, args?: string[]) => void,
  ): void {
    if (typeof command === "string") {
      this.on("message", (message: object) => {
        const args = (message as any)?.text?.join?.(" ");
        const text = (message as any)?.text;
        if (text && text.startsWith(`/${command}`)) {
          callback(message, args);
        }
      });
    } else if (Array.isArray(command)) {
      this.on("message", (message: object) => {
        const args = (message as any)?.text?.join?.(" ");
        const text = (message as any)?.text;
        if (text && command.some(cmd => text.startsWith(`/${cmd}`))) {
          callback(message, args);
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

    this.updatesProcess = new UpdateProcessor(this);

    (async () => {
      this.getMe()
        .then(res => {
          this.emit("ready", responseClient);
        })
        .catch(err => {
          console.log(err);
        });
    })();

    this.updatesProcess.processUpdate(this);
  }
}
