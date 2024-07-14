class MenuButton {
  constructor(data) {
    if ("text" in data) {
      this.text = data.text;
    }

    if ("web_app" in data) {
      this.webApp = { url: data.web_app.url };
    }
  }

  isDefaultAndCmd() {
    return !this.isWebApp();
  }

  isWebApp() {
    return "text" in this && this.text && "webApp" in this && this.webApp;
  }
}

module.exports = { MenuButton };
