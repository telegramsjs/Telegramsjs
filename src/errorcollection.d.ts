/**
 * Custom error class for errors returned by the Telegram Bot API
 * @extends Error
 */
export class TelegramApiError extends Error {
    /**
     * Creates a new instance of the TelegramApiError class
     * @param {string} error - The error message returned by the Telegram Bot API
     */
    constructor(error: string);
    code: any;
    ok: any;
}
/**
 * Custom error class for errors related to event handling
 * @extends Error
 */
export class EventError extends Error {
    /**
     * Creates a new instance of the EventError class
     * @param {string} error - The error message
     */
    constructor(error: string);
}
/**
 * Custom error class for errors related to Telegram tokens
 * @extends Error
 */
export class TelegramTokenError extends Error {
    /**
     * Creates a new instance of the TelegramTokenError class
     * @param {string} error - The error message
     */
    constructor(error: string);
}
/**
 * Custom error class for errors related to intents
 * @extends Error
 */
export class IntentsError extends Error {
    /**
     * Creates a new instance of the IntentsError class
     * @param {string} error - The error message
     */
    constructor(error: string);
}
/**
 * Custom error class for errors related to bit fields
 * @extends Error
 */
export class BitFieldError extends Error {
    /**
     * Creates a new instance of the BitFieldError class
     * @param {string} error - The error message
     */
    constructor(error: string);
}
/**
 * Custom error class for errors related to function parameters
 * @extends Error
 */
export class ParameterError extends Error {
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
export class ErrorTable extends Error {
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
export class ErrorExtension extends Error {
    /**
     * Creates a new instance of the ErrorExtension class
     * @param {string} error - The error message
     */
    constructor(error: string);
}
