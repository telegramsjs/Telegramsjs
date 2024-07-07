import { TelegramError } from "./TelegramError";
import type { IRequestFailt } from "../types";
import type { Response, Headers } from "node-fetch";

class HTTPResponseError extends TelegramError {
  public description: string;
  public parameters: IRequestFailt["parameters"];
  #request?: Response;

  constructor(response: IRequestFailt, request?: Response) {
    const { error_code, description, parameters } = response;
    super(description, error_code);
    this.name = `ErrorResponse[${error_code}]`;
    this.code = error_code;
    this.description = description;
    this.parameters = parameters;
    this.#request = request;
  }

  get url(): string | null {
    return this.#request?.url || null;
  }

  get status(): number | null {
    return this.#request?.status || null;
  }

  get statusText(): string | null {
    return this.#request?.statusText || null;
  }

  get headers(): Headers | null {
    return this.#request?.headers || null;
  }
}

export { HTTPResponseError };
