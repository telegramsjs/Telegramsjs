const { ParameterError } = require("../errorcollection.js");

/**
 * Creates bold text
 *
 * @param {string} text - The text to be formatted as bold
 * @throws {ParameterError} If the `text` parameter is missing
 * @returns {string} The input text formatted as bold
 */
function bold(text) {
  if (!text) {
    throw new ParameterError('missing required argument: text');
  }
  return `**${text}**`;
}

/**
 * Creates italic text
 *
 * @param {string} text - The text to be formatted as italic
 * @throws {ParameterError} If the `text` parameter is missing
 * @returns {string} The input text formatted as italic
 */
function italic(text) {
  if (!text) {
    throw new ParameterError('missing required argument: text');
  }
  return `_${text}_`;
}

/**
 * Creates underlined text
 *
 * @param {string} text - The text to be formatted as underlined
 * @throws {ParameterError} If the `text` parameter is missing
 * @returns {string} The input text formatted as underlined
 */
function underline(text) {
  if (!text) {
    throw new ParameterError('missing required argument: text');
  }
  return `<u>${text}</u>`;
}

/**
 * Creates strikethrough text
 *
 * @param {string} text - The text to be formatted as strikethrough
 * @throws {ParameterError} If the `text` parameter is missing
 * @returns {string} The input text formatted as strikethrough
 */
function strikethrough(text) {
  if (!text) {
    throw new ParameterError('missing required argument: text');
  }
  return `~~${text}~~`;
}

/**
 * Creates inline code
 *
 * @param {string} text - The code to be formatted as inline code
 * @throws {ParameterError} If the `text` parameter is missing
 * @returns {string} The input code formatted as inline code
 */
function code(text, language = '') {
  if (!text) {
    throw new ParameterError('missing required argument: text');
  }
  return `\`\`\`${language}\n${text}\n\`\`\``;
}

/**
 * Creates a hyperlink
 *
 * @param {string} text - The text to be used as the hyperlink's anchor text
 * @param {string} url - The URL that the hyperlink should point to
 * @throws {ParameterError} If either the `text` or `url` parameter is missing
 * @returns {string} An md hyperlink element with the specified text and URL
 */
function link(text, url) {
  if (!text) {
    throw new ParameterError('missing required argument: text');
  }
  if (!url) {
    throw new ParameterError('missing required argument: url');
  }
  return `[${text}](${url})`;
}

/**
 * Creates an image element
 *
 * @param {string} url - The URL of the image
 * @param {string} alt - The alternate text to be displayed if the image cannot be loaded
 * @throws {ParameterError} If the `url` parameter is missing
 * @returns {string} An Md image element with the specified URL and alternate text
 */
function image(url, alt) {
  if (!url) {
    throw new ParameterError('missing required argument: url');
  }
  return `![${alt}](${url})`;
}

/**
 * Returns a heading tag with the specified text and level.
 * @param {string} text - The text to include in the heading.
 * @param {number} [level=1] - The level of the heading (1-6). Defaults to 1.
 * @throws {ParameterError} If the text parameter is not provided or if the level is outside the valid range.
 * @returns {string} The heading tag with the specified text and level.
 */
function heading(text, level = 1) {
  if (!text) {
    throw new ParameterError('missing required argument: text');
  }
  if (level < 1 || level > 6) {
    throw new ParameterError('invalid heading level');
  }
  const hash = '#'.repeat(level);
  return `${hash} ${text}`;
}

/**
 * Creates a paragraph element
 *
 * @param {string} text - The text to be wrapped in a paragraph element
 * @throws {ParameterError} If the `text` parameter is missing
 * @returns {string} An Md paragraph element containing the input text
 */
function paragraph(text) {
  if (!text) {
    throw new ParameterError('missing required argument: text');
  }
  return `${text}\n\n`;
}

/**
 * Creates a list element
 *
 * @param {string[]} items - The list items to be included in the list
 * @param {boolean} [ordered=false] - Whether the list should be ordered (default: false)
 * @throws {ParameterError} If the `items` parameter is missing
 * @returns {string} An md list element containing the specified list items
 */
function list(items, ordered = false) {
  if (!items) {
    throw new ParameterError('missing required argument: items');
  }
  const tag = ordered ? '1.' : '*';
  const listItems = items.map((item) => `${tag} ${item}`).join('\n');
  return `${listItems}\n\n`;
}

/**
 * Creates a code block element
 *
 * @param {string} code - The code to be displayed in the code block
 * @param {string} [language=''] - The programming language of the code (default: '')
 * @throws {ParameterError} If the `code` parameter is missing
 * @returns {string} An HTML code block element containing
 **/
function codeBlock(code, language = '') {
  if (!code) {
    throw new ParameterError('missing required argument: code');
  }
  return `\`\`\`${language}\n${code}\n\`\`\``;
}

module.exports = { bold, italic, underline, strikethrough, code, link, image, heading, paragraph, list, codeBlock };