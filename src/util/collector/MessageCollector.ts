import { TelegramClient } from "../../client/TelegramClient";
import type { Chat } from "../../structures/Chat";
import { Collection } from "@telegram.ts/collection";
import type { Message } from "../../structures/Message";
import { Collector, type ICollectorOptions } from "./Collector";

/**
 * Collector class for handling messages in a specific chat.
 */
class MessageCollector extends Collector<number, Message> {
  /**
   * The chat in which messages are being collected.
   */
  public chat: Chat;

  /**
   * The number of received messages.
   */
  public received: number = 0;

  /**
   * Creates an instance of MessageCollector.
   * @param client - The TelegramClient instance.
   * @param message - The initial message context.
   * @param options - The options for the collector.
   */
  constructor(
    public readonly client: TelegramClient,
    public readonly message: Message,
    public readonly options: ICollectorOptions<number, Message> = {},
  ) {
    super(options);
    this.chat = message.chat;

    client.incrementMaxListeners();
    client.on("message", this.handleCollect);
    this.once("end", () => {
      client.off("message", this.handleCollect);
      client.decrementMaxListeners();
    });
  }

  /**
   * Collects a message.
   * @param message - The message context.
   * @returns The ID of the message or null.
   */
  collect(message: Message): number | null {
    if (message.chat.id !== this.chat.id) return null;
    this.received++;
    return message.id;
  }

  /**
   * Disposes of a message.
   * @param message - The message context.
   * @returns The ID of the message or null.
   */
  dispose(message: Message): number | null {
    return message.chat.id === this.chat.id ? message.id : null;
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

export { MessageCollector };
