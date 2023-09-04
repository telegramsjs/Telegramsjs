const { Keyboard } = require("../dist/index");

describe("Keyboard options", () => {
  test("all options", () => {
    const keyboard = new Keyboard({
      keyboard: [[]],
      resize_keyboard: true,
      one_time_keyboard: true,
      selective: true,
      input_field_placeholder: "Search",
      remove_keyboard: true,
    });

    expect(keyboard.buttons).toEqual([[]]);
    expect(keyboard.isResize).toBe(true);
    expect(keyboard.isOneTime).toBe(true);
    expect(keyboard.isSelective).toBe(true);
    expect(keyboard.placeholderText).toBe("Search");
    expect(keyboard.isRemoveKeyboard).toBe(true);
  });

  test("keyboard", () => {
    const keyboard = new Keyboard({
      keyboard: [["key1", "key2"]],
    });

    expect(keyboard.buttons).toEqual([["key1", "key2"]]);
    keyboard.buttons = [[]];
    expect(keyboard.buttons).toEqual([[]]);
  });

  test("resize_keyboard", () => {
    const keyboard = new Keyboard({
      resize_keyboard: false,
    });

    expect(keyboard.isResize).toBe(false);
    keyboard.isResize = true;
    expect(keyboard.isResize).toBe(true);
  });

  test("one_time_keyboard", () => {
    const keyboard = new Keyboard({
      one_time_keyboard: false,
    });

    expect(keyboard.isOneTime).toBe(false);
    keyboard.isOneTime = true;
    expect(keyboard.isOneTime).toBe(true);
  });

  test("selective", () => {
    const keyboard = new Keyboard({
      selective: false,
    });

    expect(keyboard.isSelective).toBe(false);
    keyboard.isSelective = true;
    expect(keyboard.isSelective).toBe(true);
  });

  test("input_field_placeholder", () => {
    const keyboard = new Keyboard({
      input_field_placeholder: "Search",
    });

    expect(keyboard.placeholderText).toBe("Search");
    keyboard.placeholderText = undefined;
    expect(keyboard.placeholderText).toBe(undefined);
  });

  test("remove_keyboard", () => {
    const keyboard = new Keyboard({
      remove_keyboard: false,
    });

    expect(keyboard.isRemoveKeyboard).toBe(false);
    keyboard.isRemoveKeyboard = true;
    expect(keyboard.isRemoveKeyboard).toBe(true);
  });
});

describe("test methods", () => {
  test("keyboard", () => {
    const keyboard1 = new Keyboard().keyboard(["key1", "key2"]);

    expect(keyboard1.buttons).toEqual([["key1", "key2"]]);

    const keyboard2 = new Keyboard().keyboard("key1");

    expect(keyboard2.buttons).toEqual([["key1"]]);
  });

  test("row", () => {
    const keyboard = new Keyboard().keyboard(["key1"]).row().keyboard("key2");

    expect(keyboard.buttons).toEqual([["key1"], ["key2"]]);
  });

  test("sort", () => {
    const keyboard = new Keyboard().keyboard(["key1", "key3", "key2"]).sort();

    expect(keyboard.buttons).toEqual([["key1", "key2", "key3"]]);
  });

  test("from", () => {
    const fromKeyboard = Keyboard.from([["key1", "key2"]], {
      resize_keyboard: true,
      one_time_keyboard: true,
      selective: true,
      input_field_placeholder: "Search",
      remove_keyboard: true,
    });

    expect(fromKeyboard.keyboard).toEqual([["key1", "key2"]]);
    expect(fromKeyboard.resize_keyboard).toBe(true);
    expect(fromKeyboard.one_time_keyboard).toBe(true);
    expect(fromKeyboard.selective).toBe(true);
    expect(fromKeyboard.input_field_placeholder).toBe("Search");
    expect(fromKeyboard.remove_keyboard).toBe(true);

    const fromKeyboardDefault = Keyboard.from();

    expect(fromKeyboardDefault.keyboard).toEqual(undefined);
    expect(fromKeyboardDefault.resize_keyboard).toBe(false);
    expect(fromKeyboardDefault.one_time_keyboard).toBe(false);
    expect(fromKeyboardDefault.selective).toBe(undefined);
    expect(fromKeyboardDefault.input_field_placeholder).toBe(undefined);
    expect(fromKeyboardDefault.remove_keyboard).toBe(false);
  });

  test("removeKeyboard", () => {
    const keyboard = new Keyboard().removeKeyboard();

    expect(keyboard.isRemoveKeyboard).toBe(true);
    keyboard.removeKeyboard(false);
    expect(keyboard.isRemoveKeyboard).toBe(false);
  });

  test("oneTime", () => {
    const keyboard = new Keyboard().oneTime();

    expect(keyboard.isOneTime).toBe(true);
    keyboard.oneTime(false);
    expect(keyboard.isOneTime).toBe(false);
  });

  test("resize", () => {
    const keyboard = new Keyboard().resize();

    expect(keyboard.isResize).toBe(true);
    keyboard.resize(false);
    expect(keyboard.isResize).toBe(false);
  });

  test("placeholder", () => {
    const keyboard = new Keyboard().placeholder("Test");

    expect(keyboard.placeholderText).toBe("Test");
    keyboard.placeholder(false);
    expect(keyboard.placeholderText).toBe(false);
  });

  test("selective", () => {
    const keyboard = new Keyboard().selective();

    expect(keyboard.isSelective).toBe(true);
    keyboard.selective(false);
    expect(keyboard.isSelective).toBe(false);
  });

  test("build", () => {
    const keyboard = new Keyboard()
      .keyboard("key1")
      .row()
      .keyboard("key2")
      .build();

    expect(keyboard).toEqual({
      keyboard: [["key1"], ["key2"]],
      one_time_keyboard: false,
      resize_keyboard: false,
      remove_keyboard: undefined,
    });
  });
});
