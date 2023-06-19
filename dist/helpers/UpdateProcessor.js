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
exports.UpdateProcessor = void 0;
const BaseClient_1 = require("../BaseClient");
const errorcollection_1 = require("../errorcollection");
const messageTypeMap = {
    message: {
        event: "message",
        textEvent: "text",
    },
    edited_message: {
        event: "edited_message",
        textEvent: "edited_message_text",
        captionEvent: "edited_message_caption",
    },
    channel_post: {
        event: "channel_post",
    },
    edited_channel_post: {
        event: "edited_channel_post",
        textEvent: "edited_channel_post_text",
        captionEvent: "edited_channel_post_caption",
    },
    inline_query: {
        event: "inline_query",
    },
    chosen_inline_result: {
        event: "chosen_inline_result",
    },
    callback_query: {
        event: "callback_query",
    },
    shipping_query: {
        event: "shipping_query",
    },
    pre_checkout_query: {
        event: "pre_checkout_query",
    },
    poll: {
        event: "poll",
    },
    poll_answer: {
        event: "poll_answer",
    },
    chat_member: {
        event: "chat_member",
    },
    my_chat_member: {
        event: "my_chat_member",
    },
    chat_join_request: {
        event: "chat_join_request",
    },
};
/**
 * Represents the UpdateProcessor class.
 */
class UpdateProcessor {
    /**
     * Creates an instance of UpdateProcessor.
     * @param {TelegramBot} bot - The TelegramBot instance.
     */
    constructor(bot) {
        this.bot = bot;
        this.functions = new BaseClient_1.BaseClient(bot.token, bot.intents, bot.parseMode, bot.chatId, bot.queryString, bot.offSetType);
    }
    /**
     * Processes the updates.
     * @param {ResponseApi} [updates] - The updates object.
     * @returns {Promise<void>}
     */
    processUpdate(updates) {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                const getUpdates = yield this.bot.getUpdates();
                for (const update of getUpdates) {
                    let responseLastTime = this.bot.lastTimeMap.get("lastTime");
                    if (responseLastTime === "auto")
                        responseLastTime = true;
                    if (responseLastTime) {
                        for (const [type, options] of Object.entries(messageTypeMap)) {
                            const updateProperty = update[type];
                            this.updates = updateProperty;
                            if (updateProperty) {
                                const chat = Object.assign({}, updateProperty.chat, {
                                    send: (args, defaults) => this.send(args, defaults),
                                    leave: (args) => this.leave(args),
                                });
                                const message = Object.assign(Object.assign({}, updateProperty), { chat, client: this, reply: (args, defaults) => this.reply(args, defaults), isCommand: (args) => this.isCommand(args) });
                                this.bot.emit(options.event, message);
                                if (options.textEvent && updateProperty.text) {
                                    this.bot.emit(options.textEvent, message);
                                }
                                if (options.captionEvent && updateProperty.caption) {
                                    this.bot.emit(options.captionEvent, message);
                                }
                                if (type === "message" && updateProperty.reply_to_message) {
                                    this.bot.emit("reply_message", message);
                                }
                                break;
                            }
                        }
                    }
                }
            }
        });
    }
    /**
     * Sends a reply message.
     * @param {SendOptions} options - The options for sending a message.
     * @param {Defaults} [defaults] - The default options for sending a message.
     * @returns {Promise<object | undefined>}
     */
    reply(options, defaults) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3;
        return __awaiter(this, void 0, void 0, function* () {
            let chatId;
            let messageId;
            let text = typeof options === "object" ? options.text : options;
            if (typeof options === "object" && typeof defaults === "object") {
                throw new errorcollection_1.ParameterError("default object should not have a text property");
            }
            else if (typeof options === "string" && (defaults === null || defaults === void 0 ? void 0 : defaults.text)) {
                throw new errorcollection_1.ParameterError("default object should not be used with a string message");
            }
            else if (typeof options === "string" && typeof defaults === "string") {
                throw new errorcollection_1.ParameterError("this code should not have two string parameters simultaneously.");
            }
            if ((_b = (_a = this.updates) === null || _a === void 0 ? void 0 : _a.callback_query) === null || _b === void 0 ? void 0 : _b.message) {
                chatId =
                    (options === null || options === void 0 ? void 0 : options.chatId) ||
                        (defaults === null || defaults === void 0 ? void 0 : defaults.chatId) ||
                        ((_d = (_c = this.updates.callback_query) === null || _c === void 0 ? void 0 : _c.chat) === null || _d === void 0 ? void 0 : _d.id);
                messageId =
                    (options === null || options === void 0 ? void 0 : options.messageId) ||
                        (defaults === null || defaults === void 0 ? void 0 : defaults.messageId) ||
                        ((_f = (_e = this.updates.callback_query) === null || _e === void 0 ? void 0 : _e.message) === null || _f === void 0 ? void 0 : _f.message_id);
            }
            else if ((_g = this.updates) === null || _g === void 0 ? void 0 : _g.edited_message) {
                chatId =
                    (options === null || options === void 0 ? void 0 : options.chatId) ||
                        (defaults === null || defaults === void 0 ? void 0 : defaults.chatId) ||
                        ((_j = (_h = this.updates.edited_message) === null || _h === void 0 ? void 0 : _h.chat) === null || _j === void 0 ? void 0 : _j.id);
                messageId =
                    (options === null || options === void 0 ? void 0 : options.messageId) ||
                        (defaults === null || defaults === void 0 ? void 0 : defaults.messageId) ||
                        ((_k = this.updates.edited_message) === null || _k === void 0 ? void 0 : _k.message_id);
            }
            else if ((_l = this.updates) === null || _l === void 0 ? void 0 : _l.edited_channel_post) {
                chatId =
                    (options === null || options === void 0 ? void 0 : options.chatId) ||
                        (defaults === null || defaults === void 0 ? void 0 : defaults.chatId) ||
                        ((_o = (_m = this.updates.edited_channel_post) === null || _m === void 0 ? void 0 : _m.chat) === null || _o === void 0 ? void 0 : _o.id);
                messageId =
                    (options === null || options === void 0 ? void 0 : options.messageId) ||
                        (defaults === null || defaults === void 0 ? void 0 : defaults.messageId) ||
                        ((_p = this.updates.edited_channel_post) === null || _p === void 0 ? void 0 : _p.message_id);
            }
            else {
                chatId =
                    (options === null || options === void 0 ? void 0 : options.chatId) ||
                        (defaults === null || defaults === void 0 ? void 0 : defaults.chatId) ||
                        ((_r = (_q = this.updates) === null || _q === void 0 ? void 0 : _q.chat) === null || _r === void 0 ? void 0 : _r.id) ||
                        ((_u = (_t = (_s = this.updates) === null || _s === void 0 ? void 0 : _s.channel_post) === null || _t === void 0 ? void 0 : _t.chat) === null || _u === void 0 ? void 0 : _u.id);
                messageId =
                    (options === null || options === void 0 ? void 0 : options.messageId) ||
                        (defaults === null || defaults === void 0 ? void 0 : defaults.messageId) ||
                        ((_v = this.updates) === null || _v === void 0 ? void 0 : _v.message_id) ||
                        ((_x = (_w = this.updates) === null || _w === void 0 ? void 0 : _w.channel_post) === null || _x === void 0 ? void 0 : _x.message_id);
            }
            if (text === undefined) {
                throw new errorcollection_1.ParameterError("Text is missing");
            }
            return this.functions.sendMessage({
                text: text,
                chatId: chatId,
                replyMarkup: (_y = options.replyMarkup) !== null && _y !== void 0 ? _y : defaults === null || defaults === void 0 ? void 0 : defaults.replyMarkup,
                allowReply: (_z = options.allowReply) !== null && _z !== void 0 ? _z : defaults === null || defaults === void 0 ? void 0 : defaults.allowReply,
                replyToMessageId: messageId,
                notification: (_0 = options.notification) !== null && _0 !== void 0 ? _0 : defaults === null || defaults === void 0 ? void 0 : defaults.notification,
                content: (_1 = options.content) !== null && _1 !== void 0 ? _1 : defaults === null || defaults === void 0 ? void 0 : defaults.content,
                threadId: (_2 = options.threadId) !== null && _2 !== void 0 ? _2 : defaults === null || defaults === void 0 ? void 0 : defaults.threadId,
                parseMode: (_3 = options.parseMode) !== null && _3 !== void 0 ? _3 : defaults === null || defaults === void 0 ? void 0 : defaults.parseMode,
            });
        });
    }
    /**
     * Sends a message.
     * @param {SendOptions} options - The options for sending a message.
     * @param {Defaults} [defaults] - The default options for sending a message.
     * @returns {Promise<object | undefined>}
     */
    send(options, defaults) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        return __awaiter(this, void 0, void 0, function* () {
            let chatId;
            let messageId;
            let text = typeof options === "object" ? options.text : options;
            if (typeof options === "object" && typeof defaults === "object") {
                throw new errorcollection_1.ParameterError("default object should not have a text property");
            }
            else if (typeof options === "string" && (defaults === null || defaults === void 0 ? void 0 : defaults.text)) {
                throw new errorcollection_1.ParameterError("default object should not be used with a string message");
            }
            else if (typeof options === "string" && typeof defaults === "string") {
                throw new errorcollection_1.ParameterError("this code should not have two string parameters simultaneously.");
            }
            if ((_b = (_a = this.updates) === null || _a === void 0 ? void 0 : _a.callback_query) === null || _b === void 0 ? void 0 : _b.message) {
                chatId =
                    (options === null || options === void 0 ? void 0 : options.chatId) ||
                        (defaults === null || defaults === void 0 ? void 0 : defaults.chatId) ||
                        ((_d = (_c = this.updates.callback_query) === null || _c === void 0 ? void 0 : _c.chat) === null || _d === void 0 ? void 0 : _d.id);
            }
            else if ((_e = this.updates) === null || _e === void 0 ? void 0 : _e.chat) {
                chatId =
                    (options === null || options === void 0 ? void 0 : options.chatId) || (defaults === null || defaults === void 0 ? void 0 : defaults.chatId) || ((_f = this.updates.chat) === null || _f === void 0 ? void 0 : _f.id);
            }
            else {
                throw new errorcollection_1.ParameterError("ChatId is missing");
            }
            if (text === undefined) {
                throw new errorcollection_1.ParameterError("Text is missing");
            }
            return this.functions.sendMessage({
                text: text,
                chatId: chatId,
                replyMarkup: (_g = options === null || options === void 0 ? void 0 : options.replyMarkup) !== null && _g !== void 0 ? _g : defaults === null || defaults === void 0 ? void 0 : defaults.replyMarkup,
                allowReply: (_h = options === null || options === void 0 ? void 0 : options.allowReply) !== null && _h !== void 0 ? _h : defaults === null || defaults === void 0 ? void 0 : defaults.allowReply,
                notification: (_j = options === null || options === void 0 ? void 0 : options.notification) !== null && _j !== void 0 ? _j : defaults === null || defaults === void 0 ? void 0 : defaults.notification,
                content: (_k = options === null || options === void 0 ? void 0 : options.content) !== null && _k !== void 0 ? _k : defaults === null || defaults === void 0 ? void 0 : defaults.content,
                threadId: (_l = options === null || options === void 0 ? void 0 : options.threadId) !== null && _l !== void 0 ? _l : defaults === null || defaults === void 0 ? void 0 : defaults.threadId,
                parseMode: (_m = options === null || options === void 0 ? void 0 : options.parseMode) !== null && _m !== void 0 ? _m : defaults === null || defaults === void 0 ? void 0 : defaults.parseMode,
            });
        });
    }
    /**
     * Leaves a chat.
     * @param {number | string} [chatId] - The ID of the chat to leave.
     * @returns {Promise<object | undefined>}
     */
    leave(chatId) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function* () {
            let chat_id;
            if ((_a = this.updates) === null || _a === void 0 ? void 0 : _a.callback_query) {
                chat_id = (_e = (_d = (_c = (_b = this.updates) === null || _b === void 0 ? void 0 : _b.callback_query) === null || _c === void 0 ? void 0 : _c.message) === null || _d === void 0 ? void 0 : _d.chat) === null || _e === void 0 ? void 0 : _e.id;
            }
            else {
                chat_id = (_g = (_f = this.updates) === null || _f === void 0 ? void 0 : _f.chat) === null || _g === void 0 ? void 0 : _g.id;
            }
            return this.functions.leaveChat(chat_id);
        });
    }
    /**
     * Checks if the update contains a command.
     * @param {boolean} [checkAllEntities] - Whether to check all entities in the update.
     * @returns {boolean} - Indicates whether a command is found in the update.
     */
    isCommand(checkAllEntities) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        let commandFound = false;
        const allEntities = [
            (_a = this.updates.message) === null || _a === void 0 ? void 0 : _a.entities,
            (_b = this.updates.edited_message) === null || _b === void 0 ? void 0 : _b.entities,
            (_c = this.updates.pinned_message) === null || _c === void 0 ? void 0 : _c.entities,
            (_d = this.updates.channel_post) === null || _d === void 0 ? void 0 : _d.entities,
            (_f = (_e = this.updates.channel_post) === null || _e === void 0 ? void 0 : _e.pinned_message) === null || _f === void 0 ? void 0 : _f.entities,
            (_g = this.updates.pinned_message) === null || _g === void 0 ? void 0 : _g.entities,
            (_h = this.updates.message) === null || _h === void 0 ? void 0 : _h.caption_entities,
            (_j = this.updates.edited_message) === null || _j === void 0 ? void 0 : _j.caption_entities,
            (_k = this.updates.channel_post) === null || _k === void 0 ? void 0 : _k.caption_entities,
            (_m = (_l = this.updates.message) === null || _l === void 0 ? void 0 : _l.reply_to_message) === null || _m === void 0 ? void 0 : _m.entities,
            (_p = (_o = this.updates.message) === null || _o === void 0 ? void 0 : _o.reply_to_message) === null || _p === void 0 ? void 0 : _p.caption_entities,
        ];
        for (const entities of allEntities) {
            if (Array.isArray(entities)) {
                for (const entity of entities) {
                    if (entity.type === "bot_command") {
                        commandFound = true;
                        if (!checkAllEntities) {
                            return commandFound;
                        }
                    }
                }
            }
        }
        return commandFound;
    }
}
exports.UpdateProcessor = UpdateProcessor;
