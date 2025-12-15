import { Events, CollectorEvents } from "../Constants";
import { TelegramClient } from "../../client/TelegramClient";
import { Collector, ICollectorOptions } from "./Collector";
import type { CallbackQuery } from "../../structures/CallbackQuery";

/**
 * Collector class for handling inline keyboard callback queries.
 */
class InlineKeyboardCollector extends Collector<string, CallbackQuery> {
  /**
   * The number of received callback queries.
   */
  public received: number = 0;

  /**
   * Creates an instance of InlineKeyboardCollector.
   * @param client - The TelegramClient instance.
   * @param options - The options for the collector.
   */
  constructor(
    public readonly client: TelegramClient,
    public override readonly options: ICollectorOptions<
      string,
      CallbackQuery
    > = {},
  ) {
    super(options);

    client.incrementMaxListeners();
    client.on(Events.CallbackQuery, this.handleCollect);
    this.once(CollectorEvents.End, () => {
      client.off(Events.CallbackQuery, this.handleCollect);
      client.decrementMaxListeners();
    });
  }

  /**
   * Collects the callback query.
   * @param callbackQuery - The callback query context.
   * @returns The ID of the callback query or null.
   */
  collect(callbackQuery: CallbackQuery): string | null {
    this.received++;
    return callbackQuery.id || null;
  }

  /**
   * Disposes of the callback query.
   * @param callbackQuery - The callback query context.
   * @returns The ID of the callback query or null.
   */
  dispose(callbackQuery: CallbackQuery): string | null {
    return callbackQuery.id || null;
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

export { InlineKeyboardCollector };
