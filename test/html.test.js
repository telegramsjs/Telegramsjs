const {
  bold,
  italic,
  underline,
  strikethrough,
  code,
  link,
  image,
  paragraph,
  list,
  codeBlock,
} = require("../dist/index").html;

const { ParameterError } = require("../dist/errorcollection");

describe("bold", () => {
  test("should format text as bold", () => {
    const text = "Hello, world!";
    const result = bold(text);
    expect(result).toBe("<b>Hello, world!</b>");
  });

  test("should throw ParameterError if text is missing", () => {
    expect(() => {
      bold();
    }).toThrow(ParameterError);
  });
});

describe("italic", () => {
  test("should format text as italic", () => {
    const text = "Hello, world!";
    const result = italic(text);
    expect(result).toBe("<i>Hello, world!</i>");
  });

  test("should throw ParameterError if text is missing", () => {
    expect(() => {
      italic();
    }).toThrow(ParameterError);
  });
});

describe("underline", () => {
  test("should format text as underlined", () => {
    const text = "Hello, world!";
    const result = underline(text);
    expect(result).toBe("<u>Hello, world!</u>");
  });

  test("should throw ParameterError if text is missing", () => {
    expect(() => {
      underline();
    }).toThrow(ParameterError);
  });
});

describe("strikethrough", () => {
  test("should format text as strikethrough", () => {
    const text = "Hello, world!";
    const result = strikethrough(text);
    expect(result).toBe("<s>Hello, world!</s>");
  });

  test("should throw ParameterError if text is missing", () => {
    expect(() => {
      strikethrough();
    }).toThrow(ParameterError);
  });
});

describe("code", () => {
  test("should format text as inline code", () => {
    const text = 'console.log("Hello, world!");';
    const result = code(text);
    expect(result).toBe('<code>console.log("Hello, world!");</code>');
  });

  test("should throw ParameterError if text is missing", () => {
    expect(() => {
      code();
    }).toThrow(ParameterError);
  });
});

describe("link", () => {
  test("should create a hyperlink", () => {
    const text = "OpenAI";
    const url = "https://openai.com";
    const result = link(text, url);
    expect(result).toBe('<a href="https://openai.com">OpenAI</a>');
  });

  test("should throw ParameterError if text is missing", () => {
    expect(() => {
      link(undefined, "https://openai.com");
    }).toThrow(ParameterError);
  });

  test("should throw ParameterError if url is missing", () => {
    expect(() => {
      link("OpenAI", undefined);
    }).toThrow(ParameterError);
  });
});

describe("image", () => {
  test("should create an image element", () => {
    const url = "https://example.com/image.jpg";
    const alt = "Example Image";
    const result = image(url, alt);
    expect(result).toBe(
      '<img src="https://example.com/image.jpg" alt="Example Image">',
    );
  });

  test("should throw ParameterError if url is missing", () => {
    expect(() => {
      image(undefined, "Example Image");
    }).toThrow(ParameterError);
  });
});

describe("paragraph", () => {
  test("should create a paragraph element", () => {
    const text = "This is a paragraph.";
    const result = paragraph(text);
    expect(result).toBe("This is a paragraph.\n\n");
  });

  test("should throw ParameterError if text is missing", () => {
    expect(() => {
      paragraph();
    }).toThrow(ParameterError);
  });
});

describe("list", () => {
  test("should create an unordered list", () => {
    const items = ["Item 1", "Item 2", "Item 3"];
    const result = list(items);
    expect(result).toBe("* Item 1\n* Item 2\n* Item 3\n\n");
  });

  test("should create an ordered list", () => {
    const items = ["Item 1", "Item 2", "Item 3"];
    const result = list(items, true);
    expect(result).toBe("1. Item 1\n1. Item 2\n1. Item 3\n\n");
  });

  test("should throw ParameterError if items is missing", () => {
    expect(() => {
      list(undefined);
    }).toThrow(ParameterError);
  });
});

describe("codeBlock", () => {
  test("should create a code block element", () => {
    const code = 'function sayHello() {\n  console.log("Hello, world!");\n}';
    const result = codeBlock(code);
    expect(result).toBe(`<pre><code class="language-">${code}</code></pre>`);
  });

  test("should throw ParameterError if code is missing", () => {
    expect(() => {
      codeBlock();
    }).toThrow(ParameterError);
  });
});
