"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRequest = void 0;
const node_https_1 = require("node:https");
const MediaData_1 = require("./MediaData");
// @ts-ignore
const snakeCase = require("lodash.snakecase");
const Utils_1 = require("../util/Utils");
const node_fetch_1 = require("node-fetch");
const TelegramError_1 = require("../errors/TelegramError");
const ApiPermissions_1 = require("../util/ApiPermissions");
const ChatPermissions_1 = require("../util/ChatPermissions");
const HTTPResponseError_1 = require("../errors/HTTPResponseError");
/**
 * Handles API requests to the Telegram Bot API.
 */
class ApiRequest {
    /**
     * @param authToken - The authentication token for the Telegram Bot API.
     * @param requestOptions - Options for the fetch request.
     */
    constructor(authToken, requestOptions = {
        agent: new node_https_1.Agent({
            keepAlive: true,
            keepAliveMsecs: 10000,
        }),
    }) {
        Object.defineProperty(this, "authToken", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: authToken
        });
        Object.defineProperty(this, "requestOptions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: requestOptions
        });
        Object.defineProperty(this, "media", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new MediaData_1.MediaData()
        });
    }
    /**
     * Prepares the configuration for the fetch request based on the provided options.
     * @param options - The options to include in the request.
     * @returns The configuration for the fetch request.
     */
    async transferDataToServer(options) {
        const snakeCaseOptions = this.validateCamelCaseKeys(options);
        if (this.media.hasMedia(snakeCaseOptions)) {
            return await this.media.buildFormDataConfig(snakeCaseOptions, this.requestOptions);
        }
        else {
            return this.media.buildJSONConfig(snakeCaseOptions, this.requestOptions);
        }
    }
    /**
     * Makes a GET request to the Telegram Bot API.
     * @param method - The API method to call.
     * @param options - The options to include in the request.
     * @returns The result from the API response.
     * @throws {HTTPResponseError} If the API response indicates an error.
     */
    async get(method, options = {}) {
        const apiUrl = `https://api.telegram.org/bot${this.authToken}/${method}`;
        const config = await this.transferDataToServer(options);
        const request = await (0, node_fetch_1.default)(apiUrl, config);
        const response = await request.json();
        if (!response.ok) {
            throw new HTTPResponseError_1.HTTPResponseError(response, request);
        }
        return response.result;
    }
    validateCamelCaseKeys(options) {
        const snakeCaseOptions = {};
        for (const [key, value] of Object.entries(options)) {
            if (!(0, Utils_1.isCamelCase)(key)) {
                throw new TelegramError_1.TelegramError(`The provided string "${key}" is not in camelCase format`);
            }
            if (key === "userAdministratorRights" ||
                key === "botAdministratorRights") {
                snakeCaseOptions[snakeCase(key)] = (0, ApiPermissions_1.toApiFormat)(new ChatPermissions_1.ChatPermissions(value).toObject());
                continue;
            }
            if (Array.isArray(value)) {
                snakeCaseOptions[snakeCase(key)] = value.map((value) => {
                    if (Array.isArray(value)) {
                        return value.map((value) => this.validateCamelCaseKeys(value));
                    }
                    return typeof value === "object"
                        ? this.validateCamelCaseKeys(value)
                        : value;
                });
                continue;
            }
            if (typeof value === "object") {
                snakeCaseOptions[snakeCase(key)] = this.validateCamelCaseKeys(value);
                continue;
            }
            snakeCaseOptions[snakeCase(key)] = value;
        }
        return snakeCaseOptions;
    }
}
exports.ApiRequest = ApiRequest;
//# sourceMappingURL=ApiRequest.js.map