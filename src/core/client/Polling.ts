import { handleUpdate } from "../util";
import type { TelegramBot, ILoginOptions } from "../../client";

class Polling {
  offset: number = 0;
  #connect: boolean = true;

  constructor(
    public readonly tg: TelegramBot,
    public readonly options: ILoginOptions["polling"],
  ) {}

  async startPolling() {
    while (this.#connect) {
      const updates = await this.tg.getUpdates({
        ...this.options,
        offset: this.offset,
      });
      const offset = handleUpdate(this.tg, updates);
      if (offset) {
        this.offset = offset;
      }
    }
  }

  close() {
    this.#connect = false;
  }
}

export { Polling };
