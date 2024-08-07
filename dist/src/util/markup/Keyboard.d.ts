import type { KeyboardButton, KeyboardButtonPollType, KeyboardButtonRequestChat, KeyboardButtonRequestUsers } from "../../client/interfaces/Markup";
/**
 * Represents a custom keyboard for Telegram bots.
 */
declare class Keyboard {
    readonly keyboard: KeyboardButton[][];
    /**
     * Indicates whether the keyboard is persistent.
     */
    isPersistent: boolean;
    /**
     * Indicates whether the keyboard is selective.
     */
    selective: boolean;
    /**
     * Indicates whether the keyboard is a one-time keyboard.
     */
    oneTimeKeyboard: boolean;
    /**
     * Indicates whether the keyboard should be resized.
     */
    resizeKeyboard: boolean;
    /**
     * The placeholder text for the input field.
     */
    inputFieldPlaceholder?: string;
    /**
     * Creates an instance of Keyboard.
     * @param keyboard - A 2D array of keyboard buttons.
     */
    constructor(keyboard?: KeyboardButton[][]);
    /**
     * Adds buttons to the last row of the keyboard.
     * @param buttons - The buttons to add.
     * @returns The current instance for chaining.
     */
    add(...buttons: KeyboardButton[]): this;
    /**
     * Adds a new row of buttons to the keyboard.
     * @param buttons - The buttons to add.
     * @returns The current instance for chaining.
     */
    row(...buttons: KeyboardButton[]): this;
    /**
     * Adds a text button to the keyboard.
     * @param text - The button text.
     * @returns The current instance for chaining.
     */
    text(text: string): this;
    /**
     * Creates a text button.
     * @param text - The button text.
     * @returns The created text button.
     */
    static text(text: string): KeyboardButton.CommonButton;
    /**
     * Adds a request users button to the keyboard.
     * @param text - The button text.
     * @param requestId - The request ID.
     * @param options - Additional options for the button.
     * @returns The current instance for chaining.
     */
    requestUsers(text: string, requestId: number, options?: Omit<KeyboardButtonRequestUsers, "requestId">): this;
    /**
     * Creates a request users button.
     * @param text - The button text.
     * @param requestId - The request ID.
     * @param options - Additional options for the button.
     * @returns The created request users button.
     */
    static requestUsers(text: string, requestId: number, options?: Omit<KeyboardButtonRequestUsers, "requestId">): KeyboardButton.RequestUsersButton;
    /**
     * Adds a request chat button to the keyboard.
     * @param text - The button text.
     * @param requestId - The request ID.
     * @param options - Additional options for the button.
     * @returns The current instance for chaining.
     */
    requestChat(text: string, requestId: number, options?: Omit<KeyboardButtonRequestChat, "requestId">): this;
    /**
     * Creates a request chat button.
     * @param text - The button text.
     * @param requestId - The request ID.
     * @param options - Additional options for the button.
     * @returns The created request chat button.
     */
    static requestChat(text: string, requestId: number, options?: Omit<KeyboardButtonRequestChat, "requestId">): KeyboardButton.RequestChatButton;
    /**
     * Adds a request contact button to the keyboard.
     * @param text - The button text.
     * @returns The current instance for chaining.
     */
    requestContact(text: string): this;
    /**
     * Creates a request contact button.
     * @param text - The button text.
     * @returns The created request contact button.
     */
    static requestContact(text: string): KeyboardButton.RequestContactButton;
    /**
     * Adds a request location button to the keyboard.
     * @param text - The button text.
     * @returns The current instance for chaining.
     */
    requestLocation(text: string): this;
    /**
     * Creates a request location button.
     * @param text - The button text.
     * @returns The created request location button.
     */
    static requestLocation(text: string): KeyboardButton.RequestLocationButton;
    /**
     * Adds a request poll button to the keyboard.
     * @param text - The button text.
     * @param type - The type of the poll button.
     * @returns The current instance for chaining.
     */
    requestPoll(text: string, type?: KeyboardButtonPollType["type"]): this;
    /**
     * Creates a request poll button.
     * @param text - The button text.
     * @param type - The type of the poll button.
     * @returns The created request poll button.
     */
    static requestPoll(text: string, type?: KeyboardButtonPollType["type"]): KeyboardButton.RequestPollButton;
    /**
     * Adds a web app button to the keyboard.
     * @param text - The button text.
     * @param url - The URL of the web app.
     * @returns The current instance for chaining.
     */
    webApp(text: string, url: string): this;
    /**
     * Creates a web app button.
     * @param text - The button text.
     * @param url - The URL of the web app.
     * @returns The created web app button.
     */
    static webApp(text: string, url: string): KeyboardButton.WebAppButton;
    /**
     * Sets the keyboard as persistent or not.
     * @param isEnabled - Indicates whether the keyboard should be persistent.
     * @returns The current instance for chaining.
     */
    persistent(isEnabled?: boolean): this;
    /**
     * Sets the keyboard as selective or not.
     * @param isEnabled - Indicates whether the keyboard should be selective.
     * @returns The current instance for chaining.
     */
    selected(isEnabled?: boolean): this;
    /**
     * Sets the keyboard as a one-time keyboard or not.
     * @param isEnabled - Indicates whether the keyboard should be a one-time keyboard.
     * @returns The current instance for chaining.
     */
    oneTime(isEnabled?: boolean): this;
    /**
     * Sets the keyboard to be resized or not.
     * @param isEnabled - Indicates whether the keyboard should be resized.
     * @returns The current instance for chaining.
     */
    resized(isEnabled?: boolean): this;
    /**
     * Sets the placeholder text for the input field.
     * @param value - The placeholder text.
     * @returns The current instance for chaining.
     */
    placeholder(value: string): this;
    /**
     * Creates a deep copy of the current Keyboard instance.
     * @returns A new instance of Keyboard with the same buttons and properties.
     */
    clone(keyboard?: KeyboardButton[][]): Keyboard;
    /**
     * Builds the keyboard structure.
     * @returns The built keyboard structure.
     */
    build(): KeyboardButton[][];
    /**
     * Creates a Keyboard instance from another instance or a 2D array of buttons.
     * @param source - The source Keyboard instance or 2D array of buttons.
     * @returns A new instance of Keyboard.
     */
    static from(source: (string | KeyboardButton)[][] | Keyboard): Keyboard;
}
export { Keyboard };
//# sourceMappingURL=Keyboard.d.ts.map