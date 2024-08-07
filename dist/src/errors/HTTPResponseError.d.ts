import { TelegramError } from "./TelegramError";
import type { IRequestFailt } from "../types";
import type { Response, Headers } from "node-fetch";
/**
 * Represents an HTTP response error received from Telegram API.
 * Extends the base `TelegramError` class to include specific details about the error response.
 */
declare class HTTPResponseError extends TelegramError {
    #private;
    description: string;
    parameters: IRequestFailt["parameters"];
    /**
     * @param response - The response data received from the Telegram API.
     * @param request - The original HTTP response object.
     */
    constructor(response: IRequestFailt, request?: Response);
    /**
     * The URL of the request that caused the error.
     * @returns The URL of the request, or null if not available.
     */
    get url(): string | null;
    /**
     * The HTTP status code of the response.
     * @returns The HTTP status code, or null if not available.
     */
    get status(): number | null;
    /**
     * The status text of the HTTP response.
     * @returns The status text, or null if not available.
     */
    get statusText(): string | null;
    /**
     * The headers of the HTTP response.
     * @returns The response headers, or null if not available.
     */
    get headers(): Headers | null;
}
export { HTTPResponseError };
//# sourceMappingURL=HTTPResponseError.d.ts.map