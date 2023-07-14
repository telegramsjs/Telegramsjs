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
class TelegramBot extends BaseClient_1.BaseClient {
    constructor(token, options = {}) {
        super(token, options.intents || null);
        this.token = "";
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
    }
    /**
     * Defines a command handler.
     * ```ts
     * // Register a command handler for the "/like" command
     * bot.command("like", (message, args) => {
     *   const username = message.from.first_name;
     *   message.reply(`${username}, wrote like ❤️`);
     * });
     *
     * // Register a command handler for multiple commands: "/like" and "/dislike"
     * bot.command(["like", "dislike"], (message, args) => {
     *   const username = message.from.first_name;
     *   if (args[0] === "like") {
     *     message.reply(`${username}, wrote like ❤️`);
     *   } else if (args[0] === "dislike") {
     *     message.reply(`${username}, wrote on dislike 🫠`);
     *   }
     * });
     *
     * // Register a command handler for the "/dislike" command with interactive answer
     * bot.command("dislike", (message, args) => {
     *   const username = message.from.first_name;
     *   message.reply(`${username}, wrote on dislike 🫠`, true);
     * });
     * ```
     * @param {string | string[]} command - The command string or an array of command strings.
     * @param {(message: (Message.TextMessage & Context<F>), args?: string[]) => void} callback - The callback function to handle the command.
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
     * ```ts
     * // Action allows you to track button click events 'callback_data'
     * bot.action("like", (ctx) => {
     *   const username = ctx.first_name;
     *   ctx.reply(`${username}, clicked like ❤️`);
     * });
     *
     * // Action can track, not only one interaction, but several at once
     * bot.action(["like", "dislike"], (ctx) => {
     *   const username = ctx.first_name;
     *   if (ctx.data === "like") {
     *   ctx.reply(`${username}, clicked like ❤️`);
     *   } else {
     *   ctx.reply(`${username}, clicked on dislike 🫠`);
     *   }
     * });
     *
     * // To answer interactively use the third argument 'answer'
     * bot.action("dislike", (ctx) => {
     *   const username = ctx.first_name;
     *   ctx.reply(`${username}, clicked on dislike 🫠`);
     * }, true);
     * ```
     * @param {string | string[]} data - The action data string or an array of action data strings.
     * @param {(callbackQuery: (CallbackQuery & Context<F>)) => void} callback - The callback function to handle the action.
     * @param {boolean} [answer=false] - Whether to answer the action.
     */
    action(data, callback, answer = false) {
        if (typeof data === "string") {
            this.on("callback_query", (ctx) => {
                if (answer) {
                    ctx.answerCallbackQuery();
                }
                if (ctx.data === data) {
                    callback(ctx);
                }
            });
        }
        else if (Array.isArray(data)) {
            this.on("callback_query", (ctx) => {
                if (answer) {
                    ctx.answerCallbackQuery();
                }
                if (data.some((d) => d === ctx.data)) {
                    callback(ctx);
                }
            });
        }
    }
    /**
     * Sets the session property.
     * ```ts
     * import { Collection, Context } from "telegramsjs";
     *
     * bot.on('message', (message: Message & Context) => {
     *  bot.session.set('session1', message.from);
     * })
     *
     *
     * bot.use(new Collection<string, any>());
     * ```
     *
     * @param {any} params - The parameters to set the session.
     * @returns {void}
     */
    use(params) {
        this.session = params;
    }
    /**
     * The function that starts the whole process.
     * ```ts
     * import { TelegramBot } from "telegramsjs";
     * import { UserFromGetMe } from "@telegram.ts/types";
     *
     * const bot = new TelegramBot('BOT_TOKEN');
     *
     * bot.on('ready', (user: UserFromGetMe) => {
     *  console.log(`Bot ${user.username}`)
     * })
     *
     * bot.login()
     * ```
     */
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            const updatesProcess = new CombinedClass_1.CombinedClass(this);
            (() => __awaiter(this, void 0, void 0, function* () {
                this.getMe()
                    .then((res) => {
                    this.emit("ready", res);
                })
                    .catch((err) => {
                    console.log(err);
                });
            }))();
            updatesProcess.processUpdate();
        });
    }
}
exports.TelegramBot = TelegramBot;
