import { TelegramBot } from "../../../client";
import type { Chat } from "@telegram.ts/types";
import { Collection } from "@telegram.ts/collection";
import type { ApiContext, Context } from "../../context";
import { Collector, type ICollectorOptions } from "./Collector";

type Msg = Omit<ApiContext["msg"], "callbackQuery">;

type MsgCollectorContext = Msg & Context;

/**
 * Collector class for handling messages in a specific chat.
 */
class MessageCollector extends Collector<number, MsgCollectorContext> {
  /**
   * The chat in which messages are being collected.
   */
  channel: Chat;

  /**
   * The number of received messages.
   */
  received: number = 0;

  /**
   * Creates an instance of MessageCollector.
   * @param telegram - The TelegramBot instance.
   * @param message - The initial message context.
   * @param options - The options for the collector.
   */
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

  /**
   * Collects a message.
   * @param message - The message context.
   * @returns The ID of the message or null.
   */
  collect(message: MsgCollectorContext): number | null {
    if (message.chat.id !== this.channel.id) return null;
    this.received++;
    return message.message_id;
  }

  /**
   * Disposes of a message.
   * @param message - The message context.
   * @returns The ID of the message or null.
   */
  dispose(message: MsgCollectorContext): number | null {
    return message.chat.id === this.channel.id ? message.message_id : null;
  }

  /**
   * Gets the reason for ending the collector.
   * @returns The reason for ending the collector or null.
   */
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
