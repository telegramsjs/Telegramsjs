function bold(text) {
  return `<b>${text}</b>`;
}

function italic(text) {
  return `<i>${text}</i>`;
}

function underline(text) {
  return `<u>${text}</u>`;
}

function strikethrough(text) {
  return `<s>${text}</s>`;
}

function code(text) {
  return `<code>${text}</code>`;
}

function link(text, url) {
  return `<a href="${url}">${text}</a>`;
}

function image(url, alt) {
  return `<img src="${url}" alt="${alt}">`;
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
  return `<pre><code class="language-${language}">${code}</code></pre>`;
}

module.exports = { bold, italic, underline, strikethrough, code, link, image, paragraph, list, codeBlock };