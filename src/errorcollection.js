class TelegramApiError extends Error {
  constructor(error) {
    super(error);
  }
}

class EventError extends Error {
  constructor(error) {
    super(error);
  }
}

class TelegramTokenError extends Error {
  constructor(error) {
    super(error);
  }
}

module.exports = {
  TelegramApiError,
  EventError,
  TelegramTokenError
}