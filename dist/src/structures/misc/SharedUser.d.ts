export class SharedUser extends Base {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").SharedUser} data - Data about the contains information about a user that was shared with the bot using a KeyboardButtonRequestUser button
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").SharedUser);
    /** Identifier of the shared user. The bot may not have access to the user and could be unable to use this identifier, unless the user is already known to the bot by some other means. */
    userId: number;
    _patch(data: any): any;
    /**
     * First name of the user, if the name was requested by the bot
     * @type {string | undefined}
     */
    firstName: string | undefined;
    /**
     * Last name of the user, if the name was requested by the bot
     * @type {string | undefined}
     */
    lastName: string | undefined;
    /**
     * Username of the user, if the username was requested by the bot
     * @type {string | undefined}
     */
    username: string | undefined;
    /**
     * Available sizes of the chat photo, if the photo was requested by the bot
     * @type {Photo[] | undefined}
     */
    photo: Photo[] | undefined;
    /**
     * Refunds a successful payment in Telegram Stars.
     * @param {number} telegramPaymentId - Telegram payment identifier
     * @return {Promise<true>} - Returns True on success.
     */
    refundStarPayment(telegramPaymentId: number): Promise<true>;
    /**
     * Informs a user that some of the Telegram Passport elements they provided contains errors. The user will not be able to re-submit their Passport to you until the errors are fixed (the contents of the field for which you returned the error must change).
     * @param {readonly import("@telegram.ts/types").PassportElementError[]} errors - An array describing the errors
     * @return {Promise<true>} - Returns True on success.
     */
    setPassportErrors(errors: readonly import("@telegram.ts/types").PassportElementError[]): Promise<true>;
    /**
     * Use this method to get a list of profile pictures for a user.
     * @param {number} [offset=0] - Sequential number of the first photo to be returned. By default, all photos are returned
     * @param {number} [limit=100] - Limits the number of photos to be retrieved. Values between 1-100 are accepted. Defaults to 100
     * @return {Promise<import("./UserProfilePhotos").UserProfilePhotos>} - Returns a UserProfilePhotos object.
     */
    getProfilePhotos(offset?: number | undefined, limit?: number | undefined): Promise<import("./UserProfilePhotos").UserProfilePhotos>;
}
import { Base } from "../Base";
import { Photo } from "../media/Photo";
//# sourceMappingURL=SharedUser.d.ts.map