import type { InlineKeyboardButton, SwitchInlineQueryChosenChat, LoginUrl } from "../../client/interfaces/Markup";
/**
 * Represents an inline keyboard for Telegram bots.
 */
declare class InlineKeyboard {
    readonly inlineKeyboard: InlineKeyboardButton[][];
    /**
     * Creates an instance of InlineKeyboard.
     * @param inlineKeyboard - A 2D array of inline keyboard buttons.
     */
    constructor(inlineKeyboard?: InlineKeyboardButton[][]);
    /**
     * Adds buttons to the last row of the inline keyboard.
     * @param buttons - The buttons to add.
     * @returns The current instance for chaining.
     */
    add(...buttons: InlineKeyboardButton[]): this;
    /**
     * Adds a new row of buttons to the inline keyboard.
     * @param buttons - The buttons to add.
     * @returns The current instance for chaining.
     */
    row(...buttons: InlineKeyboardButton[]): this;
    /**
     * Adds a URL button to the inline keyboard.
     * @param text - The button text.
     * @param url - The URL to be opened when the button is pressed.
     * @returns The current instance for chaining.
     */
    url(text: string, url: string): this;
    /**
     * Creates a URL button.
     * @param text - The button text.
     * @param url - The URL to be opened when the button is pressed.
     * @returns The created URL button.
     */
    static url(text: string, url: string): InlineKeyboardButton.UrlButton;
    /**
     * Adds a callback button to the inline keyboard.
     * @param text - The button text.
     * @param data - The callback data.
     * @returns The current instance for chaining.
     */
    text(text: string, data?: string): this;
    /**
     * Creates a callback button.
     * @param text - The button text.
     * @param data - The callback data.
     * @returns The created callback button.
     */
    static text(text: string, data?: string): InlineKeyboardButton.CallbackButton;
    /**
     * Adds a WebApp button to the inline keyboard.
     * @param text - The button text.
     * @param url - The URL to the WebApp.
     * @returns The current instance for chaining.
     */
    webApp(text: string, url: string): this;
    /**
     * Creates a WebApp button.
     * @param text - The button text.
     * @param url - The URL to the WebApp.
     * @returns The created WebApp button.
     */
    static webApp(text: string, url: string): InlineKeyboardButton.WebAppButton;
    /**
     * Adds a login button to the inline keyboard.
     * @param text - The button text.
     * @param loginUrl - The login URL or LoginUrl object.
     * @returns The current instance for chaining.
     */
    login(text: string, loginUrl: string | LoginUrl): this;
    /**
     * Creates a login button.
     * @param text - The button text.
     * @param loginUrl - The login URL or LoginUrl object.
     * @returns The created login button.
     */
    static login(text: string, loginUrl: string | LoginUrl): InlineKeyboardButton.LoginButton;
    /**
     * Adds a switch inline button to the inline keyboard.
     * @param text - The button text.
     * @param query - The inline query to switch to.
     * @returns The current instance for chaining.
     */
    switchInline(text: string, query?: string): this;
    /**
     * Creates a switch inline button.
     * @param text - The button text.
     * @param query - The inline query to switch to.
     * @returns The created switch inline button.
     */
    static switchInline(text: string, query?: string): InlineKeyboardButton.SwitchInlineButton;
    /**
     * Adds a switch inline current chat button to the inline keyboard.
     * @param text - The button text.
     * @param query - The inline query to switch to in the current chat.
     * @returns The current instance for chaining.
     */
    switchInlineCurrent(text: string, query?: string): this;
    /**
     * Creates a switch inline current chat button.
     * @param text - The button text.
     * @param query - The inline query to switch to in the current chat.
     * @returns The created switch inline current chat button.
     */
    static switchInlineCurrent(text: string, query?: string): InlineKeyboardButton.SwitchInlineCurrentChatButton;
    /**
     * Adds a switch inline chosen chat button to the inline keyboard.
     * @param text - The button text.
     * @param query - The inline query to switch to in the chosen chat.
     * @returns The current instance for chaining.
     */
    switchInlineChosen(text: string, query?: SwitchInlineQueryChosenChat): this;
    /**
     * Creates a switch inline chosen chat button.
     * @param text - The button text.
     * @param query - The inline query to switch to in the chosen chat.
     * @returns The created switch inline chosen chat button.
     */
    static switchInlineChosen(text: string, query?: SwitchInlineQueryChosenChat): InlineKeyboardButton.SwitchInlineChosenChatButton;
    /**
     * Adds a game button to the inline keyboard.
     * @param text - The button text.
     * @returns The current instance for chaining.
     */
    game(text: string): this;
    /**
     * Creates a game button.
     * @param text - The button text.
     * @returns The created game button.
     */
    static game(text: string): InlineKeyboardButton.GameButton;
    /**
     * Adds a pay button to the inline keyboard.
     * @param text - The button text.
     * @returns The current instance for chaining.
     */
    pay(text: string): this;
    /**
     * Creates a pay button.
     * @param text - The button text.
     * @returns The created pay button.
     */
    static pay(text: string): InlineKeyboardButton.PayButton;
    /**
     * Creates a deep copy of the current InlineKeyboard instance.
     * @returns A new instance of InlineKeyboard with the same buttons.
     */
    clone(): InlineKeyboard;
    /**
     * Creates an InlineKeyboard instance from another instance or a 2D array of buttons.
     * @param source - The source InlineKeyboard instance or 2D array of buttons.
     * @returns A new instance of InlineKeyboard.
     */
    static from(source: InlineKeyboard | InlineKeyboardButton[][]): InlineKeyboard;
}
export { InlineKeyboard };
//# sourceMappingURL=InlineKeyboard.d.ts.map