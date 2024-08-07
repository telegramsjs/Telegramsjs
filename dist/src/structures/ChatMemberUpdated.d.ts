export class ChatMemberUpdated extends Base {
    /**
     * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").ChatMemberUpdated} data - Data about the represents changes in the status of a chat member
     */
    constructor(client: import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient, data: import("@telegram.ts/types").ChatMemberUpdated);
    /** Chat the user belongs to */
    chat: Chat;
    /** Performer of the action, which resulted in the change */
    author: User;
    /** Date the change was done in Unix time */
    createdTimestamp: number;
    /** Previous information about the chat member */
    oldMember: ChatMember;
    /** New information about the chat member */
    newMember: ChatMember;
    /** Chat invite link, which was used by the user to join the chat; for joining by invite link events only */
    inviteLink: ChatInviteLink | undefined;
    /** True, if the user joined the chat after sending a direct join request without using an invite link without using an invite link and being approved by an administrator */
    viaJoinRequest: boolean | undefined;
    /** True, if the user joined the chat via a chat folder invite link */
    viaInviteLink: boolean | undefined;
    /**
     * Date the change was done
     * @type {Date}
     */
    get createdAt(): Date;
}
import { Base } from "./Base";
import { Chat } from "./chat/Chat";
import { User } from "./misc/User";
import { ChatMember } from "./chat/ChatMember";
import { ChatInviteLink } from "./chat/ChatInviteLink";
//# sourceMappingURL=ChatMemberUpdated.d.ts.map