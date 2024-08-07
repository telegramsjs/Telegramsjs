/**
 * Represents a generic error from the Telegram API.
 * This error class extends the standard `Error` object and includes additional properties for error code and description.
 */
declare class TelegramError extends Error {
    code?: number | string;
    description: string;
    /**
     * Creates an instance of TelegramError.
     * @param description - The error description provided by the Telegram API.
     * @param code - The optional error code provided by the Telegram API.
     */
    constructor(description: string, code?: number | string);
}
export { TelegramError };
//# sourceMappingURL=TelegramError.d.ts.map