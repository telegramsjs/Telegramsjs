import { ResponseParameters } from "@telegram.ts/types";
/**
 * Represents an error that occurs when interacting with the Telegram Bot API.
 */
class TelegramApiError extends Error {
  ok: boolean;
  code: number;
  method: string;
  parameters?: ResponseParameters;
  /**
   * Constructs a new TelegramApiError object.
   *
   * @param {object | string} error - The error object or error message.
   * @param {string} method - The method that caused the error.
   * @param {object} [params] - Additional parameters related to the error.
   */
  constructor(
    error: {
      error_code?: number;
      description?: string;
      ok?: boolean;
      parameters?: ResponseParameters;
    } = {},
    method: string,
    params?: object,
  ) {
    let message = { description: "Unknown error" };

    if (typeof error === "string") {
      message.description = error;
    }

    if (error.description) {
      const errorDescription = error.description.split(":")[1];
      if (errorDescription) {
        message.description = errorDescription.trimStart().toLowerCase();
      } else {
        message.description = error.description;
      }
    }

    super(message.description);
    this.name = `TelegramApiError[${error.error_code ?? 404}]`;
    this.parameters = error.parameters ?? params;
    this.method = method;
    this.code = error.error_code ?? 404;
    this.ok = error.ok ?? false;
  }
}

/**
 * Custom error class for errors related to event handling
 * @extends Error
 */
class EventError extends Error {
  eventName: unknown;
  eventType: unknown;
  /**
   * Creates a new instance of the EventError class
   * @param {string} description - The error message
   * @param {unknown} event - event name
   */
  constructor(description: string, event: unknown) {
    super(description);

    this.name = `EventError[${event}]`;
    this.eventName = event;
    this.eventType = typeof event;
  }
}

export { TelegramApiError, EventError };
