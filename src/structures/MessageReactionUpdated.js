const { Base } = require("./Base");
const { Chat } = require("./chat/Chat");
const { User } = require("./misc/User");

class Emoji {
  constructor(emoji) {
    this.emoji = emoji;
  }

  isEmoji() {
    return true;
  }

  isCustomEmoji() {
    return false;
  }
}

class CustomEmoji {
  constructor(custom) {
    this.customEmoji = custom;
  }

  isEmoji() {
    return false;
  }

  isCustomEmoji() {
    return true;
  }
}

class MessageReactionUpdated extends Base {
  constructor(client, data) {
    super(client, data);

    this.id = data.id;

    this._patch(data);
  }

  _patch(data) {
    this.chat = new Chat(this.client, data.chat);

    if ("user" in data) {
      this.user = new User(this.client, data.user);
    }

    if ("actor_chat" in data) {
      this.actorChat = new Chat(this.client, data.actor_chat);
    }

    this.createdTimestamp = data.date;

    this.added = data.new_reaction.map((data) => {
      if (data.type == "custom_emoji") {
        return new CustomEmoji(data.custom_emoji);
      }
      return new Emoji(data.emoji);
    });

    this.removed = data.old_reaction.map((data) => {
      if (data.type == "custom_emoji") {
        return new CustomEmoji(data.custom_emoji);
      }
      return new Emoji(data.emoji);
    });
  }

  get createdAt() {
    return new Date(this.createdTimestamp);
  }

  static reactions(messageReaction) {
    function isEmoji(reaction) {
      const reactionTypeEmojis = reaction.filter(
        (react) => react.type === "emoji",
      );
      return reactionTypeEmojis.map((react) => react.emoji);
    }

    function isCustomEmoji(reaction) {
      const reactionTypeCustomEmojis = reaction.filter(
        (react) => react.type === "custom_emoji",
      );
      return reactionTypeCustomEmojis.map((react) => react.custom_emoji);
    }

    const { old_reaction, new_reaction } = messageReaction || {
      old_reaction: [],
      new_reaction: [],
    };

    const emoji = isEmoji(new_reaction);
    const customEmoji = isCustomEmoji(new_reaction);
    const emojiRemoved = isEmoji(old_reaction);
    const customEmojiRemoved = isCustomEmoji(old_reaction);

    const emojiAdded = emoji.filter(
      (emojiItem) => !emojiRemoved.includes(emojiItem),
    );
    const customEmojiAdded = customEmoji.filter(
      (emojiItem) => !customEmojiRemoved.includes(emojiItem),
    );

    const emojiKept = emoji.filter((emojiItem) =>
      emojiRemoved.includes(emojiItem),
    );
    const customEmojiKept = customEmoji.filter((emojiItem) =>
      customEmojiRemoved.includes(emojiItem),
    );

    return {
      emoji,
      emojiAdded,
      emojiKept,
      emojiRemoved,
      customEmoji,
      customEmojiAdded,
      customEmojiKept,
      customEmojiRemoved,
    };
  }
}

module.exports = { MessageReactionUpdated, Emoji, CustomEmoji };
