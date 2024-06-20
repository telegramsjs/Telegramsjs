import type { Api } from "../../api";
import type { Context } from "../context";
import type { UpdateReturn } from "../types";
import { Collection } from "@telegram.ts/collection";
import { type Update, type Message as Msg } from "@telegram.ts/types";

/**
 * Represents the configuration for awaiting messages.
 */
interface IMessageCollection {
  /** The user ID associated with the message. */
  fromId: number | undefined;
  /** The text or texts to listen for. */
  message?: string | string[];
  /** The callback function when a message is received. */
  onCallback: (
    data: Update["message"] & Msg.TextMessage & Context,
    collection: Collection<string, IMessageCollection>,
  ) => unknown;
  /** The optional error callback function. */
  onError?: (data: Collection<string, IMessageCollection>) => unknown;
  /** The timeout duration in milliseconds. */
  timeout: number;
  /** The optional filter function to apply before invoking the callback. */
  filter?: (data: Update["message"] & Msg.TextMessage & Context) => unknown;
  /** The message data and context. */
  data: Update["message"] & Msg.TextMessage & Context;
}

/**
 * A class for handling messages.
 */
class Message {
  /**
   * Creates an instance of MessageHandler.
   * @param api - The Telegram API instance.
   */
  constructor(public readonly api: Api) {}

  /**
   * Waits for messages.
   * @param options - The options for waiting for messages.
   * @returns A promise that resolves when the desired messages are received.
   */
  async awaitMessage(options: {
    /** The text or texts to listen for. */
    message?: string | string[];
    /** The callback function when messages are received. */
    onCallback: (
      data: Update["message"] & Msg.TextMessage & Context,
      collection: Collection<string, IMessageCollection>,
    ) => unknown;
    /** The optional error callback function. */
    onError?: (data: Collection<string, IMessageCollection>) => unknown;
    /** The number of messages to wait for. */
    count?: number;
    /** The timeout duration in milliseconds. */
    timeout?: number;
    /** The optional filter function to apply before invoking the callback. */
    filter?: (data: Update["message"] & Msg.TextMessage & Context) => boolean;
  }): Promise<unknown> {
    const collection: Collection<string, IMessageCollection> = new Collection();
    const {
      message,
      onCallback,
      onError,
      count = 1,
      timeout = 60000,
      filter,
    } = options;

    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const handler = async (
        data: Update["message"] & Msg.TextMessage & Context,
      ) => {
        if (
          !message ||
          (Array.isArray(message) ? message : [message]).some((msg) =>
            data.text.includes(msg),
          )
        ) {
          if (!filter || (filter && filter(data))) {
            collection.set(`${data.from?.id}_${Date.now()}`, {
              fromId: data.from?.id,
              message: data.text,
              onCallback,
              onError,
              timeout,
              filter,
              data,
            });

            try {
              if (collection.size === count) {
                this.api.off("message:text", handler);
                clearTimeout(timeoutHandler);
                const result = await onCallback(data, collection);
                resolve(result);
              }
            } catch (error) {
              reject(error);
            }
          }
        }
      };

      const timeoutHandler = setTimeout(() => {
        const elapsedTime = Date.now() - startTime;
        this.api.off("message:text", handler);
        if (onError) {
          onError(collection);
        } else {
          reject(new Error(`Message not received within ${timeout} ms`));
        }
      }, timeout);
      this.api.on("message:text", handler);
    });
  }
}

export { Message, IMessageCollection };
