import type { TelegramClient, ILoginOptions } from "./TelegramClient";

class PollingClient {
  #isClosed: boolean = false;
  public offset: number = 0;

  constructor(public readonly client: TelegramClient) {}

  async startPolling(options: ILoginOptions["polling"] = {}) {
    await this.client.getMe().then((res) => {
      this.client.user = res;
      this.client.emit("ready", this.client);
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
