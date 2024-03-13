import type { RequestFailt } from "../types";

class HTTPResponseError extends Error {
  description: string;
  error_code: string | number;
  parameters: RequestFailt["parameters"];

  constructor(response: RequestFailt) {
    const { error_code, description, parameters } = response;
    super(description);
    this.name = `ErrorResponse[${error_code}]`;
    this.error_code = error_code;
    this.description = description;
    this.parameters = parameters;
  }
}

export { HTTPResponseError };
