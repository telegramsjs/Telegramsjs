export class PassportData {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").PassportData} data - Data about the describes the user's Telegram Passport data shared with the bot
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").PassportData);
    /** Array containing information about documents and other Telegram Passport elements shared with the bot. */
    data: EncryptedPassportElement[];
    /** Encrypted credentials required to decrypt the data. */
    credentials: {
        data: string;
        hash: string;
        secret: string;
    };
    /**
     * Informs a user that some of the Telegram Passport elements they provided contains errors. The user will not be able to re-submit their Passport to you until the errors are fixed (the contents of the field for which you returned the error must change).
     * @param {number} userId - User identifier
     * @param {readonly import("@telegram.ts/types").PassportElementError[]} errors - An array describing the errors
     * @return {Promise<true>} - Returns True on success.
     */
    setDataErrors(userId: number, errors: readonly import("@telegram.ts/types").PassportElementError[]): Promise<true>;
}
import { EncryptedPassportElement } from "./EncryptedPassportElement";
//# sourceMappingURL=PassportData.d.ts.map