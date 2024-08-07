export class ChatInviteLink extends Base {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").ChatInviteLink} data - Data about the represents an invite link for a chat
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").ChatInviteLink);
    /**
     * The invite link. If the link was created by another chat administrator, then the second part of the link will be replaced with "...".
     * @type {string}
     */
    link: string;
    /**
     * Creator of the link
     * @type {User}
     */
    creator: User;
    /**
     * True, if users joining the chat via the link need to be approved by chat administrators
     * @type {boolean}
     */
    createsRequest: boolean;
    /**
     * True, if the link is primary
     * @type {boolean}
     */
    primary: boolean;
    /**
     * True, if the link is revoked
     * @type {boolean}
     */
    revoked: boolean;
    /**
     * Invite link name
     * @type {string | undefined}
     */
    name: string | undefined;
    /**
     * Point in time (Unix timestamp) when the link will expire or has been expired
     * @type {number}
     */
    expiredTimestamp: number;
    /**
     * The maximum number of users that can be members of the chat simultaneously after joining the chat via this invite link; 1-99999
     * @type {number | undefined}
     */
    limit: number | undefined;
    /**
     * Number of pending join requests created using this link
     * @type {number | undefined}
     */
    requestsCount: number | undefined;
    /**
     * Point in time when the link will expire or has been expired
     * @type {Date}
     */
    get expiredAt(): Date;
}
import { Base } from "../Base";
import { User } from "../misc/User";
//# sourceMappingURL=ChatInviteLink.d.ts.map