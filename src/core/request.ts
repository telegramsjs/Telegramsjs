import { Media } from "./media";
import { Agent } from "node:https";
import { ManagerEvents } from "./events";
import fetch, { type RequestInit } from "node-fetch";
import { HTTPResponseError } from "./util/HTTPResponseError";
import type { IRequestFailt, IRequestSuccess } from "./types";

/**
 * Represents rate limit information returned by the Telegram API.
 */
interface IRateLimit {
  method: string;
  date: Date;
  datestamp: number;
  parameters: Record<string, any>;
  error_code: number;
  description: string;
  retry_after: number;
  migrate_to_chat_id?: number;
}

/**
 * A class for making requests to the Telegram API.
 * Extends ManagerEvents class for event handling.
 */
class ApiRequest extends ManagerEvents {
  /**
   * Media instance for handling media-related requests.
   */
  media: Media = new Media();

  /**
   * Constructs a new ApiRequest instance.
   * @param authToken - The Telegram Bot API token.
   * @param requestOptions - Options for configuring the request (e.g., custom agent).
   */
  constructor(
    public readonly authToken: string,
    public readonly requestOptions: RequestInit = {
      agent: new Agent({
        keepAlive: true,
        keepAliveMsecs: 10000,
      }),
    },
  ) {
    super();
  }

  /**
   * Transfers data to the server in the appropriate format (JSON or FormData).
   * @param options - Options for the request.
   * @returns The configuration object for the request.
   */
  async transferDataToServer(options: Record<string, unknown>) {
    if (this.media.hasMedia(options)) {
      return await this.media.buildFormDataConfig(options, this.requestOptions);
    } else return this.media.buildJSONConfig(options, this.requestOptions);
  }

  /**
   * Makes a request to the Telegram API.
   * @param method - The API method to call.
   * @param options - Options for the request.
   * @returns A Promise resolving to the result of the API call.
   * @throws {HTTPResponseError} if the API response indicates an error.
   */
  async request<T>(
    method: string,
    options: Record<string, unknown> = {},
  ): Promise<T> {
    const apiUrl = `https://api.telegram.org/bot${this.authToken}/${method}`;
    const config = await this.transferDataToServer(options);
    const request = await fetch(apiUrl, config);
    const response: IRequestSuccess<T> | IRequestFailt = await request.json();

    if (!response.ok) {
      if (response.parameters?.retry_after) {
        this.emit("rate_limit", {
          method,
          date: new Date(),
          datestamp: Date.now(),
          parameters: options,
          error_code: response.error_code,
          description: response.description,
          retry_after: response.parameters.retry_after,
          migrate_to_chat_id: response.parameters?.migrate_to_chat_id,
        });
      }
      throw new HTTPResponseError(response, request);
    }

    return response.result;
  }
}

export { ApiRequest, IRateLimit };
