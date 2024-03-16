import { EventEmitter } from "node:events";
import type { Awaitable } from "../../types";
import { TelegramBot } from "../../../client";
import { Collection } from "@telegram.ts/collection";
import { setTimeout, clearTimeout } from "node:timers";

interface ICollectorOptions<EventCtx, Collected> {
  dispose?: boolean;
  filter?: (
    data: Collected,
    collected: Collection<EventCtx, Collected>,
  ) => boolean | Promise<boolean>;
  idle?: number;
  max?: number;
  maxProcessed?: number;
  time?: number;
}

interface ICollectorEvent<K, V> {
  collect: (data: V, collect: Collection<K, V>) => void;
  ignore: (data: V) => void;
  dispose: (data: V, collect: Collection<K, V>) => void;
  end: (collected: Collection<K, V>, reason: string) => void;
}

abstract class Collector<K, V> extends EventEmitter {
  isEnded: boolean = false;
  filter: Required<ICollectorOptions<K, V>>["filter"];
  collected: Collection<K, V> = new Collection();
  lastCollectedTimestamp: number | Date | null = null;
  private _timeout: NodeJS.Timeout | null = null;
  private _idleTimeout: NodeJS.Timeout | null = null;
  private _endReason: string | null = null;

  constructor(public readonly options: ICollectorOptions<K, V>) {
    super();
    this.handleCollect = this.handleCollect.bind(this);
    this.handleDispose = this.handleDispose.bind(this);

    options.max = options.max || 10;
    options.time = options.time || 60000;

    if (typeof options.filter !== "function") {
      throw new TypeError("Supplied options.filter is not a Function");
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

  get lastCollectedAt(): number | null | Date {
    return this.lastCollectedTimestamp && new Date(this.lastCollectedTimestamp);
  }

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

  checkEnd(): boolean {
    const reason = this.endReason;
    if (reason) this.stop(reason);
    return Boolean(reason);
  }

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

  get endReason(): string | null {
    return this._endReason;
  }

  abstract collect(msg: unknown): Awaitable<K | null>;

  abstract dispose(msg: unknown): K | null;
}

export { Collector, ICollectorEvent, ICollectorOptions };
