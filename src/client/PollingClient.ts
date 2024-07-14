import { Events } from "../util/Constants";
import type { TelegramClient, ILoginOptions } from "./TelegramClient";

class PollingClient {
  public offset: number;
  #isClosed: boolean = false;

  constructor(
    public readonly client: TelegramClient,
    offset?: number,
  ) {
    this.offset = offset || 0;
  }

  async startPolling(options: ILoginOptions["polling"] = {}) {
    await this.client.getMe().then((res) => {
      this.client.user = res;
      this.client.readyTimestamp = Date.now();
      this.client.emit(Events.Ready, this.client);
    });
    await this.poll(options);
  }

  async poll(options: ILoginOptions["polling"]) {
    try {
      const response = await this.client.getUpdates({
        ...options,
        offset: this.offset,
      });

      if (response.length) {
        this.offset = response[response.length - 1].update_id + 1;
      }

      for (const data of response) {
        await this.client.worket.processUpdate(data);
      }
    } catch (err) {
      throw err;
    } finally {
      if (!this.#isClosed) {
        setTimeout(async () => {
          await this.poll(options);
        }, options?.timeout);
      }
    }
  }

  close() {
    return (this.#isClosed = true);
  }
}

export { PollingClient };
