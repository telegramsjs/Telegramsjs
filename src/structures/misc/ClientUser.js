const { User } = require("./User");

class ClientUser extends User {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").UserFromGetMe} data - Data about the represents a Telegram user or bot that was returned by `getMe`
   */
  constructor(client, data) {
    super(client, data);

    /** Indicates if this user is a bot */
    this.isBot = true;

    /** The bot's or user's username */
    this.username = data.username;

    /** Indicates if the bot can be invited to groups */
    this.canJoinGroups = data.can_join_groups;

    /** Indicates if privacy mode is disabled for the bot */
    this.canReadAllMessages = data.can_read_all_group_messages;

    /** Indicates if the bot supports inline queries */
    this.inlineQueries = data.supports_inline_queries;

    /** Indicates if the bot can be connected to a Telegram Business account */
    this.connectBusiness = data.can_connect_to_business;

    /** Indicates if the bot has a main Web App */
    this.mainWebApp = data.has_main_web_app;

    this._patch(data);
  }

  /**
   * The authentication token for the Telegram bot
   * @type {string}
   */
  get token() {
    return this.client.authToken;
  }

  /**
   * Fetch about the client/bot
   * @returns {Promise<ClientUser>}
   */
  fetch() {
    return this.client.fetchApplication();
  }

  /**
   * Use this method to change the list of the bot's commands. See https://core.telegram.org/bots/features#commands for more details about bot commands.
   * @param {readonly import("../../client/interfaces/Bot").BotCommand[]} commands - A list of bot commands to be set as the list of the bot's commands. At most 100 commands can be specified
   * @param {import("../../client/interfaces/Bot").BotCommandScope} [scope] - An object, describing scope of users for which the commands are relevant. Defaults to BotCommandScopeDefault
   * @param {string} [languageCode] - A two-letter ISO 639-1 language code. If empty, commands will be applied to all users from the given scope, for whose language there are no dedicated commands
   * @returns {Promise<true>} - Returns True on success.
   */
  setCommands(commands, scope, languageCode) {
    /** @type {import("../../types").MethodParameters["setMyCommands"]} */
    const options = {
      commands,
    };
    if (scope) {
      options.scope = scope;
    }
    if (languageCode) {
      options.languageCode = languageCode;
    }
    return this.client.setMyCommands(options);
  }

  /**
   * Use this method to get the current list of the bot's commands for the given scope and user language.
   * @param {import("../../client/interfaces/Bot").BotCommandScope} [score] - An object, describing scope of users for which the commands are relevant. Defaults to BotCommandScopeDefault
   * @param {string} [language] - A two-letter ISO 639-1 language code or an empty string
   * @returns {Promise<import("../../client/interfaces/Bot").BotCommand[]>} - Returns an Array of BotCommand objects. If commands aren't set, an empty list is returned.
   */
  getCommands(score, language) {
    return this.client.getMyCommands(score, language);
  }

  /**
   * Use this method to delete the list of the bot's commands for the given scope and user language. After deletion, higher level commands will be shown to affected users.
   * @param {import("../../client/interfaces/Bot").BotCommandScope} [score] - An object, describing scope of users for which the commands are relevant. Defaults to BotCommandScopeDefault
   * @param {string} [language] - A two-letter ISO 639-1 language code. If empty, commands will be applied to all users from the given scope, for whose language there are no dedicated commands
   * @returns {Promise<true>} - Returns True on success.
   */
  deleteCommands(score, language) {
    return this.client.deleteMyCommands(score, language);
  }

  /**
   * Use this method to change the bot's name.
   * @param {string} [name] - New bot name; 0-64 characters. Pass an empty string to remove the dedicated name for the given language
   * @param {string} [language] - A two-letter ISO 639-1 language code. If empty, the name will be shown to all users for whose language there is no dedicated name
   * @returns {Promise<true>} - Returns True on success.
   */
  setName(name, language) {
    return this.client.setMyName(name, language);
  }

  /**
   * Use this method to get the current bot name for the given user language.
   * @param {string} [language] - A two-letter ISO 639-1 language code or an empty string
   * @returns {Promise<string>} - Returns bot name on success
   */
  getName(language) {
    return this.client.getMyName(language);
  }

  /**
   * Use this method to change the bot's description, which is shown in the chat with the bot if the chat is empty.
   * @param {string} [description] - New bot description; 0-512 characters. Pass an empty string to remove the dedicated description for the given language
   * @param {string} [language] - A two-letter ISO 639-1 language code. If empty, the description will be applied to all users for whose language there is no dedicated description
   * @returns {Promise<true>} - Returns True on success.
   */
  setDescription(description, language) {
    return this.client.setMyDescription(description, language);
  }

  /**
   * Use this method to get the current bot description for the given user language.
   * @param {string} [language] - A two-letter ISO 639-1 language code or an empty string
   * @returns {Promise<string>} - Returns bot description on success.
   */
  getDescription(language) {
    return this.client.getMyDescription(language);
  }

  /**
   * Use this method to change the bot's short description, which is shown on the bot's profile page and is sent together with the link when users share the bot.
   * @param {string} [description] - New short description for the bot; 0-120 characters. Pass an empty string to remove the dedicated short description for the given language
   * @param {string} [language] - A two-letter ISO 639-1 language code. If empty, the short description will be applied to all users for whose language there is no dedicated short description
   * @returns {Promise<true>} - Returns True on success.
   */
  setShortDescription(description, language) {
    return this.client.setMyShortDescription(description, language);
  }

  /**
   * Use this method to get the current bot short description for the given user language.
   * @param {string} [language] - A two-letter ISO 639-1 language code or an empty string
   * @returns {Promise<string>} - Returns bot short description on success
   */
  getShortDescription(language) {
    return this.client.getMyShortDescription(language);
  }

  /**
   * Use this method to change the bot's menu button in a private chat, or the default menu button.
   * @param {number} [chatId] - Unique identifier for the target private chat. If not specified, default bot's menu button will be changed
   * @param {import("../../client/interfaces/Bot").MenuButton} [menu] - An object for the bot's new menu button. Defaults to MenuButtonDefault
   * @returns {Promise<true>} - Returns True on success.
   */
  setMenuButton(chatId, menu) {
    return this.client.setChatMenuButton(chatId, menu);
  }

  /**
   * Use this method to get the current value of the bot's menu button in a private chat, or the default menu button.
   * @param {number} [chatId] - Unique identifier for the target private chat. If not specified, default bot's menu button will be returned
   * @returns {Promise<import("./MenuButton").MenuButton>} - Returns MenuButton on success.
   */
  getMenuButton(chatId) {
    return this.client.getChatMenuButton(chatId);
  }

  /**
   * Use this method to change the default administrator rights requested by the bot when it's added as an administrator to groups or channels. These rights will be suggested to users, but they are free to modify the list before adding the bot.
   * @param {import("../../util/ChatPermissions").ChatPermissionFlags} [rights] - An object describing new default administrator rights. If not specified, the default administrator rights will be cleared
   * @param {boolean} [forChannels] - Pass True to change the default administrator rights of the bot in channels. Otherwise, the default administrator rights of the bot for groups and supergroups will be changed
   * @returns {Promise<true>} - Returns True on success.
   */
  setAdministratorRights(rights, forChannels) {
    return this.client.setMyDefaultAdministratorRights(rights, forChannels);
  }

  /**
   * Use this method to get the current default administrator rights of the bot.
   * @param {boolean} [forChannels] - Pass True to get default administrator rights of the bot in channels. Otherwise, default administrator rights of the bot for groups and supergroups will be returned.
   * @returns {Promise<import("../chat/ChatAdministratorRights").ChatAdministratorRights>} - Returns ChatAdministratorRights on success.
   */
  getAdministratorRigths(forChannels) {
    return this.client.getMyDefaultAdministratorRights(forChannels);
  }
}

module.exports = { ClientUser };
