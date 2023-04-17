class TelegramApiError extends Error {
  constructor(error) {
<<<<<<< HEAD
    super(error.replace('Bad Request: ', ''));
=======
    super(error);
>>>>>>> fef04d59807cc35e4e1420d8053e5a30dd45e1b5
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

<<<<<<< HEAD
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

module.exports = {
  TelegramApiError,
  EventError,
  TelegramTokenError,
  IntentsError,
  BitFieldError
=======
module.exports = {
  TelegramApiError,
  EventError,
  TelegramTokenError
>>>>>>> fef04d59807cc35e4e1420d8053e5a30dd45e1b5
}