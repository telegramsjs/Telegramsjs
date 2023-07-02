const { Markup } = require("../dist/index");

describe("Markup", () => {
  describe("constructor", () => {
    it("should create a new instance of Markup class with default values", () => {
      const markup = new Markup();
      expect(markup.text).toBeUndefined();
      expect(markup.action).toBeUndefined();
      expect(markup.type).toBe("callback_data");
      expect(markup.remove_keyboard).toBe(false);
      expect(markup.web_app).toBeUndefined();
      expect(markup.login_url).toBeUndefined();
      expect(markup.switch_inline_query).toBeUndefined();
      expect(markup.switch_inline_query_current_chat).toBeUndefined();
      expect(markup.switch_inline_query_chosen_chat).toBeUndefined();
      expect(markup.callback_game).toBeUndefined();
      expect(markup.pay).toBeUndefined();
      expect(markup.force_reply).toBeUndefined();
    });

    it("should create a new instance of Markup class with provided options", () => {
      const options = {
        text: "Click me",
        action: "button_click",
        type: "callback_data",
        removeKeyboard: true,
        webApp: { url: "https://example.com" },
        loginUrl: { url: "https://example.com/login" },
        switchInlineQuery: "query",
        switchInlineQueryCurrentChat: "current_query",
        switchInlineQueryChosenChat: { query: "chosen_query" },
        callbackGame: { user_id: 123, score: 456 },
        pay: true,
        forceReply: true,
      };
      const markup = new Markup(options);
      expect(markup.text).toBe(options.text);
      expect(markup.action).toBe(options.action);
      expect(markup.type).toBe(options.type);
      expect(markup.remove_keyboard).toBe(options.removeKeyboard);
      expect(markup.web_app).toBe(options.webApp);
      expect(markup.login_url).toBe(options.loginUrl);
      expect(markup.switch_inline_query).toBe(options.switchInlineQuery);
      expect(markup.switch_inline_query_current_chat).toBe(
<<<<<<< HEAD
        options.switchInlineQueryCurrentChat,
      );
      expect(markup.switch_inline_query_chosen_chat).toBe(
        options.switchInlineQueryChosenChat,
=======
        options.switchInlineQueryCurrentChat
      );
      expect(markup.switch_inline_query_chosen_chat).toBe(
        options.switchInlineQueryChosenChat
>>>>>>> 38a3db8 (add @grammyjs/types and action. beginning)
      );
      expect(markup.callback_game).toBe(options.callbackGame);
      expect(markup.pay).toBe(options.pay);
      expect(markup.force_reply).toBe(options.forceReply);
    });
  });

  describe("setType", () => {
    it("should set the markup action type", () => {
      const markup = new Markup();
      markup.setType("new_type");
      expect(markup.type).toBe("new_type");
    });

    it("should return an instance of Markup for method chaining", () => {
      const markup = new Markup();
      const result = markup.setType("new_type");
      expect(result).toBe(markup);
    });
  });

  describe("setAction", () => {
    it("should set the markup action", () => {
      const markup = new Markup();
      markup.setAction("new_action");
      expect(markup.action).toBe("new_action");
    });

    it("should return an instance of Markup for method chaining", () => {
      const markup = new Markup();
      const result = markup.setAction("new_action");
      expect(result).toBe(markup);
    });
  });

  describe("setText", () => {
    it("should set the text on the markup", () => {
      const markup = new Markup();
      markup.setText("new_text");
      expect(markup.text).toBe("new_text");
    });

    it("should return an instance of Markup for method chaining", () => {
      const markup = new Markup();
      const result = markup.setText("new_text");
      expect(result).toBe(markup);
    });
  });

  describe("setWebApp", () => {
    it("should set the URL for the web app", () => {
      const markup = new Markup();
      const webApp = { url: "https://example.com" };
      markup.setWebApp(webApp);
      expect(markup.web_app).toBe(webApp);
    });

    it("should return an instance of Markup for method chaining", () => {
      const markup = new Markup();
      const webApp = { url: "https://example.com" };
      const result = markup.setWebApp(webApp);
      expect(result).toBe(markup);
    });
  });

  describe("setLoginUrl", () => {
    it("should set the login URL for the markup", () => {
      const markup = new Markup();
      const loginUrl = { url: "https://example.com/login" };
      markup.setLoginUrl(loginUrl);
      expect(markup.login_url).toBe(loginUrl);
    });

    it("should return an instance of Markup for method chaining", () => {
      const markup = new Markup();
      const loginUrl = { url: "https://example.com/login" };
      const result = markup.setLoginUrl(loginUrl);
      expect(result).toBe(markup);
    });
  });

  describe("setSwitchInlineQuery", () => {
    it("should set the switch inline query for the markup", () => {
      const markup = new Markup();
      markup.setSwitchInlineQuery("query");
      expect(markup.switch_inline_query).toBe("query");
    });

    it("should return an instance of Markup for method chaining", () => {
      const markup = new Markup();
      const result = markup.setSwitchInlineQuery("query");
      expect(result).toBe(markup);
    });
  });

  describe("setSwitchInlineQueryCurrentChat", () => {
    it("should set the switch inline query for the current chat", () => {
      const markup = new Markup();
      markup.setSwitchInlineQueryCurrentChat("current_query");
      expect(markup.switch_inline_query_current_chat).toBe("current_query");
    });

    it("should return an instance of Markup for method chaining", () => {
      const markup = new Markup();
      const result = markup.setSwitchInlineQueryCurrentChat("current_query");
      expect(result).toBe(markup);
    });
  });

  describe("setSwitchInlineQueryChosenChat", () => {
    it("should set the chosen inline query chat for the markup", () => {
      const markup = new Markup();
      const chosenChat = { query: "chosen_query" };
      markup.setSwitchInlineQueryChosenChat(chosenChat);
      expect(markup.switch_inline_query_chosen_chat).toBe(chosenChat);
    });

    it("should return an instance of Markup for method chaining", () => {
      const markup = new Markup();
      const chosenChat = { query: "chosen_query" };
      const result = markup.setSwitchInlineQueryChosenChat(chosenChat);
      expect(result).toBe(markup);
    });
  });

  describe("setCallbackGame", () => {
    it("should set the callback game for the markup", () => {
      const markup = new Markup();
      const callbackGame = { user_id: 123, score: 456 };
      markup.setCallbackGame(callbackGame);
      expect(markup.callback_game).toBe(callbackGame);
    });

    it("should return an instance of Markup for method chaining", () => {
      const markup = new Markup();
      const callbackGame = { user_id: 123, score: 456 };
      const result = markup.setCallbackGame(callbackGame);
      expect(result).toBe(markup);
    });
  });

  describe("setPay", () => {
    it("should set the `pay` option for the markup", () => {
      const markup = new Markup();
      markup.setPay(true);
      expect(markup.pay).toBe(true);
    });

    it("should return an instance of Markup for method chaining", () => {
      const markup = new Markup();
      const result = markup.setPay(true);
      expect(result).toBe(markup);
    });
  });

  describe("setForceReply", () => {
    it("should set the `force_reply` option for the reply keyboard", () => {
      const markup = new Markup();
      markup.setForceReply(true);
      expect(markup.force_reply).toBe(true);
    });

    it("should return the modified instance of the object", () => {
      const markup = new Markup();
      const result = markup.setForceReply(true);
      expect(result).toBe(markup);
    });
  });

  describe("fromJSON", () => {
    it("should create a new Markup object from a markup object", () => {
      const markupObj = {
        text: "button",
        action: "click",
        type: "callback_data",
      };
      const markup = Markup.fromJSON(markupObj);
      expect(markup).toBeInstanceOf(Markup);
      expect(markup.text).toBe(markupObj.text);
      expect(markup.action).toBe(markupObj.action);
      expect(markup.type).toBe(markupObj.type);
    });
  });

  describe("inlineKeyboard", () => {
    it("should return the inline keyboard string in the format expected by Telegram Bot API", () => {
      const markup1 = new Markup()
        .setText("button1")
        .setAction("click1")
        .setType("callback_data");
      const markup2 = new Markup()
        .setText("button2")
        .setAction("click2")
        .setType("callback_data");
      const markup3 = new Markup()
        .setText("button3")
        .setAction("click3")
        .setType("callback_data");
      const markups = [[markup1, markup2], [markup3]];
      const expectedString = JSON.stringify({
        inline_keyboard: [
          [
            {
              text: "button1",
              remove_keyboard: false,
              callback_data: "click1",
            },
            {
              text: "button2",
              remove_keyboard: false,
              callback_data: "click2",
            },
          ],
          [
            {
              text: "button3",
              remove_keyboard: false,
              callback_data: "click3",
            },
          ],
        ],
      });

      const result = Markup.inlineKeyboard(markups);
      expect(result).toBe(expectedString);
    });
  });

  describe("addMarkupArray", () => {
    it("should generate a JSON string representing a reply markup object with an inline keyboard", () => {
      const arrayMarkup = [
        [{ text: "button1", callback_data: "click1" }],
        [{ text: "button2", callback_data: "click2" }],
      ];
      const expectedString = JSON.stringify({
        inline_keyboard: [
          [{ text: "button1", callback_data: "click1" }],
          [{ text: "button2", callback_data: "click2" }],
        ],
      });
      const result = Markup.addMarkupArray(arrayMarkup);
      expect(result).toBe(expectedString);
    });

    it("should generate a JSON string with the desired length of the markup array", () => {
      const arrayMarkup = [
        [{ text: "button1", callback_data: "click1" }],
        [{ text: "button2", callback_data: "click2" }],
        [{ text: "button3", callback_data: "click3" }],
      ];
      const arrayLength = 2;
      const expectedString = JSON.stringify({
        inline_keyboard: [
          [{ text: "button1", callback_data: "click1" }],
          [{ text: "button2", callback_data: "click2" }],
        ],
      });
      const result = Markup.addMarkupArray(arrayMarkup, arrayLength);
      expect(result).toBe(expectedString);
    });
  });
});
