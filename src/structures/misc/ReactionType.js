class ReactionType {
  /**
   * @param {import("@telegram.ts/types").ReactionType | { customEmojiId: string }} data - Data about the describes the type of a reaction
   */
  constructor(data) {
    if ("emoji" in data) {
      /** Reaction emoji. Currently, it can be one of "👍", "👎", "❤", "🔥", "🥰", "👏", "😁", "🤔", "🤯", "😱", "🤬", "😢", "🎉", "🤩", "🤮", "💩", "🙏", "👌", "🕊", "🤡", "🥱", "🥴", "😍", "🐳", "❤‍🔥", "🌚", "🌭", "💯", "🤣", "⚡", "🍌", "🏆", "💔", "🤨", "😐", "🍓", "🍾", "💋", "🖕", "😈", "😴", "😭", "🤓", "👻", "👨‍💻", "👀", "🎃", "🙈", "😇", "😨", "🤝", "✍", "🤗", "🫡", "🎅", "🎄", "☃", "💅", "🤪", "🗿", "🆒", "💘", "🙉", "🦄", "😘", "💊", "🙊", "😎", "👾", "🤷‍♂", "🤷", "🤷‍♀", "😡" */
      this.emoji = data.emoji;
    }

    if ("custom_emoji_id" in data) {
      /** Custom emoji identifier */
      this.customEmojiId = data.custom_emoji_id;
    }

    if ("customEmojiId" in data) {
      /** Custom emoji identifier */
      this.customEmojiId = data.customEmojiId;
    }
  }

  /**
   * @returns {this is this & { emoji: import("@telegram.ts/types").ReactionTypeEmoji["emoji"]; customEmojiId?: undefined }}
   */
  isEmoji() {
    return Boolean("emoji" in this && this.emoji);
  }

  /**
   * @returns {this is this & { customEmojiId: string; emoji?: undefined }}
   */
  isCustomEmoji() {
    return Boolean("customEmojiId" in this && this.customEmojiId);
  }

  /**
   * @returns {this is this & { customEmojiId?: undefined; emoji?: undefined }}
   */
  isPaid() {
    return !this.isEmoji() && !this.isCustomEmoji();
  }
}

module.exports = { ReactionType };
