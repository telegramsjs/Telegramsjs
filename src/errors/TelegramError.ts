/**
 * Represents a generic error from the Telegram API.
 * This error class extends the standard `Error` object and includes additional properties for error code and description.
 */
class TelegramError extends Error {
  public code?: number | string;
  public description: string;

  /**
   * Creates an instance of TelegramError.
   * @param description - The error description provided by the Telegram API.
   * @param code - The optional error code provided by the Telegram API.
   */
  constructor(description: string, code?: number | string) {
    super(description);
    this.name = "TelegramError";
    this.description = description;
    if (code) this.code = code;
    Error.captureStackTrace?.(this, TelegramError);
  }
}

export { TelegramError };
