const { Markup } = require("../dist/cjs/index");

describe("Markup", () => {
  let markup;

  beforeEach(() => {
    markup = new Markup();
  });

  describe("setText", () => {
    it("should set the text property of reply_markup", () => {
      const text = "Sample text";
      markup.setText(text);
      expect(markup.reply_markup.text).toEqual(text);
    });
  });

  describe("selective", () => {
    it("should set the selective property of reply_markup to true by default", () => {
      markup.selective();
      expect(markup.reply_markup.selective).toEqual(true);
    });

    it("should set the selective property of reply_markup to the provided value", () => {
      markup.selective(false);
      expect(markup.reply_markup.selective).toEqual(false);
    });
  });

  describe("placeholder", () => {
    it("should set the input_field_placeholder property of reply_markup", () => {
      const placeholder = "Enter value";
      markup.placeholder(placeholder);
      expect(markup.reply_markup.input_field_placeholder).toEqual(placeholder);
    });
  });

  describe("resize", () => {
    it("should set the resize_keyboard property of reply_markup to true by default", () => {
      markup.resize();
      expect(markup.reply_markup.resize_keyboard).toEqual(true);
    });

    it("should set the resize_keyboard property of reply_markup to the provided value", () => {
      markup.resize(false);
      expect(markup.reply_markup.resize_keyboard).toEqual(false);
    });
  });

  describe("oneTime", () => {
    it("should set the one_time_keyboard property of reply_markup to true by default", () => {
      markup.oneTime();
      expect(markup.reply_markup.one_time_keyboard).toEqual(true);
    });

    it("should set the one_time_keyboard property of reply_markup to the provided value", () => {
      markup.oneTime(false);
      expect(markup.reply_markup.one_time_keyboard).toEqual(false);
    });
  });

  describe("removeKeyboard", () => {
    it("should set the remove_keyboard property of reply_markup to true", () => {
      markup.removeKeyboard();
      expect(markup.reply_markup.remove_keyboard).toEqual(true);
    });
  });

  describe("forceReply", () => {
    it("should set the force_reply property of reply_markup to true", () => {
      markup.forceReply();
      expect(markup.reply_markup.force_reply).toEqual(true);
    });
  });

  describe("keyboard", () => {
    it("should set the keyboard property of reply_markup with the provided buttons", () => {
      const buttons = [Markup.text("Button 1"), Markup.text("Button 2")];
      markup.keyboard(buttons, {});
      expect(markup.reply_markup.keyboard).toEqual([
        [buttons[0]],
        [buttons[1]],
      ]);
    });
  });

  describe("inlineKeyboard", () => {
    it("should set the inline_keyboard property of reply_markup with the provided buttons", () => {
      const buttons = [Markup.text("Button 1"), Markup.text("Button 2")];
      markup.inlineKeyboard(buttons, {
        columns: 1,
      });
      expect(markup.reply_markup.inline_keyboard).toEqual([
        [buttons[0]],
        [buttons[1]],
      ]);
    });
  });

  describe("static methods", () => {
    it("should create the correct Button object", () => {
      const button = Markup.text("Button text");
      expect(button).toEqual({ text: "Button text" });
    });
  });
});
