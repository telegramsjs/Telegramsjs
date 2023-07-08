const { Keyboard } = require("../dist/index");

describe("Keyboard", () => {
  describe("constructor", () => {
    test("should initialize markups, inline, resize, oneTime, and selective properties", () => {
      const markups = [["Button 1", "Button 2"], ["Button 3"]];
      const options = {
        inline: true,
        resize: true,
        oneTime: true,
        selective: true,
      };

      const keyboard = new Keyboard(markups, options);

      expect(keyboard.keyboard).toEqual(markups);
      expect(keyboard.inline).toBe(true);
      expect(keyboard.resize).toBe(true);
      expect(keyboard.oneTime).toBe(true);
      expect(keyboard.selective).toBe(true);
    });

    test("should initialize markups, inline, resize, oneTime, and selective properties with default values", () => {
      const markups = [["Button 1"], ["Button 2"]];
      const options = {};

      const keyboard = new Keyboard(markups, options);

      expect(keyboard.keyboard).toEqual(markups);
      expect(keyboard.inline).toBe(false);
      expect(keyboard.resize).toBe(false);
      expect(keyboard.oneTime).toBe(false);
      expect(keyboard.selective).toBe(false);
    });

    test("should initialize markups with an empty array if not provided", () => {
      const keyboard = new Keyboard();

      expect(keyboard.keyboard).toEqual([]);
    });
  });

  describe("toJSON", () => {
    test("should return the keyboard object in the expected format", () => {
      const markups = [["Button 1", "Button 2"]];
      const options = {
        resize: true,
        oneTime: true,
        selective: false,
      };
      const keyboard = new Keyboard(markups, options);

      const expectedJSON = {
        keyboard: markups,
        resize_keyboard: true,
        one_time_keyboard: true,
        selective: false,
      };
      const result = keyboard.toJSON();

      expect(result).toEqual(expectedJSON);
    });
  });

  describe("setInline", () => {
    test("should set the inline option of the keyboard", () => {
      const keyboard = new Keyboard();
      const inline = true;

      keyboard.setInline(inline);

      expect(keyboard.inline).toBe(true);
    });
  });

  describe("setResize", () => {
    test("should set the resize option of the keyboard", () => {
      const keyboard = new Keyboard();
      const resize = true;

      keyboard.setResize(resize);

      expect(keyboard.resize).toBe(true);
    });
  });

  describe("setOneTime", () => {
    test("should set the oneTime option of the keyboard", () => {
      const keyboard = new Keyboard();
      const oneTime = true;

      keyboard.setOneTime(oneTime);

      expect(keyboard.oneTime).toBe(true);
    });
  });

  describe("setSelective", () => {
    test("should set the selective option of the keyboard", () => {
      const keyboard = new Keyboard();
      const selective = true;

      keyboard.setSelective(selective);

      expect(keyboard.selective).toBe(true);
    });
  });

  describe("addKeyboard", () => {
    test("should add markup rows to the keyboard", () => {
      const keyboard = new Keyboard();
      const markupRows = [["Button 1"], ["Button 2"]];

      keyboard.addKeyboard(markupRows);

      expect(keyboard.keyboard).toEqual(markupRows);
    });

    test("should add markup rows to the keyboard with defaults", () => {
      const keyboard = new Keyboard();
      const markupRows = [["Button 1"], ["Button 2"]];

      keyboard.addKeyboard(markupRows, true);

      expect(keyboard.keyboard).toEqual(markupRows);
    });

    test("should add single markup row to the keyboard", () => {
      const keyboard = new Keyboard();
      const markupRow = ["Button 1"];

      keyboard.addKeyboard(markupRow);

      expect(keyboard.keyboard).toEqual([markupRow]);
    });
  });
});
