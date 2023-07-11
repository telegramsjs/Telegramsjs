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
    static text(text, hide = false) {
        return {
            text,
            hide,
        };
    }
    static contactRequest(text, hide = false) {
        return {
            text,
            request_contact: true,
            hide,
        };
    }
    static locationRequest(text, hide = false) {
        return {
            text,
            request_location: true,
            hide,
        };
    }
    static pollRequest(text, type, hide = false) {
        return {
            text,
            request_poll: {
                type,
            },
            hide,
        };
    }
    static userRequest(text, request_id, user_is_premium, hide = false) {
        return {
            text,
            request_user: {
                request_id,
                user_is_premium,
            },
            hide,
        };
    }
    static botRequest(text, request_id, hide = false) {
        return {
            text,
            request_user: {
                request_id,
                user_is_bot: true,
            },
            hide,
        };
    }
    static groupRequest(text, request_id, args, hide = false) {
        return {
            text,
            request_chat: Object.assign({ request_id, chat_is_channel: false }, args),
            hide,
        };
    }
    static channelRequest(text, request_id, args, hide = false) {
        return {
            text,
            request_chat: Object.assign({ request_id, chat_is_channel: true }, args),
            hide,
        };
    }
    static url(text, url, hide = false) {
        return {
            text,
            url,
            hide,
        };
    }
    static callback(text, data, hide = false) {
        return {
            text,
            callback_data: data,
            hide,
        };
    }
    static switchToChat(text, value, hide = false) {
        return {
            text,
            switch_inline_query: value,
            hide,
        };
    }
    static switchToCurrentChat(text, value, hide = false) {
        return {
            text,
            switch_inline_query_current_chat: value,
            hide,
        };
    }
    static game(text, hide = false) {
        return {
            text,
            callback_game: {},
            hide,
        };
    }
    static pay(text, hide = false) {
        return {
            text,
            pay: true,
            hide,
        };
    }
    static login(text, url, opts = {}, hide = false) {
        return {
            text,
            login_url: Object.assign(Object.assign({}, opts), { url }),
            hide,
        };
    }
    static webApp(text, url, hide = false) {
        return {
            text,
            web_app: {
                url,
            },
            hide,
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
