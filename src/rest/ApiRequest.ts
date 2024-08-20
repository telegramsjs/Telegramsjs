import { MediaData } from "./MediaData";
// @ts-ignore
const snakeCase = require("lodash.snakecase");
import { isCamelCase } from "../util/Utils";
import fetch, { type RequestInit } from "node-fetch";
import { TelegramError } from "../errors/TelegramError";
import { toApiFormat } from "../util/ApiPermissions";
import { ChatPermissions } from "../util/ChatPermissions";
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
    const snakeCaseOptions = this.validateCamelCaseKeys(options);
    if (this.media.hasMedia(options)) {
      return await this.media.buildFormDataConfig(
        snakeCaseOptions,
        this.requestOptions,
      );
    } else {
      return this.media.buildJSONConfig(snakeCaseOptions, this.requestOptions);
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

  private validateCamelCaseKeys(options: Record<string, any>) {
    const snakeCaseOptions: Record<string, any> = {};

    for (const [key, value] of Object.entries(options)) {
      if (!isCamelCase(key)) {
        throw new TelegramError(
          `The provided string "${key}" is not in camelCase format`,
        );
      }
      if (
        key === "userAdministratorRights" ||
        key === "botAdministratorRights"
      ) {
        snakeCaseOptions[snakeCase(key)] = toApiFormat(
          new ChatPermissions(value).toObject(),
        );
        continue;
      }
      if (Array.isArray(value)) {
        snakeCaseOptions[snakeCase(key)] = value.map((value) => {
          if (Array.isArray(value)) {
            return value.map((value) => this.validateCamelCaseKeys(value));
          }
          return typeof value === "object" && !this.media.isMediaType(value)
            ? this.validateCamelCaseKeys(value)
            : value;
        });
        continue;
      }
      if (typeof value === "object" && !this.media.isMediaType(value)) {
        snakeCaseOptions[snakeCase(key)] = this.validateCamelCaseKeys(value);
        continue;
      }
      snakeCaseOptions[snakeCase(key)] = value;
    }

    return snakeCaseOptions;
  }
}

export { ApiRequest };
