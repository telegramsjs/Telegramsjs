import { EventEmitter } from "node:events";
import { CollectorEvents } from "../Constants";
import { TelegramError } from "../../errors/TelegramError";
import { ErrorCodes } from "../../errors/ErrorCodes";
import { Collection } from "@telegram.ts/collection";
import { setTimeout, clearTimeout } from "node:timers";
import type { Awaitable, PossiblyAsync } from "../../types";

/**
 * Interface representing the options for the collector.
 */
interface ICollectorOptions<EventCtx, Collected> {
  dispose?: boolean;
  filter?: (
    data: Collected,
    collected: Collection<EventCtx, Collected>,
  ) => PossiblyAsync<boolean>;
  idle?: number;
  max?: number;
  maxProcessed?: number;
  time?: number;
}

/**
 * Interface representing the events for the collector.
 */
interface ICollectorEvent<K, V> {
  /**
   * Triggered when a new item is collected. The `collect` function receives the
   * item (`data`) and the collection itself (`collect`). Can perform any
   * asynchronous or synchronous operations needed to handle the collected item.
   *
   * @param data - The data item to be collected.
   * @param collect - The collection where the data is stored.
   */
  collect: (data: V, collect: Collection<K, V>) => PossiblyAsync<void>;

  /**
   * Triggered when a data item is ignored. The `ignore` function is called with
   * the ignored item (`data`). This is useful for cases where items do not meet
   * certain criteria and should not be added to the collection.
   *
   * @param data - The data item to be ignored.
   */
  ignore: (data: V) => PossiblyAsync<void>;

  /**
   * Triggered when an item is removed or disposed of from the collection. The
   * `dispose` function receives the data item (`data`) and the collection itself
   * (`collect`). Use this to handle any cleanup or additional logic when an item
   * is removed from the collection.
   *
   * @param data - The data item to be disposed of.
   * @param collect - The collection where the data is stored.
   */
  dispose: (data: V, collect: Collection<K, V>) => PossiblyAsync<void>;

  /**
   * Triggered when the collection process ends. The `end` function receives the
   * final collection (`collected`) and a reason (`reason`) for the collection’s
   * termination. Use this to handle any finalization or post-processing steps.
   *
   * @param collected - The collection of all collected data.
   * @param reason - The reason the collection process ended.
   */
  end: (collected: Collection<K, V>, reason: string) => PossiblyAsync<void>;
}

/**
 * Abstract class representing a generic collector.
 */
abstract class Collector<K, V> extends EventEmitter {
  /**
   * Indicates whether the collector has ended.
   */
  isEnded: boolean = false;

  /**
   * Filter function to determine if data should be collected.
   */
  filter: Required<ICollectorOptions<K, V>>["filter"];

  /**
   * Collection of collected data.
   */
  collected: Collection<K, V> = new Collection();

  /**
   * Timestamp of the last collected item.
   */
  lastCollectedTimestamp: number | Date | null = null;

  private _timeout: NodeJS.Timeout | null = null;
  private _idleTimeout: NodeJS.Timeout | null = null;
  private _endReason: string | null = null;

  /**
   * Creates an instance of Collector.
   * @param options - The options for the collector.
   */
  constructor(public readonly options: ICollectorOptions<K, V>) {
    super();
    this.handleCollect = this.handleCollect.bind(this);
    this.handleDispose = this.handleDispose.bind(this);

    options.max = options.max || 10;
    options.time = options.time || 60000;

    if (typeof options.filter !== "function" && options.filter !== undefined) {
      throw new TelegramError(ErrorCodes.InvalidFilterFunction);
    }

    this.filter = options.filter || (() => true);

    if (options.time) {
      this._timeout = setTimeout(() => this.stop("time"), options.time).unref();
    }
    if (options.idle) {
      this._idleTimeout = setTimeout(
        () => this.stop("idle"),
        options.idle,
      ).unref();
    }
  }

  override on(event: string, listener: (...data: any[]) => void): this;

  override on<T extends keyof ICollectorEvent<K, V>>(
    event: T,
    listener: ICollectorEvent<K, V>[T],
  ): this;

  override on(event: string, listener: (...data: any[]) => void) {
    super.on(event, listener);
    return this;
  }

  override once(event: string, listener: (...data: any[]) => void): this;

  override once<T extends keyof ICollectorEvent<K, V>>(
    event: T,
    listener: ICollectorEvent<K, V>[T],
  ): this;

  override once(event: string, listener: (...data: any[]) => void) {
    super.once(event, listener);
    return this;
  }

  /**
   * Gets the timestamp of the last collected item.
   */
  get lastCollectedAt(): number | null | Date {
    return this.lastCollectedTimestamp && new Date(this.lastCollectedTimestamp);
  }

  /**
   * Handles the collection of a new item.
   * @param msg - The item to collect.
   */
  async handleCollect(msg: V): Promise<void> {
    const collectedId = await this.collect(msg);
    if (collectedId) {
      const filterResult = await this.filter(msg, this.collected);
      if (filterResult) {
        this.collected.set(collectedId, msg);

        this.emit(CollectorEvents.Collect, msg, this.collected);

        this.lastCollectedTimestamp = Date.now();
        if (this._idleTimeout) {
          clearTimeout(this._idleTimeout);
          this._idleTimeout = setTimeout(
            () => this.stop("idle"),
            this.options.idle,
          ).unref();
        }
      } else {
        this.emit(CollectorEvents.Ignore, msg);
      }
    }
    this.checkEnd();
  }

  /**
   * Handles the disposal of an item.
   * @param msg - The item to dispose.
   */
  async handleDispose(msg: V): Promise<void> {
    if (!this.options.dispose) return;

    const dispose = this.dispose(msg);
    if (
      !dispose ||
      !(await this.filter(msg, this.collected)) ||
      !this.collected.has(dispose)
    )
      return;
    this.collected.delete(dispose);

    this.emit(CollectorEvents.Dispose, msg, this.collected);
    this.checkEnd();
  }

  /**
   * Returns a promise that resolves with the next collected item.
   */
  get next(): Promise<V> {
    return new Promise((resolve, reject) => {
      if (this.isEnded) {
        reject(this.collected);
        return;
      }

      const cleanup = () => {
        this.off(CollectorEvents.Collect, onCollect);
        this.off(CollectorEvents.End, onEnd);
      };

      const onCollect = (item: V) => {
        cleanup();
        resolve(item);
      };

      const onEnd = () => {
        cleanup();
        reject(this.collected);
      };

      this.on(CollectorEvents.Collect, onCollect);
      this.on(CollectorEvents.End, onEnd);
    });
  }

  /**
   * Stops the collector.
   * @param reason - The reason for stopping the collector.
   */
  stop(reason = "user"): void {
    if (this.isEnded) return;

    if (this._timeout) {
      clearTimeout(this._timeout);
      this._timeout = null;
    }
    if (this._idleTimeout) {
      clearTimeout(this._idleTimeout);
      this._idleTimeout = null;
    }

    this._endReason = reason;
    this.isEnded = true;

    this.emit(CollectorEvents.End, this.collected, reason);
  }

  /**
   * Resets the timer for the collector.
   * @param param0 - An object containing new time and idle values.
   */
  resetTimer({ time, idle }: { time?: number; idle?: number } = {}): void {
    if (this._timeout) {
      clearTimeout(this._timeout);
      this._timeout = setTimeout(
        () => this.stop("time"),
        time || this.options.time,
      ).unref();
    }
    if (this._idleTimeout) {
      clearTimeout(this._idleTimeout);
      this._idleTimeout = setTimeout(
        () => this.stop("idle"),
        idle || this.options.idle,
      ).unref();
    }
  }

  /**
   * Checks if the collector should end based on the options.
   * @returns True if the collector should end, false otherwise.
   */
  checkEnd(): boolean {
    const reason = this.endReason;
    if (reason) this.stop(reason);
    return Boolean(reason);
  }

  /**
   * Async generator for iterating over collected items.
   */
  async *[Symbol.asyncIterator](): AsyncGenerator<[V, Collection<K, V>]> {
    const queue: unknown[] = [];
    const onCollect = (...item: unknown[]) => queue.push(item);
    this.on(CollectorEvents.Collect, onCollect);

    try {
      while (queue.length || !this.isEnded) {
        if (queue.length) {
          yield queue.shift() as [V, Collection<K, V>];
        } else {
          await new Promise((resolve) => {
            const tick = () => {
              this.off(CollectorEvents.Collect, tick);
              this.off(CollectorEvents.End, tick);
              return resolve(true);
            };
            this.on(CollectorEvents.Collect, tick);
            this.on(CollectorEvents.End, tick);
          });
        }
      }
    } finally {
      this.off(CollectorEvents.Collect, onCollect);
    }
  }

  /**
   * Gets the reason for ending the collector.
   */
  get endReason(): string | null {
    return this._endReason;
  }

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
