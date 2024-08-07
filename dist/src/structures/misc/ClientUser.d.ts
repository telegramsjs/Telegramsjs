export class ClientUser extends User {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").UserFromGetMe} data - Data about the represents a Telegram user or bot that was returned by `getMe`
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").UserFromGetMe);
    /** True, if this user is a bot */
    bot: true;
    /** User's or bot's username */
    username: string;
    /** True, if the bot can be invited to groups */
    joinGroups: boolean;
    /** True, if privacy mode is disabled for the bot */
    readAllGroupMessages: boolean;
    /** True, if the bot supports inline queries */
    supportsInlineQueries: boolean;
    /** True, if the bot can be connected to a Telegram Business account to receive its messages */
    connectBusiness: boolean;
    /** True, if the bot has main Web App. Returned only in getMe. */
    hasMainWebApp: boolean;
    /**
     * Fetch about the client/bot
     * @return {Promise<ClientUser>}
     */
    fetch(): Promise<ClientUser>;
    /**
     * Use this method to change the list of the bot's commands. See https://core.telegram.org/bots/features#commands for more details about bot commands.
     * @param {readonly import("@telegram.ts/types").BotCommand[]} commands - A list of bot commands to be set as the list of the bot's commands. At most 100 commands can be specified
     * @param {import("@telegram.ts/types").BotCommandScope} [score] - An object, describing scope of users for which the commands are relevant. Defaults to BotCommandScopeDefault
     * @param {string} [language] - A two-letter ISO 639-1 language code. If empty, commands will be applied to all users from the given scope, for whose language there are no dedicated commands
     * @return {Promise<true>} - Returns True on success.
     */
    setCommands(commands: readonly import("@telegram.ts/types").BotCommand[], score?: import("@telegram.ts/types").BotCommandScope | undefined, language?: string | undefined): Promise<true>;
    /**
     * Use this method to get the current list of the bot's commands for the given scope and user language.
     * @param {import("@telegram.ts/types").BotCommandScope} [score] - An object, describing scope of users for which the commands are relevant. Defaults to BotCommandScopeDefault
     * @param {string} [language] - A two-letter ISO 639-1 language code or an empty string
     * @return {Promise<import("@telegram.ts/types").BotCommand[]>} - Returns an Array of BotCommand objects. If commands aren't set, an empty list is returned.
     */
    getCommands(score?: import("@telegram.ts/types").BotCommandScope | undefined, language?: string | undefined): Promise<import("@telegram.ts/types").BotCommand[]>;
    /**
     * Use this method to delete the list of the bot's commands for the given scope and user language. After deletion, higher level commands will be shown to affected users.
     * @param {import("@telegram.ts/types").BotCommandScope} [score] - An object, describing scope of users for which the commands are relevant. Defaults to BotCommandScopeDefault
     * @param {string} [language] - A two-letter ISO 639-1 language code. If empty, commands will be applied to all users from the given scope, for whose language there are no dedicated commands
     * @return {Promise<true>} - Returns True on success.
     */
    deleteCommands(score?: import("@telegram.ts/types").BotCommandScope | undefined, language?: string | undefined): Promise<true>;
    /**
     * Use this method to change the bot's name.
     * @param {string} [name] - New bot name; 0-64 characters. Pass an empty string to remove the dedicated name for the given language
     * @param {string} [language] - A two-letter ISO 639-1 language code. If empty, the name will be shown to all users for whose language there is no dedicated name
     * @return {Promise<true>} - Returns True on success.
     */
    setName(name?: string | undefined, language?: string | undefined): Promise<true>;
    /**
     * Use this method to get the current bot name for the given user language.
     * @param {string} [language] - A two-letter ISO 639-1 language code or an empty string
     * @return {Promise<string>} - Returns bot name on success
     */
    getName(language?: string | undefined): Promise<string>;
    /**
     * Use this method to change the bot's description, which is shown in the chat with the bot if the chat is empty.
     * @param {string} [description] - New bot description; 0-512 characters. Pass an empty string to remove the dedicated description for the given language
     * @param {string} [language] - A two-letter ISO 639-1 language code. If empty, the description will be applied to all users for whose language there is no dedicated description
     * @return {Promise<true>} - Returns True on success.
     */
    setDescription(description?: string | undefined, language?: string | undefined): Promise<true>;
    /**
     * Use this method to get the current bot description for the given user language.
     * @param {string} [language] - A two-letter ISO 639-1 language code or an empty string
     * @return {Promise<string>} - Returns bot description on success.
     */
    getDescription(language?: string | undefined): Promise<string>;
    /**
     * Use this method to change the bot's short description, which is shown on the bot's profile page and is sent together with the link when users share the bot.
     * @param {string} [description] - New short description for the bot; 0-120 characters. Pass an empty string to remove the dedicated short description for the given language
     * @param {string} [language] - A two-letter ISO 639-1 language code. If empty, the short description will be applied to all users for whose language there is no dedicated short description
     * @return {Promise<true>} - Returns True on success.
     */
    setShortDescription(description?: string | undefined, language?: string | undefined): Promise<true>;
    /**
     * Use this method to get the current bot short description for the given user language.
     * @param {string} [language] - A two-letter ISO 639-1 language code or an empty string
     * @return {Promise<string>} - Returns bot short description on success
     */
    getShortDescription(language?: string | undefined): Promise<string>;
    /**
     * Use this method to change the bot's menu button in a private chat, or the default menu button.
     * @param {number} [chatId] - Unique identifier for the target private chat. If not specified, default bot's menu button will be changed
     * @param {import("@telegram.ts/types").MenuButton} [menu] - An object for the bot's new menu button. Defaults to MenuButtonDefault
     * @return {Promise<true>} - Returns True on success.
     */
    setMenuButton(chatId?: number | undefined, menu?: import("@telegram.ts/types").MenuButton | undefined): Promise<true>;
    /**
     * Use this method to get the current value of the bot's menu button in a private chat, or the default menu button.
     * @param {number} [chatId] - Unique identifier for the target private chat. If not specified, default bot's menu button will be returned
     * @return {Promise<import("./MenuButton").MenuButton>} - Returns MenuButton on success.
     */
    getMenuButton(chatId?: number | undefined): Promise<import("./MenuButton").MenuButton>;
    /**
     * Use this method to change the default administrator rights requested by the bot when it's added as an administrator to groups or channels. These rights will be suggested to users, but they are free to modify the list before adding the bot.
     * @param {import("../../util/ChatPermissions").ChatPermissionFlags} [rights] - An object describing new default administrator rights. If not specified, the default administrator rights will be cleared
     * @param {boolean} [forChannels] - Pass True to change the default administrator rights of the bot in channels. Otherwise, the default administrator rights of the bot for groups and supergroups will be changed
     * @return {Promise<true>} - Returns True on success.
     */
    setAdministratorRights(rights?: import("../../util/ChatPermissions").ChatPermissionFlags | undefined, forChannels?: boolean | undefined): Promise<true>;
    /**
     * Use this method to get the current default administrator rights of the bot.
     * @param {boolean} [forChannels] - Pass True to get default administrator rights of the bot in channels. Otherwise, default administrator rights of the bot for groups and supergroups will be returned.
     * @return {Promise<import("../chat/ChatAdministratorRights").ChatAdministratorRights>} - Returns ChatAdministratorRights on success.
     */
    getAdministratorRigths(forChannels?: boolean | undefined): Promise<import("../chat/ChatAdministratorRights").ChatAdministratorRights>;
}
import { User } from "./User";
//# sourceMappingURL=ClientUser.d.ts.map