import type { Context } from "../../context";
import { TelegramBot } from "../../../client";
import type { Chat } from "@telegram.ts/types";
import { Collection } from "@telegram.ts/collection";
import { Collector, CollectorOptions } from "./Collector";

type Msg = Omit<Context["msg"], "callbackQuery">;

type MsgContext = Msg & Context;

class MessageCollector extends Collector<number, MsgContext> {
  channel: Chat;
  received: number = 0;

  constructor(
    public readonly telegram: TelegramBot,
    public readonly message: Msg,
    public readonly options: CollectorOptions<MsgContext> = {},
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

  collect(message: MsgContext): number | null {
    if (message.chat.id !== this.channel.id) return null;
    this.received++;
    return message.message_id;
  }

  dispose(message: MsgContext): number | null {
    return message.chat.id === this.channel.id ? message.message_id : null;
  }

  get endReason(): string | null {
    if (this.options.max && this.collected.size >= this.options.max) {
      return "limit";
    }
    if (
      this.options.maxProcessed &&
      this.received === this.options.maxProcessed
    ) {
      return "processedLimit";
    }
    return super.endReason;
  }
}

export { MessageCollector };
