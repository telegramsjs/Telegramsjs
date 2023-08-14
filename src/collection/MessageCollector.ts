import { EventEmitter } from "events";
import { Message } from "@telegram.ts/types";
import { Context } from "../Context.js";

export type TextCaptionContextMessage<F> = Message.TextMessage &
  Message.CaptionableMessage &
  Context<F>;

export interface MessageFilter<F> {
  (message: TextCaptionContextMessage<F>): boolean;
}

/**
 * Represents a message collector.
 * @extends EventEmitter
 */
export class MessageCollector<F> extends EventEmitter {
  chatId: number;
  filter: MessageFilter<F>;
  time: number;
  max: number | undefined;
  caption: boolean = true;
  collectedMessages: string[];
  interval: NodeJS.Timeout | null = null;
  countCollector: number;

  /**
   * Creates a new MessageCollector.
   * @param {Object} options - The options for the collector.
   * @param {number} options.chatId - The ID of the chat to collect messages from.
   * @param {(Message.TextMessage & Context<F>) => boolean} [options.filter] - The filter function to determine which messages to collect (optional, default: () => true).
   * @param {number} [options.time] - The duration in milliseconds for the collector to run (optional, default: 60000).
   * @param {number} [options.max] - The maximum number of messages to collect (optional).
   * @param {boolean} [options.caption] - Only text message (optional).
   */
  constructor(options: {
    chatId: number;
    filter?: MessageFilter<F>;
    time?: number;
    max?: number;
    caption?: boolean;
  }) {
    super();
    const { chatId, filter, time, max, caption } = options;
    this.chatId = chatId;
    this.filter = filter || (() => true);
    this.time = time || 60000;
    this.max = max;
    this.caption = caption || true;
    this.collectedMessages = [];
    this.interval = null;
    this.countCollector = 0;

    /**
     * The interval ID for the collector.
     * @
     * @type {NodeJS.Timeout}
     */
    this.interval = setInterval(() => {
      this.emit("interval", this);
    }, this.time);
  }

  /**
   * Handles a new message received by the collector.
   * @param {object} message - The message object.
   */
  handleMessage(message: TextCaptionContextMessage<F>): void {
    if (!(message.chat.id === this.chatId && this.filter(message))) return;
    this.countCollector = (this.countCollector || 0) + 1;
    const collectedMessageType = this.caption
      ? message.text ?? message.caption
      : message.text;
    this.collectedMessages.push(collectedMessageType as string);
    this.emit("collected", {
      count: this.countCollector,
      collectedMessages: this.collectedMessages,
      options: {
        chatId: this.chatId,
        filter: this.filter,
        time: this.time,
        max: this.max,
      },
      message,
    });

    if (this.max && this.countCollector >= this.max) {
      this.stop();
      return;
    }
  }

  /**
   * Returns the collected messages.
   * @returns {Array} The collected messages.
   */
  collected(): string[] {
    return this.collectedMessages;
  }

  /**
   * Returns the count of collected messages.
   * @returns {number} The count of collected messages.
   */
  count(): number {
    return this.collectedMessages.length;
  }

  /**
   * Clears the collected messages.
   * @returns {boolean} `true` if the collected messages are cleared successfully, `false` otherwise.
   */
  clear(): boolean {
    this.collectedMessages = [];
    return true;
  }

  /**
   * Sets a new filter function for the collector.
   * @param {MessageFilter<F>} filter - The new filter function.
   * @returns {boolean} `true` if the filter function is set successfully, `false` otherwise.
   */
  setFilter(filter: MessageFilter<F>): boolean {
    if (typeof filter === "function") {
      this.filter = filter;
      return true;
    }
    return false;
  }

  /**
   * Sets a new duration for the collector to run.
   * @param {number} time - The new duration in milliseconds.
   * @returns {boolean} `true` if the duration is set successfully, `false` otherwise.
   */
  setTime(time: number): boolean {
    if (typeof time === "number" && time >= 0) {
      this.time = time;
      clearInterval(this.interval!);
      this.interval = setInterval(() => {
        this.emit("interval", this);
      }, this.time);
      return true;
    }
    return false;
  }

  /**
   * Sets a new maximum number of messages to collect.
   * @param {number} max - The new maximum number of messages.
   * @returns {boolean} `true` if the maximum number is set successfully, `false` otherwise.
   */
  setMax(max: number): boolean {
    if (typeof max === "number" && max >= 0) {
      this.max = max;
      return true;
    }
    return false;
  }

  /**
   * Changes the type, i.e. whether the bot can track `caption`
   * @param {boolean} caption - can track caption?
   */
  setCaption(caption: boolean): void {
    this.caption = caption;
  }

  /**
   * Returns whether the collector is currently running.
   * @returns {boolean} `true` if the collector is running, `false` otherwise.
   */
  isRunning(): boolean {
    return !!this.interval;
  }

  /**
   * Stops the message collector.
   */
  stop(): void {
    this.emit("end", this);
    clearInterval(this.interval!);
    this.removeAllListeners();
  }
}
