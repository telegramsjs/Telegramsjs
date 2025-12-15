import { MediaData } from "./MediaData";
import { EventEmitter } from "node:events";
import { setTimeout } from "node:timers";
import { Collection } from "@telegram.ts/collection";
import fetch, { type RequestInit } from "node-fetch";
import type { ApiMethods } from "../client/interfaces/Methods";
import { HTTPResponseError } from "../errors/HTTPResponseError";
import type { IRequestFailt, IRequestSuccess, PossiblyAsync } from "../types";

interface IRateLimitData {
  /** The API method of this request */
  method: keyof ApiMethods;
  /** In case of exceeding flood control, the number of seconds left to wait before the request can be repeated */
  retryAfter?: number;
  /** The group has been migrated to a supergroup with the specified identifier */
  migrateToChatId?: string;
}

interface IRestEventHandlers {
  rateLimit: (rateLimitData: IRateLimitData) => PossiblyAsync<void>;
  apiRequest: (method: string, options: RequestInit) => PossiblyAsync<void>;
  apiResponse: (
    method: string,
    response: IRequestSuccess<unknown> | IRequestFailt,
  ) => PossiblyAsync<void>;
}

type IRestOptions = {
  enableRateLimit?: boolean;
} & Omit<RequestInit, "timeout" | "size" | "follow" | "signal" | "redirect">;

/**
 * Handles API requests to the Telegram Bot API.
 */
class Rest extends EventEmitter {
  #authToken: string;
  public options?: IRestOptions;
  public media: MediaData = new MediaData();
  private rateLimitState: Collection<string, number> = new Collection();

  /**
   * @param authToken - The authentication token for the Telegram Bot API.
   * @param requestOptions - Options for the fetch request.
   */
  constructor(authToken: string, requestOptions?: IRestOptions) {
    super();
    this.#authToken = authToken;

    if (requestOptions) {
      this.options = requestOptions;
    }
  }

  /**
   * Adds a typed listener for the specified event.
   * @param event - The event name.
   * @param listener - The listener function.
   * @returns The Rest instance.
   */
  override on<T extends keyof IRestEventHandlers>(
    event: T,
    listener: IRestEventHandlers[T],
  ): this {
    super.on(event, listener);
    return this;
  }

  /**
   * Adds a typed one-time listener for the specified event.
   * @param event - The event name.
   * @param listener - The listener function.
   * @returns The Rest instance.
   */
  override once<T extends keyof IRestEventHandlers>(
    event: T,
    listener: IRestEventHandlers[T],
  ): this {
    super.once(event, listener);
    return this;
  }

  /**
   * Prepares the configuration for the fetch request based on the provided options.
   * Checks if the request contains media data and builds the request configuration accordingly.
   * @param options - The options to include in the request.
   * @returns The configuration for the fetch request.
   */
  async transferDataToServer(
    options: Record<string, unknown>,
  ): Promise<RequestInit> {
    if (this.media.hasMedia(options)) {
      return await this.media.buildFormDataConfig(options, this.options);
    } else {
      return this.media.buildJSONConfig(options, this.options);
    }
  }

  /**
   * Makes a request to the Telegram Bot API.
   * Handles rate limits and retries the request if necessary.
   * @param method - The API method to call.
   * @param options - The options to include in the request.
   * @returns The result from the API response.
   * @throws {HTTPResponseError} If the API response indicates an error.
   */
  async request<T>(
    method: keyof ApiMethods,
    options: Record<string, unknown> = {},
  ): Promise<T> {
    const currentTime = Date.now();
    if (this.options?.enableRateLimit) {
      const retryAfter = this.rateLimitState.get(method) || 0;

      if (currentTime < retryAfter) {
        const waitTime = retryAfter - currentTime;
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    }

    const apiUrl = `https://api.telegram.org/bot${this.#authToken}/${method}`;
    const config = await this.transferDataToServer(options);

    this.emit("apiRequest", method, config);

    const request = await fetch(apiUrl, config);
    const response: IRequestSuccess<T> | IRequestFailt = await request.json();

    this.emit("apiResponse", method, response);

    if (!response.ok) {
      if ("parameters" in response) {
        if (response.parameters.retry_after) {
          if (this.options?.enableRateLimit) {
            this.rateLimitState.set(
              method,
              currentTime + response.parameters.retry_after * 1000,
            );
          }

          this.emit("rateLimit", {
            method,
            retryAfter: response.parameters.retry_after,
            ...(response.parameters.migrate_to_chat_id && {
              migrateToChatId: String(response.parameters.migrate_to_chat_id),
            }),
          });
        }
      }
      throw new HTTPResponseError(response, request);
    }

    return response.result;
  }
}

export {
  Rest,
  type IRestOptions,
  type IRestEventHandlers,
  type IRateLimitData,
};
