import { TelegramError } from "./TelegramError";
import type { IRequestFailt } from "../types";
import type { Response, Headers } from "node-fetch";

/**
 * Represents an HTTP response error received from Telegram API.
 * Extends the base `TelegramError` class to include specific details about the error response.
 */
class HTTPResponseError extends TelegramError {
  public override description: string;
  public parameters: IRequestFailt["parameters"];
  #request?: Response;

  /**
   * @param response - The response data received from the Telegram API.
   * @param request - The original HTTP response object.
   */
  constructor(response: IRequestFailt, request?: Response) {
    const { error_code, description, parameters } = response;
    super(description, error_code);
    this.name = `ErrorResponse[${error_code}]`;
    this.code = error_code;
    this.description = description;
    this.parameters = parameters;
    if (request) this.#request = request;
  }

  /**
   * The URL of the request that caused the error.
   * @returns The URL of the request, or null if not available.
   */
  get url(): string | null {
    return this.#request?.url || null;
  }

  /**
   * The HTTP status code of the response.
   * @returns The HTTP status code, or null if not available.
   */
  get status(): number | null {
    return this.#request?.status || null;
  }

  /**
   * The status text of the HTTP response.
   * @returns The status text, or null if not available.
   */
  get statusText(): string | null {
    return this.#request?.statusText || null;
  }

  /**
   * The headers of the HTTP response.
   * @returns The response headers, or null if not available.
   */
  get headers(): Headers | null {
    return this.#request?.headers || null;
  }
}

export { HTTPResponseError };
