type EntityType = {
  Mention: string;
  Hashtag: string;
  Cashtag: string;
  BotCommand: string;
  URL: string;
  Email: string;
  PhoneNumber: string;
  Bold: string;
  Italic: string;
  Underline: string;
  Strikethrough: string;
  Spoiler: string;
  Code: string;
  Pre: string;
  TextLink: string;
  TextMention: string;
  CustomEmoji: string;
};

export const EntityType: EntityType = {
  Mention: "mention",
  Hashtag: "hashtag",
  Cashtag: "cashtag",
  BotCommand: "bot_command",
  URL: "url",
  Email: "email",
  PhoneNumber: "phone_number",
  Bold: "bold",
  Italic: "italic",
  Underline: "underline",
  Strikethrough: "strikethrough",
  Spoiler: "spoiler",
  Code: "code",
  Pre: "pre",
  TextLink: "text_link",
  TextMention: "text_mention",
  CustomEmoji: "custom_emoji",
};
