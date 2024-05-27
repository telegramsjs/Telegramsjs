/**
 * A base class for custom error types.
 * Extends the built-in Error class.
 */
class BaseError extends Error {
  /**
   * Constructs a new BaseError instance with the specified description.
   * @param description - A description of the error.
   */
  constructor(description: string) {
    super(description);
  }
}

/**
 * A custom error type representing errors related to the Telegram API.
 * Extends the BaseError class.
 */
class TelegramError extends BaseError {
  /**
   * Constructs a new TelegramError instance with the specified description.
   * @param description - A description of the error related to the Telegram API.
   */
  constructor(description: string) {
    super(description);
  }
}

/**
 * A custom error type representing type errors related to the Telegram API.
 * Extends the BaseError class.
 */
class TelegramTypeError extends BaseError {
  /**
   * Constructs a new TelegramTypeError instance with the specified description.
   * @param description - A description of the type error related to the Telegram API.
   */
  constructor(description: string) {
    super(description);
  }
}

export { BaseError, TelegramError, TelegramTypeError };
