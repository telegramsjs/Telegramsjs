/// <reference types="node" />
import { BaseClient } from "./BaseClient";
import { CallbackQuery, Message, Update } from "@telegram.ts/types";
import { Context } from "./Context";
export declare class TelegramBot<F = Buffer> extends BaseClient<F> {
    token: string;
    intents?: string[] | number[] | number | null;
    baseUrl: string;
    processUpdate: (webhook?: Update[] | undefined) => Promise<void>;
    session: any;
    constructor(token: string, options?: {
        intents?: string[] | number[] | number | null;
        session?: any;
    });
    /**
     * Defines a command handler.
     * ```ts
     * // Register a command handler for the "/like" command
     * bot.command("like", (message, args) => {
     *   const username = message.from.first_name;
     *   message.reply(`${username}, wrote like ❤️`);
     * });
     *
     * // Register a command handler for multiple commands: "/like" and "/dislike"
     * bot.command(["like", "dislike"], (message, args) => {
     *   const username = message.from.first_name;
     *   if (args[0] === "like") {
     *     message.reply(`${username}, wrote like ❤️`);
     *   } else if (args[0] === "dislike") {
     *     message.reply(`${username}, wrote on dislike 🫠`);
     *   }
     * });
     *
     * // Register a command handler for the "/dislike" command with interactive answer
     * bot.command("dislike", (message, args) => {
     *   const username = message.from.first_name;
     *   message.reply(`${username}, wrote on dislike 🫠`, true);
     * });
     * ```
     * @param {string | string[]} command - The command string or an array of command strings.
     * @param {(message: (Message.TextMessage & Context<F>), args?: string[]) => void} callback - The callback function to handle the command.
     */
    command(command: string | string[], callback: (message: Message.TextMessage & Context<F>, args?: string[]) => void): void;
    /**
     * Defines an action handler.
     * ```ts
     * // Action allows you to track button click events 'callback_data'
     * bot.action("like", (ctx) => {
     *   const username = ctx.first_name;
     *   ctx.reply(`${username}, clicked like ❤️`);
     * });
     *
     * // Action can track, not only one interaction, but several at once
     * bot.action(["like", "dislike"], (ctx) => {
     *   const username = ctx.first_name;
     *   if (ctx.data === "like") {
     *   ctx.reply(`${username}, clicked like ❤️`);
     *   } else {
     *   ctx.reply(`${username}, clicked on dislike 🫠`);
     *   }
     * });
     *
     * // To answer interactively use the third argument 'answer'
     * bot.action("dislike", (ctx) => {
     *   const username = ctx.first_name;
     *   ctx.reply(`${username}, clicked on dislike 🫠`);
     * }, true);
     * ```
     * @param {string | string[]} data - The action data string or an array of action data strings.
     * @param {(callbackQuery: (CallbackQuery & Context<F>)) => void} callback - The callback function to handle the action.
     * @param {boolean} [answer=false] - Whether to answer the action.
     */
    action(data: string | string[], callback: (callbackQuery: CallbackQuery & Context<F>) => void, answer?: boolean): void;
    /**
     * Registers a callback function to be executed when a message is received
     * that includes the specified text.
     * ```ts
     * import { TelegramBot } from "telegramsjs"
     *
     * const bot = new TelegramBot('BOT_TOKEN');
     *
     * bot.hears('hi', (ctx) => ctx.reply('hi!'));
     *
     * bot.login()
     * ```
     * @param {string | string[]} text - The text to match in the received messages.
     * @param {(message: (Message.TextMessage & Context<F>)) => void} callback - The callback function to be executed when a matching message is received.
     * It receives the matched message object as a parameter.
     * @returns void
     */
    hears(text: string, callback: (message: Message.TextMessage & Context<F>) => void): void;
    use(session: any): void;
    /**
     * The function that starts the whole process.
     * ```ts
     * import { TelegramBot } from "telegramsjs";
     * import { UserFromGetMe } from "@telegram.ts/types";
     *
     * const bot = new TelegramBot('BOT_TOKEN');
     *
     * bot.on('ready', (user: UserFromGetMe) => {
     *  console.log(`Bot ${user.username}`)
     * })
     *
     * bot.login()
     * ```
     */
    login(): Promise<void>;
}
//# sourceMappingURL=TelegramBot.d.ts.map