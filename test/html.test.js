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
<<<<<<< HEAD
} = require('../dist/index').html;

const { ParameterError } = require('../dist/errorcollection');

describe('bold', () => {
  test('should format text as bold', () => {
    const text = 'Hello, world!';
    const result = bold(text);
    expect(result).toBe('<b>Hello, world!</b>');
  });

  test('should throw ParameterError if text is missing', () => {
=======
} = require("../dist/index").html;

const { ParameterError } = require("../dist/errorcollection");

describe("bold", () => {
  test("should format text as bold", () => {
    const text = "Hello, world!";
    const result = bold(text);
    expect(result).toBe("<b>Hello, world!</b>");
  });

  test("should throw ParameterError if text is missing", () => {
>>>>>>> 38a3db8 (add @grammyjs/types and action. beginning)
    expect(() => {
      bold();
    }).toThrow(ParameterError);
  });
});

<<<<<<< HEAD
describe('italic', () => {
  test('should format text as italic', () => {
    const text = 'Hello, world!';
    const result = italic(text);
    expect(result).toBe('<i>Hello, world!</i>');
  });

  test('should throw ParameterError if text is missing', () => {
=======
describe("italic", () => {
  test("should format text as italic", () => {
    const text = "Hello, world!";
    const result = italic(text);
    expect(result).toBe("<i>Hello, world!</i>");
  });

  test("should throw ParameterError if text is missing", () => {
>>>>>>> 38a3db8 (add @grammyjs/types and action. beginning)
    expect(() => {
      italic();
    }).toThrow(ParameterError);
  });
});

<<<<<<< HEAD
describe('underline', () => {
  test('should format text as underlined', () => {
    const text = 'Hello, world!';
    const result = underline(text);
    expect(result).toBe('<u>Hello, world!</u>');
  });

  test('should throw ParameterError if text is missing', () => {
=======
describe("underline", () => {
  test("should format text as underlined", () => {
    const text = "Hello, world!";
    const result = underline(text);
    expect(result).toBe("<u>Hello, world!</u>");
  });

  test("should throw ParameterError if text is missing", () => {
>>>>>>> 38a3db8 (add @grammyjs/types and action. beginning)
    expect(() => {
      underline();
    }).toThrow(ParameterError);
  });
});

<<<<<<< HEAD
describe('strikethrough', () => {
  test('should format text as strikethrough', () => {
    const text = 'Hello, world!';
    const result = strikethrough(text);
    expect(result).toBe('<s>Hello, world!</s>');
  });

  test('should throw ParameterError if text is missing', () => {
=======
describe("strikethrough", () => {
  test("should format text as strikethrough", () => {
    const text = "Hello, world!";
    const result = strikethrough(text);
    expect(result).toBe("<s>Hello, world!</s>");
  });

  test("should throw ParameterError if text is missing", () => {
>>>>>>> 38a3db8 (add @grammyjs/types and action. beginning)
    expect(() => {
      strikethrough();
    }).toThrow(ParameterError);
  });
});

<<<<<<< HEAD
describe('code', () => {
  test('should format text as inline code', () => {
=======
describe("code", () => {
  test("should format text as inline code", () => {
>>>>>>> 38a3db8 (add @grammyjs/types and action. beginning)
    const text = 'console.log("Hello, world!");';
    const result = code(text);
    expect(result).toBe('<code>console.log("Hello, world!");</code>');
  });

<<<<<<< HEAD
  test('should throw ParameterError if text is missing', () => {
=======
  test("should throw ParameterError if text is missing", () => {
>>>>>>> 38a3db8 (add @grammyjs/types and action. beginning)
    expect(() => {
      code();
    }).toThrow(ParameterError);
  });
});

<<<<<<< HEAD
describe('link', () => {
  test('should create a hyperlink', () => {
    const text = 'OpenAI';
    const url = 'https://openai.com';
=======
describe("link", () => {
  test("should create a hyperlink", () => {
    const text = "OpenAI";
    const url = "https://openai.com";
>>>>>>> 38a3db8 (add @grammyjs/types and action. beginning)
    const result = link(text, url);
    expect(result).toBe('<a href="https://openai.com">OpenAI</a>');
  });

<<<<<<< HEAD
  test('should throw ParameterError if text is missing', () => {
    expect(() => {
      link(undefined, 'https://openai.com');
    }).toThrow(ParameterError);
  });

  test('should throw ParameterError if url is missing', () => {
    expect(() => {
      link('OpenAI', undefined);
=======
  test("should throw ParameterError if text is missing", () => {
    expect(() => {
      link(undefined, "https://openai.com");
    }).toThrow(ParameterError);
  });

  test("should throw ParameterError if url is missing", () => {
    expect(() => {
      link("OpenAI", undefined);
>>>>>>> 38a3db8 (add @grammyjs/types and action. beginning)
    }).toThrow(ParameterError);
  });
});

<<<<<<< HEAD
describe('image', () => {
  test('should create an image element', () => {
    const url = 'https://example.com/image.jpg';
    const alt = 'Example Image';
    const result = image(url, alt);
    expect(result).toBe('<img src="https://example.com/image.jpg" alt="Example Image">');
  });

  test('should throw ParameterError if url is missing', () => {
    expect(() => {
      image(undefined, 'Example Image');
=======
describe("image", () => {
  test("should create an image element", () => {
    const url = "https://example.com/image.jpg";
    const alt = "Example Image";
    const result = image(url, alt);
    expect(result).toBe(
      '<img src="https://example.com/image.jpg" alt="Example Image">'
    );
  });

  test("should throw ParameterError if url is missing", () => {
    expect(() => {
      image(undefined, "Example Image");
>>>>>>> 38a3db8 (add @grammyjs/types and action. beginning)
    }).toThrow(ParameterError);
  });
});

<<<<<<< HEAD
describe('paragraph', () => {
  test('should create a paragraph element', () => {
    const text = 'This is a paragraph.';
    const result = paragraph(text);
    expect(result).toBe('This is a paragraph.\n\n');
  });

  test('should throw ParameterError if text is missing', () => {
=======
describe("paragraph", () => {
  test("should create a paragraph element", () => {
    const text = "This is a paragraph.";
    const result = paragraph(text);
    expect(result).toBe("This is a paragraph.\n\n");
  });

  test("should throw ParameterError if text is missing", () => {
>>>>>>> 38a3db8 (add @grammyjs/types and action. beginning)
    expect(() => {
      paragraph();
    }).toThrow(ParameterError);
  });
});

<<<<<<< HEAD
describe('list', () => {
  test('should create an unordered list', () => {
    const items = ['Item 1', 'Item 2', 'Item 3'];
    const result = list(items);
    expect(result).toBe('* Item 1\n* Item 2\n* Item 3\n\n');
  });

  test('should create an ordered list', () => {
    const items = ['Item 1', 'Item 2', 'Item 3'];
    const result = list(items, true);
    expect(result).toBe('1. Item 1\n1. Item 2\n1. Item 3\n\n');
  });

  test('should throw ParameterError if items is missing', () => {
=======
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
>>>>>>> 38a3db8 (add @grammyjs/types and action. beginning)
    expect(() => {
      list(undefined);
    }).toThrow(ParameterError);
  });
});

<<<<<<< HEAD
describe('codeBlock', () => {
  test('should create a code block element', () => {
=======
describe("codeBlock", () => {
  test("should create a code block element", () => {
>>>>>>> 38a3db8 (add @grammyjs/types and action. beginning)
    const code = 'function sayHello() {\n  console.log("Hello, world!");\n}';
    const result = codeBlock(code);
    expect(result).toBe(`<pre><code class="language-">${code}</code></pre>`);
  });

<<<<<<< HEAD
  test('should throw ParameterError if code is missing', () => {
=======
  test("should throw ParameterError if code is missing", () => {
>>>>>>> 38a3db8 (add @grammyjs/types and action. beginning)
    expect(() => {
      codeBlock();
    }).toThrow(ParameterError);
  });
});
