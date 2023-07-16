import { ResponseParameters } from "@telegram.ts/types";
/**
 * Represents an error that occurs when interacting with the Telegram Bot API.
 */
declare class TelegramApiError extends Error {
    code: number;
    ok: boolean;
    method: string;
    parameters?: ResponseParameters;
    /**
     * Constructs a new TelegramApiError object.
     * @param {object | string} error - The error object or error message.
     * @param {string} method - The method that caused the error.
     */
    constructor(error: {
        error_code: number;
        description: string;
        ok: boolean;
        parameters?: ResponseParameters;
    }, method: string);
}
/**
 * Custom error class for errors related to event handling
 * @extends Error
 */
declare class EventError extends Error {
    /**
     * Creates a new instance of the EventError class
     * @param {string} error - The error message
     */
    constructor(error: string);
}
/**
 * Custom error class for errors related to bit fields
 * @extends Error
 */
declare class BitFieldError extends Error {
    /**
     * Creates a new instance of the BitFieldError class
     * @param {string} error - The error message
     */
    constructor(error: string);
}
/**
 * Custom error class for errors related to intents
 * @extends Error
 */
declare class IntentsError extends Error {
    /**
     * Creates a new instance of the IntentsError class
     * @param {string} error - The error message
     */
    constructor(error: string);
}
/**
 * Custom error class for errors related to function parameters
 * @extends Error
 */
declare class ParameterError extends Error {
    /**
     * Creates a new instance of the ParameterError class
     * @param {string} error - The error message
     */
    constructor(error: string);
}
/**
 * Custom error class for a collection of errors
 * @extends Error
 */
declare class ErrorTable extends Error {
    /**
     * Creates a new instance of the ErrorTable class
     * @param {string} error - The error message
     */
    constructor(error: string);
}
/**
 * Custom error class for a collection of errors
 * @extends Error
 */
declare class ErrorExtension extends Error {
    /**
     * Creates a new instance of the ErrorExtension class
     * @param {string} error - The error message
     */
    constructor(error: string);
}
export { TelegramApiError, EventError, IntentsError, BitFieldError, ParameterError, ErrorTable, ErrorExtension, };
//# sourceMappingURL=errorcollection.d.ts.map