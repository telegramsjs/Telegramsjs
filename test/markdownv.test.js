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
} = require("../dist/index").markdownv;

const { ParameterError } = require("../dist/errorcollection");

describe("bold", () => {
  test("should format text as bold", () => {
    const text = "Hello, world!";
    const result = bold(text);
    expect(result).toBe("**Hello, world!**");
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
    expect(result).toBe("_Hello, world!_");
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
    expect(result).toBe("__Hello, world!__");
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
    expect(result).toBe("~~Hello, world!~~");
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
    expect(result).toBe('```\nconsole.log("Hello, world!");\n```');
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
    expect(result).toBe("[OpenAI](https://openai.com)");
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
    expect(result).toBe("![Example Image](https://example.com/image.jpg)");
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
    expect(result).toBe("1. Item 1\n2. Item 2\n3. Item 3\n\n");
  });

  test("should create an ordered list", () => {
    const items = ["Item 1", "Item 2", "Item 3"];
    const result = list(items, true);
    expect(result).toBe("1. Item 1\n2. Item 2\n3. Item 3\n\n");
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
    expect(result).toBe(
      '```\nfunction sayHello() {\n  console.log("Hello, world!");\n}\n```',
    );
  });

  test("should throw ParameterError if code is missing", () => {
    expect(() => {
      codeBlock();
    }).toThrow(ParameterError);
  });
});
