/**
 * Object representing types of Telegram message entities.
 * @readonly
 * @enum {string}
 * @property {string} Mention - A `@username` mention.
 * @property {string} Hashtag - A `#hashtag` mention.
 * @property {string} Cashtag - A `$cashtag` mention.
 * @property {string} BotCommand - A bot command mention.
 * @property {string} URL - A URL link.
 * @property {string} Email - An email link.
 * @property {string} PhoneNumber - A phone number link.
 * @property {string} Bold - Bold text.
 * @property {string} Italic - Italic text.
 * @property {string} Underline - Underlined text.
 * @property {string} Strikethrough - Strikethrough text.
 * @property {string} Spoiler - Spoiler text.
 * @property {string} Code - Monospace code text.
 * @property {string} Pre - Preformatted code block.
 * @property {string} TextLink - A clickable text URL link.
 * @property {string} TextMention - A mention of a user by their username.
 * @property {string} CustomEmoji - A custom emoji.
 */
const EntityType = {
  Mention: 'mention',
  Hashtag: 'hashtag',
  Cashtag: 'cashtag',
  BotCommand: 'bot_command',
  URL: 'url',
  Email: 'email',
  PhoneNumber: 'phone_number',
  Bold: 'bold',
  Italic: 'italic',
  Underline: 'underline',
  Strikethrough: 'strikethrough',
  Spoiler: 'spoiler',
  Code: 'code',
  Pre: 'pre',
  TextLink: 'text_link',
  TextMention: 'text_mention',
  CustomEmoji: 'custom_emoji'
};

module.exports = EntityType;