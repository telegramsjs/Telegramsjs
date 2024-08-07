export class Contact {
    /**
     * @param {import("@telegram.ts/types").Contact} data - Data about the represents a phone contact
     */
    constructor(data: import("@telegram.ts/types").Contact);
    /** Contact's phone number */
    phoneNumber: string;
    /** Contact's first name */
    firstName: string;
    /** Contact's last name */
    lastName: string | undefined;
    /** Contact's user identifier in Telegram */
    userId: number | undefined;
    /** Additional data about the contact in the form of a vCard */
    vcard: string | undefined;
}
//# sourceMappingURL=Contact.d.ts.map