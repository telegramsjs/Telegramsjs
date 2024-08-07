import { TelegramClient } from "../../client/TelegramClient";
import { Collector, ICollectorOptions } from "./Collector";
import type { CallbackQuery } from "../../structures/CallbackQuery";
/**
 * Collector class for handling inline keyboard callback queries.
 */
declare class InlineKeyboardCollector extends Collector<string, CallbackQuery> {
    readonly client: TelegramClient;
    readonly options: ICollectorOptions<string, CallbackQuery>;
    /**
     * The number of received callback queries.
     */
    received: number;
    /**
     * Creates an instance of InlineKeyboardCollector.
     * @param client - The TelegramClient instance.
     * @param options - The options for the collector.
     */
    constructor(client: TelegramClient, options?: ICollectorOptions<string, CallbackQuery>);
    /**
     * Collects the callback query.
     * @param callbackQuery - The callback query context.
     * @returns The ID of the callback query or null.
     */
    collect(callbackQuery: CallbackQuery): string | null;
    /**
     * Disposes of the callback query.
     * @param callbackQuery - The callback query context.
     * @returns The ID of the callback query or null.
     */
    dispose(callbackQuery: CallbackQuery): string | null;
    /**
     * Gets the reason for ending the collector.
     * @returns The reason for ending the collector or null.
     */
    get endReason(): string | null;
}
export { InlineKeyboardCollector };
//# sourceMappingURL=InlineKeyboardCollector.d.ts.map