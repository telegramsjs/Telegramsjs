import type { Context } from "../../context";
import { TelegramBot } from "../../../client";
import { Collection } from "@telegram.ts/collection";
import type { CallbackQuery } from "@telegram.ts/types";
import { Collector, ICollectorOptions } from "./Collector";

type InlineCollectorContext = CallbackQuery & Context;

class InlineKeyboardCollector extends Collector<
  string,
  InlineCollectorContext
> {
  received: number = 0;

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

  collect(callbackQuery: InlineCollectorContext): string | null {
    this.received++;
    return callbackQuery.id || null;
  }

  dispose(callbackQuery: InlineCollectorContext): string | null {
    return callbackQuery.id || null;
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

export { InlineKeyboardCollector, InlineCollectorContext };
