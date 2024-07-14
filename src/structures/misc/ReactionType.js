class ReactionType {
  constructor(data) {
    if ("emoji" in data) {
      this.emoji = data.emoji;
    }

    if ("custom_emoji" in data) {
      this.customEmoji = data.custom_emoji;
    }
  }

  isEmoji() {
    return "emoji" in this && this.emoji;
  }

  isCustomEmoji() {
    return "customEmoji" in this && this.customEmoji;
  }
}

module.exports = { ReactionType };
