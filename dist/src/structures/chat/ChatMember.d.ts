export type MethodParameters = import("../../types").MethodParameters;
/**
 * @typedef {import("../../types").MethodParameters} MethodParameters
 */
export class ChatMember extends Base {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {string | number} chatId - Identifier of the chat
     * @param {import("@telegram.ts/types").ChatMember} data - Data about the contains information about one member of a chat
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, chatId: string | number, data: import("@telegram.ts/types").ChatMember);
    /** Identifier of the chat */
    chatId: string | number;
    /** The member's status in the chat */
    status: "creator" | "administrator" | "member" | "restricted" | "left" | "kicked";
    /** Represents the rights of an administrator in a chat */
    permissions: UserPermissions;
    _patch(data: any): any;
    /**
     * Information about the user
     * @type {User | undefined}
     */
    user: User | undefined;
    /**
     * True, if the user's presence in the chat is hidden
     * @type {boolean | undefined}
     */
    anonymous: boolean | undefined;
    /**
     * Custom title for this user
     * @type {string | undefined}
     */
    nickName: string | undefined;
    /**
     * True, if the user is a member of the chat at the moment of the request
     * @type {boolean | undefined}
     */
    isMember: boolean | undefined;
    /**
     * @typedef {import("./Chat").Chat} Chat
    /**
     
     * Chat to which the request was sent
     * @type {Chat | undefined}
     */
    chat: import("./Chat").Chat | undefined;
    /**
     * User that sent the join request
     * @type {User | undefined}
     */
    author: User | undefined;
    /**
     * Bio of the user
     * @type {string | undefined}
     */
    bio: string | undefined;
    /**
     * Chat invite link that was used by the user to send the join request
     * @type {ChatInviteLink | undefined}
     */
    link: ChatInviteLink | undefined;
    /**
     * Date the request was sent in Unix time
     * @type {number | undefined}
     */
    requestedTimestamp: number | undefined;
    /**
     * Identifier of a private chat with the user who sent the join request. The bot can use this identifier for 5 minutes to send messages until the join request is processed, assuming no other administrator contacted the user
     * @type {number | undefined}
     */
    userChatId: number | undefined;
    /**
     * Date when restrictions will be lifted for this user; Unix time. If 0, then the user is restricted forever
     * @type {number | undefined}
     */
    restrictedTimestamp: number | undefined;
    /**
     * Date when restrictions will be lifted for this user
     * @type {Date}
     */
    get restrictedAt(): Date;
    /**
     * Date the request was sent
     * @type {Date}
     */
    get requestedAt(): Date;
    /**
     * Retrieves the permissions of the current member in a specific chat.
     * @param {ChatMember|string|number} channel - The identifier of the chat channel.
     * @returns {UserPermissions|null} The permissions object of the user in the chat or null if not available.
     */
    permissionsIn(channel: ChatMember | string | number): UserPermissions | null;
    /**
     * Use this method to kick a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
     * @param {Omit<MethodParameters["kickChatMember"], "userId" | "chatId">} [options={}]
     * @return {Promise<true>} - Returns True on success.
     */
    kick(options?: Omit<{
        chatId: number | string;
        userId: number;
        untilDate?: number;
        revokeMessages?: boolean;
    }, "userId" | "chatId"> | undefined): Promise<true>;
    /**
     * Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
     * @param {Omit<MethodParameters["banChatMember"], "userId" | "chatId">} [options={}]
     * @return {Promise<true>} - Returns True on success.
     */
    ban(options?: Omit<{
        chatId: number | string;
        userId: number;
        untilDate?: number;
        revokeMessages?: boolean;
    }, "userId" | "chatId"> | undefined): Promise<true>;
    /**
     * Use this method to unban a previously banned user in a supergroup or channel. The user will not return to the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator for this to work. By default, this method guarantees that after the call the user is not a member of the chat, but will be able to join it. So if the user is a member of the chat they will also be removed from the chat. If you don't want this, use the parameter only_if_banned.
     * @param {boolean} [onlyIfBanned] - Do nothing if the user is not banned
     * @return {Promise<true>} - Returns True on success.
     */
    unban(onlyIfBanned?: boolean | undefined): Promise<true>;
    /**
     * Use this method to ban a channel chat in a supergroup or a channel. Until the chat is unbanned, the owner of the banned chat won't be able to send messages on behalf of any of their channels. The bot must be an administrator in the supergroup or channel for this to work and must have the appropriate administrator rights.
     * @param {number} senderChatId - Unique identifier of the target sender chat
     * @return {Promise<true>} - Returns True on success.
     */
    banSenderChat(senderChatId: number): Promise<true>;
    /**
     * Use this method to unban a previously banned channel chat in a supergroup or channel. The bot must be an administrator for this to work and must have the appropriate administrator rights.
     * @param {number} senderChatId - Unique identifier of the target sender chat
     * @return {Promise<true>} - Returns True on success.
     */
    unbanSenderChat(senderChatId: number): Promise<true>;
    /**
     * Use this method to restrict a user in a supergroup. The bot must be an administrator in the supergroup for this to work and must have the appropriate administrator rights. Pass True for all permissions to lift restrictions from a user. Returns True on success.
     * @param {import("../../util/ChatPermissions").ChatPermissionFlags} perms - An object for new user permissions
     * @param {Omit<MethodParameters["restrictChatMember"], "userId" | "permissions">} [options={}] - out parameters
     * @return {Promise<true>} - Returns True on success.
     */
    restrict(perms: import("../../util/ChatPermissions").ChatPermissionFlags, options?: Omit<{
        chatId: number | string;
        userId: number;
        permissions: import("../../util/ChatPermissions").ChatPermissionFlags;
        useIndependentChatPermissions?: boolean;
        untilDate?: number;
    }, "userId" | "permissions"> | undefined): Promise<true>;
    /**
     * Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Pass False for all boolean parameters to demote a user.
     * @param {import("../../util/ChatPermissions").ChatPermissionFlags} persm - An object for new user permissions
     * @param {boolean} [isAnonymous] - Pass True if the administrator's presence in the chat is hidden
     * @return {Promise<true>} - Returns True on success.
     */
    promote(persm: import("../../util/ChatPermissions").ChatPermissionFlags, isAnonymous?: boolean | undefined): Promise<true>;
    /**
     * Use this method to set a custom title for an administrator in a supergroup promoted by the bot.
     * @param {string} name - New custom title for the administrator; 0-16 characters, emoji are not allowed
     * @return {Promise<true} - Returns True on success.
     */
    setNikeName(name: string): Promise<true>;
}
import { Base } from "../Base";
import { UserPermissions } from "../../util/UserPermissions";
import { User } from "../misc/User";
import { ChatInviteLink } from "./ChatInviteLink";
//# sourceMappingURL=ChatMember.d.ts.map