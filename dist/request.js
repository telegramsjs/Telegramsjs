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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const https = __importStar(require("https"));
const querystring = __importStar(require("querystring"));
const errorcollection_1 = require("./errorcollection");
const events_1 = require("events");
const IntentsBitField_1 = require("./IntentsBitField");
const Collection_1 = require("./collection/Collection");
const lastTimeMap = new Collection_1.Collection();
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
    constructor(token, intents, queryString, offSetType, parseMode) {
        super();
        this.startTime = Date.now();
        this.token = token;
        this.baseUrl = `https://api.telegram.org/bot${this.token}`;
        this.offset = 0;
        this.queryString = queryString !== null && queryString !== void 0 ? queryString : "application/x-www-form-urlencoded";
        this.offSetType = offSetType !== null && offSetType !== void 0 ? offSetType : "time";
        this.parseMode = parseMode;
        if (this.offSetType == "time") {
            this.lastTimeMap = lastTimeMap;
        }
        else if (this.offSetType instanceof Collection_1.Collection) {
            this.lastTimeMap = this.offSetType;
        }
        else if (this.offSetType === false) {
            lastTimeMap.set("lastTime", true);
            this.lastTimeMap = lastTimeMap;
        }
        else if (this.offSetType === "auto") {
            lastTimeMap.set("lastTime", "auto");
            this.lastTimeMap = lastTimeMap;
        }
        if (this.offSetType === false || this.offSetType === "time") {
            setTimeout(() => {
                lastTimeMap.set("lastTime", true);
            }, 3000);
        }
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
        this.lastTimeMap = lastTimeMap;
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
            if ((response === null || response === void 0 ? void 0 : response.error_code) === 401) {
                throw new errorcollection_1.TelegramTokenError("invalid token of telegrams bot");
            }
            else if ((response === null || response === void 0 ? void 0 : response.error_code) !== undefined) {
                throw new errorcollection_1.TelegramApiError(response.description);
            }
            return updates !== null && updates !== void 0 ? updates : [];
        });
    }
    /**
     * Makes a request to the Telegram Bot API.
     * @async
     * @param {string} method - The API method to call.
     * @param {object} params - The parameters to include in the API call.
     * @returns {Promise.<object>} The response from the API call.
     */
    request(method, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.baseUrl}/${method}`;
            const data = querystring.stringify(params);
            return new Promise((resolve, reject) => {
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": this.queryString,
                        "Content-Length": data.length.toString(),
                    },
                };
                const req = https.request(url, options, res => {
                    let response = "";
                    res.on("data", chunk => {
                        response += chunk;
                    });
                    res.on("end", () => {
                        try {
                            resolve(JSON.parse(response));
                        }
                        catch (error) {
                            reject(error);
                        }
                    });
                });
                req.on("error", error => {
                    reject(error);
                });
                req.write(data);
                req.end();
            });
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
     * @returns {object} The last received object.
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
    setIntents(intents = null) {
        this.intents = intents;
        return true;
    }
    /**
     * Set the parse mode for the bot.
     * @param {string | undefined} parseMode - The parse mode to set.
     * @returns {boolean} - Returns true if the parse mode was set successfully.
     */
    setParseMode(parseMode) {
        this.parseMode = parseMode;
        return true;
    }
    /**
     * Set the chat ID for the bot.
     * @param {string | number } chatId - The chat ID to set.
     * @returns {string | number} - Returns the chat ID that was set.
     */
    setChatId(chatId) {
        this.chatId = chatId;
        return chatId;
    }
    /**
     * Set the query string for the bot.
     * @param {string} queryString - The query string to set.
     * @returns {boolean} - Returns true if the query string was set successfully.
     */
    setQueryString(queryString) {
        this.queryString = queryString;
        return true;
    }
    /**
     * Set the offset type for the bot.
     * @param {string | boolean | object | undefined} offSetType - The offset type to set.
     * @returns {string} - Returns the offset type that was set.
     */
    setOffSetType(offSetType) {
        this.offSetType = offSetType !== null && offSetType !== void 0 ? offSetType : "time";
        return this.offSetType;
    }
}
exports.Request = Request;
