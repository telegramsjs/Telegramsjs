class TelegramError extends Error {
  constructor(description: string) {
    super(description);
    Error.captureStackTrace?.(this, TelegramError);
  }
}

class TelegramTypeError extends TypeError {
  constructor(description: string) {
    super(description);
    Error.captureStackTrace?.(this, TelegramTypeError);
  }
}

export { TelegramError, TelegramTypeError };
