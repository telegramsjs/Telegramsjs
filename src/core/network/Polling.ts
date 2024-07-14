import { handleUpdate } from "../util";
import type { TelegramBot, ILoginOptions } from "../../client";

/**
 * Class representing a polling mechanism for a Telegram bot.
 */
class Polling {
  /**
   * The current update offset.
   */
  offset: number = 0;

  /**
   * Flag to control the connection state.
   * @private
   */
  #connect: boolean = true;

  /**
   * Creates an instance of Polling.
   * @param telegram - The Telegram bot instance.
   * @param options - The polling options for login.
   */
  constructor(
    public readonly telegram: TelegramBot,
    public readonly options: ILoginOptions["polling"],
  ) {}

  /**
   * Starts the polling process to fetch updates from the Telegram bot.
   * The method continues to fetch updates as long as the connection flag is true.
   */
  async startPolling() {
    await this.telegram.getMe().then((me) => {
      this.telegram.emit("ready", me);
      this.telegram.botInfo = me;
    });

    while (this.#connect) {
      const updates = await this.telegram.getUpdates({
        ...this.options,
        offset: this.offset,
      });
      const offset = handleUpdate(this.telegram, updates);
      if (offset) {
        this.offset = offset;
      }
    }
  }

  /**
   * Stops the polling process by setting the connection flag to false.
   */
  close() {
    this.#connect = false;
  }
}

export { Polling };
