function bold(text) {
  return `*${text}*`;
}

function italic(text) {
  return `_${text}_`;
}

function underline(text) {
  return `__${text}__`;
}

function strikethrough(text) {
  return `~${text}~`;
}

function code(text) {
  return `\`${text}\``;
}

function link(text, url) {
  return `[${text}](${url})`;
}

function image(url, alt) {
  return `![${alt}](${url})`;
}

function heading(text, level = 1) {
  if (level < 1 || level > 6) {
    throw new Error('Invalid heading level');
  }
  const hash = '1'.repeat(level);
  return `${hash} ${text}`;
}

function paragraph(text) {
  return `${text}\n\n`;
}

function list(items, ordered = false) {
  const tag = ordered ? '1.' : '*';
  const listItems = items.map((item) => `${tag} ${item}`).join('\n');
  return `${listItems}\n\n`;
}

function codeBlock(code, language = '') {
  return '```' + language + '\n' + code + '\n```';
}

module.exports = { bold, italic, underline, strikethrough, code, link, image, heading, paragraph, list, codeBlock };