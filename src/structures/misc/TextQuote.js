const { MessageEntities } = require("../message/MessageEntities");

class TextQuote {
  /**
   * @param {import("@telegram.ts/types").TextQuote} data - Data about the contains information about the quoted part of a message that is replied to by the given message
   */
  constructor(data) {
    /** Text of the quoted part of a message that is replied to by the given message */
    this.text = data.text;

    if ("entities" in data) {
      /** Special entities that appear in the quote. Currently, only bold, italic, underline, strikethrough, spoiler, and custom_emoji entities are kept in quotes. */
      this.entities = new MessageEntities(data.text, data.entities);
    }

    /** Approximate quote position in the original message in UTF-16 code units as specified by the sender */
    this.position = data.position;

    if ("is_manual" in data) {
      /** True, if the quote was chosen manually by the message sender. Otherwise, the quote was added automatically by the server. */
      this.manual = data.is_manual;
    }
  }
}

module.exports = { TextQuote };
