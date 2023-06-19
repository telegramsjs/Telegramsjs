"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorExtension = exports.ErrorTable = exports.ParameterError = exports.BitFieldError = exports.IntentsError = exports.TelegramTokenError = exports.EventError = exports.TelegramApiError = void 0;
/**
 * Custom error class for errors returned by the Telegram Bot API
 * @extends Error
 */
class TelegramApiError extends Error {
    /**
     * Creates a new instance of the TelegramApiError class
     * @param {string | object} error - The error message returned by the Telegram Bot API
     */
    constructor(error) {
        var _a, _b, _c, _d, _e, _f;
        let message = { description: "" };
        if (error.error_code !== undefined) {
            message.description = (((_d = (_c = (_b = (_a = error.description) === null || _a === void 0 ? void 0 : _a.replace("Bad Request: ", "")) === null || _b === void 0 ? void 0 : _b.replace("can't parse entities:", "")) === null || _c === void 0 ? void 0 : _c.replace("Conflict: ", "")) === null || _d === void 0 ? void 0 : _d.replace("can't parse BotCommand: ", "")) || "").toLowerCase();
        }
        else if (typeof error === "string") {
            message.description = error;
        }
        else {
            message.description = error.description || "unknown error";
        }
        super(message.description);
        this.name = `TelegramApiError[${(_e = error === null || error === void 0 ? void 0 : error.error_code) !== null && _e !== void 0 ? _e : 0}]`;
        this.code = (_f = error === null || error === void 0 ? void 0 : error.error_code) !== null && _f !== void 0 ? _f : 0;
        this.ok = error === null || error === void 0 ? void 0 : error.ok;
    }
}
exports.TelegramApiError = TelegramApiError;
/**
 * Custom error class for errors related to event handling
 * @extends Error
 */
class EventError extends Error {
    /**
     * Creates a new instance of the EventError class
     * @param {string} error - The error message
     */
    constructor(error) {
        super(error);
    }
}
exports.EventError = EventError;
/**
 * Custom error class for errors related to Telegram tokens
 * @extends Error
 */
class TelegramTokenError extends Error {
    /**
     * Creates a new instance of the TelegramTokenError class
     * @param {string} error - The error message
     */
    constructor(error) {
        super(error);
    }
}
exports.TelegramTokenError = TelegramTokenError;
/**
 * Custom error class for errors related to bit fields
 * @extends Error
 */
class BitFieldError extends Error {
    /**
     * Creates a new instance of the BitFieldError class
     * @param {string} error - The error message
     */
    constructor(error) {
        super(error);
    }
}
exports.BitFieldError = BitFieldError;
/**
 * Custom error class for errors related to intents
 * @extends Error
 */
class IntentsError extends Error {
    /**
     * Creates a new instance of the IntentsError class
     * @param {string} error - The error message
     */
    constructor(error) {
        super(error);
    }
}
exports.IntentsError = IntentsError;
/**
 * Custom error class for errors related to function parameters
 * @extends Error
 */
class ParameterError extends Error {
    /**
     * Creates a new instance of the ParameterError class
     * @param {string} error - The error message
     */
    constructor(error) {
        super(error);
    }
}
exports.ParameterError = ParameterError;
/**
 * Custom error class for a collection of errors
 * @extends Error
 */
class ErrorTable extends Error {
    /**
     * Creates a new instance of the ErrorTable class
     * @param {string} error - The error message
     */
    constructor(error) {
        super(error);
    }
}
exports.ErrorTable = ErrorTable;
/**
 * Custom error class for a collection of errors
 * @extends Error
 */
class ErrorExtension extends Error {
    /**
     * Creates a new instance of the ErrorExtension class
     * @param {string} error - The error message
     */
    constructor(error) {
        super(error);
    }
}
exports.ErrorExtension = ErrorExtension;
