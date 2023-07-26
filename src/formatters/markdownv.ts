/**
 * Wraps the input text with asterisks to apply bold formatting.
 * @param {string} text - The text to be formatted in bold.
 * @returns {string} The input text enclosed in asterisks to represent bold formatting.
 */
export function bold(text: string): string {
  return `*${text}*`;
}

/**
 * Wraps the input text with underscores to apply italic formatting.
 * @param {string} text - The text to be formatted in italic.
 * @returns {string} The input text enclosed in underscores to represent italic formatting.
 */
export function italic(text: string): string {
  return `_${text}_`;
}

/**
 * Wraps the input text with double underscores to apply underline formatting.
 * @param {string} text - The text to be formatted with underline.
 * @returns {string} The input text enclosed in double underscores to represent underline formatting.
 */
export function underline(text: string): string {
  return `__${text}__`;
}

/**
 * Wraps the input text with tildes to apply strikethrough formatting.
 * @param {string} text - The text to be formatted with strikethrough.
 * @returns {string} The input text enclosed in tildes to represent strikethrough formatting.
 */
export function strikethrough(text: string): string {
  return `~${text}~`;
}

/**
 * Wraps the input text with double pipes to represent a spoiler.
 * @param {string} text - The text to be hidden as a spoiler.
 * @returns {string} The input text enclosed in double pipes to represent a spoiler.
 */
export function spoiler(text: string): string {
  return `||${text}||`;
}

/**
 * Wraps the input text with backticks to represent inline code formatting.
 * @param {string} text - The code or text to be formatted as inline code.
 * @returns {string} The input text enclosed in backticks to represent inline code formatting.
 */
export function inlineCode(text: string): string {
  return `\`${text}\``;
}

/**
 * Formats the input text as a pre-formatted code block without specifying the language.
 * @param {string} text - The code or text to be displayed as a pre-formatted code block.
 * @returns {string} The input text enclosed in triple backticks to represent a pre-formatted code block.
 */
export function codeBlock(text: string): string {
  return `\`\`\`\n${text}\n\`\`\``;
}

/**
 * Formats the input text as a pre-formatted code block with the specified language for syntax highlighting.
 * @param {string} text - The code or text to be displayed as a pre-formatted code block.
 * @param {string} language - The language for syntax highlighting (e.g., "javascript", "python").
 * @returns {string} The input text enclosed in triple backticks with the specified language to represent a pre-formatted code block.
 */
export function codeBlockWithLanguage(text: string, language: string): string {
  return `\`\`\`${language}\n${text}\n\`\`\``;
}
