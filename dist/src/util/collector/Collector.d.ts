import { EventEmitter } from "node:events";
import { Collection } from "@telegram.ts/collection";
import type { Awaitable, PossiblyAsync } from "../../types";
/**
 * Interface representing the options for the collector.
 */
interface ICollectorOptions<EventCtx, Collected> {
    dispose?: boolean;
    filter?: (data: Collected, collected: Collection<EventCtx, Collected>) => PossiblyAsync<boolean>;
    idle?: number;
    max?: number;
    maxProcessed?: number;
    time?: number;
}
/**
 * Interface representing the events for the collector.
 */
interface ICollectorEvent<K, V> {
    collect: (data: V, collect: Collection<K, V>) => void;
    ignore: (data: V) => void;
    dispose: (data: V, collect: Collection<K, V>) => void;
    end: (collected: Collection<K, V>, reason: string) => void;
}
/**
 * Abstract class representing a generic collector.
 */
declare abstract class Collector<K, V> extends EventEmitter {
    readonly options: ICollectorOptions<K, V>;
    /**
     * Indicates whether the collector has ended.
     */
    isEnded: boolean;
    /**
     * Filter function to determine if data should be collected.
     */
    filter: Required<ICollectorOptions<K, V>>["filter"];
    /**
     * Collection of collected data.
     */
    collected: Collection<K, V>;
    /**
     * Timestamp of the last collected item.
     */
    lastCollectedTimestamp: number | Date | null;
    private _timeout;
    private _idleTimeout;
    private _endReason;
    /**
     * Creates an instance of Collector.
     * @param options - The options for the collector.
     */
    constructor(options: ICollectorOptions<K, V>);
    on(event: string, listener: (...data: any[]) => void): this;
    on<T extends keyof ICollectorEvent<K, V>>(event: T, listener: ICollectorEvent<K, V>[T]): this;
    once(event: string, listener: (...data: any[]) => void): this;
    once<T extends keyof ICollectorEvent<K, V>>(event: T, listener: ICollectorEvent<K, V>[T]): this;
    /**
     * Gets the timestamp of the last collected item.
     */
    get lastCollectedAt(): number | null | Date;
    /**
     * Handles the collection of a new item.
     * @param msg - The item to collect.
     */
    handleCollect(msg: V): Promise<void>;
    /**
     * Handles the disposal of an item.
     * @param msg - The item to dispose.
     */
    handleDispose(msg: V): Promise<void>;
    /**
     * Returns a promise that resolves with the next collected item.
     */
    get next(): Promise<V>;
    /**
     * Stops the collector.
     * @param reason - The reason for stopping the collector.
     */
    stop(reason?: string): void;
    /**
     * Resets the timer for the collector.
     * @param param0 - An object containing new time and idle values.
     */
    resetTimer({ time, idle }?: {
        time?: number;
        idle?: number;
    }): void;
    /**
     * Checks if the collector should end based on the options.
     * @returns True if the collector should end, false otherwise.
     */
    checkEnd(): boolean;
    /**
     * Async generator for iterating over collected items.
     */
    [Symbol.asyncIterator](): AsyncGenerator<[V, Collection<K, V>]>;
    /**
     * Gets the reason for ending the collector.
     */
    get endReason(): string | null;
    /**
     * Abstract method to collect an item.
     * @param msg - The item to collect.
     * @returns The key of the collected item or null.
     */
    abstract collect(msg: V): Awaitable<K | null>;
    /**
     * Abstract method to dispose of an item.
     * @param msg - The item to dispose.
     * @returns The key of the disposed item or null.
     */
    abstract dispose(msg: V): K | null;
}
export { Collector, type ICollectorEvent, type ICollectorOptions };
//# sourceMappingURL=Collector.d.ts.map