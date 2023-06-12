/**
 * Custom error class for errors returned by the Telegram Bot API
 * @extends Error
 */
class TelegramApiError extends Error {
  public code?: number;
  public ok?: boolean;

  /**
   * Creates a new instance of the TelegramApiError class
   * @param {string | object} error - The error message returned by the Telegram Bot API
   */
  constructor(error: {
    error_code?: number,
    description?: string,
    ok?: boolean 
  }) {
    let message: {
      description: string;
    } = { description: '' };

    if (error.error_code !== undefined) {
      message.description = (error.description?.replace("Bad Request: ", "")?.replace("can't parse entities:", "")?.replace("Conflict: ", "")?.replace("can't parse BotCommand: ", "") || "").toLowerCase();
    } else if (typeof error === 'string') {
      message.description = error;
    } else {
      message.description = error.description || 'unknown error';
    }

    super(message.description);

    this.name = `TelegramApiError[${error?.error_code ?? 0}]`;
    this.code = error?.error_code ?? 0;
    this.ok = error?.ok;
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
 * Custom error class for errors related to Telegram tokens
 * @extends Error
 */
class TelegramTokenError extends Error {
  /**
   * Creates a new instance of the TelegramTokenError class
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

/**
 * Custom error class for errors related to function parameters
 * @extends Error
 */
class ParameterError extends Error {
  /**
   * Creates a new instance of the ParameterError class
   * @param {string} error - The error message
   */
  constructor(error: string) {
    super(error);
  }
}

/**
 * Custom error class for a collection of errors
 * @extends Error
 */
class ErrorTable extends Error {
  /**
   * Creates a new instance of the ErrorTable class
   * @param {string} error - The error message
   */
  constructor(error: string) {
    super(error);
  }
}

/**
 * Custom error class for a collection of errors
 * @extends Error
 */
class ErrorExtension extends Error {
  /**
   * Creates a new instance of the ErrorExtension class
   * @param {string} error - The error message
   */
  constructor(error: string) {
    super(error);
  }
}

export {
  TelegramApiError,
  EventError,
  TelegramTokenError,
  IntentsError,
  BitFieldError,
  ParameterError,
  ErrorTable,
  ErrorExtension
};
