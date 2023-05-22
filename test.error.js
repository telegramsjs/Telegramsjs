class TelegramApiError extends Error {
  constructor(message) {
    super(message);
    this.code = 400;
    this.name = `TelegramApiError[${this.code}]`;
    this.description = 'token invalid';
  }
}

// Использование
throw new TelegramApiError('Invalid token');