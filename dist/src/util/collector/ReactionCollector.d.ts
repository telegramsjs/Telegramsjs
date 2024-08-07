import { Collection } from "@telegram.ts/collection";
import { ReactionType } from "../../structures/misc/ReactionType";
import type { TelegramClient } from "../../client/TelegramClient";
import type { MessageReactionUpdated } from "../../structures/MessageReactionUpdated";
import type { Chat } from "../../structures/chat/Chat";
import { Collector, type ICollectorEvent, type ICollectorOptions } from "./Collector";
/**
 * Interface for reaction event collector.
 */
interface IReactionEventCollector extends ICollectorEvent<string, MessageReactionUpdated> {
    /**
     * Event emitted when a user reacts.
     * @param data - The collection of user reactions.
     */
    user: (data: Collection<number, MessageReactionUpdated[] | MessageReactionUpdated>) => void;
    /**
     * Event emitted when a reaction is created.
     * @param data - The reaction context.
     */
    create: (data: MessageReactionUpdated) => void;
}
/**
 * Collector class for handling message reactions in a specific chat.
 */
declare class ReactionCollector extends Collector<string, MessageReactionUpdated> {
    readonly client: TelegramClient;
    readonly reaction: MessageReactionUpdated;
    readonly options: ICollectorOptions<string, MessageReactionUpdated>;
    /**
     * The chat in which reactions are being collected.
     */
    chat: Chat;
    /**
     * The number of received reactions.
     */
    received: number;
    /**
     * Collection of users and their reactions.
     */
    users: Collection<number, MessageReactionUpdated[] | MessageReactionUpdated>;
    /**
     * Creates an instance of ReactionCollector.
     * @param client - The TelegramClient instance.
     * @param reaction - The initial message context.
     * @param options - The options for the collector.
     */
    constructor(client: TelegramClient, reaction: MessageReactionUpdated, options?: ICollectorOptions<string, MessageReactionUpdated>);
    /**
     * Registers an event listener for reaction events.
     * @param event - The event name.
     * @param listener - The event listener.
     * @returns The current instance of ReactionCollector.
     */
    on<K extends keyof IReactionEventCollector>(event: K, listener: IReactionEventCollector[K]): this;
    /**
     * Registers a one-time event listener for reaction events.
     * @param event - The event name.
     * @param listener - The event listener.
     * @returns The current instance of ReactionCollector.
     */
    once<K extends keyof IReactionEventCollector>(event: K, listener: IReactionEventCollector[K]): this;
    /**
     * Collects a reaction.
     * @param reaction - The reaction context.
     * @returns The key of the reaction or null.
     */
    collect(reaction: MessageReactionUpdated): string | null;
    /**
     * Disposes of a reaction.
     * @param reaction - The reaction context.
     * @returns The key of the reaction or null.
     */
    dispose(reaction: MessageReactionUpdated): string | null;
    /**
     * Handles users' reactions.
     * @param reaction - The reaction context.
     */
    handleUsers(reaction: MessageReactionUpdated): void;
    /**
     * Gets the reason for ending the collector.
     * @returns The reason for ending the collector or null.
     */
    get endReason(): string | null;
    /**
     * Gets the key from a reaction.
     * @param reaction - The reaction types.
     * @returns The key of the reaction or null.
     */
    static getKeyFromReaction(reaction?: ReactionType): string | null;
}
export { ReactionCollector, type IReactionEventCollector };
//# sourceMappingURL=ReactionCollector.d.ts.map