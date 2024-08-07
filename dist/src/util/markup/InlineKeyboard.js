"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InlineKeyboard = void 0;
/**
 * Represents an inline keyboard for Telegram bots.
 */
class InlineKeyboard {
    /**
     * Creates an instance of InlineKeyboard.
     * @param inlineKeyboard - A 2D array of inline keyboard buttons.
     */
    constructor(inlineKeyboard = [[]]) {
        Object.defineProperty(this, "inlineKeyboard", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: inlineKeyboard
        });
    }
    /**
     * Adds buttons to the last row of the inline keyboard.
     * @param buttons - The buttons to add.
     * @returns The current instance for chaining.
     */
    add(...buttons) {
        var _a;
        (_a = this.inlineKeyboard[this.inlineKeyboard.length - 1]) === null || _a === void 0 ? void 0 : _a.push(...buttons);
        return this;
    }
    /**
     * Adds a new row of buttons to the inline keyboard.
     * @param buttons - The buttons to add.
     * @returns The current instance for chaining.
     */
    row(...buttons) {
        this.inlineKeyboard.push(buttons);
        return this;
    }
    /**
     * Adds a URL button to the inline keyboard.
     * @param text - The button text.
     * @param url - The URL to be opened when the button is pressed.
     * @returns The current instance for chaining.
     */
    url(text, url) {
        return this.add(InlineKeyboard.url(text, url));
    }
    /**
     * Creates a URL button.
     * @param text - The button text.
     * @param url - The URL to be opened when the button is pressed.
     * @returns The created URL button.
     */
    static url(text, url) {
        return { text, url };
    }
    /**
     * Adds a callback button to the inline keyboard.
     * @param text - The button text.
     * @param data - The callback data.
     * @returns The current instance for chaining.
     */
    text(text, data = text) {
        return this.add(InlineKeyboard.text(text, data));
    }
    /**
     * Creates a callback button.
     * @param text - The button text.
     * @param data - The callback data.
     * @returns The created callback button.
     */
    static text(text, data = text) {
        return { text, callbackData: data };
    }
    /**
     * Adds a WebApp button to the inline keyboard.
     * @param text - The button text.
     * @param url - The URL to the WebApp.
     * @returns The current instance for chaining.
     */
    webApp(text, url) {
        return this.add(InlineKeyboard.webApp(text, url));
    }
    /**
     * Creates a WebApp button.
     * @param text - The button text.
     * @param url - The URL to the WebApp.
     * @returns The created WebApp button.
     */
    static webApp(text, url) {
        return { text, webApp: { url } };
    }
    /**
     * Adds a login button to the inline keyboard.
     * @param text - The button text.
     * @param loginUrl - The login URL or LoginUrl object.
     * @returns The current instance for chaining.
     */
    login(text, loginUrl) {
        return this.add(InlineKeyboard.login(text, loginUrl));
    }
    /**
     * Creates a login button.
     * @param text - The button text.
     * @param loginUrl - The login URL or LoginUrl object.
     * @returns The created login button.
     */
    static login(text, loginUrl) {
        return {
            text,
            loginUrl: typeof loginUrl === "string" ? { url: loginUrl } : loginUrl,
        };
    }
    /**
     * Adds a switch inline button to the inline keyboard.
     * @param text - The button text.
     * @param query - The inline query to switch to.
     * @returns The current instance for chaining.
     */
    switchInline(text, query = "") {
        return this.add(InlineKeyboard.switchInline(text, query));
    }
    /**
     * Creates a switch inline button.
     * @param text - The button text.
     * @param query - The inline query to switch to.
     * @returns The created switch inline button.
     */
    static switchInline(text, query = "") {
        return { text, switchInlineQuery: query };
    }
    /**
     * Adds a switch inline current chat button to the inline keyboard.
     * @param text - The button text.
     * @param query - The inline query to switch to in the current chat.
     * @returns The current instance for chaining.
     */
    switchInlineCurrent(text, query = "") {
        return this.add(InlineKeyboard.switchInlineCurrent(text, query));
    }
    /**
     * Creates a switch inline current chat button.
     * @param text - The button text.
     * @param query - The inline query to switch to in the current chat.
     * @returns The created switch inline current chat button.
     */
    static switchInlineCurrent(text, query = "") {
        return { text, switchInlineQueryCurrentChat: query };
    }
    /**
     * Adds a switch inline chosen chat button to the inline keyboard.
     * @param text - The button text.
     * @param query - The inline query to switch to in the chosen chat.
     * @returns The current instance for chaining.
     */
    switchInlineChosen(text, query = {}) {
        return this.add(InlineKeyboard.switchInlineChosen(text, query));
    }
    /**
     * Creates a switch inline chosen chat button.
     * @param text - The button text.
     * @param query - The inline query to switch to in the chosen chat.
     * @returns The created switch inline chosen chat button.
     */
    static switchInlineChosen(text, query = {}) {
        return { text, switchInlineQueryChosenChat: query };
    }
    /**
     * Adds a game button to the inline keyboard.
     * @param text - The button text.
     * @returns The current instance for chaining.
     */
    game(text) {
        return this.add(InlineKeyboard.game(text));
    }
    /**
     * Creates a game button.
     * @param text - The button text.
     * @returns The created game button.
     */
    static game(text) {
        return { text, callbackGame: {} };
    }
    /**
     * Adds a pay button to the inline keyboard.
     * @param text - The button text.
     * @returns The current instance for chaining.
     */
    pay(text) {
        return this.add(InlineKeyboard.pay(text));
    }
    /**
     * Creates a pay button.
     * @param text - The button text.
     * @returns The created pay button.
     */
    static pay(text) {
        return { text, pay: true };
    }
    /**
     * Creates a deep copy of the current InlineKeyboard instance.
     * @returns A new instance of InlineKeyboard with the same buttons.
     */
    clone() {
        return new InlineKeyboard(this.inlineKeyboard.map((row) => row.slice()));
    }
    /**
     * Creates an InlineKeyboard instance from another instance or a 2D array of buttons.
     * @param source - The source InlineKeyboard instance or 2D array of buttons.
     * @returns A new instance of InlineKeyboard.
     */
    static from(source) {
        if (source instanceof InlineKeyboard)
            return source.clone();
        return new InlineKeyboard(source.map((row) => row.slice()));
    }
}
exports.InlineKeyboard = InlineKeyboard;
//# sourceMappingURL=InlineKeyboard.js.map