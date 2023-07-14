"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Markup = void 0;
class Markup {
    constructor() {
        this.reply_markup = {};
    }
    setText(text) {
        this.reply_markup.text = text;
        return this;
    }
    selective(value = true) {
        this.reply_markup.selective = value;
        return this;
    }
    placeholder(placeholder) {
        this.reply_markup.input_field_placeholder = placeholder;
        return this;
    }
    resize(value = true) {
        this.reply_markup.resize_keyboard = value;
        return this;
    }
    oneTime(value = true) {
        this.reply_markup.one_time_keyboard = value;
        return this;
    }
    removeKeyboard() {
        this.reply_markup.remove_keyboard = true;
        return this;
    }
    forceReply() {
        this.reply_markup.force_reply = true;
        return this;
    }
    keyboard(buttons, options) {
        const keyboard = this.buildKeyboard(buttons, Object.assign({ columns: 1 }, options));
        this.reply_markup.keyboard = keyboard;
        return this;
    }
    inlineKeyboard(buttons, options) {
        const inlineKeyboard = this.buildKeyboard(buttons, Object.assign({ columns: buttons.length }, options));
        this.reply_markup.inline_keyboard = inlineKeyboard;
        return this;
    }
    buildKeyboard(buttons, options) {
        const result = [];
        if (!Array.isArray(buttons)) {
            return result;
        }
        if (this.is2D(buttons)) {
            return buttons.map((row) => Array.isArray(row)
                ? row.filter((button) => !button.hide)
                : [row]);
        }
        const wrapFn = options.wrap !== undefined
            ? options.wrap
            : (_btn, _index, currentRow) => currentRow.length >= options.columns;
        let currentRow = [];
        let index = 0;
        for (const btn of buttons.filter((button) => !button.hide)) {
            if (wrapFn(btn, index, currentRow) && currentRow.length > 0) {
                result.push(currentRow);
                currentRow = [];
            }
            currentRow.push(btn);
            index++;
        }
        if (currentRow.length > 0) {
            result.push(currentRow);
        }
        return result;
    }
    is2D(array) {
        if (!Array.isArray(array)) {
            return false;
        }
        for (let i = 0; i < array.length; i++) {
            if (!Array.isArray(array[i])) {
                return false;
            }
        }
        return true;
    }
    static text(text) {
        return {
            text,
        };
    }
    static contactRequest(text) {
        return {
            text,
            request_contact: true,
        };
    }
    static locationRequest(text) {
        return {
            text,
            request_location: true,
        };
    }
    static pollRequest(text, type) {
        return {
            text,
            request_poll: {
                type,
            },
        };
    }
    static userRequest(text, request_id, user_is_premium) {
        return {
            text,
            request_user: {
                request_id,
                user_is_premium,
            },
        };
    }
    static botRequest(text, request_id) {
        return {
            text,
            request_user: {
                request_id,
                user_is_bot: true,
            },
        };
    }
    static groupRequest(text, request_id, args) {
        return {
            text,
            request_chat: Object.assign({ request_id, chat_is_channel: false }, args),
        };
    }
    static channelRequest(text, request_id, args) {
        return {
            text,
            request_chat: Object.assign({ request_id, chat_is_channel: true }, args),
        };
    }
    static url(text, url) {
        return {
            text,
            url,
        };
    }
    static callback(text, data) {
        return {
            text,
            callback_data: data,
        };
    }
    static switchToChat(text, value) {
        return {
            text,
            switch_inline_query: value,
        };
    }
    static switchToCurrentChat(text, value) {
        return {
            text,
            switch_inline_query_current_chat: value,
        };
    }
    static game(text) {
        return {
            text,
            callback_game: {},
        };
    }
    static pay(text) {
        return {
            text,
            pay: true,
        };
    }
    static login(text, url, opts = {}) {
        return {
            text,
            login_url: Object.assign(Object.assign({}, opts), { url }),
        };
    }
    static webApp(text, url) {
        return {
            text,
            web_app: {
                url,
            },
        };
    }
    getReplyMarkup() {
        return JSON.stringify(this.reply_markup);
    }
    static generateReplyMarkup(markups, elevation = 5, type = "inline_keyboard") {
        const replyMarkup = new Markup();
        const buttons = markups.map((markup) => markup.getReplyMarkup());
        const keyboard = [];
        let row = [];
        for (const button of buttons) {
            row.push(button);
            if (row.length >= elevation) {
                keyboard.push(row);
                row = [];
            }
        }
        if (row.length > 0) {
            keyboard.push(row);
        }
        if (elevation === 1) {
            replyMarkup.reply_markup = { [type]: keyboard.map((row) => [row]) };
        }
        else {
            replyMarkup.reply_markup = { [type]: keyboard };
        }
        return replyMarkup.reply_markup;
    }
}
exports.Markup = Markup;
