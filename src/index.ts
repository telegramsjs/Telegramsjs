import { TelegramBot } from "./client";
import {
  type UnicodeEmoji,
  type EmojiTypeSearch,
  type AliasEmoji,
  has,
  find,
  strip,
  search,
  unemojify,
  emojify,
} from "@telegram.ts/emoji";

export {
  TelegramBot,
  UnicodeEmoji,
  EmojiTypeSearch,
  AliasEmoji,
  has,
  find,
  strip,
  search,
  unemojify,
  emojify,
};
export default { TelegramBot, has, find, strip, search, unemojify, emojify };
