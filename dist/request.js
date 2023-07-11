"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const axios_1 = __importDefault(require("axios"));
const querystring = __importStar(require("querystring"));
const errorcollection_1 = require("./errorcollection");
const events_1 = require("events");
const IntentsBitField_1 = require("./IntentsBitField");
/**
 * Represents a request object for making requests to the Telegram Bot API.
 * @extends EventEmitter
 */
class Request extends events_1.EventEmitter {
    /**
     * Constructs a new Request object.
     * @param {string} [token] - The API token for the bot.
     * @param {string[] | number[] | null} [intents] - The types of updates the bot is interested in.
     * @param {string} [queryString] - The type of query string to use for requests.
     * @param {string | boolean | object} [offSetType] - The type of offset to use for updates.
     * @param {string} [options.parseMode] - The parse mode for message formatting.
     */
    constructor(token, intents) {
        super();
        this.startTime = Date.now();
        this.token = token;
        this.baseUrl = `https://api.telegram.org/bot${this.token}`;
        this.offset = 0;
        if (typeof intents === "number") {
            this.intents = (0, IntentsBitField_1.decodeIntents)(new IntentsBitField_1.IntentsBitField(intents));
        }
        else if (Array.isArray(intents) && intents.length > 0) {
            this.intents = intents;
        }
        else if (intents && typeof intents === "object") {
            this.intents = (0, IntentsBitField_1.decodeIntents)(new IntentsBitField_1.IntentsBitField(intents[0]));
        }
        else {
            this.intents = null;
        }
    }
    /**
     * Gets the updates from the Telegram Bot API.
     * @async
     * @returns {Promise.<Array.<object>>} An array of updates.
     * @throws {TelegramTokenError} When the token is invalid.
     * @throws {TelegramApiError} When an error occurs with the Telegram Bot API.
     */
    getUpdates() {
        return __awaiter(this, void 0, void 0, function* () {
            this.startTime = Date.now();
            const params = {
                offset: this.offset,
                allowed_updates: this.intents,
            };
            const response = yield this.request("getUpdates", params);
            const updates = response.result;
            if (Array.isArray(updates) && updates.length > 0) {
                this.update_id = updates[0].update_id + 1;
                this.last_object = updates[0];
                this.offset = updates[updates.length - 1].update_id + 1;
            }
            return Array.isArray(updates) ? updates : [];
        });
    }
    /**
     * Makes a request to the Telegram Bot API.
     * @async
     * @param {string} method - The API method to call.
     * @param {object} params - The parameters to include in the API call.
     * @returns {Promise.<Update>} The response from the API call.
     */
    request(method, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.baseUrl}/${method}`;
            let paramsType;
            if (params) {
                const formattedParams = params;
                paramsType = querystring.stringify(formattedParams);
            }
            const options = {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            };
            try {
                const response = yield axios_1.default.post(url, paramsType, options);
                return response.data;
            }
            catch (error) {
                let telegramError = error;
                telegramError.response.data.error_code === 404
                    ? (telegramError.response.data.description =
                        "invalid token of telegrams bot")
                    : telegramError.response.data.description;
                throw new errorcollection_1.TelegramApiError(telegramError.response.data, method);
            }
        });
    }
    /**
     * Gets the uptime of the bot.
     * @returns {number} The uptime in milliseconds.
     */
    get uptime() {
        const uptime = Date.now() - this.startTime;
        return uptime;
    }
    /**
     * Gets the ping latency of the bot.
     * @async
     * @returns {number | undefined} The ping latency in milliseconds.
     */
    ping() {
        return __awaiter(this, void 0, void 0, function* () {
            const startTime = Date.now();
            const response = yield this.request("getMe", {});
            const endTime = Date.now();
            const latency = endTime - startTime;
            return latency;
        });
    }
    /**
     * Gets the last update ID received.
     * @returns {number|null} The last update ID, or null if not available.
     */
    get updateId() {
        var _a;
        return (_a = this.update_id) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Gets the last object received.
     * @returns {Update} The last received object.
     */
    get lastObject() {
        return this.last_object;
    }
    /**
     * Set the token for the bot.
     * @param {string} token - The token to set.
     * @returns {boolean} - Returns true if the token was set successfully.
     */
    setToken(token) {
        this.token = token;
        this.baseUrl = `https://api.telegram.org/bot${this.token}`;
        return true;
    }
    /**
     * Set the intents for the bot.
     * @param {string[] | number[] | null} intents - The intents to set.
     * @returns {boolean} - Returns true if the intents were set successfully.
     */
    setIntents(intents) {
        this.intents = intents;
        return true;
    }
    /**
     * Set the offset type for the bot.
     * @param {any} offSetType - The offset type to set.
     * @returns {any} - Returns the offset type that was set.
     */
    setOffSetType(offSetType) {
        this.offSetType = offSetType !== null && offSetType !== void 0 ? offSetType : "time";
        return this.offSetType;
    }
}
exports.Request = Request;
