"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramError = void 0;
/**
 * Represents a generic error from the Telegram API.
 * This error class extends the standard `Error` object and includes additional properties for error code and description.
 */
class TelegramError extends Error {
    /**
     * Creates an instance of TelegramError.
     * @param description - The error description provided by the Telegram API.
     * @param code - The optional error code provided by the Telegram API.
     */
    constructor(description, code) {
        var _a;
        super(description);
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = "TelegramError";
        this.description = description;
        if (code)
            this.code = code;
        (_a = Error.captureStackTrace) === null || _a === void 0 ? void 0 : _a.call(Error, this, TelegramError);
    }
}
exports.TelegramError = TelegramError;
//# sourceMappingURL=TelegramError.js.map