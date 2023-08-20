/**
 * Returns the input text wrapped in bold tags.
 * @param {string} text - The text to be formatted.
 * @returns {string} The input text enclosed in <b> tags.
 */
function bold(text: string): string {
  return `<b>${text}</b>`;
}

/**
 * Returns the input text wrapped in italic tags.
 * @param {string} text - The text to be formatted.
 * @returns {string} The input text enclosed in <i> tags.
 */
function italic(text: string): string {
  return `<i>${text}</i>`;
}

/**
 * Returns the input text wrapped in underline tags.
 * @param {string} text - The text to be formatted.
 * @returns {string} The input text enclosed in <u> tags.
 */
function underline(text: string): string {
  return `<u>${text}</u>`;
}

/**
 * Returns the input text wrapped in strikethrough tags.
 * @param {string} text - The text to be formatted.
 * @returns {string} The input text enclosed in <s> tags.
 */
function strikethrough(text: string): string {
  return `<s>${text}</s>`;
}

/**
 * Returns the input text wrapped in a spoiler span with appropriate class.
 * @param {string} text - The text to be formatted as a spoiler.
 * @returns {string} The input text enclosed in a <span> with the 'tg-spoiler' class.
 */
function spoiler(text: string): string {
  return `<span class="tg-spoiler">${text}</span>`;
}

/**
 * Returns a hyperlink with the provided URL and link text.
 * @param {string} text - The text to be used as the link's anchor text.
 * @param {string} url - The URL to link to.
 * @returns {string} The formatted hyperlink with the given URL and link text.
 */
function link(text: string, url: string): string {
  return `<a href="${url}">${text}</a>`;
}

/**
 * Returns the emoji with the given ID and text.
 * @param {string} emojiId - The ID of the emoji.
 * @param {string} emoji - The text representation of the emoji.
 * @returns {string} The formatted emoji with the provided ID.
 */
function emoji(emojiId: string, emoji: string): string {
  return `<tg-emoji emoji-id="${emojiId}">${emoji}</tg-emoji>`;
}

/**
 * Returns the input code wrapped in a code tag for inline code styling.
 * @param {string} code - The code to be formatted as inline code.
 * @returns {string} The input code enclosed in <code> tags.
 */
function inlineCode(code: string): string {
  return `<code>${code}</code>`;
}

/**
 * Returns the input code wrapped in a pre tag for pre-formatted code block.
 * @param {string} code - The code to be formatted as a pre-formatted code block.
 * @returns {string} The input code enclosed in <pre> tags.
 */
function preFormattedCode(code: string): string {
  return `<pre>${code}</pre>`;
}

/**
 * Returns the input code wrapped in a pre tag with language class for syntax highlighting.
 * @param {string} code - The code to be formatted as a pre-formatted code block.
 * @param {string} language - The language for syntax highlighting (e.g., "javascript", "python").
 * @returns {string} The input code enclosed in <pre><code class="language-${language}"> tags.
 */
function preFormattedCodeWithLanguage(code: string, language: string): string {
  return `<pre><code class="language-${language}">${code}</code></pre>`;
}

export {
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
};
