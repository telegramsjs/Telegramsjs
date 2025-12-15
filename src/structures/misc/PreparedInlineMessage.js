class PreparedInlineMessage {
  /**
   * @param {import("@telegram.ts/types").PreparedInlineMessage} data - Data about the inline message to be sent by a user of a Mini App.
   */
  constructor(data) {
    /** Unique identifier of the prepared message */
    this.id = data.id;

    /** Expiration date of the prepared message, in Unix time. Expired prepared messages can no longer be used */
    this.expirationUnixTime = data.expiration_date;
  }

  /**
   * Return the timestamp prepared message, in milliseconds
   */
  get expirationTimestamp() {
    return this.expirationUnixTime ? this.expirationUnixTime * 1000 : null;
  }

  /**
   * Date the prepared message
   * @type {null | Date}
   */
  get expirationAt() {
    return this.expirationTimestamp ? new Date(this.expirationTimestamp) : null;
  }
}

module.exports = { PreparedInlineMessage };
