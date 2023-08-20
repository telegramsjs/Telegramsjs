const {
  bold,
  italic,
  underline,
  strikethrough,
  spoiler,
  inlineCode,
  codeBlock,
  codeBlockWithLanguage,
} = require("../dist/cjs/index").markdownv;

describe("Text formatting functions", () => {
  test("bold()", () => {
    expect(bold("Hello")).toBe("*Hello*");
  });

  test("italic()", () => {
    expect(italic("Hello")).toBe("_Hello_");
  });

  test("underline()", () => {
    expect(underline("Hello")).toBe("__Hello__");
  });

  test("strikethrough()", () => {
    expect(strikethrough("Hello")).toBe("~Hello~");
  });

  test("spoiler()", () => {
    expect(spoiler("Hello")).toBe("||Hello||");
  });

  test("inlineCode()", () => {
    expect(inlineCode("const a = 5;")).toBe("`const a = 5;`");
  });

  test("codeBlock()", () => {
    expect(codeBlock("const a = 5;")).toBe("```\nconst a = 5;\n```");
  });

  test("codeBlockWithLanguage()", () => {
    expect(codeBlockWithLanguage("const a = 5;", "javascript")).toBe(
      "```javascript\nconst a = 5;\n```",
    );
  });
});
