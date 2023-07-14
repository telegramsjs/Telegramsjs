interface ReplyMarkup {
    text?: string;
    selective?: boolean;
    input_field_placeholder?: string;
    resize_keyboard?: boolean;
    one_time_keyboard?: boolean;
    remove_keyboard?: boolean;
    force_reply?: boolean;
    keyboard?: Button[][];
    inline_keyboard?: Button[][];
}
interface Button {
    hide?: boolean;
    text?: string;
    request_contact?: boolean;
    request_location?: boolean;
    request_poll?: {
        type: string;
    };
    request_user?: {
        request_id: string;
        user_is_premium?: boolean;
        user_is_bot?: boolean;
    };
    request_chat?: {
        request_id: string;
        chat_is_channel: boolean;
    };
    url?: string;
    callback_data?: string;
    switch_inline_query?: string;
    switch_inline_query_current_chat?: string;
    callback_game?: {};
    pay?: boolean;
    login_url?: {
        url: string;
    };
    web_app?: {
        url: string;
    };
}
export declare class Markup {
    private reply_markup;
    constructor();
    setText(text: string): this;
    selective(value?: boolean): this;
    placeholder(placeholder: string): this;
    resize(value?: boolean): this;
    oneTime(value?: boolean): this;
    removeKeyboard(): this;
    forceReply(): this;
    keyboard(buttons: Button[], options: any): this;
    inlineKeyboard(buttons: Button[], options: any): this;
    private buildKeyboard;
    private is2D;
    static text(text: string): Button;
    static contactRequest(text: string): Button;
    static locationRequest(text: string): Button;
    static pollRequest(text: string, type: string): Button;
    static userRequest(text: string, request_id: string, user_is_premium: boolean): Button;
    static botRequest(text: string, request_id: string): Button;
    static groupRequest(text: string, request_id: string, args: any): Button;
    static channelRequest(text: string, request_id: string, args: any): Button;
    static url(text: string, url: string): Button;
    static callback(text: string, data: string): Button;
    static switchToChat(text: string, value: string): Button;
    static switchToCurrentChat(text: string, value: string): Button;
    static game(text: string): Button;
    static pay(text: string): Button;
    static login(text: string, url: string, opts?: {}): Button;
    static webApp(text: string, url: string): Button;
    getReplyMarkup(): string;
    static generateReplyMarkup(markups: Markup[], elevation?: number, type?: "keyboard" | "inline_keyboard"): ReplyMarkup;
}
export {};
//# sourceMappingURL=Markup.d.ts.map