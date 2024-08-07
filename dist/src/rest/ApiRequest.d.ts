import { MediaData } from "./MediaData";
import { type RequestInit } from "node-fetch";
/**
 * Handles API requests to the Telegram Bot API.
 */
declare class ApiRequest {
    readonly authToken: string;
    readonly requestOptions: RequestInit;
    media: MediaData;
    /**
     * @param authToken - The authentication token for the Telegram Bot API.
     * @param requestOptions - Options for the fetch request.
     */
    constructor(authToken: string, requestOptions?: RequestInit);
    /**
     * Prepares the configuration for the fetch request based on the provided options.
     * @param options - The options to include in the request.
     * @returns The configuration for the fetch request.
     */
    transferDataToServer(options: Record<string, unknown>): Promise<RequestInit>;
    /**
     * Makes a GET request to the Telegram Bot API.
     * @param method - The API method to call.
     * @param options - The options to include in the request.
     * @returns The result from the API response.
     * @throws {HTTPResponseError} If the API response indicates an error.
     */
    get<T>(method: string, options?: Record<string, unknown>): Promise<T>;
    private validateCamelCaseKeys;
}
export { ApiRequest };
//# sourceMappingURL=ApiRequest.d.ts.map