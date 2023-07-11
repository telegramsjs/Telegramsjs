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
    static text(text: string, hide?: boolean): Button;
    static contactRequest(text: string, hide?: boolean): Button;
    static locationRequest(text: string, hide?: boolean): Button;
    static pollRequest(text: string, type: string, hide?: boolean): Button;
    static userRequest(text: string, request_id: string, user_is_premium: boolean, hide?: boolean): Button;
    static botRequest(text: string, request_id: string, hide?: boolean): Button;
    static groupRequest(text: string, request_id: string, args: any, hide?: boolean): Button;
    static channelRequest(text: string, request_id: string, args: any, hide?: boolean): Button;
    static url(text: string, url: string, hide?: boolean): Button;
    static callback(text: string, data: string, hide?: boolean): Button;
    static switchToChat(text: string, value: string, hide?: boolean): Button;
    static switchToCurrentChat(text: string, value: string, hide?: boolean): Button;
    static game(text: string, hide?: boolean): Button;
    static pay(text: string, hide?: boolean): Button;
    static login(text: string, url: string, opts?: {}, hide?: boolean): Button;
    static webApp(text: string, url: string, hide?: boolean): Button;
    getReplyMarkup(): string;
    static generateReplyMarkup(markups: Markup[], elevation?: number, type?: "keyboard" | "inline_keyboard"): ReplyMarkup;
}
export {};
//# sourceMappingURL=Markup.d.ts.map