export class ChatJoinRequest extends Base {
    /**
     * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").ChatJoinRequest} data - Data about the represents a join request sent to a chat
     */
    constructor(client: import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient, data: import("@telegram.ts/types").ChatJoinRequest);
    /** Identifier of a private chat with the user who sent the join request. The bot can use this identifier for 5 minutes to send messages until the join request is processed, assuming no other administrator contacted the user. */
    userChatId: number;
    /** Chat to which the request was sent */
    chat: Chat;
    /** User that sent the join request */
    author: User;
    /** Bio of the user */
    bio: string | undefined;
    /** Chat invite link that was used by the user to send the join request */
    inviteLink: ChatInviteLink | undefined;
    /** Date the request was sent in Unix time */
    createdTimestamp: number;
    /**
     * Use this method to approve a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right.
     * @return {Promise<true>} Returns True on success.
     */
    approveJoinRequest(): Promise<true>;
    /**
     * Use this method to decline a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right.
     * @return {Promise<true>} - Returns True on success.
     */
    declineJoinRequest(): Promise<true>;
    /**
     * Date the request was sent
     * @type {Date}
     */
    get createdAt(): Date;
}
import { Base } from "./Base";
import { Chat } from "./chat/Chat";
import { User } from "./misc/User";
import { ChatInviteLink } from "./chat/ChatInviteLink";
//# sourceMappingURL=ChatJoinRequest.d.ts.map