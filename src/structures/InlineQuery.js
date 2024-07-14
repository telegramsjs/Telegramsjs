const { Base } = require("./Base");
const { User } = require("./misc/User");
const { Location } = require("./misc/Location");

class InlineQuery extends Base {
  constructor(client, data) {
    super(client, data);

    this.id = data.id;

    this._patch(data);
  }

  _patch(data) {
    this.author = new User(this.client, data.from);

    this.query = data.query;

    this.offset = data.offset;

    if ("chat_type" in data) {
      this.type = data.chat_type;
    }

    if ("location" in data) {
      this.location = new Location(this.client, data.location);
    }
  }
}

module.exports = { InlineQuery };
