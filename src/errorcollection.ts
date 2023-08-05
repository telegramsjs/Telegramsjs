import { ResponseParameters } from "@telegram.ts/types";
/**
 * Represents an error that occurs when interacting with the Telegram Bot API.
 */
class TelegramApiError extends Error {
  code: number;
  ok: boolean;
  method: string;
  parameters?: ResponseParameters;
  params?: object;

  /**
   * Constructs a new TelegramApiError object.
   * @param {object | string} error - The error object or error message.
   * @param {string} method - The method that caused the error.
   */

  constructor(
    error: {
      error_code: number;
      description: string;
      ok: boolean;
      parameters?: ResponseParameters;
    },
    method: string,
    params?: object,
  ) {
    let message = { description: "unknown error" };

    if (typeof error === "string") {
      message.description = error;
    }
    if (error?.description) {
      const errorDescription = error.description?.split(":")?.[1];
      if (errorDescription) {
        message.description = errorDescription[1].toLocaleLowerCase();
      }
      message.description = error.description;
    }

    super(message.description);

    this.name = `TelegramApiError[${error?.error_code ?? 404}]`;
    this.parameters = error?.parameters ?? params;
    this.method = method;
    this.code = error?.error_code ?? 404;
    this.ok = error?.ok ?? false;
  }
}

/**
 * Custom error class for errors related to event handling
 * @extends Error
 */
class EventError extends Error {
  /**
   * Creates a new instance of the EventError class
   * @param {string} error - The error message
   */
  constructor(error: string) {
    super(error);
  }
}

/**
 * Custom error class for errors related to bit fields
 * @extends Error
 */
class BitFieldError extends Error {
  /**
   * Creates a new instance of the BitFieldError class
   * @param {string} error - The error message
   */
  constructor(error: string) {
    super(error);
  }
}

/**
 * Custom error class for errors related to intents
 * @extends Error
 */
class IntentsError extends Error {
  /**
   * Creates a new instance of the IntentsError class
   * @param {string} error - The error message
   */
  constructor(error: string) {
    super(error);
  }
}

export { TelegramApiError, EventError, IntentsError, BitFieldError };
