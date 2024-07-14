const { Document } = require("../media/Document");
const { BackgroundFill } = require("./BackgroundFill");

class BackgroundType {
  constructor(client, data) {
    if (data.type === "fill") {
      this.fill = new BackgroundFill(data.fill);

      this.darkDimming = data.dark_theme_dimming;
    }

    if (data.type === "wallpaper") {
      this.document = new Document(client, data.document);

      this.darkDimming = data.dark_theme_dimming;

      if ("is_blurred" in data) {
        this.blurred = data.is_blurred;
      }

      if ("is_moving" in data) {
        this.moving = data.is_moving;
      }
    }

    if (data.type === "pattern") {
      this.document = new Document(client, data.document);

      this.fill = new BackgroundFill(data.fill);

      this.intensity = data.intensity;

      if ("is_inverted" in data) {
        this.inverted = data.is_inverted;
      }

      if ("is_moving" in data) {
        this.moving = data.is_moving;
      }
    }

    if (data.type === "chat_theme") {
      this.themeName = data.theme_name;
    }
  }

  isFill() {
    return (
      "fill" in this && this.fill && "darkDimming" in this && this.darkDimming
    );
  }

  isWallpaper() {
    return (
      "document" in this &&
      this.document &&
      "darkDimming" in this &&
      this.darkDimming
    );
  }

  isPattern() {
    return (
      "fill" in this &&
      this.fill &&
      "document" in this &&
      this.document &&
      "intensity" in this &&
      this.intensity
    );
  }

  isChatTheme() {
    return "themeName" in this && this.themeName;
  }
}

module.exports = BackgroundType;
