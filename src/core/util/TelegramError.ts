class BaseError extends Error {
  constructor(description: string) {
    super(description);
  }
}

class TelegramError extends BaseError {
  constructor(description: string) {
    super(description);
  }
}

class TelegramTypeError extends BaseError {
  constructor(description: string) {
    super(description);
  }
}

export { BaseError, TelegramError, TelegramTypeError };
