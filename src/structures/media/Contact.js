class Contact {
  constructor(data) {
    this.phoneNumber = data.phone_number;

    this.firstName = data.first_name;

    if ("last_name" in data) {
      this.lastName = data.last_name;
    }

    if ("user_id" in data) {
      this.userId = data.user_id;
    }

    if ("vcard" in data) {
      this.vcard = data.vcard;
    }
  }
}

module.exports = { Contact };
