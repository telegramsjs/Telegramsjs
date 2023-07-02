"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeBlock = exports.list = exports.paragraph = exports.image = exports.link = exports.code = exports.strikethrough = exports.underline = exports.italic = exports.bold = void 0;
const errorcollection_1 = require("../errorcollection");
/**
 * Creates bold text
 *
 * @param {string} text - The text to be formatted as bold
 * @throws {ParameterError} If the `text` parameter is missing
 * @returns {string} The input text formatted as bold
 */
function bold(text) {
    if (!text) {
        throw new errorcollection_1.ParameterError("missing required argument: text");
    }
    return `<b>${text}</b>`;
}
exports.bold = bold;
/**
 * Creates italic text
 *
 * @param {string} text - The text to be formatted as italic
 * @throws {ParameterError} If the `text` parameter is missing
 * @returns {string} The input text formatted as italic
 */
function italic(text) {
    if (!text) {
        throw new errorcollection_1.ParameterError("missing required argument: text");
    }
    return `<i>${text}</i>`;
}
exports.italic = italic;
/**
 * Creates underlined text
 *
 * @param {string} text - The text to be formatted as underlined
 * @throws {ParameterError} If the `text` parameter is missing
 * @returns {string} The input text formatted as underlined
 */
function underline(text) {
    if (!text) {
        throw new errorcollection_1.ParameterError("missing required argument: text");
    }
    return `<u>${text}</u>`;
}
exports.underline = underline;
/**
 * Creates strikethrough text
 *
 * @param {string} text - The text to be formatted as strikethrough
 * @throws {ParameterError} If the `text` parameter is missing
 * @returns {string} The input text formatted as strikethrough
 */
function strikethrough(text) {
    if (!text) {
        throw new errorcollection_1.ParameterError("missing required argument: text");
    }
    return `<s>${text}</s>`;
}
exports.strikethrough = strikethrough;
/**
 * Creates inline code
 *
 * @param {string} text - The code to be formatted as inline code
 * @throws {ParameterError} If the `text` parameter is missing
 * @returns {string} The input code formatted as inline code
 */
function code(text) {
    if (!text) {
        throw new errorcollection_1.ParameterError("missing required argument: text");
    }
    return `<code>${text}</code>`;
}
exports.code = code;
/**
 * Creates a hyperlink
 *
 * @param {string} text - The text to be used as the hyperlink's anchor text
 * @param {string} url - The URL that the hyperlink should point to
 * @throws {ParameterError} If either the `text` or `url` parameter is missing
 * @returns {string} An HTML hyperlink element with the specified text and URL
 */
function link(text, url) {
    if (!text) {
        throw new errorcollection_1.ParameterError("missing required argument: text");
    }
    if (!url) {
        throw new errorcollection_1.ParameterError("missing required argument: url");
    }
    return `<a href="${url}">${text}</a>`;
}
exports.link = link;
/**
 * Creates an image element
 *
 * @param {string} url - The URL of the image
 * @param {string} alt - The alternate text to be displayed if the image cannot be loaded
 * @throws {ParameterError} If the `url` parameter is missing
 * @returns {string} An HTML image element with the specified URL and alternate text
 */
function image(url, alt) {
    if (!url) {
        throw new errorcollection_1.ParameterError("missing required argument: url");
    }
    return `<img src="${url}" alt="${alt}">`;
}
exports.image = image;
/**
 * Creates a paragraph element
 *
 * @param {string} text - The text to be wrapped in a paragraph element
 * @throws {ParameterError} If the `text` parameter is missing
 * @returns {string} An HTML paragraph element containing the input text
 */
function paragraph(text) {
    if (!text) {
        throw new errorcollection_1.ParameterError("missing required argument: text");
    }
    return `${text}\n\n`;
}
exports.paragraph = paragraph;
/**
 * Creates a list element
 *
 * @param {string[]} items - The list items to be included in the list
 * @param {boolean} [ordered=false] - Whether the list should be ordered (default: false)
 * @throws {ParameterError} If the `items` parameter is missing
 * @returns {string} An HTML list element containing the specified list items
 */
function list(items, ordered = false) {
    if (!items) {
        throw new errorcollection_1.ParameterError("missing required argument: items");
    }
    const tag = ordered ? "1." : "*";
    const listItems = items.map((item) => `${tag} ${item}`).join("\n");
    return `${listItems}\n\n`;
}
exports.list = list;
/**
 * Creates a code block element
 *
 * @param {string} code - The code to be displayed in the code block
 * @param {string} [language=''] - The programming language of the code (default: '')
 * @throws {ParameterError} If the `code` parameter is missing
 * @returns {string} An HTML code block element containing
 **/
function codeBlock(code, language = "") {
    if (!code) {
        throw new errorcollection_1.ParameterError("missing required argument: code");
    }
    return `<pre><code class="language-${language}">${code}</code></pre>`;
}
exports.codeBlock = codeBlock;
