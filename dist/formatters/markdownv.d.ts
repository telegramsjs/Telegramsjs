/**
 * Creates bold text
 *
 * @param {string} text - The text to be formatted as bold
 * @throws {ParameterError} If the `text` parameter is missing
 * @returns {string} The input text formatted as bold
 */
export declare function bold(text: string): string;
/**
 * Creates italic text
 *
 * @param {string} text - The text to be formatted as italic
 * @throws {ParameterError} If the `text` parameter is missing
 * @returns {string} The input text formatted as italic
 */
export declare function italic(text: string): string;
/**
 * Creates underlined text
 *
 * @param {string} text - The text to be formatted as underlined
 * @throws {ParameterError} If the `text` parameter is missing
 * @returns {string} The input text formatted as underlined
 */
export declare function underline(text: string): string;
/**
 * Creates strikethrough text
 *
 * @param {string} text - The text to be formatted as strikethrough
 * @throws {ParameterError} If the `text` parameter is missing
 * @returns {string} The input text formatted as strikethrough
 */
export declare function strikethrough(text: string): string;
/**
 * Creates inline code
 *
 * @param {string} text - The code to be formatted as inline code
 * @throws {ParameterError} If the `text` parameter is missing
 * @returns {string} The input code formatted as inline code
 */
export declare function code(text: string, language?: string): string;
/**
 * Creates a hyperlink
 *
 * @param {string} text - The text to be used as the hyperlink's anchor text
 * @param {string} url - The URL that the hyperlink should point to
 * @throws {ParameterError} If either the `text` or `url` parameter is missing
 * @returns {string} An md hyperlink element with the specified text and URL
 */
export declare function link(text: string, url: string): string;
/**
 * Creates an image element
 *
 * @param {string} url - The URL of the image
 * @param {string} alt - The alternate text to be displayed if the image cannot be loaded
 * @throws {ParameterError} If the `url` parameter is missing
 * @returns {string} An Md image element with the specified URL and alternate text
 */
export declare function image(url: string, alt: string): string;
/**
 * Returns a heading tag with the specified text and level.
 * @param {string} text - The text to include in the heading.
 * @param {number} [level=1] - The level of the heading (1-6). Defaults to 1.
 * @throws {ParameterError} If the text parameter is not provided or if the level is outside the valid range.
 * @returns {string} The heading tag with the specified text and level.
 */
export declare function heading(text: string, level?: number): string;
/**
 * Creates a paragraph element
 *
 * @param {string} text - The text to be wrapped in a paragraph element
 * @throws {ParameterError} If the `text` parameter is missing
 * @returns {string} An Md paragraph element containing the input text
 */
export declare function paragraph(text: string): string;
/**
 * Creates a list element
 *
 * @param {string[]} items - The list items to be included in the list
 * @param {boolean} [ordered=false] - Whether the list should be ordered (default: false)
 * @throws {ParameterError} If the `items` parameter is missing
 * @returns {string} An md list element containing the specified list items
 */
export declare function list(items: any[], ordered?: boolean): string;
/**
 * Creates a code block element
 *
 * @param {string} code - The code to be displayed in the code block
 * @param {string} [language=''] - The programming language of the code (default: '')
 * @throws {ParameterError} If the `code` parameter is missing
 * @returns {string} An HTML code block element containing
 **/
export declare function codeBlock(code: string, language?: string): string;
