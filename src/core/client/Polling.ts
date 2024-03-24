import { handleUpdate } from "../util";
import type { TelegramBot, ILoginOptions } from "../../client";

class Polling {
  offset: number = 0;

  constructor(
    public readonly tg: TelegramBot,
    public readonly options: ILoginOptions["polling"],
  ) {}

  async startPolling() {
    while (true) {
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
}

export { Polling };
