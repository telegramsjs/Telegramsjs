const { Base } = require("./Base");
const { Chat } = require("./chat/Chat");
const { Emoji, CustomEmoji } = require("./MessageReactionUpdated");

class ReactionCount {
  constructor(data) {
    this.totalCount = data.total_count;

    this.type =
      data.type === "custom_emoji"
        ? new CustomEmoji(data.type)
        : new Emoji(data.type);
  }
}

class MessageReactionCountUpdated extends Base {
  constructor(client, data) {
    super(client, data);

    this.id = data.message_id;

    this._patch(data);
  }

  _patch(data) {
    this.chat = new Chat(this.client, data.chat);

    this.createdTimestamp = data.date;

    this.reactions = data.reactions.map((data) => new ReactionCount(data));
  }

  get createdAt() {
    return new Date(this.createdTimestamp);
  }
}

module.exports = { MessageReactionCountUpdated };
