export type Message = import("../message/Message").Message;
export type MethodParameters = import("../../types").MethodParameters;
/**
 * @typedef {import("../message/Message").Message} Message
 */
/**
 * @typedef {import("../../types").MethodParameters} MethodParameters
 */
export class Game extends Base {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").Game} data - Data about the represents a game. Use BotFather to create and edit games, their short names will act as unique identifiers
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").Game);
    /** Title of the game */
    title: string;
    /** Description of the game */
    description: string;
    /** Photo that will be displayed in the game message in chats */
    photo: Photo[];
    /** Brief description of the game or high scores included in the game message. Can be automatically edited to include current high scores for the game when the bot calls setGameScore, or manually edited using editMessageText. 0-4096 characters */
    text: string;
    /** Special entities that appear in text, such as usernames, URLs, bot commands, etc */
    entities: MessageEntities;
    /** Animation that will be displayed in the game message in chats. Upload via BotFather */
    animation: Animation;
    /**
     * Use this method to set the score of the specified user in a game message. On success, if the message is not an inline message, the Message is returned, otherwise True is returned.
     * @param {number} userId - User identifier
     * @param {number} score - New score, must be non-negative
     * @param {Omit<MethodParameters["setGameScore"], "userId" | "score">} [options={}] - out parameters
     * @return {Promise<Message & { game: Game; editedTimestamp: number; }>} - On success, if the message is not an inline message, the Message is returned, otherwise True is returned. Returns an error, if the new score is not greater than the user's current score in the chat and force is False.
     */
    setScore(userId: number, score: number, options?: Omit<{
        userId: number;
        score: number;
        force?: boolean;
        disableEditMessage?: boolean;
        chatId?: number;
        messageId?: number;
        inlineMessageId?: string;
    }, "userId" | "score"> | undefined): Promise<Message & {
        game: Game;
        editedTimestamp: number;
    }>;
    /**
     * Use this method to get data for high score tables. Will return the score of the specified user and several of their neighbors in a game.
     * @param {number} userId - Target user id
     * @param {Omit<MethodParameters["getGameHighScores"], "userId">} [options={}] - out parameters
     * @return {Promise<import("./GameHighScore").GameHighScore[]>} -  Returns an Array of GameHighScore objects.
     * This method will currently return scores for the target user, plus two of their closest neighbors on each side. Will also return the top three users if the user and their neighbors are not among them. Please note that this behavior is subject to change.
     */
    getHighScores(userId: number, options?: Omit<{
        userId: number;
        chatId?: number;
        messageId?: number;
        inlineMessageId?: string;
    }, "userId"> | undefined): Promise<import("./GameHighScore").GameHighScore[]>;
}
import { Base } from "../Base";
import { Photo } from "../media/Photo";
import { MessageEntities } from "../message/MessageEntities";
import { Animation } from "../media/Animation";
//# sourceMappingURL=Game.d.ts.map