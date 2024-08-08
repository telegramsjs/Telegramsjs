const { Document } = require("../media/Document");
const { BackgroundFill } = require("./BackgroundFill");

class BackgroundType {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").ChatBoost} data - Data about the describes the type of a background
   */
  constructor(client, data) {
    if (data.type === "fill") {
      /**
       * The background fill
       * @type {BackgroundFill | undefined}
       */
      this.fill = new BackgroundFill(data.fill);

      /**
       * Dimming of the background in dark themes, as a percentage; 0-100
       * @type {number | undefined}
       */
      this.darkDimming = data.dark_theme_dimming;
    }

    if (data.type === "wallpaper") {
      /**
       * Document with the wallpaper
       * @type {Document | undefined}
       */
      this.document = new Document(client, data.document);

      /**
       * Dimming of the background in dark themes, as a percentage; 0-100
       * @type {number | undefined}
       */
      this.darkDimming = data.dark_theme_dimming;

      if ("is_blurred" in data) {
        /**
         * True, if the wallpaper is downscaled to fit in a 450x450 square and then box-blurred with radius 12
         * @type {true | undefined}
         */
        this.blurred = data.is_blurred;
      }

      if ("is_moving" in data) {
        /**
         * True, if the background moves slightly when the device is tilted
         * @type {true | undefined}
         */
        this.moving = data.is_moving;
      }
    }

    if (data.type === "pattern") {
      /**
       * Document with the pattern
       * @type {Document | undefined}
       */
      this.document = new Document(client, data.document);

      /**
       * The background fill that is combined with the pattern
       * @type {BackgroundFill | undefined}
       */
      this.fill = new BackgroundFill(data.fill);

      /**
       * Intensity of the pattern when it is shown above the filled background; 0-100
       * @type {number}
       */
      this.intensity = data.intensity;

      if ("is_inverted" in data) {
        /**
         * True, if the background fill must be applied only to the pattern itself. All other pixels are black in this case. For dark themes only
         * @type {true | undefined}
         */
        this.inverted = data.is_inverted;
      }

      if ("is_moving" in data) {
        /**
         * True, if the background moves slightly when the device is tilted
         * @type {true | undefined}
         */
        this.moving = data.is_moving;
      }
    }

    if (data.type === "chat_theme") {
      /**
       * Name of the chat theme, which is usually an emoji
       * @type {string | undefined}
       */
      this.themeName = data.theme_name;
    }
  }

  /**
   * @return {this is this & { fill: BackgroundFill; darkDimming: number; }}
   */
  isFill() {
    return Boolean(
      "fill" in this && this.fill && "darkDimming" in this && this.darkDimming,
    );
  }

  /**
   * @return {this is this & { document: Document; darkDimming: number; }}
   */
  isWallpaper() {
    return Boolean(
      "document" in this &&
        this.document &&
        "darkDimming" in this &&
        this.darkDimming,
    );
  }

  /**
   * @return {this is this & { fill: BackgroundFill; document: Document; intensity: number }}
   */
  isPattern() {
    return Boolean(
      "fill" in this &&
        this.fill &&
        "document" in this &&
        this.document &&
        "intensity" in this &&
        this.intensity,
    );
  }
}

module.exports = { BackgroundType };
