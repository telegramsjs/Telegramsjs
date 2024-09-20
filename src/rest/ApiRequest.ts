import { MediaData } from "./MediaData";
import fetch, { type RequestInit } from "node-fetch";
import { HTTPResponseError } from "../errors/HTTPResponseError";
import type { IRequestFailt, IRequestSuccess } from "../types";

/**
 * Handles API requests to the Telegram Bot API.
 */
class ApiRequest {
  public media: MediaData = new MediaData();

  /**
   * @param authToken - The authentication token for the Telegram Bot API.
   * @param requestOptions - Options for the fetch request.
   */
  constructor(
    public readonly authToken: string,
    public readonly requestOptions?: RequestInit,
  ) {}

  /**
   * Prepares the configuration for the fetch request based on the provided options.
   * @param options - The options to include in the request.
   * @returns The configuration for the fetch request.
   */
  async transferDataToServer(
    options: Record<string, unknown>,
  ): Promise<RequestInit> {
    if (this.media.hasMedia(options)) {
      return await this.media.buildFormDataConfig(options, this.requestOptions);
    } else {
      return this.media.buildJSONConfig(options, this.requestOptions);
    }
  }

  /**
   * Makes a GET request to the Telegram Bot API.
   * @param method - The API method to call.
   * @param options - The options to include in the request.
   * @returns The result from the API response.
   * @throws {HTTPResponseError} If the API response indicates an error.
   */
  async get<T>(
    method: string,
    options: Record<string, unknown> = {},
  ): Promise<T> {
    const apiUrl = `https://api.telegram.org/bot${this.authToken}/${method}`;
    const config = await this.transferDataToServer(options);
    const request = await fetch(apiUrl, config);
    const response: IRequestSuccess<T> | IRequestFailt = await request.json();

    if (!response.ok) {
      throw new HTTPResponseError(response, request);
    }

    return response.result;
  }
}

export { ApiRequest };
