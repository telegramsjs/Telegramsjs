const {
  bold,
  italic,
  underline,
  strikethrough,
  spoiler,
  link,
  emoji,
  inlineCode,
  preFormattedCode,
  preFormattedCodeWithLanguage,
} = require("../dist/cjs/src/index").html;

describe("Text formatting functions", () => {
  test("bold()", () => {
    expect(bold("Hello")).toBe("<b>Hello</b>");
  });

  test("italic()", () => {
    expect(italic("Hello")).toBe("<i>Hello</i>");
  });

  test("underline()", () => {
    expect(underline("Hello")).toBe("<u>Hello</u>");
  });

  test("strikethrough()", () => {
    expect(strikethrough("Hello")).toBe("<s>Hello</s>");
  });

  test("spoiler()", () => {
    expect(spoiler("Hello")).toBe('<span class="tg-spoiler">Hello</span>');
  });

  test("link()", () => {
    expect(link("ChatGPT", "https://example.com")).toBe(
      '<a href="https://example.com">ChatGPT</a>',
    );
  });

  test("emoji()", () => {
    expect(emoji("123", "😀")).toBe('<tg-emoji emoji-id="123">😀</tg-emoji>');
  });

  test("inlineCode()", () => {
    expect(inlineCode("const a = 5;")).toBe("<code>const a = 5;</code>");
  });

  test("preFormattedCode()", () => {
    expect(preFormattedCode("const a = 5;", "javascript")).toBe(
      "<pre>const a = 5;</pre>",
    );
  });

  test("preFormattedCodeWithLanguage()", () => {
    expect(preFormattedCodeWithLanguage("const a = 5;", "javascript")).toBe(
      '<pre><code class="language-javascript">const a = 5;</code></pre>',
    );
  });
});
