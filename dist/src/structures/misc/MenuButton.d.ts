export class MenuButton {
    /**
     * @param {import("@telegram.ts/types").MenuButton} data - Data about the interface describes the bot's menu button in a private chat
     */
    constructor(data: import("@telegram.ts/types").MenuButton);
    /** The text on the button */
    text: string | undefined;
    /** Description of the Web App that will be launched when the user presses the button. The Web App will be able to send an arbitrary message on behalf of the user using the method answerWebAppQuery. Alternatively, a t.me link to a Web App can be specified in the object instead of the Web App's URL, in which case the Web App will be opened as if the user pressed the link */
    webApp: {
        url: string;
    } | undefined;
    /**
     * @return {this is this & { text?: undefined; webApp?: undefined }}
     */
    isDefaultAndCmd(): this is this & {
        text?: undefined;
        webApp?: undefined;
    };
    /**
     * @return {this is this & { text: string; webApp: import("@telegram.ts/types").WebAppInfo }}
     */
    isWebApp(): this is this & {
        text: string;
        webApp: import("@telegram.ts/types").WebAppInfo;
    };
}
//# sourceMappingURL=MenuButton.d.ts.map