import type { Context } from "../../context";
import { TelegramBot } from "../../../client";
import { Collection } from "@telegram.ts/collection";
import type { CallbackQuery } from "@telegram.ts/types";
import { Collector, ICollectorOptions } from "./Collector";

type InlineCollectorContext = CallbackQuery & Context;

/**
 * Collector class for handling inline keyboard callback queries.
 */
class InlineKeyboardCollector extends Collector<
  string,
  InlineCollectorContext
> {
  /**
   * The number of received callback queries.
   */
  received: number = 0;

  /**
   * Creates an instance of InlineKeyboardCollector.
   * @param telegram - The TelegramBot instance.
   * @param options - The options for the collector.
   */
  constructor(
    public readonly telegram: TelegramBot,
    public readonly options: ICollectorOptions<
      string,
      InlineCollectorContext
    > = {},
  ) {
    super(options);

    telegram.incrementMaxListeners();
    telegram.on("callback_query", this.handleCollect);
    this.once("end", () => {
      telegram.off("callback_query", this.handleCollect);
      telegram.decrementMaxListeners();
    });
  }

  /**
   * Collects the callback query.
   * @param callbackQuery - The callback query context.
   * @returns The ID of the callback query or null.
   */
  collect(callbackQuery: InlineCollectorContext): string | null {
    this.received++;
    return callbackQuery.id || null;
  }

  /**
   * Disposes of the callback query.
   * @param callbackQuery - The callback query context.
   * @returns The ID of the callback query or null.
   */
  dispose(callbackQuery: InlineCollectorContext): string | null {
    return callbackQuery.id || null;
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

export { InlineKeyboardCollector, InlineCollectorContext };
