export class ExternalReplyInfo extends Base {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").ExternalReplyInfo} data - Data about the contains information about a message that is being replied to, which may come from another chat or forum topic
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").ExternalReplyInfo);
    /** Origin of the message replied to by the given message */
    origin: MessageOrigin;
    _patch(data: any): any;
    /**
     * Chat the original message belongs to. Available only if the chat is a supergroup or a channel
     * @type {Chat | undefined}
     */
    chat: Chat | undefined;
    /**
     * Unique message identifier inside the original chat. Available only if the original chat is a supergroup or a channel
     * @type {number | undefined}
     */
    messageId: number | undefined;
    /**
     * Options used for link preview generation for the original message, if it is a text message
     * @type {LinkPreviewOptions | undefined}
     */
    linkPreviewOpts: LinkPreviewOptions | undefined;
    /**
     * Message is an animation, information about the animation
     * @type {Animation | undefined}
     */
    animation: Animation | undefined;
    /**
     * Message is an audio file, information about the file
     * @type {Audio | undefined}
     */
    audio: Audio | undefined;
    /**
     * Message is a general file, information about the file
     * @type {Document | undefined}
     */
    document: Document | undefined;
    /**
     * Message is a photo, available sizes of the photo
     * @type {Photo[] | undefined}
     */
    photo: Photo[] | undefined;
    /**
     * Message is a sticker, information about the sticker
     * @type {Sticker | undefined}
     */
    sticker: Sticker | undefined;
    /**
     * Message is a forwarded story
     * @type {Story | undefined}
     */
    story: Story | undefined;
    /**
     * Message is a video, information about the video
     * @type {Video | undefined}
     */
    video: Video | undefined;
    /**
     * Message is a video note, information about the video message
     * @type {VideoNote | undefined}
     */
    videoNote: VideoNote | undefined;
    /**
     * Message is a voice message, information about the file
     * @type {Voice | undefined}
     */
    voice: Voice | undefined;
    /**
     * True, if the message media is covered by a spoiler animation
     * @type {true | undefined}
     */
    mediaSpoiler: true | undefined;
    /**
     * Message is a shared contact, information about the contact
     * @type {Contact | undefined}
     */
    contact: Contact | undefined;
    /**
     * Message is a dice with random value
     * @type {Dice | undefined}
     */
    dice: Dice | undefined;
    /**
     * Message is a game, information about the game. More about games
     * @type {Game | undefined}
     */
    game: Game | undefined;
    /**
     * Message is a scheduled giveaway, information about the giveaway
     * @type {Giveaway | undefined}
     */
    giveaway: Giveaway | undefined;
    /**
     * A giveaway with public winners was completed
     * @type {GiveawayWinners | undefined}
     */
    giveawayWinners: GiveawayWinners | undefined;
    /**
     * Message is an invoice for a payment, information about the invoice. More about payments
     * @type {Invoice | undefined}
     */
    invoice: Invoice | undefined;
    /**
     * Message is a shared location, information about the location
     * @type {Location | undefined}
     */
    location: Location | undefined;
    /**
     * Message contains paid media; information about the paid media
     * @type {PaidMediaInfo | undefined}
     */
    paidMedia: PaidMediaInfo | undefined;
    /**
     * Message is a native poll, information about the poll
     * @type {Poll | undefined}
     */
    poll: Poll | undefined;
    /**
     * Message is a venue, information about the venue
     * @type {Venue | undefined}
     */
    venue: Venue | undefined;
}
import { Base } from "../Base";
import { MessageOrigin } from "../message/MessageOrigin";
import { Chat } from "../chat/Chat";
import { LinkPreviewOptions } from "./LinkPreviewOptions";
import { Animation } from "../media/Animation";
import { Audio } from "../media/Audio";
import { Document } from "../media/Document";
import { Photo } from "../media/Photo";
import { Sticker } from "../media/Sticker";
import { Story } from "./Story";
import { Video } from "../media/Video";
import { VideoNote } from "../media/VideoNote";
import { Voice } from "../media/Voice";
import { Contact } from "../media/Contact";
import { Dice } from "../media/Dice";
import { Game } from "../game/Game";
import { Giveaway } from "../giveaway/Giveaway";
import { GiveawayWinners } from "../giveaway/GiveawayWinners";
import { Invoice } from "../invoice/Invoice";
import { Location } from "./Location";
import { PaidMediaInfo } from "../media/paid/PaidMediaInfo";
import { Poll } from "../media/Poll";
import { Venue } from "./Venue";
//# sourceMappingURL=ExternalReplyInfo.d.ts.map