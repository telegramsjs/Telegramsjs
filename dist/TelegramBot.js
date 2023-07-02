"use strict";
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
exports.TelegramBot = void 0;
const BaseClient_1 = require("./BaseClient");
const CombinedClass_1 = require("./helpers/CombinedClass");
/**
 * A class representing a Telegram Bot client.
 * @extends BaseClient
 */
class TelegramBot extends BaseClient_1.BaseClient {
    /**
     * Creates a new TelegramBot client.
     * @param {string} token - The Telegram Bot API token.
     * @param {Object} [options] - The client options.
     * @param {string | array | number} [options.intents] - The client intents.
     * @param {string} [options.parseMode] - The parse mode for message formatting.
     * @param {string | number} [options.chatId] - The default chat ID for sending messages.
     * @param {string} [options.queryString] - The default query string for API requests.
     * @param {string | object} [options.offSetType] - The type of offset to use for updates.
     */
    constructor(token, options = {}) {
        super(token, options.intents || null, options.parseMode, options.chatId, options.queryString, options.offSetType);
        this.token = "";
        this.intents = null;
        this.baseUrl = "";
        /**
         * The Telegram Bot API token.
         * @type {string}
         */
        this.token = token;
        /**
         * The base URL for the Telegram Bot API.
         * @type {string}
         */
        this.baseUrl = `https://api.telegram.org/bot${this.token}`;
        this.countCollector = 0;
    }
    /**
     * Defines a command handler.
     * @param {string | string[]} command - The command string or an array of command strings.
     * @param {(message: Message.TextMessage, args?: string[]) => void} callback - The callback function to handle the command.
     */
    command(command, callback) {
        if (typeof command === "string") {
            this.on("message", (message) => {
                var _a, _b;
                const args = (_b = (_a = message.text).split) === null || _b === void 0 ? void 0 : _b.call(_a, " ");
                const text = message.text;
                if (text && text.startsWith(`/${command}`)) {
                    callback(message, args);
                }
            });
        }
        else if (Array.isArray(command)) {
            this.on("message", (message) => {
                var _a, _b;
                const args = (_b = (_a = message.text).split) === null || _b === void 0 ? void 0 : _b.call(_a, " ");
                const text = message.text;
                if (text && command.some((cmd) => text.startsWith(`/${cmd}`))) {
                    callback(message, args);
                }
            });
        }
    }
    /**
     * Defines an action handler.
     * @param {string | string[]} data - The action data string or an array of action data strings.
     * @param {(callbackQuery: CallbackQuery) => void} callback - The callback function to handle the action.
     * @param {boolean} [answer=false] - Whether to answer the action.
     */
    action(data, callback, answer = false) {
        if (typeof data === "string") {
            this.on("callback_query", (ctx) => {
                if (answer) {
                    this.answerCallbackQuery({
                        callbackQueryId: ctx.id,
                    });
                }
                if (ctx.data === data) {
                    callback(ctx);
                }
            });
        }
        else if (Array.isArray(data)) {
            this.on("callback_query", (ctx) => {
                if (answer) {
                    this.answerCallbackQuery({
                        callbackQueryId: ctx.id,
                    });
                }
                if (data.some((d) => d === ctx.data)) {
                    callback(ctx);
                }
            });
        }
    }
    /**
     * The function that starts the whole process.
     */
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.getMe();
            const responseClient = yield Object.assign(Object.assign({}, client), { setCommands: this.setMyCommands.bind(this), getCommands: this.getMyCommands.bind(this), deleteCommands: this.deleteMyCommands.bind(this), setDescription: this.setMyDescription.bind(this), getDescription: this.getMyDescription.bind(this), setShortDescription: this.setMyShortDescription.bind(this), getShortDescription: this.getMyShortDescription.bind(this), getName: this.getMyName.bind(this), setName: this.setMyName.bind(this) });
            this.updatesProcess = new CombinedClass_1.CombinedClass(this);
            (() => __awaiter(this, void 0, void 0, function* () {
                this.getMe()
                    .then((res) => {
                    this.emit("ready", responseClient);
                })
                    .catch((err) => {
                    console.log(err);
                });
            }))();
            this.updatesProcess.processUpdate();
        });
    }
}
exports.TelegramBot = TelegramBot;
