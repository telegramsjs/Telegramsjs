import { Events, CollectorEvents } from "../Constants";
import { TelegramError } from "../../errors/TelegramError";
import { TelegramClient } from "../../client/TelegramClient";
import type { Chat } from "../../structures/chat/Chat";
import type { Message } from "../../structures/message/Message";
import { Collector, type ICollectorOptions } from "./Collector";

/**
 * Collector class for handling messages in a specific chat.
 */
class MessageCollector extends Collector<string, Message> {
  /**
   * The number of received messages.
   */
  public received: number = 0;

  /**
   * Creates an instance of MessageCollector.
   * @param client - The TelegramClient instance.
   * @param chat - The chat in which messages are being collected.
   * @param options - The options for the collector.
   */
  constructor(
    public readonly client: TelegramClient,
    public readonly chat: Chat,
    public override readonly options: ICollectorOptions<string, Message> = {},
  ) {
    super(options);

    if (!chat) {
      throw new TelegramError(
        "Could not find the chat where this message came from in the cache!",
      );
    }

    client.incrementMaxListeners();
    client.on(Events.Message, this.handleCollect);
    this.once(CollectorEvents.End, () => {
      client.off(Events.Message, this.handleCollect);
      client.decrementMaxListeners();
    });
  }

  /**
   * Collects a message.
   * @param message - The message context.
   * @returns The ID of the message or null.
   */
  collect(message: Message): string | null {
    if (message.chat?.id !== this.chat.id) return null;
    this.received++;
    return message.id;
  }

  /**
   * Disposes of a message.
   * @param message - The message context.
   * @returns The ID of the message or null.
   */
  dispose(message: Message): string | null {
    return message.chat?.id === this.chat.id ? message.id : null;
  }

  /**
   * Gets the reason for ending the collector.
   * @returns The reason for ending the collector or null.
   */
  override get endReason(): string | null {
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
