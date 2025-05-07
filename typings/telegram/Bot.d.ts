import type { WebAppInfo } from "./Markup";

/** This object represents a bot command. */
export interface BotCommand {
  /** Text of the command; 1-32 characters. Can contain only lowercase English letters, digits and underscores. */
  command: string;
  /** Description of the command; 1-256 characters. */
  description: string;
}

export type MenuButton =
  | MenuButtonCommands
  | MenuButtonWebApp
  | MenuButtonDefault;

/**
 * Represents a menu button that opens the bot's list of commands.
 */
export interface MenuButtonCommands {
  /** The type of the button, must be "commands". */
  type: "commands";
}

/**
 * Represents a menu button that launches a Web App.
 */
export interface MenuButtonWebApp {
  /** The button type, must be "web_app". */
  type: "web_app";
  /** The text on the button. */
  text: string;
  /** Description of the Web App that will be launched when the user presses the button. The Web App will be able to send an arbitrary message on behalf of the user using the method answerWebAppQuery. Alternatively, a t.me link to a Web App can be specified in the object instead of the Web App's URL, in which case the Web App will be opened as if the user pressed the link. */
  web_app: WebAppInfo;
}

/**
 * Describes that no specific value for the menu button was set.
 */
export interface MenuButtonDefault {
  /** The type of the button, must be "default". */
  type: "default";
}

/**
 * This interface represents the scope to which bot commands are applied.
 * Currently, the following 7 scopes are supported:
 * - BotCommandScopeDefault
 * - BotCommandScopeAllPrivateChats
 * - BotCommandScopeAllGroupChats
 * - BotCommandScopeAllChatAdministrators
 * - BotCommandScopeChat
 * - BotCommandScopeChatAdministrators
 * - BotCommandScopeChatMember
 *
 * Determining list of commands:
 * The following algorithm is used to determine the list of commands for a particular user viewing the bot menu.
 * The first list of commands that is set is returned.
 *
 * Commands in the chat with the bot:
 * - botCommandScopeChat + language_code
 * - botCommandScopeChat
 * - botCommandScopeAllPrivateChats + language_code
 * - botCommandScopeAllPrivateChats
 * - botCommandScopeDefault + language_code
 * - botCommandScopeDefault
 *
 * Commands in group and supergroup chats:
 * - botCommandScopeChatMember + language_code
 * - botCommandScopeChatMember
 * - botCommandScopeChatAdministrators + language_code (administrators only)
 * - botCommandScopeChatAdministrators (administrators only)
 * - botCommandScopeChat + language_code
 * - botCommandScopeChat
 * - botCommandScopeAllChatAdministrators + language_code (administrators only)
 * - botCommandScopeAllChatAdministrators (administrators only)
 * - botCommandScopeAllGroupChats + language_code
 * - botCommandScopeAllGroupChats
 * - botCommandScopeDefault + language_code
 * - botCommandScopeDefault
 */
export type BotCommandScope =
  | BotCommandScopeDefault
  | BotCommandScopeAllPrivateChats
  | BotCommandScopeAllGroupChats
  | BotCommandScopeAllChatAdministrators
  | BotCommandScopeChat
  | BotCommandScopeChatAdministrators
  | BotCommandScopeChatMember;

/**
 * Represents the default scope of bot commands.
 * Default commands are used if no commands with a narrower scope are specified for the user.
 */
export interface BotCommandScopeDefault {
  /** The scope type, must be "default". */
  type: "default";
}

/**
 * Represents the scope of bot commands, covering all private chats.
 */
export interface BotCommandScopeAllPrivateChats {
  /** The scope type, must be "all_private_chats". */
  type: "all_private_chats";
}

/**
 * Represents the scope of bot commands, covering all group and supergroup chats.
 */
export interface BotCommandScopeAllGroupChats {
  /** The scope type, must be "all_group_chats". */
  type: "all_group_chats";
}

/**
 * Represents the scope of bot commands, covering all group and supergroup chat administrators.
 */
export interface BotCommandScopeAllChatAdministrators {
  /** The scope type, must be "all_chat_administrators". */
  type: "all_chat_administrators";
}

/**
 * Represents the scope of bot commands, covering a specific chat.
 */
export interface BotCommandScopeChat {
  /** The scope type, must be "chat". */
  type: "chat";
  /** The unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername). */
  chat_id: number | string;
}

/**
 * Represents the scope of bot commands, covering all administrators of a specific group or supergroup chat.
 */
export interface BotCommandScopeChatAdministrators {
  /** The scope type, must be "chat_administrators". */
  type: "chat_administrators";
  /** The unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername). */
  chat_id: number | string;
}

/**
 * Represents the scope of bot commands, covering a specific member of a group or supergroup chat.
 */
export interface BotCommandScopeChatMember {
  /** The scope type, must be "chat_member". */
  type: "chat_member";
  /** The unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername). */
  chat_id: number | string;
  /** The unique identifier of the target user. */
  user_id: number;
}

/** This object describes the types of gifts that can be gifted to a user or a chat. */
export interface AcceptedGiftTypes {
  /** True, if unlimited regular gifts are accepted */
  unlimited_gifts: boolean;
  /** True, if limited regular gifts are accepted */
  limited_gifts: boolean;
  /** True, if unique gifts or gifts that can be upgraded to unique for free are accepted */
  unique_gifts: boolean;
  /** True, if a Telegram Premium subscription is accepted */
  premium_subscription: boolean;
}
