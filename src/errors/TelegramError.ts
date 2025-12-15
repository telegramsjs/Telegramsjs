import { ErrorCodes, ErrorMessages } from "./ErrorCodes";

/**
 * Represents a generic error from the Telegram API.
 * This error class extends the standard `Error` object and includes additional properties for error code and description.
 */
class TelegramError extends Error {
  public code: ErrorCodes;
  public description: string;

  /**
   * Creates an instance of TelegramError.
   * @param code - The error code from the enum ErrorCodes.
   * @param params - An object containing values to replace placeholders in the error message.
   */
  constructor(code: ErrorCodes, params?: Record<string, any>) {
    const message = ErrorMessages[code];
    const formattedMessage = message ? formatMessage(message, params) : message;
    super(formattedMessage);
    this.name = "TelegramError";
    this.code = code;
    this.description = formattedMessage;
    Error.captureStackTrace?.(this, TelegramError);
  }

  /**
   * Returns a string representation of the error.
   * @returns The error code and message.
   */
  override toString() {
    return `[${this.code}] ${this.message}`;
  }
}

/**
 * Formats the error message by replacing placeholders with actual values.
 * @param message - The error message with placeholders.
 * @param params - An object containing values to replace placeholders.
 * @returns The formatted error message.
 */
function formatMessage(message: string, params?: Record<string, any>): string {
  if (!params) return message;
  return message.replace(/\${(.*?)}/g, (_, key) => {
    return key in params ? String(params[key]) : `{${key}}`;
  });
}

export { TelegramError };
