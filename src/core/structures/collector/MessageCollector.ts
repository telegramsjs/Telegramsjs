import type { Context } from "../../context";
import { TelegramBot } from "../../../client";
import type { Chat } from "@telegram.ts/types";
import { Collection } from "@telegram.ts/collection";
import { Collector, type ICollectorOptions } from "./Collector";

type Msg = Omit<Context["msg"], "callbackQuery">;

type MsgCollectorContext = Msg & Context;

class MessageCollector extends Collector<number, MsgCollectorContext> {
  channel: Chat;
  received: number = 0;

  constructor(
    public readonly telegram: TelegramBot,
    public readonly message: Msg,
    public readonly options: ICollectorOptions<
      number,
      MsgCollectorContext
    > = {},
  ) {
    super(options);
    this.channel = message.chat;

    telegram.incrementMaxListeners();
    telegram.on("message", this.handleCollect);
    telegram.on("channel_post", this.handleCollect);
    this.once("end", () => {
      telegram.off("message", this.handleCollect);
      telegram.off("channel_post", this.handleCollect);
      telegram.decrementMaxListeners();
    });
  }

  collect(message: MsgCollectorContext): number | null {
    if (message.chat.id !== this.channel.id) return null;
    this.received++;
    return message.message_id;
  }

  dispose(message: MsgCollectorContext): number | null {
    return message.chat.id === this.channel.id ? message.message_id : null;
  }

  get endReason(): string | null {
    const { max, maxProcessed } = this.options;

    if (max && this.collected.size >= max) {
      return "limit";
    }

    if (maxProcessed && this.received === maxProcessed) {
      return "processedLimit";
    }

    return super.endReason;
  }
}

export { MessageCollector, MsgCollectorContext };
