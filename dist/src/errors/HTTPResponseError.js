"use strict";
var _HTTPResponseError_request;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPResponseError = void 0;
const tslib_1 = require("tslib");
const TelegramError_1 = require("./TelegramError");
/**
 * Represents an HTTP response error received from Telegram API.
 * Extends the base `TelegramError` class to include specific details about the error response.
 */
class HTTPResponseError extends TelegramError_1.TelegramError {
    /**
     * @param response - The response data received from the Telegram API.
     * @param request - The original HTTP response object.
     */
    constructor(response, request) {
        const { error_code, description, parameters } = response;
        super(description, error_code);
        Object.defineProperty(this, "description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "parameters", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        _HTTPResponseError_request.set(this, void 0);
        this.name = `ErrorResponse[${error_code}]`;
        this.code = error_code;
        this.description = description;
        this.parameters = parameters;
        if (request)
            tslib_1.__classPrivateFieldSet(this, _HTTPResponseError_request, request, "f");
    }
    /**
     * The URL of the request that caused the error.
     * @returns The URL of the request, or null if not available.
     */
    get url() {
        var _a;
        return ((_a = tslib_1.__classPrivateFieldGet(this, _HTTPResponseError_request, "f")) === null || _a === void 0 ? void 0 : _a.url) || null;
    }
    /**
     * The HTTP status code of the response.
     * @returns The HTTP status code, or null if not available.
     */
    get status() {
        var _a;
        return ((_a = tslib_1.__classPrivateFieldGet(this, _HTTPResponseError_request, "f")) === null || _a === void 0 ? void 0 : _a.status) || null;
    }
    /**
     * The status text of the HTTP response.
     * @returns The status text, or null if not available.
     */
    get statusText() {
        var _a;
        return ((_a = tslib_1.__classPrivateFieldGet(this, _HTTPResponseError_request, "f")) === null || _a === void 0 ? void 0 : _a.statusText) || null;
    }
    /**
     * The headers of the HTTP response.
     * @returns The response headers, or null if not available.
     */
    get headers() {
        var _a;
        return ((_a = tslib_1.__classPrivateFieldGet(this, _HTTPResponseError_request, "f")) === null || _a === void 0 ? void 0 : _a.headers) || null;
    }
}
exports.HTTPResponseError = HTTPResponseError;
_HTTPResponseError_request = new WeakMap();
//# sourceMappingURL=HTTPResponseError.js.map