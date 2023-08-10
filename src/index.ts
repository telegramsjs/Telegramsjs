import { TelegramBot } from "./TelegramBot.js";
import { BaseClient } from "./BaseClient.js";
import { Collection } from "./collection/Collection.js";
import { Markup } from "./Markup.js";
import { MessageCollector } from "./collection/MessageCollector.js";
import { IntentsBitField, decodeIntents } from "./IntentsBitField.js";
import { IntentBits } from "./constanta/IntentBits.js";
import { TelegramIntentBits } from "./constanta/TelegramIntentBits.js";
import * as html from "./formatters/html.js";
import * as markdownv from "./formatters/markdownv.js"
import {
  checkMessageLinks,
  extractUserMentions,
  extractHashtags,
  checkLocation,
  checkUserMentions,
  checkHashtags,
  checkPhoneNumber,
  extractUserIdFromLink,
  checkGroupOrChannel,
  checkEmoji,
  checkSticker,
  extractUsernameFromLink,
  checkBot,
  checkChannel,
  checkLink,
  checkGroup,
  checkUsername,
  extractUsername,
} from "./Util.js";
const version = "1.7.4";

export {
  TelegramBot,
  BaseClient,
  Collection,
  Markup,
  MessageCollector,
  IntentsBitField,
  decodeIntents,
  IntentBits,
  TelegramIntentBits,
  html,
  markdownv,
  checkMessageLinks,
  extractUserMentions,
  extractHashtags,
  checkLocation,
  checkUserMentions,
  checkHashtags,
  checkPhoneNumber,
  extractUserIdFromLink,
  checkGroupOrChannel,
  checkEmoji,
  checkSticker,
  extractUsernameFromLink,
  checkBot,
  checkChannel,
  checkLink,
  checkGroup,
  checkUsername,
  extractUsername,
  version,
};

export { Context } from "./Context.js";
// export { CombinedClass } from "./helpers/CombinedClass.js";