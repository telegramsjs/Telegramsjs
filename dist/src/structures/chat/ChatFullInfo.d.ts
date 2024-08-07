export class ChatFullInfo extends Chat {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").ChatFullInfo} data - Data about the full information of a chat
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").ChatFullInfo);
    _patch(data: any): void;
    /**
     * The accent color ID of the chat.
     * @type {number | undefined}
     */
    accentColorId: number | undefined;
    /**
     * The maximum number of reactions allowed in the chat.
     * @type {number | undefined}
     */
    maxReactionCount: number | undefined;
    /**
     * The photo of the chat.
     * @type {{ smail: Photo, big: Photo } | undefined}
     */
    photo: {
        smail: Photo;
        big: Photo;
    } | undefined;
    /**
     * The active usernames of the chat.
     * @type {string[] | undefined}
     */
    activeUsernames: string[] | undefined;
    /**
     * The birthdate of the chat.
     * @type {{ day: number, month: number, year?: number } | undefined}
     */
    birthdate: {
        day: number;
        month: number;
        year?: number;
    } | undefined;
    /**
     * The business introduction of the chat.
     * @type {{ title?: string, message?: string, sticker?: Sticker } | undefined}
     */
    businessIntro: {
        title?: string;
        message?: string;
        sticker?: Sticker;
    } | undefined;
    /**
     * The business location of the chat.
     * @type {{ address: string, location?: Location } | undefined}
     */
    businessLocation: {
        address: string;
        location?: Location;
    } | undefined;
    /**
     * The business opening hours of the chat.
     * @type {undefined | { timeZone: string, hours: { opening: number, closing: number }[] } }
     */
    businessOpeningHours: undefined | {
        timeZone: string;
        hours: {
            opening: number;
            closing: number;
        }[];
    };
    /**
     * The personal chat associated with this chat.
     * @type {Chat | undefined}
     */
    personalChat: Chat | undefined;
    /**
     * The available reactions in the chat.
     * @type {ReactionType[] | undefined}
     */
    availableReactions: ReactionType[] | undefined;
    /**
     * The custom emoji ID for the chat background.
     * @type {string | undefined}
     */
    backgroundCustomEmojiId: string | undefined;
    /**
     * The profile accent color ID of the chat.
     * @type {number | undefined}
     */
    profileAccentColorId: number | undefined;
    /**
     * The custom emoji ID for the profile background.
     * @type {string | undefined}
     */
    profileBackgroundCustomEmojiId: string | undefined;
    /**
     * The custom emoji ID for the emoji status.
     * @type {string | undefined}
     */
    emojiStatusCustomEmojiId: string | undefined;
    /**
     * The expiration date for the emoji status.
     * @type {number | undefined}
     */
    emojiStatusExpirationDate: number | undefined;
    /**
     * The bio of the chat.
     * @type {string | undefined}
     */
    bio: string | undefined;
    /**
     * Whether the chat has private forwards.
     * @type {boolean | undefined}
     */
    privateForwards: boolean | undefined;
    /**
     * Whether the chat has restricted voice and video messages.
     * @type {boolean | undefined}
     */
    restrictedMediaMessages: boolean | undefined;
    /**
     * Whether users need to join to send messages in the chat.
     * @type {boolean | undefined}
     */
    joinToSendMessages: boolean | undefined;
    /**
     * Whether users need to request to join the chat.
     * @type {boolean | undefined}
     */
    joinByRequest: boolean | undefined;
    /**
     * The description of the chat.
     * @type {string | undefined}
     */
    description: string | undefined;
    /**
     * The invite link for the chat.
     * @type {string | undefined}
     */
    inviteLink: string | undefined;
    /**
     * The pinned message in the chat.
     * @type {Message | undefined}
     */
    pinnedMessage: Message | undefined;
    /**
     * The permissions in the chat.
     * @type {ChatPermissions | undefined}
     */
    permissions: ChatPermissions | undefined;
    /**
     * The slow mode delay in the chat.
     * @type {number | undefined}
     */
    slowModeDelay: number | undefined;
    /**
     * The unrestrict boost count of the chat.
     * @type {number | undefined}
     */
    unrestrictBoostCount: number | undefined;
    /**
     * The message auto delete time in the chat.
     * @type {number | undefined}
     */
    messageAutoDeleteTime: number | undefined;
    /**
     * Whether the chat has aggressive anti-spam enabled.
     * @type {boolean | undefined}
     */
    aggressiveAntiSpamEnabled: boolean | undefined;
    /**
     * Whether the chat has hidden members.
     * @type {boolean | undefined}
     */
    hiddenMembers: boolean | undefined;
    /**
     * Whether the chat has protected content.
     * @type {boolean | undefined}
     */
    protectedContent: boolean | undefined;
    /**
     * Whether the chat has visible history.
     * @type {boolean | undefined}
     */
    visibleHistory: boolean | undefined;
    /**
     * The name of the sticker set in the chat.
     * @type {string | undefined}
     */
    stickerSetName: string | undefined;
    /**
     * The name of the custom emoji sticker set in the chat.
     * @type {string | undefined}
     */
    customEmojiStickerSetName: string | undefined;
    /**
     * The linked chat ID.
     * @type {number | undefined}
     */
    linkedId: number | undefined;
    /**
     * The location of the chat.
     * @type {Location | undefined}
     */
    location: Location | undefined;
}
import { Chat } from "./Chat";
import { Photo } from "../media/Photo";
import { Sticker } from "../media/Sticker";
import { Location } from "../misc/Location";
import { ReactionType } from "../misc/ReactionType";
import { Message } from "../message/Message";
import { ChatPermissions } from "../../util/ChatPermissions";
//# sourceMappingURL=ChatFullInfo.d.ts.map