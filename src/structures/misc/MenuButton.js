class MenuButton {
  /**
   * @param {import("@telegram.ts/types").MenuButton} data - Data about the interface describes the bot's menu button in a private chat
   */
  constructor(data) {
    if ("text" in data) {
      /** The text on the button */
      this.text = data.text;
    }

    if ("web_app" in data) {
      /** Description of the Web App that will be launched when the user presses the button. The Web App will be able to send an arbitrary message on behalf of the user using the method answerWebAppQuery. Alternatively, a t.me link to a Web App can be specified in the object instead of the Web App's URL, in which case the Web App will be opened as if the user pressed the link */
      this.webApp = { url: data.web_app.url };
    }
  }

  /**
   * @returns {this is this & { text?: undefined; webApp?: undefined }}
   */
  isDefaultAndCmd() {
    return !this.isWebApp();
  }

  /**
   * @returns {this is this & { text: string; webApp: import("@telegram.ts/types").WebAppInfo }}
   */
  isWebApp() {
    return Boolean(
      "text" in this && this.text && "webApp" in this && this.webApp,
    );
  }
}

module.exports = { MenuButton };
