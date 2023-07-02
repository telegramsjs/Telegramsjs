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
exports.CombinedClass = void 0;
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
class CombinedClass {
    constructor(bot, botInfo) {
        this.bot = bot;
        this.botInfo = botInfo;
    }
    get me() {
        var _a;
        return (_a = this.botInfo) === null || _a === void 0 ? void 0 : _a.username;
    }
    get message() {
        return this.updates.message;
    }
    get messageId() {
        return this.updates.message_id;
    }
    get editedMessage() {
        var _a;
        return (_a = this.updates) === null || _a === void 0 ? void 0 : _a.edited_message;
    }
    get inlineQuery() {
        var _a;
        return (_a = this.updates) === null || _a === void 0 ? void 0 : _a.inline_query;
    }
    get shippingQuery() {
        var _a;
        return (_a = this.updates) === null || _a === void 0 ? void 0 : _a.shipping_query;
    }
    get preCheckoutQuery() {
        var _a;
        return (_a = this.updates) === null || _a === void 0 ? void 0 : _a.pre_checkout_query;
    }
    get chosenInlineResult() {
        var _a;
        return (_a = this.updates) === null || _a === void 0 ? void 0 : _a.chosen_inline_result;
    }
    get channelPost() {
        var _a;
        return (_a = this.updates) === null || _a === void 0 ? void 0 : _a.channel_post;
    }
    get editedChannelPost() {
        var _a;
        return (_a = this.updates) === null || _a === void 0 ? void 0 : _a.edited_channel_post;
    }
    get callbackQuery() {
        var _a;
        return (_a = this.updates) === null || _a === void 0 ? void 0 : _a.callback_query;
    }
    get poll() {
        var _a;
        return (_a = this.updates) === null || _a === void 0 ? void 0 : _a.poll;
    }
    get pollAnswer() {
        var _a;
        return (_a = this.updates) === null || _a === void 0 ? void 0 : _a.poll_answer;
    }
    get myChatMember() {
        var _a;
        return (_a = this.updates) === null || _a === void 0 ? void 0 : _a.my_chat_member;
    }
    get chatMember() {
        var _a;
        return (_a = this.updates) === null || _a === void 0 ? void 0 : _a.chat_member;
    }
    get chatJoinRequest() {
        var _a;
        return (_a = this.updates) === null || _a === void 0 ? void 0 : _a.chat_join_request;
    }
    get chat() {
<<<<<<< HEAD
        var _a, _b, _c, _d;
        return (_d = ((_c = (_b = (_a = this.chatMember) !== null && _a !== void 0 ? _a : this.myChatMember) !== null && _b !== void 0 ? _b : this.chatJoinRequest) !== null && _c !== void 0 ? _c : this.updates)) === null || _d === void 0 ? void 0 : _d.chat;
=======
        var _a, _b, _c, _d, _e;
        return (_e = ((_d = (_c = (_b = (_a = this.chatMember) !== null && _a !== void 0 ? _a : this.myChatMember) !== null && _b !== void 0 ? _b : this.chatJoinRequest) !== null && _c !== void 0 ? _c : this.message) !== null && _d !== void 0 ? _d : this.updates)) === null || _e === void 0 ? void 0 : _e.chat;
>>>>>>> 38a3db8 (add @grammyjs/types and action. beginning)
    }
    get senderChat() {
        var _a;
        return (_a = this.updates) === null || _a === void 0 ? void 0 : _a.sender_chat;
    }
    reply(text, args) {
        return this.bot.sendMessage(Object.assign({ text: text, chatId: this.chat.id, replyToMessageId: this.messageId }, args));
    }
    send(text, args) {
        return this.bot.sendMessage(Object.assign({ text: text, chatId: this.chat.id }, args));
    }
    leave() {
        return this.bot.leaveChat(this.chat.id);
    }
    processUpdate() {
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
                                    send: (text, args) => this.send(text, args),
                                    leave: () => this.leave(),
                                });
                                const message = Object.assign(Object.assign({}, updateProperty), { chat, client: this, reply: (text, args) => this.reply(text, args) });
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
}
exports.CombinedClass = CombinedClass;
