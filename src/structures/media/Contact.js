class Contact {
  /**
   * @param {import("@telegram.ts/types").Contact} data - Data about the represents a phone contact
   */
  constructor(data) {
    /** Contact's phone number */
    this.phoneNumber = data.phone_number;

    /** Contact's first name */
    this.firstName = data.first_name;

    if ("last_name" in data) {
      /** Contact's last name */
      this.lastName = data.last_name;
    }

    if ("user_id" in data) {
      /** Contact's user identifier in Telegram */
      this.userId = data.user_id;
    }

    if ("vcard" in data) {
      /** Additional data about the contact in the form of a vCard */
      this.vcard = data.vcard;
    }
  }
}

module.exports = { Contact };
