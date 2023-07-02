<<<<<<< HEAD
const { Keyboard } = require('../dist/index');

describe('Keyboard', () => {
  describe('constructor', () => {
    test('should initialize markups, inline, resize, oneTime, and selective properties', () => {
      const markups = [['Button 1', 'Button 2'], ['Button 3']];
=======
const { Keyboard } = require("../dist/index");

describe("Keyboard", () => {
  describe("constructor", () => {
    test("should initialize markups, inline, resize, oneTime, and selective properties", () => {
      const markups = [["Button 1", "Button 2"], ["Button 3"]];
>>>>>>> 38a3db8 (add @grammyjs/types and action. beginning)
      const options = {
        inline: true,
        resize: true,
        oneTime: true,
        selective: true,
      };

      const keyboard = new Keyboard(markups, options);

      expect(keyboard.markups).toEqual(markups);
      expect(keyboard.inline).toBe(true);
      expect(keyboard.resize).toBe(true);
      expect(keyboard.oneTime).toBe(true);
      expect(keyboard.selective).toBe(true);
    });

<<<<<<< HEAD
    test('should initialize markups, inline, resize, oneTime, and selective properties with default values', () => {
      const markups = [['Button 1'], ['Button 2']];
=======
    test("should initialize markups, inline, resize, oneTime, and selective properties with default values", () => {
      const markups = [["Button 1"], ["Button 2"]];
>>>>>>> 38a3db8 (add @grammyjs/types and action. beginning)
      const options = {};

      const keyboard = new Keyboard(markups, options);

      expect(keyboard.markups).toEqual(markups);
      expect(keyboard.inline).toBe(false);
      expect(keyboard.resize).toBe(false);
      expect(keyboard.oneTime).toBe(false);
      expect(keyboard.selective).toBe(false);
    });

<<<<<<< HEAD
    test('should initialize markups with an empty array if not provided', () => {
=======
    test("should initialize markups with an empty array if not provided", () => {
>>>>>>> 38a3db8 (add @grammyjs/types and action. beginning)
      const keyboard = new Keyboard();

      expect(keyboard.markups).toEqual([]);
    });
  });

<<<<<<< HEAD
  describe('toJSON', () => {
    test('should return the keyboard object in the expected format', () => {
      const markups = [['Button 1', 'Button 2']];
=======
  describe("toJSON", () => {
    test("should return the keyboard object in the expected format", () => {
      const markups = [["Button 1", "Button 2"]];
>>>>>>> 38a3db8 (add @grammyjs/types and action. beginning)
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

<<<<<<< HEAD
  describe('setInline', () => {
    test('should set the inline option of the keyboard', () => {
=======
  describe("setInline", () => {
    test("should set the inline option of the keyboard", () => {
>>>>>>> 38a3db8 (add @grammyjs/types and action. beginning)
      const keyboard = new Keyboard();
      const inline = true;

      keyboard.setInline(inline);

      expect(keyboard.inline).toBe(true);
    });
  });

<<<<<<< HEAD
  describe('setResize', () => {
    test('should set the resize option of the keyboard', () => {
=======
  describe("setResize", () => {
    test("should set the resize option of the keyboard", () => {
>>>>>>> 38a3db8 (add @grammyjs/types and action. beginning)
      const keyboard = new Keyboard();
      const resize = true;

      keyboard.setResize(resize);

      expect(keyboard.resize).toBe(true);
    });
  });

<<<<<<< HEAD
  describe('setOneTime', () => {
    test('should set the oneTime option of the keyboard', () => {
=======
  describe("setOneTime", () => {
    test("should set the oneTime option of the keyboard", () => {
>>>>>>> 38a3db8 (add @grammyjs/types and action. beginning)
      const keyboard = new Keyboard();
      const oneTime = true;

      keyboard.setOneTime(oneTime);

      expect(keyboard.oneTime).toBe(true);
    });
  });

<<<<<<< HEAD
  describe('setSelective', () => {
    test('should set the selective option of the keyboard', () => {
=======
  describe("setSelective", () => {
    test("should set the selective option of the keyboard", () => {
>>>>>>> 38a3db8 (add @grammyjs/types and action. beginning)
      const keyboard = new Keyboard();
      const selective = true;

      keyboard.setSelective(selective);

      expect(keyboard.selective).toBe(true);
    });
  });

<<<<<<< HEAD
  describe('addKeyboard', () => {
    test('should add markup rows to the keyboard', () => {
      const keyboard = new Keyboard();
      const markupRows = [['Button 1'], ['Button 2']];
=======
  describe("addKeyboard", () => {
    test("should add markup rows to the keyboard", () => {
      const keyboard = new Keyboard();
      const markupRows = [["Button 1"], ["Button 2"]];
>>>>>>> 38a3db8 (add @grammyjs/types and action. beginning)

      keyboard.addKeyboard(markupRows);

      expect(keyboard.markups).toEqual(markupRows);
    });

<<<<<<< HEAD
    test('should add markup rows to the keyboard with defaults', () => {
      const keyboard = new Keyboard();
      const markupRows = [['Button 1'], ['Button 2']];
=======
    test("should add markup rows to the keyboard with defaults", () => {
      const keyboard = new Keyboard();
      const markupRows = [["Button 1"], ["Button 2"]];
>>>>>>> 38a3db8 (add @grammyjs/types and action. beginning)

      keyboard.addKeyboard(markupRows, true);

      expect(keyboard.markups).toEqual(markupRows);
    });

<<<<<<< HEAD
    test('should add single markup row to the keyboard', () => {
      const keyboard = new Keyboard();
      const markupRow = ['Button 1'];
=======
    test("should add single markup row to the keyboard", () => {
      const keyboard = new Keyboard();
      const markupRow = ["Button 1"];
>>>>>>> 38a3db8 (add @grammyjs/types and action. beginning)

      keyboard.addKeyboard(markupRow);

      expect(keyboard.markups).toEqual([markupRow]);
    });
  });
});
