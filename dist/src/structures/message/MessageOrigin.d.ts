export class MessageOrigin extends Base {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").MessageOrigin} data - Data about the describes the origin of a message
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").MessageOrigin);
    /** Date the message was sent originally in Unix time */
    createdTimestamp: number;
    _patch(data: any): any;
    /**
     * Unique message identifier inside the chat
     * @type {number | undefined}
     */
    id: number | undefined;
    /**
     * User that sent the message originally
     * @type {User | undefined}
     */
    senderUser: User | undefined;
    /**
     * Name of the user that sent the message originally
     * @type {string | undefined}
     */
    username: string | undefined;
    /**
     * Chat that sent the message originally
     * @type {Chat | undefined}
     */
    senderChat: Chat | undefined;
    /**
     * Channel chat to which the message was originally sent
     * @type {Chat | undefined}
     */
    chat: Chat | undefined;
    /**
     * Signature of the original post author
     * @type {string | undefined}
     */
    authorSignature: string | undefined;
    /**
     * @return {this is this & { senderUser: User }}
     */
    isUser(): this is this & {
        senderUser: User;
    };
    /**
     * @return {this is this & { username: string }}
     */
    isHiddenUser(): this is this & {
        username: string;
    };
    /**
     * @return {this is this & { senderChat: Chat; authorSignature?: string }}
     */
    isChat(): this is this & {
        senderChat: Chat;
        authorSignature?: string;
    };
    /**
     * @return {this is this & { id: number; chat: Chat; authorSignature?: string }}
     */
    isChennel(): this is this & {
        id: number;
        chat: Chat;
        authorSignature?: string;
    };
    /**
     * Date the message was sent originally
     * @type {Date}
     */
    get createdAt(): Date;
}
import { Base } from "../Base";
import { User } from "../misc/User";
import { Chat } from "../chat/Chat";
//# sourceMappingURL=MessageOrigin.d.ts.map