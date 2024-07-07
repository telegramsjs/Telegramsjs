class LinkPreviewOptions {
  constructor(data) {
    if ("is_disabled" in data) {
      this.disabled = data.is_disabled;
    }

    if ("url" in data) {
      this.url = data.url;
    }

    if ("prefer_small_media" in data) {
      this.smallMedia = data.prefer_small_media;
    }

    if ("prefer_large_media" in data) {
      this.largeMedia = data.prefer_large_media;
    }

    if ("show_above_text" in data) {
      this.aboveText = data.show_above_text;
    }
  }
}

module.exports = { LinkPreviewOptions };
