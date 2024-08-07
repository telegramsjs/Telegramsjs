export class User extends Base {
    constructor(client: any, data: any);
    /** Unique identifier for this user or bot. */
    id: any;
    /** True, if this user is a bot */
    bot: boolean;
    /** User's or bot's first name */
    firstName: any;
    _patch(data: any): any;
    /**
     * User's or bot's last name
     * @type {string | undefined}
     */
    lastName: string | undefined;
    /**
     * User's or bot's username
     * @type {string | undefined}
     */
    username: string | undefined;
    /**
     * IETF language tag of the user's language
     * @type {string | undefined}
     */
    language: string | undefined;
    /**
     * True, if this user is a Telegram Premium user
     * @type {boolean}
     */
    premium: boolean | undefined;
    /**
     * True, if this user added the bot to the attachment menu
     * @type {boolean}
     */
    inAttachmentMenu: boolean | undefined;
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
//# sourceMappingURL=User.d.ts.map