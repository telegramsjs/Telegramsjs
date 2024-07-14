const { MessageEntities } = require("../message/MessageEntities");

class TextQuote {
  constructor(data) {
    this.text = data.text;

    if ("entities" in data) {
      this.entities = new MessageEntities(data.text, data.entities);
    }

    this.position = data.position;

    if ("is_manual" in data) {
      this.manual = data.is_manual;
    }
  }
}

module.exports = { TextQuote };
