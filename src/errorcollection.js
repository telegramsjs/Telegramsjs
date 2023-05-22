/**
 * Custom error class for errors returned by the Telegram Bot API
 * @extends Error
 */
class TelegramApiError extends Error {
  /**
   * Creates a new instance of the TelegramApiError class
   * @param {string} error - The error message returned by the Telegram Bot API
   */
  constructor(error) {
    const message = error.description?.replace("Bad Request: ", "")?.replace("can't parse entities:", "")?.replace("Conflict: ", "")?.replace("can't parse BotCommand: ", "").toLowerCase();
    super(message);
    this.name = `TelegramApiError[${error.error_code}]`;
    this.code = error.error_code;
    this.ok = error.ok;
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
  constructor(error) {
    super(error);
  }
}

/**
 * Custom error class for errors related to Telegram tokens
 * @extends Error
 */
class TelegramTokenError extends Error {
  /**
   * Creates a new instance of the TelegramTokenError class
   * @param {string} error - The error message
   */
  constructor(error) {
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
  constructor(error) {
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
  constructor(error) {
    super(error);
  }
}

/**
 * Custom error class for errors related to function parameters
 * @extends Error
 */
class ParameterError extends Error {
  /**
   * Creates a new instance of the ParameterError class
   * @param {string} error - The error message
   */
  constructor(error) {
    super(error);
  }
}

module.exports = {
  TelegramApiError,
  EventError,
  TelegramTokenError,
  IntentsError,
  BitFieldError,
  ParameterError
}