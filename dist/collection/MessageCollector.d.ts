/// <reference types="node" />
import { EventEmitter } from "events";
/**
 * Represents a message collector.
 * @extends EventEmitter
 */
export declare class MessageCollector extends EventEmitter {
  private chatId;
  private filter;
  private time;
  private max?;
  private collectedMessages;
  private interval;
  private countCollector;
  /**
   * Creates a new MessageCollector.
   * @param {Object} options - The options for the collector.
   * @param {number} options.chatId - The ID of the chat to collect messages from.
   * @param {Function} [options.filter] - The filter function to determine which messages to collect (optional, default: () => true).
   * @param {number} [options.time] - The duration in milliseconds for the collector to run (optional, default: 60000).
   * @param {number} [options.max] - The maximum number of messages to collect (optional).
   */
  constructor(options: {
    chatId: number;
    filter?: Function;
    time?: number;
    max?: number;
  });
  /**
   * Handles a new message received by the collector.
   * @param {object} message - The message object.
   */
  handleMessage(message: {
    chat: {
      id: number;
    };
    text?: string;
    caption?: string;
  }): void;
  /**
   * Returns the collected messages.
   * @returns {Array} The collected messages.
   */
  collected(): any[];
  /**
   * Returns the count of collected messages.
   * @returns {number} The count of collected messages.
   */
  count(): number;
  /**
   * Clears the collected messages.
   * @returns {boolean} `true` if the collected messages are cleared successfully, `false` otherwise.
   */
  clear(): boolean;
  /**
   * Sets a new filter function for the collector.
   * @param {Function} filter - The new filter function.
   * @returns {boolean} `true` if the filter function is set successfully, `false` otherwise.
   */
  setFilter(filter: Function): boolean;
  /**
   * Sets a new duration for the collector to run.
   * @param {number} time - The new duration in milliseconds.
   * @returns {boolean} `true` if the duration is set successfully, `false` otherwise.
   */
  setTime(time: number): boolean;
  /**
   * Sets a new maximum number of messages to collect.
   * @param {number} max - The new maximum number of messages.
   * @returns {boolean} `true` if the maximum number is set successfully, `false` otherwise.
   */
  setMax(max: number): boolean;
  /**
   * Returns whether the collector is currently running.
   * @returns {boolean} `true` if the collector is running, `false` otherwise.
   */
  isRunning(): boolean;
  /**
   * Stops the message collector.
   */
  stop(): void;
}
