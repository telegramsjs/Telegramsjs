export class EncryptedPassportElement extends Base {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").EncryptedPassportElement} data - Data about the describes documents or other Telegram Passport elements shared with the bot by the user
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").EncryptedPassportElement);
    /** Element type. Possible values are "personal_details", "passport", "driver_license", "identity_card", "internal_passport", "address", "utility_bill", "bank_statement", "rental_agreement", "passport_registration", "temporary_registration", "phone_number", and "email". */
    type: "personal_details" | "passport" | "driver_license" | "identity_card" | "internal_passport" | "address" | "utility_bill" | "bank_statement" | "rental_agreement" | "passport_registration" | "temporary_registration" | "phone_number" | "email";
    /** Base64-encoded element hash for use in PassportElementErrorUnspecified. */
    hash: string;
    _patch(data: any): any;
    /**
     * Base64-encoded encrypted Telegram Passport element data provided by the user; available only for “personal_details”, “passport”, “driver_license”, “identity_card”, “internal_passport” and “address” types. Can be decrypted and verified using the accompanying EncryptedCredentials
     * @type {string | undefined}
     */
    data: string | undefined;
    /**
     *  User's verified phone number; available only for type "phone_number"
     * @type {string | undefined}
     */
    phoneNumber: string | undefined;
    /**
     * User's verified email address; available only for type "email"
     * @type {string | undefined}
     */
    email: string | undefined;
    /**
     * Array of encrypted files with documents provided by the user; This array is available only for types "utility_bill", "bank_statement", "rental_agreement", "passport_registration", and "temporary_registration". The files can be decrypted and verified using the accompanying EncryptedCredentials
     * @type {InputFile[] | undefined}
     */
    files: InputFile[] | undefined;
    /**
     * Encrypted file with the front side of the document, provided by the user; This file is available only for types "passport", "driver_license", "identity_card", and "internal_passport". It can be decrypted and verified using the accompanying EncryptedCredentials
     * @type {PassportFile | undefined}
     */
    frontSide: PassportFile | undefined;
    /**
     * Encrypted file with the reverse side of the document, provided by the user; This file is available only for types "driver_license" and "identity_card". It can be decrypted and verified using the accompanying EncryptedCredentials
     * @type {PassportFile | undefined}
     */
    reverseSide: PassportFile | undefined;
    /**
     * Encrypted file with the selfie of the user holding a document, provided by the user. This file is available if requested for types "passport", "driver_license", "identity_card", and "internal_passport". It can be decrypted and verified using the accompanying EncryptedCredentials
     * @type {PassportFile | undefined}
     */
    selfie: PassportFile | undefined;
    /**
     * Array of encrypted files with translated versions of documents provided by the user; This array is available only for types "passport", "driver_license", "identity_card", "internal_passport", "utility_bill", "bank_statement", "rental_agreement", "passport_registration", and "temporary_registration".
     * The files can be decrypted and verified using the accompanying EncryptedCredentials
     * @type {PassportFile[] | undefined}
     */
    translation: PassportFile[] | undefined;
}
import { Base } from "../Base";
import { InputFile } from "../misc/InputFile";
import { PassportFile } from "./PassportFile";
//# sourceMappingURL=EncryptedPassportElement.d.ts.map