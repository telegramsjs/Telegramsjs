const { Base } = require("./Base");
const { User } = require("./User");
const { Location } = require("./Location");

class ChosenInlineResult extends Base {
  constructor(client, data) {
    super(client, data);

    this.id = data.result_id;

    this._patch(data);
  }

  _patch(data) {
    this.author = new User(this.client, data.from);

    if ("location" in data) {
      this.location = new Location(this.client, data.location);
    }

    this.query = data.query;

    this.inlineMessageId = data.inline_message_id;
  }
}

module.exports = { ChosenInlineResult };
