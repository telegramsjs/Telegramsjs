class TelegramApiError extends Error {
  constructor(error) {
    super(error?.replace("Bad Request: ", "")?.replace("can't parse entities:", "")?.replace("Conflict: ", "")?.replace("can't parse BotCommand: ", ""));
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

class BitFieldError extends Error {
  constructor(error) {
    super(error);
  }
}

class IntentsError extends Error {
  constructor(error) {
    super(error);
  }
}

class ParameterError extends Error {
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
