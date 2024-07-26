import { EventEmitter } from "node:events";
import { TelegramError } from "../../errors/TelegramError";
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
  collect: (data: V, collect: Collection<K, V>) => void;
  ignore: (data: V) => void;
  dispose: (data: V, collect: Collection<K, V>) => void;
  end: (collected: Collection<K, V>, reason: string) => void;
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
      throw new TelegramError("Supplied options.filter is not a Function");
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

  on(event: string, listener: (...data: any[]) => void): this;

  on<T extends keyof ICollectorEvent<K, V>>(
    event: T,
    listener: ICollectorEvent<K, V>[T],
  ): this;

  on(event: string, listener: (...data: any[]) => void) {
    super.on(event, listener);
    return this;
  }

  once(event: string, listener: (...data: any[]) => void): this;

  once<T extends keyof ICollectorEvent<K, V>>(
    event: T,
    listener: ICollectorEvent<K, V>[T],
  ): this;

  once(event: string, listener: (...data: any[]) => void) {
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

        this.emit("collect", msg, this.collected);

        this.lastCollectedTimestamp = Date.now();
        if (this._idleTimeout) {
          clearTimeout(this._idleTimeout);
          this._idleTimeout = setTimeout(
            () => this.stop("idle"),
            this.options.idle,
          ).unref();
        }
      } else {
        this.emit("ignore", msg);
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

    this.emit("dispose", msg, this.collected);
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
        this.off("collect", onCollect);
        this.off("end", onEnd);
      };

      const onCollect = (item: V) => {
        cleanup();
        resolve(item);
      };

      const onEnd = () => {
        cleanup();
        reject(this.collected);
      };

      this.on("collect", onCollect);
      this.on("end", onEnd);
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

    this.emit("end", this.collected, reason);
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
    const onCollect = (data: V, collected: Collection<K, V>) =>
      queue.push(data, collected);
    this.on("collect", onCollect);

    try {
      while (queue.length || !this.isEnded) {
        if (queue.length) {
          yield queue.shift() as [V, Collection<K, V>];
        } else {
          await new Promise((resolve) => {
            const tick = () => {
              this.off("collect", tick);
              this.off("end", tick);
              return resolve(true);
            };
            this.on("collect", tick);
            this.on("end", tick);
          });
        }
      }
    } finally {
      this.off("collect", onCollect);
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

export { Collector, ICollectorEvent, ICollectorOptions };
