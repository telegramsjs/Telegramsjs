import { TelegramClient } from "../../client/TelegramClient";
import type { Chat } from "../../structures/chat/Chat";
import type { Message } from "../../structures/message/Message";
import { Collector, type ICollectorOptions } from "./Collector";
/**
 * Collector class for handling messages in a specific chat.
 */
declare class MessageCollector extends Collector<number, Message> {
    readonly client: TelegramClient;
    readonly message: Message;
    readonly options: ICollectorOptions<number, Message>;
    /**
     * The chat in which messages are being collected.
     */
    chat: Chat;
    /**
     * The number of received messages.
     */
    received: number;
    /**
     * Creates an instance of MessageCollector.
     * @param client - The TelegramClient instance.
     * @param message - The initial message context.
     * @param options - The options for the collector.
     */
    constructor(client: TelegramClient, message: Message, options?: ICollectorOptions<number, Message>);
    /**
     * Collects a message.
     * @param message - The message context.
     * @returns The ID of the message or null.
     */
    collect(message: Message): number | null;
    /**
     * Disposes of a message.
     * @param message - The message context.
     * @returns The ID of the message or null.
     */
    dispose(message: Message): number | null;
    /**
     * Gets the reason for ending the collector.
     * @returns The reason for ending the collector or null.
     */
    get endReason(): string | null;
}
export { MessageCollector };
//# sourceMappingURL=MessageCollector.d.ts.map