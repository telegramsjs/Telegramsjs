import { BaseError } from "./TelegramError";
import type { IRequestFailt } from "../types";
import type { Response, Headers } from "node-fetch";

class HTTPResponseError extends BaseError {
  description: string;
  error_code: string | number;
  parameters: IRequestFailt["parameters"];
  request?: Response;

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

  get url(): string | null {
    return this.request?.url || null;
  }

  get status(): number | null {
    return this.request?.status || null;
  }

  get statusText(): string | null {
    return this.request?.statusText || null;
  }

  get headers(): Headers | null {
    return this.request?.headers || null;
  }
}

export { HTTPResponseError };
