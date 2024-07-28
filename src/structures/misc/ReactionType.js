class ReactionType {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").ReactionType} data - Data about the describes the type of a reaction
   */
  constructor(data) {
    if ("emoji" in data) {
      /** Reaction emoji. Currently, it can be one of "👍", "👎", "❤", "🔥", "🥰", "👏", "😁", "🤔", "🤯", "😱", "🤬", "😢", "🎉", "🤩", "🤮", "💩", "🙏", "👌", "🕊", "🤡", "🥱", "🥴", "😍", "🐳", "❤‍🔥", "🌚", "🌭", "💯", "🤣", "⚡", "🍌", "🏆", "💔", "🤨", "😐", "🍓", "🍾", "💋", "🖕", "😈", "😴", "😭", "🤓", "👻", "👨‍💻", "👀", "🎃", "🙈", "😇", "😨", "🤝", "✍", "🤗", "🫡", "🎅", "🎄", "☃", "💅", "🤪", "🗿", "🆒", "💘", "🙉", "🦄", "😘", "💊", "🙊", "😎", "👾", "🤷‍♂", "🤷", "🤷‍♀", "😡" */
      this.emoji = data.emoji;
    }

    if ("custom_emoji" in data) {
      /** Custom emoji identifier */
      this.customEmoji = data.custom_emoji;
    }
  }

  /**
   * @return {this is this & { emoji: import("@telegram.ts/types").ReactionTypeEmoji["emoji"]; customEmoji?: undefined }}
   */
  isEmoji() {
    return Boolean("emoji" in this && this.emoji);
  }

  /**
   * @return {this is this & { customEmoji: string; emoji?: undefined }}
   */
  isCustomEmoji() {
    return Boolean("customEmoji" in this && this.customEmoji);
  }
}

module.exports = { ReactionType };
