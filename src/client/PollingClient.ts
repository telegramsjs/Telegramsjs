import { Events } from "../util/Constants";
import type { TelegramClient, ILoginOptions } from "./TelegramClient";

/**
 * Represents a client for handling Telegram updates using long polling.
 */
class PollingClient {
  /**
   * The offset used to keep track of the latest updates.
   */
  public offset: number;

  /**
   * Indicates whether the polling client is closed.
   */
  #isClosed: boolean = false;

  /**
   * Creates an instance of PollingClient.
   * @param client - The Telegram client instance.
   * @param offset - The initial offset for polling.
   */
  constructor(
    public readonly client: TelegramClient,
    offset?: number,
  ) {
    this.offset = offset || 0;
  }

  /**
   * Starts the polling process to receive updates from Telegram.
   * @param options - The polling options.
   */
  async startPolling(options: ILoginOptions["polling"] = {}): Promise<void> {
    await this.client.getMe().then((res) => {
      this.client.user = res;
      this.client.readyTimestamp = Date.now();
      this.client.emit(Events.Ready, this.client);
    });
    await this.poll(options);
  }

  /**
   * Polls for new updates from Telegram.
   * @param options - The polling options.
   */
  async poll(options: ILoginOptions["polling"]): Promise<void> {
    try {
      const response = await this.client.getUpdates({
        ...options,
        offset: this.offset,
      });

      if (response.length > 0) {
        const lastItem = response[response.length - 1];
        if (lastItem) {
          this.offset = lastItem.update_id + 1;
        }
      }

      for (const data of response) {
        const update = await this.client.worket.processUpdate(data);
        if (update) {
          this.client.updates.set(this.offset, update);
        }
      }
    } catch (err) {
      if (
        this.client.options?.errorHandler &&
        this.client.eventNames().indexOf("error") !== -1
      ) {
        this.client.emit("error", [this.offset, err]);
        return;
      }
      throw err;
    } finally {
      if (!this.#isClosed) {
        setTimeout(async () => {
          await this.poll(options);
        }, this.client.options?.pollingTimeout ?? 300);
      }
    }
  }

  /**
   * Closes the polling client, stopping further updates.
   * @returns The closed state of the polling client.
   */
  close(): boolean {
    return (this.#isClosed = true);
  }
}

export { PollingClient };
