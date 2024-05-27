import { BaseError } from "./TelegramError";
import type { IRequestFailt } from "../types";
import type { Response, Headers } from "node-fetch";

/**
 * Represents an error thrown when an HTTP request returns an error response.
 */
class HTTPResponseError extends BaseError {
  /** The description of the error. */
  description: string;
  /** The error code associated with the error. */
  error_code: string | number;
  /** Additional parameters associated with the error. */
  parameters: IRequestFailt["parameters"];
  /** The original request object that triggered the error. */
  request?: Response;

  /**
   * Constructs a new HTTPResponseError instance.
   * @param response - The error response object.
   * @param request - The original request object that triggered the error.
   */
  constructor(response: IRequestFailt, request?: Response) {
    const { error_code, description, parameters } = response;
    super(description);
    this.name = `ErrorResponse[${error_code}]`;
    this.error_code = error_code;
    this.description = description;
    this.parameters = parameters;

    Object.defineProperty(this, "request", {
      value: request,
      writable: false,
      enumerable: false,
    });
  }

  /** Gets the URL of the original request that triggered the error. */
  get url(): string | null {
    return this.request?.url || null;
  }

  /** Gets the status code of the original request that triggered the error. */
  get status(): number | null {
    return this.request?.status || null;
  }

  /** Gets the status text of the original request that triggered the error. */
  get statusText(): string | null {
    return this.request?.statusText || null;
  }

  /** Gets the headers of the original request that triggered the error. */
  get headers(): Headers | null {
    return this.request?.headers || null;
  }
}

export { HTTPResponseError };
