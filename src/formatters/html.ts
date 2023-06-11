import { ParameterError } from "../errorcollection";

/**
 * Creates bold text
 *
 * @param {string} text - The text to be formatted as bold
 * @throws {ParameterError} If the `text` parameter is missing
 * @returns {string} The input text formatted as bold
 */
export function bold(text: string): string {
  if (!text) {
    throw new ParameterError('missing required argument: text');
  }
  return `<b>${text}</b>`;
}

/**
 * Creates italic text
 *
 * @param {string} text - The text to be formatted as italic
 * @throws {ParameterError} If the `text` parameter is missing
 * @returns {string} The input text formatted as italic
 */
export function italic(text: string): string {
  if (!text) {
    throw new ParameterError('missing required argument: text');
  }
  return `<i>${text}</i>`;
}

/**
 * Creates underlined text
 *
 * @param {string} text - The text to be formatted as underlined
 * @throws {ParameterError} If the `text` parameter is missing
 * @returns {string} The input text formatted as underlined
 */
export function underline(text: string): string {
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
export function strikethrough(text: string): string {
  if (!text) {
    throw new ParameterError('missing required argument: text');
  }
  return `<s>${text}</s>`;
}

/**
 * Creates inline code
 *
 * @param {string} text - The code to be formatted as inline code
 * @throws {ParameterError} If the `text` parameter is missing
 * @returns {string} The input code formatted as inline code
 */
export function code(text: string): string {
  if (!text) {
    throw new ParameterError('missing required argument: text');
  }
  return `<code>${text}</code>`;
}

/**
 * Creates a hyperlink
 *
 * @param {string} text - The text to be used as the hyperlink's anchor text
 * @param {string} url - The URL that the hyperlink should point to
 * @throws {ParameterError} If either the `text` or `url` parameter is missing
 * @returns {string} An HTML hyperlink element with the specified text and URL
 */
export function link(text: string, url: string): string {
  if (!text) {
    throw new ParameterError('missing required argument: text');
  }
  if (!url) {
    throw new ParameterError('missing required argument: url');
  }
  return `<a href="${url}">${text}</a>`;
}

/**
 * Creates an image element
 *
 * @param {string} url - The URL of the image
 * @param {string} alt - The alternate text to be displayed if the image cannot be loaded
 * @throws {ParameterError} If the `url` parameter is missing
 * @returns {string} An HTML image element with the specified URL and alternate text
 */
export function image(url: string, alt: string): string {
  if (!url) {
    throw new ParameterError('missing required argument: url');
  }
  return `<img src="${url}" alt="${alt}">`;
}

/**
 * Creates a paragraph element
 *
 * @param {string} text - The text to be wrapped in a paragraph element
 * @throws {ParameterError} If the `text` parameter is missing
 * @returns {string} An HTML paragraph element containing the input text
 */
export function paragraph(text: string): string {
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
 * @returns {string} An HTML list element containing the specified list items
 */
export function list(items: any[], ordered: boolean = false): string {
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
export function codeBlock(code: string, language: string = ''): string {
  if (!code) {
    throw new ParameterError('missing required argument: code');
  }
  return `<pre><code class="language-${language}">${code}</code></pre>`;
}