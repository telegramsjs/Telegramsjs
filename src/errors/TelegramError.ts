class TelegramError extends Error {
  public code?: number | string;
  public description: string;

  constructor(description: string, code?: number | string) {
    super(description);
    this.code = code;
    this.name = "TelegramError";
    this.description = description;
    Error.captureStackTrace?.(this, TelegramError);
  }
}

export { TelegramError };
